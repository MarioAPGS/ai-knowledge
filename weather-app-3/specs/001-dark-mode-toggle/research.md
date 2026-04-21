# Research: Dark Mode Toggle

**Date**: 2026-04-21

## R1: Theme switching mechanism

**Decision**: Use a `data-theme="dark"` attribute on `<html>` combined with CSS custom property overrides in `index.css`.

**Rationale**: The project already uses CSS custom properties (`--md-*`) everywhere. Overriding them under `[data-theme="dark"]` requires zero changes to existing component CSS files. This is the simplest, most maintainable approach with no new dependencies.

**Alternatives considered**:
- CSS class on `<body>` (e.g., `.dark-mode`) — equivalent but `data-` attributes are semantically cleaner for state
- Separate dark stylesheet — more complex to maintain, requires file switching logic
- CSS `prefers-color-scheme` media query only — doesn't allow manual toggle override

## R2: State management for theme

**Decision**: `useState` in `Layout.jsx` with initialization from a helper function in `src/utils/theme.js`.

**Rationale**: Constitution mandates `useState` only (no external state managers). Since Layout wraps all pages, the state is effectively global. The helper function encapsulates localStorage read + `prefers-color-scheme` detection.

**Alternatives considered**:
- React Context — adds complexity; unnecessary since Layout is the single root and the `data-theme` attribute on `<html>` is what actually drives the visual change (no need to pass theme state down)
- Global variable — not reactive, harder to sync with toggle UI

## R3: Persistence strategy

**Decision**: Store `"light"` or `"dark"` string in `localStorage` under key `"theme"`. Read on initialization; write on toggle.

**Rationale**: Simple key-value storage, synchronous reads (no flash of wrong theme), no new dependencies.

**Alternatives considered**:
- sessionStorage — doesn't persist across sessions (fails requirement)
- Cookie — unnecessary complexity for a client-only preference

## R4: OS preference detection

**Decision**: Use `window.matchMedia('(prefers-color-scheme: dark)')` on initialization only (when no localStorage value exists).

**Rationale**: Spec assumption says no need to react in real-time to OS changes. Checking once on load is sufficient and simpler.

**Alternatives considered**:
- `addEventListener` on matchMedia for live updates — spec explicitly says not required; adds complexity

## R5: Dark mode color palette (Material Design 3)

**Decision**: Follow MD3 dark theme guidelines — dark surfaces (#1c1b1f or similar), lighter text, tonal adjustments for primary/secondary.

**Rationale**: Active style is Material Design 3 per `CONTRIBUTING.md`. MD3 has well-defined dark color scheme conventions.

**Alternatives considered**:
- Custom palette — violates constitution principle II (must follow active style)
- Simple inversion — looks bad, doesn't follow MD3 guidelines

## R6: Flash of incorrect theme (FOIT) prevention

**Decision**: Apply theme attribute synchronously before React renders by reading localStorage in a small inline script in `index.html`, or by ensuring the `useEffect` in Layout runs before first paint.

**Rationale**: Since React hydration is fast with Vite (no SSR), the `useState` initializer reading localStorage synchronously should prevent visible flash in practice. If needed, a tiny inline script in `index.html` can set the attribute before any CSS loads.

**Alternatives considered**:
- Server-side rendering — not applicable (Vite SPA)
- CSS-only with `prefers-color-scheme` — doesn't account for manual override stored in localStorage
