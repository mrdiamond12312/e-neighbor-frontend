import dayjs from 'dayjs';

import {
  FORMAT_DATE_MONTH,
  FORMAT_DATE_NORMAL,
  FORMAT_DATETIME,
  FORMAT_TIME_SHORT,
} from '@/const/date';

export const getDateFormatNormal = (dateString: string | number | undefined) => {
  const timeObject = dayjs(dateString);
  return timeObject.isValid() ? timeObject.format(FORMAT_DATE_NORMAL) : null;
};

export const getDateTimeFormatNormal = (dateString: string | number | undefined) => {
  const timeObject = dayjs(dateString);
  return timeObject.isValid() ? timeObject.format(FORMAT_DATETIME) : null;
};

export const getDateMonth = (dateString: string | number | undefined) => {
  const timeObject = dayjs(dateString);
  return timeObject.isValid() ? timeObject.format(FORMAT_DATE_MONTH) : null;
};

export const getTimeFormatShort = (dateString: string | number | undefined) => {
  const timeObject = dayjs(dateString);
  return timeObject.isValid() ? timeObject.format(FORMAT_TIME_SHORT) : null;
};

export const getDateFromTimestamp = (timestamp: number | string | undefined) => {
  if (typeof timestamp === 'string') return dayjs(parseInt(timestamp)).format(FORMAT_DATE_NORMAL);
  if (typeof timestamp === 'number') return dayjs(timestamp).format(FORMAT_DATE_NORMAL);
  return null;
};

export const getHourFromTimestamp = (timestamp: number | string | undefined) => {
  if (typeof timestamp === 'string') return dayjs(parseInt(timestamp)).format(FORMAT_TIME_SHORT);
  if (typeof timestamp === 'number') return dayjs(timestamp).format(FORMAT_TIME_SHORT);
  return null;
};

export const parseTimestampToISOString = (timestamp: number | string | undefined | null) => {
  if (typeof timestamp === 'string') return new Date(parseInt(timestamp)).toISOString();
  if (typeof timestamp === 'number') return new Date(timestamp).toISOString();
  return null;
};

export const checkMinYear = (minimumAge?: number) => {
  return (current: dayjs.Dayjs) => {
    const diff = dayjs().diff(current, 'years');
    return minimumAge ? diff < minimumAge : false;
  };
};

/**
 * Description add number of day for day object
 * @date 7/7/2023 - 1:36:19 PM
 *
 * @param {number} numberDay
 * @param {dayjs.Dayjs} dayObject
 * @returns {dayjs.Dayjs} dayObject
 */
export const addDay = (numberDay: number, dayObject: dayjs.Dayjs) => {
  return dayObject.add(numberDay, 'day');
};
