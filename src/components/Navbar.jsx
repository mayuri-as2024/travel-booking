import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <header className="nav">
      <div className="nav-inner">
        <NavLink to="/" className="brand" id="nav-logo">
          <span className="brand-mark">AT</span>
          <span>
            Agile <em>Travel</em>
          </span>
        </NavLink>
        <nav className="nav-links" aria-label="Primary">
          <NavLink to="/" id="nav-home" end>
            Home
          </NavLink>
          <NavLink to="/destinations" id="nav-destinations">
            Destinations
          </NavLink>
          <NavLink to="/packages" id="nav-packages">
            Packages
          </NavLink>
          <NavLink to="/bookings" id="nav-bookings">
            My Bookings
          </NavLink>
          <NavLink to="/contact" id="nav-contact">
            Contact
          </NavLink>
        </nav>
        <div className="nav-actions">
          {currentUser ? (
            <>
              <span className="nav-user" id="nav-user">
                {currentUser.name}
              </span>
              <button type="button" className="btn ghost" id="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" className="btn gold" id="nav-login">
              Login
            </NavLink>
          )}
        </div>
      </div>
    </header>
  )
}
