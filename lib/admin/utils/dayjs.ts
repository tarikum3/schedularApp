
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const fromNow = (day: Date | string) => {
  return dayjs(day).fromNow();
};

export const dateRange = (date1: Date | string, date2: Date | string) => {
  return `${dayjs(date1).format('ddd, MMM DD (h A)')} - ${dayjs(date2).format(
    'ddd, MMM DD (h A)',
  )}`;
};

export const dateFormat = (date: Date | string) =>
  `${dayjs(date).format('ddd, MMM DD YYYY (h A)')}`;

export const timeFormat = (date: Date | string) =>
  `${dayjs(date).format('ddd, MMM DD YYYY (h:mm:ss A)')}`;

export const dateFormatDays = (date: Date | string, formatter?: string) =>
  `${dayjs(date).format(formatter ?? 'MMM DD YYYY')}`;


