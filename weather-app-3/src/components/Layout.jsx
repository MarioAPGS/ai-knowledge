import { useState, useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { getInitialTheme, saveTheme, applyTheme } from '../utils/theme'
import './Layout.css'

export default function Layout() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  function handleToggleTheme() {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    saveTheme(next)
  }

  return (
    <div className="app-layout">
      <header className="app-header">
        <span className="logo">Weather App</span>
        <div className="header-actions">
          <nav>
            <NavLink to="/" end>Clima</NavLink>
          </nav>
          <button
            className="theme-toggle"
            onClick={handleToggleTheme}
            aria-label={theme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}
            title={theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}
