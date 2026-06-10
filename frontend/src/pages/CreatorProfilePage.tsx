import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { apiFetch } from '@/lib/api'
import {
  SgDsLibraryStack,
  SgDsLibraryText,
  SgDsLibraryButton,
  SgDsLibraryAvatar,
  SgDsLibraryBadge,
  SgDsLibraryChip,
  SgDsLibraryCardGrid,
  SgDsLibraryVideoListCard,
} from '@/libraries/sg-ds-library/components'
import { useCreatorStore } from '@/stores/creator'

function timeAgo(ms: number | null | undefined): string {
  if (!ms) return ''
  const diff = Date.now() - ms
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return '방금 전'
  if (mins < 60) return `${mins}분 전`
  const hours = Math.floor(mins / 60)
  return hours < 24 ? `${hours}시간 전` : `${Math.floor(hours / 24)}일 전`
}

export default function CreatorProfilePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { currentCreator, creatorLoading, fetchCreatorUser } = useCreatorStore()

  const [posts, setPosts] = useState<any[]>([])
  const [postsMeta, setPostsMeta] = useState<any>(null)
  const [postsLoading, setPostsLoading] = useState(false)
  const [following, setFollowing] = useState(false)
  const [followId, setFollowId] = useState<number | null>(null)

  const { follow, unfollow } = useCreatorStore()

  useEffect(() => {
    if (!id) return
    fetchCreatorUser(id).then(() => {
      const creator = useCreatorStore.getState().currentCreator
      setFollowing(creator?.interaction_with_me?.is_following ?? false)
      setFollowId(creator?.interaction_with_me?.follow_id ?? null)
    })
    fetchPosts(id, 1)
    // reset posts when id changes
    setPosts([])
    setPostsMeta(null)
  }, [id])

  async function fetchPosts(creatorId: string, page: number) {
    setPostsLoading(true)
    try {
      const res = await apiFetch(`/api/v/creator_users/${creatorId}/posts`, { query: { page } })
      setPosts((prev) => page === 1 ? res.data : [...prev, ...res.data])
      setPostsMeta(res.meta)
    } finally {
      setPostsLoading(false)
    }
  }

  async function handleFollow() {
    if (!currentCreator) return
    if (following) {
      if (followId) await unfollow(followId, currentCreator.id)
      setFollowing(false)
      setFollowId(null)
    } else {
      const res = await follow(currentCreator.id)
      setFollowId(res?.id ?? null)
      setFollowing(true)
    }
  }

  async function handleDm() {
    if (!currentCreator) return
    try {
      await apiFetch('/api/v/chat_rooms', {
        method: 'POST',
        body: { creator_user_id: currentCreator.id },
      })
    } catch {
      // ignore
    }
    navigate('/dm')
  }

  if (creatorLoading || !currentCreator) {
    return (
      <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
        <SgDsLibraryStack align="center" justify="center" padding="2xl" style={{ minHeight: '200px' }}>
          <SgDsLibraryText tone="tertiary">불러오는 중...</SgDsLibraryText>
        </SgDsLibraryStack>
      </div>
    )
  }

  const creator = currentCreator
  const initials = (creator.nickname ?? '?').slice(0, 2).toUpperCase()
  const isMyAccount = creator.interaction_with_me?.is_my_account

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
      <SgDsLibraryStack
        direction="column"
        align="center"
        gap="none"
        style={{ width: '100%' }}
      >
        {/* Banner */}
        <div
          style={{
            width: '100%',
            height: '200px',
            background: creator.background_image
              ? `url(${creator.background_image}) center/cover`
              : (creator.background_color ?? 'linear-gradient(135deg, #1e1b4b, #4c1d95)'),
            flexShrink: 0,
          }}
        />

        {/* Profile section */}
        <SgDsLibraryStack
          direction="column"
          align="start"
          gap="lg"
          padding="lg"
          style={{
            width: '100%',
            maxWidth: '900px',
            marginTop: '-40px',
            boxSizing: 'border-box',
          }}
        >
          {/* Avatar row */}
          <SgDsLibraryStack direction="row" align="end" justify="between" style={{ width: '100%' }}>
            <SgDsLibraryAvatar
              src={creator.profile_image ?? undefined}
              initials={initials}
              size="2xl"
              shape="circle"
              tone="brand"
              alt={creator.nickname}
              style={{
                border: '4px solid var(--ds-color-background-default)',
                background: 'var(--ds-color-background-default)',
              }}
            />
            {!isMyAccount && (
              <SgDsLibraryStack direction="row" gap="sm" align="center">
                <SgDsLibraryButton
                  variant={following ? 'primary' : 'secondary'}
                  size="md"
                  shape="pill"
                  leadingIcon={following ? 'check' : 'plus'}
                  onClick={handleFollow}
                >
                  {following ? '팔로잉' : '팔로우'}
                </SgDsLibraryButton>
                <SgDsLibraryButton
                  variant="soft"
                  size="md"
                  shape="pill"
                  leadingIcon="message-circle"
                  onClick={handleDm}
                >
                  메시지
                </SgDsLibraryButton>
              </SgDsLibraryStack>
            )}
          </SgDsLibraryStack>

          {/* Name + badges + bio */}
          <SgDsLibraryStack direction="column" gap="xs">
            <SgDsLibraryStack direction="row" align="center" gap="xs">
              <SgDsLibraryText as="h1" variant="heading-3" weight="bold">{creator.nickname}</SgDsLibraryText>
              {creator.creator_type === 'official' && (
                <SgDsLibraryBadge status="info" variant="solid" size="sm" shape="pill">공식</SgDsLibraryBadge>
              )}
            </SgDsLibraryStack>
            {creator.username && (
              <SgDsLibraryText tone="tertiary" variant="body-sm">@{creator.username}</SgDsLibraryText>
            )}
            {creator.introduction && (
              <SgDsLibraryText tone="secondary" variant="body-sm" style={{ maxWidth: '600px' }}>
                {creator.introduction}
              </SgDsLibraryText>
            )}

            {/* Stats */}
            <SgDsLibraryStack direction="row" gap="lg" style={{ marginTop: '4px' }}>
              <SgDsLibraryStack direction="column" gap="none" width="auto">
                <SgDsLibraryText as="span" variant="body" weight="bold">
                  {(creator.followers_count ?? 0).toLocaleString()}
                </SgDsLibraryText>
                <SgDsLibraryText as="span" variant="caption" tone="tertiary">팔로워</SgDsLibraryText>
              </SgDsLibraryStack>
              <SgDsLibraryStack direction="column" gap="none" width="auto">
                <SgDsLibraryText as="span" variant="body" weight="bold">
                  {(creator.posts_count ?? 0).toLocaleString()}
                </SgDsLibraryText>
                <SgDsLibraryText as="span" variant="caption" tone="tertiary">작품</SgDsLibraryText>
              </SgDsLibraryStack>
              <SgDsLibraryStack direction="column" gap="none" width="auto">
                <SgDsLibraryText as="span" variant="body" weight="bold">
                  {(creator.likes_count ?? 0).toLocaleString()}
                </SgDsLibraryText>
                <SgDsLibraryText as="span" variant="caption" tone="tertiary">좋아요</SgDsLibraryText>
              </SgDsLibraryStack>
            </SgDsLibraryStack>

            {/* Tags */}
            {creator.tags?.length > 0 && (
              <SgDsLibraryStack direction="row" gap="xs" wrap={true}>
                {creator.tags.map((tag: string) => (
                  <SgDsLibraryChip key={tag} size="sm">#{tag}</SgDsLibraryChip>
                ))}
              </SgDsLibraryStack>
            )}
          </SgDsLibraryStack>

          {/* Posts section */}
          <SgDsLibraryStack direction="column" gap="md" style={{ width: '100%' }}>
            <SgDsLibraryText as="h2" variant="heading-5" weight="semibold">작품</SgDsLibraryText>

            {postsLoading && posts.length === 0 ? (
              <SgDsLibraryText tone="tertiary">불러오는 중...</SgDsLibraryText>
            ) : !postsLoading && posts.length === 0 ? (
              <SgDsLibraryText tone="tertiary">아직 작품이 없습니다.</SgDsLibraryText>
            ) : (
              <SgDsLibraryCardGrid
                cols="4"
                count={posts.length}
                itemSize="custom"
                itemSizeOverride="240px"
                layout="grid"
                gap="md"
                arrows={false}
              >
                {posts.map((post: any) => (
                  <SgDsLibraryVideoListCard
                    key={post.id}
                    thumbnailImageUrl={post.locked_thumbnail_url ?? undefined}
                    title={post.title_ko ?? post.title ?? ''}
                    creatorName={creator.nickname ?? ''}
                    meta={timeAgo(post.created_at)}
                    thumbnailAspect="16/9"
                    avatarAlt={creator.nickname ?? ''}
                    avatarInitials={initials}
                    avatarSrc={creator.profile_image ?? undefined}
                    showGrain={true}
                    variant="vertical"
                    avatarTone="brand"
                    titleLines="2"
                    size="sm"
                    avatarSize="sm"
                    avatarShape="circle"
                    thumbnailBackground="linear-gradient(140deg, #0c1429, #4c1d95 50%, #be185d)"
                    actionIcon="ellipsis"
                    showAction={true}
                  />
                ))}
              </SgDsLibraryCardGrid>
            )}

            {postsMeta?.next && (
              <SgDsLibraryStack direction="row" justify="center" padding="lg">
                <SgDsLibraryButton
                  variant="ghost"
                  size="sm"
                  trailingIcon="chevron-down"
                  disabled={postsLoading}
                  onClick={() => id && fetchPosts(id, (postsMeta?.page ?? 1) + 1)}
                >
                  더 불러오기
                </SgDsLibraryButton>
              </SgDsLibraryStack>
            )}
          </SgDsLibraryStack>
        </SgDsLibraryStack>
      </SgDsLibraryStack>
    </div>
  )
}
