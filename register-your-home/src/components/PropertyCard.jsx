import { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatPrice } from '../utils/formatPrice'

const FALLBACK = 'https://picsum.photos/seed/ryh-fallback/600/400'

export default function PropertyCard({ property }) {
  const [liked, setLiked] = useState(false)
  const p = property

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition overflow-hidden flex flex-col">
      <div className="relative">
        <img
          src={p.image || FALLBACK}
          alt={p.title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = FALLBACK
          }}
          className="h-48 w-full object-cover"
        />
        <span
          className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold text-white ${
            p.listingType === 'Rent' ? 'bg-green-600' : 'bg-orange-500'
          }`}
        >
          {p.listingType}
        </span>
        <button
          type="button"
          onClick={() => setLiked(!liked)}
          aria-label="Favorite"
          className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/90 text-xl shadow flex items-center justify-center"
        >
          <span className={liked ? 'text-red-500' : 'text-gray-400'}>{liked ? '♥' : '♡'}</span>
        </button>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-lg leading-snug">{p.title}</h3>
        <p className="text-sm text-gray-500 mt-1">
          {p.location}, {p.city}
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-700 mt-3">
          {p.bhk > 0 && <span>{p.bhk} BHK</span>}
          <span>{p.area} sq ft</span>
          <span>{p.furnished}</span>
        </div>
        <p className="text-xl font-bold text-blue-600 mt-4">{formatPrice(p.price, p.listingType)}</p>
        <Link
          to={`/property/${p.id}`}
          className="mt-4 block rounded-lg bg-blue-600 py-2 text-center font-medium text-white hover:bg-blue-700"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}
