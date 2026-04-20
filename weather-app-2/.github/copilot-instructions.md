# Weather App — Instrucciones para GitHub Copilot

## Sobre el proyecto

Aplicación de clima con React 19 + Vite 8 + React Router 7.
Usa la API gratuita de Open-Meteo (sin API key).
Base URL de la API: `https://api.open-meteo.com/v1/forecast`

## Estructura

- `src/pages/` — Cada página tiene su `.jsx` y `.css`
- `src/main.jsx` — Punto de entrada y definición de rutas
- `src/index.css` — Estilos globales

## Convenciones obligatorias

1. **Solo functional components** con `export default function`
2. **Estado con `useState`**, efectos con `useEffect`
3. **No usar** state managers externos (Redux, Zustand, etc.)
4. **Estilos en archivos `.css` separados** — nunca inline, nunca CSS-in-JS
5. **Contenido visible al usuario en español**, código en inglés
6. **Manejar siempre** los 3 estados: loading, error, datos listos
7. **Seguir el patrón de `Weather.jsx`** para nuevos componentes

## Patrón de componentes

```jsx
import { useState, useEffect } from 'react'
import './Componente.css'

const API_URL = 'https://api.open-meteo.com/v1/forecast'

function helperFunction(param) { /* ... */ }

export default function Componente() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => { /* fetch */ }, [])

  if (loading) return <div className="card"><p>Cargando...</p></div>
  if (error) return <div className="card"><p className="error">{error}</p></div>

  return (
    <div className="card">
      {/* Contenido */}
    </div>
  )
}
```

## Estilos

- Cards: `background: white`, `border-radius: 16px`, `box-shadow: 0 2px 12px rgba(0,0,0,0.08)`
- Fondo app: `#f5f5f5`
- Texto: `#333` (body), `#222` (títulos), `#888` (secundario)
- Error: `#e74c3c`
- Font: `system-ui, -apple-system, sans-serif`

## API Open-Meteo

- Usar `navigator.geolocation` para obtener coordenadas
- Siempre incluir `timezone=auto`
- Reutilizar `getWeatherLabel()` para mapear códigos WMO a labels en español
- Manejar el caso de que el usuario no permita geolocalización
