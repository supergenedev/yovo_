import { useState, useEffect } from 'react'
import {
  SgDsLibraryStack,
  SgDsLibraryUserBlock,
  SgDsLibraryPopoverList,
  SgDsLibraryPopoverItem,
  SgDsLibraryButtonPopover,
  SgDsLibrarySectionTitle,
  SgDsLibraryTabs,
  SgDsLibraryTabsList,
  SgDsLibraryTab,
  SgDsLibraryMediaFrame,
  SgDsLibraryCardGrid,
  SgDsLibraryVideoListCard,
  SgDsLibraryButton,
  SgDsLibraryText,
  SgDsLibrarySectionTitleGroup,
  SgDsLibraryUserCardHead,
  SgDsLibraryUserCard,
  SgDsLibraryInput,
  SgDsLibraryLink,
  SgDsLibraryIcon,
  SgDsLibraryBadge,
  SgDsLibraryAvatar,
  SgDsLibraryCard,
  SgDsLibraryToast,
  SgDsLibraryToastRegion,
} from '@/libraries/sg-ds-library/components'
import { useFeedStore } from '@/stores/feed'
import { useCreatorStore } from '@/stores/creator'
import { useMeStore } from '@/stores/me'
import { useNavigate } from 'react-router-dom'

// ---- helpers ----------------------------------------------------------------

