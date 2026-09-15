export const formatDate = (date, format = 'human') => {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';

  return format === 'iso'
    ? d.toISOString()
    : d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: format === 'short' ? 'short' : 'long',
        day: 'numeric'
      });
};
