# Weather App — Reglas del Proyecto

## Descripción

Aplicación de clima construida con React 19 + Vite 8 + React Router 7.
Usa la API gratuita de Open-Meteo (sin API key).

## Estructura del proyecto

```
src/
├── main.jsx          ← Punto de entrada, rutas definidas aquí
├── index.css         ← Estilos globales (reset, layout)
├── assets/           ← Imágenes y SVGs estáticos
└── pages/            ← Cada página tiene su .jsx y .css
    ├── Weather.jsx   ← Página principal (patrón de referencia)
    └── Weather.css
```

## Comandos

```bash
npm install    # Instalar dependencias
npm run dev    # Servidor de desarrollo (Vite)
npm run build  # Build de producción
npm run lint   # Linter con ESLint
```

## Convenciones de código

- Solo functional components con `export default function`
- Estado con `useState`, efectos con `useEffect` — sin state managers externos
- Cada página va en `src/pages/` con su `.jsx` y `.css` al lado
- Las rutas se definen en `src/main.jsx` usando React Router
- Estilos en archivos `.css` separados — no CSS-in-JS, no inline styles, no frameworks CSS
- Manejar siempre loading, error y datos listos en componentes con fetch
- Funciones utilitarias compartidas van en `src/utils/`

## Idioma

- Todo el contenido visible al usuario va en **español**
- Código (variables, funciones, comentarios técnicos) en **inglés**

## Patrones de referencia

Cuando crees algo nuevo, usa `Weather.jsx` como referencia para la estructura del componente y `Weather.css` para el estilo visual. Mantén coherencia con lo que ya existe.

<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan
<!-- SPECKIT END -->
