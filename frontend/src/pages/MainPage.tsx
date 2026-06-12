import { useState, useEffect } from 'react'
import {
  SgDsLibraryStack,
  SgDsLibraryText,
  SgDsLibraryUserBlock,
  SgDsLibraryUserCard,
  SgDsLibraryUserCardHead,
  SgDsLibraryUserCardSection,
  SgDsLibraryUserCardStats,
  SgDsLibraryPopoverList,
  SgDsLibraryPopoverItem,
  SgDsLibraryButtonPopover,
  SgDsLibraryCreditBalanceCardRow,
  SgDsLibraryTopicRow,
  SgDsLibraryLink,
  SgDsLibraryCreditBalanceCard,
  SgDsLibrarySectionTitle,
  SgDsLibrarySectionTitleGroup,
  SgDsLibraryTabsPanel,
  SgDsLibraryPostCard,
  SgDsLibraryPostStack,
  SgDsLibraryButton,
  SgDsLibraryTab,
  SgDsLibraryTabsList,
  SgDsLibraryTabs,
  SgDsLibraryInput,
  SgDsLibraryStory,
  SgDsLibraryStoryStrip,
  SgDsLibraryDialog,
  SgDsLibraryAlert,
  SgDsLibraryEmptyState,
  SgDsLibraryToast,
  SgDsLibraryToastRegion,
} from '@/libraries/sg-ds-library/components'
import { useFeedStore } from '@/stores/feed'
import { useInteractionsStore } from '@/stores/interactions'
import { useMeStore } from '@/stores/me'
import { useCreatorStore } from '@/stores/creator'
import { apiFetch } from '@/lib/api'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth'

// ---- helpers ----------------------------------------------------------------

