const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

async function request(path, options = {}) {
  const token = localStorage.getItem('ryh_token')
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })
  let data = null
  try {
    data = await res.json()
  } catch {
    data = null
  }
  if (!res.ok) {
    const err = new Error(data?.message || 'Something went wrong')
    err.status = res.status
    throw err
  }
  return data
}

export const getProperties = (signal) => request('/properties', { signal })
export const getPropertyById = (id, signal) => request(`/properties/${id}`, { signal })
export const createProperty = (body) =>
  request('/properties', { method: 'POST', body: JSON.stringify(body) })
export const signupUser = (body) =>
  request('/auth/signup', { method: 'POST', body: JSON.stringify(body) })
export const loginUser = (body) =>
  request('/auth/login', { method: 'POST', body: JSON.stringify(body) })
