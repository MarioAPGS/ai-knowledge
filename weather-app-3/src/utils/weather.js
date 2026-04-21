const WEATHER_LABELS = {
  0: 'Despejado ☀️',
  1: 'Mayormente despejado 🌤️',
  2: 'Parcialmente nublado ⛅',
  3: 'Nublado ☁️',
  45: 'Niebla 🌫️',
  48: 'Niebla helada 🌫️',
  51: 'Llovizna ligera 🌦️',
  53: 'Llovizna 🌦️',
  55: 'Llovizna intensa 🌧️',
  61: 'Lluvia ligera 🌧️',
  63: 'Lluvia 🌧️',
  65: 'Lluvia intensa 🌧️',
  71: 'Nieve ligera 🌨️',
  73: 'Nieve 🌨️',
  75: 'Nieve intensa ❄️',
  80: 'Chubascos ligeros 🌦️',
  81: 'Chubascos 🌧️',
  82: 'Chubascos intensos ⛈️',
  95: 'Tormenta ⛈️',
  96: 'Tormenta con granizo ⛈️',
  99: 'Tormenta fuerte con granizo ⛈️',
}

export function getWeatherLabel(code) {
  return WEATHER_LABELS[code] || 'Desconocido'
}

export function formatDayName(dateString) {
  const date = new Date(dateString + 'T12:00:00')
  const name = date.toLocaleDateString('es-ES', { weekday: 'long' })
  return name.charAt(0).toUpperCase() + name.slice(1)
}
