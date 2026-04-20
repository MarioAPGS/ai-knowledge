---
name: react-components
description: Patrones y convenciones para crear componentes React en la Weather App
---

## Patrón de componentes

Todos los componentes siguen esta estructura (basada en `Weather.jsx`):

```jsx
import { useState, useEffect } from 'react'
import './NombreComponente.css'

// Constantes fuera del componente
const API_URL = 'https://api.open-meteo.com/v1/forecast'

// Funciones helper fuera del componente
function helperFunction(param) {
  // ...
}

// Componente exportado como default
export default function NombreComponente() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Fetch de datos o efectos secundarios
  }, [])

  if (loading) return <div className="card"><p>Cargando...</p></div>
  if (error) return <div className="card"><p className="error">{error}</p></div>

  return (
    <div className="card">
      {/* Contenido en español */}
    </div>
  )
}
```

## Reglas

- Solo functional components con `export default function`
- Estado con `useState`, efectos con `useEffect`
- No usar state managers externos
- Manejar siempre los 3 estados: loading, error, y datos listos
- Las props se desestructuran en los parámetros de la función
- No usar `React.memo` o `useMemo` salvo que haya un problema de rendimiento demostrado
