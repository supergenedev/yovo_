import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  SgDsLibraryStack,
  SgDsLibraryText,
  SgDsLibraryButton,
  SgDsLibraryBadge,
  SgDsLibraryAvatar,
  SgDsLibraryInput,
  SgDsLibraryDivider,
  SgDsLibraryEmptyState,
  SgDsLibraryIcon,
} from '@/libraries/sg-ds-library/components'
import { useDmStore } from '@/stores/dm'
import { useAuthStore } from '@/stores/auth'
import { useMeStore } from '@/stores/me'

// ──────────────────────────────────────────────
// Time helpers
// ──────────────────────────────────────────────

function formatBubbleTime(ms: number | null | undefined): string {
  if (!ms) return ''
  const d = new Date(ms)
  const h = d.getHours()
  const m = d.getMinutes().toString().padStart(2, '0')
  const ampm = h < 12 ? '오전' : '오후'
  const h12 = h % 12 === 0 ? 12 : h % 12
  return `${ampm} ${h12}:${m}`
}

function formatListTime(ms: number | null | undefined): string {
  if (!ms) return ''
  const diff = Date.now() - ms
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return '방금'
  if (mins < 60) return `${mins}분 전`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}시간 전`
  return `${Math.floor(hours / 24)}일 전`
}

function formatDateLabel(ms: number): string {
  const d = new Date(ms)
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`
}

function isSameDay(a: number, b: number): boolean {
  const da = new Date(a)
  const db = new Date(b)
  return (
    da.getFullYear() === db.getFullYear() &&
    da.getMonth() === db.getMonth() &&
    da.getDate() === db.getDate()
  )
}

// ──────────────────────────────────────────────
// Main component
// ──────────────────────────────────────────────

