import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  SgDsLibraryStack,
  SgDsLibraryText,
  SgDsLibraryButton,
  SgDsLibraryBadge,
  SgDsLibraryTabs,
  SgDsLibraryTabsList,
  SgDsLibraryTab,
  SgDsLibraryTabsBar,
  SgDsLibraryTabsPanel,
  SgDsLibraryCard,
  SgDsLibraryAvatar,
  SgDsLibraryIcon,
  SgDsLibraryDivider,
  SgDsLibrarySwitch,
  SgDsLibraryButtonPopover,
  SgDsLibraryPopoverList,
  SgDsLibraryPopoverItem,
} from '@/libraries/sg-ds-library/components'
import { useNotificationStore } from '@/stores/notification'

function timeAgo(ms: number | null | undefined): string {
  if (!ms) return ''
  const diff = Date.now() - ms
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return '방금 전'
  if (mins < 60) return `${mins}분 전`
  const hours = Math.floor(mins / 60)
  return hours < 24 ? `${hours}시간 전` : `${Math.floor(hours / 24)}일 전`
}

const TYPE_CONFIG: Record<string, { badgeLabel: string; badgeStatus: 'danger' | 'info' | 'warning' | 'success' | 'neutral' }> = {
  new_post:       { badgeLabel: '새 작품', badgeStatus: 'danger' },
  post_commented: { badgeLabel: '답글', badgeStatus: 'info' },
  post_liked:     { badgeLabel: '좋아요', badgeStatus: 'warning' },
  new_follower:   { badgeLabel: '팔로우', badgeStatus: 'success' },
  post_tipped:    { badgeLabel: '팁', badgeStatus: 'warning' },
  yovo:           { badgeLabel: 'yovo 소식', badgeStatus: 'neutral' },
}

function getTypeConfig(type: string) {
  return TYPE_CONFIG[type] ?? { badgeLabel: type, badgeStatus: 'neutral' as const }
}

const SETTING_KEYS = ['notif_new_post', 'notif_subscription', 'notif_comments', 'notif_yovo'] as const
type SettingKey = typeof SETTING_KEYS[number]
const SETTING_DEFAULTS: Record<SettingKey, boolean> = {
  notif_new_post: true,
  notif_subscription: true,
  notif_comments: true,
  notif_yovo: false,
}

function loadSettings(): Record<SettingKey, boolean> {
  const result = { ...SETTING_DEFAULTS }
  for (const key of SETTING_KEYS) {
    const val = localStorage.getItem(key)
    if (val !== null) result[key] = val === 'true'
  }
  return result
}

type SortOrder = 'latest' | 'unread_first'

