---
applyTo: "**/*.{jsx,css}"
---
# Skill: Layout Full-Screen con Header

## Cuándo aplicar

Este skill se aplica SIEMPRE, independientemente del estilo visual elegido. Define la estructura base de layout que todos los estilos deben respetar.

## Estructura obligatoria del layout

La app DEBE ocupar toda la pantalla (100vh) con un header fijo arriba y el contenido llenando el espacio restante. NUNCA centrar una card pequeña en medio de la pantalla.

### Estructura HTML esperada

```
<div class="app-layout">
  <header class="app-header">
    <span class="logo">Weather App</span>
    <nav>
      <NavLink to="/">Clima</NavLink>
      <NavLink to="/otra-pagina">Otra</NavLink>
    </nav>
  </header>
  <main class="app-main">
    {/* Contenido de la página */}
  </main>
</div>
```

### CSS base del layout (index.css)

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  min-height: 100vh;
}

#root {
  width: 100%;
  min-height: 100vh;
}

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

## Reglas del Layout

### Lo que DEBE cumplirse

- `#root` ocupa el 100% del ancho, sin `max-width`
- `.app-layout` es flex column y ocupa mínimo 100vh
- `.app-header` es sticky en la parte superior con `z-index: 100`
- `.app-main` usa `flex: 1` para llenar el espacio restante
- El contenido dentro de `.app-main` puede usar un `max-width` interno si necesita centrar, pero el fondo/main ocupa todo el ancho

### Lo que NUNCA debe hacerse

- NUNCA poner `max-width: 480px` en `#root` — el root siempre al 100%
- NUNCA centrar el body con `display: flex; justify-content: center; align-items: center`
- NUNCA tener la app como una sola card flotante en el centro de la pantalla
- NUNCA omitir el header con navegación

## Componente Layout (src/components/Layout.jsx)

Se DEBE crear un componente `Layout.jsx` que envuelve todas las páginas:

```jsx
import { NavLink, Outlet } from 'react-router-dom'
import './Layout.css'

export default function Layout() {
  return (
    <div className="app-layout">
      <header className="app-header">
        <span className="logo">Weather App</span>
        <nav>
          <NavLink to="/" end>Clima</NavLink>
          {/* Agregar más links según se añadan páginas */}
        </nav>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}
```

## Integración en main.jsx

Las rutas DEBEN usar el Layout como ruta padre:

```jsx
import Layout from './components/Layout.jsx'

<Routes>
  <Route element={<Layout />}>
    <Route path="/" element={<Weather />} />
    {/* más rutas aquí */}
  </Route>
</Routes>
```

## Responsive

- El header debe colapsar a menú hamburguesa en pantallas < 640px
- El padding de `.app-main` se reduce a 16px en pantallas < 640px
- La navegación en mobile puede ser un menú desplegable o bottom navigation
