# Weather App — Reglas del Proyecto

## Descripción

Aplicación de clima construida con React 19 + Vite 8 + React Router 7.
Usa la API gratuita de Open-Meteo (sin API key).

## Estructura del proyecto

```
src/
├── main.jsx              ← Punto de entrada, rutas definidas aquí
├── index.css             ← Estilos globales (reset, layout base)
├── assets/               ← Imágenes y SVGs estáticos
├── components/           ← Componentes compartidos (Layout, etc.)
│   ├── Layout.jsx        ← Layout principal con header y navegación
│   └── Layout.css
└── pages/                ← Cada página tiene su .jsx y .css
    ├── Weather.jsx
    └── Weather.css
.github/
└── instructions/          ← Instrucciones de estilo y layout
    ├── fullscreen-layout.instructions.md   ← Layout (SIEMPRE activo)
    ├── retro-style.instructions.md         ← Estilo retro / pixel art
    ├── material-style.instructions.md      ← Estilo Material Design 3
    └── glassmorphism-style.instructions.md ← Estilo glassmorphism
```

## Comandos

```bash
npm install    # Instalar dependencias
npm run dev    # Servidor de desarrollo (Vite)
npm run build  # Build de producción
npm run lint   # Linter con ESLint
```

## Estilo visual

Antes de escribir o modificar CSS, DEBES:

1. Leer `CONTRIBUTING.md` para ver el valor de `ESTILO_ACTIVO`
2. Leer la instrucción correspondiente en `.github/instructions/` según el estilo activo
3. Leer `.github/instructions/fullscreen-layout.instructions.md` siempre — el layout fullscreen es obligatorio

El estilo activo determina colores, tipografía, bordes, sombras y apariencia de componentes. No inventes estilos propios ni mezcles de distintas instrucciones.

## Convenciones de código

- Solo functional components con `export default function`
- Estado con `useState`, efectos con `useEffect` — sin state managers externos
- Cada página va en `src/pages/` con su `.jsx` y `.css` al lado
- Componentes compartidos van en `src/components/`
- Las rutas se definen en `src/main.jsx` usando React Router, con `Layout` como ruta padre
- Estilos en archivos `.css` separados — no CSS-in-JS, no inline styles, no frameworks CSS
- Manejar siempre loading, error y datos listos en componentes con fetch
- Funciones utilitarias compartidas van en `src/utils/`

## Layout

La app usa un layout fullscreen con header sticky:

- `Layout.jsx` envuelve todas las páginas con header + `<Outlet />`
- El header tiene el logo y la navegación con `<NavLink>` a cada página
- El contenido ocupa todo el ancho y alto disponible (flex: 1)
- NUNCA centrar la app como una card pequeña en el medio de la pantalla

## Idioma

- Todo el contenido visible al usuario va en **español**
- Código (variables, funciones, comentarios técnicos) en **inglés**

## Patrones de referencia

Cuando crees algo nuevo, usa `Weather.jsx` como referencia para la estructura del componente. Para estilos, sigue estrictamente la instrucción activa definida en `CONTRIBUTING.md`.

<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan
at specs/001-weather-history/plan.md
<!-- SPECKIT END -->
