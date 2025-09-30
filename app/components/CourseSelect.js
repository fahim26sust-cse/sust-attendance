'use client'
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
export const CourseSelect = ({ courses, courseCode, setCourseCode, setCourseName }) => (
  <FormControl fullWidth size="small" sx={{ mb: 2 }}>
    <InputLabel id="course-select-label">Select Course Code</InputLabel>
    <Select
      labelId="course-select-label"
      id="course-select"
      value={courseCode}
      label="Select Course Code"
      onChange={(e) => {
        const selected = courses.find(c => c.courseCode === e.target.value);
        setCourseCode(e.target.value);
        setCourseName(selected?.courseName || "");
      }}
      MenuProps={{
        PaperProps: { style: { backgroundColor: 'black', color: 'white' } },
      }}
    >
      <MenuItem value="" disabled>Select Course Code</MenuItem>
      {courses.map((course) => (
        <MenuItem key={course._id} value={course.courseCode}>
          {course.courseCode} — {course.courseName}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);