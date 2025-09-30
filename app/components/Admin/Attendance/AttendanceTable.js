'use client'
import React from "react";
const getAttendanceCounts = (attendance) => {
  const counts = {};
  attendance.forEach(rec => {
    const key = rec.studentId + "|" + rec.studentName;
    if (!counts[key]) {
      counts[key] = { studentId: rec.studentId, studentName: rec.studentName, count: 0 };
    }
    counts[key].count += 1;
  });
  return Object.values(counts);
};

const AttendanceTable = ({ attendance }) => {
  const counts = getAttendanceCounts(attendance);

  return (
    <table border="1" cellPadding="5" style={{ marginTop: 20, width: "100%" }}>
      <thead>
        <tr>
          <th>Student ID</th>
          <th>Name</th>
          <th>Attendance Count</th>
        </tr>
      </thead>
      <tbody>
        {counts.map((row, idx) => (
          <tr key={row.studentId + row.studentName}>
            <td>{row.studentId}</td>
            <td>{row.studentName}</td>
            <td>{row.count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AttendanceTable;
