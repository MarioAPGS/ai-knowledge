# Research: Historial del Clima (7 Días)

**Date**: 2026-04-21

## R-001: Open-Meteo API — Historical Data via `past_days`

**Decision**: Use the `past_days=7` parameter combined with `daily=weather_code,temperature_2m_max,temperature_2m_min` to get the last 7 days of data in a single API call.

**Rationale**: The Open-Meteo API supports `past_days` as a query parameter that includes N previous days in the response alongside forecast data. This avoids needing a separate historical/archive endpoint. The `daily` aggregation provides exactly the fields we need (weather code, max temp, min temp) per day.

**Alternatives considered**:
- Open-Meteo Archive API (`/v1/archive`): More complex, requires explicit date range calculation, and is designed for longer historical periods. Overkill for 7 days.
- Making 7 separate API calls (one per day): Unnecessary network overhead.

## R-002: Combining Current + History in One Request

**Decision**: Extend the existing Weather.jsx fetch to include `past_days=7` and `daily` parameters in the same API call that fetches current weather.

**Rationale**: Open-Meteo allows combining `current`, `daily`, and `past_days` in a single request. This eliminates the need for a second HTTP call, reduces latency, and simplifies state management. The response will include both `current` and `daily` objects.

**Alternatives considered**:
- Separate fetch for history data: Would require coordinating two async operations and double the API calls. Unnecessary complexity.

## R-003: Day of Week Formatting

**Decision**: Use `Date` object with `toLocaleDateString('es-ES', { weekday: 'long' })` to get the day name in Spanish.

**Rationale**: Built-in browser Intl API handles Spanish day names without any library. Capitalizing the first letter gives clean display (e.g., "Lunes", "Martes").

**Alternatives considered**:
- Manual day name array: Fragile, locale-unaware.
- External library (date-fns, dayjs): Violates the no-new-dependencies constraint.

## R-004: Horizontal Scroll Cards

**Decision**: Use CSS `display: flex` with `overflow-x: auto` on the history container. Each card is a flex item with fixed min-width.

**Rationale**: Pure CSS solution, no JS scroll libraries needed. Works on mobile (touch scroll) and desktop (scroll wheel / trackpad). Follows Material Design 3 surface/card patterns per the active style.

**Alternatives considered**:
- CSS Grid with horizontal scroll: Less intuitive for a single-row scrollable layout.
- JavaScript carousel library: Adds dependency, violates constitution.

## R-005: Extracting `getWeatherLabel` to Utils

**Decision**: Move `getWeatherLabel()` from `Weather.jsx` to `src/utils/weather.js` so it can be imported by both the current weather section and the history cards.

**Rationale**: The function is already needed in two contexts (current weather display and history card labels). Duplication would violate DRY. The constitution specifies `src/utils/` for shared utilities.

**Alternatives considered**:
- Keep it in Weather.jsx and pass as prop: Unnecessary indirection since it's a pure function with no component coupling.
