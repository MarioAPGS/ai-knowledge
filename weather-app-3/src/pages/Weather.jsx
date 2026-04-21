import { useState, useEffect } from 'react'
import { getWeatherLabel, formatDayName } from '../utils/weather'
import './Weather.css'

const WEATHER_API = 'https://api.open-meteo.com/v1/forecast'

export default function Weather() {
  const [weather, setWeather] = useState(null)
  const [history, setHistory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        fetch(
          `${WEATHER_API}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&past_days=7&forecast_days=1&timezone=auto`
        )
          .then((res) => res.json())
          .then((data) => {
            setWeather(data)

            const today = data.current?.time?.slice(0, 10)
            const daily = data.daily
            if (daily && daily.time) {
              const days = daily.time
                .map((date, i) => ({
                  date,
                  dayName: formatDayName(date),
                  weatherLabel: getWeatherLabel(daily.weather_code[i]),
                  maxTemp: daily.temperature_2m_max[i],
                  minTemp: daily.temperature_2m_min[i],
                }))
                .filter((day) => day.date !== today)
              setHistory(days)
            }

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
    <div className="weather-page">
      <div className="weather-card">
        <h1>El Tiempo Hoy</h1>
        <p className="condition">{getWeatherLabel(current.weather_code)}</p>
        <p className="temp">{current.temperature_2m}°C</p>
        <p className="wind">Viento: {current.wind_speed_10m} km/h</p>
      </div>

      <section className="history-section">
        <h2 className="history-title">Últimos 7 días</h2>
        {!history ? (
          <p className="history-loading">Cargando historial...</p>
        ) : history.length === 0 ? (
          <p className="history-error">No hay datos de historial disponibles</p>
        ) : (
          <div className="history-scroll">
            {history.map((day) => (
              <div className="history-card" key={day.date}>
                <p className="history-day">{day.dayName}</p>
                <p className="history-condition">{day.weatherLabel}</p>
                <p className="history-temps">
                  <span className="history-max">{day.maxTemp}°</span>
                  <span className="history-min">{day.minTemp}°</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
