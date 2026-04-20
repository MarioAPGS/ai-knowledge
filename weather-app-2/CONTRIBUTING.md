# Guía de contribución — Weather App

## Convenciones de código

### Componentes React

- **Solo functional components** — nunca class components
- Exportar como `export default function NombreComponente()`
- Estado con `useState`, efectos secundarios con `useEffect`
- No usar state managers externos (Redux, Zustand, MobX, etc.)
- Manejar siempre los 3 estados: **loading**, **error** y **datos listos**

### Estructura de archivos

- Cada página va en `src/pages/` con dos archivos: `Pagina.jsx` y `Pagina.css`
- Las rutas se definen en `src/main.jsx` usando React Router
- Funciones utilitarias compartidas deben extraerse a `src/utils/` si se usan en más de un componente
- Assets estáticos van en `src/assets/`

### Estilos

- Archivos CSS separados por componente/página — nunca inline styles ni CSS-in-JS
- No usar frameworks CSS (Tailwind, Bootstrap, etc.)
- Seguir la paleta de colores existente:
  - Fondo: `#f5f5f5`
  - Cards: `white` con `border-radius: 16px` y `box-shadow: 0 2px 12px rgba(0,0,0,0.08)`
  - Texto principal: `#333`, títulos: `#222`, secundario: `#888`
  - Errores: `#e74c3c`

### Idioma

- **Contenido visible al usuario:** español
- **Código** (variables, funciones, nombres de archivos): inglés

## API

- La app usa la API de [Open-Meteo](https://open-meteo.com/) — gratuita, sin API key
- Base URL: `https://api.open-meteo.com/v1/forecast`
- Siempre incluir `timezone=auto` en las peticiones
- Usar `navigator.geolocation` para obtener coordenadas del usuario
- Reutilizar `getWeatherLabel()` para traducir códigos WMO a español

## Flujo de trabajo

1. Crear una rama desde `main` con un nombre descriptivo
2. Implementar los cambios siguiendo las convenciones de arriba
3. Verificar que pasa el linter: `npm run lint`
4. Verificar que el build funciona: `npm run build`
5. Crear PR con descripción clara de los cambios

## Qué evitar

- No instalar dependencias nuevas sin justificación
- No cambiar la configuración de Vite o ESLint sin discutirlo antes
- No usar TypeScript (el proyecto es JavaScript puro)
- No crear componentes wrapper innecesarios
