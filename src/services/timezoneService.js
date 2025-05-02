import { DEFAULT_TIMEZONE } from '~/constants/time';
import { STORAGE_KEYS } from '~/constants/storage';

export const getUserTimezone = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (error) {
    console.error('Failed to get user timezone:', error);
    return DEFAULT_TIMEZONE;
  }
};

export const getAvailableTimezones = () => {
  try {
    return Intl.supportedValuesOf('timeZone');
  } catch (error) {
    console.error('Failed to get available timezones:', error);
    return [DEFAULT_TIMEZONE];
  }
};

export const getTimezones = () => {
  try {
    const timezones = window.localStorage.getItem(STORAGE_KEYS.TIMEZONES);
    return timezones ? JSON.parse(timezones) : [getUserTimezone()];
  } catch (error) {
    console.error('Failed to get timezones from localStorage:', error);
    return [getUserTimezone()];
  }
};

const setTimezonesToLocalStorage = timezones => {
  try {
    window.localStorage.setItem(STORAGE_KEYS.TIMEZONES, JSON.stringify(timezones));
  } catch (error) {
    console.error('Failed to save timezones to localStorage:', error);
  }
};

export const updateTimezonesLocalStorageByClocks = clocks => {
  try {
    const timezones = clocks.map(clock => clock.timezone);
    setTimezonesToLocalStorage(timezones);
  } catch (error) {
    console.error('Failed to update timezones in localStorage:', error);
  }
};
