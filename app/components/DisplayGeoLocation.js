const DisplayGeoLocation = ({ geoLocationData, loading, error }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h3>Course New Geo Location</h3>
      <p>Admin Location: {geoLocationData?.geoLocation.lat}, {geoLocationData?.geoLocation.lng}</p>
      <p><strong>Pin:</strong> {geoLocationData?.pin}</p>
    </div>
  );
};

export default DisplayGeoLocation;
