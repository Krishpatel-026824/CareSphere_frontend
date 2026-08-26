import Dialog from '@mui/material/Dialog'
import DoctorScheduleSummary from './DoctorScheduleSummary'

export default function DoctorScheduleVisitModal({
  open,
  visit,
  canAccept,
  canDecline,
  canComplete,
  onAccept,
  onDecline,
  onComplete,
  onClose,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: '20px',
          overflow: 'hidden',
          maxHeight: '90vh',
        },
      }}
    >
      {visit ? (
        <DoctorScheduleSummary
          visit={visit}
          canAccept={canAccept}
          canDecline={canDecline}
          canComplete={canComplete}
          onAccept={onAccept}
          onDecline={onDecline}
          onComplete={onComplete}
          onClose={onClose}
          asModal
        />
      ) : null}
    </Dialog>
  )
}
