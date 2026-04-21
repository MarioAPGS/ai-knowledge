# Tasks: Dark Mode Toggle

**Input**: Design documents from `specs/001-dark-mode-toggle/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: Not requested — no test tasks included.

**Organization**: Tasks grouped by user story for independent implementation.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the theme utility module that all user stories depend on

- [x] T001 Create theme helper functions (getInitialTheme, saveTheme, applyTheme) in src/utils/theme.js

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Add dark theme CSS variables that all visual changes depend on

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 Add `[data-theme="dark"]` CSS custom property overrides for all `--md-*` variables in src/index.css

**Checkpoint**: Dark theme variables defined — user story implementation can now begin

---

## Phase 3: User Story 1 - Cambiar entre modo oscuro y claro manualmente (Priority: P1) MVP

**Goal**: User can see a toggle in the header and switch between dark/light mode instantly on any page

**Independent Test**: Navigate to any page, click the toggle, verify background/cards/text colors change immediately without page reload

### Implementation for User Story 1

- [x] T003 [US1] Add theme state (`useState`) and toggle handler to Layout component, apply theme to `document.documentElement` via `useEffect` in src/components/Layout.jsx
- [x] T004 [US1] Add toggle button markup in the header section of src/components/Layout.jsx
- [x] T005 [US1] Style the toggle button following Material Design 3 conventions in src/components/Layout.css

**Checkpoint**: User can toggle dark/light mode visually on all pages. Preference does NOT persist yet.

---

## Phase 4: User Story 2 - Persistencia de la preferencia entre sesiones (Priority: P2)

**Goal**: Selected theme persists in localStorage and is restored on next visit

**Independent Test**: Select dark mode, close and reopen the app, verify it starts in dark mode

### Implementation for User Story 2

- [x] T006 [US2] Integrate localStorage save on toggle (call `saveTheme`) and read on initialization (call `getInitialTheme`) in src/components/Layout.jsx

**Checkpoint**: Theme preference persists across browser sessions

---

## Phase 5: User Story 3 - Respetar la preferencia del sistema operativo (Priority: P3)

**Goal**: First-time visitors see the theme matching their OS setting

**Independent Test**: Clear localStorage, set OS to dark mode, open app — should show dark theme

### Implementation for User Story 3

- [x] T007 [US3] Verify `getInitialTheme()` in src/utils/theme.js correctly reads `prefers-color-scheme` when no localStorage value exists and falls back to "light" when media query is unsupported

**Checkpoint**: All three user stories independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Verify existing pages render correctly in both modes

- [x] T008 Verify all existing CSS in src/pages/Weather.css uses CSS variables (no hardcoded colors) and adjust if needed
- [x] T009 Run `npm run lint` and `npm run build` to validate no errors

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 (theme.js must exist for variable reference)
- **User Story 1 (Phase 3)**: Depends on Phase 2 (dark CSS variables must exist)
- **User Story 2 (Phase 4)**: Depends on Phase 3 (toggle must exist to save preference)
- **User Story 3 (Phase 5)**: Can run after Phase 1 (only touches theme.js), but logically validates after Phase 3
- **Polish (Phase 6)**: Depends on all user stories complete

### User Story Dependencies

- **User Story 1 (P1)**: Depends on Foundational — no dependencies on other stories
- **User Story 2 (P2)**: Depends on US1 (needs toggle to exist for save-on-toggle)
- **User Story 3 (P3)**: Functionally independent (theme.js logic), but tested after US1

### Within Each User Story

- T003 before T004 (state before markup)
- T004 before T005 (markup before styling)

### Parallel Opportunities

- T001 and T002 touch different files and can run in parallel
- T004 and T005 could overlap (markup + styling in different files)

---

## Parallel Example: Phase 1 + 2

```bash
# These touch different files and can run in parallel:
Task: "Create theme helper functions in src/utils/theme.js"
Task: "Add dark theme CSS variables in src/index.css"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (theme.js)
2. Complete Phase 2: Foundational (dark CSS variables)
3. Complete Phase 3: User Story 1 (toggle + visual switch)
4. **STOP and VALIDATE**: Toggle works on all pages
5. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → Theme infrastructure ready
2. Add User Story 1 → Toggle works visually (MVP!)
3. Add User Story 2 → Preference persists across sessions
4. Add User Story 3 → OS preference detected on first visit
5. Polish → Lint, build, verify existing pages

---

## Notes

- All existing CSS already uses `var(--md-*)` — minimal risk of hardcoded colors
- No new dependencies needed
- US2 and US3 are small increments on top of US1 (mostly wiring existing theme.js functions)
- Commit after each phase checkpoint
