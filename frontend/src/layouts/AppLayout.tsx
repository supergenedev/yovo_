import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  SgDsLibrarySidebar,
  SgDsLibrarySidebarGroup,
  SgDsLibrarySidebarItem,
  SgDsLibrarySidebarFollowRow,
  SgDsLibraryUserBlock,
  SgDsLibraryButtonPopover,
  SgDsLibraryPopoverList,
  SgDsLibraryPopoverItem,
} from '@/libraries/sg-ds-library/components'
import { useMeStore } from '@/stores/me'
import { useNotificationStore } from '@/stores/notification'
import { useAuthStore } from '@/stores/auth'

function getInitials(name?: string | null): string {
  if (!name) return '?'
  const words = name.trim().split(/\s+/)
  return words.length >= 2 ? (words[0][0] + words[1][0]).toUpperCase() : name.slice(0, 2).toUpperCase()
}

// 앱 전체에서 유일한 네비게이션 마운트 지점.
// 사이드바는 여기서만 렌더되고, 각 페이지는 <Outlet/>으로 갈아끼워진다.
export default function AppLayout() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const me = useMeStore()
  const unreadCount = useNotificationStore((s) => s.unreadCount)
  const fetchUnreadCount = useNotificationStore((s) => s.fetchUnreadCount)
  const logout = useAuthStore((s) => s.logout)

  useEffect(() => {
    me.fetchMe()
    me.fetchFollowing()
    fetchUnreadCount()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleLogout() {
    await logout()
    navigate('/auth')
  }

  return (
    <div style={{ display: 'flex', width: '100%', minHeight: '100vh', overflow: 'hidden' }}>
      <SgDsLibrarySidebar
        style={{ height: '100%' }}
        collapsed={false}
        collapsedWidth="64"
        presentation="sidebar"
        width="272px"
        background="none"
        bordered={false}
        radius="none"
        brandMarkText="Y"
        headerLogoImage="/workbench-assets/icons/logo-mpks329o.svg"
        headerSymbolImage="/workbench-assets/icons/symbol-mpks329n.svg"
        expandedBrandDisplay="symbol-logo"
        height="100vh"
      >
        <SgDsLibrarySidebarGroup style={{ height: 'fit-content' }}>
          <SgDsLibrarySidebarItem
            emphasized
            badgeVariant="subtle"
            icon="plus"
            label="작품 만들기"
            active={pathname === '/create'}
            onClick={() => navigate('/create')}
          />
        </SgDsLibrarySidebarGroup>

        <SgDsLibrarySidebarGroup>
          <SgDsLibrarySidebarItem icon="house" label="홈" active={pathname === '/'} onClick={() => navigate('/')} />
          <SgDsLibrarySidebarItem
            icon="video"
            label="VIDEO"
            active={pathname.startsWith('/video')}
            onClick={() => navigate('/video')}
          />
          <SgDsLibrarySidebarItem
            icon="user-star"
            label="크리에이터"
            badgeStatus="info"
            badgeVariant="subtle"
            active={pathname.startsWith('/creator')}
            onClick={() => navigate('/creator')}
          />
          <SgDsLibrarySidebarItem
            icon="messages-square"
            label="채팅"
            active={pathname === '/dm'}
            onClick={() => navigate('/dm')}
          />
          <SgDsLibrarySidebarItem
            badge={unreadCount > 0 ? String(unreadCount) : undefined}
            icon="bell-dot"
            label="알림"
            active={pathname === '/notification'}
            onClick={() => navigate('/notification')}
          />
          <SgDsLibrarySidebarItem
            icon="book-marked"
            label="라이브러리"
            active={pathname === '/library'}
            onClick={() => navigate('/library')}
          />
        </SgDsLibrarySidebarGroup>

        <SgDsLibrarySidebarGroup count={me.following.length ? String(me.following.length) : undefined} seeAllLabel="모두보기" label="팔로잉">
          {me.following.map((creator: any) => (
            <SgDsLibrarySidebarFollowRow
              key={creator.id}
              avatarSrc={creator.profile_image ?? undefined}
              name={creator.nickname ?? ''}
              initials={getInitials(creator.nickname)}
              size="sm"
              avatarTone="brand"
              as="button"
              onClick={() => navigate(`/creator/${creator.id}`)}
            />
          ))}
        </SgDsLibrarySidebarGroup>

        <SgDsLibrarySidebarGroup style={{ height: '100%' }} label="프로필" seeAllIcon="chevron-right">
          <SgDsLibraryUserBlock
            avatarSize="md"
            avatarSrc={me.user?.profile_image ?? undefined}
            style={{ width: '100%' }}
            name={me.user?.nickname ?? ''}
            meta={me.user?.username ? `@${me.user.username}` : '팬'}
            initials={getInitials(me.user?.nickname)}
            avatarTone="brand"
            size="md"
          >
            <SgDsLibraryButtonPopover
              leadingIcon="ellipsis"
              iconOnly
              trailingIcon="chevron-down"
              placement="top-end"
              buttonLabel="메뉴"
              buttonShape="pill"
              buttonSize="sm"
              buttonVariant="ghost"
              closeOnItemClick
            >
              <SgDsLibraryPopoverList>
                <SgDsLibraryPopoverItem icon="log-out" onClick={handleLogout}>
                  로그아웃
                </SgDsLibraryPopoverItem>
              </SgDsLibraryPopoverList>
            </SgDsLibraryButtonPopover>
          </SgDsLibraryUserBlock>
        </SgDsLibrarySidebarGroup>
      </SgDsLibrarySidebar>

      <div style={{ flex: 1, minWidth: 0, display: 'flex', overflow: 'hidden' }}>
        <Outlet />
      </div>
    </div>
  )
}
