import { ShieldCheck, X } from 'lucide-react'
import { useState } from 'react'

export default function ChatSecurityBanner() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="shrink-0 p-3 pt-0">
      <div className="relative rounded-2xl bg-gradient-to-br from-[#EDE9FE] via-[#F3E8FF] to-[#EEF2FF] border border-[#DDD6FE]/60 px-3.5 py-3">
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full flex items-center justify-center text-[#7C6FA8] hover:bg-white/60 cursor-pointer"
          aria-label="Dismiss security notice"
        >
          <X className="w-3.5 h-3.5" strokeWidth={2} />
        </button>
        <div className="flex items-start gap-3 pr-5">
          <span className="w-9 h-9 rounded-xl bg-white/70 text-[#7C3AED] flex items-center justify-center shrink-0 shadow-sm">
            <ShieldCheck className="w-5 h-5" strokeWidth={1.75} />
          </span>
          <div className="min-w-0">
            <p className="text-[13px] font-bold text-[#4C1D95] leading-snug">Your data is safe</p>
            <p className="text-[11px] text-[#6B5B95] mt-1 leading-relaxed">
              We protect your health information with top-level security.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
