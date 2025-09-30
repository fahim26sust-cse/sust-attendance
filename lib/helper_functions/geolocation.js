export const haversine = (a, b) => {
  if (!a || !b) return Infinity;
  const R = 6371; 
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLon = ((b.lng - a.lng) * Math.PI) / 180;
  const s = Math.sin(dLat / 2) ** 2 + Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s)) * 1000;
};

export const describeGeoError = (err) => {
  const GEO_ERROR_MAP = { 1: 'Permission denied', 2: 'Position unavailable', 3: 'Location request timed out' };
  if (!err) return 'Unknown geolocation error';
  const base = GEO_ERROR_MAP[err.code] || (Number.isFinite(err.code) ? `Code ${err.code}` : null);
  return base && err.message ? `${base} — ${err.message}` : base || err.message || 'Unknown geolocation error';
};
