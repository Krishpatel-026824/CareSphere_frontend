import { getClinicMapEmbedUrl, getClinicMapsUrl } from '../../utils/clinicMapUrl'

export default function ClinicMapPreview({ appointment }) {
  const embedUrl = getClinicMapEmbedUrl(appointment)
  if (!embedUrl) return null

  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <div className="relative w-full flex-1 min-h-[132px] rounded-md overflow-hidden border border-[#D7DEE7] bg-[#EEF2F6]">
        <iframe
          title={`Map for ${appointment.fullAddress}`}
          src={embedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
      <a
        href={getClinicMapsUrl(appointment)}
        target="_blank"
        rel="noreferrer"
        className="self-end text-[11px] font-semibold text-teal hover:underline mt-2"
      >
        Open in Maps
      </a>
    </div>
  )
}
