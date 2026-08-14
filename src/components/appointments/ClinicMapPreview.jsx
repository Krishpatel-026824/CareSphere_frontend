import { getClinicMapEmbedUrl, getClinicMapsUrl } from '../../utils/clinicMapUrl'

export default function ClinicMapPreview({ appointment }) {
  const embedUrl = getClinicMapEmbedUrl(appointment)
  if (!embedUrl) return null

  return (
    <div className="flex h-full min-h-[160px] sm:min-h-[180px] flex-col gap-1.5">
      <div className="relative w-full flex-1 min-h-[140px] rounded-xl overflow-hidden border border-border-gray bg-[#EEF2F6]">
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
        className="self-end text-[11px] font-semibold text-teal hover:underline"
      >
        Open in Maps
      </a>
    </div>
  )
}
