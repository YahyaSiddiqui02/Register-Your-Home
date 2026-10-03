import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getProperties } from '../services/api'
import PropertyCard from './PropertyCard'
import { inputCls } from '../utils/ui'
import { BUDGETS } from '../utils/budget'

const TYPES = ['All', 'Flat', 'House', 'Plot', 'PG', 'Shop']

export default function Listings() {
  const [searchParams] = useSearchParams()
  const sectionRef = useRef(null)
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)
  const [listingType, setListingType] = useState('All')
  const [search, setSearch] = useState('')
  const [propertyType, setPropertyType] = useState('All')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [sortBy, setSortBy] = useState('default')

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError('')
    getProperties(controller.signal)
      .then((res) => setProperties(res.data))
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })
    return () => controller.abort()
  }, [attempt])

  useEffect(() => {
    const l = searchParams.get('listing')
    setListingType(l === 'Rent' || l === 'Sale' ? l : 'All')
    setSearch(searchParams.get('city') || '')
    const t = searchParams.get('type')
    setPropertyType(TYPES.includes(t) ? t : 'All')
    setMinPrice(searchParams.get('minPrice') || '')
    setMaxPrice(searchParams.get('maxPrice') || '')
    if (searchParams.toString()) sectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [searchParams])

  const presets = BUDGETS[listingType] || []
  const presetIdx = presets.findIndex((b) => String(b.min) === minPrice && String(b.max) === maxPrice)

  const applyPreset = (idx) => {
    const b = presets[idx]
    setMinPrice(String(b.min))
    setMaxPrice(String(b.max))
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    const list = properties.filter(
      (p) =>
        (listingType === 'All' || p.listingType === listingType) &&
        (propertyType === 'All' || p.type === propertyType) &&
        (!q || [p.title, p.city, p.location].some((v) => (v || '').toLowerCase().includes(q))) &&
        (!minPrice || p.price >= Number(minPrice)) &&
        (!maxPrice || p.price <= Number(maxPrice)),
    )
    const sorted = [...list]
    if (sortBy === 'low-high') sorted.sort((a, b) => a.price - b.price)
    if (sortBy === 'high-low') sorted.sort((a, b) => b.price - a.price)
    return sorted
  }, [properties, listingType, propertyType, search, minPrice, maxPrice, sortBy])

  const clearFilters = () => {
    setListingType('All')
    setSearch('')
    setPropertyType('All')
    setMinPrice('')
    setMaxPrice('')
    setSortBy('default')
  }

  if (loading) return <p className="text-center py-16 text-gray-600">Loading properties...</p>
  if (error)
    return (
      <div className="text-center py-16">
        <p className="text-red-600 mb-4">{error}</p>
        <button onClick={() => setAttempt(attempt + 1)} className="rounded-lg bg-blue-600 px-5 py-2 text-white">
          Try again
        </button>
      </div>
    )

  return (
    <section ref={sectionRef} className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">Featured Properties</h2>

      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 space-y-3">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex gap-2">
            {['All', 'Rent', 'Sale'].map((t) => (
              <button
                key={t}
                onClick={() => setListingType(t)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  listingType === t ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <input
            className={`${inputCls} sm:w-56`}
            placeholder="Search title, city, area"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select className={`${inputCls} sm:w-36`} value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
            {TYPES.map((t) => (
              <option key={t} value={t}>
                {t === 'All' ? 'All types' : t}
              </option>
            ))}
          </select>
          <select className={`${inputCls} sm:w-48`} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="default">Sort: Default</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-3 items-center border-t border-gray-100 pt-3">
          <span className="text-sm font-semibold text-gray-700">Your budget:</span>
          <select
            className={`${inputCls} sm:w-56`}
            value={presetIdx >= 0 ? presetIdx : 'custom'}
            onChange={(e) => e.target.value !== 'custom' && applyPreset(Number(e.target.value))}
            disabled={listingType === 'All'}
          >
            {listingType === 'All' && <option value="custom">Pick Rent or Sale first</option>}
            {listingType !== 'All' && presetIdx < 0 && <option value="custom">Custom range</option>}
            {presets.map((b, i) => (
              <option key={b.label} value={i}>
                {b.label}
              </option>
            ))}
          </select>
          <input
            type="number"
            min="0"
            className={`${inputCls} sm:w-36`}
            placeholder="Min ₹"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            min="0"
            className={`${inputCls} sm:w-36`}
            placeholder="Max ₹"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <button onClick={clearFilters} className="text-sm font-medium text-blue-600 hover:underline">
            Clear filters
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4">{filtered.length} properties found</p>

      {filtered.length === 0 ? (
        <p className="text-center py-12 text-gray-500">No properties found. Try changing your budget or filters.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      )}
    </section>
  )
}
