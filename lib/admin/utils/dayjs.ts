// import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';

// dayjs.extend(relativeTime);

// export const fromNow = (day: Date | string) => {
//   return dayjs(day).fromNow();
// };

// export const dateRange = (date1: Date | string, date2: Date | string) => {
//   return `${dayjs(date1).format('ddd, MMM DD (h A)')} - ${dayjs(date2).format(
//     'ddd, MMM DD (h A)',
//   )}`;
// };

// export const dateFormat = (date: Date | string) =>
//   `${dayjs(date).format('ddd, MMM DD YYYY (h A)')}`;

// export const timeFormat = (date: Date | string) =>
//   `${dayjs(date).format('ddd, MMM DD YYYY (h:mm:ss A)')}`;

// export const dateFormatDays = (date: Date | string, formatter?: string) =>
//   `${dayjs(date).format(formatter ?? 'MMM DD YYYY')}`;

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
