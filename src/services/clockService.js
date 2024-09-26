import { getCurrentTime } from '~/services/timeService';

export const getClocksFromTimezones = (timezones, hourDisplay) =>
  timezones.map(timezone => ({
    timezone,
    time: getCurrentTime(timezone, hourDisplay)
  }));
