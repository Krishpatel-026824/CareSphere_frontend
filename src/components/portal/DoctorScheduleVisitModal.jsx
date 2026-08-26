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
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: '20px',
          overflow: 'hidden',
          width: '100%',
          maxWidth: 720,
          maxHeight: '92vh',
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
