# Weather App

Aplicación web sencilla que muestra el clima actual basándose en la ubicación del usuario.

## Stack tecnológico

- **React 19** — UI con functional components y hooks
- **Vite 8** — Bundler y servidor de desarrollo
- **React Router 7** — Enrutamiento del lado del cliente
- **Open-Meteo API** — Datos meteorológicos gratuitos (sin API key)

## Instalación

```bash
# Clonar e instalar dependencias
npm install
```

## Uso

```bash
# Iniciar servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Previsualizar build
npm run preview

# Ejecutar linter
npm run lint
```

## Estructura del proyecto

```
src/
├── main.jsx          # Punto de entrada + definición de rutas
├── index.css         # Estilos globales (reset, layout, fuentes)
├── assets/           # Imágenes y SVGs estáticos
└── pages/            # Páginas de la app
    ├── Weather.jsx   # Página principal — muestra clima actual
    └── Weather.css   # Estilos de la página de clima
```

## API

Usa la [API de Open-Meteo](https://open-meteo.com/) que es gratuita y no requiere API key.
La app solicita permiso de geolocalización al navegador para obtener las coordenadas del usuario.

## Cómo agregar una nueva página

1. Crear `src/pages/NuevaPagina.jsx` siguiendo el patrón de `Weather.jsx`
2. Crear `src/pages/NuevaPagina.css` con los estilos
3. Agregar la ruta en `src/main.jsx`
