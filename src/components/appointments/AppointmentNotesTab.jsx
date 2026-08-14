import { Lock, NotebookPen, Plus } from 'lucide-react'
import { generateAppointmentNotes } from '../../data/generators/appointmentNotesGenerator'

export default function AppointmentNotesTab({ appointment, notes, onNotesChange }) {
  const view = generateAppointmentNotes(appointment)
  const count = notes.trim().length

  function addPrompt(prompt) {
    const next = notes.trim() ? `${notes.trim()}\n• ${prompt}` : `• ${prompt}`
    onNotesChange(next)
  }

  return (
    <div className="flex-1 min-h-0 min-w-0 overflow-y-auto p-4 sm:p-5 lg:p-6">
      <div className="flex h-full min-h-[420px] w-full flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-[20px] font-bold tracking-tight text-[#1E2124]">{view.title}</h2>
            <p className="mt-1 text-sm text-[#6B7280]">{view.subtitle}</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#EBF5FF] px-2.5 py-1 text-[11px] font-semibold text-[#1B6AA5]">
            <Lock className="h-3 w-3" strokeWidth={2} />
            Private
          </span>
        </div>

        <section className="flex items-center gap-3 rounded-xl border border-[#E6E8EC] bg-[#F8FAFC] px-3.5 py-3">
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-[#EEF2F6]">
            <img
              src={view.photo}
              alt={view.doctorName}
              className="absolute inset-0 h-full w-full object-cover object-[center_18%]"
            />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#1E2124]">{view.doctorName}</p>
            <p className="truncate text-[12px] text-[#6B7280]">
              {view.specialty} • {view.clinic}
            </p>
            <p className="text-[12px] text-[#8A8F98]">
              {view.dateLabel} · {view.timeLabel}
            </p>
          </div>
        </section>

        {view.prompts.length > 0 ? (
          <div>
            <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.04em] text-[#8A8F98]">
              Quick add
            </p>
            <div className="flex flex-wrap gap-2">
              {view.prompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => addPrompt(prompt)}
                  className="inline-flex items-center gap-1 rounded-full border border-[#E6E8EC] bg-white px-3 py-1.5 text-[12px] font-medium text-[#1E2124] cursor-pointer hover:bg-[#EBF5FF]"
                >
                  <Plus className="h-3 w-3 text-[#2F80ED]" strokeWidth={2} />
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <section className="flex flex-1 min-h-[220px] flex-col overflow-hidden rounded-2xl border border-[#E6E8EC] bg-white shadow-sm">
          <div className="flex items-center justify-between gap-2 border-b border-[#E6E8EC] bg-[#F8FAFC] px-4 py-2.5">
            <p className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#1E2124]">
              <NotebookPen className="h-4 w-4 text-[#2F80ED]" strokeWidth={1.8} />
              Your notes
            </p>
            <span className="text-[11px] font-medium text-[#8A8F98]">{count} characters</span>
          </div>
          <textarea
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            placeholder={view.placeholder}
            className="w-full flex-1 min-h-[180px] resize-none bg-white px-4 py-3 text-sm leading-relaxed text-[#1E2124] placeholder:text-[#9CA3AF] focus:outline-none"
          />
        </section>

        <p className="text-[12px] text-[#8A8F98]">
          {view.completed
            ? 'This visit is completed. You can still keep notes for your records.'
            : 'Only you can see these notes. They are not shared with the clinic.'}
        </p>
      </div>
    </div>
  )
}
