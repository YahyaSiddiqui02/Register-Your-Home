import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Field from '../components/Field'
import { inputCls } from '../utils/ui'
import { createProperty } from '../services/api'
import { useAuth } from '../context/AuthContext'

const emptyForm = {
  listingType: 'Rent',
  type: 'Flat',
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
}

export default function PostProperty() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  if (!user) {
    return (
      <div className="text-center py-16">
        <p className="text-lg mb-4">Please login to post a property.</p>
        <Link to="/login" className="rounded-lg bg-blue-600 px-6 py-2 text-white">
          Login
        </Link>
      </div>
    )
  }
  if (!['OWNER', 'LIAISON', 'ADMIN'].includes(user.role)) {
    return (
      <div className="text-center py-16 px-4">
        <p className="text-lg">Only Owners and Liaisons can post properties.</p>
        <p className="text-gray-500 mt-2">Create a new account and choose the Owner role.</p>
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.title.trim()) errs.title = 'Title is required'
    if (!(Number(form.price) > 0)) errs.price = 'Price must be greater than 0'
    if (form.bhk !== '' && Number(form.bhk) < 0) errs.bhk = 'BHK cannot be negative'
    if (form.area !== '' && Number(form.area) < 0) errs.area = 'Area cannot be negative'
    if (!form.city.trim()) errs.city = 'City is required'
    if (!form.location.trim()) errs.location = 'Location is required'
    setErrors(errs)
    setServerError('')
    if (Object.keys(errs).length) return

    const bhk = Number(form.bhk || 0)
    const area = Number(form.area || 0)
    const body = {
      listingType: form.listingType,
      type: form.type,
      title: form.title.trim(),
      price: Number(form.price),
      bhk,
      bedrooms: bhk,
      area,
      areaSqFt: area,
      furnished: form.furnished,
      city: form.city.trim(),
      location: form.location.trim(),
      address: (form.address.trim() || form.location.trim()),
      description: form.description.trim(),
      ...(form.image.trim() ? { image: form.image.trim() } : {}),
    }

    setLoading(true)
    try {
      const res = await createProperty(body)
      navigate(`/property/${res.data.id}`)
    } catch (err) {
      setServerError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">Register Your Property</h1>
      <p className="text-gray-500 mb-6">Fill in the details to list your property.</p>
      <form onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 grid gap-4 md:grid-cols-2">
        <Field label="Listing type">
          <select name="listingType" className={inputCls} value={form.listingType} onChange={handleChange}>
            <option>Rent</option>
            <option>Sale</option>
          </select>
        </Field>
        <Field label="Property type">
          <select name="type" className={inputCls} value={form.type} onChange={handleChange}>
            {['Flat', 'House', 'Plot', 'PG', 'Shop'].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>
        <div className="md:col-span-2">
          <Field label="Title" error={errors.title}>
            <input name="title" className={inputCls} value={form.title} onChange={handleChange} />
          </Field>
        </div>
        <Field label="Price (₹)" error={errors.price}>
          <input name="price" type="number" className={inputCls} value={form.price} onChange={handleChange} />
        </Field>
        <Field label="BHK" error={errors.bhk}>
          <input name="bhk" type="number" className={inputCls} value={form.bhk} onChange={handleChange} />
        </Field>
        <Field label="Area (sq ft)" error={errors.area}>
          <input name="area" type="number" className={inputCls} value={form.area} onChange={handleChange} />
        </Field>
        <Field label="Furnishing">
          <select name="furnished" className={inputCls} value={form.furnished} onChange={handleChange}>
            <option>Unfurnished</option>
            <option>Semi-furnished</option>
            <option>Fully furnished</option>
          </select>
        </Field>
        <Field label="City" error={errors.city}>
          <input name="city" className={inputCls} value={form.city} onChange={handleChange} />
        </Field>
        <Field label="Location / locality" error={errors.location}>
          <input name="location" className={inputCls} value={form.location} onChange={handleChange} />
        </Field>
        <div className="md:col-span-2">
          <Field label="Full address">
            <textarea name="address" rows="2" className={inputCls} value={form.address} onChange={handleChange} />
          </Field>
        </div>
        <div className="md:col-span-2">
          <Field label="Description">
            <textarea name="description" rows="3" className={inputCls} value={form.description} onChange={handleChange} />
          </Field>
        </div>
        <div className="md:col-span-2">
          <Field label="Image URL">
            <input name="image" className={inputCls} value={form.image} onChange={handleChange} />
          </Field>
        </div>
        {serverError && <p className="md:col-span-2 text-sm text-red-600">{serverError}</p>}
        <button
          type="submit"
          disabled={loading}
          className="md:col-span-2 rounded-lg bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? 'Submitting...' : 'Submit Property'}
        </button>
      </form>
    </div>
  )
}
