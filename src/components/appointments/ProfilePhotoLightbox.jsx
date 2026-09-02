import { X } from 'lucide-react'
import { getProfilePhotoPreviewUrl } from '../../utils/profilePhotoUrl'

export default function ProfilePhotoLightbox({ open, src, alt, onClose }) {
  if (!open || !src) return null

  const previewSrc = getProfilePhotoPreviewUrl(src)

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${alt} photo preview`}
    >
      <button
        type="button"
        className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-white/20 flex items-center justify-center cursor-pointer hover:bg-white/40"
        onClick={onClose}
        aria-label="Close photo"
      >
        <X className="w-5 h-5 text-white" />
      </button>

      <div
        className="relative inline-flex max-w-[min(92vw,400px)] max-h-[85dvh] items-center justify-center"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={previewSrc}
          alt={alt}
          className="block max-w-full max-h-[85dvh] w-auto h-auto object-contain rounded-2xl shadow-2xl ring-1 ring-white/10 bg-black/25"
          decoding="async"
        />
      </div>
    </div>
  )
}
