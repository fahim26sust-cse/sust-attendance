export const handleFetchAttendance = async (courseCode, courseName) => {
  try {
    const response = await fetch(`/api/attendance/fetch?courseCode=${courseCode}&courseName=${courseName}`);
    if (!response.ok) {
      throw new Error("Failed to fetch attendance data");
    }
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error fetching attendance:", error);
    throw error;
  }
};
