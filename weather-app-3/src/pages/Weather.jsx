import { useState, useEffect } from 'react'
import './Weather.css'

const WEATHER_API = 'https://api.open-meteo.com/v1/forecast'

function getWeatherLabel(code) {
  const labels = {
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
  return labels[code] || 'Desconocido'
}

export default function Weather() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        fetch(
          `${WEATHER_API}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m&timezone=auto`
        )
          .then((res) => res.json())
          .then((data) => {
            setWeather(data)
            setLoading(false)
          })
          .catch(() => {
            setError('No se pudo obtener el clima')
            setLoading(false)
          })
      },
      () => {
        setError('Permite el acceso a tu ubicación para ver el clima')
        setLoading(false)
      }
    )
  }, [])

  if (loading) return <div className="weather-card"><p>Cargando...</p></div>
  if (error) return <div className="weather-card"><p className="error">{error}</p></div>

  const current = weather.current

  return (
    <div className="weather-card">
      <h1>El Tiempo Hoy</h1>
      <p className="condition">{getWeatherLabel(current.weather_code)}</p>
      <p className="temp">{current.temperature_2m}°C</p>
      <p className="wind">Viento: {current.wind_speed_10m} km/h</p>
    </div>
  )
}
