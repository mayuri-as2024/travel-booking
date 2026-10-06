import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import DestinationCard from '../components/DestinationCard'
import { destinations } from '../data/destinations'

const regions = ['All', ...Array.from(new Set(destinations.map((d) => d.region)))]

export default function Destinations() {
  const [params, setParams] = useSearchParams()
  const initial = params.get('q') || ''
  const [query, setQuery] = useState(initial)
  const [submitted, setSubmitted] = useState(initial)
  const [region, setRegion] = useState('All')
  const [maxPrice, setMaxPrice] = useState('')

  const results = useMemo(() => {
    const q = submitted.trim().toLowerCase()
    const cap = maxPrice === '' ? Infinity : Number(maxPrice)
    return destinations.filter((d) => {
      const matchesQuery =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.region.toLowerCase().includes(q)
      const matchesRegion = region === 'All' || d.region === region
      const matchesPrice = !Number.isFinite(cap) || d.priceFrom <= cap
      return matchesQuery && matchesRegion && matchesPrice
    })
  }, [submitted, region, maxPrice])

  function onSearch(e) {
    e.preventDefault()
    const q = query.trim()
    setSubmitted(q)
    setParams(q ? { q } : {})
  }

  const noResults = results.length === 0

  return (
    <div className="section">
      <div className="section-head">
        <div>
          <p className="eyebrow">Explore</p>
          <h1>Destinations</h1>
          <p className="muted">Search Paris, Dubai, Bali, Tokyo, Singapore, London, Maldives or Switzerland.</p>
        </div>
      </div>

      <form className="filter-bar" onSubmit={onSearch}>
        <input
          id="search-destination"
          name="destination"
          placeholder="Search destinations"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select id="search-category" value={region} onChange={(e) => setRegion(e.target.value)}>
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <select id="search-price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}>
          <option value="">Any price</option>
          <option value="800">Up to $800</option>
          <option value="1000">Up to $1000</option>
          <option value="1300">Up to $1300</option>
          <option value="2000">Up to $2000</option>
        </select>
        <button type="submit" className="btn gold" id="search-submit">
          Search
        </button>
      </form>

      {noResults ? (
        <div className="alert error" id="search-error" role="alert">
          No destinations found
        </div>
      ) : (
        <div id="search-error" className="alert error hidden" />
      )}

      {!noResults ? (
        <div className="grid dest-grid" id="search-results">
          {results.map((d) => (
            <DestinationCard key={d.id} destination={d} />
          ))}
        </div>
      ) : null}
    </div>
  )
}
