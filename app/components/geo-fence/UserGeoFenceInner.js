// 'use client';
// import { useMemo, useState } from 'react';
// import { Box, CircularProgress, Typography } from '@mui/material';
// import useGeolocationWatcher from './hooks/useGeolocationWatcher';
// import useEnrollments from './hooks/useEnrollments';
// import useAttendanceCheck from './hooks/useAttendanceCheck';
// import CourseSelect from './CourseSelect';
// import StatusRow from './StatusRow';
// import ErrorBanner from './ErrorBanner';
// import GeoFenceAttendance from '../GeoFenceAttendance';
// import Navbar from '../Navbar';
// import dynamic from 'next/dynamic';
// import Footer from '../Footer';


// const TextType = dynamic(() => import('@/app/components/animation/Text/TextType/TextType'), { ssr: false });
// const BackgroundEffects = dynamic(() => import('../student-home/BackgroundEffects'), { ssr: false });


// export default function UserGeoFenceInner({ studentId }) {
//   const lines = [
//     `Fetch the geo-location after selecting course`,
//     `If permission is allowed, attendence box will appear `,
//     `If you are inside the pre-defined geo-location, press Start Timer`,
//     `You have to input the pin within the timer`,
//   ];
//   const {
//     userLocation,
//     geoPermissionState,
//     coarse,
//     geoError,
//     setGeoError,
//   } = useGeolocationWatcher();

//   const { courses, selectedCourse, setSelectedCourse, selectedCourseData, loadingEnroll, enrollError } =
//     useEnrollments(studentId);

//   const { checkAttendance } = useAttendanceCheck(studentId);

//   const [fetchingGeo, setFetchingGeo] = useState(false);
//   const [error, setError] = useState(null);
//   const [permission, setPermission] = useState(null);
//   const [distance, setDistance] = useState(null);
//   const [geoLocation, setGeoLocation] = useState(null);
//   const [attendanceExists, setAttendanceExists] = useState(false);
//   const [showGeoUI, setShowGeoUI] = useState(false);

//   const combinedError = enrollError || geoError || error;

//   const handleChangeCourse = (courseCode) => {
//     setSelectedCourse(courseCode);
//     setGeoLocation(null);
//     setPermission(null);
//     setDistance(null);
//     setAttendanceExists(false);
//     setShowGeoUI(false);
//     setError(null);
//     setGeoError(null);
//   };

//   const fetchGeoLocation = async () => {
//     if (!selectedCourseData) { alert('Please select a course first.'); return; }
//     if (geoPermissionState === 'denied') {
//       setError('Location permission is blocked. Enable it in Site Settings and reload.');
//       return;
//     }
//     setFetchingGeo(true);
//     setShowGeoUI(true);
//     try {
//       const exists = await checkAttendance(selectedCourseData);
//       setAttendanceExists(exists);
//       if (exists) return;

//       const response = await fetch(`/api/admin/geo-fence?courseCode=${encodeURIComponent(selectedCourseData.courseCode)}`);
//       if (!response.ok) throw new Error('Failed to fetch geo-location data');
//       const geoData = await response.json();

//       setGeoLocation(geoData);
//       setPermission(geoData.permission);
//       setDistance(geoData.distance);
//     } catch (e) {
//       setError('Error fetching geo-location: ' + e.message);
//       setShowGeoUI(false);
//     } finally {
//       setFetchingGeo(false);
//     }
//   };

//   const content = useMemo(() => {
//     if (loadingEnroll) {
//       return <CircularProgress sx={{ color: '#bfd6d0' }} />;
//     }

//     const hasGeoErr = !!geoError;
//     const showWaitingText = !hasGeoErr;

//     return (
//       <>
//         <ErrorBanner error={combinedError} />

//         <CourseSelect
//           courses={courses}
//           selectedCourse={selectedCourse}
//           onChange={handleChangeCourse}
//         />

//         <StatusRow
//           userLocation={userLocation}
//           geoPermissionState={geoPermissionState}
//           coarse={coarse}
//           fetchingGeo={fetchingGeo}
//           onFetch={fetchGeoLocation}
//         />

//         {geoPermissionState === 'denied' && (
//           <p style={{ color: 'salmon' }}>
//             Location permission is blocked. Enable it in your browser’s Site Settings and reload.
//           </p>
//         )}