export default function NotificationPage() {
  const navigate = useNavigate()
  const notifStore = useNotificationStore()
  const [selectedTab, setSelectedTab] = useState(0)
  const [sortOrder, setSortOrder] = useState<SortOrder>('latest')
  const [sortLabel, setSortLabel] = useState('최신순')
  const [settings, setSettings] = useState<Record<SettingKey, boolean>>(loadSettings)

  useEffect(() => {
    notifStore.fetchNotifications()
    notifStore.fetchUnreadCount()
    notifStore.fetchTabCounts()
  }, [])

  const { tabCounts, unreadCount, notifications, loading } = notifStore

  const tabDefs = [
    { key: 'all',     label: `전체 ${tabCounts.total || ''}`,    icon: 'inbox',         filter: null },
    { key: 'new',     label: `새 작품 ${tabCounts.new_post || ''}`, icon: 'sparkles',   filter: 'new_post' },
    { key: 'replies', label: `답글 ${tabCounts.replies || ''}`,  icon: 'message-circle', filter: 'post_commented' },
    { key: 'yovo',    label: `yovo 소식 ${tabCounts.yovo || ''}`, icon: 'megaphone',   filter: 'yovo' },
  ]

  const currentFilter = tabDefs[selectedTab]?.filter
  let filtered = currentFilter
    ? notifications.filter((n: any) => n.notification_type === currentFilter)
    : notifications

  if (sortOrder === 'unread_first') {
    filtered = [...filtered].sort((a: any, b: any) => {
      if (a.read === b.read) return (b.created_at ?? 0) - (a.created_at ?? 0)
      return a.read ? 1 : -1
    })
  }

  function handleSortChange(order: SortOrder, label: string) {
    setSortOrder(order)
    setSortLabel(label)
  }

  function handleSettingChange(key: SettingKey, value: boolean) {
    localStorage.setItem(key, String(value))
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  function handleNotifClick(n: any) {
    notifStore.markRead(n.id)
    if (!n.notifiable) return
    if (n.notifiable.type === 'post') {
      navigate('/video/' + n.notifiable.id)
    } else if (n.notifiable.type === 'creator_user') {
      navigate('/creator/' + n.notifiable.id)
    }
  }

  return (
    <SgDsLibraryStack
      style={{ width: '100%', height: '100%', overflow: 'hidden' }}
      as="main"
      data-wb-bg-token="surface-page"
      data-wb-bg-token-collection="sg-ds-library-semantic-color"
      direction="column"
      align="stretch"
      gap="none"
    >
      <SgDsLibraryStack
        justify="start"
        scrollFade={false}
        align="center"
        style={{ width: '100%', minWidth: 'var(--ds-spacing-dialog-max-width-md)', paddingTop: '0.75rem', overflow: 'hidden', height: '100%', flex: '1 1 auto', paddingRight: 'var(--ds-spacing-space-4)', paddingLeft: 'var(--ds-spacing-space-4)' }}
        direction="column"
        gap="none"
      >
        <SgDsLibraryStack
          style={{ height: '100%', overflow: 'hidden', width: '100%', maxWidth: '1200px' }}
          as="div"
          radius="none"
          direction="column"
          align="center"
          justify="start"
          gap="xs"
          padding="none"
          background="none"
        >
          {/* HEADER */}
          <SgDsLibraryStack
            data-wb-bg-token="surface-page"
            data-wb-bg-token-collection="sg-ds-library-semantic-color"
            background="none"
            style={{ height: 'fit-content', width: '100%', paddingTop: 'var(--ds-spacing-space-2)', top: '0px', position: 'sticky', zIndex: 1, paddingBottom: 'var(--ds-spacing-space-3)' }}
            as="header"
            direction="row"
            align="center"
            gap="md"
            wrap={false}
          >
            <SgDsLibraryStack as="div" radius="none" direction="row" align="center" justify="start" gap="xs" padding="none" background="none">
              <SgDsLibraryText style={{ width: 'fit-content' }} as="h1" variant="heading-1" weight="bold">알림</SgDsLibraryText>
              {unreadCount > 0 && (
                <SgDsLibraryBadge style={{ width: 'fit-content' }} status="danger" variant="subtle" size="md" shape="pill">
                  {unreadCount}개 안읽음
                </SgDsLibraryBadge>
              )}
            </SgDsLibraryStack>
            <SgDsLibraryButtonPopover
              leadingIcon="ellipsis"
              iconOnly
              placement="bottom-end"
              buttonLabel="더보기"
              buttonShape="pill"
              buttonSize="md"
              buttonVariant="soft"
              closeOnItemClick={true}
            >
              <SgDsLibraryPopoverList>
                <SgDsLibraryPopoverItem icon="check-check" onClick={() => notifStore.readAll()}>모두 읽음</SgDsLibraryPopoverItem>
              </SgDsLibraryPopoverList>
            </SgDsLibraryButtonPopover>
          </SgDsLibraryStack>

          {/* BODY: main feed + settings aside */}
          <SgDsLibraryStack
            scrollFade={false}
            style={{ width: '100%', flex: '1 1 auto', overflow: 'scroll' }}
            as="div"
            radius="md"
            direction="row"
            align="stretch"
            justify="start"
            gap="2xl"
            padding="none"
            background="none"
          >
            {/* MAIN FEED */}
            <SgDsLibraryStack
              scrollFade={false}
              style={{ width: '100%', overflow: 'scroll', flex: '1 1 auto' }}
              as="div"
              radius="md"
              direction="column"
              align="center"
              justify="start"
              gap="md"
              padding="none"
              background="none"
            >
              <SgDsLibraryTabs
                sticky={true}
                style={{ width: '100%', height: 'fit-content', paddingBottom: 'var(--ds-spacing-space-8)' }}
                variant="pill"
                size="md"
              >
                <SgDsLibraryTabsBar style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-space-3)', paddingBottom: 'var(--ds-spacing-space-4)' }}>
                  <SgDsLibraryTabsList label="알림 필터" style={{ flex: '1 1 auto', minWidth: '0' }}>
                    {tabDefs.map((tab, i) => (
                      <SgDsLibraryTab
                        key={tab.key}
                        selected={selectedTab === i}
                        leadingIcon={tab.icon}
                        onClick={() => setSelectedTab(i)}
                      >
                        {tab.label}
                      </SgDsLibraryTab>
                    ))}
                  </SgDsLibraryTabsList>
                  <SgDsLibraryButtonPopover trailingIcon="chevron-down" placement="bottom-end" buttonLabel={sortLabel} buttonShape="pill" buttonSize="sm" buttonVariant="soft" closeOnItemClick={true}>
                    <SgDsLibraryPopoverList>
                      <SgDsLibraryPopoverItem icon="clock" onClick={() => handleSortChange('latest', '최신순')}>최신순</SgDsLibraryPopoverItem>
                      <SgDsLibraryPopoverItem icon="bell-dot" onClick={() => handleSortChange('unread_first', '안읽음 먼저')}>안읽음 먼저</SgDsLibraryPopoverItem>
                    </SgDsLibraryPopoverList>
                  </SgDsLibraryButtonPopover>
                </SgDsLibraryTabsBar>

                <SgDsLibraryTabsPanel selected={true} style={{ width: '100%' }}>
                  <SgDsLibraryStack style={{ paddingTop: 'var(--ds-spacing-space-4)' }} direction="column" align="stretch" justify="start" gap="xl" padding="none" background="none">

                    {loading && notifications.length === 0 && (
                      <SgDsLibraryText tone="tertiary">불러오는 중...</SgDsLibraryText>
                    )}

                    {!loading && filtered.length === 0 && (
                      <SgDsLibraryText tone="tertiary">알림이 없습니다.</SgDsLibraryText>
                    )}

                    {filtered.length > 0 && (
                      <SgDsLibraryStack direction="column" gap="xs" width="100%">
                        <SgDsLibraryCard variant="bare" padding="sm" gap="none">
                          {filtered.map((n: any, idx: number) => {
                            const cfg = getTypeConfig(n.notification_type ?? '')
                            const isUnread = !n.read
                            return (
                              <div key={n.id}>
                                <SgDsLibraryStack
                                  background={isUnread ? 'surface' : 'none'}
                                  as="article"
                                  direction="row"
                                  align="start"
                                  justify="start"
                                  gap="md"
                                  padding="md"
                                  radius="md"
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => handleNotifClick(n)}
                                >
                                  <SgDsLibraryStack direction="row" align="center" gap="xs" width="auto" style={{ flex: '0 0 auto' }}>
                                    {isUnread && (
                                      <SgDsLibraryStack width="auto" radius="pill" style={{ width: '8px', height: '8px', background: 'var(--ds-color-brand-bg)', flex: '0 0 auto' }} />
                                    )}
                                    {!isUnread && (
                                      <SgDsLibraryStack width="auto" style={{ width: '8px', flex: '0 0 auto' }} />
                                    )}
                                    <SgDsLibraryAvatar
                                      src={n.actor?.profile_image ?? undefined}
                                      initials={(n.actor?.nickname ?? 'U')[0]}
                                      size="md"
                                      shape="circle"
                                      tone="brand"
                                      alt={n.actor?.nickname ?? ''}
                                    />
                                  </SgDsLibraryStack>
                                  <SgDsLibraryStack direction="column" gap="xxs" style={{ flex: '1 1 auto', minWidth: '0' }}>
                                    <SgDsLibraryStack direction="row" align="center" gap="xxs" wrap={true}>
                                      <SgDsLibraryText as="span" variant="body" weight="semibold">
                                        {n.actor?.nickname ?? 'YOVO'}
                                      </SgDsLibraryText>
                                      {n.actor?.verified && <SgDsLibraryIcon name="badge-check" size="14px" />}
                                      <SgDsLibraryBadge status={cfg.badgeStatus} variant="subtle" size="sm" shape="pill">
                                        {cfg.badgeLabel}
                                      </SgDsLibraryBadge>
                                    </SgDsLibraryStack>
                                    <SgDsLibraryText as="p" variant="body-sm" tone="secondary">
                                      {n.body ?? n.message ?? ''}
                                    </SgDsLibraryText>
                                    {n.target_title && (
                                      <SgDsLibraryText as="p" variant="caption" tone="tertiary" truncate={true} truncateLines="1">
                                        {n.target_title}
                                      </SgDsLibraryText>
                                    )}
                                  </SgDsLibraryStack>
                                  <SgDsLibraryStack direction="column" align="end" gap="xs" width="auto" style={{ flex: '0 0 auto' }}>
                                    <SgDsLibraryText as="span" variant="caption" tone="tertiary">
                                      {timeAgo(n.created_at)}
                                    </SgDsLibraryText>
                                  </SgDsLibraryStack>
                                </SgDsLibraryStack>
                                {idx < filtered.length - 1 && (
                                  <SgDsLibraryDivider orientation="horizontal" variant="solid" inset="none" />
                                )}
                              </div>
                            )
                          })}
                        </SgDsLibraryCard>
                      </SgDsLibraryStack>
                    )}

                    {/* Load more */}
                    {notifStore.hasMore() && (
                      <SgDsLibraryStack direction="row" justify="center" marginTop="var(--ds-spacing-space-4)" padding="var(--ds-spacing-space-4)" height="40px">
                        <SgDsLibraryButton
                          variant="ghost"
                          size="sm"
                          label="이전 알림 더 보기"
                          trailingIcon="chevron-down"
                          onClick={() => notifStore.fetchNotifications((notifStore.meta?.page ?? 1) + 1)}
                        />
                      </SgDsLibraryStack>
                    )}
                  </SgDsLibraryStack>
                </SgDsLibraryTabsPanel>
              </SgDsLibraryTabs>
            </SgDsLibraryStack>

            {/* ASIDE: notification settings */}
            <SgDsLibraryStack
              style={{ height: 'fit-content', paddingBottom: '1rem', maxWidth: '240px', minWidth: '160px', position: 'sticky', top: '0' }}
              as="aside"
              align="stretch"
              gap="2xl"
              padding="none"
            >
              <SgDsLibraryStack background="soft" padding="lg" as="section" direction="column" gap="md" aria-label="알림 설정">
                <SgDsLibraryStack direction="row" align="center" justify="between">
                  <SgDsLibraryText lineHeight="1em" as="h3" variant="ui" weight="semibold">알림 설정</SgDsLibraryText>
                </SgDsLibraryStack>
                <SgDsLibraryStack direction="column" gap="sm">
                  <SgDsLibrarySwitch
                    size="md"
                    label="새 작품"
                    checked={settings.notif_new_post}
                    onChange={(e: any) => handleSettingChange('notif_new_post', e.target.checked)}
                  />
                  <SgDsLibrarySwitch
                    size="md"
                    label="구독 갱신 안내"
                    checked={settings.notif_subscription}
                    onChange={(e: any) => handleSettingChange('notif_subscription', e.target.checked)}
                  />
                  <SgDsLibrarySwitch
                    size="md"
                    label="답글·댓글"
                    checked={settings.notif_comments}
                    onChange={(e: any) => handleSettingChange('notif_comments', e.target.checked)}
                  />
                  <SgDsLibrarySwitch
                    size="md"
                    label="yovo 소식"
                    checked={settings.notif_yovo}
                    onChange={(e: any) => handleSettingChange('notif_yovo', e.target.checked)}
                  />
                </SgDsLibraryStack>
              </SgDsLibraryStack>
            </SgDsLibraryStack>
          </SgDsLibraryStack>
        </SgDsLibraryStack>
      </SgDsLibraryStack>
    </SgDsLibraryStack>
  )
}
