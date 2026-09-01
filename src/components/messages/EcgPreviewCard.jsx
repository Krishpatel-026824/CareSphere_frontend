import { Activity } from 'lucide-react'

export default function EcgPreviewCard({ url, name, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="block cursor-pointer text-left w-full min-w-[14rem] max-w-[18rem] rounded-xl bg-white border border-[#E6EBF1] overflow-hidden shadow-sm"
    >
      <div className="px-3 py-2 flex items-center gap-2 border-b border-[#EEF2F6] bg-[#FAFCFD]">
        <Activity className="w-4 h-4 text-teal shrink-0" strokeWidth={2} />
        <span className="text-[13px] font-semibold text-navy">ECG Preview</span>
      </div>
      <img
        src={url}
        alt={name || 'ECG preview'}
        className="block w-full max-h-[140px] object-cover object-center bg-[#F2FBFA]"
      />
    </button>
  )
}
