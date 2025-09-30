'use client'
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import fetchCourses from '@/lib/helper_functions/fetchCourses';
import fetchAdminGeoLocationData from '@/lib/helper_functions/fetchAdminGeoLocationData';
import { useAuth } from '@/lib/custom_hook/auth';
import Aurora from '@/app/components/animation/Aurora/Aurora';
import AdminNavbar from '@/app/components/Admin/AdminNavbar';
import GeoFenceCard from '@/app/components/Admin/admin-pin-show/GeoFenceCard';
import GeoFenceButton from '@/app/components/Admin/admin-pin-show/GeoFenceButton';
import CourseSelectDropdown from '@/app/components/Admin/admin-pin-show/CourseSelectionDropDown';
const PinForStudent = () => {
    const [courseCode, setCourseCode] = useState('');
    const [courses, setCourses] = useState([]);
    const [success, setSuccess] = useState(false);
    const [geoFenceCreated, setGeoFenceCreated] = useState(false);
    const [geoLocationData, setGeoLocationData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { isAuthenticated, adminEmail } = useAuth();
    const coursesApiUrl = '/api/courses/fetch';
    useEffect(() => {
        const fetchData = async () => {
            const coursesData = await fetchCourses(coursesApiUrl);
            setCourses(coursesData);
        };
        fetchData();
    }, [coursesApiUrl]);

    const handleGeoFenceAction = () => {
        fetchAdminGeoLocationData(courseCode, setGeoLocationData, setError, setLoading);
    };
    if (!isAuthenticated) return <p>Loading...</p>;

    return (
        <div style={{
            position: 'relative',
            height: '100vh',
            backgroundColor: '#0A0A0A',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
        }}>
            <Box sx={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
                <Aurora colorStops={['#ff00ff', '#00ffdd', '#ffe600']} blend={0.7} amplitude={1.0} speed={1} />
            </Box>
            <AdminNavbar adminEmail={adminEmail} />
            <div style={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                maxWidth: '650px',
                background: 'rgba(20, 20, 20, 0.8)',
                padding: '30px',
                borderRadius: '16px',
                boxShadow: '0 8px 24px rgb(0, 255, 200)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                marginTop: '100px',
            }}>
                <h1 style={{
                    fontSize: '2.8rem',
                    fontWeight: '700',
                    color: '#00E5FF',
                    marginBottom: '25px',
                    textShadow: '0 0 12px rgba(0, 229, 255, 0.6)',
                }}>
                    Admin Geo-Fence Setup
                </h1>

                <CourseSelectDropdown courses={courses} courseCode={courseCode} setCourseCode={setCourseCode} />
                <GeoFenceButton loading={loading} onClick={handleGeoFenceAction} disabled={!courseCode} />
                {geoLocationData && <GeoFenceCard geoLocationData={geoLocationData} />}
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </div>
        </div>
    );
};

export default PinForStudent;
