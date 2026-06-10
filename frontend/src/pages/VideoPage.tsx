import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  SgDsLibraryAlert,
  SgDsLibraryBreadcrumb,
  SgDsLibraryBreadcrumbCurrent,
  SgDsLibraryBreadcrumbItem,
  SgDsLibraryBreadcrumbLink,
  SgDsLibraryButton,
  SgDsLibraryCard,
  SgDsLibraryCardGrid,
  SgDsLibraryChip,
  SgDsLibraryComment,
  SgDsLibraryDivider,
  SgDsLibraryStack,
  SgDsLibraryStat,
  SgDsLibraryStatList,
  SgDsLibraryText,
  SgDsLibraryUserBlock,
  SgDsLibraryPopoverList,
  SgDsLibraryPopoverItem,
  SgDsLibraryButtonPopover,
  SgDsLibraryVideoListCard,
  SgDsLibrarySectionTitleGroup,
  SgDsLibrarySectionTitle,
  SgDsLibraryToolbarGroup,
  SgDsLibraryCommentInput,
  SgDsLibraryLink,
  SgDsLibraryTopicRow,
  SgDsLibraryPostListItem,
} from '@/libraries/sg-ds-library/components'
import { useVideoStore } from '@/stores/video'
import { apiFetch } from '@/lib/api'
import type { SgDsLibraryCommentInputProps } from '@/libraries/sg-ds-library/components/CommentInput'

function timeAgo(ms?: number | string | null): string {
  if (!ms) return ''
  const diff = Date.now() - Number(ms)
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return '방금 전'
  if (mins < 60) return `${mins}분 전`
  const hours = Math.floor(mins / 60)
  return hours < 24 ? `${hours}시간 전` : `${Math.floor(hours / 24)}일 전`
}

