import { useRef } from 'react'
import { Paperclip, Send, Smile } from 'lucide-react'

export default function ChatComposer({ draft, onDraftChange, onSend, onAttach, inputRef }) {
  const fileRef = useRef(null)
  const canSend = Boolean(draft.trim())

  function handleAttachChange(event) {
    const file = event.target.files?.[0]
    if (file) onAttach?.(file)
    event.target.value = ''
  }

  return (
    <form
      className="w-full min-w-0 flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-[#EFF9F8] to-white border-t border-teal/15 shrink-0"
      onSubmit={(event) => {
        event.preventDefault()
        if (canSend) onSend()
      }}
    >
      <input
        ref={fileRef}
        type="file"
        className="hidden"
        accept="image/*,.pdf,.doc,.docx,.txt,application/pdf"
        onChange={handleAttachChange}
      />

      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="w-11 h-11 flex items-center justify-center text-teal border border-teal/25 bg-teal-light/40 hover:bg-teal-light hover:border-teal/40 rounded-full shrink-0 cursor-pointer transition-colors"
        aria-label="Attach file"
      >
        <Paperclip className="w-5 h-5" strokeWidth={1.85} />
      </button>

      <div className="flex-1 min-w-0 h-11 rounded-full border border-teal/20 bg-white px-4 flex items-center gap-2 shadow-sm focus-within:border-teal/50 focus-within:ring-2 focus-within:ring-teal/15 transition-all">
        <input
          ref={inputRef}
          value={draft}
          onChange={(event) => onDraftChange(event.target.value)}
          placeholder="Type a message..."
          className="w-full bg-transparent text-[14px] leading-5 text-navy outline-none placeholder:text-body-gray/60"
        />
        <button
          type="button"
          tabIndex={-1}
          className="w-8 h-8 flex items-center justify-center text-body-gray/70 hover:text-teal rounded-full shrink-0"
          aria-label="Insert emoji"
        >
          <Smile className="w-5 h-5" strokeWidth={1.75} />
        </button>
      </div>

      <button
        type="submit"
        disabled={!canSend}
        className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-colors shadow-sm ${
          canSend
            ? 'bg-teal text-white cursor-pointer hover:bg-teal-dark'
            : 'bg-[#E8EEF4] text-body-gray/45 cursor-default'
        }`}
        aria-label="Send message"
      >
        <Send className="w-[18px] h-[18px] translate-x-[1px]" strokeWidth={2} />
      </button>
    </form>
  )
}
