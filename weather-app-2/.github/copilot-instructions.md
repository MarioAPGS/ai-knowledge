# Weather App — Instrucciones para GitHub Copilot

## Sobre el proyecto

Aplicación de clima con React 19 + Vite 8 + React Router 7.
Usa la API gratuita de Open-Meteo (sin API key).
Base URL de la API: `https://api.open-meteo.com/v1/forecast`

## Estructura

- `src/pages/` — Cada página tiene su `.jsx` y `.css`
- `src/components/` — Componentes compartidos (`Layout.jsx`, etc.)
- `src/main.jsx` — Punto de entrada y definición de rutas
- `src/index.css` — Estilos globales
- `.github/instructions/` — Instrucciones de estilo visual y layout

## Estilo visual

Antes de escribir CSS, revisa `CONTRIBUTING.md` para ver el valor de `ESTILO_ACTIVO` y aplica la instrucción correspondiente de `.github/instructions/`. El layout fullscreen (`.github/instructions/fullscreen-layout.instructions.md`) se aplica SIEMPRE.

## Convenciones obligatorias

1. **Solo functional components** con `export default function`
2. **Estado con `useState`**, efectos con `useEffect` — sin state managers externos
3. **Estilos en archivos `.css` separados** — nunca inline, nunca CSS-in-JS, nunca frameworks CSS
4. **Contenido visible al usuario en español**, código en inglés
5. **Manejar siempre** los 3 estados: loading, error, datos listos
6. **Seguir el patrón de `Weather.jsx`** para nuevos componentes — mantener coherencia visual y estructural
7. **Funciones utilitarias compartidas** van en `src/utils/` — reutilizar antes de duplicar

## API Open-Meteo

- Usar `navigator.geolocation` para obtener coordenadas
- Siempre incluir `timezone=auto` en las peticiones
- Reutilizar `getWeatherLabel()` para mapear códigos WMO a labels en español
- Manejar el caso de que el usuario no permita geolocalización
