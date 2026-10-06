import { Link, useParams } from 'react-router-dom'
import { packages } from '../data/packages'

export default function PackageDetails() {
  const { id } = useParams()
  const pkg = packages.find((p) => p.id === id)

  if (!pkg) {
    return (
      <div className="section">
        <div className="alert error" id="package-error">
          Package not found
        </div>
        <Link to="/packages" className="btn ghost">
          Back to packages
        </Link>
      </div>
    )
  }

  return (
    <div className="section detail-page">
      <div className="detail-hero" style={{ backgroundImage: `url(${pkg.image})` }} />
      <div className="detail-grid">
        <div>
          <p className="eyebrow">
            {pkg.destination} · {pkg.category}
          </p>
          <h1>{pkg.name}</h1>
          <p className="lede">{pkg.description}</p>
          <ul className="highlights" id="package-highlights">
            {pkg.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
          <h2>Itinerary</h2>
          <ol className="highlights" id="package-itinerary">
            {(pkg.itinerary || []).map((day) => (
              <li key={day}>{day}</li>
            ))}
          </ol>
          <h2>Included services</h2>
          <ul className="highlights" id="package-included">
            {(pkg.included || []).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <aside className="detail-aside">
          <p className="price lg">
            ${pkg.price} <small>/ person</small>
          </p>
          <p>
            Duration: <strong>{pkg.duration}</strong>
          </p>
          <p>
            Rating: <strong>★ {pkg.rating}</strong>
          </p>
          <p>
            Max travelers: <strong id="package-capacity">{pkg.capacity}</strong>
          </p>
          <Link className="btn gold full" to={`/booking?packageId=${pkg.id}`} id="book-now">
            Book Now
          </Link>
        </aside>
      </div>
    </div>
  )
}
