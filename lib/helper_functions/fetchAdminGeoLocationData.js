const fetchAdminGeoLocationData = async (courseCode, setGeoLocationData, setError, setLoading) => {
  if (!courseCode) return;
  setLoading(true);
  setError(null);
  try {
    const response = await fetch(`/api/admin/geo-fence?courseCode=${courseCode}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch geo-fence data. Status: ${response.status}`);
    }

    const data = await response.json();
    if (!data || Object.keys(data).length === 0) {
      throw new Error('No geo-fence data found for the selected course');
    }
    setGeoLocationData(data);
  } catch (err) {
    setError(err.message || 'Failed to retrieve geo-fence');
    setGeoLocationData(null);
  } finally {
    setLoading(false);
  }
};

export default fetchAdminGeoLocationData;
