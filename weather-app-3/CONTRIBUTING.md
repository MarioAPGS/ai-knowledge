# Guía de contribución — Weather App

## Convenciones generales

- **Functional components** únicamente — nunca class components
- Estado con `useState`, efectos con `useEffect` — sin state managers externos
- Manejar siempre los 3 estados en componentes con datos: **loading**, **error** y **datos listos**
- Estilos en archivos `.css` separados por componente — nunca inline styles, CSS-in-JS ni frameworks CSS
- **Contenido visible al usuario:** español
- **Código** (variables, funciones, nombres de archivos): inglés

## Estructura de archivos

- Cada página va en `src/pages/` con dos archivos: `Pagina.jsx` y `Pagina.css`
- Las rutas se definen en `src/main.jsx` usando React Router
- Funciones utilitarias compartidas van en `src/utils/` si se usan en más de un componente
- Assets estáticos van en `src/assets/`

## Flujo de trabajo

1. Crear una rama desde `main` con un nombre descriptivo
2. Implementar los cambios siguiendo las convenciones del proyecto
3. Verificar que pasa el linter: `npm run lint`
4. Verificar que el build funciona: `npm run build`
5. Crear PR con descripción clara de los cambios

## Qué evitar

- No instalar dependencias nuevas sin justificación
- No cambiar la configuración de Vite o ESLint sin discutirlo antes
- No usar TypeScript (el proyecto es JavaScript puro)
- No crear componentes wrapper innecesarios
- No duplicar funciones helper que ya existen — reutilizar las existentes
