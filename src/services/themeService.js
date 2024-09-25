const getPrefersColorScheme = () => {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return isDark ? 'dark' : 'light';
};

const setThemeToLocalStorage = theme => {
  window.localStorage.setItem('theme', theme);
};

const getThemeFromLocalStorage = () => window.localStorage.getItem('theme');

const applyTheme = theme => {
  const htmlEl = document.querySelector('html');
  htmlEl.dataset.theme = theme;
};

export const initTheme = () => {
  const savedTheme = getThemeFromLocalStorage();
  if (!savedTheme) return;
  applyTheme(savedTheme);
};

export const toggleTheme = () => {
  let theme = getThemeFromLocalStorage() || getPrefersColorScheme();
  theme = theme === 'light' ? 'dark' : 'light';

  setThemeToLocalStorage(theme);
  applyTheme(theme);
};
