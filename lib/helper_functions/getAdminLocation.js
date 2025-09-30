const getAdminLocation = (setGeoLocation, resetForm) => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      setGeoLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      resetForm();
    },
    (error) => {
      alert('Error getting location');
    }
  );
};

export default getAdminLocation;

