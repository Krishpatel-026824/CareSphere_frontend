import { CalendarPlus, Check } from 'lucide-react'

export default function LabBookButton({ booked = false, testName, onBook, onRemove }) {
  if (booked) {
    return (
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${testName} from booking`}
        className="h-11 w-[108px] rounded-xl bg-teal-light text-teal text-sm font-semibold cursor-pointer hover:bg-teal/20 inline-flex items-center justify-center gap-1.5 shrink-0"
      >
        <Check className="w-4 h-4" strokeWidth={2} />
        Booked
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={onBook}
      className="h-11 w-[108px] rounded-xl bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal-dark inline-flex items-center justify-center gap-1.5 shadow-sm shrink-0"
    >
      <CalendarPlus className="w-4 h-4" strokeWidth={1.75} />
      Book
    </button>
  )
}
