import { Check } from 'lucide-react'

export default function DoctorVisitChecklist({ tasks = [], title = 'Visit checklist', onToggleTask, compact = false }) {
  const doneCount = tasks.filter((task) => task.done).length
  const interactive = Boolean(onToggleTask)

  return (
    <div className="flex flex-col">
      <div className={`flex items-center justify-between gap-2 shrink-0 ${compact ? 'mb-1.5' : 'mb-2'}`}>
        <h3 className={`${compact ? 'text-sm' : 'text-sm'} font-bold text-navy`}>{title}</h3>
        <span
          className={`${compact ? 'text-[11px] px-2.5' : 'text-[11px] px-2.5'} font-semibold text-teal bg-[#E8F7F6] py-0.5 rounded-full shrink-0`}
        >
          {doneCount}/{tasks.length} done
        </span>
      </div>
      <ul className={`flex flex-col ${compact ? 'gap-1' : 'gap-1.5'}`}>
        {tasks.map((task) => {
          const content = (
            <>
              <span
                className={`mt-0.5 ${compact ? 'w-4 h-4' : 'w-5 h-5'} rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                  task.done ? 'bg-teal border-teal text-white' : 'border-[#C5CED8] bg-white'
                }`}
              >
                {task.done ? <Check className={compact ? 'w-2.5 h-2.5' : 'w-3 h-3'} strokeWidth={3} /> : null}
              </span>
              <span
                className={`${compact ? 'text-[13px]' : 'text-sm'} break-words ${task.done ? 'font-medium text-navy line-through decoration-teal/40' : 'text-navy/80'}`}
              >
                {task.label}
              </span>
            </>
          )

          const itemClass = `${
            compact ? 'gap-2.5 rounded-xl px-3 py-2 text-[13px] leading-snug' : 'gap-2.5 rounded-xl px-3 py-2 text-sm leading-snug'
          } ${task.done ? 'bg-[#E8F7F6] text-navy' : 'bg-[#F7FAFC] text-body-gray'}`

          if (!interactive) {
            return (
              <li key={task.id} className={`flex items-start ${itemClass}`}>
                {content}
              </li>
            )
          }

          return (
            <li key={task.id}>
              <button
                type="button"
                onClick={() => onToggleTask(task.id)}
                aria-pressed={task.done}
                className={`w-full text-left flex items-start cursor-pointer transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/40 ${itemClass}`}
              >
                {content}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
