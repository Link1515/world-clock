export const HOUR_DISPLAY = {
  HOUR_12: '12',
  HOUR_24: '24'
};

export const getHourDisplay = () =>
  window.localStorage.getItem('hourDisplayType') || HOUR_DISPLAY.HOUR_24;

export const setHourDisplayToLocalStorage = hourDisplay =>
  window.localStorage.setItem('hourDisplayType', hourDisplay);

export const toggleHourDisplay = hourDisplay =>
  hourDisplay === HOUR_DISPLAY.HOUR_12
    ? HOUR_DISPLAY.HOUR_24
    : HOUR_DISPLAY.HOUR_12;
