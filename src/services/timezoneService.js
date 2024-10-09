const getUserTimezone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;

export const getAvailableTimezones = () => Intl.supportedValuesOf('timeZone');

export const getTimezones = () => {
  const timezones = window.localStorage.getItem('timezones');
  return timezones ? JSON.parse(timezones) : [getUserTimezone()];
};

const setTimezonesToLocalStorage = timezones => {
  window.localStorage.setItem('timezones', JSON.stringify(timezones));
};

export const updateTimezonesLocalStorageByClocks = clocks => {
  const timezones = clocks.map(clock => clock.timezone);
  setTimezonesToLocalStorage(timezones);
};
