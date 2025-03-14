export const startOfYear = (date: Date): Date => {
  return new Date(date.getFullYear(), 0, 1);
};

export const endOfYear = (date: Date): Date => {
  return new Date(date.getFullYear(), 11, 31, 23, 59, 59, 999);
};

export const subYears = (date: Date, years: number): Date => {
  const newDate = new Date(date);
  newDate.setFullYear(newDate.getFullYear() - years);
  return newDate;
};

export const dateFormatDays = (date: Date, format = "YYYY-MM-DD"): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  switch (format) {
    case "YYYY-MM-DD":
      return `${year}-${month}-${day}`;
    default:
      return date.toISOString().split("T")[0];
  }
};
