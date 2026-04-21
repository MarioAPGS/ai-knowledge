# Data Model: Historial del Clima (7 Días)

**Date**: 2026-04-21

## Entities

### HistoryDay

Represents a single day in the 7-day weather history.

| Field | Type | Description |
|-------|------|-------------|
| date | string (ISO date) | Date in `YYYY-MM-DD` format from API `daily.time[]` |
| dayName | string | Day of the week in Spanish (e.g., "Lunes") — derived from `date` |
| weatherCode | number | WMO weather code from API `daily.weather_code[]` |
| weatherLabel | string | Spanish label with emoji — derived via `getWeatherLabel(weatherCode)` |
| maxTemp | number | Maximum temperature in °C from API `daily.temperature_2m_max[]` |
| minTemp | number | Minimum temperature in °C from API `daily.temperature_2m_min[]` |

### WeatherState (existing, extended)

The existing Weather component state, extended with history data.

| Field | Type | Description |
|-------|------|-------------|
| weather | object \| null | Current weather API response (existing) |
| history | HistoryDay[] | Array of 7 HistoryDay objects (new) |
| loading | boolean | Data fetch in progress (existing) |
| error | string \| null | Error message if fetch failed (existing) |

## Relationships

- `WeatherState.history` contains exactly 7 `HistoryDay` entries (one per past day, excluding today)
- Each `HistoryDay.weatherLabel` is derived from `HistoryDay.weatherCode` using the shared `getWeatherLabel()` utility

## Data Transformation

API response `daily` arrays are positional — index `i` in `daily.time`, `daily.weather_code`, `daily.temperature_2m_max`, and `daily.temperature_2m_min` all correspond to the same day. The transformation maps these parallel arrays into an array of `HistoryDay` objects, filtering to only the past 7 days (the API may also return today/future days in the response).
