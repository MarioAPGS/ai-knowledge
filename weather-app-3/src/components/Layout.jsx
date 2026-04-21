import { NavLink, Outlet } from 'react-router-dom'
import './Layout.css'

export default function Layout() {
  return (
    <div className="app-layout">
      <header className="app-header">
        <span className="logo">Weather App</span>
        <nav>
          <NavLink to="/" end>Clima</NavLink>
        </nav>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}
