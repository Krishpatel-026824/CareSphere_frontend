import { useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import ConversationListItem from './ConversationListItem'
import ConversationPinMenu from './ConversationPinMenu'
import MessageFilterMenu from './MessageFilterMenu'
import PinLimitToast from './PinLimitToast'

export default function ConversationList({
  items,
  selectedId,
  query,
  onQueryChange,
  onSelect,
  listFilter,
  onListFilterChange,
  onTogglePin,
  pinNotice = false,
}) {
  const [filterOpen, setFilterOpen] = useState(false)
  const [pinMenu, setPinMenu] = useState(null)
  const filterActive = listFilter && listFilter !== 'all'

  function openPinMenu(item, event) {
    const x = Math.min(event.clientX, window.innerWidth - 188)
    const y = Math.min(event.clientY, window.innerHeight - 64)
    setPinMenu({ id: item.id, pinned: Boolean(item.pinnedAt), locked: Boolean(item.pinLocked), x, y })
  }

  return (
    <aside className="chat-panel relative min-h-0 flex flex-col h-full rounded-2xl border border-border-gray bg-white shadow-sm p-3 sm:p-4">
      <div className="relative flex items-center gap-2.5 shrink-0">
        <div className="flex-1 min-w-0 rounded-xl border border-border-gray px-3.5 py-2.5 bg-[#F7F8FA] flex items-center gap-2.5">
          <Search className="w-4 h-4 text-body-gray shrink-0" strokeWidth={1.75} />
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search messages..."
            className="w-full text-sm text-navy outline-none bg-transparent placeholder:text-body-gray/70"
          />
        </div>
        <button
          type="button"
          onClick={() => setFilterOpen((open) => !open)}
          className={`relative w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 cursor-pointer ${
            filterActive || filterOpen
              ? 'bg-teal-light border-teal text-teal'
              : 'bg-white border-[#3D4A5C]/45 text-body-gray hover:bg-bg-gray'
          }`}
          aria-label="Filter messages"
          aria-expanded={filterOpen}
        >
          <SlidersHorizontal className="w-4 h-4" strokeWidth={1.75} />
          {filterActive ? (
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-teal" />
          ) : null}
        </button>
        <MessageFilterMenu
          open={filterOpen}
          listFilter={listFilter}
          onSelect={onListFilterChange}
          onClose={() => setFilterOpen(false)}
        />
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-2 mt-3 pr-0.5 overscroll-y-contain">
        {items.length === 0 ? (
          <div className="rounded-2xl bg-bg-gray p-6 text-center">
            <p className="text-sm font-semibold text-navy">No conversations</p>
            <p className="text-xs text-body-gray mt-1">Try another search or filter.</p>
          </div>
        ) : (
          items.map((item, index) => {
            const showDivider = item.pinnedAt && items[index + 1] && !items[index + 1].pinnedAt
            return (
              <div key={item.id} className="flex flex-col gap-2">
                <ConversationListItem
                  item={item}
                  isActive={selectedId === item.id}
                  onSelect={onSelect}
                  onOpenMenu={openPinMenu}
                />
                {showDivider ? <div className="h-px bg-border-gray mx-1" /> : null}
              </div>
            )
          })
        )}
      </div>

      <ConversationPinMenu
        open={Boolean(pinMenu)}
        x={pinMenu?.x}
        y={pinMenu?.y}
        pinned={pinMenu?.pinned}
        locked={pinMenu?.locked}
        onPin={() => {
          onTogglePin?.(pinMenu.id)
          setPinMenu(null)
        }}
        onUnpin={() => {
          onTogglePin?.(pinMenu.id)
          setPinMenu(null)
        }}
        onClose={() => setPinMenu(null)}
      />
      <PinLimitToast open={pinNotice} />
    </aside>
  )
}
