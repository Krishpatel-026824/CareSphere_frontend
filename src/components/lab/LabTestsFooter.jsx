import { BadgeCheck } from 'lucide-react'
import LabTestsFooterPanel from './LabTestsFooterPanel'
import { labTestsFooterMock } from '../../data/mocks/labTests'

export default function LabTestsFooter({ activeLink = null, onLinkClick }) {
  function handleLinkClick(link) {
    onLinkClick?.(activeLink === link ? null : link)
  }

  return (
    <footer className="pt-5 mt-2 border-t border-border-gray">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-6 text-sm text-body-gray">
            {labTestsFooterMock.links.map((link) => (
              <button
                key={link}
                type="button"
                onClick={() => handleLinkClick(link)}
                className={`cursor-pointer hover:text-navy ${
                  activeLink === link ? 'text-navy font-semibold' : ''
                }`}
              >
                {link}
              </button>
            ))}
          </div>
          <p className="text-xs text-body-gray/70 mt-3">{labTestsFooterMock.copyright}</p>
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full border border-border-gray bg-white px-3 py-1.5 text-xs font-medium text-body-gray shrink-0">
          <BadgeCheck className="w-3.5 h-3.5 text-body-gray" strokeWidth={1.75} />
          Verified
        </span>
      </div>

      <LabTestsFooterPanel activeLink={activeLink} />
    </footer>
  )
}
