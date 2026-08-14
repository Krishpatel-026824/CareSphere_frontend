import { Info, Trash2 } from 'lucide-react'
import { messageActionOptions } from '../../data/mocks/messageFilters'

const icons = {
  info: Info,
  deleteForMe: Trash2,
  deleteForEveryone: Trash2,
}

export default function MessageActionsMenu({ message, position, onAction, onClose }) {
  if (!message || !position) return null
  const isMine = message.from === 'me'
  const options = messageActionOptions.filter((option) => {
    if (message.deleted && option.id === 'deleteForEveryone') return false
    if (option.ownOnly && !isMine) return false
    return true
  })

  return (
    <div className="absolute inset-0 z-20" onClick={onClose}>
      <div className="absolute inset-0 bg-navy/20" />
      <div
        role="menu"
        aria-label="Message options"
        className="absolute w-[13.5rem] rounded-xl bg-white shadow-lg border border-border-gray overflow-hidden"
        style={{
          top: position.top,
          left: position.left,
          right: position.right,
        }}
        onClick={(event) => event.stopPropagation()}
      >
        {options.map((option) => {
          const Icon = icons[option.id] || Info
          return (
            <button
              key={option.id}
              type="button"
              role="menuitem"
              onClick={() => onAction(option.id)}
              className={`w-full px-3.5 py-2.5 flex items-center gap-3 text-left cursor-pointer hover:bg-bg-gray ${
                option.danger ? 'text-red-500' : 'text-navy'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" strokeWidth={1.75} />
              <span className="text-[13px] font-semibold">{option.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
