'use client';

import { Box, Typography } from '@mui/material';
import GradientText from '@/app/components/animation/Text/GradientText/GradientText';
import { NeoButton, NeoSurface } from '@/app/components/DropInComponent';
import UserEnrolledCourses from '@/app/components/UserEnrolledCourses';
import { REQUIRED_PHRASE, useEnrollCourses } from '@/lib/custom_hook/student/useEnrollCourses';
import AlertsStack from './enroll-courses/AlertsStack';
import CoursesGrid from './enroll-courses/CoursesGrid';
import ConfirmDialog from './enroll-courses/ConfirmDialog';
import { HeaderWrap } from './enroll-courses/EnrollStyles';
export default function EnrollCourse({ studentId, studentName, department, semester }) {
  const {
    courses,
    filteredCourses,
    enrollments,
    loading,
    enrollLoading,
    error,
    setError,
    successMessage,
    setSuccessMessage,
    enrollError,
    confirmOpen,
    confirmInput,
    setConfirmInput,
    confirmError,
    submitting,
    pendingCourse,
    openConfirm,
    closeConfirm,
    handleConfirmSubmit,
  } = useEnrollCourses({ studentId, studentName, department, semester });

  return (
    <NeoSurface>
      <NeoButton>
        <HeaderWrap>
          <GradientText
            colors={['#40ffaa', '#4079ff', '#40ffaa', '#4079ff', '#40ffaa']}
            animationSpeed={3}
            showBorder={false}
            className="custom-class"
          >
            <Typography variant={{ xs: 'h4', sm: 'h3', md: 'h2' }} gutterBottom sx={{ color: '#eaf2ff', fontWeight: 800 }}>
              Available Courses offered by FIF
            </Typography>
          </GradientText>
          <Typography sx={{ color: 'rgba(234,242,255,0.75)' }}>
            Choose a course and tap Enroll to register instantly.
          </Typography>
        </HeaderWrap>

        <AlertsStack
          error={error}
          onClearError={() => setError('')}
          successMessage={successMessage}
          onClearSuccess={() => setSuccessMessage('')}
        />

        <CoursesGrid
          courses={filteredCourses ?? []}
          semester={semester}
          onEnroll={openConfirm}
        />
      </NeoButton>

      <ConfirmDialog
        open={confirmOpen}
        pendingCourse={pendingCourse}
        requiredPhrase={REQUIRED_PHRASE}
        confirmInput={confirmInput}
        onChangeInput={(v) => { setConfirmInput(v); }}
        confirmError={confirmError}
        onClose={closeConfirm}
        onSubmit={handleConfirmSubmit}
        submitting={submitting}
      />

      <Box mt={4}>
        <UserEnrolledCourses
          enrollments={enrollments}
          loading={enrollLoading}
          error={enrollError}
        />
      </Box>
    </NeoSurface>
  );
}
