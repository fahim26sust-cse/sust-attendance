'use client'
import { Button, Stack } from "@mui/material";
export const ActionExcel = ({ handleSubmit, loading, courseCode,courseName, handleDownloadExcel, attendance }) => (
  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
    <Button
      type="submit"
      variant="contained"
      fullWidth
      disabled={loading || !courseCode}
      onClick={() => handleSubmit(courseCode,courseName)}
      sx={{ py: 1.25, mt: 1, fontWeight: 'bold', textTransform: 'none', borderRadius: 2 }}
    >
      {loading ? "Loading..." : "Fetch Attendance"}
    </Button>

    <Button
      type="button"
      variant="outlined"
      fullWidth
      disabled={!attendance.length}
      onClick={() => handleDownloadExcel(attendance, courseCode)}
      sx={{ py: 1.25, mt: 1, fontWeight: 600, textTransform: 'none', borderRadius: 2 }}
    >
      Download Excel
    </Button>
  </Stack>
);