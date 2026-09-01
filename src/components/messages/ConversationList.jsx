import { useState } from 'react'
import { MessageSquarePlus, Search, SlidersHorizontal } from 'lucide-react'
import { messageFilterOptions } from '../../data/mocks/messageFilters'
import ChatSecurityBanner from './ChatSecurityBanner'
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
  title,
  unreadCount = 0,
}) {
  const [pinMenu, setPinMenu] = useState(null)
  const [filterOpen, setFilterOpen] = useState(false)

  function openPinMenu(item, event) {
    const x = Math.min(event.clientX, window.innerWidth - 188)
    const y = Math.min(event.clientY, window.innerHeight - 64)
    setPinMenu({ id: item.id, pinned: Boolean(item.pinnedAt), locked: Boolean(item.pinLocked), x, y })
  }

  return (
    <aside className="chat-panel relative min-h-0 flex flex-col h-full bg-white border-r border-[#E6EBF1] overflow-hidden">
      <div className="shrink-0 px-4 pt-4 pb-3">
        {title ? (
          <h1 className="text-[22px] font-bold text-navy tracking-tight leading-none mb-4">{title}</h1>
        ) : null}

        <div className="flex items-center gap-2">
          <div className="flex-1 min-w-0 h-11 rounded-full border border-[#E6EBF1] bg-[#F8FAFC] px-4 flex items-center gap-2.5 focus-within:border-teal/50 focus-within:ring-2 focus-within:ring-teal/15 transition-all">
            <Search className="w-4 h-4 text-body-gray shrink-0" strokeWidth={2} />
            <input
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder={searchPlaceholder}
              className="w-full text-[14px] text-navy outline-none bg-transparent placeholder:text-body-gray/60"
            />
          </div>
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setFilterOpen((open) => !open)}
              className="w-11 h-11 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] flex items-center justify-center text-body-gray hover:text-teal hover:border-teal/30 cursor-pointer transition-colors"
              aria-label="Filter conversations"
              aria-expanded={filterOpen}
            >
              <SlidersHorizontal className="w-[18px] h-[18px]" strokeWidth={2} />
            </button>
            <MessageFilterMenu
              open={filterOpen}
              listFilter={listFilter}
              onSelect={onListFilterChange}
              onClose={() => setFilterOpen(false)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3">
          {messageFilterOptions.map((option) => {
            const active = listFilter === option.id
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => onListFilterChange?.(option.id)}
                className={`h-9 px-4 rounded-full text-[13px] font-semibold cursor-pointer transition-colors inline-flex items-center ${
                  active
                    ? 'bg-teal text-white shadow-sm'
                    : 'bg-[#F4F6F8] text-body-gray hover:bg-[#EEF2F6]'
                }`}
              >
                {option.chip || option.label}
                {option.id === 'unread' && unreadCount > 0 ? (
                  <span className="ml-2 min-w-[18px] h-[18px] px-1 rounded-full bg-[#3B82F6] text-white text-[10px] font-bold inline-flex items-center justify-center tabular-nums">
                    {unreadCount}
                  </span>
                ) : null}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto overscroll-y-contain px-2 pb-2">
        {items.length === 0 && patientResults.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center gap-2 px-6 py-10 text-center">
            <span className="w-11 h-11 rounded-xl bg-[#F4F7FA] border border-[#E6EBF1] text-teal flex items-center justify-center">
              <MessageSquarePlus className="w-5 h-5" strokeWidth={1.75} />
            </span>
            <p className="text-[14px] font-semibold text-navy">No conversations</p>
            <p className="text-[12px] text-body-gray leading-relaxed">{emptyHint}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-0.5">
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
                    <p className="px-3 pt-3 pb-1 text-[11px] font-bold uppercase tracking-[0.08em] text-teal">
                      All chats
                    </p>
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
          </div>
        )}
      </div>

      <ChatSecurityBanner />

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

      {pinNotice ? <PinLimitToast open /> : null}
    </aside>
  )
}
