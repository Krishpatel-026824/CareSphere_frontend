import { RotateCcw, Trash2, X } from 'lucide-react'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'

export default function AppointmentRecycleBinModal({
  open,
  onClose,
  recycleBin = [],
  onRestore,
  onPermanentDelete,
  onEmptyAll,
}) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: '14px' } }}>
      <div className="bg-gradient-to-br from-[#FFF5F5] via-white to-[#F0F9FF]">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#E6EBF1]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center">
              <Trash2 className="w-4 h-4" strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-[15px] font-bold text-[#0F172A]">Recycle Bin</h2>
              <p className="text-[11px] text-[#64748B]">{recycleBin.length} deleted appointment{recycleBin.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <IconButton onClick={onClose} size="small">
            <X className="w-4 h-4 text-[#64748B]" />
          </IconButton>
        </div>

        <div className="px-5 py-4 max-h-[420px] overflow-y-auto">
          {recycleBin.length === 0 ? (
            <div className="text-center py-10">
              <Trash2 className="w-10 h-10 text-gray-300 mx-auto mb-3" strokeWidth={1.5} />
              <p className="text-sm text-[#64748B]">Recycle bin is empty</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              {recycleBin.map((appointment) => (
                <article
                  key={appointment.id}
                  className="rounded-xl border border-[#E6EBF1] bg-[#FAFBFC] px-3.5 py-3 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar
                      src={appointment.doctorPhoto}
                      alt={appointment.doctorName}
                      sx={{ width: 38, height: 38 }}
                    />
                    <div className="min-w-0">
                      <h3 className="text-[13px] font-bold text-navy truncate">{appointment.doctorName}</h3>
                      <p className="text-[11px] text-body-gray truncate">
                        {appointment.specialty} • {appointment.dateLabel}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => onRestore?.(appointment.id)}
                      className="h-8 px-2.5 rounded-lg bg-teal-light text-teal text-[12px] font-semibold cursor-pointer hover:bg-teal hover:text-white transition-colors inline-flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" strokeWidth={2} />
                      Recover
                    </button>
                    <button
                      type="button"
                      onClick={() => onPermanentDelete?.(appointment.id)}
                      className="h-8 px-2.5 rounded-lg bg-red-50 text-red-500 text-[12px] font-semibold cursor-pointer hover:bg-red-500 hover:text-white transition-colors inline-flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" strokeWidth={2} />
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {recycleBin.length > 0 ? (
          <div className="px-5 py-3 border-t border-[#E6EBF1] flex justify-end">
            <button
              type="button"
              onClick={onEmptyAll}
              className="h-9 px-4 rounded-lg bg-red-500 text-white text-[12px] font-semibold cursor-pointer hover:bg-red-600 transition-colors inline-flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" strokeWidth={2} />
              Empty recycle bin
            </button>
          </div>
        ) : null}
      </div>
    </Dialog>
  )
}
