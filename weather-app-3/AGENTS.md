# Weather App — Reglas del Proyecto

## Descripción

Aplicación de clima construida con React 19 + Vite 8 + React Router 7.
Usa la API gratuita de Open-Meteo (sin API key).

## Estructura del proyecto

```
weather-app-2/
├── src/
│   ├── main.jsx          ← Punto de entrada, rutas definidas aquí
│   ├── index.css          ← Estilos globales (reset, layout)
│   ├── assets/            ← Imágenes y SVGs estáticos
│   └── pages/             ← Cada página tiene su .jsx y .css
│       ├── Weather.jsx
│       └── Weather.css
├── public/                ← Archivos estáticos (favicon, iconos)
├── package.json
└── vite.config.js
```

## Comandos

```bash
npm install    # Instalar dependencias
npm run dev    # Servidor de desarrollo (Vite)
npm run build  # Build de producción
npm run lint   # Linter con ESLint
```

## Convenciones de código

- **Functional components** únicamente, nunca class components
- Estado con `useState`, efectos secundarios con `useEffect`
- No usar state managers externos (Redux, Zustand, etc.)
- Cada página va en `src/pages/` con su archivo `.css` al lado
- Las rutas se definen en `src/main.jsx` usando React Router
- Estilos en archivos `.css` separados — no CSS-in-JS, no inline styles
- Los labels de clima usan `getWeatherLabel()` que mapea códigos WMO a español con emojis
- API base: `https://api.open-meteo.com/v1/forecast`

## Patrones a seguir

Cuando crees un componente nuevo, sigue el patrón de `Weather.jsx`:
1. Imports arriba (hooks de React, luego CSS)
2. Constantes fuera del componente (URLs de API, mapeos)
3. Funciones helper fuera del componente
4. El componente exportado como `export default function NombreComponente()`
5. Estado y efectos dentro del componente
6. Return con JSX usando clases CSS del archivo `.css` correspondiente

## Idioma

- Todo el contenido visible al usuario va en **español**
- Código (variables, funciones, comentarios técnicos) en **inglés**
