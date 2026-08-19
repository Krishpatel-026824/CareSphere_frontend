import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Dialog, DialogContent, TextField, Select, MenuItem } from '@mui/material'

const timeSlots = [
  '09:00 - 10:00 AM', '10:00 - 11:00 AM', '11:00 - 12:00 PM',
  '12:00 - 01:00 PM', '01:00 - 02:00 PM', '02:00 - 03:00 PM',
  '03:00 - 04:00 PM', '04:00 - 05:00 PM', '05:00 - 06:00 PM',
]

export default function EditAppointmentModal({ open, onClose, appointment, onSave }) {
  const [form, setForm] = useState({ date: '', time: '', visitType: '' })

  useEffect(() => {
    if (appointment) {
      setForm({
        date: appointment.dateLabel || '',
        time: appointment.timeLabel || '',
        visitType: appointment.visitType || 'In-clinic',
      })
    }
  }, [appointment, open])

  if (!appointment) return null

  const handleSave = () => {
    onSave({
      ...appointment,
      dateLabel: form.date,
      timeLabel: form.time,
      visitType: form.visitType,
    })
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent sx={{ p: 0, position: 'relative' }}>
        <button onClick={onClose} className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-gray-100 cursor-pointer z-10">
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="p-5">
          <h2 className="text-lg font-bold text-navy mb-1">Edit Appointment</h2>
          <p className="text-[13px] text-gray-500 mb-5">Update your appointment details</p>

          <div className="flex items-center gap-3 mb-5 p-3 rounded-xl bg-gray-50">
            {appointment.doctorPhoto && (
              <img src={appointment.doctorPhoto} alt="" className="w-11 h-11 rounded-xl object-cover" />
            )}
            <div>
              <p className="text-[14px] font-bold text-navy">{appointment.doctorName}</p>
              <p className="text-[12px] text-gray-500">{appointment.specialty} • {appointment.clinic}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <TextField
              label="Date"
              type="date"
              value={formatDateForInput(form.date)}
              onChange={(e) => setForm((f) => ({ ...f, date: formatDateForDisplay(e.target.value) }))}
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />

            <div>
              <p className="text-[12px] font-medium text-gray-500 mb-1.5">Time Slot</p>
              <Select
                value={form.time}
                onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
                size="small"
                fullWidth
                displayEmpty
              >
                {timeSlots.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
              </Select>
            </div>

            <div>
              <p className="text-[12px] font-medium text-gray-500 mb-1.5">Visit Type</p>
              <Select
                value={form.visitType}
                onChange={(e) => setForm((f) => ({ ...f, visitType: e.target.value }))}
                size="small"
                fullWidth
              >
                <MenuItem value="In-clinic">In-clinic</MenuItem>
                <MenuItem value="Video call">Video call</MenuItem>
              </Select>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-11 rounded-xl border border-gray-200 text-navy text-sm font-semibold cursor-pointer hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 h-11 rounded-xl bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal/90"
            >
              Save Changes
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function formatDateForInput(dateLabel) {
  if (!dateLabel) return ''
  const parts = dateLabel.match(/(\d{1,2})\s+(\w+)\s+(\d{4})/)
  if (!parts) return ''
  const months = { Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06', Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12' }
  const m = months[parts[2]] || '01'
  return `${parts[3]}-${m}-${parts[1].padStart(2, '0')}`
}

function formatDateForDisplay(isoDate) {
  if (!isoDate) return ''
  const d = new Date(isoDate + 'T00:00:00')
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
}
