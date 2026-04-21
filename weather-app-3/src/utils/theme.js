const STORAGE_KEY = 'theme'

/**
 * Reads the initial theme from localStorage or OS preference.
 * Falls back to 'light' if neither is available.
 * @returns {'light' | 'dark'}
 */
export function getInitialTheme() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') {
    return stored
  }

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }

  return 'light'
}

/**
 * Persists the theme preference to localStorage.
 * @param {'light' | 'dark'} theme
 */
export function saveTheme(theme) {
  localStorage.setItem(STORAGE_KEY, theme)
}

/**
 * Applies the theme by setting the data-theme attribute on <html>.
 * @param {'light' | 'dark'} theme
 */
export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme)
}
