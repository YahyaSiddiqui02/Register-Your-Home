import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Field from '../components/Field'
import { inputCls } from '../utils/ui'
import { signupUser } from '../services/api'
import { useAuth } from '../context/AuthContext'

const empty = { name: '', email: '', phone: '', role: 'BUYER_TENANT', password: '', confirm: '' }

export default function Signup() {
  const navigate = useNavigate()
  const { saveSession } = useAuth()
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Enter a valid email'
    if (!/^\d{10}$/.test(form.phone)) errs.phone = 'Phone must be exactly 10 digits'
    if (form.password.length < 6) errs.password = 'Password must be at least 6 characters'
    if (form.confirm !== form.password) errs.confirm = 'Passwords do not match'
    setErrors(errs)
    setServerError('')
    if (Object.keys(errs).length) return
    setLoading(true)
    try {
      const res = await signupUser({
        name: form.name.trim(),
        fullName: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone,
        role: form.role,
        password: form.password,
      })
      saveSession(res.token, res.user)
      navigate('/')
    } catch (err) {
      setServerError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
        <h1 className="text-2xl font-bold mb-6">Create your account</h1>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <Field label="Full name" error={errors.name}>
            <input name="name" className={inputCls} value={form.name} onChange={handleChange} />
          </Field>
          <Field label="Email" error={errors.email}>
            <input name="email" type="email" className={inputCls} value={form.email} onChange={handleChange} />
          </Field>
          <Field label="Phone (10 digits)" error={errors.phone}>
            <input name="phone" className={inputCls} value={form.phone} onChange={handleChange} />
          </Field>
          <Field label="I am a">
            <select name="role" className={inputCls} value={form.role} onChange={handleChange}>
              <option value="BUYER_TENANT">Buyer / Tenant</option>
              <option value="OWNER">Owner</option>
              <option value="LIAISON">Liaison</option>
            </select>
          </Field>
          <Field label="Password" error={errors.password}>
            <input name="password" type="password" className={inputCls} value={form.password} onChange={handleChange} />
          </Field>
          <Field label="Confirm password" error={errors.confirm}>
            <input name="confirm" type="password" className={inputCls} value={form.confirm} onChange={handleChange} />
          </Field>
          {serverError && <p className="text-sm text-red-600">{serverError}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-6 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
