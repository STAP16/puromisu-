export function formatToDDMMYYYY(value) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null; // некорректная дата

  const pad = (n) => String(n).padStart(2, "0");

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1); // месяцы от 0 до 11
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
