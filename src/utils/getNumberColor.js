export const getNumberColor = (value) => {
  if (value === null || value === undefined || isNaN(value)) return '#fff';
  
  const number = parseFloat(value);
  return number >= 0 ? 'green' : '#FF3B30';
};