export default function DmPage() {
  const dmStore = useDmStore()
  const userId = useAuthStore((s) => s.userId)
  const meUser = useMeStore((s) => s.user)
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [messageInput, setMessageInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Resolve current user id: prefer auth store, fall back to me store
  const myId = userId ?? meUser?.id ?? null

  function isMine(chat: any): boolean {
    return (
      chat.sender_type === 'User' && myId !== null && String(chat.sender_id) === String(myId)
    )
  }

  useEffect(() => {
    dmStore.fetchChatRooms()
  }, [])

  // ?room=ID 로 진입하면 (크리에이터 프로필의 '메시지' 버튼) 해당 방을 자동으로 연다
  useEffect(() => {
    const roomId = searchParams.get('room')
    if (!roomId || dmStore.chatRooms.length === 0) return
    const room = (dmStore.chatRooms as any[]).find((r) => String(r.id) === String(roomId))
    if (room && String(dmStore.currentRoom?.id) !== String(roomId)) {
      dmStore.selectRoom(room)
    }
    setSearchParams({}, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, dmStore.chatRooms])

  // Scroll to bottom whenever messages change or room changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [dmStore.messages, dmStore.currentRoom])

  async function handleSend() {
    const text = messageInput.trim()
    if (!text || !dmStore.currentRoom) return
    setMessageInput('')
    await dmStore.sendMessage(dmStore.currentRoom.id, text)
    // Scroll after send (messages array updated in store)
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Build message groups for rendering (with date separators + avatar grouping)
  const messages = dmStore.messages as any[]

  return (
    <SgDsLibraryStack
      direction="row"
      align="stretch"
      style={{ width: '100%', height: '100%', overflow: 'hidden' }}
    >
      {/* ── LEFT: room list ── */}
      <SgDsLibraryStack
        direction="column"
        align="stretch"
        gap="none"
        style={{
          width: '300px',
          minWidth: '300px',
          borderRight: '1px solid var(--ds-color-border-subtle, rgba(0,0,0,0.08))',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <SgDsLibraryStack
          direction="row"
          align="center"
          padding="lg"
          style={{
            borderBottom: '1px solid var(--ds-color-border-subtle, rgba(0,0,0,0.08))',
            flex: '0 0 auto',
          }}
        >
          <SgDsLibraryText as="h2" variant="heading-4" weight="semibold">
            메시지
          </SgDsLibraryText>
        </SgDsLibraryStack>

        {/* Loading */}
        {dmStore.loading && (
          <SgDsLibraryStack align="center" justify="center" padding="xl" style={{ flex: '1 1 auto' }}>
            <SgDsLibraryText tone="tertiary">불러오는 중...</SgDsLibraryText>
          </SgDsLibraryStack>
        )}

        {/* Empty rooms */}
        {!dmStore.loading && dmStore.chatRooms.length === 0 && (
          <SgDsLibraryStack
            direction="column"
            align="center"
            justify="center"
            padding="xl"
            gap="sm"
            style={{ flex: '1 1 auto' }}
          >
            <SgDsLibraryText tone="tertiary" variant="body-sm">
              대화가 없습니다.
            </SgDsLibraryText>
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
            {(dmStore.chatRooms as any[]).map((room) => {
              const isSelected = dmStore.currentRoom?.id === room.id
              return (
                <button
                  key={room.id}
                  aria-label={`${room.creator_user?.nickname ?? '알 수 없음'} 대화방`}
                  aria-current={isSelected ? 'true' : undefined}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 16px',
                    background: isSelected
                      ? 'var(--p-color-brand-50, rgba(255,0,85,0.06))'
                      : 'transparent',
                    borderLeft: isSelected
                      ? '2px solid var(--p-color-brand-500, #ff0055)'
                      : '2px solid transparent',
                    borderTop: 'none',
                    borderRight: 'none',
                    borderBottom: '1px solid var(--ds-color-border-subtle, rgba(0,0,0,0.06))',
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%',
                    transition: 'background 0.15s',
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
                  <SgDsLibraryStack
                    direction="column"
                    gap="none"
                    style={{ flex: '1 1 0%', minWidth: 0 }}
                  >
                    <SgDsLibraryText
                      variant="body-sm"
                      weight={isSelected ? 'semibold' : 'regular'}
                      truncate={true}
                      truncateLines="1"
                    >
                      {room.creator_user?.nickname ?? '알 수 없음'}
                    </SgDsLibraryText>
                    {room.last_message && (
                      <SgDsLibraryText
                        variant="caption"
                        tone="tertiary"
                        truncate={true}
                        truncateLines="1"
                      >
                        {room.last_message}
                      </SgDsLibraryText>
                    )}
                  </SgDsLibraryStack>
                  <SgDsLibraryStack
                    direction="column"
                    align="end"
                    gap="xs"
                    style={{ flex: '0 0 auto', width: 'auto' }}
                  >
                    <SgDsLibraryText variant="caption" tone="tertiary">
                      {formatListTime(room.last_messaged_at)}
                    </SgDsLibraryText>
                    {room.unread_count > 0 && (
                      <SgDsLibraryBadge status="danger" variant="subtle" size="sm" shape="pill">
                        {room.unread_count}
                      </SgDsLibraryBadge>
                    )}
                  </SgDsLibraryStack>
                </button>
              )
            })}
          </SgDsLibraryStack>
        )}
      </SgDsLibraryStack>

      {/* ── RIGHT: chat area ── */}
      <SgDsLibraryStack
        direction="column"
        align="stretch"
        gap="none"
        style={{ flex: '1 1 auto', height: '100%', overflow: 'hidden' }}
      >
        {!dmStore.currentRoom ? (
          /* Empty state */
          <SgDsLibraryStack
            direction="column"
            align="center"
            justify="center"
            gap="md"
            style={{ flex: '1 1 auto' }}
          >
            <SgDsLibraryEmptyState
              artIcon="message-circle"
              title="대화를 선택하세요"
              body="왼쪽 목록에서 크리에이터를 선택해 대화를 시작해보세요."
              actionsSlot={null}
            />
          </SgDsLibraryStack>
        ) : (
          <>
            {/* ── Room header ── */}
            <SgDsLibraryStack
              direction="row"
              align="center"
              gap="sm"
              padding="lg"
              style={{
                borderBottom: '1px solid var(--ds-color-border-subtle, rgba(0,0,0,0.08))',
                flex: '0 0 auto',
              }}
            >
              <button
                aria-label={`${dmStore.currentRoom.creator_user?.nickname ?? '크리에이터'} 프로필 보기`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px 6px',
                  borderRadius: '8px',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLButtonElement).style.background =
                    'var(--ds-color-background-subtle, rgba(0,0,0,0.04))'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLButtonElement).style.background = 'none'
                }}
                onClick={() => {
                  const id = dmStore.currentRoom?.creator_user?.id
                  if (id) navigate(`/creator/${id}`)
                }}
              >
                <SgDsLibraryAvatar
                  src={dmStore.currentRoom.creator_user?.profile_image ?? undefined}
                  initials={(dmStore.currentRoom.creator_user?.nickname ?? 'UN')
                    .slice(0, 2)
                    .toUpperCase()}
                  tone="brand"
                  size="sm"
                  shape="circle"
                  alt={dmStore.currentRoom.creator_user?.nickname ?? ''}
                  style={{ flex: '0 0 auto' }}
                />
                <SgDsLibraryText as="h3" variant="heading-5" weight="semibold">
                  {dmStore.currentRoom.creator_user?.nickname ?? '대화'}
                </SgDsLibraryText>
              </button>
            </SgDsLibraryStack>

            {/* ── Messages ── */}
            <div
              style={{
                flex: '1 1 auto',
                overflowY: 'auto',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
              }}
            >
              {dmStore.messagesLoading && (
                <SgDsLibraryStack align="center" justify="center" padding="xl">
                  <SgDsLibraryText tone="tertiary">메시지를 불러오는 중...</SgDsLibraryText>
                </SgDsLibraryStack>
              )}

              {!dmStore.messagesLoading && messages.length === 0 && (
                <SgDsLibraryStack align="center" justify="center" padding="xl">
                  <SgDsLibraryText tone="tertiary">
                    첫 메시지를 보내보세요.
                  </SgDsLibraryText>
                </SgDsLibraryStack>
              )}

              {messages.map((chat, index) => {
                const mine = isMine(chat)
                const prev = index > 0 ? messages[index - 1] : null
                const next = index < messages.length - 1 ? messages[index + 1] : null

                // Date separator
                const showDateSep =
                  !prev ||
                  (chat.created_at && prev.created_at && !isSameDay(chat.created_at, prev.created_at))

                // Grouping: same sender, same day, close in time
                const isSameSenderAsPrev =
                  prev &&
                  prev.sender_type === chat.sender_type &&
                  prev.sender_id === chat.sender_id &&
                  !showDateSep

                const isSameSenderAsNext =
                  next &&
                  next.sender_type === chat.sender_type &&
                  next.sender_id === chat.sender_id &&
                  chat.created_at &&
                  next.created_at &&
                  isSameDay(chat.created_at, next.created_at)

                // Show avatar only for first message of a group (other side only)
                const showAvatar = !mine && !isSameSenderAsPrev

                // Bubble corner radius: consecutive messages tighten the tail corner
                const radiusMine = [
                  '18px',               // top-left
                  isSameSenderAsPrev ? '6px' : '18px',  // top-right (tail side)
                  isSameSenderAsNext ? '6px' : '18px',  // bottom-right (tail side)
                  '18px',               // bottom-left
                ].join(' ')

                const radiusOther = [
                  isSameSenderAsPrev ? '6px' : '18px',  // top-left (tail side)
                  '18px',               // top-right
                  '18px',               // bottom-right
                  isSameSenderAsNext ? '6px' : '18px',  // bottom-left (tail side)
                ].join(' ')

                // Spacing: tighter within a group
                const marginTop = showDateSep
                  ? '16px'
                  : isSameSenderAsPrev
                  ? '2px'
                  : '10px'

                return (
                  <div key={chat.id}>
                    {/* Date separator */}
                    {showDateSep && chat.created_at && (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          margin: '16px 0 12px',
                        }}
                      >
                        <div
                          style={{
                            flex: 1,
                            height: '1px',
                            background: 'var(--ds-color-border-subtle, rgba(0,0,0,0.08))',
                          }}
                        />
                        <SgDsLibraryText variant="caption" tone="tertiary">
                          {formatDateLabel(chat.created_at)}
                        </SgDsLibraryText>
                        <div
                          style={{
                            flex: 1,
                            height: '1px',
                            background: 'var(--ds-color-border-subtle, rgba(0,0,0,0.08))',
                          }}
                        />
                      </div>
                    )}

                    {/* Message row */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: mine ? 'flex-end' : 'flex-start',
                        alignItems: 'flex-end',
                        gap: '6px',
                        marginTop,
                      }}
                    >
                      {/* Other side: avatar placeholder keeps alignment */}
                      {!mine && (
                        <div style={{ width: '28px', flex: '0 0 28px' }}>
                          {showAvatar && (
                            <SgDsLibraryAvatar
                              src={dmStore.currentRoom?.creator_user?.profile_image ?? undefined}
                              initials={(dmStore.currentRoom?.creator_user?.nickname ?? 'UN')
                                .slice(0, 2)
                                .toUpperCase()}
                              tone="brand"
                              size="xs"
                              shape="circle"
                              alt={dmStore.currentRoom?.creator_user?.nickname ?? ''}
                            />
                          )}
                        </div>
                      )}

                      {/* Time (left of my bubble) */}
                      {mine && chat.created_at && (
                        <SgDsLibraryText
                          variant="caption"
                          tone="tertiary"
                          style={{ alignSelf: 'flex-end', whiteSpace: 'nowrap', flexShrink: 0 }}
                        >
                          {formatBubbleTime(chat.created_at)}
                        </SgDsLibraryText>
                      )}

                      {/* Bubble */}
                      <div
                        style={{
                          maxWidth: '70%',
                          padding: '8px 12px',
                          borderRadius: mine ? radiusMine : radiusOther,
                          background: mine
                            ? 'var(--p-color-brand-500, #ff0055)'
                            : 'var(--ds-color-background-subtle, rgba(0,0,0,0.06))',
                          color: mine
                            ? '#ffffff'
                            : 'var(--ds-color-text-default)',
                          wordBreak: 'break-word',
                        }}
                      >
                        <SgDsLibraryText
                          variant="body-sm"
                          style={{ color: 'inherit', lineHeight: '1.45' }}
                        >
                          {chat.message}
                        </SgDsLibraryText>
                      </div>

                      {/* Time (right of other bubble) */}
                      {!mine && chat.created_at && (
                        <SgDsLibraryText
                          variant="caption"
                          tone="tertiary"
                          style={{ alignSelf: 'flex-end', whiteSpace: 'nowrap', flexShrink: 0 }}
                        >
                          {formatBubbleTime(chat.created_at)}
                        </SgDsLibraryText>
                      )}
                    </div>
                  </div>
                )
              })}

              <div ref={messagesEndRef} />
            </div>

            {/* ── Input bar ── */}
            <SgDsLibraryStack
              direction="row"
              align="center"
              gap="sm"
              padding="lg"
              style={{
                borderTop: '1px solid var(--ds-color-border-subtle, rgba(0,0,0,0.08))',
                flex: '0 0 auto',
              }}
            >
              <SgDsLibraryInput
                value={messageInput}
                type="text"
                placeholder="메시지 입력..."
                size="md"
                style={{ flex: '1 1 auto' }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMessageInput(e.target.value)
                }
                onKeyDown={handleKeyDown}
              />
              <SgDsLibraryButton
                variant="primary"
                size="md"
                label="전송"
                disabled={!messageInput.trim()}
                onClick={handleSend}
                style={{ flex: '0 0 auto' }}
              />
            </SgDsLibraryStack>
          </>
        )}
      </SgDsLibraryStack>
    </SgDsLibraryStack>
  )
}
