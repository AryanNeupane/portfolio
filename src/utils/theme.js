const STORAGE_KEY = 'aryan_portfolio_theme';

export const THEME_OPTIONS = ['dark', 'light', 'system'];

export const resolveTheme = (preference) => {
  if (preference === 'system') {
    if (window.matchMedia?.('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  }
  return preference === 'light' ? 'light' : 'dark';
};

export const getStoredTheme = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && THEME_OPTIONS.includes(saved)) {
    return saved;
  }
  return 'dark';
};

export const getInitialTheme = () => getStoredTheme();

export const applyTheme = (preference) => {
  const resolved = resolveTheme(preference);
  document.documentElement.setAttribute('data-theme', resolved);
  document.documentElement.setAttribute('data-theme-preference', preference);
  localStorage.setItem(STORAGE_KEY, preference);
};

export const initThemeListeners = (onChange) => {
  const media = window.matchMedia('(prefers-color-scheme: light)');
  const handler = () => {
    if (getStoredTheme() === 'system') {
      applyTheme('system');
      onChange?.('system');
    }
  };
  media.addEventListener('change', handler);
  return () => media.removeEventListener('change', handler);
};
