# API Contract: Open-Meteo Forecast with History

**Date**: 2026-04-21

## Endpoint

```
GET https://api.open-meteo.com/v1/forecast
```

## Request Parameters

| Parameter | Value | Required | Description |
|-----------|-------|----------|-------------|
| latitude | float | Yes | User's latitude from geolocation |
| longitude | float | Yes | User's longitude from geolocation |
| current | `temperature_2m,weather_code,wind_speed_10m` | Yes | Current weather fields (existing) |
| daily | `weather_code,temperature_2m_max,temperature_2m_min` | Yes | Daily aggregated fields (new) |
| past_days | `7` | Yes | Include 7 previous days in response (new) |
| forecast_days | `1` | Yes | Limit forecast to today only (new — avoids extra future days) |
| timezone | `auto` | Yes | Auto-detect timezone (existing) |

## Example Request URL

```
https://api.open-meteo.com/v1/forecast?latitude=40.42&longitude=-3.70&current=temperature_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&past_days=7&forecast_days=1&timezone=auto
```

## Response Shape (relevant fields)

```json
{
  "current": {
    "temperature_2m": 22.5,
    "weather_code": 1,
    "wind_speed_10m": 12.3
  },
  "daily": {
    "time": [
      "2026-04-14", "2026-04-15", "2026-04-16", "2026-04-17",
      "2026-04-18", "2026-04-19", "2026-04-20", "2026-04-21"
    ],
    "weather_code": [3, 61, 2, 0, 1, 45, 63, 1],
    "temperature_2m_max": [18.5, 15.2, 20.1, 22.3, 21.0, 17.8, 14.5, 19.0],
    "temperature_2m_min": [10.2, 8.5, 12.0, 13.1, 11.5, 9.8, 7.2, 10.5]
  }
}
```

Note: `daily.time` will contain 8 entries (7 past days + today) when `past_days=7` and `forecast_days=1`. Filter out today's entry to show only the 7 historical days.
