import { DateTime } from 'luxon';

export const HOUR_DISPLAY = {
  HOUR_12: '12',
  HOUR_24: '24'
};

/**
 * ========
 * timezone
 * ========
 * */

export const getUserTimezone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;

export const getAvailableTimezones = () => Intl.supportedValuesOf('timeZone');

export const getTimezones = () => {
  const timezones = window.localStorage.getItem('timezones');
  return timezones ? JSON.parse(timezones) : [getUserTimezone()];
};

export const setTimezonesToLocalStorage = timezones => {
  window.localStorage.setItem('timezones', JSON.stringify(timezones));
};

export const updateTimezonesLocalStorageByClocks = clocks => {
  const timezones = clocks.map(clock => clock.timezone);
  setTimezonesToLocalStorage(timezones);
};

/**
 * ============
 * hour display
 * ============
 */

export const getHourDisplay = () =>
  window.localStorage.getItem('hourDisplayType') || HOUR_DISPLAY.HOUR_24;

export const setHourDisplayToLocalStorage = hourDisplay => {
  window.localStorage.setItem('hourDisplayType', hourDisplay);
};

export const toggleHourDisplay = hourDisplay =>
  hourDisplay === HOUR_DISPLAY.HOUR_12
    ? HOUR_DISPLAY.HOUR_24
    : HOUR_DISPLAY.HOUR_12;

/**
 * ====
 * Time
 * ====
 */

export const getCurrentTime = (
  timezone,
  hourDisplay = HOUR_DISPLAY.HOUR_24
) => {
  if (!timezone) {
    timezone = getUserTimezone();
  }
  const format =
    hourDisplay === HOUR_DISPLAY.HOUR_24 ? 'HH:mm:ss' : 'h:mm:ss a';
  return DateTime.now().setZone(timezone).toFormat(format);
};
