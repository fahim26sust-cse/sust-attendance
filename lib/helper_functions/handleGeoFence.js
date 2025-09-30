const handleGeoFence = (geoLocation, courseCode, setPin, setSuccess, setGeoFenceCreated, permission, distance) => {
  if (geoLocation && courseCode && distance) {
    const generatedPin = `${Math.floor(Math.random() * 10000)}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
    setPin(generatedPin);

    fetch('/api/admin/geo-fence', {
      method: 'POST',
      body: JSON.stringify({ courseCode, geoLocation, pin: generatedPin, permission, distance }), // Include distance here
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSuccess(true);
          setGeoFenceCreated(true);
        } else {
          alert('Error saving geo-fence.');
        }
      });
  } else {
    alert('Please select a course, get the location, and enter the distance');
  }
};

export default handleGeoFence;