function getInitials(name?: string | null): string {
  if (!name) return 'UN'
  const words = name.trim().split(/\s+/)
  return words.length >= 2
    ? (words[0][0] + words[1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase()
}

// ── dummy hero images (fallback / static visual) ──────────────────────────────
const HERO_IMAGES = [
  'https://i.pinimg.com/736x/a8/bf/a3/a8bfa3749e7f7ffaa0441b108d8a23fb.jpg',
  'https://i.pinimg.com/1200x/8e/03/85/8e0385f19e37344b55bdb999a8e655e3.jpg',
  'https://i.pinimg.com/1200x/d8/3e/d0/d83ed058e35a1b8fa43b8ffd4bf99bca.jpg',
  'https://i.pinimg.com/1200x/ab/5b/0c/ab5b0cd28321dfb14b3e0311c3616207.jpg',
  'https://i.pinimg.com/736x/65/2a/e8/652ae82db9bcdc65e6ddc3fe5d61594a.jpg',
  'https://i.pinimg.com/736x/64/35/1b/64351bf5a15fdc1674758340556a1967.jpg',
]

const TOP10_THUMBNAILS = [
  'https://i.pinimg.com/1200x/ad/e4/53/ade453608e2e7c8ffc38bc8ba991cb50.jpg',
  'https://i.pinimg.com/736x/65/2a/e8/652ae82db9bcdc65e6ddc3fe5d61594a.jpg',
  'https://i.pinimg.com/736x/3e/36/00/3e3600f33f0c190104d30d2a971e1659.jpg',
  'https://i.pinimg.com/1200x/d8/3e/d0/d83ed058e35a1b8fa43b8ffd4bf99bca.jpg',
  'https://i.pinimg.com/1200x/ab/5b/0c/ab5b0cd28321dfb14b3e0311c3616207.jpg',
  'https://i.pinimg.com/736x/a8/bf/a3/a8bfa3749e7f7ffaa0441b108d8a23fb.jpg',
  'https://i.pinimg.com/736x/cb/12/b2/cb12b2f39982bf66734cd7e5a34eb891.jpg',
  'https://i.pinimg.com/1200x/8e/03/85/8e0385f19e37344b55bdb999a8e655e3.jpg',
  'https://i.pinimg.com/1200x/ad/e4/53/ade453608e2e7c8ffc38bc8ba991cb50.jpg',
  'https://i.pinimg.com/1200x/b9/45/02/b94502342dfd29c213a99bb1d93c151d.jpg',
]

const AVATAR_SRC = 'https://i.pinimg.com/1200x/ca/70/2c/ca702cddd216a2990f402aa303f4a03e.jpg'

// Category → content_type filter mapping. null means "no filter" (show all).
const CATEGORY_FILTERS: Array<string[] | null> = [
  null,                       // 0: 전체
  ['episode'],                // 1: 보이스드라마
  ['video'],                  // 2: 시네마틱
  ['episode'],                // 3: ASMR (episode가 가장 근접)
  ['video'],                  // 4: 단편영상
  ['video'],                  // 5: 애니메이션
  ['video'],                  // 6: MV
  ['video'],                  // 7: Vlog
]

// ── component ─────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [shareToast, setShareToast] = useState(false)

  const feedStore = useFeedStore()
  const creatorStore = useCreatorStore()
  const meStore = useMeStore()
  const navigate = useNavigate()

  useEffect(() => {
    feedStore.fetchDiscover()
    creatorStore.fetchRecommended()
    creatorStore.fetchDiscover()
  }, [])

  const discover = creatorStore.discover
  const me = meStore.user

  // Apply category filter client-side
  const categoryFilter = CATEGORY_FILTERS[activeCategory] ?? null
  const filteredPosts = categoryFilter
    ? feedStore.posts.filter((p: any) => categoryFilter.includes(p.content_type))
    : feedStore.posts

  function handleShare(postId: string | number) {
    const url = location.origin + '/video/' + postId
    navigator.clipboard.writeText(url).catch(() => {})
    setShareToast(true)
    setTimeout(() => setShareToast(false), 2000)
  }

  return (
    <SgDsLibraryStack
      style={{ width: '100%', height: '100%', overflow: 'hidden' }}
      as="main"
      data-wb-bg-token="surface-page"
      direction="row"
      align="stretch"
      gap="lg"
    >
      {/* Share toast */}
      {shareToast && (
        <SgDsLibraryToastRegion position="bottom-center">
          <SgDsLibraryToast
            status="success"
            variant="solid"
            message="링크가 클립보드에 복사되었습니다."
            showDismiss={false}
          />
        </SgDsLibraryToastRegion>
      )}

      {/* ── CONTENT AREA ── */}
      <SgDsLibraryStack
        style={{
          height: '100%',
          paddingRight: 'var(--ds-spacing-stack-padding-lg)',
          overflow: 'hidden',
          width: '100%',
          paddingTop: '0.75rem',
        }}
        as="div"
        radius="none"
        direction="column"
        align="center"
        justify="start"
        gap="none"
        padding="none"
        background="none"
      >
        <SgDsLibraryStack
          style={{
            width: '100%',
            overflow: 'visible',
            flex: '1 1 auto',
            height: '100%',
            maxWidth: '1440px',
          }}
          as="div"
          radius="md"
          direction="column"
          align="center"
          justify="start"
          gap="xs"
          padding="none"
          background="none"
        >
          {/* Sticky header */}
          <SgDsLibraryStack
            justify="between"
            data-wb-bg-token="surface-page"
            background="none"
            style={{
              width: '100%',
              paddingTop: 'var(--ds-spacing-space-2)',
              top: '0px',
              zIndex: '2',
              paddingBottom: 'var(--ds-spacing-space-3)',
            }}
            as="header"
            direction="row"
            align="center"
            gap="md"
            wrap={false}
          >
            <SgDsLibraryInput
              leadingIcon="search"
              style={{ maxWidth: '400px' }}
              placeholder="검색어를 입력하세요."
              type="text"
              state="default"
              labelPosition="outside"
              size="md"
              shape="pill"
            />
            <SgDsLibraryButton shape="pill" variant="soft" size="md" leadingIcon="ellipsis" iconOnly aria-label="라이브러리 설정" />
          </SgDsLibraryStack>

          {/* Scrollable content */}
          <SgDsLibraryStack
            scrollFade={false}
            style={{ height: '100%', width: '100%', overflow: 'scroll' }}
            as="div"
            radius="md"
            direction="column"
            align="center"
            justify="start"
            gap="2xl"
            padding="none"
            background="none"
          >
            {/* ── Hero card grid (dummy — no direct API) ── */}
            <SgDsLibraryCardGrid
              itemPropKeys={['viewerCount', 'captionEyebrow', 'captionTitle', 'duration', 'progress', 'progressLabel', 'playLabel', 'liveLabel', 'src', 'background', 'badgeText', 'badgeVariant', 'badgeStatus', 'locked', 'lockIcon', 'lockTitle', 'lockMessage', 'lockActionLabel', 'lockActionIcon', 'lockActionVariant', 'lockActionSize', 'lockActionShape', 'live', 'size', 'fit', 'maxHeight', 'align']}
              itemMaxSize="900px"
              itemMinSize="340px"
              style={{ width: '100%' }}
              itemSizeOverride="50%"
              itemProps={HERO_IMAGES.map((src) => ({ src }))}
              shadow={false}
              itemSize="custom"
              count="6"
              cols="3"
              arrows={false}
              layout="row"
              gap="sm"
              scroll="smooth"
              itemAspectRatio="16 / 9"
              edgeFade="fade"
            >
              <SgDsLibraryMediaFrame
                style={{ width: '100%', height: 'fit-content' }}
                live={false}
                src="https://i.pinimg.com/1200x/ad/e4/53/ade453608e2e7c8ffc38bc8ba991cb50.jpg"
                locked={false}
                viewerCount="4,218 watching"
                captionEyebrow="ON AIR · 1h 22m"
                captionTitle="새벽 라이브 #18 — Hailey × NeoVoice"
                duration="17:02"
                progress="64"
                progressLabel="Media progress"
                playLabel="Play"
                liveLabel="LIVE"
                aspect="16/9"
                badgeText="Member's Only"
                badgeVariant="solid"
                badgeStatus="danger"
                lockIcon="lock"
                lockActionVariant="primary"
                lockActionSize="sm"
                lockActionShape="pill"
                showPlay={false}
                showGrain={true}
                size="md"
                background="linear-gradient(140deg, #0c1429, #4c1d95 50%, #be185d)"
              />
            </SgDsLibraryCardGrid>

            {/* ── 실시간 TOP 10 (dummy data) ── */}
            <SgDsLibraryStack as="section" direction="column" gap="sm">
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
                  <SgDsLibraryButton trailingIcon="chevron-right" variant="ghost" size="sm" shape="default">모든 랭킹 보기</SgDsLibraryButton>
                </SgDsLibrarySectionTitleGroup>
              </SgDsLibrarySectionTitle>

              <SgDsLibraryCardGrid
                itemMaxSize="480px"
                itemMinSize="320px"
                count="10"
                itemSize="custom"
                itemSizeOverride="30%"
                layout="row"
                gap="lg"
                arrows={false}
                edgeFade="fade"
                scroll="snap"
              >
                {TOP10_THUMBNAILS.map((thumb, idx) => (
                  <SgDsLibraryStack key={idx} justify="start" as="article" direction="row" align="start" gap="none" style={{ width: '100%' }}>
                    <SgDsLibraryText
                      truncate={false}
                      style={{
                        color: idx < 3 ? 'var(--ds-color-brand-bg)' : undefined,
                        fontStyle: 'italic',
                        flex: '0 0 auto',
                        width: '40px',
                      }}
                      as="p"
                      tone={idx < 3 ? 'primary' : 'tertiary'}
                      variant="heading-1"
                      transform="none"
                      weight="inherit"
                      truncateLines="1"
                      align="start"
                    >
                      {idx + 1}
                    </SgDsLibraryText>
                    <SgDsLibraryVideoListCard
                      mediaSize="sm"
                      avatarSrc={AVATAR_SRC}
                      thumbnailImageUrl={thumb}
                      title="새벽이 떠오를 때 — 2인 콜라보 단편"
                      creatorName="코다 / Koda"
                      meta="92K 시청 · 1주 전"
                      duration="17:02"
                      progress="64"
                      progressLabel="Media progress"
                      actionLabel="More options"
                      actionSize="sm"
                      thumbnailAspect="16/9"
                      avatarAlt="코다 / Koda"
                      avatarInitials="코다"
                      creatorBadge="후원자 145k"
                      creatorBadgeStatus="neutral"
                      creatorBadgeVariant="flat"
                      badgeText="15+"
                      badgeVariant="solid"
                      badgeStatus="warning"
                      creatorVerified={true}
                      showGrain={true}
                      variant="vertical"
                      avatarTone="brand"
                      titleLines="1"
                      size="lg"
                      avatarSize="md"
                      avatarShape="circle"
                      thumbnailWidth="50%"
                      thumbnailBackground="linear-gradient(140deg, #0c1429, #4c1d95 50%, #be185d)"
                      actionIcon="ellipsis"
                      showAction={true}
                      onActionClick={() => handleShare(idx)}
                    />
                  </SgDsLibraryStack>
                ))}
              </SgDsLibraryCardGrid>
            </SgDsLibraryStack>

            {/* ── 에디터 추천 (dummy data) ── */}
            <SgDsLibraryStack as="section" direction="column" gap="sm">
              <SgDsLibrarySectionTitle
                style={{ width: '100%' }}
                title="에디터 추천"
                icon="thumbs-up"
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
                  <SgDsLibraryButton trailingIcon="chevron-right" variant="ghost" size="sm" shape="default">모두 보기</SgDsLibraryButton>
                </SgDsLibrarySectionTitleGroup>
              </SgDsLibrarySectionTitle>

              <SgDsLibraryCardGrid
                itemMaxSize="480px"
                itemMinSize="320px"
                cols="3"
                style={{ height: 'fit-content' }}
                count="1"
                itemSize="custom"
                itemSizeOverride="30%"
                layout="row"
                gap="sm"
                arrows={false}
                edgeFade="fade"
                scroll="snap"
              >
                <SgDsLibraryStack style={{ height: 'fit-content' }} as="div" radius="none" direction="column" align="stretch" justify="start" gap="sm" padding="none" background="none">
                  <SgDsLibraryVideoListCard
                    eyebrowColor="#ff0055"
                    eyebrow="Editor's Pick"
                    avatarSrc="https://i.pinimg.com/736x/64/35/1b/64351bf5a15fdc1674758340556a1967.jpg"
                    thumbnailImageUrl="https://i.pinimg.com/736x/64/35/1b/64351bf5a15fdc1674758340556a1967.jpg"
                    title="새벽이 떠오를 때 — 2인 콜라보 단편"
                    creatorName="코다 / Koda"
                    meta="92K 시청 · 1주 전"
                    duration="17:02"
                    progress="64"
                    progressLabel="Media progress"
                    actionLabel="More options"
                    actionSize="sm"
                    thumbnailAspect="16/9"
                    avatarAlt="코다 / Koda"
                    avatarInitials="코다"
                    creatorBadge="후원자 145k"
                    creatorBadgeStatus="neutral"
                    creatorBadgeVariant="flat"
                    badgeText="15+"
                    badgeVariant="solid"
                    badgeStatus="warning"
                    creatorVerified={true}
                    showGrain={true}
                    variant="vertical"
                    avatarTone="brand"
                    titleLines="1"
                    size="lg"
                    avatarSize="md"
                    avatarShape="circle"
                    thumbnailWidth="50%"
                    thumbnailBackground="linear-gradient(140deg, #0c1429, #4c1d95 50%, #be185d)"
                    actionIcon="ellipsis"
                    showAction={true}
                    onActionClick={() => handleShare('editor-pick')}
                  />
                  <SgDsLibraryStack
                    style={{ height: 'fit-content', paddingRight: 'var(--ds-spacing-space-2)' }}
                    as="div"
                    radius="lg"
                    direction="row"
                    align="stretch"
                    justify="start"
                    gap="xs"
                    padding="lg"
                    background="surface"
                  >
                    <SgDsLibraryStack as="div" radius="none" direction="column" align="stretch" justify="start" gap="xxs" padding="none" background="none">
                      <SgDsLibraryUserBlock
                        meta="YOVO 공식 에디터"
                        avatarSize="xs"
                        avatarSrc="https://i.pinimg.com/736x/cb/12/b2/cb12b2f39982bf66734cd7e5a34eb891.jpg"
                        style={{ width: '100%' }}
                        name="YOVO Editor"
                        initials="YE"
                        avatarTone="purple"
                        verified={true}
                        size="sm"
                      >
                        <SgDsLibraryButtonPopover
                          style={{ width: '32px' }}
                          leadingIcon="ellipsis"
                          iconOnly={true}
                          trailingIcon="chevron-down"
                          placement="bottom-start"
                          buttonLabel="더보기"
                          buttonShape="pill"
                          buttonSize="sm"
                          buttonVariant="ghost"
                          closeOnItemClick={true}
                        >
                          <SgDsLibraryPopoverList>
                            <SgDsLibraryPopoverItem icon="circle-user">프로필</SgDsLibraryPopoverItem>
                            <SgDsLibraryPopoverItem icon="layout-dashboard">대시보드</SgDsLibraryPopoverItem>
                            <SgDsLibraryPopoverItem icon="settings">설정</SgDsLibraryPopoverItem>
                          </SgDsLibraryPopoverList>
                        </SgDsLibraryButtonPopover>
                      </SgDsLibraryUserBlock>
                      <SgDsLibraryText
                        lineHeight="128%"
                        truncate={true}
                        style={{ width: '100%', height: '54px' }}
                        as="p"
                        tone="secondary"
                        variant="body"
                        transform="none"
                        weight="inherit"
                        truncateLines="3"
                        align="start"
                      >
                        잠 못 드는 밤, 옆에서 다정히 속삭여 드릴게요. 단단한 위스퍼 보이스와 가벼운 ear-blowing, 페이지 넘기는 소리, 빗소리 레이어를 90분간 이어가는 풀버전입니다.
                      </SgDsLibraryText>
                    </SgDsLibraryStack>
                  </SgDsLibraryStack>
                </SgDsLibraryStack>
              </SgDsLibraryCardGrid>
            </SgDsLibraryStack>

            {/* ── 공식 크리에이터 (from creatorStore.discover or dummy) ── */}
            <SgDsLibraryStack style={{ width: '100%' }} as="section" direction="column" gap="sm">
              <SgDsLibrarySectionTitle
                style={{ width: '100%' }}
                title="공식 크리에이터"
                icon="trending-up"
                as="header"
                align="center"
                iconTone="none"
                showIcon={true}
                titleAs="h4"
                titleVariant="heading-4"
                titleWeight="bold"
                wrapActions={true}
              >
                <SgDsLibrarySectionTitleGroup align="end">
                  <SgDsLibraryButton trailingIcon="chevron-right" variant="soft" size="sm" shape="default">모두 보기</SgDsLibraryButton>
                </SgDsLibrarySectionTitleGroup>
              </SgDsLibrarySectionTitle>
              <SgDsLibraryCardGrid
                itemMaxSize="280px"
                itemMinSize="200px"
                itemSizeOverride="12%"
                count={discover.length > 0 ? discover.length : 1}
                itemSize="custom"
                layout="row"
                gap="sm"
                arrows={false}
                edgeFade="fade"
                scroll="snap"
              >
                {discover.length > 0
                  ? discover.map((creator: any) => (
                    <SgDsLibraryCard
                      key={creator.id}
                      style={{ backgroundImage: 'linear-gradient(var(--ds-color-surface-card), var(--ds-color-surface-card))', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundBlendMode: 'normal' }}
                      variant="bare"
                      padding="lg"
                    >
                      <SgDsLibraryStack direction="column" align="center" gap="md">
                        <SgDsLibraryStack
                          as="div"
                          radius="none"
                          direction="column"
                          align="center"
                          justify="start"
                          gap="xxs"
                          padding="none"
                          background="none"
                          style={{ cursor: 'pointer' }}
                          onClick={() => navigate('/creator/' + creator.id)}
                        >
                          <SgDsLibraryAvatar
                            src={creator.profile_image ?? undefined}
                            initials={getInitials(creator.nickname)}
                            size="2xl"
                            shape="circle"
                            tone="purple"
                          />
                          <SgDsLibraryStack justify="center" direction="row" align="center" gap="xxs">
                            <SgDsLibraryText as="p" variant="body" weight="semibold">{creator.nickname ?? '크리에이터'}</SgDsLibraryText>
                            <SgDsLibraryIcon name="badge-check" size="14px" />
                          </SgDsLibraryStack>
                          <SgDsLibraryText as="p" variant="caption" tone="tertiary">@{creator.handle ?? ''}</SgDsLibraryText>
                        </SgDsLibraryStack>
                        <SgDsLibraryBadge status="success" variant="flat" size="md" shape="pill" icon="trending-up">팔로우 추천</SgDsLibraryBadge>
                        <SgDsLibraryButton style={{ width: '100%' }} variant="soft" size="sm" shape="pill" leadingIcon="plus">팔로우</SgDsLibraryButton>
                      </SgDsLibraryStack>
                    </SgDsLibraryCard>
                  ))
                  : (
                    <SgDsLibraryCard
                      style={{ backgroundImage: 'linear-gradient(var(--ds-color-surface-card), var(--ds-color-surface-card))', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundBlendMode: 'normal' }}
                      variant="bare"
                      padding="lg"
                    >
                      <SgDsLibraryStack direction="column" align="center" gap="md">
                        <SgDsLibraryStack as="div" radius="none" direction="column" align="center" justify="start" gap="xxs" padding="none" background="none">
                          <SgDsLibraryAvatar src="https://i.pinimg.com/1200x/ab/5b/0c/ab5b0cd28321dfb14b3e0311c3616207.jpg" initials="C" size="2xl" shape="circle" tone="purple" />
                          <SgDsLibraryStack justify="center" direction="row" align="center" gap="xxs">
                            <SgDsLibraryText as="p" variant="body" weight="semibold">코스모 픽쳐스</SgDsLibraryText>
                            <SgDsLibraryIcon name="badge-check" size="14px" />
                          </SgDsLibraryStack>
                          <SgDsLibraryText as="p" variant="caption" tone="tertiary">@cosmo_pic</SgDsLibraryText>
                        </SgDsLibraryStack>
                        <SgDsLibraryBadge status="success" variant="flat" size="md" shape="pill" icon="trending-up">+27.8%</SgDsLibraryBadge>
                        <SgDsLibraryButton style={{ width: '100%' }} variant="soft" size="sm" shape="pill" leadingIcon="plus">팔로우</SgDsLibraryButton>
                      </SgDsLibraryStack>
                    </SgDsLibraryCard>
                  )
                }
              </SgDsLibraryCardGrid>
            </SgDsLibraryStack>

            {/* ── 최신 작품 (from feedStore.posts) ── */}
            <SgDsLibraryStack as="section" direction="column" gap="sm">
              <SgDsLibrarySectionTitle
                style={{ width: '100%', height: '32px' }}
                title="최신 작품"
                icon="sparkle"
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
                      <SgDsLibraryTab selected={activeCategory === 0} onClick={() => setActiveCategory(0)} leadingIcon="layout-grid">전체</SgDsLibraryTab>
                      <SgDsLibraryTab selected={activeCategory === 1} onClick={() => setActiveCategory(1)} leadingIcon="headphones">보이스드라마</SgDsLibraryTab>
                      <SgDsLibraryTab selected={activeCategory === 2} onClick={() => setActiveCategory(2)} leadingIcon="clapperboard">시네마틱</SgDsLibraryTab>
                      <SgDsLibraryTab selected={activeCategory === 3} onClick={() => setActiveCategory(3)} leadingIcon="ear">ASMR</SgDsLibraryTab>
                      <SgDsLibraryTab selected={activeCategory === 4} onClick={() => setActiveCategory(4)} leadingIcon="film">단편영상</SgDsLibraryTab>
                      <SgDsLibraryTab selected={activeCategory === 5} onClick={() => setActiveCategory(5)} leadingIcon="sparkles">애니메이션</SgDsLibraryTab>
                      <SgDsLibraryTab selected={activeCategory === 6} onClick={() => setActiveCategory(6)} leadingIcon="play">MV</SgDsLibraryTab>
                      <SgDsLibraryTab selected={activeCategory === 7} onClick={() => setActiveCategory(7)} leadingIcon="video">Vlog</SgDsLibraryTab>
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
                  <SgDsLibraryButton trailingIcon="chevron-right" variant="ghost" size="sm" shape="default">모두 보기</SgDsLibraryButton>
                </SgDsLibrarySectionTitleGroup>
              </SgDsLibraryStack>

              <SgDsLibraryCardGrid
                cols="4"
                count={Math.max(filteredPosts.length, 1)}
                itemSize="custom"
                itemSizeOverride="400px"
                layout="grid"
                gap="sm"
                arrows={false}
                edgeFade="fade"
                scroll="snap"
              >
                {filteredPosts.length > 0
                  ? filteredPosts.map((post: any) => (
                    <SgDsLibraryVideoListCard
                      key={post.id}
                      mediaSize="sm"
                      thumbnailImageUrl={(post.media ?? []).find((m: any) => m.content_type?.startsWith('image/'))?.url ?? post.locked_thumbnail_url ?? 'https://i.pinimg.com/736x/a8/bf/a3/a8bfa3749e7f7ffaa0441b108d8a23fb.jpg'}
                      locked={post.view_type === 'buyer_only' && !post.interaction_with_me?.purchased}
                      lockIcon="lock"
                      badgeText={post.view_type === 'buyer_only' && !post.interaction_with_me?.purchased ? `${(post.content_price ?? 0).toLocaleString()} CRD` : ''}
                      badgeStatus="warning"
                      badgeVariant="solid"
                      title={post.title_ko ?? post.title_ja ?? '제목 없음'}
                      creatorName={post.creator_user?.nickname ?? '크리에이터'}
                      meta={`${post.views_count ?? 0} 시청`}
                      duration=""
                      progress="0"
                      actionLabel="More options"
                      actionSize="sm"
                      thumbnailAspect="16/9"
                      avatarAlt={post.creator_user?.nickname ?? ''}
                      avatarInitials={getInitials(post.creator_user?.nickname)}
                      avatarSrc={post.creator_user?.profile_image ?? undefined}
                      creatorBadge=""
                      creatorBadgeStatus="neutral"
                      creatorBadgeVariant="flat"
                      creatorVerified={post.creator_user?.creator_type === 'official'}
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
                      onClick={() => navigate('/video/' + post.id)}
                      onAvatarClick={() => navigate('/creator/' + post.creator_user?.id)}
                      onActionClick={() => handleShare(post.id)}
                    />
                  ))
                  : (
                    <SgDsLibraryVideoListCard
                      mediaSize="sm"
                      thumbnailImageUrl="https://i.pinimg.com/736x/a8/bf/a3/a8bfa3749e7f7ffaa0441b108d8a23fb.jpg"
                      title="새벽이 떠오를 때 — 2인 콜라보 단편"
                      creatorName="코다 / Koda"
                      meta="92K 시청 · 1주 전"
                      duration="17:02"
                      progress="24"
                      actionLabel="More options"
                      actionSize="sm"
                      thumbnailAspect="16/9"
                      avatarAlt="코다 / Koda"
                      avatarInitials="코다"
                      creatorBadge="후원자 145k"
                      creatorBadgeStatus="neutral"
                      creatorBadgeVariant="flat"
                      badgeText="15+"
                      badgeVariant="solid"
                      badgeStatus="warning"
                      creatorVerified={true}
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
                    />
                  )
                }
              </SgDsLibraryCardGrid>

              {feedStore.hasMore() && (
                <SgDsLibraryStack direction="row" justify="center" padding="var(--ds-spacing-space-4)">
                  <SgDsLibraryButton
                    variant="ghost"
                    size="sm"
                    label="더 불러오기"
                    trailingIcon="chevron-down"
                    onClick={() => feedStore.loadMore()}
                  />
                </SgDsLibraryStack>
              )}
            </SgDsLibraryStack>

            {/* Footer */}
            <SgDsLibraryStack
              style={{ height: 'fit-content', marginTop: 'auto' }}
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
          </SgDsLibraryStack>
        </SgDsLibraryStack>
      </SgDsLibraryStack>
    </SgDsLibraryStack>
  )
}
