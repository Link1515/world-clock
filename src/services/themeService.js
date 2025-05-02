export const THEME = {
  LIGHT: 'light',
  DARK: 'dark'
};

const getPrefersColorScheme = () => {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return isDark ? THEME.DARK : THEME.LIGHT;
};

const setThemeToLocalStorage = theme =>
  window.localStorage.setItem('theme', theme);

const getThemeFromLocalStorage = () => window.localStorage.getItem('theme');

export const getTheme = () =>
  getThemeFromLocalStorage() || getPrefersColorScheme();

const applyTheme = theme => {
  const htmlEl = document.querySelector('html');
  
  // Add transition class
  htmlEl.classList.add('theme-transition');
  
  // Apply theme
  htmlEl.dataset.theme = theme;
  
  // Remove transition class after animation
  setTimeout(() => {
    htmlEl.classList.remove('theme-transition');
  }, 300);
};

export const initTheme = () => {
  const savedTheme = getThemeFromLocalStorage();
  if (!savedTheme) return;
  
  // Prevent transition on initial load
  const htmlEl = document.querySelector('html');
  htmlEl.dataset.theme = savedTheme;
};

export const toggleTheme = () => {
  let theme = getTheme();
  theme = theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;

  setThemeToLocalStorage(theme);
  applyTheme(theme);
};
