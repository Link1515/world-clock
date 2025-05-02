import { THEME, THEME_TRANSITION_DURATION } from '~/constants/theme';
import { STORAGE_KEYS } from '~/constants/storage';


const getPrefersColorScheme = () => {
  try {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return isDark ? THEME.DARK : THEME.LIGHT;
  } catch (error) {
    console.error('Failed to get preferred color scheme:', error);
    return THEME.LIGHT;
  }
};

const setThemeToLocalStorage = theme => {
  try {
    window.localStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch (error) {
    console.error('Failed to save theme to localStorage:', error);
  }
};

const getThemeFromLocalStorage = () => {
  try {
    return window.localStorage.getItem(STORAGE_KEYS.THEME);
  } catch (error) {
    console.error('Failed to get theme from localStorage:', error);
    return null;
  }
};

export const getTheme = () => {
  try {
    return getThemeFromLocalStorage() || getPrefersColorScheme();
  } catch (error) {
    console.error('Failed to get theme:', error);
    return THEME.LIGHT;
  }
};

const applyTheme = theme => {
  try {
    const htmlEl = document.querySelector('html');
    if (!htmlEl) {
      throw new Error('HTML element not found');
    }
    
    htmlEl.classList.add('theme-transition');
    htmlEl.dataset.theme = theme;
    
    setTimeout(() => {
      htmlEl.classList.remove('theme-transition');
    }, THEME_TRANSITION_DURATION);
  } catch (error) {
    console.error('Failed to apply theme:', error);
  }
};

export const initTheme = () => {
  try {
    const savedTheme = getThemeFromLocalStorage();
    if (!savedTheme) return;
    
    const htmlEl = document.querySelector('html');
    if (!htmlEl) {
      throw new Error('HTML element not found');
    }
    
    htmlEl.dataset.theme = savedTheme;
  } catch (error) {
    console.error('Failed to initialize theme:', error);
  }
};

export const toggleTheme = () => {
  try {
    let theme = getTheme();
    theme = theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;

    setThemeToLocalStorage(theme);
    applyTheme(theme);
  } catch (error) {
    console.error('Failed to toggle theme:', error);
  }
};
