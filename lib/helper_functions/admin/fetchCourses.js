export const fetchCourses = async () => {
  try {
    const response = await fetch("/api/courses/fetch");
    if (response.ok) {
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } else {
      console.error("Failed to fetch courses");
      return [];
    }
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};
