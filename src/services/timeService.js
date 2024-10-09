import { DateTime } from 'luxon';
import { HOUR_DISPLAY } from '~/services/hourDisplayService';

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
