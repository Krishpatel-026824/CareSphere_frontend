import { Search } from 'lucide-react'
import ConversationListItem from './ConversationListItem'

export default function ConversationList({ items, selectedId, query, onQueryChange, onSelect }) {
  return (
    <aside className="chat-panel min-h-0 flex flex-col gap-3 h-full">
      <div className="rounded-full border border-border-gray px-4 py-2.5 sm:py-3 bg-white flex items-center gap-3 shadow-sm shrink-0">
        <Search className="w-5 h-5 text-body-gray shrink-0" strokeWidth={1.75} />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search conversations..."
          className="w-full text-[14px] sm:text-sm text-navy outline-none bg-transparent placeholder:text-body-gray/70"
        />
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-2.5 pr-0.5 overscroll-y-contain">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-border-gray bg-white p-6 text-center shadow-sm">
            <p className="text-sm font-semibold text-navy">No conversations</p>
            <p className="text-xs text-body-gray mt-1">Your chats will appear here.</p>
          </div>
        ) : (
          items.map((item) => (
            <ConversationListItem
              key={item.id}
              item={item}
              isActive={selectedId === item.id}
              onSelect={onSelect}
            />
          ))
        )}
      </div>
    </aside>
  )
}
