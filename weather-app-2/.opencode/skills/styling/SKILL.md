---
name: styling
description: Convenciones de estilos CSS para la Weather App
---

## Reglas de estilos

- Cada componente/página tiene su propio archivo `.css` en la misma carpeta
- **No** usar CSS-in-JS (styled-components, emotion, etc.)
- **No** usar inline styles
- **No** usar frameworks CSS (Tailwind, Bootstrap, etc.)
- CSS vanilla únicamente

## Patrón de estilos (basado en Weather.css)

```css
/* Card principal - fondo blanco, bordes redondeados, sombra suave */
.nombre-card {
  background: white;
  border-radius: 16px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

/* Títulos */
.nombre-card h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #222;
}

/* Texto de error siempre en rojo */
.error {
  color: #e74c3c;
}
```

## Paleta de colores del proyecto

- Fondo de la app: `#f5f5f5`
- Cards: `white`
- Texto principal: `#333`
- Títulos: `#222`
- Datos destacados: `#111` (bold)
- Texto secundario: `#888`
- Error: `#e74c3c`

## Variables globales (index.css)

- Font: `system-ui, -apple-system, sans-serif`
- Max width del contenedor: `480px`
- Reset global con `* { margin: 0; padding: 0; box-sizing: border-box }`