//         {geoPermissionState === 'prompt' && !userLocation && !combinedError && (
//           <p style={{ color: 'white' }}>
//             Please accept the browser prompt to share your location.
//           </p>
//         )}

//         {attendanceExists ? (
//           <p style={{ color: 'white' }}>Attendance already marked for today.</p>
//         ) : showGeoUI ? (
//           geoLocation && userLocation && permission === 'YES' ? (
//             <GeoFenceAttendance
//               userLocation={userLocation}
//               geoLocation={geoLocation}
//               studentId={studentId}
//               courses={selectedCourseData}

//             />
//           ) : fetchingGeo ? (
//             <p style={{ color: 'white' }}>Loading geo-location data...</p>
//           ) : permission === 'NO' ? (
//             <p style={{ color: 'white' }}>Permission denied. You cannot access the geo-fence data.</p>
//           ) : showWaitingText ? (
//             <p style={{ color: 'white' }}>
//               {userLocation ? 'Location acquired. Waiting for precise fix…' : 'Waiting for your location…'}
//             </p>
//           ) : null
//         ) : (
//           <p style={{ color: 'white' }}>Select a course and click “Fetch Geo-Fence”.</p>
//         )}
//       </>
//     );
//   }, [
//     loadingEnroll, combinedError, geoError, courses, selectedCourse, userLocation,
//     geoPermissionState, coarse, fetchingGeo, attendanceExists, showGeoUI,
//     geoLocation, permission, studentId, selectedCourseData
//   ]);


//   return (
//     <div>
//     <Box sx={{ pt: '16px', pb: '16px', px: 0, position: 'relative', zIndex: 1, mt: { xs: '70px', sm: '70px', md: '90px', lg: '100px' } }}>
//       <Navbar />
//       <BackgroundEffects />
//       <Box sx={{ position: 'relative', zIndex: 1 }}>
//         <TextType
//               text={lines}
//               textColors={['#d400ff', '#00ff2f']}
//               as={Typography}
//               typingSpeed={100}
//               pauseDuration={2300}
//               showCursor
//               cursorCharacter="_"
//               sx={{

//                 fontWeight: { xs: 500, sm: 600, md: 700, lg: 1000 },
//                 textAlign: 'center',
//                 width: '100%',
//                 display: 'block',
//                 height: { xs: '45px', sm: '80px', md: '120px', lg: '150px' },
//                 padding: {xs: '40px', sm: '50px', md: '60px', lg: '40px' },
//                 fontSize: { xs: '1rem', sm: '1.5rem', md: '2.5rem', lg: '3rem' },
//               }}
//             />
//         {content}
//       </Box>
//     </Box>

//     </div>
//   );
// }


'use client';

