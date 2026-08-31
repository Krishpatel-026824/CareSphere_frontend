import { useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import ConversationListItem from './ConversationListItem'
import ConversationPinMenu from './ConversationPinMenu'
import MessageFilterMenu from './MessageFilterMenu'
import PatientChatResult from './PatientChatResult'
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
  searchPlaceholder = 'Search messages...',
  patientResults = [],
  onStartPatientChat,
  emptyHint = 'Try another search or filter.',
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
    <aside className="chat-panel relative min-h-0 flex flex-col h-full bg-white border-r border-[#E9EDEF] overflow-hidden">
      <div className="shrink-0 px-3 pt-3 pb-2 bg-[#F0F2F5]">
        <div className="relative flex items-center gap-2">
          <div className="flex-1 min-w-0 rounded-lg bg-white px-3 py-2 flex items-center gap-2 shadow-[0_1px_0.5px_rgba(11,20,26,0.08)]">
            <Search className="w-4 h-4 text-[#54656F] shrink-0" strokeWidth={2} />
            <input
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder={searchPlaceholder}
              className="w-full text-[14px] text-[#111b21] outline-none bg-transparent placeholder:text-[#667781]"
            />
          </div>
          <button
            type="button"
            onClick={() => setFilterOpen((open) => !open)}
            className={`relative w-10 h-10 rounded-full flex items-center justify-center shrink-0 cursor-pointer ${
              filterActive || filterOpen
                ? 'bg-[#D9FDD3] text-[#008069]'
                : 'text-[#54656F] hover:bg-black/5'
            }`}
            aria-label="Filter messages"
            aria-expanded={filterOpen}
          >
            <SlidersHorizontal className="w-[18px] h-[18px]" strokeWidth={1.75} />
            {filterActive ? (
              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#25D366]" />
            ) : null}
          </button>
          <MessageFilterMenu
            open={filterOpen}
            listFilter={listFilter}
            onSelect={onListFilterChange}
            onClose={() => setFilterOpen(false)}
          />
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto overscroll-y-contain bg-white">
        {items.length === 0 && patientResults.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-[15px] font-normal text-[#111b21]">No conversations</p>
            <p className="text-[13px] text-[#667781] mt-1">{emptyHint}</p>
          </div>
        ) : (
          <>
            {items.map((item, index) => {
              const showDivider = item.pinnedAt && items[index + 1] && !items[index + 1].pinnedAt
              return (
                <div key={item.id}>
                  <ConversationListItem
                    item={item}
                    isActive={selectedId === item.id}
                    onSelect={onSelect}
                    onOpenMenu={openPinMenu}
                  />
                  {showDivider ? (
                    <div className="px-4 py-2 bg-[#F0F2F5] border-b border-[#E9EDEF]">
                      <p className="text-[12px] font-medium text-[#008069] uppercase tracking-wide">
                        All chats
                      </p>
                    </div>
                  ) : null}
                </div>
              )
            })}
            {patientResults.map((patient) => (
              <PatientChatResult
                key={patient.id}
                patient={patient}
                onStart={() => onStartPatientChat?.(patient)}
              />
            ))}
          </>
        )}
      </div>

      {pinMenu ? (
        <ConversationPinMenu
          pinned={pinMenu.pinned}
          locked={pinMenu.locked}
          x={pinMenu.x}
          y={pinMenu.y}
          onClose={() => setPinMenu(null)}
          onToggle={() => {
            onTogglePin?.(pinMenu.id)
            setPinMenu(null)
          }}
        />
      ) : null}

      {pinNotice ? <PinLimitToast /> : null}
    </aside>
  )
}
