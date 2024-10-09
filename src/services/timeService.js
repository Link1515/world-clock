import { DateTime } from 'luxon';
import { HOUR_DISPLAY } from '~/services/hourDisplayService';

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
