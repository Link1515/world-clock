import { DateTime } from 'luxon';
import { HOUR_DISPLAY, TIME_FORMAT, DEFAULT_TIMEZONE } from '~/constants/time';

export const getCurrentTime = (
  timezone,
  hourDisplay = HOUR_DISPLAY.HOUR_24
) => {
  try {
    const format = hourDisplay === HOUR_DISPLAY.HOUR_24
      ? TIME_FORMAT.HOUR_24
      : TIME_FORMAT.HOUR_12;
    
    const now = DateTime.now().setZone(timezone);
    
    if (!now.isValid) {
      throw new Error(`Invalid timezone: ${timezone}`);
    }
    
    return now.toFormat(format);
  } catch (error) {
    console.error('Failed to get current time:', error);
    return DateTime.now()
      .setZone(DEFAULT_TIMEZONE)
      .toFormat(hourDisplay === HOUR_DISPLAY.HOUR_24
        ? TIME_FORMAT.HOUR_24
        : TIME_FORMAT.HOUR_12);
  }
};
