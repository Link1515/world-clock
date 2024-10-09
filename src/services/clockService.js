import { getCurrentTime } from '~/services/timeService';

export const createClock = (timezone, hourDisplay) => ({
  timezone,
  time: getCurrentTime(timezone, hourDisplay)
});

export const getClocksFromTimezones = (timezones, hourDisplay) =>
  timezones.map(timezone => createClock(timezone, hourDisplay));

export const addClockByTimezone = (clocks, timezone, hourDisplay) =>
  clocks.push(createClock(timezone, hourDisplay));

export const removeClockByTimezone = (clocks, timezone) => {
  const removeIndex = clocks.findIndex(clock => clock.timezone === timezone);
  if (removeIndex < 0) return;
  clocks.splice(removeIndex, 1);
};

export const updateClocks = (clocks, hourDisplay) => {
  clocks.forEach(clock => {
    clock.time = getCurrentTime(clock.timezone, hourDisplay);
  });
};