import { useMemo, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';



import useGeolocationWatcher from './hooks/useGeolocationWatcher';
import useEnrollments from './hooks/useEnrollments';
import useAttendanceCheck from './hooks/useAttendanceCheck';

import CourseSelect from './CourseSelect';
import StatusRow from './StatusRow';
import ErrorBanner from './ErrorBanner';
import GeoFenceAttendance from '../GeoFenceAttendance';
import Navbar from '../Navbar';
import BackgroundEffects from '../student-home/BackgroundEffects';
import TextType from '../animation/Text/TextType/TextType';
import Footer from '../Footer';

export default function UserGeoFenceInner({ studentId }) {
  const lines = [
    `Fetch the geo-location after selecting course`,
    `If permission is allowed, attendence box will appear `,
    `If you are inside the pre-defined geo-location, press Start Timer`,
    `You have to input the pin within the timer`,
  ];
  const {
    userLocation,
    geoPermissionState,
    coarse,
    geoError,
    setGeoError,
  } = useGeolocationWatcher();

  const { courses, selectedCourse, setSelectedCourse, selectedCourseData, loadingEnroll, enrollError } =
    useEnrollments(studentId);

  const { checkAttendance } = useAttendanceCheck(studentId);

  const [fetchingGeo, setFetchingGeo] = useState(false);
  const [error, setError] = useState(null);
  const [permission, setPermission] = useState(null);
  const [distance, setDistance] = useState(null);
  const [geoLocation, setGeoLocation] = useState(null);
  const [attendanceExists, setAttendanceExists] = useState(false);
  const [showGeoUI, setShowGeoUI] = useState(false);

  const combinedError = enrollError || geoError || error;

  const handleChangeCourse = (courseCode) => {
    setSelectedCourse(courseCode);
    setGeoLocation(null);
    setPermission(null);
    setDistance(null);
    setAttendanceExists(false);
    setShowGeoUI(false);
    setError(null);
    setGeoError(null);
  };

  const fetchGeoLocation = async () => {
    if (!selectedCourseData) { alert('Please select a course first.'); return; }
    if (geoPermissionState === 'denied') {
      setError('Location permission is blocked. Enable it in Site Settings and reload.');
      return;
    }
    setFetchingGeo(true);
    setShowGeoUI(true);
    try {
      const exists = await checkAttendance(selectedCourseData);
      setAttendanceExists(exists);
      if (exists) return;

      const response = await fetch(`/api/admin/geo-fence?courseCode=${encodeURIComponent(selectedCourseData.courseCode)}`);
      if (!response.ok) throw new Error('Failed to fetch geo-location data');
      const geoData = await response.json();

      setGeoLocation(geoData);
      setPermission(geoData.permission);
      setDistance(geoData.distance);
    } catch (e) {
      setError('Error fetching geo-location: ' + e.message);
      setShowGeoUI(false);
    } finally {
      setFetchingGeo(false);
    }
  };

  const content = useMemo(() => {
    if (loadingEnroll) {
      return <CircularProgress sx={{ color: '#bfd6d0' }} />;
    }

    const hasGeoErr = !!geoError;
    const showWaitingText = !hasGeoErr;

    return (
      <>
        <ErrorBanner error={combinedError} />

        <CourseSelect
          courses={courses}
          selectedCourse={selectedCourse}
          onChange={handleChangeCourse}
        />

        <StatusRow
          userLocation={userLocation}
          geoPermissionState={geoPermissionState}
          coarse={coarse}
          fetchingGeo={fetchingGeo}
          onFetch={fetchGeoLocation}
        />

        {geoPermissionState === 'denied' && (
          <p style={{ color: 'salmon' }}>
            Location permission is blocked. Enable it in your browser’s Site Settings and reload.
          </p>
        )}

        {geoPermissionState === 'prompt' && !userLocation && !combinedError && (
          <p style={{ color: 'white' }}>
            Please accept the browser prompt to share your location.
          </p>
        )}

        {attendanceExists ? (
          <p style={{ color: 'white' }}>Attendance already marked for today.</p>
        ) : showGeoUI ? (
          geoLocation && userLocation && permission === 'YES' ? (
            <GeoFenceAttendance
              userLocation={userLocation}
              geoLocation={geoLocation}
              studentId={studentId}
              courses={selectedCourseData}

            />
          ) : fetchingGeo ? (
            <p style={{ color: 'white' }}>Loading geo-location data...</p>
          ) : permission === 'NO' ? (
            <p style={{ color: 'white' }}>Permission denied. You cannot access the geo-fence data.</p>
          ) : showWaitingText ? (
            <p style={{ color: 'white' }}>
              {userLocation ? 'Location acquired. Waiting for precise fix…' : 'Waiting for your location…'}
            </p>
          ) : null
        ) : (
          <p style={{ color: 'white' }}>Select a course and click “Fetch Geo-Fence”.</p>
        )}
      </>
    );
  }, [
    loadingEnroll, combinedError, geoError, courses, selectedCourse, userLocation,
    geoPermissionState, coarse, fetchingGeo, attendanceExists, showGeoUI,
    geoLocation, permission, studentId, selectedCourseData
  ]);


  return (
    <Box sx={{ pt: '16px', pb: '16px', px: 0, position: 'relative', zIndex: 1, mt: { xs: '70px', sm: '70px', md: '90px', lg: '100px' } }}>
      <Navbar />
      <BackgroundEffects />
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <TextType
          text={lines}
          textColors={['#d400ff', '#00ff2f']}
          as={Typography}
          typingSpeed={100}
          pauseDuration={2300}
          showCursor
          cursorCharacter="_"
          sx={{

            fontWeight: { xs: 500, sm: 600, md: 700, lg: 1000 },
            textAlign: 'center',
            width: '100%',
            display: 'block',
            height: { xs: '45px', sm: '80px', md: '120px', lg: '150px' },
            padding: { xs: '40px', sm: '50px', md: '60px', lg: '40px' },
            fontSize: { xs: '1rem', sm: '1.5rem', md: '2.5rem', lg: '3rem' },
          }}
        />
        {content}
      </Box>

    </Box>
  );
}

