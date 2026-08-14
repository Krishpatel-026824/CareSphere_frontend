import { Pin, PinOff } from 'lucide-react'
import { chatPinCopy } from '../../data/mocks/messagePins'

export default function ConversationPinMenu({ open, x, y, pinned, locked, onPin, onUnpin, onClose }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-40" onClick={onClose}>
      <div
        role="menu"
        aria-label="Chat options"
        className="absolute w-44 rounded-xl bg-white shadow-lg border border-border-gray overflow-hidden"
        style={{ top: y, left: x }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          role="menuitem"
          disabled={locked}
          onClick={locked ? undefined : pinned ? onUnpin : onPin}
          className={`w-full px-3.5 py-2.5 flex items-center gap-3 text-left ${
            locked ? 'text-body-gray cursor-default' : 'text-navy cursor-pointer hover:bg-bg-gray'
          }`}
        >
          {locked || !pinned ? (
            <Pin className="w-4 h-4 shrink-0" strokeWidth={1.75} fill={locked ? 'currentColor' : 'none'} />
          ) : (
            <PinOff className="w-4 h-4 shrink-0" strokeWidth={1.75} />
          )}
          <span className="text-[13px] font-semibold">
            {locked ? chatPinCopy.locked : pinned ? chatPinCopy.unpin : chatPinCopy.pin}
          </span>
        </button>
      </div>
    </div>
  )
}
