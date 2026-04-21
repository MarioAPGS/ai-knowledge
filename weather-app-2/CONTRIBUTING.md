# Guía de contribución — Weather App

---

## Estilo visual activo

> **ESTILO_ACTIVO: material**

Opciones disponibles: `retro` | `material` | `glassmorphism`

Cambia el valor de arriba para activar un estilo distinto. Cada estilo tiene sus instrucciones en `.github/instructions/` con las reglas completas de colores, tipografía, componentes y restricciones.

| Valor            | Instrucción (Copilot)                                          | Descripción                                          |
| ---------------- | -------------------------------------------------------------- | ---------------------------------------------------- |
| `retro`          | `.github/instructions/retro-style.instructions.md`             | Pixel art, monoespaciado, bordes duros, paleta CRT   |
| `material`       | `.github/instructions/material-style.instructions.md`          | Material Design 3, elevación, esquinas suaves         |
| `glassmorphism`  | `.github/instructions/glassmorphism-style.instructions.md`     | Cristal translúcido, blur, gradientes vibrantes       |

**Regla:** al generar o modificar código CSS, DEBES leer la instrucción correspondiente al estilo activo y seguir sus reglas de colores, tipografía, bordes, sombras y componentes. No mezcles estilos.

---

## Layout obligatorio

Independientemente del estilo, la app DEBE seguir el layout definido en `.github/instructions/fullscreen-layout.instructions.md`:

- La app ocupa **toda la pantalla** (100vh), nunca una card centrada
- Existe un **header sticky** con el logo y navegación a las distintas páginas
- El contenido usa `flex: 1` para llenar el espacio restante
- Se usa un componente `Layout.jsx` en `src/components/` que envuelve todas las rutas

---

## Convenciones generales

- **Functional components** únicamente — nunca class components
- Estado con `useState`, efectos con `useEffect` — sin state managers externos
- Manejar siempre los 3 estados en componentes con datos: **loading**, **error** y **datos listos**
- Estilos en archivos `.css` separados por componente — nunca inline styles, CSS-in-JS ni frameworks CSS
- **Contenido visible al usuario:** español
- **Código** (variables, funciones, nombres de archivos): inglés

## Estructura de archivos

- Cada página va en `src/pages/` con dos archivos: `Pagina.jsx` y `Pagina.css`
- Componentes compartidos (como `Layout.jsx`) van en `src/components/`
- Las rutas se definen en `src/main.jsx` usando React Router con `Layout` como ruta padre
- Funciones utilitarias compartidas van en `src/utils/` si se usan en más de un componente
- Assets estáticos van en `src/assets/`
- Instrucciones de estilo van en `.github/instructions/` — no modificar sin justificación

## Flujo de trabajo

1. Verificar qué `ESTILO_ACTIVO` está configurado en este archivo
2. Leer la instrucción correspondiente en `.github/instructions/` antes de escribir CSS
3. Leer `.github/instructions/fullscreen-layout.instructions.md` para respetar la estructura de layout
4. Crear una rama desde `main` con un nombre descriptivo
5. Implementar los cambios siguiendo las convenciones del proyecto
6. Verificar que pasa el linter: `npm run lint`
7. Verificar que el build funciona: `npm run build`
8. Crear PR con descripción clara de los cambios

## Qué evitar

- No instalar dependencias nuevas sin justificación
- No cambiar la configuración de Vite o ESLint sin discutirlo antes
- No usar TypeScript (el proyecto es JavaScript puro)
- No crear componentes wrapper innecesarios
- No duplicar funciones helper que ya existen — reutilizar las existentes
- No mezclar estilos de diferentes instrucciones — solo aplicar el `ESTILO_ACTIVO`
- No centrar la app como una card pequeña — usar layout fullscreen
