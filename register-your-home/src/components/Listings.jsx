import { useState } from 'react'
import properties from '../data/properties'
import PropertyCard from './PropertyCard'

const listingOptions = ['All', 'Rent', 'Sale']
const propertyTypeOptions = ['All', 'Flat', 'House', 'Plot', 'PG', 'Shop']

export default function Listings() {
  const [listingType, setListingType] = useState('All')
  const [searchText, setSearchText] = useState('')
  const [propertyType, setPropertyType] = useState('All')
  const [maxPrice, setMaxPrice] = useState('')
  const [sortBy, setSortBy] = useState('default')

  const clearFilters = () => {
    setListingType('All')
    setSearchText('')
    setPropertyType('All')
    setMaxPrice('')
    setSortBy('default')
  }

  const filteredProperties = properties
    .filter((property) => {
      const matchesListingType =
        listingType === 'All' || property.listingType === listingType

      const query = searchText.trim().toLowerCase()
      const matchesSearch =
        query === '' ||
        property.title.toLowerCase().includes(query) ||
        property.city.toLowerCase().includes(query) ||
        property.location.toLowerCase().includes(query)

      const matchesType =
        propertyType === 'All' || property.type === propertyType

      const matchesMaxPrice =
        maxPrice === '' || Number(maxPrice) === 0 || property.price <= Number(maxPrice)

      return matchesListingType && matchesSearch && matchesType && matchesMaxPrice
    })
    .sort((a, b) => {
      if (sortBy === 'low-high') {
        return a.price - b.price
      }

      if (sortBy === 'high-low') {
        return b.price - a.price
      }

      return 0
    })

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 lg:p-6">
        <div className="flex flex-wrap items-center gap-2">
          {listingOptions.map((option) => {
            const isActive = listingType === option

            return (
              <button
                key={option}
                type="button"
                onClick={() => setListingType(option)}
                className={[
                  'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200',
                ].join(' ')}
              >
                {option}
              </button>
            )
          })}
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-[1.6fr_1fr_1fr_1fr_auto]">
          <input
            type="text"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search by title, city or location"
            className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white"
          />

          <select
            value={propertyType}
            onChange={(event) => setPropertyType(event.target.value)}
            className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white"
          >
            {propertyTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <input
            type="number"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
            placeholder="Max price"
            className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white"
          />

          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white"
          >
            <option value="default">Default</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>

          <button
            type="button"
            onClick={clearFilters}
            className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Clear filters
          </button>
        </div>
      </div>

      <div className="mt-8">
        <p className="mb-5 text-sm font-medium text-slate-600">
          {filteredProperties.length} properties found
        </p>

        {filteredProperties.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center text-slate-600">
            No properties found
          </div>
        )}
      </div>
    </section>
  )
}
