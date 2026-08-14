import { CalendarDays, Clock, NotebookPen, Plus, ShieldCheck } from 'lucide-react'
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
        <div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-navy">{view.title}</h2>
            <p className="mt-1 text-sm text-body-gray">{view.subtitle}</p>
          </div>

        <section className="flex items-center gap-3.5 rounded-2xl border border-teal/15 bg-gradient-to-r from-[#F3FBFA] to-white px-3.5 py-3.5 shadow-[0_8px_24px_rgba(14,165,160,0.06)]">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl ring-4 ring-white bg-[#EEF2F6] shadow-sm">
            {view.photo ? (
              <img
                src={view.photo}
                alt={view.doctorName}
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
            ) : (
              <div className="h-full w-full bg-teal-light" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-bold text-navy">{view.doctorName}</p>
            <p className="truncate text-[12px] text-body-gray mt-0.5">
              {view.specialty} • {view.clinic}
            </p>
            <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-navy/80">
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5 text-teal" strokeWidth={1.75} />
                {view.dateLabel}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-teal" strokeWidth={1.75} />
                {view.timeLabel}
              </span>
            </p>
          </div>
        </section>

        {view.prompts.length > 0 ? (
          <div className="rounded-2xl border border-teal/10 bg-[#F7FCFB] px-3.5 py-3.5">
            <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-teal">
              Quick add
            </p>
            <div className="flex flex-wrap gap-2">
              {view.prompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => addPrompt(prompt)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-teal/20 bg-white px-3 py-1.5 text-[12px] font-semibold text-navy cursor-pointer hover:bg-teal-light hover:border-teal/30 hover:text-teal"
                >
                  <Plus className="h-3 w-3 text-teal" strokeWidth={2.4} />
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <section className="flex flex-1 min-h-[220px] flex-col overflow-hidden rounded-2xl border border-teal/15 bg-white shadow-[0_10px_28px_rgba(7,26,47,0.05)]">
          <div className="flex items-center justify-between gap-2 border-b border-teal/10 bg-[#F3FBFA] px-4 py-2.5">
            <p className="inline-flex items-center gap-2 text-[13px] font-semibold text-navy">
              <NotebookPen className="h-4 w-4 text-teal" strokeWidth={1.8} />
              Your notes
            </p>
            <span className="rounded-full bg-white px-2.5 py-0.5 text-[11px] font-semibold text-teal">
              {count} characters
            </span>
          </div>
          <textarea
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            placeholder={view.placeholder}
            className="w-full flex-1 min-h-[180px] resize-none bg-white px-4 py-3 text-sm leading-relaxed text-navy placeholder:text-body-gray/55 focus:outline-none"
          />
        </section>

        <p className="inline-flex items-start gap-2 rounded-xl bg-[#F7FCFB] px-3 py-2.5 text-[12px] text-body-gray">
          <ShieldCheck className="h-4 w-4 text-teal shrink-0 mt-0.5" strokeWidth={1.75} />
          {view.completed
            ? 'This visit is completed. You can still keep notes for your records.'
            : 'Only you can see these notes. They are not shared with the clinic.'}
        </p>
      </div>
    </div>
  )
}
