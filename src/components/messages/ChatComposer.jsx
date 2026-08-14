import { useRef } from 'react'
import { Paperclip, Send } from 'lucide-react'

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
      className="w-full min-w-0 flex items-center gap-2 px-2 py-2 border-t border-border-gray bg-white shrink-0"
      onSubmit={(event) => {
        event.preventDefault()
        onSend()
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
        className="w-10 h-10 rounded-full border border-border-gray bg-[#F4F6F8] flex items-center justify-center text-body-gray hover:bg-bg-gray shrink-0 cursor-pointer"
        aria-label="Attach file"
      >
        <Paperclip className="w-[18px] h-[18px]" strokeWidth={1.75} />
      </button>

      <input
        ref={inputRef}
        value={draft}
        onChange={(event) => onDraftChange(event.target.value)}
        placeholder="Type a message..."
        className="flex-1 min-w-0 w-full h-10 rounded-full bg-[#F4F6F8] border border-border-gray px-4 text-[15px] text-navy outline-none placeholder:text-body-gray/55"
      />

      <button
        type="submit"
        disabled={!canSend}
        className="w-10 h-10 rounded-full bg-teal text-white flex items-center justify-center cursor-pointer hover:bg-teal-dark shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Send message"
      >
        <Send className="w-4 h-4" strokeWidth={1.8} />
      </button>
    </form>
  )
}
