import { MessagesSquare, SquarePen } from 'lucide-react'

export default function MessagesHeader({ onNewMessage }) {
  return (
    <header className="shrink-0 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
      <div className="flex items-start gap-3 min-w-0">
        <MessagesSquare className="w-7 h-7 sm:w-8 sm:h-8 text-teal mt-0.5 shrink-0" strokeWidth={1.75} />
        <div className="min-w-0">
          <h1 className="text-[26px] sm:text-[30px] lg:text-[32px] font-bold text-navy tracking-tight leading-none">
            Messages
          </h1>
          <p className="text-sm text-body-gray mt-2">Stay connected with your doctors and care team.</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onNewMessage}
        className="inline-flex items-center justify-center gap-2 self-start min-h-11 px-5 rounded-xl bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal-dark shadow-sm shrink-0"
      >
        <SquarePen className="w-4 h-4" strokeWidth={2} />
        New Message
      </button>
    </header>
  )
}
