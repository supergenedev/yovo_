import { useEffect, useMemo, useRef, useState } from 'react'
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

type SortKey = 'latest' | 'popular'

const CATEGORIES = ['전체', '보이스드라마', '시네마틱', 'ASMR', '단편영상', '애니메이션', 'MV', 'Vlog'] as const
type Category = typeof CATEGORIES[number]

const CATEGORY_ICONS: Record<Category, string> = {
  '전체': 'layout-grid',
  '보이스드라마': 'headphones',
  '시네마틱': 'clapperboard',
  'ASMR': 'ear',
  '단편영상': 'film',
  '애니메이션': 'sparkles',
  'MV': 'play',
  'Vlog': 'video',
}

function getPostThumbnail(p: any): string {
  const imageMedia = p.media?.find((m: any) => m.content_type?.startsWith('image/'))
  return imageMedia?.url ?? p.thumbnail_url ?? ''
}

// 유료(잠금) 포스트: buyer_only이고 아직 구매 전
function isLockedPost(p: any): boolean {
  return p?.view_type === 'buyer_only' && !p?.interaction_with_me?.purchased
}
function lockBadgeText(p: any): string {
  return isLockedPost(p) ? `${(p.content_price ?? 0).toLocaleString()} CRD` : ''
}
// 영상 프레임 썸네일 폴백용 video URL.
// 업로드 시 추출해 등록한 이미지 썸네일이 있으면 그걸 쓰고(영상 로드 없음),
// 썸네일이 없는 경우에만 영상에서 프레임을 그린다.
function videoSrcOf(p: any): string {
  if (isLockedPost(p)) return ''
  if (getPostThumbnail(p)) return '' // 등록된 썸네일이 있으면 정적 이미지 사용
  return (p?.media ?? []).find((m: any) => m.content_type?.startsWith('video/'))?.url ?? ''
}

