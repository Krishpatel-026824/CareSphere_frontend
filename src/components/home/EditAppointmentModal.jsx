import { useState, useEffect, useMemo } from 'react'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Building2, CalendarDays, Clock, MapPin, X } from 'lucide-react'

dayjs.extend(customParseFormat)

const timeSlots = [
  '09:00 - 10:00 AM', '10:00 - 11:00 AM', '11:00 - 12:00 PM',
  '12:00 - 01:00 PM', '01:00 - 02:00 PM', '02:00 - 03:00 PM',
  '03:00 - 04:00 PM', '04:00 - 05:00 PM', '05:00 - 06:00 PM',
]

const selectSx = {
  borderRadius: '10px',
  backgroundColor: '#F9FAFB',
  fontSize: '0.925rem',
  minHeight: '44px',
  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#0EA5A0' },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#0EA5A0', borderWidth: '1.5px' },
}

const datePickerSx = {
  width: '100%',
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    backgroundColor: '#F9FAFB',
    fontSize: '0.925rem',
    minHeight: '44px',
    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#0EA5A0' },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#0EA5A0', borderWidth: '1.5px' },
  },
}

export default function EditAppointmentModal({ open, onClose, appointment, onSave }) {
  const [date, setDate] = useState(null)
  const [time, setTime] = useState('')

  useEffect(() => {
    if (!appointment || !open) return
    setDate(parseDateLabel(appointment.dateLabel))
    setTime(normalizeTimeSlot(appointment.timeLabel))
  }, [appointment, open])

  const hasChanges = useMemo(() => {
    if (!appointment) return false
    const originalDate = parseDateLabel(appointment.dateLabel)
    const originalTime = normalizeTimeSlot(appointment.timeLabel)
    const dateChanged = date && originalDate ? !date.isSame(originalDate, 'day') : false
    return dateChanged || time !== originalTime
  }, [appointment, date, time])

  if (!appointment) return null

  const clinic = appointment.clinic || appointment.hospital || ''
  const location = appointment.location || ''
  const placeLine = [clinic, location].filter(Boolean).join(', ')
  const datePreview = date ? date.format('ddd, D MMM YYYY') : 'Pick a date'
  const timePreview = time || 'Pick a time slot'

  const handleSave = () => {
    if (!date || !time) return
    onSave({
      ...appointment,
      dateLabel: date.format('D MMM YYYY'),
      timeLabel: time,
      visitType: appointment.visitType || 'In-clinic',
    })
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: '16px' } }}>
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#EEF2F6]">
        <div>
          <h2 className="text-lg font-bold text-[#0F172A]">Reschedule visit</h2>
          <p className="text-[13px] text-[#64748B] mt-0.5">Change date or time for your in-clinic appointment</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-8 h-8 rounded-full hover:bg-[#F1F5F9] flex items-center justify-center cursor-pointer transition-colors shrink-0"
        >
          <X className="w-4 h-4 text-[#64748B]" strokeWidth={2} />
        </button>
      </div>

      <div className="px-6 py-5 flex flex-col gap-5">
        <div className="rounded-2xl border border-[#E2E8F0] overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-teal to-[#0EA5A0]" />
          <div className="p-4 flex items-start gap-3.5">
            <Avatar
              src={appointment.doctorPhoto || appointment.photo}
              alt={appointment.doctorName}
              sx={{ width: 52, height: 52, borderRadius: '14px' }}
            />
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-bold text-[#0F172A] leading-tight truncate">{appointment.doctorName}</p>
              <p className="text-[13px] text-[#64748B] mt-0.5 truncate">{appointment.specialty}</p>
              {placeLine ? (
                <p className="text-[12px] text-[#64748B] mt-2 inline-flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-teal shrink-0 mt-0.5" strokeWidth={2} />
                  <span>{placeLine}</span>
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-[#F0FDFA] border border-[#CCFBF1] p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-teal mb-3">New schedule</p>
          <div className="grid grid-cols-2 gap-3">
            <PreviewChip icon={CalendarDays} label="Date" value={datePreview} />
            <PreviewChip icon={Clock} label="Time" value={timePreview} />
          </div>
        </div>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="flex flex-col gap-4">
            <Field label="Appointment date">
              <DatePicker
                value={date}
                onChange={setDate}
                format="DD/MM/YYYY"
                minDate={dayjs()}
                slotProps={{
                  textField: {
                    size: 'small',
                    fullWidth: true,
                    placeholder: 'DD/MM/YYYY',
                  },
                }}
                sx={datePickerSx}
              />
            </Field>

            <Field label="Time slot">
              <Select
                fullWidth
                size="small"
                displayEmpty
                value={time}
                onChange={(e) => setTime(e.target.value)}
                sx={selectSx}
                MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
                renderValue={(v) => v || <span className="text-[#9CA3AF]">Select time slot</span>}
              >
                {timeSlots.map((slot) => (
                  <MenuItem key={slot} value={slot} sx={{ fontSize: '0.875rem' }}>
                    {slot}
                  </MenuItem>
                ))}
              </Select>
            </Field>
          </div>
        </LocalizationProvider>

        <div className="flex items-start gap-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] px-3.5 py-3">
          <Building2 className="w-4 h-4 text-[#64748B] shrink-0 mt-0.5" strokeWidth={2} />
          <p className="text-[12px] text-[#64748B] leading-relaxed">
            This is an in-clinic visit. Please arrive 10–15 minutes early at the clinic shown above.
          </p>
        </div>
      </div>

      <div className="px-6 py-4 border-t border-[#EEF2F6] flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="h-11 px-6 rounded-xl border border-[#CBD5E1] text-sm font-semibold text-[#334155] cursor-pointer hover:bg-[#F1F5F9] transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={!hasChanges || !date || !time}
          className="h-11 px-6 rounded-xl bg-[#0EA5A0] text-white text-sm font-semibold cursor-pointer hover:bg-[#0D9490] transition-colors shadow-sm disabled:opacity-45 disabled:cursor-not-allowed"
        >
          Save changes
        </button>
      </div>
    </Dialog>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <label className="text-sm font-semibold text-[#1E293B] mb-2 block">{label}</label>
      {children}
    </div>
  )
}

function PreviewChip({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl bg-white border border-[#CCFBF1] px-3 py-2.5">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-[#64748B] mb-1">{label}</p>
      <p className="text-[13px] font-semibold text-[#0F172A] inline-flex items-center gap-1.5">
        <Icon className="w-3.5 h-3.5 text-teal shrink-0" strokeWidth={2} />
        <span className="truncate">{value}</span>
      </p>
    </div>
  )
}

function parseDateLabel(dateLabel) {
  if (!dateLabel) return null
  const parsed = dayjs(dateLabel, 'D MMM YYYY', true)
  return parsed.isValid() ? parsed : null
}

function normalizeTimeSlot(timeLabel) {
  if (!timeLabel) return ''
  if (timeSlots.includes(timeLabel)) return timeLabel
  const match = timeLabel.match(/(\d{1,2}:\d{2}\s*(?:AM|PM))/i)
  if (!match) return timeLabel
  const target = match[1].toUpperCase()
  return timeSlots.find((slot) => slot.includes(target)) || timeLabel
}
