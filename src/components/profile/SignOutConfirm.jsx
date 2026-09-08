import { LogOut, X } from 'lucide-react'

export default function SignOutConfirm({ open, onCancel, onConfirm }) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071A2F]/45 backdrop-blur-[2px]"
      onClick={onCancel}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="sign-out-title"
        aria-describedby="sign-out-desc"
        className="w-full max-w-[360px] rounded-[20px] bg-white shadow-[0_24px_60px_rgba(7,26,47,0.22)] border border-[#E6EBF1] overflow-hidden"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative px-5 pt-5 pb-4 bg-gradient-to-b from-[#F0FDFA] to-white border-b border-[#EEF2F6]">
          <button
            type="button"
            onClick={onCancel}
            aria-label="Close"
            className="absolute top-3.5 right-3.5 w-8 h-8 rounded-xl flex items-center justify-center cursor-pointer text-[#64748B] hover:bg-white hover:text-navy transition-colors"
          >
            <X className="w-4 h-4" strokeWidth={2} />
          </button>

          <div className="flex flex-col items-center text-center pt-1">
            <span className="w-14 h-14 rounded-2xl bg-white border border-[#D8F4F1] shadow-[0_6px_16px_rgba(14,165,160,0.12)] text-teal flex items-center justify-center">
              <LogOut className="w-6 h-6" strokeWidth={1.85} />
            </span>
            <h2 id="sign-out-title" className="mt-4 text-[18px] font-bold text-navy tracking-tight">
              Sign out of CareSphere?
            </h2>
            <p id="sign-out-desc" className="mt-2 text-[13px] text-body-gray leading-relaxed max-w-[280px]">
              You’ll need to sign in again to reach your account, messages, and appointments.
            </p>
          </div>
        </div>

        <div className="px-5 py-4 flex flex-col gap-2.5 bg-[#FAFBFC]">
          <button
            type="button"
            onClick={onConfirm}
            className="w-full min-h-11 rounded-xl bg-navy text-white text-sm font-semibold cursor-pointer hover:bg-navy-light transition-colors shadow-[0_4px_12px_rgba(7,26,47,0.18)]"
          >
            Yes, sign out
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="w-full min-h-11 rounded-xl border border-[#E2E8F0] bg-white text-sm font-semibold text-navy cursor-pointer hover:bg-white hover:border-teal/30 transition-colors"
          >
            Stay signed in
          </button>
        </div>
      </div>
    </div>
  )
}
