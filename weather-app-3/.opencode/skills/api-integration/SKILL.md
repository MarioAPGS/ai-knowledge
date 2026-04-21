---
name: api-integration
description: Endpoints, parámetros y patrones de uso de la API de Open-Meteo
---

## API de Open-Meteo

API gratuita de datos meteorológicos. No requiere API key.

**Base URL:** `https://api.open-meteo.com/v1/forecast`

## Obtener ubicación del usuario

```jsx
navigator.geolocation.getCurrentPosition(
  (pos) => {
    const { latitude, longitude } = pos.coords
    // Hacer fetch con las coordenadas
  },
  () => {
    setError('Permite el acceso a tu ubicación para ver el clima')
    setLoading(false)
  }
)
```

Siempre manejar el callback de error — el usuario puede denegar el permiso.

## Parámetros disponibles

### Datos actuales (`current=`)
- `temperature_2m` — Temperatura en °C
- `weather_code` — Código WMO (usar `getWeatherLabel()` para traducir)
- `wind_speed_10m` — Velocidad del viento en km/h
- `wind_direction_10m` — Dirección del viento en grados
- `relative_humidity_2m` — Humedad relativa en %

### Datos por hora (`hourly=`)
- `temperature_2m`, `weather_code`, `wind_speed_10m`, `wind_direction_10m`, `relative_humidity_2m`
- Devuelve arrays con un valor por cada hora del día

### Datos diarios (`daily=`)
- `temperature_2m_max`, `temperature_2m_min` — Temperaturas extremas
- `weather_code` — Código WMO del día

### Otros parámetros
- `timezone=auto` — **Siempre incluirlo**
- `forecast_days=N` — Días de pronóstico (1-16)
- `past_days=N` — Incluir N días anteriores en la respuesta

## Estructura de la respuesta

```json
{
  "current": { "temperature_2m": 22.5, "weather_code": 1 },
  "hourly": { "time": ["2025-04-21T00:00", ...], "temperature_2m": [18.2, ...] },
  "daily": { "time": ["2025-04-21", ...], "temperature_2m_max": [25.0, ...] }
}
```

Los arrays de `hourly` y `daily` siempre van acompañados de un array `time` con las mismas posiciones.

## Códigos WMO

El proyecto usa `getWeatherLabel(code)` para mapear código numérico → label en español con emoji. Reutilizar esa función en vez de crear un mapeo nuevo.
