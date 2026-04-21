<!--
  Sync Impact Report
  ==================
  Version change: 0.0.0 → 1.0.0 (initial ratification)
  Modified principles: N/A (initial version)
  Added sections:
    - Core Principles (5 principles)
    - Technology Constraints
    - Development Workflow
    - Governance
  Removed sections: N/A
  Templates requiring updates:
    - .specify/templates/plan-template.md ✅ no update needed (Constitution Check is generic)
    - .specify/templates/spec-template.md ✅ no update needed (requirements are generic)
    - .specify/templates/tasks-template.md ✅ no update needed (phases are generic)
    - .specify/templates/checklist-template.md ✅ no update needed (categories are generic)
  Follow-up TODOs: none
-->

# Weather App Constitution

## Core Principles

### I. Functional Components Only

All React components MUST be functional components using
`export default function`. Class components are forbidden.
State MUST use `useState`, side effects MUST use `useEffect`.
No external state managers (Redux, Zustand, etc.) are permitted.

**Rationale**: Keeps the codebase uniform and simple, leveraging
React 19 hooks as the single state management pattern.

### II. Separated CSS Styling

Every component MUST have its styles in a co-located `.css` file.
Inline styles, CSS-in-JS libraries, and CSS frameworks (Tailwind,
Bootstrap, etc.) are forbidden. The active visual style MUST match
the `ESTILO_ACTIVO` value in `CONTRIBUTING.md`, and developers MUST
read the corresponding skill in `skills/` before writing CSS.

**Rationale**: Enforces visual consistency across the app and
enables style switching via the skill system without code changes.

### III. Fullscreen Layout

The application MUST occupy the full viewport (100vh) with a sticky
header containing logo and navigation. Content MUST use `flex: 1`
to fill remaining space. The app MUST NEVER be rendered as a
centered card or constrained-width container.

**Rationale**: The app is designed as a full-screen dashboard
experience, not a traditional centered web page.

### IV. Bilingual Convention

All user-visible content (labels, messages, placeholders) MUST be
in Spanish. All code identifiers (variables, functions, file names)
and technical comments MUST be in English.

**Rationale**: The target audience is Spanish-speaking, while
English code ensures broad developer accessibility.

### V. Three-State Data Handling

Every component that fetches data MUST handle exactly three states:
loading, error, and data ready. No fetch operation may omit error
handling or loading indicators.

**Rationale**: Prevents blank screens and silent failures, ensuring
users always see meaningful feedback during data operations.

## Technology Constraints

- **Stack**: React 19 + Vite 8 + React Router 7 (JavaScript only,
  no TypeScript)
- **API**: Open-Meteo exclusively (no API keys required)
- **Dependencies**: No new dependencies without explicit
  justification; no changes to Vite or ESLint config without
  prior discussion
- **File structure**: Pages in `src/pages/` (`.jsx` + `.css`),
  shared components in `src/components/`, utilities in `src/utils/`,
  routes defined in `src/main.jsx` with `Layout` as parent route

## Development Workflow

- Verify `ESTILO_ACTIVO` in `CONTRIBUTING.md` before any CSS work
- Read the corresponding style skill and `fullscreen-layout` skill
- Use `Weather.jsx` as the reference pattern for new page components
- Run `npm run lint` and `npm run build` before submitting changes
- Create feature branches from `main` with descriptive names

## Governance

This constitution is the highest-authority document for the Weather
App project. All code reviews and automated checks MUST verify
compliance with these principles. Amendments require:

1. A documented rationale for the change
2. An updated version number following semantic versioning
3. A migration plan if existing code is affected

For runtime development guidance, refer to `AGENTS.md` and
`CONTRIBUTING.md`.

**Version**: 1.0.0 | **Ratified**: 2026-04-21 | **Last Amended**: 2026-04-21
