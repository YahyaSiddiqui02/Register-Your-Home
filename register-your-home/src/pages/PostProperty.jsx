import { useState } from 'react'

const initialForm = {
  listingType: 'Rent',
  propertyType: 'Flat',
  title: '',
  price: '',
  bhk: '',
  area: '',
  furnished: 'Unfurnished',
  city: '',
  location: '',
  address: '',
  description: '',
  image: '',
  ownerName: '',
  phone: '',
}

const initialErrors = {}

export default function PostProperty() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState(initialErrors)
  const [successMessage, setSuccessMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validateForm = () => {
    const nextErrors = {}

    if (!form.title.trim()) nextErrors.title = 'Title is required'
    if (!form.price || Number(form.price) <= 0) {
      nextErrors.price = 'Price must be greater than 0'
    }
    if (!form.city.trim()) nextErrors.city = 'City is required'
    if (!form.location.trim()) nextErrors.location = 'Location is required'
    if (!form.ownerName.trim()) nextErrors.ownerName = 'Owner name is required'
    if (form.phone && !/^\d{10}$/.test(form.phone.trim())) {
      nextErrors.phone = 'Phone must be 10 digits'
    }

    return nextErrors
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = validateForm()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setSuccessMessage('')
      return
    }

    console.log('Property submitted:', form)
    setSuccessMessage('Property submitted (demo)')
    setForm(initialForm)
    setErrors(initialErrors)
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Register Your Property
        </h1>
        <p className="mt-2 text-sm text-slate-600 sm:text-base">
          Share your home details and connect with buyers or tenants quickly.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Listing type
              </label>
              <div className="flex flex-wrap gap-4">
                {['Rent', 'Sale'].map((option) => (
                  <label key={option} className="flex items-center gap-2 text-sm text-slate-700">
                    <input
                      type="radio"
                      name="listingType"
                      value={option}
                      checked={form.listingType === option}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="propertyType" className="mb-1 block text-sm font-medium text-slate-700">
                Property type
              </label>
              <select
                id="propertyType"
                name="propertyType"
                value={form.propertyType}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white"
              >
                <option value="Flat">Flat</option>
                <option value="House">House</option>
                <option value="Plot">Plot</option>
                <option value="PG">PG</option>
                <option value="Shop">Shop</option>
              </select>
            </div>

            <div>
              <label htmlFor="title" className="mb-1 block text-sm font-medium text-slate-700">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white"
              />
              {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
            </div>

            <div>
              <label htmlFor="price" className="mb-1 block text-sm font-medium text-slate-700">
                Price
              </label>
              <input
                id="price"
                name="price"
                type="number"
                min="1"
                value={form.price}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white"
              />
              {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price}</p>}
            </div>

            <div>
              <label htmlFor="bhk" className="mb-1 block text-sm font-medium text-slate-700">
                BHK
              </label>
              <input
                id="bhk"
                name="bhk"
                type="number"
                min="0"
                value={form.bhk}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white"
              />
            </div>

            <div>
              <label htmlFor="area" className="mb-1 block text-sm font-medium text-slate-700">
                Area (sq ft)
              </label>
              <input
                id="area"
                name="area"
                type="number"
                min="0"
                value={form.area}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white"
              />
            </div>

            <div>
              <label htmlFor="furnished" className="mb-1 block text-sm font-medium text-slate-700">
                Furnished
              </label>
              <select
                id="furnished"
                name="furnished"
                value={form.furnished}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white"
              >
                <option value="Unfurnished">Unfurnished</option>
                <option value="Semi-furnished">Semi-furnished</option>
                <option value="Fully furnished">Fully furnished</option>
              </select>
            </div>

            <div>
              <label htmlFor="city" className="mb-1 block text-sm font-medium text-slate-700">
                City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                value={form.city}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white"
              />
              {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
            </div>

            <div>
              <label htmlFor="location" className="mb-1 block text-sm font-medium text-slate-700">
                Location / locality
              </label>
              <input
                id="location"
                name="location"
                type="text"
                value={form.location}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white"
              />
              {errors.location && <p className="mt-1 text-xs text-red-500">{errors.location}</p>}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="address" className="mb-1 block text-sm font-medium text-slate-700">
                Full address
              </label>
              <textarea
                id="address"
                name="address"
                rows="3"
                value={form.address}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="mb-1 block text-sm font-medium text-slate-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                value={form.description}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="image" className="mb-1 block text-sm font-medium text-slate-700">
                Image URL
              </label>
              <input
                id="image"
                name="image"
                type="text"
                value={form.image}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white"
              />
            </div>

            <div>
              <label htmlFor="ownerName" className="mb-1 block text-sm font-medium text-slate-700">
                Owner name
              </label>
              <input
                id="ownerName"
                name="ownerName"
                type="text"
                value={form.ownerName}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white"
              />
              {errors.ownerName && <p className="mt-1 text-xs text-red-500">{errors.ownerName}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="mb-1 block text-sm font-medium text-slate-700">
                Phone number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white"
              />
              {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
            </div>
          </div>

          {successMessage && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              {successMessage}
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Submit Property
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
