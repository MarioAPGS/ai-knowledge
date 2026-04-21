---
applyTo: "**/*.css"
---
# Skill: Estilo Retro / Pixel Art

> **ACTIVACIÓN:** Este skill SOLO se aplica cuando `CONTRIBUTING.md` indica `ESTILO_ACTIVO: retro`. Si el estilo activo es otro, IGNORA este archivo por completo.

## Filosofía

Inspirado en interfaces de los 80s/90s: bordes pixelados, tipografía monoespaciada, paleta limitada, sombras duras sin blur. Recuerda a terminales CRT, NES y Windows 3.1.

## Paleta de colores

```
--retro-bg:        #1a1a2e;     /* Fondo principal — azul oscuro */
--retro-surface:   #16213e;     /* Superficie de cards */
--retro-primary:   #e94560;     /* Acento principal — rojo retro */
--retro-secondary: #0f3460;     /* Acento secundario */
--retro-text:      #eee;        /* Texto principal */
--retro-muted:     #a0a0a0;     /* Texto secundario */
--retro-success:   #00ff41;     /* Verde terminal */
--retro-border:    #e94560;     /* Bordes visibles */
```

## Tipografía

- Usar `font-family: 'Courier New', Courier, monospace` como fuente principal
- Tamaños en múltiplos de 4px (12px, 16px, 20px, 24px, 32px)
- Nunca usar font-smoothing — mantener el aspecto pixelado natural
- `text-transform: uppercase` en headers y navegación
- `letter-spacing: 2px` en headers

## Bordes y sombras

- Bordes gruesos y visibles: `border: 3px solid var(--retro-border)`
- Sin `border-radius` — todo con esquinas rectas (0px)
- Sombras duras sin blur: `box-shadow: 4px 4px 0px var(--retro-primary)`
- Para efecto presionado: `box-shadow: 2px 2px 0px var(--retro-primary)` + `transform: translate(2px, 2px)`

## Componentes

### Header / Navegación

```css
.app-header {
  background: var(--retro-surface);
  border-bottom: 3px solid var(--retro-border);
  padding: 0 24px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.app-header .logo {
  font-family: 'Courier New', monospace;
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: var(--retro-primary);
}

.app-header nav {
  display: flex;
  gap: 0;
}

.app-header nav a {
  font-family: 'Courier New', monospace;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--retro-text);
  text-decoration: none;
  padding: 16px 20px;
  border-left: 1px solid var(--retro-border);
  transition: background 0.1s;
}

.app-header nav a:hover,
.app-header nav a.active {
  background: var(--retro-primary);
  color: white;
}
```

### Cards

```css
.card {
  background: var(--retro-surface);
  border: 3px solid var(--retro-border);
  box-shadow: 6px 6px 0px rgba(233, 69, 96, 0.3);
  padding: 24px;
}
```

### Botones

```css
.btn {
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 13px;
  padding: 12px 24px;
  border: 3px solid var(--retro-primary);
  background: var(--retro-primary);
  color: white;
  cursor: pointer;
  box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.5);
  transition: all 0.1s;
}

.btn:hover {
  box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.5);
  transform: translate(2px, 2px);
}
```

### Inputs

```css
input, select {
  font-family: 'Courier New', monospace;
  background: var(--retro-bg);
  border: 2px solid var(--retro-border);
  color: var(--retro-text);
  padding: 10px 14px;
  font-size: 14px;
}

input:focus, select:focus {
  outline: none;
  border-color: var(--retro-success);
  box-shadow: 0 0 0 1px var(--retro-success);
}
```

## Efectos especiales

- Cursor parpadeante en inputs con animación CSS (`@keyframes blink`)
- Efecto "scanlines" sutil en el fondo con un pseudo-elemento repeating-linear-gradient
- Texto con efecto glow verde para datos destacados: `text-shadow: 0 0 8px var(--retro-success)`

## Reglas estrictas

- NUNCA usar `border-radius` mayor a 0
- NUNCA usar gradientes suaves — solo colores planos o sombras duras
- NUNCA usar fuentes sans-serif — todo monoespaciado
- Los hover siempre deben ser instantáneos o muy rápidos (max 0.1s)
- Mantener consistencia pixel-perfect entre componentes
