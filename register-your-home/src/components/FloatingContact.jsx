import { SITE } from '../config/site'

export default function FloatingContact() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
      <a
        href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('Hi, I am interested in a property on Register your Home.')}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex items-center gap-2 rounded-full bg-green-500 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-green-600"
      >
        <span>💬</span>
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
      <a
        href={`tel:+91${SITE.phone}`}
        aria-label="Call us"
        className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-blue-700"
      >
        <span>📞</span>
        <span className="hidden sm:inline">Call us</span>
      </a>
    </div>
  )
}
