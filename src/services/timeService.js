import { DateTime } from 'luxon';

export const getUserTimezone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;

export const getCurrentTime = timezone => {
  if (!timezone) {
    timezone = getUserTimezone();
  }
  return DateTime.now().setZone(timezone).toFormat('HH:mm:ss');
};
