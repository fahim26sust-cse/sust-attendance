import { REJECT_ACCURACY_M, MAX_SPEED_MPS, WINDOW_FIXES, GEO_ERROR_MAP } from '../constants';

export const describeGeoError = (err) => {
  if (!err) return 'Unknown geolocation error';
  const base = GEO_ERROR_MAP[err.code] || (Number.isFinite(err.code) ? `Code ${err.code}` : null);
  if (base && err.message) return `${base} — ${err.message}`;
  if (base) return base;
  if (err.message) return err.message;
  return 'Unknown geolocation error';
};

export function haversine(a, b) {
  if (!a || !b) return Infinity;
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLon = ((b.lng - a.lng) * Math.PI) / 180;
  const s = Math.sin(dLat / 2) ** 2
    + Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180)
    * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s)) * 1000;
}

export function averageFixes(arr) {
  if (!arr.length) return null;
  const sum = arr.reduce((a, f) => ({
    lat: a.lat + f.lat,
    lng: a.lng + f.lng,
    accuracy: a.accuracy + f.accuracy,
    timestamp: Math.max(a.timestamp, f.timestamp),
  }), { lat: 0, lng: 0, accuracy: 0, timestamp: 0 });
  const n = arr.length;
  return { lat: sum.lat / n, lng: sum.lng / n, accuracy: sum.accuracy / n, timestamp: sum.timestamp };
}

export const toAccuracyBadge = (loc) =>
  loc?.accuracy != null ? `${Math.round(loc.accuracy)} m` : '—';

export const toAgeSec = (loc) =>
  loc?.timestamp ? Math.max(0, Math.round((Date.now() - loc.timestamp) / 1000)) : null;

export { REJECT_ACCURACY_M, MAX_SPEED_MPS, WINDOW_FIXES };
