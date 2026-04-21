---
name: react-components
description: Patrón de estructura y ciclo de vida de componentes React en este proyecto
---

## Estructura de un componente

Seguir el orden de `Weather.jsx`:

```jsx
import { useState, useEffect } from 'react'
import './NombreComponente.css'

// 1. Constantes (URLs, mapeos) — fuera del componente
const API_URL = 'https://api.open-meteo.com/v1/forecast'

// 2. Funciones helper — fuera del componente
function helperFunction(param) {
  // ...
}

// 3. Componente — export default function
export default function NombreComponente() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Fetch o efecto secundario
  }, [])

  // 4. Render condicional: loading → error → datos
  if (loading) return <div className="card"><p>Cargando...</p></div>
  if (error) return <div className="card"><p className="error">{error}</p></div>

  return (
    <div className="card">
      {/* Contenido en español */}
    </div>
  )
}
```

## Manejo de estados

Todo componente que haga fetch debe tener exactamente estos 3 estados y renderizarlos en este orden:

1. **loading** — Mensaje "Cargando..." dentro de un `.card`
2. **error** — Mensaje descriptivo en español con clase `.error`
3. **datos listos** — El contenido real

## Navegación entre páginas

Usar `Link` de React Router para navegación interna. Nunca `<a href>` ni `window.location`. Las rutas nuevas se añaden en `src/main.jsx`.

## Reutilización

Antes de crear una función helper nueva, verificar si ya existe una en el proyecto. En particular, `getWeatherLabel()` en `Weather.jsx` mapea códigos WMO a labels en español — si se necesita en más de un componente, extraerla a `src/utils/`.
