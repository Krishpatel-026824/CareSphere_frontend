import dayjs from 'dayjs'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { X } from 'lucide-react'

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    backgroundColor: '#F9FAFB',
    fontSize: '0.925rem',
    minHeight: '44px',
    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#0EA5A0' },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#0EA5A0', borderWidth: '1.5px' },
  },
}

const selectSx = {
  borderRadius: '10px',
  backgroundColor: '#F9FAFB',
  fontSize: '0.925rem',
  minHeight: '44px',
  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#0EA5A0' },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#0EA5A0', borderWidth: '1.5px' },
}

export default function NewAppointmentModal({
  open,
  onClose,
  booking,
  errors,
  modalCategories,
  doctorsByCategory,
  doctors,
  availableTimes,
  onChange,
  onSave,
}) {
  if (!open) return null

  const selectedDoctor = doctors.find((d) => d.id === booking.doctorId)

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: '16px' } }}>
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#EEF2F6]">
        <h2 className="text-lg font-bold text-[#0F172A]">New Appointment</h2>
        <button
          type="button"
          onClick={onClose}
          className="w-8 h-8 rounded-full hover:bg-[#F1F5F9] flex items-center justify-center cursor-pointer transition-colors"
        >
          <X className="w-4 h-4 text-[#64748B]" strokeWidth={2} />
        </button>
      </div>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="px-6 py-6 flex flex-col gap-5 max-h-[74vh] overflow-y-auto">
          <Field label="Full Name" error={errors.fullName}>
            <TextField
              value={booking.fullName}
              onChange={(e) => onChange({ fullName: e.target.value })}
              placeholder="Enter your full name"
              fullWidth
              size="small"
              sx={fieldSx}
            />
          </Field>

          <Field label="Mobile Number" error={errors.mobile}>
            <TextField
              value={booking.mobile}
              onChange={(e) => onChange({ mobile: e.target.value })}
              placeholder="+91 98765 43210"
              fullWidth
              size="small"
              sx={fieldSx}
            />
          </Field>

          <Field label="Category" error={errors.category}>
            <Select
              fullWidth
              size="small"
              displayEmpty
              value={booking.category}
              onChange={(e) => onChange({ category: e.target.value, doctorId: '', timeSlot: '' })}
              sx={selectSx}
              renderValue={(v) => v || <span className="text-[#9CA3AF]">Select category</span>}
            >
              {modalCategories.map((item) => (
                <MenuItem key={item} value={item} sx={{ fontSize: '0.875rem' }}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </Field>

          <Field label="Doctor" error={errors.doctorId}>
            <Select
              fullWidth
              size="small"
              displayEmpty
              value={booking.doctorId}
              onChange={(e) => onChange({ doctorId: e.target.value, timeSlot: '' })}
              disabled={!booking.category}
              sx={selectSx}
              renderValue={(value) => {
                if (!value) return <span className="text-[#9CA3AF]">Select doctor</span>
                if (!selectedDoctor) return ''
                return (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar src={selectedDoctor.avatar} sx={{ width: 22, height: 22 }} />
                    <span className="text-[0.875rem] font-medium text-[#0F172A]">
                      {selectedDoctor.name}
                    </span>
                    <span className="text-[0.75rem] text-[#64748B]">• {selectedDoctor.hospital}</span>
                  </Box>
                )
              }}
            >
              {doctorsByCategory.map((doctor) => (
                <MenuItem key={doctor.id} value={doctor.id} sx={{ py: 1.2, px: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                    <Avatar src={doctor.avatar} alt={doctor.name} sx={{ width: 32, height: 32 }} />
                    <Box>
                      <Box sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#0F172A', lineHeight: 1.3 }}>
                        {doctor.name}
                      </Box>
                      <Box sx={{ fontSize: '0.72rem', color: '#64748B', lineHeight: 1.3 }}>
                        {doctor.hospital} • ₹{doctor.fee}
                      </Box>
                    </Box>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </Field>

          <Field label="Appointment Date" error={errors.appointmentDate}>
            <DatePicker
              value={booking.appointmentDate}
              onChange={(value) => onChange({ appointmentDate: value })}
              minDate={dayjs()}
              slotProps={{ textField: { size: 'small', fullWidth: true, placeholder: 'Select date' } }}
              sx={fieldSx}
            />
          </Field>

          <Field label="Time Slot" error={errors.timeSlot}>
            <Select
              fullWidth
              size="small"
              displayEmpty
              value={booking.timeSlot}
              onChange={(e) => onChange({ timeSlot: e.target.value })}
              disabled={!booking.doctorId}
              sx={selectSx}
              MenuProps={{ PaperProps: { sx: { maxHeight: 180 } }, anchorOrigin: { vertical: 'top', horizontal: 'left' }, transformOrigin: { vertical: 'bottom', horizontal: 'left' } }}
              renderValue={(v) => v || <span className="text-[#9CA3AF]">Select time slot</span>}
            >
              {availableTimes.map((time) => (
                <MenuItem key={time} value={time} sx={{ fontSize: '0.875rem' }}>
                  {time}
                </MenuItem>
              ))}
            </Select>
          </Field>
        </div>
      </LocalizationProvider>

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
          onClick={onSave}
          className="h-11 px-6 rounded-xl bg-[#0EA5A0] text-white text-sm font-semibold cursor-pointer hover:bg-[#0D9490] transition-colors shadow-sm"
        >
          Save
        </button>
      </div>
    </Dialog>
  )
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="text-sm font-semibold text-[#1E293B] mb-2 block">{label}</label>
      {children}
      {error ? <p className="text-xs text-rose-500 mt-1.5 font-medium">{error}</p> : null}
    </div>
  )
}
