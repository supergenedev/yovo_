import { useEffect, useRef, useState } from 'react'
import {
  SgDsLibraryStack,
  SgDsLibraryText,
  SgDsLibraryButton,
  SgDsLibraryBadge,
  SgDsLibraryAvatar,
  SgDsLibraryInput,
} from '@/libraries/sg-ds-library/components'
import { useDmStore } from '@/stores/dm'
import { useAuthStore } from '@/stores/auth'

function formatTime(ms: number | null | undefined): string {
  if (!ms) return ''
  const diff = Date.now() - ms
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return '방금'
  if (mins < 60) return `${mins}분 전`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}시간 전`
  return `${Math.floor(hours / 24)}일 전`
}

export default function DmPage() {
  const dmStore = useDmStore()
  const authStore = useAuthStore()
  const [messageInput, setMessageInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    dmStore.fetchChatRooms()
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [dmStore.messages])

  function isMine(chat: any): boolean {
    return chat.sender_type === 'user' && String(chat.sender_id) === String(authStore.userId)
  }

  async function handleSend() {
    const text = messageInput.trim()
    if (!text || !dmStore.currentRoom) return
    setMessageInput('')
    await dmStore.sendMessage(dmStore.currentRoom.id, text)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <SgDsLibraryStack
      direction="row"
      align="stretch"
      style={{ width: '100%', height: '100%', overflow: 'hidden' }}
      data-wb-bg-token="surface-page"
      data-wb-bg-token-collection="sg-ds-library-semantic-color"
    >
      {/* LEFT: Chat room list */}
      <SgDsLibraryStack
        direction="column"
        align="stretch"
        gap="none"
        style={{
          width: '300px',
          minWidth: '300px',
          borderRight: '1px solid var(--ds-color-border-default)',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <SgDsLibraryStack
          direction="row"
          align="center"
          justify="between"
          padding="lg"
          style={{ borderBottom: '1px solid var(--ds-color-border-default)', flex: '0 0 auto' }}
        >
          <SgDsLibraryText as="h2" variant="heading-4" weight="semibold">메시지</SgDsLibraryText>
        </SgDsLibraryStack>

        {/* Loading */}
        {dmStore.loading && (
          <SgDsLibraryStack align="center" justify="center" padding="xl">
            <SgDsLibraryText tone="tertiary">불러오는 중...</SgDsLibraryText>
          </SgDsLibraryStack>
        )}

        {/* Empty */}
        {!dmStore.loading && dmStore.chatRooms.length === 0 && (
          <SgDsLibraryStack
            direction="column"
            align="center"
            justify="center"
            padding="xl"
            gap="sm"
            style={{ flex: '1 1 auto' }}
          >
            <SgDsLibraryText tone="tertiary">대화가 없습니다.</SgDsLibraryText>
          </SgDsLibraryStack>
        )}

        {/* Room list */}
        {dmStore.chatRooms.length > 0 && (
          <SgDsLibraryStack
            direction="column"
            align="stretch"
            gap="none"
            style={{ flex: '1 1 auto', overflowY: 'auto' }}
          >
            {dmStore.chatRooms.map((room: any) => (
              <button
                key={room.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: 'var(--ds-spacing-space-3) var(--ds-spacing-space-4)',
                  background: dmStore.currentRoom?.id === room.id
                    ? 'var(--ds-color-background-selected, rgba(99,102,241,0.08))'
                    : 'transparent',
                  border: 'none',
                  borderBottom: '1px solid var(--ds-color-border-subtle)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                }}
                onClick={() => dmStore.selectRoom(room)}
              >
                <SgDsLibraryAvatar
                  src={room.creator_user?.profile_image ?? undefined}
                  initials={(room.creator_user?.nickname ?? 'UN').slice(0, 2).toUpperCase()}
                  tone="brand"
                  size="sm"
                  shape="circle"
                  alt={room.creator_user?.nickname ?? ''}
                  style={{ flex: '0 0 auto' }}
                />
                {/* .stack 기본 width:100% 때문에 우측 스택이 공간을 선점하므로 basis 0%로 고정 */}
                <SgDsLibraryStack direction="column" gap="none" style={{ flex: '1 1 0%', minWidth: 0 }}>
                  <SgDsLibraryText variant="body-sm" weight="semibold" truncate={true} truncateLines="1">
                    {room.creator_user?.nickname ?? '알 수 없음'}
                  </SgDsLibraryText>
                  {room.last_message && (
                    <SgDsLibraryText variant="caption" tone="tertiary" truncate={true} truncateLines="1">
                      {room.last_message}
                    </SgDsLibraryText>
                  )}
                </SgDsLibraryStack>
                <SgDsLibraryStack direction="column" align="end" gap="xs" style={{ flex: '0 0 auto', width: 'auto' }}>
                  <SgDsLibraryText variant="caption" tone="tertiary">{formatTime(room.last_messaged_at)}</SgDsLibraryText>
                  {room.unread_count > 0 && (
                    <SgDsLibraryBadge status="danger" variant="subtle" size="sm" shape="pill">
                      {room.unread_count}
                    </SgDsLibraryBadge>
                  )}
                </SgDsLibraryStack>
              </button>
            ))}
          </SgDsLibraryStack>
        )}
      </SgDsLibraryStack>

      {/* RIGHT: Chat messages */}
      <SgDsLibraryStack
        direction="column"
        align="stretch"
        gap="none"
        style={{ flex: '1 1 auto', height: '100%', overflow: 'hidden' }}
      >
        {!dmStore.currentRoom ? (
          <SgDsLibraryStack
            direction="column"
            align="center"
            justify="center"
            gap="sm"
            style={{ flex: '1 1 auto' }}
          >
            <SgDsLibraryText tone="tertiary" variant="body">대화를 선택하세요</SgDsLibraryText>
          </SgDsLibraryStack>
        ) : (
          <>
            {/* Room header */}
            <SgDsLibraryStack
              direction="row"
              align="center"
              gap="md"
              padding="lg"
              style={{ borderBottom: '1px solid var(--ds-color-border-default)', flex: '0 0 auto' }}
            >
              <SgDsLibraryText as="h3" variant="heading-4" weight="semibold">
                {dmStore.currentRoom.creator_user?.nickname ?? '대화'}
              </SgDsLibraryText>
            </SgDsLibraryStack>

            {/* Messages */}
            <SgDsLibraryStack
              direction="column"
              align="stretch"
              gap="sm"
              padding="lg"
              style={{ flex: '1 1 auto', overflowY: 'auto' }}
            >
              {dmStore.messagesLoading && (
                <SgDsLibraryStack align="center" justify="center" padding="xl">
                  <SgDsLibraryText tone="tertiary">메시지를 불러오는 중...</SgDsLibraryText>
                </SgDsLibraryStack>
              )}

              {!dmStore.messagesLoading && dmStore.messages.length === 0 && (
                <SgDsLibraryStack align="center" justify="center" padding="xl">
                  <SgDsLibraryText tone="tertiary">메시지가 없습니다. 첫 메시지를 보내보세요.</SgDsLibraryText>
                </SgDsLibraryStack>
              )}

              {dmStore.messages.map((chat: any) => {
                const mine = isMine(chat)
                return (
                  <SgDsLibraryStack
                    key={chat.id}
                    direction="row"
                    justify={mine ? 'end' : 'start'}
                    style={{ width: '100%' }}
                  >
                    <div
                      style={{
                        maxWidth: '70%',
                        padding: 'var(--ds-spacing-space-2) var(--ds-spacing-space-3)',
                        borderRadius: 'var(--ds-radius-lg)',
                        background: mine
                          ? 'var(--ds-color-background-brand)'
                          : 'var(--ds-color-background-sunken)',
                        color: mine
                          ? 'var(--ds-color-text-on-brand)'
                          : 'var(--ds-color-text-default)',
                        wordBreak: 'break-word',
                      }}
                    >
                      <SgDsLibraryText variant="body-sm">{chat.message}</SgDsLibraryText>
                      <SgDsLibraryText
                        variant="caption"
                        style={{
                          display: 'block',
                          marginTop: '2px',
                          opacity: '0.65',
                          textAlign: mine ? 'right' : 'left',
                        }}
                      >
                        {formatTime(chat.created_at)}
                      </SgDsLibraryText>
                    </div>
                  </SgDsLibraryStack>
                )
              })}
              <div ref={messagesEndRef} />
            </SgDsLibraryStack>

            {/* Message input */}
            <SgDsLibraryStack
              direction="row"
              align="center"
              gap="sm"
              padding="lg"
              style={{ borderTop: '1px solid var(--ds-color-border-default)', flex: '0 0 auto' }}
            >
              <SgDsLibraryInput
                value={messageInput}
                type="text"
                placeholder="메시지 입력..."
                size="md"
                style={{ flex: '1 1 auto' }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessageInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <SgDsLibraryButton
                variant="primary"
                size="md"
                label="전송"
                disabled={!messageInput.trim()}
                onClick={handleSend}
              />
            </SgDsLibraryStack>
          </>
        )}
      </SgDsLibraryStack>
    </SgDsLibraryStack>
  )
}
