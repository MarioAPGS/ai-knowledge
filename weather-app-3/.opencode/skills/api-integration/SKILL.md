---
name: api-integration
description: Cómo integrar y usar la API de Open-Meteo en la Weather App
---

## API de Open-Meteo

La app usa la API gratuita de Open-Meteo. No requiere API key.

**Base URL:** `https://api.open-meteo.com/v1/forecast`

## Patrón de fetch

```jsx
// Obtener ubicación del usuario
navigator.geolocation.getCurrentPosition(
  (pos) => {
    const { latitude, longitude } = pos.coords
    fetch(`${WEATHER_API}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m&timezone=auto`)
      .then((res) => res.json())
      .then((data) => {
        setWeather(data)
        setLoading(false)
      })
      .catch(() => {
        setError('No se pudo obtener el clima')
        setLoading(false)
      })
  },
  () => {
    setError('Permite el acceso a tu ubicación para ver el clima')
    setLoading(false)
  }
)
```

## Parámetros útiles de la API

- `current=` — datos actuales (temperature_2m, weather_code, wind_speed_10m)
- `daily=` — pronóstico diario (temperature_2m_max, temperature_2m_min, weather_code)
- `hourly=` — pronóstico por hora
- `forecast_days=` — número de días de pronóstico (1-16)
- `timezone=auto` — siempre incluirlo

## Códigos de clima (WMO)

Usar la función `getWeatherLabel(code)` de `Weather.jsx` para mapear códigos WMO a labels en español con emojis. Si necesitas reutilizarla en otro componente, extraerla a un archivo utilitario compartido.

## Manejo de errores

- Siempre manejar el caso de que el usuario no permita geolocalización
- Siempre manejar errores de red con `.catch()`
- Mostrar mensajes de error en español al usuario
