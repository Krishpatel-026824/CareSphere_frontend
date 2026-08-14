import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { labTestsFooterContentMock } from '../../data/mocks/labTests'

export default function LabTestsFooterPanel({ activeLink }) {
  if (!activeLink) return null

  const content = labTestsFooterContentMock[activeLink]
  if (!content) return null

  if (activeLink === 'About') {
    return (
      <section className="mt-5 rounded-2xl border border-border-gray bg-bg-gray/40 p-4 sm:p-5">
        <h3 className="text-sm font-bold text-navy">{content.title}</h3>
        <p className="text-sm text-body-gray mt-2 leading-relaxed">{content.description}</p>
        <ul className="mt-3 flex flex-col gap-2">
          {content.highlights.map((item) => (
            <li key={item} className="text-sm text-body-gray flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </section>
    )
  }

  if (activeLink === 'Contact') {
    return (
      <section className="mt-5 rounded-2xl border border-border-gray bg-bg-gray/40 p-4 sm:p-5">
        <h3 className="text-sm font-bold text-navy">{content.title}</h3>
        <ul className="mt-3 flex flex-col gap-3 text-sm text-body-gray">
          <li className="flex items-center gap-2.5">
            <Phone className="w-4 h-4 text-teal shrink-0" strokeWidth={1.75} />
            <a href={`tel:${content.phone.replace(/\s/g, '')}`} className="hover:text-navy">
              {content.phone}
            </a>
          </li>
          <li className="flex items-center gap-2.5">
            <Mail className="w-4 h-4 text-teal shrink-0" strokeWidth={1.75} />
            <a href={`mailto:${content.email}`} className="hover:text-navy">
              {content.email}
            </a>
          </li>
          <li className="flex items-center gap-2.5">
            <MessageCircle className="w-4 h-4 text-teal shrink-0" strokeWidth={1.75} />
            <span>WhatsApp: {content.whatsapp}</span>
          </li>
          <li className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-teal shrink-0" strokeWidth={1.75} />
            <span>{content.hours}</span>
          </li>
          <li className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-teal shrink-0 mt-0.5" strokeWidth={1.75} />
            <span>{content.address}</span>
          </li>
        </ul>
      </section>
    )
  }

  return (
    <section className="mt-5 rounded-2xl border border-border-gray bg-bg-gray/40 p-4 sm:p-5">
      <h3 className="text-sm font-bold text-navy">{content.title}</h3>
      <div className="mt-3 flex flex-col gap-3">
        {content.items.map((item) => (
          <article key={item.question} className="rounded-xl bg-white border border-border-gray p-3.5">
            <h4 className="text-sm font-semibold text-navy">{item.question}</h4>
            <p className="text-sm text-body-gray mt-1.5 leading-relaxed">{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
