const fetchCourses = async (apiUrl) => {
  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Failed to fetch courses');
    }
  } catch (error) {
    console.error('Error fetching courses:', error);
  }
};

export default fetchCourses;
