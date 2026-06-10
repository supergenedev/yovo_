import { useEffect, useState } from 'react'
import {
  SgDsLibraryStack,
  SgDsLibraryText,
  SgDsLibraryButton,
  SgDsLibraryTabs,
  SgDsLibraryTabsList,
  SgDsLibraryTab,
  SgDsLibraryTabsBar,
  SgDsLibraryTabsPanel,
  SgDsLibraryCardGrid,
  SgDsLibraryVideoListCard,
  SgDsLibrarySectionTitleGroup,
  SgDsLibraryButtonPopover,
  SgDsLibraryPopoverList,
  SgDsLibraryPopoverItem,
  SgDsLibraryLink,
} from '@/libraries/sg-ds-library/components'
import { useLibraryStore } from '@/stores/library'

function timeAgo(ms: number | null | undefined): string {
  if (!ms) return ''
  const diff = Date.now() - ms
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return '방금 전'
  if (mins < 60) return `${mins}분 전`
  const hours = Math.floor(mins / 60)
  return hours < 24 ? `${hours}시간 전` : `${Math.floor(hours / 24)}일 전`
}

export default function LibraryPage() {
  const libraryStore = useLibraryStore()
  const [selectedTab, setSelectedTab] = useState(0)

  useEffect(() => {
    libraryStore.fetchPurchased()
  }, [])

  useEffect(() => {
    if (selectedTab === 1 && libraryStore.bookmarks.length === 0) {
      libraryStore.fetchBookmarks()
    }
  }, [selectedTab])

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
      {/* MAIN COLUMN */}
      <SgDsLibraryStack
        align="center"
        style={{ width: '100%', paddingTop: '0.75rem', overflow: 'hidden', height: '100%', flex: '1 1 auto', paddingRight: '1rem', paddingLeft: '1rem', minWidth: '600px' }}
        direction="column"
        gap="none"
      >
        <SgDsLibraryStack
          style={{ height: '100%', width: '100%', maxWidth: '1960px' }}
          as="div"
          radius="none"
          direction="column"
          align="stretch"
          justify="start"
          gap="sm"
          padding="none"
          background="none"
        >
          {/* STICKY PAGE HEADER */}
          <SgDsLibraryStack
            justify="between"
            data-wb-bg-token="surface-page"
            data-wb-bg-token-collection="sg-ds-library-semantic-color"
            background="none"
            style={{ width: '100%', paddingTop: 'var(--ds-spacing-space-2)', top: '0px', zIndex: 2, paddingBottom: 'var(--ds-spacing-space-3)' }}
            as="header"
            direction="row"
            align="center"
            gap="md"
            wrap={false}
          >
            <SgDsLibraryStack direction="column" gap="xs" flex="1 1 auto">
              <SgDsLibraryText as="h1" tone="primary" variant="heading-1" weight="bold" truncateLines="1" align="start">구매목록</SgDsLibraryText>
            </SgDsLibraryStack>
            <SgDsLibraryButton shape="pill" variant="soft" size="md" leadingIcon="sliders-horizontal" iconOnly aria-label="라이브러리 설정" />
          </SgDsLibraryStack>

          {/* SCROLLING CONTENT */}
          <SgDsLibraryStack
            scrollFade={false}
            style={{ width: '100%', overflow: 'hidden', flex: '1 1 auto' }}
            as="div"
            radius="md"
            direction="column"
            align="center"
            justify="start"
            gap="2xl"
            padding="none"
            background="none"
          >
            <SgDsLibraryTabs sticky={true} style={{ width: '100%', flexDirection: 'column', overflow: 'scroll' }} variant="underline" size="lg">
              <SgDsLibraryTabsBar style={{ width: '100%', display: 'flex', alignItems: 'center', height: 'fit-content' }}>
                <SgDsLibraryTabsList style={{ width: '100%', paddingTop: 'var(--ds-spacing-space-1)', height: 'fit-content', borderStyle: 'none' }}>
                  <SgDsLibraryTab
                    leadingIcon="list-video"
                    badgeText="10"
                    badge={true}
                    badgeVariant="neutral"
                    selected={selectedTab === 0}
                    onClick={() => setSelectedTab(0)}
                  >구매한 작품</SgDsLibraryTab>
                  <SgDsLibraryTab
                    leadingIcon="bookmark"
                    badgeText="8"
                    badge={true}
                    badgeVariant="neutral"
                    selected={selectedTab === 1}
                    onClick={() => setSelectedTab(1)}
                  >즐겨찾기</SgDsLibraryTab>
                  <SgDsLibraryTab
                    leadingIcon="clock"
                    badgeText="12"
                    badge={true}
                    badgeVariant="neutral"
                    selected={selectedTab === 2}
                    onClick={() => setSelectedTab(2)}
                  >최근 본</SgDsLibraryTab>
                </SgDsLibraryTabsList>
              </SgDsLibraryTabsBar>

              {/* 구매한 작품 탭 */}
              <SgDsLibraryTabsPanel style={{ width: '100%', paddingTop: 'var(--ds-spacing-space-4)' }} selected={selectedTab === 0}>
                <SgDsLibraryStack scrollFade={false} style={{ width: '100%' }} direction="column" gap="md">
                  {/* TOOLBAR */}
                  <SgDsLibraryStack direction="row" align="center" gap="md" wrap={false}>
                    <SgDsLibraryStack flex="1 1 auto" minWidth="0">
                      <SgDsLibraryTabs ariaLabel="카테고리 필터" size="md" variant="pill">
                        <SgDsLibraryTabsList>
                          <SgDsLibraryTab selected leadingIcon="layout-grid">전체</SgDsLibraryTab>
                          <SgDsLibraryTab leadingIcon="headphones">보이스드라마</SgDsLibraryTab>
                          <SgDsLibraryTab leadingIcon="clapperboard">시네마틱</SgDsLibraryTab>
                          <SgDsLibraryTab leadingIcon="ear">ASMR</SgDsLibraryTab>
                          <SgDsLibraryTab leadingIcon="film">단편영상</SgDsLibraryTab>
                          <SgDsLibraryTab leadingIcon="sparkles">애니메이션</SgDsLibraryTab>
                          <SgDsLibraryTab leadingIcon="play">MV</SgDsLibraryTab>
                          <SgDsLibraryTab leadingIcon="video">Vlog</SgDsLibraryTab>
                        </SgDsLibraryTabsList>
                      </SgDsLibraryTabs>
                    </SgDsLibraryStack>
                    <SgDsLibrarySectionTitleGroup align="end">
                      <SgDsLibraryButtonPopover trailingIcon="chevron-down" placement="bottom-end" buttonLabel="최신순" buttonShape="default" buttonSize="sm" buttonVariant="ghost" closeOnItemClick={true}>
                        <SgDsLibraryPopoverList>
                          <SgDsLibraryPopoverItem icon="clock">최신순</SgDsLibraryPopoverItem>
                          <SgDsLibraryPopoverItem icon="flame">인기순</SgDsLibraryPopoverItem>
                          <SgDsLibraryPopoverItem icon="sparkles">추천순</SgDsLibraryPopoverItem>
                        </SgDsLibraryPopoverList>
                      </SgDsLibraryButtonPopover>
                    </SgDsLibrarySectionTitleGroup>
                  </SgDsLibraryStack>

                  {/* 로딩 */}
                  {libraryStore.loading && libraryStore.purchased.length === 0 && (
                    <SgDsLibraryText tone="tertiary">불러오는 중...</SgDsLibraryText>
                  )}

                  {/* 빈 상태 */}
                  {!libraryStore.loading && libraryStore.purchased.length === 0 && (
                    <SgDsLibraryText tone="tertiary">구매한 작품이 없습니다.</SgDsLibraryText>
                  )}

                  {/* CARD GRID */}
                  {libraryStore.purchased.length > 0 && (
                    <SgDsLibraryCardGrid
                      itemMinSize="200px"
                      itemMaxSize="280px"
                      style={{ width: '100%' }}
                      cols="4"
                      count={String(libraryStore.purchased.length)}
                      itemSize="auto"
                      layout="grid"
                      gap="sm"
                      arrows={false}
                      scroll="smooth"
                    >
                      {libraryStore.purchased.map((post: any) => (
                        <SgDsLibraryStack
                          key={post.id}
                          as="article"
                          direction="column"
                          gap="xxs"
                          style={{ width: '100%', height: 'fit-content' }}
                        >
                          <SgDsLibraryVideoListCard
                            thumbnailImageUrl={post.locked_thumbnail_url ?? undefined}
                            avatarSrc={post.creator_user?.profile_image ?? undefined}
                            style={{ height: 'fit-content' }}
                            title={post.title_ko ?? post.title ?? ''}
                            creatorName={post.creator_user?.nickname ?? ''}
                            meta={timeAgo(post.created_at)}
                            thumbnailAspect="16/9"
                            avatarAlt={post.creator_user?.nickname ?? ''}
                            avatarInitials={(post.creator_user?.nickname ?? '?')[0]}
                            showGrain={true}
                            variant="vertical"
                            avatarTone="neutral"
                            titleLines="3"
                            size="sm"
                            avatarSize="sm"
                            avatarShape="circle"
                            actionIcon="ellipsis"
                            showAction={true}
                          />
                        </SgDsLibraryStack>
                      ))}
                    </SgDsLibraryCardGrid>
                  )}

                  {/* LOAD MORE */}
                  {libraryStore.hasPurchasedMore() && (
                    <SgDsLibraryStack direction="row" justify="center" padding="lg" style={{ width: '100%' }}>
                      <SgDsLibraryButton
                        variant="soft"
                        shape="pill"
                        size="md"
                        trailingIcon="chevron-down"
                        onClick={() => libraryStore.fetchPurchased((libraryStore.purchasedMeta?.page ?? 1) + 1)}
                      >
                        더 많은 작품 불러오기
                      </SgDsLibraryButton>
                    </SgDsLibraryStack>
                  )}
                </SgDsLibraryStack>
              </SgDsLibraryTabsPanel>

              {/* 즐겨찾기 탭 */}
              <SgDsLibraryTabsPanel style={{ width: '100%', paddingTop: 'var(--ds-spacing-space-4)' }} selected={selectedTab === 1}>
                <SgDsLibraryStack scrollFade={false} style={{ width: '100%' }} direction="column" gap="md">
                  {libraryStore.loading && libraryStore.bookmarks.length === 0 && (
                    <SgDsLibraryText tone="tertiary">불러오는 중...</SgDsLibraryText>
                  )}
                  {!libraryStore.loading && libraryStore.bookmarks.length === 0 && (
                    <SgDsLibraryText tone="tertiary">즐겨찾기한 작품이 없습니다.</SgDsLibraryText>
                  )}
                  {libraryStore.bookmarks.length > 0 && (
                    <SgDsLibraryCardGrid
                      itemMinSize="200px"
                      itemMaxSize="280px"
                      style={{ width: '100%' }}
                      cols="4"
                      count={String(libraryStore.bookmarks.length)}
                      itemSize="auto"
                      layout="grid"
                      gap="sm"
                      arrows={false}
                      scroll="smooth"
                    >
                      {libraryStore.bookmarks.map((post: any) => (
                        <SgDsLibraryStack
                          key={post.id}
                          as="article"
                          direction="column"
                          gap="xxs"
                          style={{ width: '100%', height: 'fit-content' }}
                        >
                          <SgDsLibraryVideoListCard
                            thumbnailImageUrl={post.locked_thumbnail_url ?? undefined}
                            avatarSrc={post.creator_user?.profile_image ?? undefined}
                            style={{ height: 'fit-content' }}
                            title={post.title_ko ?? post.title ?? ''}
                            creatorName={post.creator_user?.nickname ?? ''}
                            meta={timeAgo(post.created_at)}
                            thumbnailAspect="16/9"
                            avatarAlt={post.creator_user?.nickname ?? ''}
                            avatarInitials={(post.creator_user?.nickname ?? '?')[0]}
                            showGrain={true}
                            variant="vertical"
                            avatarTone="neutral"
                            titleLines="3"
                            size="sm"
                            avatarSize="sm"
                            avatarShape="circle"
                            actionIcon="ellipsis"
                            showAction={true}
                          />
                        </SgDsLibraryStack>
                      ))}
                    </SgDsLibraryCardGrid>
                  )}
                  {libraryStore.hasMore() && (
                    <SgDsLibraryStack direction="row" justify="center" padding="lg" style={{ width: '100%' }}>
                      <SgDsLibraryButton variant="soft" shape="pill" size="md" trailingIcon="chevron-down" onClick={() => libraryStore.loadMore()}>
                        더 많은 작품 불러오기
                      </SgDsLibraryButton>
                    </SgDsLibraryStack>
                  )}
                </SgDsLibraryStack>
              </SgDsLibraryTabsPanel>

              {/* 최근 본 탭 — 더미 */}
              <SgDsLibraryTabsPanel style={{ width: '100%', paddingTop: 'var(--ds-spacing-space-4)' }} selected={selectedTab === 2}>
                <SgDsLibraryText tone="tertiary">최근 본 작품이 없습니다.</SgDsLibraryText>
              </SgDsLibraryTabsPanel>

              {/* FOOTER */}
              <SgDsLibraryStack
                style={{ height: 'fit-content', marginTop: 'auto', width: '100%' }}
                justify="center"
                align="center"
                padding="xl"
                background="none"
                direction="row"
                wrap={true}
                gap="none"
              >
                <SgDsLibraryStack wrap={true} as="div" radius="none" direction="row" align="stretch" justify="center" gap="sm" padding="none" background="none">
                  <SgDsLibraryLink variant="subtle" size="sm">소개</SgDsLibraryLink>
                  <SgDsLibraryLink variant="subtle" size="sm">크리에이터 가이드</SgDsLibraryLink>
                  <SgDsLibraryLink variant="subtle" size="sm">크레딧 정책</SgDsLibraryLink>
                  <SgDsLibraryLink variant="subtle" size="sm">고객지원</SgDsLibraryLink>
                  <SgDsLibraryLink variant="subtle" size="sm">한국어</SgDsLibraryLink>
                </SgDsLibraryStack>
                <SgDsLibraryStack justify="center" direction="row" width="100%" marginTop="12px">© 2026 YOVO</SgDsLibraryStack>
              </SgDsLibraryStack>
            </SgDsLibraryTabs>
          </SgDsLibraryStack>
        </SgDsLibraryStack>
      </SgDsLibraryStack>
    </SgDsLibraryStack>
  )
}
