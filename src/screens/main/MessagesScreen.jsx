import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import DeleteChatConfirm from '../../components/DeleteChatConfirm'
import ChatInfoPanel from '../../components/messages/ChatInfoPanel'
import ConversationList from '../../components/messages/ConversationList'
import MessageThread from '../../components/messages/MessageThread'
import MessagesHeader from '../../components/messages/MessagesHeader'
import { getDoctorPatientById } from '../../data/generators/doctorPatientChatGenerator'
import { useBreakpoint } from '../../hooks/useBreakpoint'
import { useMessages } from '../../hooks/useMessages'

export default function MessagesScreen() {
  const { lg: isDesktop } = useBreakpoint()
  const location = useLocation()
  const navigate = useNavigate()
  const {
    selected,
    selectedId,
    draft,
    setDraft,
    query,
    setQuery,
    listFilter,
    setListFilter,
    isTyping,
    showDeleteConfirm,
    setShowDeleteConfirm,
    showChatInfo,
    setShowChatInfo,
    composerRef,
    filtered,
    patientMatches,
    isDoctor,
    openConversation,
    startPatientChat,
    autoSelectFirst,
    closeConversation,
    confirmDeleteChat,
    togglePin,
    pinNotice,
    sendMessage,
    sendAttachment,
    deleteForMe,
    deleteForEveryone,
  } = useMessages()

  const showChatPanel = Boolean(selectedId)
  const showListPanel = !selectedId || isDesktop
  const headerSubtitle = isDoctor
    ? 'Stay connected with your patients.'
    : 'Stay connected with your doctors and care team.'

  useEffect(() => {
    if (isDesktop) autoSelectFirst()
  }, [isDesktop, autoSelectFirst])

  useEffect(() => {
    const patientId = location.state?.patientId
    if (!patientId || !isDoctor) return
    const patient = getDoctorPatientById(patientId)
    if (patient) startPatientChat(patient)
    navigate('.', { replace: true, state: {} })
  }, [isDoctor, location.state?.patientId, navigate, startPatientChat])

  return (
    <div
      className={`messages-screen w-full bg-transparent ${
        showChatPanel && !isDesktop
          ? 'fixed inset-x-0 top-0 z-20 bottom-[calc(4rem+env(safe-area-inset-bottom,0px))] overflow-hidden lg:static lg:inset-auto lg:bottom-auto lg:z-auto lg:overflow-visible lg:h-full'
          : 'min-h-full lg:h-[100dvh] lg:max-h-[100dvh] lg:overflow-hidden'
      }`}
    >
      <div
        className={`w-full max-w-[1400px] mx-auto page-pad flex flex-col h-full min-h-0 ${
          isDesktop ? 'py-3 gap-0' : showChatPanel ? 'py-0 gap-0' : 'py-4 gap-4'
        }`}
      >
        {!isDesktop && showListPanel ? <MessagesHeader subtitle={headerSubtitle} /> : null}

        <div
          className={`grid min-h-0 flex-1 ${
            isDesktop
              ? 'grid-cols-[minmax(280px,1fr)_minmax(0,2fr)] grid-rows-[minmax(0,1fr)] items-stretch gap-4'
              : 'grid-cols-1 h-full'
          }`}
        >
          {showListPanel ? (
            <div className="min-w-0 min-h-0 h-full flex flex-col gap-3">
              {isDesktop ? <MessagesHeader subtitle={headerSubtitle} /> : null}
              <div className="min-h-0 flex-1">
                <ConversationList
                  items={filtered}
                  selectedId={selectedId}
                  query={query}
                  onQueryChange={setQuery}
                  onSelect={openConversation}
                  listFilter={listFilter}
                  onListFilterChange={setListFilter}
                  onTogglePin={togglePin}
                  pinNotice={pinNotice}
                  searchPlaceholder={isDoctor ? 'Search patients...' : 'Search messages...'}
                  patientResults={patientMatches}
                  onStartPatientChat={startPatientChat}
                  emptyHint={
                    isDoctor
                      ? 'Search a patient name to start a chat.'
                      : 'Try another search or filter.'
                  }
                />
              </div>
            </div>
          ) : null}

          {showChatPanel || isDesktop ? (
            <section className="min-h-0 h-full flex flex-col">
              <MessageThread
                conversation={selected}
                onBack={isDesktop ? undefined : closeConversation}
                draft={draft}
                onDraftChange={setDraft}
                onSend={sendMessage}
                onAttach={sendAttachment}
                onDeleteChat={() => setShowDeleteConfirm(true)}
                onInfo={() => setShowChatInfo(true)}
                isTyping={isTyping}
                composerRef={composerRef}
                onDeleteForMe={deleteForMe}
                onDeleteForEveryone={deleteForEveryone}
              />
            </section>
          ) : null}
        </div>
      </div>

      {showChatInfo && selected ? (
        <ChatInfoPanel conversation={selected} onClose={() => setShowChatInfo(false)} />
      ) : null}

      {showDeleteConfirm && selected ? (
        <DeleteChatConfirm
          doctorName={selected.doctorName}
          onCancel={() => setShowDeleteConfirm(false)}
          onConfirm={confirmDeleteChat}
        />
      ) : null}
    </div>
  )
}
