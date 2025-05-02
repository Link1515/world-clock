import { HOUR_DISPLAY } from '~/constants/time';
import { STORAGE_KEYS } from '~/constants/storage';

export const getHourDisplay = () => {
  try {
    return window.localStorage.getItem(STORAGE_KEYS.HOUR_DISPLAY) || HOUR_DISPLAY.HOUR_24;
  } catch (error) {
    console.error('Failed to get hour display from localStorage:', error);
    return HOUR_DISPLAY.HOUR_24;
  }
};

export const setHourDisplayToLocalStorage = hourDisplay => {
  try {
    window.localStorage.setItem(STORAGE_KEYS.HOUR_DISPLAY, hourDisplay);
  } catch (error) {
    console.error('Failed to save hour display to localStorage:', error);
  }
};

export const toggleHourDisplay = hourDisplay => {
  try {
    return hourDisplay === HOUR_DISPLAY.HOUR_12
      ? HOUR_DISPLAY.HOUR_24
      : HOUR_DISPLAY.HOUR_12;
  } catch (error) {
    console.error('Failed to toggle hour display:', error);
    return HOUR_DISPLAY.HOUR_24;
  }
};
