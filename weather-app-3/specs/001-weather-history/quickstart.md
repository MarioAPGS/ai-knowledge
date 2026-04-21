# Quickstart: Historial del Clima (7 Días)

**Date**: 2026-04-21

## What This Feature Does

Adds a horizontal-scrollable section of 7 weather history cards below the current weather display on the Weather page. Each card shows a past day's name, weather condition, and temperature range.

## Files to Modify

1. **`src/pages/Weather.jsx`** — Extend the API call to include `daily` + `past_days=7` params. Add history state. Render a new history section below current weather.

2. **`src/pages/Weather.css`** — Add styles for the history section container (horizontal flex + overflow-x scroll) and individual history cards (Material Design 3 surface cards).

3. **`src/utils/weather.js`** (new) — Extract `getWeatherLabel()` from Weather.jsx into a shared utility. Add a `formatDayName(dateString)` helper.

## Implementation Steps

1. Create `src/utils/weather.js` with `getWeatherLabel()` (moved from Weather.jsx) and `formatDayName()`.
2. Update `Weather.jsx` import to use `getWeatherLabel` from utils.
3. Modify the fetch URL to add `&daily=weather_code,temperature_2m_max,temperature_2m_min&past_days=7&forecast_days=1`.
4. Add `history` state derived from `data.daily` — transform parallel arrays into array of objects, filter out today.
5. Add JSX section after the current weather card: section title + scrollable container + history cards.
6. Add CSS for `.history-section`, `.history-scroll`, and `.history-card` following Material Design 3 style.
7. Verify three-state handling: loading indicator during fetch, error message on failure, data display on success.

## Key Decisions

- Single API call for both current + history (no second fetch)
- `past_days=7` + `forecast_days=1` to get exactly the right date range
- `getWeatherLabel()` extracted to shared utils (already exists, just moved)
- Pure CSS horizontal scroll (no JS carousel library)
