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
    unreadCount,
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
      className={`messages-screen w-full h-full min-h-0 flex flex-col overflow-hidden bg-transparent ${
        showChatPanel && !isDesktop
          ? 'fixed inset-x-0 top-0 z-20 bottom-[calc(4rem+env(safe-area-inset-bottom,0px))] lg:static lg:inset-auto lg:bottom-auto lg:z-auto'
          : ''
      }`}
    >
      <div
        className={`w-full max-w-[1600px] mx-auto flex flex-col h-full min-h-0 ${
          isDesktop ? 'h-full px-3 py-3' : showChatPanel ? 'h-full' : 'page-pad py-4 gap-4'
        }`}
      >
        {!isDesktop && showListPanel ? <MessagesHeader subtitle={headerSubtitle} /> : null}

        <div
          className={`min-h-0 flex-1 ${
            isDesktop
              ? 'flex h-full overflow-hidden rounded-[20px] border border-[#E6EBF1] shadow-[0_8px_30px_rgba(7,26,47,0.06)] bg-white'
              : 'grid grid-cols-1 h-full'
          }`}
        >
          {showListPanel ? (
            <div
              className={`min-w-0 min-h-0 h-full flex flex-col ${
                isDesktop ? 'w-[32%] min-w-[300px] max-w-[420px] shrink-0' : ''
              }`}
            >
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
                title={isDesktop ? 'Chats' : undefined}
                unreadCount={unreadCount}
                searchPlaceholder={isDoctor ? 'Search patients...' : 'Search messages...'}
                patientResults={patientMatches}
                onStartPatientChat={startPatientChat}
                emptyHint={
                  isDoctor ? 'Search a patient name to start a chat.' : 'Try another search or filter.'
                }
              />
            </div>
          ) : null}

          {showChatPanel || isDesktop ? (
            <section className="min-h-0 h-full flex flex-col flex-1 min-w-0 bg-[#EFF9F8]">
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
        <ChatInfoPanel
          conversation={selected}
          isDoctor={isDoctor}
          onClose={() => setShowChatInfo(false)}
        />
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
