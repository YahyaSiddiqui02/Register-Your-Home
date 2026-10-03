import { SITE, MAPS_LINK, MAPS_EMBED } from '../config/site'

export default function OfficeSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 mt-10">
      <h2 className="text-2xl font-bold mb-4">Visit our office</h2>
      <div className="grid gap-6 md:grid-cols-2 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8 flex flex-col justify-center">
          <p className="text-lg font-semibold">📍 {SITE.name}</p>
          <p className="mt-2 text-gray-600">{SITE.office}</p>
          <p className="mt-4">
            <a href={`tel:+91${SITE.phone}`} className="font-medium text-blue-600 hover:underline">
              📞 {SITE.phoneDisplay}
            </a>
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
            >
              Get directions
            </a>
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-green-600 px-5 py-2 font-medium text-green-700 hover:bg-green-50"
            >
              WhatsApp us
            </a>
          </div>
        </div>
        <iframe
          title="Office location"
          src={MAPS_EMBED}
          className="w-full h-64 md:h-full min-h-64 border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  )
}
