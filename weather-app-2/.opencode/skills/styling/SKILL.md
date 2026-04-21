---
name: styling
description: Paleta de colores, patrones CSS y convenciones visuales del proyecto
---

## Paleta de colores

| Uso | Valor |
|---|---|
| Fondo de la app | `#f5f5f5` |
| Fondo de cards | `white` |
| Texto principal (body) | `#333` |
| Títulos | `#222` |
| Datos destacados (bold) | `#111` |
| Texto secundario | `#888` |
| Error | `#e74c3c` |

## Patrón de cards

Todas las cards del proyecto siguen este estilo base:

```css
.nombre-card {
  background: white;
  border-radius: 16px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}
```

## Tipografía

- Font stack: `system-ui, -apple-system, sans-serif` (definido en `index.css`)
- Títulos `h1`: `font-size: 24px`, `color: #222`
- Texto de error: `color: #e74c3c`

## Layout global (index.css)

- Reset: `* { margin: 0; padding: 0; box-sizing: border-box }`
- Contenedor centrado con `max-width: 480px`
- Fondo: `#f5f5f5`, `min-height: 100vh`

## Reglas

- Un archivo `.css` por componente/página, en la misma carpeta
- Nunca inline styles ni CSS-in-JS
- Nunca frameworks CSS (Tailwind, Bootstrap, etc.)
- Al crear una página nueva, mantener coherencia visual con las existentes — misma paleta, mismo estilo de cards, mismos espaciados
