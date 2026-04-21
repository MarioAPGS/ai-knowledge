---
applyTo: "**/*.css"
---
# Skill: Estilo Material Design

> **ACTIVACIÓN:** Este skill SOLO se aplica cuando `CONTRIBUTING.md` indica `ESTILO_ACTIVO: material`. Si el estilo activo es otro, IGNORA este archivo por completo.

## Filosofía

Basado en Material Design 3 (Material You) de Google. Superficies con elevación, esquinas redondeadas, tipografía clara, colores con propósito, y transiciones fluidas. Interfaz limpia y profesional.

## Paleta de colores

```
--md-bg:           #fffbfe;     /* Fondo principal */
--md-surface:      #ffffff;     /* Superficie de cards */
--md-surface-dim:  #f4f0f4;     /* Superficie secundaria */
--md-primary:      #6750a4;     /* Primario — púrpura Material */
--md-on-primary:   #ffffff;     /* Texto sobre primario */
--md-secondary:    #625b71;     /* Secundario */
--md-tertiary:     #7d5260;     /* Terciario */
--md-error:        #b3261e;     /* Error */
--md-text:         #1c1b1f;     /* Texto principal */
--md-text-muted:   #49454f;     /* Texto secundario */
--md-outline:      #79747e;     /* Bordes */
--md-outline-var:  #cac4d0;     /* Bordes sutiles */
```

## Tipografía

- Usar `font-family: 'Roboto', system-ui, -apple-system, sans-serif`
- Escala tipográfica Material:
  - Display Large: 57px / line-height 64px
  - Headline Large: 32px / line-height 40px
  - Title Large: 22px / line-height 28px
  - Title Medium: 16px / line-height 24px / font-weight 500
  - Body Large: 16px / line-height 24px
  - Body Medium: 14px / line-height 20px
  - Label Large: 14px / line-height 20px / font-weight 500 / letter-spacing 0.1px

## Elevación (Sombras)

Material usa 5 niveles de elevación:

```css
/* Nivel 0 — sin elevación */
--md-elevation-0: none;

/* Nivel 1 — cards, app bar */
--md-elevation-1: 0 1px 2px rgba(0,0,0,0.3), 0 1px 3px 1px rgba(0,0,0,0.15);

/* Nivel 2 — cards elevadas, menús */
--md-elevation-2: 0 1px 2px rgba(0,0,0,0.3), 0 2px 6px 2px rgba(0,0,0,0.15);

/* Nivel 3 — FAB, navigation drawer */
--md-elevation-3: 0 4px 8px 3px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.3);

/* Nivel 4 — diálogos modales */
--md-elevation-4: 0 6px 10px 4px rgba(0,0,0,0.15), 0 2px 3px rgba(0,0,0,0.3);
```

## Esquinas

Material usa 4 tamaños de esquina:

```
--md-corner-xs:    4px;
--md-corner-sm:    8px;
--md-corner-md:    12px;
--md-corner-lg:    16px;
--md-corner-xl:    28px;
--md-corner-full:  9999px;    /* Píldora */
```

## Componentes

### Header / Top App Bar

```css
.app-header {
  background: var(--md-surface);
  box-shadow: var(--md-elevation-2);
  padding: 0 16px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.app-header .logo {
  font-size: 22px;
  font-weight: 400;
  color: var(--md-text);
}

.app-header nav {
  display: flex;
  gap: 4px;
}

.app-header nav a {
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.1px;
  color: var(--md-text-muted);
  text-decoration: none;
  padding: 10px 24px;
  border-radius: var(--md-corner-full);
  transition: all 0.2s cubic-bezier(0.2, 0, 0, 1);
  position: relative;
}

.app-header nav a:hover {
  background: rgba(103, 80, 164, 0.08);
  color: var(--md-primary);
}

.app-header nav a.active {
  background: rgba(103, 80, 164, 0.12);
  color: var(--md-primary);
}
```

### Cards

```css
.card {
  background: var(--md-surface);
  border-radius: var(--md-corner-md);
  box-shadow: var(--md-elevation-1);
  padding: 24px;
  transition: box-shadow 0.2s cubic-bezier(0.2, 0, 0, 1);
}

.card:hover {
  box-shadow: var(--md-elevation-2);
}

/* Card outlined variant */
.card-outlined {
  background: var(--md-surface);
  border: 1px solid var(--md-outline-var);
  border-radius: var(--md-corner-md);
  padding: 24px;
}
```

### Botones

```css
/* Filled button */
.btn {
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.1px;
  padding: 10px 24px;
  border: none;
  border-radius: var(--md-corner-full);
  background: var(--md-primary);
  color: var(--md-on-primary);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.2, 0, 0, 1);
  box-shadow: var(--md-elevation-0);
}

.btn:hover {
  box-shadow: var(--md-elevation-1);
  filter: brightness(1.08);
}

/* Outlined button */
.btn-outlined {
  font-size: 14px;
  font-weight: 500;
  padding: 10px 24px;
  border: 1px solid var(--md-outline);
  border-radius: var(--md-corner-full);
  background: transparent;
  color: var(--md-primary);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.2, 0, 0, 1);
}

.btn-outlined:hover {
  background: rgba(103, 80, 164, 0.08);
}
```

### Inputs

```css
input, select {
  font-family: inherit;
  font-size: 16px;
  padding: 16px;
  border: 1px solid var(--md-outline);
  border-radius: var(--md-corner-xs);
  background: transparent;
  color: var(--md-text);
  transition: border-color 0.2s;
}

input:focus, select:focus {
  outline: none;
  border-color: var(--md-primary);
  border-width: 2px;
  padding: 15px; /* compensar el borde extra */
}
```

## Transiciones

- Siempre usar la curva Material: `cubic-bezier(0.2, 0, 0, 1)`
- Duraciones estándar:
  - Micro: 100ms (ripple, opacity)
  - Short: 200ms (hover, color)
  - Medium: 300ms (expand, slide)
  - Long: 500ms (page transitions)

## Reglas estrictas

- NUNCA usar sombras tipo `box-shadow: X Y blur color` arbitrarias — usar solo los 5 niveles de elevación
- NUNCA usar esquinas arbitrarias — usar solo los tamaños definidos (xs, sm, md, lg, xl, full)
- NUNCA usar transiciones lineales — siempre `cubic-bezier(0.2, 0, 0, 1)`
- Los colores de texto DEBEN tener suficiente contraste (ratio mínimo 4.5:1)
- Los estados interactivos (hover, focus, active) son OBLIGATORIOS en elementos clickeables
