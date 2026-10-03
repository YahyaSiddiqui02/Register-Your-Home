import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getPropertyById } from '../services/api'
import { formatPrice } from '../utils/formatPrice'
import { inputCls } from '../utils/ui'

const FALLBACK = 'https://picsum.photos/seed/ryh-fallback/900/600'

export default function PropertyDetails() {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [notFound, setNotFound] = useState(false)
  const [enquiry, setEnquiry] = useState({ name: '', phone: '', message: '' })

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError('')
    setNotFound(false)
    getPropertyById(id, controller.signal)
      .then((res) => setProperty(res.data))
      .catch((err) => {
        if (err.name === 'AbortError') return
        if (err.status === 404 || err.status === 400) setNotFound(true)
        else setError(err.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })
    return () => controller.abort()
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Enquiry sent (demo)')
    setEnquiry({ name: '', phone: '', message: '' })
  }

  if (loading) return <p className="text-center py-16 text-gray-600">Loading property...</p>
  if (notFound)
    return (
      <div className="text-center py-16">
        <p className="text-xl font-semibold mb-4">Property not found</p>
        <Link to="/" className="text-blue-600 hover:underline">
          Back to listings
        </Link>
      </div>
    )
  if (error) return <p className="text-center py-16 text-red-600">{error}</p>

  const p = property
  const details = [
    ['Type', p.type],
    ['Listing', p.listingType],
    ...(p.bhk > 0 ? [['BHK', p.bhk]] : []),
    ['Area', `${p.area} sq ft`],
    ['Furnishing', p.furnished],
    ['City', p.city],
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link to="/" className="text-blue-600 hover:underline text-sm">
        ← Back to listings
      </Link>
      <div className="grid gap-8 lg:grid-cols-3 mt-4">
        <div className="lg:col-span-2">
          <img
            src={p.image || FALLBACK}
            alt={p.title}
            onError={(e) => {
              e.currentTarget.src = FALLBACK
            }}
            className="w-full h-72 sm:h-96 object-cover rounded-xl"
          />
          <h1 className="text-2xl sm:text-3xl font-bold mt-6">{p.title}</h1>
          <p className="text-gray-500 mt-1">
            {p.location}, {p.city}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
            {details.map(([label, value]) => (
              <div key={label} className="bg-white border border-gray-200 rounded-lg p-4">
                <p className="text-xs uppercase text-gray-500">{label}</p>
                <p className="font-semibold mt-1">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 h-fit bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <p className="text-3xl font-bold text-blue-600">{formatPrice(p.price, p.listingType)}</p>
          <h2 className="font-semibold mt-6 mb-3">Contact Owner</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              required
              className={inputCls}
              placeholder="Your name"
              value={enquiry.name}
              onChange={(e) => setEnquiry({ ...enquiry, name: e.target.value })}
            />
            <input
              required
              className={inputCls}
              placeholder="Phone number"
              value={enquiry.phone}
              onChange={(e) => setEnquiry({ ...enquiry, phone: e.target.value })}
            />
            <textarea
              rows="3"
              className={inputCls}
              placeholder="Message"
              value={enquiry.message}
              onChange={(e) => setEnquiry({ ...enquiry, message: e.target.value })}
            />
            <button type="submit" className="w-full rounded-lg bg-blue-600 py-2 font-medium text-white hover:bg-blue-700">
              Send Enquiry
            </button>
          </form>
        </aside>
      </div>
    </div>
  )
}
