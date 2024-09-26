import { DateTime } from 'luxon';

export const HOUR_DISPLAY = {
  HOUR_12: '12',
  HOUR_24: '24'
};

export const getUserTimezone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;

export const getAvailableTimezones = () => Intl.supportedValuesOf('timeZone');

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

export const getHourDisplay = () =>
  window.localStorage.getItem('hourDisplayType') || HOUR_DISPLAY.HOUR_24;

export const setHourDisplayToLocalStorage = hourDisplay => {
  window.localStorage.setItem('hourDisplayType', hourDisplay);
};

export const toggleHourDisplayStr = hourDisplay =>
  hourDisplay === HOUR_DISPLAY.HOUR_12
    ? HOUR_DISPLAY.HOUR_24
    : HOUR_DISPLAY.HOUR_12;
