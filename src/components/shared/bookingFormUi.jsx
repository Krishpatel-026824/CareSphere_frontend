import { X } from 'lucide-react'

/** Shared field styles + layout for appointment / lab booking modals */

export const bookingFieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: '#FFFFFF',
    fontSize: '0.9rem',
    minHeight: '46px',
    '& fieldset': { borderColor: '#E2E8F0' },
    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#0EA5A0' },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#0EA5A0',
      borderWidth: '1.5px',
    },
  },
  '& .MuiInputBase-input': {
    padding: '10px 14px',
  },
  '& .MuiInputBase-input::placeholder': {
    color: '#94A3B8',
    opacity: 1,
  },
}

export const bookingSelectSx = {
  borderRadius: '12px',
  backgroundColor: '#FFFFFF',
  fontSize: '0.9rem',
  minHeight: '46px',
  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#E2E8F0' },
  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#0EA5A0' },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#0EA5A0',
    borderWidth: '1.5px',
  },
  '& .MuiSelect-select': {
    padding: '10px 14px',
    display: 'flex',
    alignItems: 'center',
  },
}

export const bookingDatePickerSx = {
  width: '100%',
  ...bookingFieldSx,
}

export const bookingModalPaperSx = {
  borderRadius: '18px',
  overflow: 'hidden',
  maxHeight: '90vh',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 20px 50px rgba(15, 23, 42, 0.12)',
}

export function BookingField({ label, error, children, className = '' }) {
  return (
    <div className={`min-w-0 ${className}`}>
      <label className="text-[13px] font-semibold text-[#334155] mb-1.5 block tracking-tight">
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 text-[12px] font-medium text-rose-500 leading-snug">{error}</p>
      ) : null}
    </div>
  )
}

export function BookingModalHeader({ title, subtitle, onClose }) {
  return (
    <div className="shrink-0">
      <div className="h-1 bg-gradient-to-r from-teal via-[#14B8A6] to-teal-dark" />
      <div className="flex items-start justify-between gap-3 px-5 sm:px-6 pt-4 pb-3.5 border-b border-[#EEF2F6]">
        <div className="min-w-0">
          <h2 className="text-[17px] sm:text-lg font-bold text-[#0F172A] tracking-tight">{title}</h2>
          {subtitle ? (
            <p className="text-[13px] text-[#64748B] mt-0.5 leading-snug">{subtitle}</p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-9 h-9 rounded-xl hover:bg-[#F1F5F9] flex items-center justify-center cursor-pointer transition-colors shrink-0 -mt-0.5"
          aria-label="Close"
        >
          <X className="w-4 h-4 text-[#64748B]" strokeWidth={2} />
        </button>
      </div>
    </div>
  )
}

export function BookingModalFooter({ onCancel, onConfirm, confirmLabel, cancelLabel = 'Cancel' }) {
  return (
    <div className="shrink-0 px-5 sm:px-6 py-4 border-t border-[#EEF2F6] bg-[#FAFBFC] flex items-center gap-3">
      <button
        type="button"
        onClick={onCancel}
        className="flex-1 h-11 rounded-xl border border-[#E2E8F0] bg-white text-[13px] sm:text-sm font-semibold text-[#334155] cursor-pointer hover:bg-[#F8FAFC] hover:border-[#CBD5E1] transition-colors"
      >
        {cancelLabel}
      </button>
      <button
        type="button"
        onClick={onConfirm}
        className="flex-1 h-11 rounded-xl bg-teal text-white text-[13px] sm:text-sm font-semibold cursor-pointer hover:bg-teal-dark shadow-[0_4px_12px_rgba(14,165,160,0.28)] transition-colors"
      >
        {confirmLabel}
      </button>
    </div>
  )
}
