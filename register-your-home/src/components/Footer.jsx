import { Link } from 'react-router-dom'
import { SITE, MAPS_LINK } from '../config/site'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 sm:grid-cols-3">
        <div>
          <h3 className="text-white text-lg font-bold">{SITE.name}</h3>
          <p className="mt-2 text-sm">Rent, buy, sell, or give your property in a few simple steps.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Quick links</h4>
          <ul className="space-y-1 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/?listing=Rent" className="hover:text-white">Rent</Link></li>
            <li><Link to="/?listing=Sale" className="hover:text-white">Buy</Link></li>
            <li><Link to="/post-property" className="hover:text-white">Give / Post your property</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={`tel:+91${SITE.phone}`} className="hover:text-white">📞 {SITE.phoneDisplay}</a>
            </li>
            <li>
              <a href={SITE.url} target="_blank" rel="noreferrer" className="hover:text-white">🌐 {SITE.domain}</a>
            </li>
            <li>
              <a href={MAPS_LINK} target="_blank" rel="noreferrer" className="hover:text-white">📍 {SITE.office}</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} {SITE.name}. All rights reserved.
      </div>
    </footer>
  )
}