export default function VideoMainPage() {
  const navigate = useNavigate()
  const { posts, loading, fetchVideoPosts, loadMore, hasMore } = useVideoStore()

  const [activeCategory, setActiveCategory] = useState<Category>('전체')
  const [sortKey, setSortKey] = useState<SortKey>('latest')
  const [sortLabel, setSortLabel] = useState('최신순')
  const [searchQuery, setSearchQuery] = useState('')
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    fetchVideoPosts()
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  function handleSearchChange(value: string) {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setSearchQuery(value)
    }, 300)
  }

  function handleSort(key: SortKey, label: string) {
    setSortKey(key)
    setSortLabel(label)
  }

  const filteredPosts = useMemo(() => {
    let result = [...posts]

    // category filter
    if (activeCategory !== '전체') {
      result = result.filter((p) => {
        const cat = p.category ?? ''
        return cat === activeCategory
      })
    }

    // search filter
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase()
      result = result.filter((p) => {
        const title = (p.title_ko ?? p.title ?? '').toLowerCase()
        const creator = (p.creator_user?.nickname ?? '').toLowerCase()
        return title.includes(q) || creator.includes(q)
      })
    }

    // sort
    if (sortKey === 'latest') {
      result.sort((a, b) => Number(b.created_at) - Number(a.created_at))
    } else if (sortKey === 'popular') {
      result.sort((a, b) => (b.likes_count ?? 0) - (a.likes_count ?? 0))
    }

    return result
  }, [posts, activeCategory, sortKey, searchQuery])

  // Featured strip: use real posts count (up to 6)
  const featuredPosts = posts.slice(0, Math.min(posts.length, 6))

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
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </SgDsLibrarySectionTitleGroup>
          </SgDsLibrarySectionTitle>

          {/* Featured media strip - real data */}
          {featuredPosts.length > 0 && (
            <SgDsLibraryCardGrid
              itemProps={featuredPosts.map((p) => ({ src: getPostThumbnail(p) }))}
              itemSizeOverride="640px"
              shadow={false}
              itemSize="custom"
              count={featuredPosts.length}
              cols="3"
              arrows
              layout="row"
              gap="lg"
              scroll="smooth"
              itemAspectRatio="16 / 9"
              edgeFade="fade"
            >
              {featuredPosts.map((p) => (
                <SgDsLibraryMediaFrame
                  key={p.id}
                  style={{ width: '100%', height: 'fit-content', cursor: 'pointer' }}
                  live={false}
                  src={getPostThumbnail(p)}
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
          )}
        </SgDsLibraryStack>

        {/* 실시간 TOP 10 */}
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
                buttonLabel={sortLabel}
                buttonShape="default"
                buttonSize="sm"
                buttonVariant="ghost"
                closeOnItemClick={true}
              >
                <SgDsLibraryPopoverList>
                  <SgDsLibraryPopoverItem icon="clock" onClick={() => handleSort('latest', '최신순')}>최신순</SgDsLibraryPopoverItem>
                  <SgDsLibraryPopoverItem icon="flame" onClick={() => handleSort('popular', '인기순')}>인기순</SgDsLibraryPopoverItem>
                </SgDsLibraryPopoverList>
              </SgDsLibraryButtonPopover>
              <SgDsLibraryButton trailingIcon="chevron-right" badgeVariant="danger" variant="ghost" size="sm" shape="default" onClick={() => navigate('/video')}>
                모든 랭킹 보기
              </SgDsLibraryButton>
            </SgDsLibrarySectionTitleGroup>
          </SgDsLibrarySectionTitle>

          <SgDsLibraryCardGrid
            count={Math.min(filteredPosts.length, 10)}
            itemSize="custom"
            itemSizeOverride="400px"
            layout="row"
            gap="lg"
            arrows
            edgeFade="fade"
            scroll="snap"
          >
            {filteredPosts.slice(0, 10).map((p, i) => (
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
                  thumbnailImageUrl={getPostThumbnail(p)}
                  videoSrc={videoSrcOf(p)}
                  showPlay={!!videoSrcOf(p)}
                  locked={isLockedPost(p)}
                  lockIcon="lock"
                  badgeText={lockBadgeText(p)}
                  badgeStatus="warning"
                  badgeVariant="solid"
                  title={p.title_ko ?? p.title ?? ''}
                  creatorName={p.creator_user?.nickname ?? ''}
                  meta={`좋아요 ${p.likes_count ?? 0} · ${timeAgo(p.created_at)}`}
                  duration={p.duration ?? ''}
                  progress={0}
                  progressLabel="Media progress"
                  actionLabel="More options"
                  actionSize="sm"
                  thumbnailAspect="16/9"
                  avatarSrc={p.creator_user?.profile_image ?? ''}
                  avatarAlt={p.creator_user?.nickname ?? ''}
                  avatarInitials={(p.creator_user?.nickname ?? 'U').slice(0, 2)}
                  creatorVerified={p.creator_user?.creator_type === 'official'}
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
                  onAvatarClick={() => { if (p.creator_user?.id) navigate(`/creator/${p.creator_user.id}`) }}
                  onActionClick={() => { navigator.clipboard.writeText(`${window.location.origin}/video/${p.id}`).catch(() => {}) }}
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
                  {CATEGORIES.map((cat) => (
                    <SgDsLibraryTab
                      key={cat}
                      selected={activeCategory === cat}
                      leadingIcon={CATEGORY_ICONS[cat]}
                      onClick={() => setActiveCategory(cat)}
                    >
                      {cat}
                    </SgDsLibraryTab>
                  ))}
                </SgDsLibraryTabsList>
              </SgDsLibraryTabs>
            </SgDsLibraryStack>
            <SgDsLibrarySectionTitleGroup align="end">
              <SgDsLibraryButtonPopover
                trailingIcon="chevron-down"
                placement="bottom-end"
                buttonLabel={sortLabel}
                buttonShape="default"
                buttonSize="sm"
                buttonVariant="ghost"
                closeOnItemClick={true}
              >
                <SgDsLibraryPopoverList>
                  <SgDsLibraryPopoverItem icon="clock" onClick={() => handleSort('latest', '최신순')}>최신순</SgDsLibraryPopoverItem>
                  <SgDsLibraryPopoverItem icon="flame" onClick={() => handleSort('popular', '인기순')}>인기순</SgDsLibraryPopoverItem>
                </SgDsLibraryPopoverList>
              </SgDsLibraryButtonPopover>
            </SgDsLibrarySectionTitleGroup>
          </SgDsLibraryStack>

          <SgDsLibraryCardGrid
            cols="4"
            count={filteredPosts.length}
            itemSize="custom"
            itemSizeOverride="400px"
            layout="grid"
            gap="lg"
            arrows={false}
            edgeFade="fade"
            scroll="snap"
          >
            {filteredPosts.map((p) => (
              <SgDsLibraryVideoListCard
                key={p.id}
                mediaSize="sm"
                thumbnailImageUrl={getPostThumbnail(p)}
                videoSrc={videoSrcOf(p)}
                showPlay={!!videoSrcOf(p)}
                locked={isLockedPost(p)}
                lockIcon="lock"
                badgeText={lockBadgeText(p)}
                badgeStatus="warning"
                badgeVariant="solid"
                title={p.title_ko ?? p.title ?? ''}
                creatorName={p.creator_user?.nickname ?? ''}
                meta={`좋아요 ${p.likes_count ?? 0} · ${timeAgo(p.created_at)}`}
                duration={p.duration ?? ''}
                progress={0}
                actionLabel="More options"
                actionSize="sm"
                thumbnailAspect="16/9"
                avatarSrc={p.creator_user?.profile_image ?? ''}
                avatarAlt={p.creator_user?.nickname ?? ''}
                avatarInitials={(p.creator_user?.nickname ?? 'U').slice(0, 2)}
                creatorVerified={p.creator_user?.creator_type === 'official'}
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
                onAvatarClick={() => { if (p.creator_user?.id) navigate(`/creator/${p.creator_user.id}`) }}
                onActionClick={() => { navigator.clipboard.writeText(`${window.location.origin}/video/${p.id}`).catch(() => {}) }}
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
