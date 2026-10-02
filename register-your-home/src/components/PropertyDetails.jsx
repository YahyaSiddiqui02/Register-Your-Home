import { useParams, Link } from 'react-router-dom'
import properties from '../data/properties'

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

export default function PropertyDetails() {
  const { id } = useParams()
  const property = properties.find((item) => item.id === Number(id))

  if (!property) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-800">Property not found</h2>
        <Link
          to="/"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Back to listings
        </Link>
      </div>
    )
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    alert('Enquiry sent (demo)')
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link to="/" className="text-sm font-medium text-blue-600 hover:text-blue-700">
          ← Back to listings
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.6fr_0.8fr]">
        <div className="space-y-6">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <img
              src={property.image}
              alt={property.title}
              className="h-[420px] w-full object-cover"
            />
          </div>

          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-slate-900">{property.title}</h1>
              <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">
                {property.listingType}
              </span>
            </div>
            <p className="mt-2 text-lg text-slate-500">
              {property.location}, {property.city}
            </p>
          </div>

          <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-2 xl:grid-cols-5">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Type
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-800">{property.type}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                BHK
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-800">
                {property.bhk > 0 ? `${property.bhk} BHK` : 'Studio'}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Area
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-800">
                {property.area} sq ft
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Furnished
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-800">
                {property.furnished ? 'Yes' : 'No'}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Listing
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-800">
                {property.listingType}
              </p>
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Price</p>
            <p className="mt-2 text-3xl font-bold text-blue-600">
              {formatPrice(property.listingType, property.price)}
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="phone" className="mb-1 block text-sm font-medium text-slate-700">
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white"
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-1 block text-sm font-medium text-slate-700">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white"
                  placeholder="Tell us what you are looking for"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Send Enquiry
              </button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  )
}
