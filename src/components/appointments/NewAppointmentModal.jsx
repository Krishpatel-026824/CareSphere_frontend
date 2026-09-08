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
import {
  BookingField,
  BookingModalFooter,
  BookingModalHeader,
  bookingDatePickerSx,
  bookingFieldSx,
  bookingModalPaperSx,
  bookingSelectSx,
} from '../shared/bookingFormUi'

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
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: bookingModalPaperSx }}>
      <BookingModalHeader title="New Appointment" onClose={onClose} />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="px-5 sm:px-6 py-5 flex flex-col gap-4 overflow-y-auto flex-1 min-h-0 max-h-[min(68vh,560px)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <BookingField label="Full Name" error={errors.fullName}>
              <TextField
                value={booking.fullName}
                onChange={(e) => onChange({ fullName: e.target.value })}
                placeholder="Enter your full name"
                fullWidth
                size="small"
                sx={bookingFieldSx}
              />
            </BookingField>

            <BookingField label="Mobile Number" error={errors.mobile}>
              <TextField
                value={booking.mobile}
                onChange={(e) => onChange({ mobile: e.target.value })}
                placeholder="+91 98765 43210"
                fullWidth
                size="small"
                sx={bookingFieldSx}
              />
            </BookingField>
          </div>

          <BookingField label="Category" error={errors.category}>
            <Select
              fullWidth
              size="small"
              displayEmpty
              value={booking.category}
              onChange={(e) => onChange({ category: e.target.value, doctorId: '', timeSlot: '' })}
              sx={bookingSelectSx}
              renderValue={(v) => v || <span className="text-[#94A3B8]">Select category</span>}
            >
              {modalCategories.map((item) => (
                <MenuItem key={item} value={item} sx={{ fontSize: '0.875rem' }}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </BookingField>

          <BookingField label="Doctor" error={errors.doctorId}>
            <Select
              fullWidth
              size="small"
              displayEmpty
              value={booking.doctorId}
              onChange={(e) => onChange({ doctorId: e.target.value, timeSlot: '' })}
              disabled={!booking.category}
              sx={bookingSelectSx}
              renderValue={(value) => {
                if (!value) return <span className="text-[#94A3B8]">Select doctor</span>
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
          </BookingField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <BookingField label="Appointment Date" error={errors.appointmentDate}>
              <DatePicker
                value={booking.appointmentDate}
                onChange={(value) => onChange({ appointmentDate: value })}
                format="DD/MM/YYYY"
                minDate={dayjs()}
                slotProps={{
                  textField: {
                    size: 'small',
                    fullWidth: true,
                    placeholder: 'DD/MM/YYYY',
                    sx: bookingFieldSx,
                  },
                }}
                sx={bookingDatePickerSx}
              />
            </BookingField>

            <BookingField label="Time Slot" error={errors.timeSlot}>
              <Select
                fullWidth
                size="small"
                displayEmpty
                value={booking.timeSlot}
                onChange={(e) => onChange({ timeSlot: e.target.value })}
                disabled={!booking.doctorId}
                sx={bookingSelectSx}
                MenuProps={{
                  PaperProps: { sx: { maxHeight: 180 } },
                  anchorOrigin: { vertical: 'top', horizontal: 'left' },
                  transformOrigin: { vertical: 'bottom', horizontal: 'left' },
                }}
                renderValue={(v) => v || <span className="text-[#94A3B8]">Select time slot</span>}
              >
                {availableTimes.map((time) => (
                  <MenuItem key={time} value={time} sx={{ fontSize: '0.875rem' }}>
                    {time}
                  </MenuItem>
                ))}
              </Select>
            </BookingField>
          </div>
        </div>
      </LocalizationProvider>

      <BookingModalFooter onCancel={onClose} onConfirm={onSave} confirmLabel="Book" />
    </Dialog>
  )
}
