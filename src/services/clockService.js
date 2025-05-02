import { getCurrentTime } from '~/services/timeService';
import { updateTimezonesLocalStorageByClocks } from '~/services/timezoneService';
import { DEFAULT_TIMEZONE } from '~/constants/time';

export const createClock = (timezone, hourDisplay) => {
  try {
    return {
      timezone,
      time: getCurrentTime(timezone, hourDisplay)
    };
  } catch (error) {
    console.error('Failed to create clock:', error);
    return {
      timezone: DEFAULT_TIMEZONE,
      time: getCurrentTime(DEFAULT_TIMEZONE, hourDisplay)
    };
  }
};

export const getClocksFromTimezones = (timezones, hourDisplay) => {
  try {
    return timezones.map(timezone => createClock(timezone, hourDisplay));
  } catch (error) {
    console.error('Failed to create clocks from timezones:', error);
    return [createClock(DEFAULT_TIMEZONE, hourDisplay)];
  }
};

export const addClock = (clocks, timezone, hourDisplay) => {
  try {
    addClockByTimezone(clocks, timezone, hourDisplay);
    updateTimezonesLocalStorageByClocks(clocks);
    refreshClocks(clocks, hourDisplay);
  } catch (error) {
    console.error('Failed to add clock:', error);
  }
};

export const removeClock = (clocks, timezone, hourDisplay) => {
  try {
    removeClockByTimezone(clocks, timezone);
    updateTimezonesLocalStorageByClocks(clocks);
    refreshClocks(clocks, hourDisplay);
  } catch (error) {
    console.error('Failed to remove clock:', error);
  }
};

export const refreshClocks = (clocks, hourDisplay) => {
  try {
    updateClocks(clocks, hourDisplay);
  } catch (error) {
    console.error('Failed to refresh clocks:', error);
  }
};

export const handleDragEnd = (clocks) => {
  try {
    updateTimezonesLocalStorageByClocks(clocks);
  } catch (error) {
    console.error('Failed to handle drag end:', error);
  }
};

// Private functions
const addClockByTimezone = (clocks, timezone, hourDisplay) => {
  try {
    clocks.push(createClock(timezone, hourDisplay));
  } catch (error) {
    console.error('Failed to add clock by timezone:', error);
  }
};

const removeClockByTimezone = (clocks, timezone) => {
  try {
    const removeIndex = clocks.findIndex(clock => clock.timezone === timezone);
    if (removeIndex < 0) return;
    clocks.splice(removeIndex, 1);
  } catch (error) {
    console.error('Failed to remove clock by timezone:', error);
  }
};

const updateClocks = (clocks, hourDisplay) => {
  try {
    clocks.forEach(clock => {
      clock.time = getCurrentTime(clock.timezone, hourDisplay);
    });
  } catch (error) {
    console.error('Failed to update clocks:', error);
  }
};
