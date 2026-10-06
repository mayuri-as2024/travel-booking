import { Link } from 'react-router-dom'

export default function DestinationCard({ destination }) {
  return (
    <article className="card dest-card" data-destination={destination.name}>
      <div className="card-media" style={{ backgroundImage: `url(${destination.image})` }} />
      <div className="card-body">
        <p className="eyebrow">
          {destination.country} · {destination.region}
        </p>
        <h3>{destination.name}</h3>
        <p>{destination.tagline}</p>
        <div className="card-meta">
          <span>From ${destination.priceFrom}</span>
          <span>★ {destination.rating}</span>
        </div>
        <Link className="btn text" to={`/destinations?q=${encodeURIComponent(destination.name)}`}>
          Explore
        </Link>
      </div>
    </article>
  )
}
