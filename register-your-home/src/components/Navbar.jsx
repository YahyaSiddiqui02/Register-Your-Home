import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { SITE } from '../config/site'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Buy', to: '/?listing=Sale' },
  { label: 'Rent', to: '/?listing=Rent' },
  { label: 'Give Property', to: '/post-property' },
  { label: 'Liaison', to: '/' },
]

export default function Navbar() {
  const { user, logout } = useAuth()
  const displayName = user?.name || user?.fullName || 'there'

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <nav className="max-w-6xl mx-auto flex items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="text-xl font-bold text-blue-600">
          {SITE.name}
        </Link>
        <ul className="hidden md:flex gap-5 text-gray-700 font-medium">
          {links.map((l) => (
            <li key={l.label}>
              <Link to={l.to} className="hover:text-blue-600">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2 text-sm">
          <a href={`tel:+91${SITE.phone}`} className="hidden lg:inline font-medium text-gray-700 hover:text-blue-600">
            📞 {SITE.phoneDisplay}
          </a>
          <Link
            to="/post-property"
            className="rounded-lg border border-blue-600 px-3 py-1.5 font-medium text-blue-600 hover:bg-blue-50"
          >
            Post Property
          </Link>
          {user ? (
            <>
              <span className="hidden sm:inline text-gray-700">Hi, {displayName.split(' ')[0]}</span>
              <button onClick={logout} className="rounded-lg px-3 py-1.5 font-medium text-gray-700 hover:bg-gray-100">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="rounded-lg px-3 py-1.5 font-medium text-gray-700 hover:bg-gray-100">
                Login
              </Link>
              <Link to="/signup" className="rounded-lg bg-blue-600 px-3 py-1.5 font-medium text-white hover:bg-blue-700">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
