# Quickstart: Dark Mode Toggle

**Date**: 2026-04-21

## What this feature does

Adds a toggle button in the app header that switches between light and dark color themes. The preference is saved in the browser and respected on future visits. First-time visitors see the theme matching their OS setting.

## Files to modify

1. **`src/index.css`** — Add `[data-theme="dark"]` block with dark color variable overrides
2. **`src/components/Layout.jsx`** — Add toggle button in header, manage theme state with `useState`
3. **`src/components/Layout.css`** — Style the toggle button following Material Design 3

## Files to create

1. **`src/utils/theme.js`** — Helper functions:
   - `getInitialTheme()`: Read localStorage, fall back to OS preference, fall back to `"light"`
   - `saveTheme(theme)`: Write to localStorage
   - `applyTheme(theme)`: Set `data-theme` attribute on `document.documentElement`

## Implementation order

1. Create `src/utils/theme.js` with helper functions
2. Add dark theme CSS variables to `src/index.css`
3. Add toggle button and state logic to `Layout.jsx`
4. Style the toggle button in `Layout.css`
5. Verify all existing pages render correctly in both modes

## Key decisions

- Theme is applied via `data-theme` attribute on `<html>`, not CSS classes
- No React Context needed — `Layout` manages state, DOM attribute drives CSS
- No new dependencies required
- All existing CSS already uses `var(--md-*)` so no component CSS changes needed
