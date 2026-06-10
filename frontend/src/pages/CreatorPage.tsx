import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  SgDsLibraryStack,
  SgDsLibrarySectionTitle,
  SgDsLibrarySectionTitleGroup,
  SgDsLibraryInput,
  SgDsLibraryCard,
  SgDsLibraryCardGrid,
  SgDsLibraryText,
  SgDsLibraryButton,
  SgDsLibraryAvatar,
  SgDsLibraryChip,
  SgDsLibraryIcon,
} from '@/libraries/sg-ds-library/components'
import { useCreatorStore } from '@/stores/creator'

export default function CreatorPage() {
  const navigate = useNavigate()
  const {
    recommended,
    discover,
    listLoading,
    fetchRecommended,
    fetchDiscover,
    search,
    follow,
    unfollow,
  } = useCreatorStore()

  const [searchQuery, setSearchQuery] = useState('')
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    fetchRecommended()
    fetchDiscover()
    return () => {
      if (searchTimerRef.current) clearTimeout(searchTimerRef.current)
    }
  }, [fetchRecommended, fetchDiscover])

  function handleSearch(value: string) {
    setSearchQuery(value)
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current)
    searchTimerRef.current = setTimeout(() => {
      if (value.trim()) search(value.trim())
      else fetchDiscover()
    }, 300)
  }

  async function handleFollow(creator: any) {
    if (creator.interaction_with_me?.is_following) {
      const followId = creator.interaction_with_me?.follow_id
      if (followId) await unfollow(followId, creator.id)
    } else {
      await follow(creator.id)
    }
  }

  function getInitials(name: string) {
    return (name ?? '?').slice(0, 2).toUpperCase()
  }

  const displayList = discover

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
      <SgDsLibraryStack
        style={{ minWidth: '800px' }}
        as="section"
        justify="start"
        wrap={false}
        direction="column"
        align="center"
        gap="2xl"
        padding="lg"
        width="100%"
        height="fit-content"
      >
        {/* Header: title + search */}
        <SgDsLibrarySectionTitle
          style={{ width: '100%', maxWidth: '1400px' }}
          title="크리에이터 탐색"
          icon="user-star"
          as="header"
          align="center"
          iconTone="brand"
          showIcon={false}
          titleAs="h1"
          titleVariant="heading-1"
          titleWeight="bold"
          wrapActions={true}
        >
          <SgDsLibrarySectionTitleGroup
            style={{ flex: '0 1 auto', maxWidth: 'var(--ds-spacing-dialog-max-width-sm)', width: '100%' }}
            align="end"
          >
            <SgDsLibraryInput
              style={{ width: '100%' }}
              shape="pill"
              clearable={true}
              labelPosition="outside"
              type="search"
              placeholder="크리에이터, 태그 검색…"
              leadingIcon="search"
              size="md"
              value={searchQuery}
              onInput={(e: any) => handleSearch(e.target?.value ?? '')}
            />
          </SgDsLibrarySectionTitleGroup>
        </SgDsLibrarySectionTitle>

        {/* 추천 크리에이터 */}
        {recommended.length > 0 && (
          <SgDsLibraryStack style={{ maxWidth: '1400px' }} as="section" direction="column" gap="sm" width="100%">
            <SgDsLibrarySectionTitle
              style={{ width: '100%' }}
              title="추천 크리에이터"
              icon="trending-up"
              as="header"
              align="center"
              iconTone="none"
              showIcon={true}
              titleAs="h4"
              titleVariant="heading-4"
              titleWeight="bold"
              wrapActions={true}
            />
            <SgDsLibraryCardGrid
              count={recommended.length}
              itemSize="custom"
              itemSizeOverride="200px"
              layout="row"
              gap="sm"
              arrows={false}
              edgeFade="fade"
              scroll="snap"
            >
              {recommended.map((creator: any) => {
                const isFollowing = creator.interaction_with_me?.is_following
                return (
                  <SgDsLibraryCard
                    key={creator.id}
                    variant="outline"
                    padding="lg"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/creator/${creator.id}`)}
                  >
                    <SgDsLibraryStack direction="column" align="center" gap="md">
                      <SgDsLibraryStack direction="column" align="center" gap="xxs" padding="none">
                        <SgDsLibraryAvatar
                          src={creator.profile_image ?? undefined}
                          initials={getInitials(creator.nickname)}
                          size="2xl"
                          shape="circle"
                          tone="brand"
                          alt={creator.nickname}
                          style={{ cursor: 'pointer' }}
                        />
                        <SgDsLibraryStack justify="center" direction="row" align="center" gap="xxs">
                          <SgDsLibraryText as="p" variant="body" weight="semibold">{creator.nickname}</SgDsLibraryText>
                          {creator.creator_type === 'official' && (
                            <SgDsLibraryIcon name="badge-check" size="14px" />
                          )}
                        </SgDsLibraryStack>
                        {creator.username && (
                          <SgDsLibraryText as="p" variant="caption" tone="tertiary">@{creator.username}</SgDsLibraryText>
                        )}
                      </SgDsLibraryStack>
                      <SgDsLibraryButton
                        style={{ width: '100%' }}
                        variant={isFollowing ? 'primary' : 'soft'}
                        size="sm"
                        shape="pill"
                        leadingIcon={isFollowing ? 'check' : 'plus'}
                        onClick={(e: any) => { e.stopPropagation(); handleFollow(creator) }}
                      >
                        {isFollowing ? '팔로잉' : '팔로우'}
                      </SgDsLibraryButton>
                    </SgDsLibraryStack>
                  </SgDsLibraryCard>
                )
              })}
            </SgDsLibraryCardGrid>
          </SgDsLibraryStack>
        )}

        {/* 모든 크리에이터 (둘러보기 / 검색 결과) */}
        <SgDsLibraryStack style={{ maxWidth: '1400px' }} as="section" direction="column" gap="md" width="100%">
          <SgDsLibrarySectionTitle
            style={{ width: '100%' }}
            title={searchQuery.trim() ? `"${searchQuery}" 검색 결과` : '모든 크리에이터'}
            icon="users"
            as="header"
            align="center"
            iconTone="none"
            showIcon={true}
            titleAs="h4"
            titleVariant="heading-4"
            titleWeight="bold"
            wrapActions={true}
          />

          {listLoading && displayList.length === 0 ? (
            <SgDsLibraryStack align="center" justify="center" padding="2xl">
              <SgDsLibraryText tone="tertiary">불러오는 중...</SgDsLibraryText>
            </SgDsLibraryStack>
          ) : displayList.length === 0 ? (
            <SgDsLibraryStack align="center" justify="center" padding="2xl">
              <SgDsLibraryText tone="tertiary">크리에이터가 없습니다.</SgDsLibraryText>
            </SgDsLibraryStack>
          ) : (
            <SgDsLibraryCardGrid
              cols="4"
              count={displayList.length}
              itemSize="custom"
              itemSizeOverride="300px"
              layout="grid"
              gap="sm"
              arrows={false}
              edgeFade="visible"
            >
              {displayList.map((creator: any) => {
                const isFollowing = creator.interaction_with_me?.is_following
                return (
                  <SgDsLibraryCard
                    key={creator.id}
                    variant="solid"
                    padding="none"
                    gap="none"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/creator/${creator.id}`)}
                  >
                    <SgDsLibraryStack
                      style={{
                        height: '160px',
                        backgroundImage: creator.profile_image
                          ? `url(${creator.profile_image})`
                          : undefined,
                        background: !creator.profile_image
                          ? (creator.background_color ?? 'linear-gradient(135deg, #1e1b4b, #4c1d95)')
                          : undefined,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                      radius="none"
                      direction="row"
                      align="end"
                      justify="start"
                      padding="md"
                    >
                      <SgDsLibraryAvatar
                        src={creator.profile_image ?? undefined}
                        initials={getInitials(creator.nickname)}
                        size="lg"
                        shape="circle"
                        tone="brand"
                        alt={creator.nickname}
                      />
                    </SgDsLibraryStack>
                    <SgDsLibraryStack direction="column" gap="sm" padding="md">
                      <SgDsLibraryStack direction="column" gap="none">
                        <SgDsLibraryStack direction="row" align="center" gap="xxs">
                          <SgDsLibraryText as="h6" variant="heading-6" weight="semibold">{creator.nickname}</SgDsLibraryText>
                          {creator.creator_type === 'official' && (
                            <SgDsLibraryIcon name="badge-check" size="16" />
                          )}
                        </SgDsLibraryStack>
                        {creator.username && (
                          <SgDsLibraryText as="p" variant="caption" tone="tertiary">@{creator.username}</SgDsLibraryText>
                        )}
                      </SgDsLibraryStack>
                      {creator.introduction && (
                        <SgDsLibraryText as="p" variant="body" tone="secondary" truncate={true} truncateLines="2">
                          {creator.introduction}
                        </SgDsLibraryText>
                      )}
                      {creator.tags?.length > 0 && (
                        <SgDsLibraryStack direction="row" align="center" gap="xxs" wrap={false}>
                          {creator.tags.slice(0, 3).map((tag: string) => (
                            <SgDsLibraryChip key={tag} size="sm">#{tag}</SgDsLibraryChip>
                          ))}
                        </SgDsLibraryStack>
                      )}
                      <SgDsLibraryStack direction="row" align="center" justify="between" gap="sm">
                        <SgDsLibraryStack direction="row" align="center" gap="md" width="auto">
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
                        </SgDsLibraryStack>
                        <SgDsLibraryButton
                          variant={isFollowing ? 'primary' : 'secondary'}
                          size="sm"
                          shape="pill"
                          leadingIcon={isFollowing ? 'check' : 'plus'}
                          onClick={(e: any) => { e.stopPropagation(); handleFollow(creator) }}
                        >
                          {isFollowing ? '팔로잉' : '팔로우'}
                        </SgDsLibraryButton>
                      </SgDsLibraryStack>
                    </SgDsLibraryStack>
                  </SgDsLibraryCard>
                )
              })}
            </SgDsLibraryCardGrid>
          )}
        </SgDsLibraryStack>

        {listLoading && displayList.length > 0 && (
          <SgDsLibraryStack direction="row" justify="center" padding="lg" height="40px">
            <SgDsLibraryText tone="tertiary" variant="body-sm">불러오는 중...</SgDsLibraryText>
          </SgDsLibraryStack>
        )}
      </SgDsLibraryStack>
    </div>
  )
}
