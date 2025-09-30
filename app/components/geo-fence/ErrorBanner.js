'use client';

export default function ErrorBanner({ error }) {
  if (!error) return null;
  return (
    <div
      style={{
        color: '#ffd6d6',
        background: 'rgba(255,0,0,0.08)',
        border: '1px solid rgba(255,0,0,0.2)',
        padding: '8px 12px',
        borderRadius: 6,
        marginBottom: 8,
      }}
    >
      {error}
    </div>
  );
}
