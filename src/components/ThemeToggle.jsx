import React, { useState, useEffect } from 'react';
import { Monitor, Sun, Moon } from 'lucide-react';
import { getInitialTheme, applyTheme, initThemeListeners, THEME_OPTIONS } from '../utils/theme';

const ICONS = { dark: Moon, light: Sun, system: Monitor };
const LABELS = { dark: 'Dark', light: 'Light', system: 'System' };

export default function ThemeToggle() {
  const [preference, setPreference] = useState(getInitialTheme);

  useEffect(() => {
    applyTheme(preference);
    return initThemeListeners(setPreference);
  }, [preference]);

  const cycleTheme = () => {
    const idx = THEME_OPTIONS.indexOf(preference);
    const next = THEME_OPTIONS[(idx + 1) % THEME_OPTIONS.length];
    setPreference(next);
    applyTheme(next);
  };

  const Icon = ICONS[preference] || Monitor;

  return (
    <button
      className="theme-toggle-btn"
      onClick={cycleTheme}
      aria-label={`Theme: ${LABELS[preference]}. Click to change.`}
      title={`Theme: ${LABELS[preference]}`}
    >
      <Icon size={16} />
      <span className="theme-toggle-label">{LABELS[preference]}</span>
    </button>
  );
}
