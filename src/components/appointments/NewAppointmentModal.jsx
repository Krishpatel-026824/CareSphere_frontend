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

const muiFieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '0.75rem',
    backgroundColor: '#FFFFFF',
  },
  '& .MuiInputLabel-root': {
    fontSize: '0.875rem',
  },
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

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <div className="w-full rounded-2xl border border-[#E6EBF1] bg-white overflow-hidden">
        <div className="px-4 sm:px-5 py-3.5 border-b border-[#E6EBF1] flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-navy">New appointment</h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-[#F3F4F6] flex items-center justify-center cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 text-navy" strokeWidth={1.8} />
          </button>
        </div>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="px-4 sm:px-5 py-4 flex flex-col gap-3 max-h-[70vh] overflow-y-auto">
            <Field label="Full Name" error={errors.fullName}>
              <TextField
                value={booking.fullName}
                onChange={(event) => onChange({ fullName: event.target.value })}
                placeholder="Enter full name"
                fullWidth
                size="small"
                sx={muiFieldSx}
              />
            </Field>

            <Field label="Mobile Number" error={errors.mobile}>
              <TextField
                value={booking.mobile}
                onChange={(event) => onChange({ mobile: event.target.value })}
                placeholder="+91 98765 43210"
                fullWidth
                size="small"
                sx={muiFieldSx}
              />
            </Field>

            <Field label="Category" error={errors.category}>
              <Select
                fullWidth
                size="small"
                displayEmpty
                value={booking.category}
                onChange={(event) => onChange({ category: event.target.value, doctorId: '', timeSlot: '' })}
                sx={{ ...muiFieldSx['& .MuiOutlinedInput-root'], borderRadius: '0.75rem' }}
                renderValue={(value) => value || <span style={{ color: '#9CA3AF' }}>Select category</span>}
              >
                {modalCategories.map((item) => (
                  <MenuItem key={item} value={item}>
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
                onChange={(event) => onChange({ doctorId: event.target.value, timeSlot: '' })}
                disabled={!booking.category}
                sx={{ ...muiFieldSx['& .MuiOutlinedInput-root'], borderRadius: '0.75rem' }}
                renderValue={(value) => {
                  if (!value) return <span style={{ color: '#9CA3AF' }}>Select doctor</span>
                  const doctor = doctors.find((item) => item.id === value)
                  if (!doctor) return ''
                  return (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar src={doctor.avatar} alt={doctor.name} sx={{ width: 24, height: 24 }} />
                      <span>{doctor.name} • {doctor.hospital}</span>
                    </Box>
                  )
                }}
              >
                {doctorsByCategory.map((doctor) => (
                  <MenuItem key={doctor.id} value={doctor.id} sx={{ py: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                      <Avatar src={doctor.avatar} alt={doctor.name} sx={{ width: 30, height: 30 }} />
                      <Box>
                        <Box sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#0F172A' }}>{doctor.name}</Box>
                        <Box sx={{ fontSize: '0.75rem', color: '#64748B' }}>{doctor.hospital}</Box>
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
                slotProps={{ textField: { size: 'small', fullWidth: true } }}
                sx={muiFieldSx}
              />
            </Field>

            <Field label="Time Slot" error={errors.timeSlot}>
              <Select
                fullWidth
                size="small"
                displayEmpty
                value={booking.timeSlot}
                onChange={(event) => onChange({ timeSlot: event.target.value })}
                disabled={!booking.doctorId}
                sx={{ ...muiFieldSx['& .MuiOutlinedInput-root'], borderRadius: '0.75rem' }}
                renderValue={(value) => value || <span style={{ color: '#9CA3AF' }}>Select time slot</span>}
              >
                {availableTimes.map((time) => (
                  <MenuItem key={time} value={time}>
                    {time}
                  </MenuItem>
                ))}
              </Select>
            </Field>
          </div>
        </LocalizationProvider>

        <div className="px-4 sm:px-5 py-3.5 border-t border-[#E6EBF1] flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="min-h-10 px-4 rounded-xl border border-[#1E293B] text-sm font-semibold text-[#1E293B] cursor-pointer hover:bg-[#F3F4F6]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            className="min-h-10 px-4 rounded-xl bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal-dark"
          >
            Save
          </button>
        </div>
      </div>
    </Dialog>
  )
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-body-gray">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error ? <p className="text-[11px] text-rose-600 mt-1">{error}</p> : null}
    </label>
  )
}
