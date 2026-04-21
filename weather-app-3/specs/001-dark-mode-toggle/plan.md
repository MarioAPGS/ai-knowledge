# Implementation Plan: Dark Mode Toggle

**Branch**: `001-dark-mode-toggle` | **Date**: 2026-04-21 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `specs/001-dark-mode-toggle/spec.md`

## Summary

Add a dark/light mode toggle visible on all pages (in the header). The theme preference persists via localStorage and respects the OS `prefers-color-scheme` as initial value. Implementation uses CSS custom properties on `:root` with a `[data-theme="dark"]` attribute on the root element, managed by React state in the Layout component.

## Technical Context

**Language/Version**: JavaScript (ES2022+), React 19  
**Primary Dependencies**: React 19, React Router 7, Vite 8  
**Storage**: localStorage (browser) for theme preference  
**Testing**: Manual (no test framework configured in this project)  
**Target Platform**: Modern browsers (desktop + mobile)  
**Project Type**: Single-page web application (SPA)  
**Performance Goals**: Theme switch must be instantaneous (<16ms, single repaint)  
**Constraints**: No new dependencies; no CSS-in-JS; no inline styles; must follow Material Design 3 active style  
**Scale/Scope**: 1 page currently (Weather), Layout component, global CSS

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Functional Components Only | PASS | Toggle will be in Layout.jsx as functional component with `useState` |
| II. Separated CSS Styling | PASS | Dark mode colors via CSS custom properties in `index.css`; no inline styles |
| III. Fullscreen Layout | PASS | No changes to layout structure; toggle added to existing header |
| IV. Bilingual Convention | PASS | UI labels in Spanish, code in English |
| V. Three-State Data Handling | N/A | No data fetching involved in this feature |

**Gate result: PASS** — No violations detected.

## Project Structure

### Documentation (this feature)

```text
specs/001-dark-mode-toggle/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
src/
├── main.jsx              # Routes (no changes expected)
├── index.css             # Global styles — add dark theme CSS variables here
├── components/
│   ├── Layout.jsx        # Add toggle button + theme state + localStorage logic
│   └── Layout.css        # Style the toggle button
├── pages/
│   ├── Weather.jsx       # No changes expected (uses CSS variables)
│   └── Weather.css       # Verify colors use CSS variables (update if hardcoded)
└── utils/
    └── theme.js          # NEW: Theme detection + localStorage helper functions
```

**Structure Decision**: Single frontend SPA. Theme logic lives in `src/utils/theme.js` for reuse. The toggle UI and state management live in `Layout.jsx` (visible on all pages via the header). Color definitions use CSS custom properties in `index.css` with `[data-theme="dark"]` selector override.

## Complexity Tracking

> No violations to justify.
