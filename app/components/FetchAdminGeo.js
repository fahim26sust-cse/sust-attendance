'use client'
import React, { useState, useEffect } from 'react';
import fetchAdminGeoLocationData from '@/lib/helper_functions/fetchAdminGeoLocationData';
import DisplayGeoLocation from '@/app/components/DisplayGeoLocation';

const FetchAdminGeo = ({ courseCode }) => {
  const [geoLocationData, setGeoLocationData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminGeoLocationData(courseCode, setGeoLocationData, setError, setLoading);
  }, [courseCode]);

  return <DisplayGeoLocation geoLocationData={geoLocationData} loading={loading} error={error} />;
};

export default FetchAdminGeo;
