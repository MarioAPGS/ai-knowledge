---
name: styling
description: Paleta de colores, patrones CSS y convenciones visuales del proyecto
---

## Estilo activo: Material Design 3

Antes de escribir CSS, verificar `ESTILO_ACTIVO` en `CONTRIBUTING.md`. Actualmente es `material`.

## Paleta de colores (variables CSS en index.css)

| Variable | Valor | Uso |
|---|---|---|
| `--md-bg` | `#fffbfe` | Fondo de la app |
| `--md-surface` | `#ffffff` | Fondo de cards y superficies |
| `--md-surface-dim` | `#f4f0f4` | Superficies secundarias |
| `--md-primary` | `#6750a4` | Color primario, datos destacados |
| `--md-on-primary` | `#ffffff` | Texto sobre primario |
| `--md-secondary` | `#625b71` | Color secundario |
| `--md-tertiary` | `#7d5260` | Color terciario |
| `--md-error` | `#b3261e` | Errores |
| `--md-text` | `#1c1b1f` | Texto principal |
| `--md-text-muted` | `#49454f` | Texto secundario |
| `--md-outline` | `#79747e` | Bordes |
| `--md-outline-var` | `#cac4d0` | Bordes sutiles |

Siempre usar las variables CSS (`var(--md-*)`) en vez de valores hardcodeados.

## Elevaciones

| Variable | Uso |
|---|---|
| `--md-elevation-0` | Sin sombra |
| `--md-elevation-1` | Cards en reposo |
| `--md-elevation-2` | Cards en hover |
| `--md-elevation-3` | Elementos elevados |
| `--md-elevation-4` | Diálogos, modales |

## Esquinas (border-radius)

| Variable | Valor | Uso |
|---|---|---|
| `--md-corner-xs` | `4px` | Elementos pequeños |
| `--md-corner-sm` | `8px` | Botones, chips |
| `--md-corner-md` | `12px` | Cards |
| `--md-corner-lg` | `16px` | Cards grandes |
| `--md-corner-xl` | `28px` | Contenedores grandes |
| `--md-corner-full` | `9999px` | Píldoras, círculos |

## Patrón de cards

Todas las cards del proyecto siguen este estilo base:

```css
.nombre-card {
  background: var(--md-surface);
  border-radius: var(--md-corner-md);
  box-shadow: var(--md-elevation-1);
  padding: 24px;
  text-align: center;
  transition: box-shadow 0.2s cubic-bezier(0.2, 0, 0, 1);
}

.nombre-card:hover {
  box-shadow: var(--md-elevation-2);
}
```

## Tipografía

- Font stack: `'Roboto', system-ui, -apple-system, sans-serif` (definido en `index.css`)
- Títulos `h1`: `font-size: 22px`, `font-weight: 400`, `color: var(--md-text)`
- Títulos `h2`: `font-size: 16px`, `font-weight: 500`, `color: var(--md-text)`
- Texto body: `font-size: 14px`, `color: var(--md-text-muted)`
- Texto de error: `color: var(--md-error)`

## Layout fullscreen (OBLIGATORIO)

La app DEBE ocupar toda la pantalla (100vh) con un header sticky y el contenido llenando el espacio restante. NUNCA centrar una card pequeña en medio de la pantalla.

### Estructura HTML

```
<div class="app-layout">
  <header class="app-header">...</header>
  <main class="app-main">
    {/* Contenido de la página */}
  </main>
</div>
```

### CSS base del layout (index.css)

```css
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
}

.app-main {
  flex: 1;
  width: 100%;
  padding: 32px;
}
```

### Reglas del layout

- `#root` ocupa el 100% del ancho, sin `max-width`
- `.app-layout` es flex column y ocupa mínimo 100vh
- `.app-header` es sticky en la parte superior con `z-index: 100`
- `.app-main` usa `flex: 1` para llenar el espacio restante
- El contenido dentro de `.app-main` puede usar un `max-width` interno si necesita centrar, pero `.app-main` ocupa todo el ancho

### Centrado de contenido de página

Cuando una página necesita centrar su contenido (cards, secciones, etc.), DEBE hacerlo con un contenedor interno dentro de `.app-main`, nunca restringiendo `.app-main` en sí:

```css
.nombre-page {
  max-width: 600px;
  margin: 0 auto;
}
```

Esto mantiene el fondo de `.app-main` a todo el ancho mientras el contenido queda centrado. Todas las secciones de la página (card principal, historial, etc.) deben estar dentro de este contenedor para que se alineen visualmente.

### Lo que NUNCA debe hacerse

- NUNCA poner `max-width` en `#root` — el root siempre al 100%
- NUNCA centrar el body con `display: flex; justify-content: center; align-items: center`
- NUNCA tener la app como una sola card flotante en el centro de la pantalla
- NUNCA omitir el header con navegación

### Responsive

- El padding de `.app-main` se reduce a 16px en pantallas < 640px
- El header debe colapsar a menú hamburguesa en pantallas < 640px

## Reglas generales

- Un archivo `.css` por componente/página, en la misma carpeta
- Nunca inline styles ni CSS-in-JS
- Nunca frameworks CSS (Tailwind, Bootstrap, etc.)
- Al crear una página nueva, mantener coherencia visual con las existentes — misma paleta, mismo estilo de cards, mismos espaciados
