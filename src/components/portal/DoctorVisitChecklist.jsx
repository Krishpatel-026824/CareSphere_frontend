import { Check } from 'lucide-react'

export default function DoctorVisitChecklist({ tasks = [], title = 'Visit checklist', onToggleTask }) {
  const doneCount = tasks.filter((task) => task.done).length
  const interactive = Boolean(onToggleTask)

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between gap-2 shrink-0 mb-2.5">
        <h3 className="text-sm font-bold text-navy">{title}</h3>
        <span className="text-[11px] font-semibold text-teal bg-[#E8F7F6] px-2.5 py-0.5 rounded-full shrink-0">
          {doneCount}/{tasks.length} done
        </span>
      </div>
      <ul className="flex flex-col gap-2">
        {tasks.map((task) => {
          const content = (
            <>
              <span
                className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                  task.done ? 'bg-teal border-teal text-white' : 'border-[#C5CED8] bg-white'
                }`}
              >
                {task.done ? <Check className="w-3 h-3" strokeWidth={3} /> : null}
              </span>
              <span className={`break-words ${task.done ? 'font-medium text-navy line-through decoration-teal/40' : ''}`}>
                {task.label}
              </span>
            </>
          )

          if (!interactive) {
            return (
              <li
                key={task.id}
                className={`flex items-start gap-2.5 rounded-2xl px-3 py-2.5 text-sm leading-snug ${
                  task.done ? 'bg-[#E8F7F6] text-navy' : 'bg-[#F7FAFC] text-body-gray'
                }`}
              >
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
                className={`w-full text-left flex items-start gap-2.5 rounded-2xl px-3 py-2.5 text-sm leading-snug cursor-pointer transition-colors ${
                  task.done ? 'bg-[#E8F7F6] text-navy' : 'bg-[#F7FAFC] text-body-gray hover:bg-white'
                }`}
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
