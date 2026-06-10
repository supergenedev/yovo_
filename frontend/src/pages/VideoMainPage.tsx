import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  SgDsLibrarySectionTitle,
  SgDsLibrarySectionTitleGroup,
  SgDsLibraryCardGrid,
  SgDsLibraryMediaFrame,
  SgDsLibraryText,
  SgDsLibraryPopoverList,
  SgDsLibraryPopoverItem,
  SgDsLibraryButtonPopover,
  SgDsLibraryButton,
  SgDsLibraryVideoListCard,
  SgDsLibraryTabsList,
  SgDsLibraryTabs,
  SgDsLibraryTab,
  SgDsLibraryInput,
  SgDsLibraryStack,
} from '@/libraries/sg-ds-library/components'
import { useVideoStore } from '@/stores/video'

function timeAgo(ms?: number | string | null): string {
  if (!ms) return ''
  const diff = Date.now() - Number(ms)
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return '방금 전'
  if (mins < 60) return `${mins}분 전`
  const hours = Math.floor(mins / 60)
  return hours < 24 ? `${hours}시간 전` : `${Math.floor(hours / 24)}일 전`
}

export default function VideoMainPage() {
  const navigate = useNavigate()
  const { posts, loading, fetchVideoPosts, loadMore, hasMore } = useVideoStore()

  useEffect(() => {
    fetchVideoPosts()
  }, [])

  return (
    <SgDsLibraryStack
      data-wb-bg-token="surface-page"
      data-wb-bg-token-collection="sg-ds-library-semantic-color"
      style={{ width: '100%', height: '100%', overflow: 'hidden' }}
      as="div"
      radius="none"
      direction="row"
      align="stretch"
      justify="start"
      gap="lg"
      padding="none"
      background="none"
    >
      <SgDsLibraryStack
        style={{ height: '100%', overflow: 'scroll', width: '100%', minWidth: '800px' }}
        as="section"
        justify="start"
        wrap={false}
        direction="column"
        align="center"
        gap="2xl"
        padding="lg"
      >
        {/* VIDEO header */}
        <SgDsLibraryStack
          as="div"
          radius="none"
          direction="column"
          align="center"
          justify="start"
          gap="md"
          padding="none"
          background="none"
        >
          <SgDsLibrarySectionTitle
            style={{ width: '100%' }}
            title="VIDEO"
            icon="sparkles"
            as="header"
            align="center"
            iconTone="purple"
            showIcon={false}
            subtitleTone="tertiary"
            subtitleVariant="body-sm"
            titleAs="h1"
            titleVariant="heading-1"
            titleWeight="bold"
            wrapActions={true}
          >
            <SgDsLibrarySectionTitleGroup
              style={{ width: '100%', flex: '0 1 auto', maxWidth: 'var(--ds-spacing-dialog-max-width-sm)' }}
              align="end"
            >
              <SgDsLibraryInput
                style={{ width: '100%' }}
                shape="pill"
                clearable={true}
                labelPosition="outside"
                type="search"
                placeholder="제목, 크리에이터, 태그 검색"
                leadingIcon="search"
                size="md"
              />
            </SgDsLibrarySectionTitleGroup>
          </SgDsLibrarySectionTitle>

          {/* Featured media strip - dummy (no backend endpoint for curated picks) */}
          <SgDsLibraryCardGrid
            itemProps={posts.slice(0, 6).map((p) => ({ src: p.thumbnail_url ?? '' }))}
            itemSizeOverride="640px"
            shadow={false}
            itemSize="custom"
            count="6"
            cols="3"
            arrows={false}
            layout="row"
            gap="lg"
            scroll="smooth"
            itemAspectRatio="16 / 9"
            edgeFade="fade"
          >
            {posts.slice(0, 1).map((p) => (
              <SgDsLibraryMediaFrame
                key={p.id}
                style={{ width: '100%', height: 'fit-content', cursor: 'pointer' }}
                live={false}
                src={p.thumbnail_url ?? ''}
                locked={false}
                duration={p.duration ?? ''}
                progress={0}
                progressLabel="Media progress"
                playLabel="Play"
                liveLabel="LIVE"
                aspect="16/9"
                badgeVariant="solid"
                badgeStatus="danger"
                lockIcon="lock"
                lockActionVariant="primary"
                lockActionSize="sm"
                lockActionShape="pill"
                showPlay={true}
                showGrain={true}
                size="md"
                background="linear-gradient(140deg, #0c1429, #4c1d95 50%, #be185d)"
                onClick={() => navigate(`/video/${p.id}`)}
              />
            ))}
          </SgDsLibraryCardGrid>
        </SgDsLibraryStack>

        {/* 실시간 TOP 10 - dummy (no ranking endpoint) */}
        <SgDsLibraryStack style={{ maxWidth: '1400px' }} as="section" direction="column" gap="sm">
          <SgDsLibrarySectionTitle
            style={{ width: '100%' }}
            title="실시간 TOP 10"
            icon="trophy"
            as="header"
            align="center"
            iconTone="none"
            showIcon={true}
            subtitleTone="tertiary"
            subtitleVariant="body-sm"
            titleAs="h4"
            titleVariant="heading-4"
            titleWeight="bold"
            wrapActions={true}
          >
            <SgDsLibrarySectionTitleGroup align="end">
              <SgDsLibraryButtonPopover
                trailingIcon="chevron-down"
                placement="bottom-end"
                buttonLabel="최신순"
                buttonShape="default"
                buttonSize="sm"
                buttonVariant="ghost"
                closeOnItemClick={true}
              >
                <SgDsLibraryPopoverList>
                  <SgDsLibraryPopoverItem icon="clock">최신순</SgDsLibraryPopoverItem>
                  <SgDsLibraryPopoverItem icon="flame">인기순</SgDsLibraryPopoverItem>
                  <SgDsLibraryPopoverItem icon="sparkles">추천순</SgDsLibraryPopoverItem>
                </SgDsLibraryPopoverList>
              </SgDsLibraryButtonPopover>
              <SgDsLibraryButton trailingIcon="chevron-right" badgeVariant="danger" variant="ghost" size="sm" shape="default">
                모든 랭킹 보기
              </SgDsLibraryButton>
            </SgDsLibrarySectionTitleGroup>
          </SgDsLibrarySectionTitle>

          <SgDsLibraryCardGrid
            count="10"
            itemSize="custom"
            itemSizeOverride="400px"
            layout="row"
            gap="lg"
            arrows={false}
            edgeFade="fade"
            scroll="snap"
          >
            {posts.slice(0, 10).map((p, i) => (
              <SgDsLibraryStack
                key={p.id}
                justify="start"
                as="article"
                direction="row"
                align="start"
                gap="none"
                style={{ width: '100%', cursor: 'pointer' }}
                onClick={() => navigate(`/video/${p.id}`)}
              >
                <SgDsLibraryText
                  truncate={false}
                  style={{
                    color: i < 3 ? 'var(--ds-color-brand-bg)' : undefined,
                    fontStyle: 'italic',
                    flex: '0 0 auto',
                    width: '40px',
                  }}
                  as="p"
                  tone={i < 3 ? 'primary' : 'tertiary'}
                  variant="heading-1"
                  transform="none"
                  weight="inherit"
                  truncateLines="1"
                  align="start"
                >
                  {i + 1}
                </SgDsLibraryText>
                <SgDsLibraryVideoListCard
                  thumbnailImageUrl={p.thumbnail_url ?? ''}
                  title={p.title ?? ''}
                  creatorName={p.creator_user?.username ?? ''}
                  meta={`${p.views_count ?? 0} 시청 · ${timeAgo(p.created_at)}`}
                  duration={p.duration ?? ''}
                  progress={0}
                  progressLabel="Media progress"
                  actionLabel="More options"
                  actionSize="sm"
                  thumbnailAspect="16/9"
                  avatarSrc={p.creator_user?.avatar_url ?? ''}
                  avatarAlt={p.creator_user?.username ?? ''}
                  avatarInitials={(p.creator_user?.username ?? 'U').slice(0, 2)}
                  creatorVerified={p.creator_user?.verified ?? false}
                  showGrain={true}
                  variant="vertical"
                  avatarTone="brand"
                  titleLines="3"
                  size="lg"
                  avatarSize="sm"
                  avatarShape="circle"
                  thumbnailWidth="50%"
                  thumbnailBackground="linear-gradient(140deg, #0c1429, #4c1d95 50%, #be185d)"
                  actionIcon="ellipsis"
                  showAction={true}
                />
              </SgDsLibraryStack>
            ))}
          </SgDsLibraryCardGrid>
        </SgDsLibraryStack>

        {/* 최신 작품 */}
        <SgDsLibraryStack style={{ maxWidth: '1400px' }} as="section" direction="column" gap="sm">
          <SgDsLibrarySectionTitle
            style={{ width: '100%', height: '32px' }}
            title="최신 작품"
            icon="video"
            as="header"
            align="center"
            iconTone="none"
            showIcon={true}
            subtitleTone="tertiary"
            subtitleVariant="body-sm"
            titleAs="h4"
            titleVariant="heading-4"
            titleWeight="bold"
            wrapActions={true}
          />
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
              <SgDsLibraryButtonPopover
                trailingIcon="chevron-down"
                placement="bottom-end"
                buttonLabel="최신순"
                buttonShape="default"
                buttonSize="sm"
                buttonVariant="ghost"
                closeOnItemClick={true}
              >
                <SgDsLibraryPopoverList>
                  <SgDsLibraryPopoverItem icon="clock">최신순</SgDsLibraryPopoverItem>
                  <SgDsLibraryPopoverItem icon="flame">인기순</SgDsLibraryPopoverItem>
                  <SgDsLibraryPopoverItem icon="sparkles">추천순</SgDsLibraryPopoverItem>
                </SgDsLibraryPopoverList>
              </SgDsLibraryButtonPopover>
            </SgDsLibrarySectionTitleGroup>
          </SgDsLibraryStack>

          <SgDsLibraryCardGrid
            cols="4"
            count={posts.length}
            itemSize="custom"
            itemSizeOverride="400px"
            layout="grid"
            gap="lg"
            arrows={false}
            edgeFade="fade"
            scroll="snap"
          >
            {posts.map((p) => (
              <SgDsLibraryVideoListCard
                key={p.id}
                mediaSize="sm"
                thumbnailImageUrl={p.thumbnail_url ?? ''}
                title={p.title ?? ''}
                creatorName={p.creator_user?.username ?? ''}
                meta={`${p.views_count ?? 0} 시청 · ${timeAgo(p.created_at)}`}
                duration={p.duration ?? ''}
                progress={0}
                actionLabel="More options"
                actionSize="sm"
                thumbnailAspect="16/9"
                avatarSrc={p.creator_user?.avatar_url ?? ''}
                avatarAlt={p.creator_user?.username ?? ''}
                avatarInitials={(p.creator_user?.username ?? 'U').slice(0, 2)}
                creatorVerified={p.creator_user?.verified ?? false}
                showGrain={true}
                variant="vertical"
                avatarTone="brand"
                titleLines="1"
                size="sm"
                avatarSize="sm"
                avatarShape="circle"
                thumbnailWidth="50%"
                thumbnailBackground="linear-gradient(140deg, #0c1429, #4c1d95 50%, #be185d)"
                actionIcon="ellipsis"
                showAction={true}
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/video/${p.id}`)}
              />
            ))}
          </SgDsLibraryCardGrid>
        </SgDsLibraryStack>

        {/* Load more */}
        {hasMore() && (
          <SgDsLibraryStack
            direction="row"
            justify="center"
            marginTop="var(--ds-spacing-space-6)"
            padding="var(--ds-spacing-space-4)"
            height="40px"
            marginBottom="var(--ds-spacing-space-12)"
          >
            <SgDsLibraryButton
              variant="ghost"
              size="sm"
              trailingIcon="chevron-down"
              onClick={loadMore}
              disabled={loading}
            >
              더 불러오기
            </SgDsLibraryButton>
          </SgDsLibraryStack>
        )}
      </SgDsLibraryStack>
    </SgDsLibraryStack>
  )
}
