import { Link } from 'react-router-dom'
import { SITE } from '../config/site'

export default function GiveCta() {
  return (
    <section className="max-w-6xl mx-auto px-4 mt-4">
      <div className="rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold">Have a property to give on rent or sale?</h2>
          <p className="mt-2 text-orange-50">List it in minutes and reach people looking for a home.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/post-property"
            className="rounded-lg bg-white px-6 py-3 font-semibold text-orange-600 hover:bg-orange-50"
          >
            Give Your Property
          </Link>
          <a
            href={`tel:+91${SITE.phone}`}
            className="rounded-lg border border-white px-6 py-3 font-semibold text-white hover:bg-white/10"
          >
            📞 Call {SITE.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  )
}
