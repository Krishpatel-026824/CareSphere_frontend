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
      className="w-full min-w-0 flex items-center gap-2 px-2 py-[7px] bg-[#F0F2F5] shrink-0"
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
        className="w-10 h-10 flex items-center justify-center text-[#54656F] hover:bg-black/5 rounded-full shrink-0 cursor-pointer"
        aria-label="Attach file"
      >
        <Paperclip className="w-[22px] h-[22px] -rotate-45" strokeWidth={1.7} />
      </button>

      <input
        ref={inputRef}
        value={draft}
        onChange={(event) => onDraftChange(event.target.value)}
        placeholder="Type a message"
        className="flex-1 min-w-0 w-full h-[42px] rounded-full bg-white px-4 text-[15px] text-[#111b21] outline-none placeholder:text-[#667781] shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]"
      />

      <button
        type="submit"
        disabled={!canSend}
        className="w-[42px] h-[42px] rounded-full bg-[#00A884] text-white flex items-center justify-center cursor-pointer hover:bg-[#017561] shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Send message"
      >
        <Send className="w-[18px] h-[18px] translate-x-[1px]" strokeWidth={2} />
      </button>
    </form>
  )
}
