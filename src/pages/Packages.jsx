import { useMemo, useState } from 'react'
import PackageCard from '../components/PackageCard'
import { categories, packages } from '../data/packages'

export default function Packages() {
  const [category, setCategory] = useState('All')
  const [maxPrice, setMaxPrice] = useState('')
  const [sort, setSort] = useState('featured')

  const list = useMemo(() => {
    const cap = maxPrice === '' ? Infinity : Number(maxPrice)
    let items = packages.filter(
      (p) =>
        (category === 'All' || p.category === category) &&
        (!Number.isFinite(cap) || p.price <= cap),
    )
    if (sort === 'price-asc') items = [...items].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') items = [...items].sort((a, b) => b.price - a.price)
    if (sort === 'rating') items = [...items].sort((a, b) => b.rating - a.rating)
    return items
  }, [category, maxPrice, sort])

  return (
    <div className="section">
      <div className="section-head">
        <div>
          <p className="eyebrow">Travel packages</p>
          <h1>Itineraries with real prices and capacities</h1>
        </div>
      </div>
      <div className="filter-bar">
        <select id="package-category" value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select id="package-price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}>
          <option value="">Any price</option>
          <option value="1000">Up to $1000</option>
          <option value="1300">Up to $1300</option>
          <option value="1600">Up to $1600</option>
          <option value="2000">Up to $2000</option>
        </select>
        <select id="package-sort" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="featured">Featured</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="rating">Highest rated</option>
        </select>
      </div>
      {list.length === 0 ? (
        <div className="alert error" id="package-empty" role="alert">
          No packages found
        </div>
      ) : (
        <div className="grid pkg-grid" id="package-results">
          {list.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      )}
    </div>
  )
}
