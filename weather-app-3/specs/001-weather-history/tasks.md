# Tasks: Historial del Clima (7 Días)

**Input**: Design documents from `specs/001-weather-history/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Not requested — test tasks omitted.

**Organization**: Tasks grouped by user story for independent implementation.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Includes exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Extract shared utilities and prepare project structure

- [x] T001 Create `src/utils/weather.js` with `getWeatherLabel()` extracted from `src/pages/Weather.jsx` and new `formatDayName(dateString)` helper
- [x] T002 Update `src/pages/Weather.jsx` to import `getWeatherLabel` from `src/utils/weather.js` instead of defining it locally

**Checkpoint**: Existing Weather page works exactly as before, with `getWeatherLabel` now imported from utils.

---

## Phase 2: User Story 1 — Ver historial de 7 días (Priority: P1) 🎯 MVP

**Goal**: Display 7 historical weather day cards below the current weather, each showing day name, weather label, max temp, and min temp.

**Independent Test**: Load the Weather page with geolocation enabled. Below the current weather card, 7 history cards appear with correct data. On narrow screens, horizontal scroll works.

### Implementation for User Story 1

- [x] T003 [US1] Modify fetch URL in `src/pages/Weather.jsx` to add `daily=weather_code,temperature_2m_max,temperature_2m_min&past_days=7&forecast_days=1` parameters
- [x] T004 [US1] Add `history` state in `src/pages/Weather.jsx` — transform `data.daily` parallel arrays into array of HistoryDay objects (filtering out today), using `formatDayName()` and `getWeatherLabel()` from utils
- [x] T005 [US1] Add history section JSX in `src/pages/Weather.jsx` — section title "Últimos 7 días", scrollable container, and a card per day showing day name, weather label, max temp, min temp
- [x] T006 [US1] Add CSS styles in `src/pages/Weather.css` for `.history-section`, `.history-scroll` (flex + overflow-x: auto), and `.history-card` following Material Design 3 active style (read CONTRIBUTING.md and material style instructions before writing CSS)

**Checkpoint**: User Story 1 fully functional — 7 history cards visible with horizontal scroll on narrow screens.

---

## Phase 3: User Story 2 — Estados de carga y error (Priority: P2)

**Goal**: Show loading indicator and error message for the history section when data is being fetched or fetch fails.

**Independent Test**: Throttle network in DevTools — loading indicator appears. Block the API request — error message appears in the history section.

### Implementation for User Story 2

- [x] T007 [US2] Ensure three-state handling in `src/pages/Weather.jsx` covers the history section: loading state shows a placeholder/spinner in the history area, error state shows error message, data-ready state shows history cards
- [x] T008 [US2] Add CSS styles in `src/pages/Weather.css` for history loading and error states (`.history-loading`, `.history-error`) following Material Design 3 style

**Checkpoint**: History section gracefully handles loading and error states.

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and cleanup

- [x] T009 Run `npm run lint` and fix any linting errors
- [x] T010 Run `npm run build` and verify production build succeeds
- [x] T011 Verify active style compliance — read `CONTRIBUTING.md` for `ESTILO_ACTIVO`, then read corresponding style instruction file and `fullscreen-layout.instructions.md`, and verify all new CSS matches

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **User Story 1 (Phase 2)**: Depends on Setup (T001, T002)
- **User Story 2 (Phase 3)**: Depends on User Story 1 (T003-T006) since it refines the same section
- **Polish (Phase 4)**: Depends on all user stories complete

### Within Each Phase

- T001 → T002 (must extract utils before updating import)
- T003 → T004 → T005 (fetch change → state transform → render)
- T006 can run in parallel with T003-T005 (different file area, but same file Weather.css)
- T007 → T008 (logic before styles)

### Parallel Opportunities

- T005 and T006 touch different files (JSX vs CSS) and can be worked in parallel
- T009, T010, T011 are independent validation tasks and can run in parallel

---

## Parallel Example: User Story 1

```bash
# After T004 completes, these can run in parallel:
Task: "T005 [US1] Add history section JSX in src/pages/Weather.jsx"
Task: "T006 [US1] Add CSS styles in src/pages/Weather.css"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T002)
2. Complete Phase 2: User Story 1 (T003-T006)
3. **STOP and VALIDATE**: 7 history cards render correctly with scroll
4. Functional MVP ready

### Incremental Delivery

1. Setup → utils extracted, existing page unchanged
2. User Story 1 → history cards visible → MVP!
3. User Story 2 → loading/error states polished
4. Polish → lint, build, style compliance verified

---

## Notes

- Read `CONTRIBUTING.md` for `ESTILO_ACTIVO` before any CSS work
- Read the corresponding style skill and fullscreen layout skill
- Use `Weather.jsx` existing patterns as reference
- All user-facing text in Spanish, code in English
- `getWeatherLabel()` is reused from utils — do not duplicate
