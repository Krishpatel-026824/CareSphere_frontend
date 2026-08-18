import { MessagesSquare } from 'lucide-react'

export default function MessagesHeader({ subtitle = 'Stay connected with your doctors and care team.' }) {
  return (
    <header className="shrink-0 flex items-start gap-3 min-w-0">
      <MessagesSquare className="w-7 h-7 sm:w-8 sm:h-8 text-teal mt-0.5 shrink-0" strokeWidth={1.75} />
      <div className="min-w-0">
        <h1 className="text-[26px] sm:text-[30px] lg:text-[32px] font-bold text-navy tracking-tight leading-none">
          Messages
        </h1>
        <p className="text-sm text-body-gray mt-2">{subtitle}</p>
      </div>
    </header>
  )
}
