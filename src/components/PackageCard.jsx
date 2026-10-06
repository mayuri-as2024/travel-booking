import { Link } from 'react-router-dom'

export default function PackageCard({ pkg }) {
  return (
    <article className="card pkg-card" data-package={pkg.id}>
      <div className="card-media" style={{ backgroundImage: `url(${pkg.image})` }}>
        <span className="chip">{pkg.category}</span>
      </div>
      <div className="card-body">
        <p className="eyebrow">{pkg.destination}</p>
        <h3>{pkg.name}</h3>
        <p>{pkg.description}</p>
        <div className="card-meta">
          <span>{pkg.duration}</span>
          <span>★ {pkg.rating}</span>
          <span>Cap. {pkg.capacity}</span>
        </div>
        <p className="price">${pkg.price} <small>/ person</small></p>
        <div className="card-actions">
          <Link className="btn ghost" to={`/packages/${pkg.id}`} id={`view-details-${pkg.id}`}>
            View Details
          </Link>
          <Link className="btn gold" to={`/booking?packageId=${pkg.id}`} id={`book-now-${pkg.id}`}>
            Book Now
          </Link>
        </div>
      </div>
    </article>
  )
}
