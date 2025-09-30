export const handleDownloadExcel = async (attendance, courseCode) => {
  if (!attendance || attendance.length === 0) return;

  const filenameBase = `attendance_${courseCode || 'all'}`;
  try {
    const XLSX = await import('xlsx');
    const ws = XLSX.utils.json_to_sheet(attendance);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Attendance');
    XLSX.writeFile(wb, `${filenameBase}.xlsx`);
  } catch (err) {
    console.warn('xlsx not available, falling back to CSV export.', err);
    const csv = jsonToCSV(attendance);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filenameBase}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
};

const jsonToCSV = (rows) => {
  if (!rows.length) return '';
  const colSet = new Set();
  rows.forEach(r => Object.keys(r || {}).forEach(k => colSet.add(k)));
  const cols = Array.from(colSet);

  const esc = (v) => {
    const s = v == null ? '' : String(v);
    if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };

  const header = cols.map(esc).join(',');
  const body = rows.map(r => cols.map(c => esc(r?.[c])).join(',')).join('\n');
  return `${header}\n${body}`;
};
