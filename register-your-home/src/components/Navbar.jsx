import { Link } from 'react-router-dom'
import { useState } from 'react'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Buy', href: '#' },
  { label: 'Rent', href: '#' },
  { label: 'Sell', href: '#' },
  { label: 'Liaison', href: '#' },
]

const tabs = ['Buy', 'Rent', 'Sell']
const propertyTypes = ['Flat', 'House', 'Plot', 'PG', 'Shop']

export default function Hero() {
  const [activeTab, setActiveTab] = useState('Buy')

  return (
    <section className="w-full bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center lg:text-left">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Find, Rent, Buy or Sell Your Home
          </h1>
          <p className="mt-4 text-base font-light text-blue-100 sm:text-lg">
            Register your property or discover your next home in minutes
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-5xl rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-blue-100 sm:p-5 lg:p-6">
          <div className="mb-4 flex flex-wrap gap-2 sm:gap-3">
            {tabs.map((tab) => {
              const isActive = activeTab === tab

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={[
                    'rounded-full px-4 py-2 text-sm font-semibold transition-colors sm:px-5',
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-blue-50 text-blue-700 hover:bg-blue-100',
                  ].join(' ')}
                >
                  {tab}
                </button>
              )
            })}
          </div>

          <div className="grid gap-3 md:grid-cols-[1.5fr_1fr_auto]">
            <div className="flex flex-col">
              <label htmlFor="city" className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500">
                City
              </label>
              <input
                id="city"
                type="text"
                placeholder="Enter city"
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="type" className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500">
                Property type
              </label>
              <select
                id="type"
                defaultValue="Flat"
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white"
              >
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              className="h-12 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-extrabold text-blue-600">
            Register your Home
          </Link>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const navContent = (
              <span className="text-sm font-medium text-slate-700 transition-colors hover:text-blue-600">
                {link.label}
              </span>
            )

            if (link.href === '#') {
              return (
                <a key={link.label} href={link.href} className="text-sm font-medium text-slate-700 transition-colors hover:text-blue-600">
                  {link.label}
                </a>
              )
            }

            return (
              <Link key={link.label} to={link.href} className="text-sm font-medium text-slate-700 transition-colors hover:text-blue-600">
                {navContent}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm font-semibold text-slate-700 transition-colors hover:text-blue-600"
          >
            Login
          </Link>
          <Link
            to="/post-property"
            className="rounded-md border border-blue-600 bg-white px-4 py-2 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-50"
          >
            Post Property
          </Link>
          <Link
            to="/signup"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  )
}
