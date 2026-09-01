import PrescriptionNotePaper from './PrescriptionNotePaper'

export default function DoctorPatientPrescriptionNoteCard({ note, onOpen }) {
  if (!note) return null

  return (
    <button
      type="button"
      onClick={() => onOpen?.(note)}
      className="w-full text-left cursor-pointer group rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/40"
    >
      <PrescriptionNotePaper
        note={note}
        compact
        className="shadow-sm group-hover:border-teal/30 group-hover:shadow transition-all"
      />
    </button>
  )
}
