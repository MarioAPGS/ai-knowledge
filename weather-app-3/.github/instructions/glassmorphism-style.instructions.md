---
applyTo: "**/*.css"
---
# Skill: Estilo Glassmorphism

> **ACTIVACIÓN:** Este skill SOLO se aplica cuando `CONTRIBUTING.md` indica `ESTILO_ACTIVO: glassmorphism`. Si el estilo activo es otro, IGNORA este archivo por completo.

## Filosofía

Interfaces translúcidas con efecto vidrio esmerilado. Capas semi-transparentes con blur intenso sobre fondos con gradientes vibrantes. Elegante, moderno y con profundidad visual sin sombras pesadas.

## Paleta de colores

```
--glass-bg:          linear-gradient(135deg, #667eea 0%, #764ba2 100%);  /* Fondo gradiente */
--glass-surface:     rgba(255, 255, 255, 0.15);    /* Superficie cristal */
--glass-surface-alt: rgba(255, 255, 255, 0.08);    /* Superficie secundaria */
--glass-border:      rgba(255, 255, 255, 0.25);    /* Borde sutil */
--glass-text:        #ffffff;                        /* Texto principal */
--glass-text-muted:  rgba(255, 255, 255, 0.7);     /* Texto secundario */
--glass-accent:      #a78bfa;                        /* Acento — violeta claro */
--glass-success:     #34d399;                        /* Verde éxito */
--glass-error:       #fb7185;                        /* Rojo error */
--glass-blur:        20px;                           /* Intensidad de blur */
```

## Fondo global

El fondo de la aplicación SIEMPRE debe ser un gradiente vibrante para que el efecto glass funcione. Puede opcionalmente tener formas decorativas (blobs) con colores contrastantes.

```css
body {
  background: var(--glass-bg);
  min-height: 100vh;
}

/* Opcional: blobs decorativos */
body::before,
body::after {
  content: '';
  position: fixed;
  border-radius: 50%;
  filter: blur(80px);
  z-index: -1;
}

body::before {
  width: 400px;
  height: 400px;
  background: rgba(236, 72, 153, 0.3);
  top: -100px;
  right: -100px;
}

body::after {
  width: 300px;
  height: 300px;
  background: rgba(59, 130, 246, 0.3);
  bottom: -50px;
  left: -50px;
}
```

## Tipografía

- Usar `font-family: 'Inter', system-ui, -apple-system, sans-serif`
- Peso ligero para body (300-400) y medium para headers (500-600)
- El texto siempre es blanco o blanco semi-transparente sobre las superficies glass
- `text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1)` para mejorar legibilidad

## El efecto Glass

La base de todo componente glass:

```css
.glass {
  background: var(--glass-surface);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: 16px;
}
```

**Importante:** `backdrop-filter` es el elemento clave. Sin él, no hay glassmorphism.

## Componentes

### Header / Navegación

```css
.app-header {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border-bottom: 1px solid var(--glass-border);
  padding: 0 24px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.app-header .logo {
  font-size: 20px;
  font-weight: 600;
  color: var(--glass-text);
  letter-spacing: 0.5px;
}

.app-header nav {
  display: flex;
  gap: 4px;
}

.app-header nav a {
  font-size: 14px;
  font-weight: 400;
  color: var(--glass-text-muted);
  text-decoration: none;
  padding: 8px 20px;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.app-header nav a:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--glass-text);
}

.app-header nav a.active {
  background: rgba(255, 255, 255, 0.2);
  color: var(--glass-text);
  border: 1px solid var(--glass-border);
}
```

### Cards

```css
.card {
  background: var(--glass-surface);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 32px;
  transition: all 0.3s ease;
}

.card:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.35);
}
```

### Botones

```css
.btn {
  font-size: 14px;
  font-weight: 500;
  padding: 10px 28px;
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: var(--glass-text);
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-1px);
}

/* Variante sólida */
.btn-solid {
  background: var(--glass-accent);
  border: none;
  color: white;
}

.btn-solid:hover {
  filter: brightness(1.1);
  transform: translateY(-1px);
}
```

### Inputs

```css
input, select {
  font-family: inherit;
  font-size: 15px;
  padding: 12px 16px;
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: var(--glass-text);
  transition: all 0.3s ease;
}

input::placeholder {
  color: var(--glass-text-muted);
}

input:focus, select:focus {
  outline: none;
  border-color: var(--glass-accent);
  background: rgba(255, 255, 255, 0.12);
  box-shadow: 0 0 0 3px rgba(167, 139, 250, 0.2);
}
```

## Reglas estrictas

- NUNCA usar fondos sólidos opacos en componentes — siempre semi-transparentes con `rgba()`
- NUNCA olvidar `-webkit-backdrop-filter` — Safari lo necesita
- NUNCA usar `box-shadow` pesadas — las sombras deben ser muy sutiles o inexistentes
- El `border` debe ser siempre semi-transparente (blanco con alpha)
- El `border-radius` mínimo es 12px — nada con esquinas rectas
- Los fondos gradiente del body son OBLIGATORIOS — sin ellos el glass no tiene sentido visual
- Los textos sobre glass siempre en blanco o blanco semi-transparente — nunca colores oscuros
