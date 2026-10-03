import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { inputCls } from '../utils/ui'
import { BUDGETS } from '../utils/budget'

const TABS = ['Buy', 'Rent', 'Sell']
const TYPES = ['All', 'Flat', 'House', 'Plot', 'PG', 'Shop']

export default function Hero() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('Buy')
  const [city, setCity] = useState('')
  const [type, setType] = useState('All')
  const [budgetIdx, setBudgetIdx] = useState(0)

  const listing = tab === 'Buy' ? 'Sale' : 'Rent'
  const presets = tab === 'Sell' ? [] : BUDGETS[listing]

  const changeTab = (t) => {
    setTab(t)
    setBudgetIdx(0)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (tab === 'Sell') {
      navigate('/post-property')
      return
    }
    const params = new URLSearchParams()
    params.set('listing', listing)
    if (city.trim()) params.set('city', city.trim())
    if (type !== 'All') params.set('type', type)
    const b = presets[budgetIdx]
    if (b && b.min !== '') params.set('minPrice', b.min)
    if (b && b.max !== '') params.set('maxPrice', b.max)
    navigate(`/?${params.toString()}`)
  }

  return (
    <section className="bg-gradient-to-br from-blue-700 to-blue-500 px-4 py-16 sm:py-24">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Find, Rent, Buy or Sell Your Home
        </h1>
        <p className="mt-4 text-blue-100 text-lg">
          Search by your budget, or give your property on rent or sale in minutes
        </p>

        <form onSubmit={handleSearch} className="mt-10 bg-white rounded-2xl shadow-xl p-4 sm:p-6 text-left">
          <div className="flex gap-2 mb-4">
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => changeTab(t)}
                className={`px-5 py-2 rounded-lg font-medium ${
                  tab === t ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              className={inputCls}
              placeholder="Enter city or locality"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={tab === 'Sell'}
            />
            <select
              className={`${inputCls} md:w-44`}
              value={type}
              onChange={(e) => setType(e.target.value)}
              disabled={tab === 'Sell'}
            >
              {TYPES.map((t) => (
                <option key={t} value={t}>
                  {t === 'All' ? 'All types' : t}
                </option>
              ))}
            </select>
            <select
              className={`${inputCls} md:w-56`}
              value={budgetIdx}
              onChange={(e) => setBudgetIdx(Number(e.target.value))}
              disabled={tab === 'Sell'}
            >
              {tab === 'Sell' ? (
                <option>Budget</option>
              ) : (
                presets.map((b, i) => (
                  <option key={b.label} value={i}>
                    {b.label}
                  </option>
                ))
              )}
            </select>
            <button type="submit" className="rounded-lg bg-blue-600 px-8 py-2 font-semibold text-white hover:bg-blue-700">
              {tab === 'Sell' ? 'Give Property' : 'Search'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