function formatDate(iso?: string | null): string {
  if (!iso) return ''
  const d = new Date(iso)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

// 댓글 객체의 liked 상태 판단 (서버 필드 또는 로컬 오버라이드)
function isCommentLiked(c: any, localLikes: Record<number, boolean>): boolean {
  if (c.id in localLikes) return localLikes[c.id]
  return c.interaction?.liked ?? c.liked ?? false
}

function getCommentLikeCount(c: any, localLikeDelta: Record<number, number>): number {
  const base = c.likes_count ?? 0
  return base + (localLikeDelta[c.id] ?? 0)
}

export default function VideoPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { currentPost: post, postLoading, fetchPost, likePost, unlikePost, bookmarkPost, unbookmarkPost } = useVideoStore()

  const [creatorPosts, setCreatorPosts] = useState<any[]>([])
  const [comments, setComments] = useState<any[]>([])
  const [purchaseError, setPurchaseError] = useState<string | null>(null)

  // comment reply state
  const [replyTo, setReplyTo] = useState<{ id: number; username: string } | null>(null)

  // comment like local state (optimistic)
  const [localLikes, setLocalLikes] = useState<Record<number, boolean>>({})
  const [localLikeDelta, setLocalLikeDelta] = useState<Record<number, number>>({})

  const liked = post?.interaction_with_me?.liked ?? false
  const bookmarked = post?.interaction_with_me?.bookmarked ?? false

  // buyer_only and not yet purchased
  const showPurchaseAlert = post?.view_type === 'buyer_only' && !(post?.interaction_with_me?.purchased)

  // find video media
  const videoMedia = post?.media?.find((m: any) => m.content_type?.startsWith('video/'))
  const imageMedia = post?.media?.find((m: any) => m.content_type?.startsWith('image/'))
  const thumbnailSrc = imageMedia?.url ?? post?.thumbnail_url ?? ''
  const isLocked = post?.view_type === 'buyer_only' && !post?.interaction_with_me?.purchased && (!post?.media || post.media.length === 0)

  useEffect(() => {
    if (!id) return
    fetchPost(id)
    apiFetch(`/api/v/posts/${id}/post_comments`)
      .then((res: any) => setComments(res.post_comments ?? res.data ?? []))
      .catch(() => setComments([]))
  }, [id])

  const prevCreatorId = useRef<any>(null)
  useEffect(() => {
    const creatorId = post?.creator_user?.id
    if (!creatorId || creatorId === prevCreatorId.current) return
    prevCreatorId.current = creatorId
    apiFetch(`/api/v/creator_users/${creatorId}/posts`, { query: { limit: 8 } })
      .then((res: any) => {
        setCreatorPosts((res.data ?? []).filter((p: any) => String(p.id) !== String(id)))
      })
      .catch(() => setCreatorPosts([]))
  }, [post?.creator_user?.id])

  function toggleLike() {
    if (!id) return
    if (liked) unlikePost(id)
    else likePost(id)
  }

  function toggleBookmark() {
    if (!id) return
    if (bookmarked) unbookmarkPost(id)
    else bookmarkPost(id)
  }

  async function handlePurchase() {
    if (!id) return
    setPurchaseError(null)
    try {
      const res: any = await apiFetch(`/api/v/posts/${id}/purchase`, { method: 'POST' })
      // update store with fresh post data that includes unlocked media
      useVideoStore.setState({ currentPost: res.post })
    } catch (e: any) {
      const msg = e?.data?.message ?? e?.message ?? '구매에 실패했습니다'
      setPurchaseError(msg)
    }
  }

  async function handleCommentSubmit(text: string) {
    if (!id || !text.trim()) return
    try {
      const body: any = { text }
      if (replyTo) body.parent_id = replyTo.id
      const res: any = await apiFetch(`/api/v/posts/${id}/post_comments`, { method: 'POST', body })
      const newComment = res.post_comment ?? res
      setComments((prev) => [...prev, newComment])
      setReplyTo(null)
    } catch (e) {
      console.error('comment submit error:', e)
    }
  }

  async function handleCommentLike(c: any) {
    const currentlyLiked = isCommentLiked(c, localLikes)
    // optimistic update
    setLocalLikes((prev) => ({ ...prev, [c.id]: !currentlyLiked }))
    setLocalLikeDelta((prev) => ({ ...prev, [c.id]: (prev[c.id] ?? 0) + (currentlyLiked ? -1 : 1) }))
    try {
      if (currentlyLiked) {
        await apiFetch(`/api/v/post_comments/${c.id}/post_comment_likes`, { method: 'DELETE' })
      } else {
        await apiFetch(`/api/v/post_comments/${c.id}/post_comment_likes`, { method: 'POST' })
      }
    } catch (e) {
      // revert
      setLocalLikes((prev) => ({ ...prev, [c.id]: currentlyLiked }))
      setLocalLikeDelta((prev) => ({ ...prev, [c.id]: (prev[c.id] ?? 0) + (currentlyLiked ? 1 : -1) }))
    }
  }

  function handleShare() {
    navigator.clipboard.writeText(window.location.href).catch(() => {})
  }

  const creatorId = post?.creator_user?.id

  return (
    <SgDsLibraryStack
      style={{ width: '100%', height: '100%', overflow: 'hidden' }}
      as="main"
      direction="row"
      align="stretch"
      gap="lg"
    >
      <SgDsLibraryStack
        justify="start"
        scrollFade={false}
        align="center"
        style={{
          width: '100%',
          minWidth: 'var(--ds-spacing-dialog-max-width-md)',
          paddingTop: '0.75rem',
          overflow: 'hidden',
          height: '100%',
          flex: '1 1 auto',
          paddingRight: 'var(--ds-spacing-space-4)',
        }}
        direction="column"
        gap="none"
      >
        <SgDsLibraryStack
          style={{ height: '100%', overflow: 'hidden', width: '100%', maxWidth: '1960px' }}
          as="div"
          radius="none"
          direction="column"
          align="center"
          justify="start"
          gap="xs"
          padding="none"
          background="none"
        >
          {/* Sticky header */}
          <SgDsLibraryStack
            background="none"
            style={{
              height: 'fit-content',
              width: '100%',
              paddingTop: 'var(--ds-spacing-space-2)',
              top: '0px',
              position: 'sticky',
              zIndex: 1,
              paddingBottom: 'var(--ds-spacing-space-3)',
            }}
            as="header"
            direction="row"
            align="center"
            gap="md"
            wrap={false}
          >
            <SgDsLibraryButton
              shape="pill"
              variant="soft"
              size="md"
              leadingIcon="arrow-left"
              iconOnly
              aria-label="뒤로가기"
              onClick={() => navigate(-1)}
            />
            <SgDsLibraryStack flex="1 1 auto" direction="column" gap="xs">
              <SgDsLibraryBreadcrumb size="sm" separator="chevron">
                <SgDsLibraryBreadcrumbItem style={{ height: '16px' }}>
                  <SgDsLibraryBreadcrumbLink href="/video">작품</SgDsLibraryBreadcrumbLink>
                </SgDsLibraryBreadcrumbItem>
                {post?.category && (
                  <SgDsLibraryBreadcrumbItem>
                    <SgDsLibraryBreadcrumbLink href="/video">{post.category}</SgDsLibraryBreadcrumbLink>
                  </SgDsLibraryBreadcrumbItem>
                )}
                <SgDsLibraryBreadcrumbItem>
                  <SgDsLibraryBreadcrumbCurrent>{post?.title ?? '로딩 중...'}</SgDsLibraryBreadcrumbCurrent>
                </SgDsLibraryBreadcrumbItem>
              </SgDsLibraryBreadcrumb>
            </SgDsLibraryStack>
            <SgDsLibraryButton shape="pill" variant="soft" size="md" leadingIcon="ellipsis" iconOnly aria-label="더보기" />
          </SgDsLibraryStack>

          <SgDsLibraryStack
            scrollFade={false}
            style={{ width: '100%', height: '100%', overflow: 'scroll' }}
            as="div"
            radius="md"
            direction="row"
            align="stretch"
            justify="start"
            gap="2xl"
            padding="none"
            background="none"
          >
            {/* Main content column */}
            <SgDsLibraryStack
              style={{ width: '100%', overflow: 'scroll', flex: '1 1 auto', height: '100%' }}
              as="div"
              radius="md"
              direction="column"
              align="center"
              justify="start"
              gap="2xl"
              padding="none"
              background="none"
            >
              <SgDsLibraryStack as="div" direction="column" align="stretch" justify="start" gap="xs" padding="none" background="none">
                {/* Purchase alert */}
                {post && showPurchaseAlert && (
                  <SgDsLibraryAlert
                    style={{ width: '100%' }}
                    actionPlacement="end"
                    hideIcon={false}
                    status="info"
                    variant="flat"
                    icon="lock"
                    title="전체 재생은 구매 후 가능해요"
                    message={purchaseError ?? `미리듣기 00:30 · 전체 ${post.duration ?? ''}`}
                    actions={
                      <SgDsLibraryButton variant="primary" size="sm" shape="pill" onClick={handlePurchase}>
                        구매하기
                      </SgDsLibraryButton>
                    }
                  />
                )}

                {/* Post media */}
                {post && (
                  <div style={{ position: 'relative', width: '100%' }}>
                    {videoMedia ? (
                      <video
                        key={post.id}
                        controls
                        src={videoMedia.url}
                        poster={thumbnailSrc}
                        style={{
                          width: '100%',
                          aspectRatio: '16/9',
                          borderRadius: 'var(--ds-radius-md)',
                          background: '#000',
                          display: 'block',
                        }}
                      />
                    ) : (
                      <SgDsLibraryPostListItem
                        mediaSrc={thumbnailSrc}
                        avatarSrc={post.creator_user?.avatar_url ?? ''}
                        style={{ width: '100%', cursor: creatorId ? 'pointer' : undefined }}
                        title={post.title ?? ''}
                        initials={(post.creator_user?.username ?? 'U').slice(0, 2)}
                        meta={`${post.creator_user?.username ?? ''} · ${timeAgo(post.created_at)}`}
                        avatarAlt={post.creator_user?.username ?? ''}
                        showAvatar={true}
                        variant="vertical"
                        avatarTone="amber"
                        size="lg"
                        avatarSize="sm"
                        avatarShape="circle"
                        mediaAspect="16/9"
                        mediaBackground="linear-gradient(140deg, #0c1429 0%, #4c1d95 50%, #be185d 100%)"
                        mediaBadgeStatus="info"
                        mediaBadgeVariant="solid"
                        mediaDuration={post.duration ?? ''}
                        mediaLiveLabel="LIVE"
                        mediaLockActionShape="pill"
                        mediaLockActionSize="sm"
                        mediaLockActionVariant="primary"
                        mediaLockIcon="lock"
                        mediaPlayLabel="Play"
                        mediaProgressLabel="Media progress"
                        mediaShowGrain={true}
                        mediaShowPlay={true}
                        mediaSize="sm"
                        mediaProgress={0}
                      />
                    )}
                    {/* Locked overlay for buyer_only with no media */}
                    {isLocked && (
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: 'var(--ds-radius-md)',
                          background: 'rgba(0,0,0,0.6)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.75rem',
                        }}
                      >
                        <SgDsLibraryText as="p" variant="heading-3" weight="bold" style={{ color: '#fff' }}>
                          구매 후 시청 가능한 콘텐츠입니다
                        </SgDsLibraryText>
                        <SgDsLibraryButton variant="primary" size="md" shape="pill" onClick={handlePurchase}>
                          구매하기
                        </SgDsLibraryButton>
                        {purchaseError && (
                          <SgDsLibraryText as="p" variant="body-sm" style={{ color: '#fca5a5' }}>
                            {purchaseError}
                          </SgDsLibraryText>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Stats row */}
                <SgDsLibraryStack as="div" direction="column" align="stretch" justify="start" gap="none" padding="none" background="none">
                  <SgDsLibraryDivider variant="solid" orientation="horizontal" labelPosition="center" inset="none" />
                  <SgDsLibraryStack direction="row" align="center" gap="md" wrap={false}>
                    <SgDsLibraryStatList brandStat={true} style={{ width: '100%', flex: '0 0 auto' }} size="md">
                      <SgDsLibraryStat icon="heart" value={String(post?.likes_count ?? 0)} label="좋아요" />
                      <SgDsLibraryStat icon="message-circle" value={String(comments.length)} label="댓글" />
                      <SgDsLibraryStat icon="eye" value={String(post?.views_count ?? 0)} label="조회" />

                      <SgDsLibraryToolbarGroup align="end">
                        <SgDsLibraryButton
                          shape="pill"
                          variant={liked ? 'soft' : 'ghost'}
                          size="md"
                          leadingIcon="heart"
                          iconOnly
                          aria-label="좋아요"
                          onClick={toggleLike}
                        />
                        <SgDsLibraryButton
                          shape="pill"
                          variant={bookmarked ? 'soft' : 'ghost'}
                          size="md"
                          leadingIcon="bookmark"
                          iconOnly
                          aria-label="저장"
                          onClick={toggleBookmark}
                        />
                        <SgDsLibraryButtonPopover
                          leadingIcon="ellipsis"
                          iconOnly={true}
                          trailingIcon="chevron-down"
                          placement="bottom-end"
                          buttonLabel="더보기"
                          buttonShape="pill"
                          buttonSize="sm"
                          buttonVariant="soft"
                          closeOnItemClick={true}
                        >
                          <SgDsLibraryPopoverList>
                            <SgDsLibraryPopoverItem icon="share-2" onClick={handleShare}>공유</SgDsLibraryPopoverItem>
                            <SgDsLibraryPopoverItem icon="triangle-alert" onClick={() => alert('접수되었습니다')}>신고</SgDsLibraryPopoverItem>
                          </SgDsLibraryPopoverList>
                        </SgDsLibraryButtonPopover>
                      </SgDsLibraryToolbarGroup>
                    </SgDsLibraryStatList>
                  </SgDsLibraryStack>
                </SgDsLibraryStack>
              </SgDsLibraryStack>

              {/* Description + meta + comments + related */}
              <SgDsLibraryStack
                style={{ maxWidth: 'var(--ds-spacing-dialog-max-width-lg)', height: 'fit-content', paddingBottom: 'var(--ds-spacing-space-8)', overflow: 'visible' }}
                as="div"
                direction="column"
                align="stretch"
                justify="start"
                gap="xl"
                padding="none"
                background="none"
              >
                <SgDsLibraryStack as="div" direction="column" align="stretch" justify="start" gap="sm" padding="none" background="none">
                  {/* Description */}
                  <SgDsLibraryStack as="section" direction="column" gap="sm">
                    {post?.body && (
                      <SgDsLibraryText as="p" variant="body" tone="secondary" style={{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
                        {post.body}
                      </SgDsLibraryText>
                    )}

                    {/* Tags */}
                    {post?.tags && post.tags.length > 0 && (
                      <SgDsLibraryStack align="center" justify="start" direction="row" gap="xs" wrap={true}>
                        {post.tags.map((tag: string) => (
                          <SgDsLibraryChip key={tag} icon="" tone="neutral" variant="default">
                            #{tag}
                          </SgDsLibraryChip>
                        ))}
                      </SgDsLibraryStack>
                    )}
                  </SgDsLibraryStack>

                  {/* Meta card */}
                  <SgDsLibraryCard variant="outline" padding="md" gap="none">
                    {post?.published_at && (
                      <>
                        <SgDsLibraryStack style={{ height: '21px' }} direction="row" align="center" gap="md" paddingTop="sm" paddingBottom="sm">
                          <SgDsLibraryText as="span" variant="body-sm" weight="regular" tone="tertiary" style={{ width: '90px', whiteSpace: 'nowrap' }}>공개일</SgDsLibraryText>
                          <SgDsLibraryText as="span" variant="body" weight="regular" style={{ flex: 1, fontVariantNumeric: 'tabular-nums' }}>
                            {formatDate(post.published_at)}
                          </SgDsLibraryText>
                        </SgDsLibraryStack>
                        <SgDsLibraryDivider variant="dotted" />
                      </>
                    )}
                    {post?.duration && (
                      <>
                        <SgDsLibraryStack direction="row" align="center" gap="md" paddingTop="sm" paddingBottom="sm">
                          <SgDsLibraryText as="span" variant="body-sm" weight="regular" tone="tertiary" style={{ width: '90px', whiteSpace: 'nowrap' }}>재생시간</SgDsLibraryText>
                          <SgDsLibraryText as="span" variant="body" weight="regular" style={{ flex: 1, fontVariantNumeric: 'tabular-nums' }}>
                            {post.duration}
                          </SgDsLibraryText>
                        </SgDsLibraryStack>
                        <SgDsLibraryDivider variant="dotted" />
                      </>
                    )}
                    {post?.category && (
                      <>
                        <SgDsLibraryStack direction="row" align="center" gap="md" paddingTop="sm" paddingBottom="sm">
                          <SgDsLibraryText as="span" variant="body-sm" weight="regular" tone="tertiary" style={{ width: '90px', whiteSpace: 'nowrap' }}>카테고리</SgDsLibraryText>
                          <SgDsLibraryText as="span" variant="body" weight="regular" style={{ flex: 1 }}>
                            {post.category}
                          </SgDsLibraryText>
                        </SgDsLibraryStack>
                        <SgDsLibraryDivider variant="dotted" />
                      </>
                    )}
                    {post?.tags && post.tags.length > 0 && (
                      <SgDsLibraryStack justify="center" direction="row" gap="md" align="start" paddingTop="md" paddingBottom="sm">
                        <SgDsLibraryText as="span" variant="body-sm" weight="regular" tone="tertiary" style={{ width: '90px', paddingTop: 6, whiteSpace: 'nowrap' }}>
                          태그
                        </SgDsLibraryText>
                        <SgDsLibraryStack direction="row" gap="xs" wrap={true} flex="1 1 auto" paddingTop="xs">
                          {post.tags.map((tag: string) => (
                            <SgDsLibraryChip key={tag} size="sm" tone="neutral" variant="default">#{tag}</SgDsLibraryChip>
                          ))}
                        </SgDsLibraryStack>
                      </SgDsLibraryStack>
                    )}
                  </SgDsLibraryCard>

                  <SgDsLibraryStack direction="row" justify="center" align="center" gap="sm" paddingTop="md">
                    <SgDsLibraryButton variant="ghost" size="sm" leadingIcon="triangle-alert" onClick={() => alert('접수되었습니다')}>신고하기</SgDsLibraryButton>
                    <SgDsLibraryButton variant="ghost" size="sm" leadingIcon="ban" onClick={() => alert('접수되었습니다')}>사용자 차단</SgDsLibraryButton>
                  </SgDsLibraryStack>
                </SgDsLibraryStack>

                {/* Comments */}
                <SgDsLibraryStack style={{ height: 'fit-content' }} as="section" direction="column" gap="md">
                  <SgDsLibraryStack direction="row" align="center" gap="sm">
                    <SgDsLibraryText as="h3" variant="heading-3" weight="bold" style={{ flex: 1 }}>
                      댓글{' '}
                      <SgDsLibraryText as="span" variant="heading-3" weight="bold" tone="tertiary">
                        {comments.length}
                      </SgDsLibraryText>
                    </SgDsLibraryText>
                  </SgDsLibraryStack>

                  <SgDsLibraryStack as="div" direction="column" align="stretch" justify="start" gap="xxs" padding="none" background="none">
                    {(() => {
                      const commentInputProps: SgDsLibraryCommentInputProps = {
                        showCancel: replyTo != null,
                        readOnly: false,
                        disabled: false,
                        initials: 'ME',
                        placeholder: replyTo ? `@${replyTo.username}에게 답글` : '댓글을 입력하세요',
                        showAvatar: true,
                        avatarTone: 'brand',
                        rows: '3',
                        maxLength: '300',
                        showAttachment: true,
                        showCounter: true,
                        showEmoji: true,
                        submitLabel: '등록',
                        onSubmit: ((text: string) => { handleCommentSubmit(text) }) as SgDsLibraryCommentInputProps['onSubmit'],
                        onCancel: () => setReplyTo(null),
                      }
                      return <SgDsLibraryCommentInput {...commentInputProps} />
                    })()}
                    <SgDsLibraryDivider />
                    {comments.map((c: any) => (
                      <div key={c.id}>
                        <SgDsLibraryComment
                          author={c.user?.username ?? c.username ?? 'user'}
                          avatarSrc={c.user?.avatar_url ?? ''}
                          avatarTone="neutral"
                          initials={(c.user?.username ?? 'U').slice(0, 2)}
                          time={timeAgo(c.created_at)}
                          body={c.body ?? c.content ?? c.text ?? ''}
                          likeCount={getCommentLikeCount(c, localLikeDelta)}
                          replyCount={c.replies_count ?? 0}
                          liked={isCommentLiked(c, localLikes)}
                          onLikeClick={() => handleCommentLike(c)}
                          onReplyClick={() => setReplyTo({ id: c.id, username: c.user?.username ?? c.username ?? 'user' })}
                          onFlagClick={() => alert('접수되었습니다')}
                          onMoreClick={() => {}}
                        />
                        <SgDsLibraryDivider />
                      </div>
                    ))}
                    {comments.length === 0 && !postLoading && (
                      <SgDsLibraryText as="p" variant="body-sm" tone="tertiary" style={{ textAlign: 'center', padding: '1rem' }}>
                        첫 댓글을 남겨보세요
                      </SgDsLibraryText>
                    )}
                  </SgDsLibraryStack>
                </SgDsLibraryStack>

                {/* Creator's other works */}
                {creatorPosts.length > 0 && (
                  <SgDsLibraryStack style={{ maxWidth: '1400px' }} as="section" direction="column" gap="xs">
                    <SgDsLibrarySectionTitle
                      style={{ width: '100%' }}
                      title={`${post?.creator_user?.username ?? ''}의 다른 작품`}
                      as="header"
                      align="center"
                      iconTone="none"
                      showIcon={false}
                      subtitleTone="tertiary"
                      subtitleVariant="body-sm"
                      titleAs="h4"
                      titleVariant="heading-4"
                      titleWeight="bold"
                      wrapActions={true}
                    >
                      <SgDsLibrarySectionTitleGroup align="end">
                        <SgDsLibraryButton
                          trailingIcon="chevron-right"
                          badgeVariant="danger"
                          variant="soft"
                          size="sm"
                          shape="default"
                          onClick={() => creatorId && navigate(`/creator/${creatorId}`)}
                        >
                          모두보기
                        </SgDsLibraryButton>
                      </SgDsLibrarySectionTitleGroup>
                    </SgDsLibrarySectionTitle>
                    <SgDsLibraryCardGrid
                      count={creatorPosts.length}
                      itemSize="custom"
                      itemSizeOverride="240px"
                      layout="row"
                      gap="sm"
                      arrows={false}
                      edgeFade="fade"
                      scroll="snap"
                    >
                      {creatorPosts.map((p: any) => (
                        <SgDsLibraryVideoListCard
                          key={p.id}
                          mediaSize="sm"
                          showAvatar={false}
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
                          avatarAlt=""
                          avatarInitials=""
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
                          onAvatarClick={() => p.creator_user?.id && navigate(`/creator/${p.creator_user.id}`)}
                          onActionClick={() => navigator.clipboard.writeText(`${window.location.origin}/video/${p.id}`).catch(() => {})}
                        />
                      ))}
                    </SgDsLibraryCardGrid>
                  </SgDsLibraryStack>
                )}

                {/* Related posts (dummy) */}
                <SgDsLibraryStack style={{ maxWidth: '1400px' }} as="section" direction="column" gap="xs">
                  <SgDsLibrarySectionTitle
                    style={{ width: '100%' }}
                    title="비슷한 작품"
                    as="header"
                    align="center"
                    iconTone="none"
                    showIcon={false}
                    subtitleTone="tertiary"
                    subtitleVariant="body-sm"
                    titleAs="h4"
                    titleVariant="heading-4"
                    titleWeight="bold"
                    wrapActions={true}
                  >
                    <SgDsLibrarySectionTitleGroup align="end">
                      <SgDsLibraryButton
                        trailingIcon="chevron-right"
                        badgeVariant="danger"
                        variant="soft"
                        size="sm"
                        shape="default"
                        onClick={() => navigate('/video')}
                      >
                        모두보기
                      </SgDsLibraryButton>
                    </SgDsLibrarySectionTitleGroup>
                  </SgDsLibrarySectionTitle>
                  <SgDsLibraryText as="p" variant="body-sm" tone="tertiary" style={{ padding: '0.5rem 0' }}>
                    추천 작품을 불러오는 중...
                  </SgDsLibraryText>
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
                  <SgDsLibraryStack wrap={true} as="div" direction="row" align="stretch" justify="center" gap="sm" padding="none" background="none">
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

            {/* Right sidebar */}
            <SgDsLibraryStack
              style={{ height: '100%', paddingBottom: '1rem', maxWidth: '320px', minWidth: '280px', position: 'sticky', top: '0' }}
              as="aside"
              align="stretch"
              gap="2xl"
              padding="none"
            >
              {/* Trending */}
              <SgDsLibraryStack style={{ height: 'fit-content' }} gap="none" direction="column">
                <SgDsLibraryStack style={{ height: 'fit-content' }} direction="column" gap="none">
                  <SgDsLibraryStack style={{ padding: '0px', margin: '0px' }} direction="row" align="center" justify="between" height="21px">
                    <SgDsLibraryText as="h3" variant="ui" weight="semibold">YOVO 트랜딩</SgDsLibraryText>
                    <SgDsLibraryLink tailIcon="chevron-right" external={false} variant="subtle" size="sm" href="/video">모두보기</SgDsLibraryLink>
                  </SgDsLibraryStack>
                  <SgDsLibraryTopicRow rank={1} title="달이 지는 도시" sub="317K 시청 · 1,840 후원자" delta="+218%" deltaTone="brand" divider={true} />
                  <SgDsLibraryTopicRow rank={2} title="#synthwave" sub="이번 주 새 트랙 218개" delta="+94%" deltaTone="neutral" divider={true} />
                  <SgDsLibraryTopicRow rank={3} title="한국어 내레이션" sub="12개 모집 진행 중" delta="+61%" deltaTone="neutral" divider={true} />
                  <SgDsLibraryTopicRow rank={4} title="Lumen-X EP.4 비하인드" sub="신규 멤버 +182 / 7일" delta="—" deltaTone="neutral" divider={true} />
                  <SgDsLibraryTopicRow rank={5} title="aether.studio" sub="「여름 끝의 라디오」 응답 모집" delta="NEW" deltaTone="brand" divider={false} />
                </SgDsLibraryStack>
              </SgDsLibraryStack>

              {/* Suggested creators */}
              <SgDsLibraryStack as="section" direction="column" gap="var(--ds-spacing-space-2)" aria-label="Suggested creators">
                <SgDsLibraryStack direction="row" align="center" justify="between" marginBottom="12px" height="21px">
                  <SgDsLibraryText as="h3" variant="ui" weight="semibold">팔로우 추천</SgDsLibraryText>
                  <SgDsLibraryLink variant="subtle" size="sm" href="#">새로고침</SgDsLibraryLink>
                </SgDsLibraryStack>
                <SgDsLibraryStack direction="column" gap="md">
                  <SgDsLibraryUserBlock avatarSize="sm" avatarSrc="https://i.pinimg.com/1200x/b9/45/02/b94502342dfd29c213a99bb1d93c151d.jpg" name="SOYU" meta="보컬 · 24.1K" initials="SY" avatarTone="pink" verified={true} size="sm" />
                  <SgDsLibraryUserBlock avatarSize="sm" avatarSrc="https://i.pinimg.com/1200x/ca/70/2c/ca702cddd216a2990f402aa303f4a03e.jpg" name="Mika 三輪" meta="첼리스트 · 8.6K" initials="MK" avatarTone="green" size="sm" />
                  <SgDsLibraryUserBlock avatarSize="sm" avatarSrc="https://i.pinimg.com/1200x/e8/df/8e/e8df8ee3fd256e1fa1b1714a59d03517.jpg" name="Nexus Choir" meta="합창 · 3.2K" initials="NX" avatarTone="blue" size="sm" />
                </SgDsLibraryStack>
              </SgDsLibraryStack>
            </SgDsLibraryStack>
          </SgDsLibraryStack>
        </SgDsLibraryStack>
      </SgDsLibraryStack>
    </SgDsLibraryStack>
  )
}