function getInitials(name?: string | null): string {
  if (!name) return 'UN'
  const words = name.trim().split(/\s+/)
  return words.length >= 2
    ? (words[0][0] + words[1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase()
}

function contentKind(contentType?: string | null): string {
  if (contentType === 'video') return 'video'
  if (contentType === 'episode') return 'audio'
  return 'text'
}

function timeAgo(ms?: number | null): string {
  if (!ms) return ''
  const diff = Date.now() - ms
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return '방금 전'
  if (mins < 60) return `${mins}분 전`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}시간 전`
  return `${Math.floor(hours / 24)}일 전`
}

type SortMode = 'recommend' | 'latest' | 'popular'

// ---- component --------------------------------------------------------------

export default function MainPage() {
  const [activeTab, setActiveTab] = useState(0)
  const [sortMode, setSortMode] = useState<SortMode>('recommend')
  const [shareToastPostId, setShareToastPostId] = useState<string | null>(null)
  const [tipDialogPostId, setTipDialogPostId] = useState<string | null>(null)
  const [tipError, setTipError] = useState<string | null>(null)
  const [tipAmount, setTipAmount] = useState('100')
  const [tipLoading, setTipLoading] = useState(false)
  const [tipSuccess, setTipSuccess] = useState(false)

  // 크레딧 충전/이력 다이얼로그 상태
  const [chargeOpen, setChargeOpen] = useState(false)
  const [chargeAmount, setChargeAmount] = useState(1000)
  const [chargeLoading, setChargeLoading] = useState(false)
  const [chargeError, setChargeError] = useState<string | null>(null)
  const [chargeSuccess, setChargeSuccess] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [historyLoading, setHistoryLoading] = useState(false)

  const feedStore = useFeedStore()
  const interactionsStore = useInteractionsStore()
  const meStore = useMeStore()
  const creatorStore = useCreatorStore()
  const navigate = useNavigate()
  const logout = useAuthStore((s) => s.logout)

  async function handleLogout() {
    await logout()
    navigate('/auth')
  }

  useEffect(() => {
    feedStore.fetchDiscover()
    feedStore.fetchTrending()
    creatorStore.fetchRecommended()
    if (meStore.following.length === 0) meStore.fetchFollowing()
    meStore.fetchCoin()
  }, [])

  useEffect(() => {
    interactionsStore.initFromPosts(feedStore.posts)
  }, [feedStore.posts])

  function handleTabChange(idx: number) {
    setActiveTab(idx)
    if (idx === 0) feedStore.fetchDiscover(1)
    else if (idx === 1) feedStore.fetchFeed(1)   // 서포터 전용: 팔로우 피드
    else if (idx === 2) feedStore.fetchFeed(1)   // 구독중: 팔로우 피드
  }

  function sortLabel(): string {
    if (sortMode === 'latest') return '최신순'
    if (sortMode === 'popular') return '인기순'
    return '추천순'
  }

  function sortedPosts(posts: any[]) {
    if (sortMode === 'latest') return [...posts].sort((a, b) => (b.created_at ?? 0) - (a.created_at ?? 0))
    if (sortMode === 'popular') return [...posts].sort((a, b) => (b.likes_count ?? 0) - (a.likes_count ?? 0))
    return posts
  }

  function handleShare(post: any) {
    const url = location.origin + '/video/' + post.id
    navigator.clipboard.writeText(url).catch(() => {})
    setShareToastPostId(String(post.id))
    setTimeout(() => setShareToastPostId(null), 2000)
  }

  function closeTipDialog() {
    setTipDialogPostId(null)
    setTipAmount('100')
    setTipSuccess(false)
    setTipError(null)
  }

  async function handleTipSubmit() {
    if (!tipDialogPostId) return
    const amount = parseInt(tipAmount, 10)
    if (!amount || amount <= 0) return
    setTipLoading(true)
    setTipError(null)
    try {
      await apiFetch(`/api/v/posts/${tipDialogPostId}/post_tips`, {
        method: 'POST',
        body: { amount },
      })
      setTipSuccess(true)
      setTimeout(() => {
        setTipDialogPostId(null)
        setTipSuccess(false)
        setTipAmount('100')
      }, 1500)
    } catch (e: any) {
      // 에러를 삼키면 블러 상태로 멈춘 것처럼 보인다 — 사유를 보여준다
      const msg = e?.data?.message ?? ''
      setTipError(
        msg.includes('Insufficient')
          ? '코인이 부족합니다. (현재 잔액은 내 프로필에서 확인할 수 있어요)'
          : msg.includes('own post')
            ? '내 포스트에는 후원할 수 없습니다.'
            : msg || '후원 처리에 실패했습니다. 잠시 후 다시 시도해주세요.',
      )
    } finally {
      setTipLoading(false)
    }
  }

  function closeChargeDialog() {
    setChargeOpen(false)
    setChargeAmount(1000)
    setChargeError(null)
    setChargeSuccess(false)
  }

  async function handleCharge() {
    if (chargeLoading || chargeSuccess) return
    setChargeLoading(true)
    setChargeError(null)
    try {
      await meStore.charge(chargeAmount)
      setChargeSuccess(true)
    } catch (e: any) {
      setChargeError(e?.data?.message ?? '충전에 실패했습니다. 잠시 후 다시 시도해주세요.')
    } finally {
      setChargeLoading(false)
    }
  }

  async function openHistoryDialog() {
    setHistoryOpen(true)
    setHistoryLoading(true)
    try {
      await meStore.fetchHistories()
    } finally {
      setHistoryLoading(false)
    }
  }

  function historyTypeLabel(type?: string): string {
    if (type === 'charge') return '충전'
    if (type === 'purchase') return '구매'
    if (type === 'tip') return '후원'
    if (type === 'admin_grant') return '관리자 지급'
    return type ?? '기타'
  }

  function formatHistoryDate(ms?: number | null): string {
    if (!ms) return ''
    return new Date(ms).toLocaleString('ko-KR', {
      year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
    })
  }

  function likedCountAdjustment(post: any): number {
    const optimistic = interactionsStore.isLiked(post.id)
    const serverLiked = post.interaction_with_me?.liked ?? false
    if (optimistic && !serverLiked) return 1
    if (!optimistic && serverLiked) return -1
    return 0
  }

  function mapPostToCard(post: any) {
    const creator = post.creator_user
    // media: use first image url if available
    let imageUrl = post.locked_thumbnail_url ?? undefined
    if (post.media && Array.isArray(post.media) && post.media.length > 0) {
      const imgMedia = post.media.find((m: any) => m.content_type?.startsWith('image/'))
      if (imgMedia) imageUrl = imgMedia.url
    }
    const kind = contentKind(post.content_type)
    // video kind doesn't pass imageUrl per spec
    const imageUrlProp = kind === 'video' ? undefined : imageUrl

    const adj = likedCountAdjustment(post)
    return {
      userName: creator?.nickname ?? '알 수 없음',
      userInitials: getInitials(creator?.nickname),
      userAvatarSrc: creator?.profile_image ?? undefined,
      avatarTone: 'brand' as const,
      verified: creator?.creator_type === 'official',
      title: post.title_ko ?? post.title_ja,
      prose: post.body_ko ?? post.body_ja,
      imageUrl: imageUrlProp,
      kind,
      cardVariant: 'outline' as const,
      cardPadding: 'md' as const,
      userMeta: timeAgo(post.created_at),
      stats: [
        { label: 'Likes', value: (post.likes_count ?? 0) + adj },
        { label: 'Comments', value: post.comments_count },
      ],
    }
  }

  const me = meStore.user
  const recommended = creatorStore.recommended
  const trending = feedStore.trending
  const posts = sortedPosts(feedStore.posts)
  // 서포터 전용 탭: 팔로우 피드 중 유료/멤버십(전체공개 아님) 콘텐츠만
  const supporterPosts = posts.filter((p: any) => p.view_type && p.view_type !== 'everyone')

  return (
    <SgDsLibraryStack
      style={{ width: '100%', height: '100%', overflow: 'scroll' }}
      as="main"
      data-wb-bg-token="surface-page"
      direction="row"
      align="stretch"
      gap="lg"
    >
      {/* ── Tip Dialog ── */}
      {tipDialogPostId && (
        <SgDsLibraryDialog
          open={true}
          title="후원하기"
          description="크리에이터에게 크레딧을 후원합니다."
          onDismiss={closeTipDialog}
          size="sm"
        >
          {/* 액션 버튼을 본문 안에서 직접 제어한다. Dialog의 action2 prop은
              콜백 완료와 무관하게 네이티브 dialog.close()를 호출해서
              에러/성공 상태를 보여주기 전에 다이얼로그가 닫혀버린다. */}
          <SgDsLibraryStack direction="column" gap="md" padding="sm">
            {tipError && <SgDsLibraryAlert status="danger" message={tipError} />}
            <SgDsLibraryText tone="secondary" variant="body-sm">후원 금액 (크레딧)</SgDsLibraryText>
            <SgDsLibraryInput
              type="number"
              value={tipAmount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTipAmount(e.target.value)}
              labelPosition="outside"
              size="md"
              shape="default"
              placeholder="100"
            />
            <SgDsLibraryStack direction="row" justify="end" gap="sm" paddingTop="sm">
              <SgDsLibraryButton variant="ghost" size="md" onClick={closeTipDialog} disabled={tipLoading}>취소</SgDsLibraryButton>
              <SgDsLibraryButton variant="primary" size="md" onClick={handleTipSubmit} disabled={tipLoading || tipSuccess}>
                {tipSuccess ? '완료!' : tipLoading ? '처리 중…' : '후원'}
              </SgDsLibraryButton>
            </SgDsLibraryStack>
          </SgDsLibraryStack>
        </SgDsLibraryDialog>
      )}

      {/* ── Charge Dialog (충전하기) ── */}
      {chargeOpen && (
        <SgDsLibraryDialog
          open={true}
          title="크레딧 충전하기"
          description="테스트 결제입니다 — 결제 즉시 충전됩니다. (실제 과금 없음)"
          onDismiss={closeChargeDialog}
          size="sm"
        >
          <SgDsLibraryStack direction="column" gap="md" padding="sm">
            {chargeError && <SgDsLibraryAlert status="danger" message={chargeError} />}
            {chargeSuccess ? (
              <>
                <SgDsLibraryAlert
                  status="success"
                  message={`충전 완료! 현재 잔액 ${meStore.coin != null ? meStore.coin.toLocaleString() : '—'} CRD`}
                />
                <SgDsLibraryStack direction="row" justify="end" gap="sm" paddingTop="sm">
                  <SgDsLibraryButton variant="primary" size="md" onClick={closeChargeDialog}>닫기</SgDsLibraryButton>
                </SgDsLibraryStack>
              </>
            ) : (
              <>
                <SgDsLibraryText tone="secondary" variant="body-sm">충전 금액 (CRD)</SgDsLibraryText>
                <SgDsLibraryStack direction="row" gap="sm" wrap={true}>
                  {[1000, 5000, 10000, 30000].map((amount) => (
                    <SgDsLibraryButton
                      key={amount}
                      variant={chargeAmount === amount ? 'primary' : 'soft'}
                      size="sm"
                      shape="pill"
                      onClick={() => setChargeAmount(amount)}
                      disabled={chargeLoading}
                    >
                      {amount.toLocaleString()} CRD
                    </SgDsLibraryButton>
                  ))}
                </SgDsLibraryStack>
                <SgDsLibraryStack direction="row" justify="end" gap="sm" paddingTop="sm">
                  <SgDsLibraryButton variant="ghost" size="md" onClick={closeChargeDialog} disabled={chargeLoading}>취소</SgDsLibraryButton>
                  <SgDsLibraryButton variant="primary" size="md" onClick={handleCharge} disabled={chargeLoading}>
                    {chargeLoading ? '처리 중…' : `${chargeAmount.toLocaleString()} CRD 결제하고 충전`}
                  </SgDsLibraryButton>
                </SgDsLibraryStack>
              </>
            )}
          </SgDsLibraryStack>
        </SgDsLibraryDialog>
      )}

      {/* ── Coin History Dialog (이력) ── */}
      {historyOpen && (
        <SgDsLibraryDialog
          open={true}
          title="크레딧 이력"
          description="충전·구매·후원 내역입니다."
          onDismiss={() => setHistoryOpen(false)}
          size="sm"
        >
          <SgDsLibraryStack direction="column" gap="sm" padding="sm" style={{ maxHeight: '420px', overflowY: 'auto' }}>
            {historyLoading ? (
              <SgDsLibraryText tone="tertiary" variant="body-sm">불러오는 중…</SgDsLibraryText>
            ) : meStore.histories.length === 0 ? (
              <SgDsLibraryText tone="tertiary" variant="body-sm">이력이 없어요</SgDsLibraryText>
            ) : (
              meStore.histories.map((h: any) => (
                <SgDsLibraryStack key={h.id} direction="row" align="center" justify="between" gap="sm" paddingBottom="xs" style={{ borderBottom: '1px solid var(--ds-color-border-default, rgba(0,0,0,0.08))' }}>
                  <SgDsLibraryStack direction="column" gap="none">
                    <SgDsLibraryText variant="ui-sm" weight="semibold">{historyTypeLabel(h.history_type)}</SgDsLibraryText>
                    <SgDsLibraryText tone="tertiary" variant="caption">
                      {[h.target_label, h.creator_nickname].filter(Boolean).join(' · ')}
                    </SgDsLibraryText>
                    <SgDsLibraryText tone="tertiary" variant="caption">{formatHistoryDate(h.created_at)}</SgDsLibraryText>
                  </SgDsLibraryStack>
                  <SgDsLibraryStack direction="column" gap="none" align="end">
                    <SgDsLibraryText
                      variant="ui-sm"
                      weight="semibold"
                      style={{ color: (h.amount ?? 0) >= 0 ? '#16a34a' : '#dc2626' }}
                    >
                      {(h.amount ?? 0) >= 0 ? '+' : ''}{(h.amount ?? 0).toLocaleString()} CRD
                    </SgDsLibraryText>
                    <SgDsLibraryText tone="tertiary" variant="caption">잔액 {(h.current_coin ?? 0).toLocaleString()} CRD</SgDsLibraryText>
                  </SgDsLibraryStack>
                </SgDsLibraryStack>
              ))
            )}
            <SgDsLibraryStack direction="row" justify="end" paddingTop="sm">
              <SgDsLibraryButton variant="ghost" size="md" onClick={() => setHistoryOpen(false)}>닫기</SgDsLibraryButton>
            </SgDsLibraryStack>
          </SgDsLibraryStack>
        </SgDsLibraryDialog>
      )}

      {/* ── Share Toast ── */}
      {shareToastPostId && (
        <SgDsLibraryToastRegion position="bottom-center">
          <SgDsLibraryToast
            status="success"
            variant="solid"
            message="링크가 클립보드에 복사되었습니다."
            showDismiss={false}
          />
        </SgDsLibraryToastRegion>
      )}

      {/* ── CENTER COLUMN ── */}
      <SgDsLibraryStack
        align="center"
        style={{
          width: '100%',
          paddingTop: 'var(--ds-spacing-space-3)',
          overflow: 'hidden',
          height: '100%',
          flex: '1 1 auto',
          minWidth: '600px',
        }}
        direction="column"
        gap="none"
      >
        <SgDsLibraryStack
          style={{
            width: '100%',
            overflow: 'scroll',
            flex: '1 1 auto',
            height: 'fit-content',
          }}
          as="div"
          radius="md"
          direction="column"
          align="center"
          justify="start"
          gap="2xl"
          padding="none"
          background="none"
        >
          <SgDsLibraryTabs
            style={{ height: 'fit-content', overflow: 'visible', maxWidth: '800px', width: '100%' }}
            variant="underline"
            size="lg"
          >
            {/* Sticky header: search + tabs */}
            <SgDsLibraryStack
              style={{ position: 'sticky', top: '0', zIndex: '1', paddingTop: 'var(--ds-spacing-space-2)' }}
              data-wb-bg-token="surface-page"
              direction="column"
              align="stretch"
              justify="start"
              gap="sm"
              padding="none"
              background="none"
            >
              <SgDsLibraryInput
                shape="pill"
                clearable={true}
                labelPosition="outside"
                type="search"
                placeholder="제목, 크리에이터, 태그 검색"
                leadingIcon="search"
                size="md"
              />
              <SgDsLibraryTabsList label="Tabs">
                <SgDsLibraryTab selected={activeTab === 0} onClick={() => handleTabChange(0)}>맞춤추천</SgDsLibraryTab>
                <SgDsLibraryTab selected={activeTab === 1} onClick={() => handleTabChange(1)}>서포터 전용</SgDsLibraryTab>
                <SgDsLibraryTab selected={activeTab === 2} onClick={() => handleTabChange(2)}>구독중</SgDsLibraryTab>
              </SgDsLibraryTabsList>
            </SgDsLibraryStack>

            {/* Tab 0: 맞춤추천 */}
            <SgDsLibraryTabsPanel selected={activeTab === 0}>
              <SgDsLibraryStack
                as="div"
                radius="none"
                direction="column"
                align="stretch"
                justify="start"
                gap="lg"
                padding="none"
                background="none"
              >
                <SgDsLibraryStack
                  style={{ height: '100%', overflow: 'scroll' }}
                  as="div"
                  radius="none"
                  direction="column"
                  align="stretch"
                  justify="start"
                  gap="none"
                  padding="none"
                  background="none"
                >
                  {/* Recommended creators strip */}
                  <SgDsLibraryStack
                    gap="none"
                    style={{ width: '100%', height: 'fit-content' }}
                    paddingTop="var(--ds-spacing-space-8)"
                    minWidth="0.5rem"
                  >
                    <SgDsLibrarySectionTitle
                      titleWeight="semibold"
                      titleAs="h4"
                      titleVariant="heading-4"
                      icon="user-star"
                      iconTone="none"
                      showIcon={true}
                      title="추천 크리에이터"
                      wrapActions={false}
                    />
                    <SgDsLibraryStoryStrip label="추천 크리에이터" scroll="auto">
                      {recommended.length > 0
                        ? recommended.map((creator: any) => (
                          <SgDsLibraryStory
                            key={creator.id}
                            avatarSrc={creator.profile_image ?? undefined}
                            label={creator.nickname ?? ''}
                            initials={getInitials(creator.nickname)}
                            state="unseen"
                            avatarTone="brand"
                            size="lg"
                            onClick={() => navigate('/creator/' + creator.id)}
                          />
                        ))
                        : (
                          <>
                            <SgDsLibraryStory avatarSrc="https://i.pinimg.com/1200x/ca/70/2c/ca702cddd216a2990f402aa303f4a03e.jpg" label="Hailey" initials="HL" badge="LIVE" state="unseen" avatarTone="brand" size="lg" />
                            <SgDsLibraryStory avatarSrc="https://i.pinimg.com/736x/a8/37/8c/a8378cc951d79b9130952b0914f92ee6.jpg" label="NeoVoice" initials="NV" badge="LIVE" state="unseen" avatarTone="teal" size="lg" />
                            <SgDsLibraryStory avatarSrc="https://i.pinimg.com/1200x/e8/df/8e/e8df8ee3fd256e1fa1b1714a59d03517.jpg" label="Ren M." initials="RM" badge="LIVE" state="unseen" avatarTone="purple" size="lg" />
                            <SgDsLibraryStory avatarSrc="https://i.pinimg.com/1200x/b9/45/02/b94502342dfd29c213a99bb1d93c151d.jpg" label="Koda" initials="KO" state="unseen" avatarTone="amber" size="lg" />
                            <SgDsLibraryStory avatarSrc="https://i.pinimg.com/736x/ac/30/ad/ac30ad5b4d550027ff5be9fe95e3f196.jpg" label="aether" initials="AT" state="unseen" avatarTone="coral" size="lg" />
                          </>
                        )
                      }
                    </SgDsLibraryStoryStrip>
                  </SgDsLibraryStack>

                  {/* Feed */}
                  <SgDsLibraryPostStack style={{ height: '100%' }} newCount="24" showNewPill={true}>
                    <SgDsLibrarySectionTitle
                      titleWeight="semibold"
                      titleAs="h4"
                      titleVariant="heading-4"
                      icon="layout-list"
                      iconTone="none"
                      showIcon={true}
                      title="추천 피드"
                      wrapActions={false}
                    >
                      <SgDsLibrarySectionTitleGroup align="end">
                        <SgDsLibraryButtonPopover
                          fullWidth={false}
                          defaultOpen={false}
                          arrow={false}
                          leadingIcon="sliders-horizontal"
                          trailingIcon="chevron-down"
                          placement="bottom-end"
                          buttonLabel={sortLabel()}
                          buttonShape="default"
                          buttonSize="sm"
                          buttonVariant="soft"
                          closeOnItemClick={true}
                        >
                          <SgDsLibraryPopoverList>
                            <SgDsLibraryPopoverItem icon="clock" onClick={() => setSortMode('latest')}>최신순</SgDsLibraryPopoverItem>
                            <SgDsLibraryPopoverItem icon="flame" onClick={() => setSortMode('popular')}>인기순</SgDsLibraryPopoverItem>
                            <SgDsLibraryPopoverItem icon="sparkles" onClick={() => setSortMode('recommend')}>추천순</SgDsLibraryPopoverItem>
                          </SgDsLibraryPopoverList>
                        </SgDsLibraryButtonPopover>
                      </SgDsLibrarySectionTitleGroup>
                    </SgDsLibrarySectionTitle>

                    {feedStore.loading && posts.length === 0 && (
                      <SgDsLibraryStack align="center" justify="center" padding="2xl">
                        <SgDsLibraryText tone="tertiary">피드를 불러오는 중...</SgDsLibraryText>
                      </SgDsLibraryStack>
                    )}
                    {!feedStore.loading && posts.length === 0 && (
                      <SgDsLibraryStack align="center" justify="center" padding="2xl">
                        <SgDsLibraryText tone="tertiary">추천 피드가 없습니다.</SgDsLibraryText>
                      </SgDsLibraryStack>
                    )}
                    {posts.map((post: any) => {
                      const card = mapPostToCard(post)
                      return (
                        <SgDsLibraryPostCard
                          key={post.id}
                          {...card}
                          liked={interactionsStore.isLiked(post.id)}
                          onLikeClick={() => interactionsStore.toggleLike(post.id)}
                          onCommentClick={() => navigate('/video/' + post.id)}
                          onContentClick={() => navigate('/video/' + post.id)}
                          onShareClick={() => handleShare(post)}
                          onSupportClick={() => { setTipDialogPostId(String(post.id)); setTipAmount('100') }}
                          onUserClick={() => navigate('/creator/' + post.creator_user?.id)}
                          onMoreClick={() => {}}
                        />
                      )
                    })}
                  </SgDsLibraryPostStack>
                </SgDsLibraryStack>

                {/* Load more — 맞춤추천 탭은 fetchDiscover 직접 호출 */}
                {feedStore.hasMore() && (
                  <SgDsLibraryStack direction="row" justify="center" padding="var(--ds-spacing-space-4)">
                    <SgDsLibraryButton
                      variant="ghost"
                      size="sm"
                      label="더 불러오기"
                      trailingIcon="chevron-down"
                      onClick={() => feedStore.fetchDiscover((feedStore.meta?.page ?? 1) + 1)}
                    />
                  </SgDsLibraryStack>
                )}

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
            </SgDsLibraryTabsPanel>

            {/* Tab 1: 서포터 전용 */}
            <SgDsLibraryTabsPanel selected={activeTab === 1}>
              <SgDsLibraryPostStack style={{ height: '100%' }} newCount="0" showNewPill={false}>
                {feedStore.loading && supporterPosts.length === 0 && (
                  <SgDsLibraryStack align="center" justify="center" padding="2xl">
                    <SgDsLibraryText tone="tertiary">피드를 불러오는 중...</SgDsLibraryText>
                  </SgDsLibraryStack>
                )}
                {!feedStore.loading && supporterPosts.length === 0 && (
                  <SgDsLibraryStack align="center" justify="center" padding="2xl" style={{ paddingTop: 'var(--ds-spacing-space-12)' }}>
                    <SgDsLibraryEmptyState
                      showArt
                      artIcon="gem"
                      size="md"
                      title="서포터 전용 콘텐츠가 아직 없어요"
                      body="팔로우한 크리에이터의 멤버십·구매 콘텐츠가 여기에 모여요."
                      actionsSlot={
                        <SgDsLibraryButton variant="primary" size="sm" onClick={() => navigate('/creator')}>
                          크리에이터 둘러보기
                        </SgDsLibraryButton>
                      }
                    />
                  </SgDsLibraryStack>
                )}
                {supporterPosts.map((post: any) => {
                  const card = mapPostToCard(post)
                  return (
                    <SgDsLibraryPostCard
                      key={post.id}
                      {...card}
                      liked={interactionsStore.isLiked(post.id)}
                      onLikeClick={() => interactionsStore.toggleLike(post.id)}
                      onCommentClick={() => navigate('/video/' + post.id)}
                          onContentClick={() => navigate('/video/' + post.id)}
                      onShareClick={() => handleShare(post)}
                      onSupportClick={() => { setTipDialogPostId(String(post.id)); setTipAmount('100') }}
                      onUserClick={() => navigate('/creator/' + post.creator_user?.id)}
                      onMoreClick={() => {}}
                    />
                  )
                })}
              </SgDsLibraryPostStack>
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
            </SgDsLibraryTabsPanel>

            {/* Tab 2: 구독중 */}
            <SgDsLibraryTabsPanel selected={activeTab === 2}>
              <SgDsLibraryPostStack style={{ height: '100%' }} newCount="0" showNewPill={false}>
                {feedStore.loading && posts.length === 0 && (
                  <SgDsLibraryStack align="center" justify="center" padding="2xl">
                    <SgDsLibraryText tone="tertiary">피드를 불러오는 중...</SgDsLibraryText>
                  </SgDsLibraryStack>
                )}
                {!feedStore.loading && posts.length === 0 && (
                  <SgDsLibraryStack align="center" justify="center" padding="2xl" style={{ paddingTop: 'var(--ds-spacing-space-12)' }}>
                    <SgDsLibraryEmptyState
                      showArt
                      artIcon="user-plus"
                      size="md"
                      title="아직 팔로우한 크리에이터가 없어요"
                      body="크리에이터를 팔로우하면 새 포스트가 여기에 모여요."
                      actionsSlot={
                        <SgDsLibraryButton variant="primary" size="sm" onClick={() => navigate('/creator')}>
                          크리에이터 둘러보기
                        </SgDsLibraryButton>
                      }
                    />
                  </SgDsLibraryStack>
                )}
                {posts.map((post: any) => {
                  const card = mapPostToCard(post)
                  return (
                    <SgDsLibraryPostCard
                      key={post.id}
                      {...card}
                      liked={interactionsStore.isLiked(post.id)}
                      onLikeClick={() => interactionsStore.toggleLike(post.id)}
                      onCommentClick={() => navigate('/video/' + post.id)}
                          onContentClick={() => navigate('/video/' + post.id)}
                      onShareClick={() => handleShare(post)}
                      onSupportClick={() => { setTipDialogPostId(String(post.id)); setTipAmount('100') }}
                      onUserClick={() => navigate('/creator/' + post.creator_user?.id)}
                      onMoreClick={() => {}}
                    />
                  )
                })}
              </SgDsLibraryPostStack>
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
            </SgDsLibraryTabsPanel>
          </SgDsLibraryTabs>
        </SgDsLibraryStack>
      </SgDsLibraryStack>

      {/* ── RIGHT ASIDE ── */}
      <SgDsLibraryStack
        style={{
          height: '100%',
          paddingBottom: 'var(--ds-spacing-space-4)',
          minWidth: '280px',
          maxWidth: '320px',
          overflowY: 'auto',
        }}
        as="aside"
        align="stretch"
        gap="2xl"
        padding="lg"
      >
        {/* My UserCard */}
        <SgDsLibraryUserCard
          style={{ flex: '0 0 auto' }}
          action2Variant="primary"
          action1Variant="ghost"
          tint="default"
          variant="outline"
        >
          <SgDsLibraryUserCardHead
            style={{ height: '84px' }}
            name={me?.nickname ?? 'Me'}
            avatarSrc={me?.profile_image ?? undefined}
          >
            <SgDsLibraryUserBlock
              avatarSize="lg"
              avatarSrc={me?.profile_image ?? undefined}
              style={{ width: '100%' }}
              name={me?.nickname ?? '사용자'}
              meta={`@${me?.username ?? 'me'} · ${me?.creator_user?.status === 'active' ? '크리에이터' : '팬'}`}
              initials={getInitials(me?.nickname)}
              avatarTone="purple"
              verified={me?.creator_user?.status === 'active'}
              size="md"
            >
              <SgDsLibraryButtonPopover
                leadingIcon="ellipsis"
                iconOnly={true}
                trailingIcon="chevron-down"
                placement="bottom-end"
                buttonLabel="최신순"
                buttonShape="pill"
                buttonSize="sm"
                buttonVariant="soft"
                closeOnItemClick={true}
              >
                <SgDsLibraryPopoverList>
                  <SgDsLibraryPopoverItem icon="circle-user" onClick={() => navigate('/me')}>프로필</SgDsLibraryPopoverItem>
                  <SgDsLibraryPopoverItem icon="book-marked" onClick={() => navigate('/library')}>라이브러리</SgDsLibraryPopoverItem>
                  <SgDsLibraryPopoverItem icon="settings" onClick={() => navigate('/me')}>설정</SgDsLibraryPopoverItem>
                  <SgDsLibraryPopoverItem icon="log-out" onClick={handleLogout}>로그아웃</SgDsLibraryPopoverItem>
                </SgDsLibraryPopoverList>
              </SgDsLibraryButtonPopover>
            </SgDsLibraryUserBlock>
          </SgDsLibraryUserCardHead>
          <SgDsLibraryUserCardStats
            style={{ padding: 'var(--ds-spacing-space-2)' }}
            followersLabel="팔로워"
            followersValue={me?.followers_count != null ? String(me.followers_count) : '—'}
            followingLabel="멤버"
            followingValue={me?.following_count != null ? String(me.following_count) : '—'}
            postsLabel="포스트"
            postsValue={me?.posts_count != null ? String(me.posts_count) : '—'}
          />
          <SgDsLibraryUserCardSection style={{ height: 'fit-content' }} tint="sunken">
            {/* 기본 action 버튼은 onClick을 받지 않으므로 actionsSlot으로 직접 렌더링 */}
            <SgDsLibraryCreditBalanceCard
              showRows={true}
              showActions={true}
              balance={meStore.coin != null ? meStore.coin.toLocaleString() : '—'}
              actionsSlot={
                <>
                  <SgDsLibraryButton size="sm" variant="primary" onClick={() => setChargeOpen(true)}>충전하기</SgDsLibraryButton>
                  <SgDsLibraryButton size="sm" variant="secondary" onClick={openHistoryDialog}>이력</SgDsLibraryButton>
                </>
              }
            >
              <SgDsLibraryCreditBalanceCardRow style={{ height: '21px' }} label="후원자" value="—" delta="" />
              <SgDsLibraryCreditBalanceCardRow style={{ height: '21px' }} label="오늘 받은 후원" value="—" delta="" />
            </SgDsLibraryCreditBalanceCard>
          </SgDsLibraryUserCardSection>
        </SgDsLibraryUserCard>

        {/* YOVO 트렌딩 — 실제 포스트의 (좋아요 + 댓글) 합산 순위. 동률이면 먼저 올라온 순 */}
        <SgDsLibraryStack style={{ height: 'fit-content' }} direction="column" gap="none">
          <SgDsLibraryStack style={{ padding: '0px', margin: '0px' }} direction="row" align="center" justify="between">
            <SgDsLibraryText as="h3" variant="ui" weight="semibold">YOVO 트렌딩</SgDsLibraryText>
            <SgDsLibraryLink tailIcon="chevron-right" external={false} variant="subtle" size="sm" href="#" onClick={(e: React.MouseEvent) => { e.preventDefault(); navigate('/video') }}>모두보기</SgDsLibraryLink>
          </SgDsLibraryStack>
          {trending.length > 0
            ? trending.map((post: any, i: number) => (
              <SgDsLibraryTopicRow
                key={post.id}
                rank={i + 1}
                title={post.title_ko || post.creator_user?.nickname || '제목 없음'}
                sub={`♥ ${post.likes_count ?? 0} · 💬 ${post.comments_count ?? 0}`}
                delta={post.creator_user?.nickname ?? ''}
                deltaTone="neutral"
                divider={i < trending.length - 1}
                style={{ cursor: 'pointer' }}
                onClick={() => navigate('/video/' + post.id)}
              />
            ))
            : (
              <SgDsLibraryText as="p" variant="caption" tone="tertiary" style={{ padding: 'var(--ds-spacing-space-2) 0' }}>
                아직 트렌딩 작품이 없어요.
              </SgDsLibraryText>
            )
          }
        </SgDsLibraryStack>

        {/* 팔로우 추천 — from creatorStore.recommended */}
        <SgDsLibraryStack as="section" direction="column" gap="xs" aria-label="팔로우 추천">
          <SgDsLibraryStack direction="row" align="center" justify="between">
            <SgDsLibraryText as="h3" variant="ui" weight="semibold">팔로우 추천</SgDsLibraryText>
            <SgDsLibraryLink variant="subtle" size="sm" href="#" onClick={(e: React.MouseEvent) => { e.preventDefault(); creatorStore.fetchRecommended() }}>새로고침</SgDsLibraryLink>
          </SgDsLibraryStack>
          <SgDsLibraryStack direction="column" gap="md">
            {recommended.length > 0
              ? recommended.slice(0, 5).map((creator: any) => (
                <SgDsLibraryUserBlock
                  key={creator.id}
                  avatarSize="sm"
                  avatarSrc={creator.profile_image ?? undefined}
                  name={creator.nickname ?? ''}
                  meta={creator.introduction || `팔로워 ${creator.followers_count ?? 0}`}
                  initials={getInitials(creator.nickname)}
                  avatarTone="brand"
                  verified={creator.creator_type === 'official'}
                  size="sm"
                  onClick={() => navigate('/creator/' + creator.id)}
                  style={{ cursor: 'pointer' }}
                />
              ))
              : (
                <SgDsLibraryText as="p" variant="caption" tone="tertiary">추천할 크리에이터가 없어요.</SgDsLibraryText>
              )
            }
          </SgDsLibraryStack>
        </SgDsLibraryStack>
      </SgDsLibraryStack>
    </SgDsLibraryStack>
  )
}
