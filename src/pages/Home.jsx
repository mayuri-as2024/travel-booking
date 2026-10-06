import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DestinationCard from '../components/DestinationCard'
import PackageCard from '../components/PackageCard'
import { destinations } from '../data/destinations'
import { packages } from '../data/packages'

export default function Home() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const featured = packages.filter((p) => p.featured)

  function onSearch(e) {
    e.preventDefault()
    const q = query.trim()
    navigate(q ? `/destinations?q=${encodeURIComponent(q)}` : '/destinations')
  }

  return (
    <div>
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow light">Independent journeys, beautifully planned</p>
          <h1>Find the trip that feels like it was written for you.</h1>
          <p className="lede">
            Search eight iconic destinations, compare curated packages, and complete a full demo booking — built for
            real software testing.
          </p>
          <form className="hero-search" onSubmit={onSearch}>
            <label htmlFor="search-destination" className="sr-only">
              Search destination
            </label>
            <input
              id="search-destination"
              name="destination"
              placeholder="Search Paris, Dubai, Bali, Tokyo..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="btn gold" id="search-submit">
              Search
            </button>
          </form>
          <div className="hero-pills">
            {['Paris', 'Maldives', 'Tokyo', 'Switzerland'].map((name) => (
              <button
                key={name}
                type="button"
                className="pill"
                onClick={() => navigate(`/destinations?q=${encodeURIComponent(name)}`)}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Popular destinations</p>
            <h2>Where wanderlust goes next</h2>
          </div>
          <Link to="/destinations" className="btn ghost">
            View all
          </Link>
        </div>
        <div className="grid dest-grid">
          {destinations.slice(0, 4).map((d) => (
            <DestinationCard key={d.id} destination={d} />
          ))}
        </div>
      </section>

      <section className="section muted-bg">
        <div className="section-head">
          <div>
            <p className="eyebrow">Featured packages</p>
            <h2>Hand-picked itineraries</h2>
          </div>
          <Link to="/packages" className="btn ghost">
            All packages
          </Link>
        </div>
        <div className="grid pkg-grid">
          {featured.slice(0, 3).map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </section>

      <section className="section cta-band">
        <div>
          <h2>Ready when you are</h2>
          <p>Log in with the demo account and complete a booking in minutes.</p>
        </div>
        <Link to="/login" className="btn gold">
          Start booking
        </Link>
      </section>
    </div>
  )
}
