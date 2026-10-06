import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <p className="brand-mini">Agile Travel</p>
          <p className="muted">Curated journeys. Honest prices. Demo booking for software testing.</p>
        </div>
        <div className="footer-links">
          <Link to="/destinations">Destinations</Link>
          <Link to="/packages">Packages</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login">Login</Link>
        </div>
        <p className="muted small">© {new Date().getFullYear()} Agile Travel. Demo only — no real payments.</p>
      </div>
    </footer>
  )
}
