export const isEmpty = (value) => !value || !value.toString().trim();

export const isValidDateFormat = (date) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) return false;

  const parsedDate = new Date(date);
  return !isNaN(parsedDate) && parsedDate.toISOString().split("T")[0] === date;
};
