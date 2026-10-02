import { useState } from 'react'

function formatPrice(listingType, price) {
  if (listingType === 'Rent') {
    return `₹${Number(price).toLocaleString('en-IN')}/month`
  }

  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`
  }

  if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2)} L`
  }

  return `₹${Number(price).toLocaleString('en-IN')}`
}

export default function PropertyCard({ property }) {
  const [liked, setLiked] = useState(false)

  const badgeClasses =
    property.listingType === 'Rent'
      ? 'bg-emerald-500 text-white'
      : 'bg-orange-500 text-white'

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:shadow-xl">
      <div className="relative">
        <img
          src={property.image}
          alt={property.title}
          className="h-56 w-full object-cover"
        />

        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold ${badgeClasses}`}
        >
          {property.listingType}
        </span>

        <button
          type="button"
          aria-label="Toggle favorite"
          onClick={() => setLiked((prev) => !prev)}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-lg shadow-sm transition hover:bg-white"
        >
          {liked ? '♥' : '♡'}
        </button>
      </div>

      <div className="space-y-4 p-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800">{property.title}</h3>
          <p className="mt-1 text-sm text-slate-500">
            {property.location}, {property.city}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
          {property.bhk > 0 && (
            <span className="rounded-full bg-slate-100 px-2 py-1">
              {property.bhk} BHK
            </span>
          )}
          <span className="rounded-full bg-slate-100 px-2 py-1">
            {property.area} sq ft
          </span>
          <span className="rounded-full bg-slate-100 px-2 py-1">
            {property.furnished ? 'Furnished' : 'Unfurnished'}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 pt-1">
          <div className="text-xl font-bold text-blue-600">
            {formatPrice(property.listingType, property.price)}
          </div>

          <button
            type="button"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            View Details
          </button>
        </div>
      </div>
    </article>
  )
}
