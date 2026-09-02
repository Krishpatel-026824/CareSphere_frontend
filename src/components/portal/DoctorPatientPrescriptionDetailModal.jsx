import { X } from 'lucide-react'
import Dialog from '@mui/material/Dialog'
import PrescriptionNotePaper from './PrescriptionNotePaper'

export default function DoctorPatientPrescriptionDetailModal({ open, note, onClose }) {
  if (!note) return null

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { borderRadius: '16px', overflow: 'hidden', maxWidth: 640 } }}
    >
      <div className="max-h-[85dvh] flex flex-col bg-[#F4FAF9]">
        <div className="shrink-0 h-1 bg-gradient-to-r from-teal via-[#14B8A6] to-teal-dark" />
        <div className="shrink-0 px-4 sm:px-5 py-3 border-b border-teal/15 bg-gradient-to-b from-[#E8F7F6] to-white flex items-center justify-between gap-3">
          <p className="text-sm font-bold text-teal-dark">Prescription form</p>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-teal-light/60 cursor-pointer shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-teal-dark" />
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto scroll-y p-3 sm:p-4 bg-[#F0F7F6]">
          <PrescriptionNotePaper note={note} />
        </div>
      </div>
    </Dialog>
  )
}
