import { flushSync } from 'react-dom';
import { create } from 'zustand';

export type Theme = 'light' | 'dark';

// index.html applies the theme before the first paint (same key, same rule); keep them in sync.
const STORAGE_KEY = 'bete-theme';
const THEME_COLORS: Record<Theme, string> = { light: '#f5f3ef', dark: '#0f1012' };

const systemDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;

function savedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
}

type ThemeState = { theme: Theme };

export const useThemeStore = create<ThemeState>()(() => ({
  theme: document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
}));

function setTheme(theme: Theme) {
  apply(theme);
  useThemeStore.setState({ theme });
}

/**
 * Switches the theme and remembers the choice. Where the browser can, the new theme spreads in a
 * circle from `origin` (the bulb that was pressed), like light filling the room.
 */
export function toggleTheme(origin?: { x: number; y: number }) {
  const next: Theme = useThemeStore.getState().theme === 'dark' ? 'light' : 'dark';
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Private mode: the choice lasts until the tab closes.
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!origin || reducedMotion || !document.startViewTransition) {
    setTheme(next);
    return;
  }

  const transition = document.startViewTransition(() => flushSync(() => setTheme(next)));
  const radius = Math.hypot(
    Math.max(origin.x, window.innerWidth - origin.x),
    Math.max(origin.y, window.innerHeight - origin.y),
  );
  void transition.ready.then(() =>
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${origin.x}px ${origin.y}px)`,
          `circle(${radius}px at ${origin.x}px ${origin.y}px)`,
        ],
      },
      {
        duration: 700,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        pseudoElement: '::view-transition-new(root)',
      },
    ),
  );
}

/** Until the visitor picks a theme, follow the system's. Call once at startup. */
export function followSystemTheme() {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (!savedTheme()) setTheme(systemDark() ? 'dark' : 'light');
  });
}
