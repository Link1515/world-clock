import { getCurrentTime } from '~/services/timeService';
import { updateTimezonesLocalStorageByClocks } from '~/services/timezoneService';

export const createClock = (timezone, hourDisplay) => ({
  timezone,
  time: getCurrentTime(timezone, hourDisplay)
});

export const getClocksFromTimezones = (timezones, hourDisplay) =>
  timezones.map(timezone => createClock(timezone, hourDisplay));

export const addClock = (clocks, timezone, hourDisplay) => {
  addClockByTimezone(clocks, timezone, hourDisplay);
  updateTimezonesLocalStorageByClocks(clocks);
  refreshClocks(clocks, hourDisplay);
};

export const removeClock = (clocks, timezone, hourDisplay) => {
  removeClockByTimezone(clocks, timezone);
  updateTimezonesLocalStorageByClocks(clocks);
  refreshClocks(clocks, hourDisplay);
};

export const refreshClocks = (clocks, hourDisplay) => {
  updateClocks(clocks, hourDisplay);
};

export const handleDragEnd = (clocks) => {
  updateTimezonesLocalStorageByClocks(clocks);
};

// Private functions
const addClockByTimezone = (clocks, timezone, hourDisplay) =>
  clocks.push(createClock(timezone, hourDisplay));

const removeClockByTimezone = (clocks, timezone) => {
  const removeIndex = clocks.findIndex(clock => clock.timezone === timezone);
  if (removeIndex < 0) return;
  clocks.splice(removeIndex, 1);
};

const updateClocks = (clocks, hourDisplay) => {
  clocks.forEach(clock => {
    clock.time = getCurrentTime(clock.timezone, hourDisplay);
  });
};
