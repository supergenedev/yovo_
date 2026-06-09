<script setup>
import {
  Alert,
  Breadcrumb,
  BreadcrumbCurrent,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Card,
  CardGrid,
  Chip,
  Comment,
  Divider,
  Stack,
  Stat,
  StatList,
  Text,
  UserBlock,
  UserCard,
  UserCardHead,
  PopoverList,
  PopoverItem,
  ButtonPopover,
  VideoListCard,
  SectionTitleGroup,
  SectionTitle,
  ToolbarGroup,
  CommentInput,
  Link,
  TopicRow,
  PostListItem,
} from '@/components'
import { onMounted, computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useVideoStore } from '@/stores/video'
import { useCreatorStore } from '@/stores/creator'
import { apiFetch } from '@/utils/api/apiFetch'

const route = useRoute()
const router = useRouter()
const videoStore = useVideoStore()
const creatorStore = useCreatorStore()

const post = computed(() => videoStore.currentPost)
const liked = computed(() => post.value?.interaction_with_me?.liked ?? false)
const bookmarked = computed(() => post.value?.interaction_with_me?.bookmarked ?? false)

const creatorPosts = ref([])
const comments = ref([])
const commentsLoading = ref(false)

onMounted(async () => {
  await videoStore.fetchPost(route.params.id)
  fetchComments()
  creatorStore.fetchDiscover()
  if (!videoStore.posts.length) videoStore.fetchVideoPosts()
})

watch(post, (val) => {
  if (val?.creator_user?.id) {
    apiFetch(`/api/v/creator_users/${val.creator_user.id}/posts`, { query: { limit: 8 } })
      .then(res => { creatorPosts.value = (res.data ?? []).filter(p => String(p.id) !== String(route.params.id)) })
      .catch(() => {})
  }
}, { immediate: false })

async function fetchComments() {
  commentsLoading.value = true
  try {
    const res = await apiFetch(`/api/v/posts/${route.params.id}/post_comments`)
    comments.value = res.post_comments ?? res.data ?? []
  } catch (e) {
    comments.value = []
  } finally {
    commentsLoading.value = false
  }
}

function toggleLike() {
  if (liked.value) videoStore.unlikePost(route.params.id)
  else videoStore.likePost(route.params.id)
}

function toggleBookmark() {
  if (bookmarked.value) videoStore.unbookmarkPost(route.params.id)
  else videoStore.bookmarkPost(route.params.id)
}

function timeAgo(ms) {
  if (!ms) return ''
  const diff = Date.now() - ms
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return '방금 전'
  if (mins < 60) return `${mins}분 전`
  const hours = Math.floor(mins / 60)
  return hours < 24 ? `${hours}시간 전` : `${Math.floor(hours / 24)}일 전`
}
</script>

<template>
  <Stack
    :style="{ width: '100%', height: '100%', overflow: 'hidden' }"
    as="main"
    direction="row"
    align="stretch"
    gap="lg"
  >
    <Stack
      justify="start"
      :scrollFade="false"
      align="center"
      :style="{ width: '100%', minWidth: 'var(--ds-spacing-dialog-max-width-md)', paddingTop: '0.75rem', overflow: 'hidden', height: '100%', flex: '1 1 auto', paddingRight: 'var(--ds-spacing-space-4)' }"
      direction="column"
      gap="none"
    >
      <!-- Hero details -->
      <Stack
        :style="{ height: '100%', overflow: 'hidden', width: '100%', maxWidth: '1960px' }"
        as="div"
        radius="none"
        direction="column"
        align="center"
        justify="start"
        gap="xs"
        padding="none"
        background="none"
      >
        <Stack
          background="none"
          :style="{ height: 'fit-content', width: '100%', paddingTop: 'var(--ds-spacing-space-2)', top: '0px', position: 'sticky', zIndex: '1', paddingBottom: 'var(--ds-spacing-space-3)' }"
          as="header"
          direction="row"
          align="center"
          gap="md"
          :wrap="false"
        >
          <Button shape="pill" variant="soft" size="md" leadingIcon="arrow-left" iconOnly aria-label="뒤로" @click="router.go(-1)" />
          <Stack flex="1 1 auto" direction="column" gap="xs">
            <Breadcrumb size="sm" separator="chevron">
              <BreadcrumbItem :style="{ height: '16px' }">
                <BreadcrumbLink href="#">작품</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">보이스 · ASMR</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbCurrent>{{ post?.title_ko ?? '작품 상세' }}</BreadcrumbCurrent>
              </BreadcrumbItem>
            </Breadcrumb>
          </Stack>
          <Button shape="pill" variant="soft" size="md" leadingIcon="ellipsis" iconOnly aria-label="더보기" />
        </Stack>

        <Stack
          :scrollFade="false"
          :style="{ width: '100%', height: '100%', overflow: 'scroll' }"
          as="div"
          radius="md"
          direction="row"
          align="stretch"
          justify="start"
          gap="2xl"
          padding="none"
          background="none"
        >
          <Stack
            :style="{ width: '100%', overflow: 'scroll', flex: '1 1 auto', height: '100%' }"
            as="div"
            radius="md"
            direction="column"
            align="center"
            justify="start"
            gap="2xl"
            padding="none"
            background="none"
          >
            <Stack as="div" radius="none" direction="column" align="stretch" justify="start" gap="xs" padding="none" background="none">
              <Alert
                v-if="post?.view_type === 'buyer_only' && !post?.interaction_with_me?.seen"
                :style="{ width: '100%' }"
                action1Variant="primary"
                action1Label="구매하기"
                actionPlacement="end"
                :hideIcon="false"
                status="info"
                variant="flat"
                icon="lock"
                title="전체 재생은 구매 후 가능해요"
                :message="post?.content_price ? `가격: ⓒ ${post.content_price}` : ''"
              />
              <PostListItem
                :mediaSrc="post?.locked_thumbnail_url ?? undefined"
                :avatarSrc="post?.creator_user?.profile_image ?? undefined"
                :style="{ width: '100%' }"
                :title="post?.title_ko ?? ''"
                :initials="(post?.creator_user?.nickname ?? '?')[0]"
                :meta="post?.creator_user?.nickname ?? ''"
                :avatarAlt="post?.creator_user?.nickname ?? ''"
                :showAvatar="true"
                variant="vertical"
                avatarTone="brand"
                size="lg"
                avatarSize="sm"
                avatarShape="circle"
                mediaAspect="16/9"
                mediaBackground="linear-gradient(140deg, #0c1429 0%, #4c1d95 50%, #be185d 100%)"
                mediaBadgeStatus="info"
                mediaBadgeVariant="solid"
                mediaLockActionShape="pill"
                mediaLockActionSize="sm"
                mediaLockActionVariant="primary"
                mediaLockIcon="lock"
                mediaPlayLabel="Play"
                mediaProgressLabel="Media progress"
                :mediaShowGrain="true"
                :mediaShowPlay="true"
                mediaSize="sm"
              />
              <Stack as="div" radius="none" direction="column" align="stretch" justify="start" gap="none" padding="none" background="none">
                <Divider variant="solid" orientation="horizontal" labelPosition="center" inset="none" />
                <Stack direction="column" gap="none">
                  <Stack direction="row" align="center" gap="md" :wrap="false">
                    <StatList :brandStat="true" :style="{ width: '100%', flex: '0 0 auto' }" size="md">
                      <Stat icon="heart" :value="String(post?.likes_count ?? 0)" label="좋아요" />
                      <Stat icon="message-circle" :value="String(post?.comments_count ?? 0)" label="댓글" />
                      <ToolbarGroup align="end">
                        <Button shape="pill" :variant="liked ? 'primary' : 'ghost'" size="md" leadingIcon="heart" iconOnly aria-label="좋아요" @click="toggleLike" />
                        <Button shape="pill" :variant="bookmarked ? 'primary' : 'ghost'" size="md" leadingIcon="bookmark" iconOnly aria-label="저장" @click="toggleBookmark" />
                        <ButtonPopover
                          leadingIcon="ellipsis"
                          :iconOnly="true"
                          trailingIcon="chevron-down"
                          placement="bottom-end"
                          buttonLabel="최신순"
                          buttonShape="pill"
                          buttonSize="sm"
                          buttonVariant="soft"
                          :closeOnItemClick="true"
                        >
                          <PopoverList>
                            <PopoverItem icon="clock">최신순</PopoverItem>
                            <PopoverItem icon="flame">인기순</PopoverItem>
                            <PopoverItem icon="sparkles">추천순</PopoverItem>
                          </PopoverList>
                        </ButtonPopover>
                      </ToolbarGroup>
                    </StatList>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>

            <Stack
              :style="{ maxWidth: 'var(--ds-spacing-dialog-max-width-lg)', height: 'fit-content', paddingBottom: 'var(--ds-spacing-space-8)', overflow: 'visible' }"
              as="div"
              radius="none"
              direction="column"
              align="stretch"
              justify="start"
              gap="xl"
              padding="none"
              background="none"
            >
              <Stack as="div" radius="none" direction="column" align="stretch" justify="start" gap="sm" padding="none" background="none">
                <Stack as="section" direction="column" gap="sm">
                  <Text as="p" variant="body" tone="secondary" :style="{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }">
                    {{ post?.body_ko ?? '' }}
                  </Text>
                  <Stack align="center" justify="start" direction="row" gap="xs" :wrap="true">
                    <Chip icon="" tone="brand" variant="default">19+</Chip>
                    <Chip icon="mic" tone="neutral" variant="default">보이스</Chip>
                    <Chip tone="neutral" variant="default">ASMR</Chip>
                    <Chip icon="flame" tone="neutral" variant="default">신작</Chip>
                  </Stack>
                  <Button variant="ghost" size="sm" trailingIcon="chevron-down">더보기</Button>
                </Stack>

                <Card variant="outline" padding="md" gap="none">
                  <Stack :style="{ height: '21px' }" direction="row" align="center" gap="md" paddingTop="sm" paddingBottom="sm">
                    <Text as="span" variant="body-sm" weight="regular" tone="tertiary" :style="{ width: '90px', whiteSpace: 'nowrap' }">공개일</Text>
                    <Text as="span" variant="body" weight="regular" :style="{ flex: 1, fontVariantNumeric: 'tabular-nums' }">2026.08.15</Text>
                  </Stack>
                  <Divider variant="dotted" />
                  <Stack direction="row" align="center" gap="md" paddingTop="sm" paddingBottom="sm">
                    <Text as="span" variant="body-sm" weight="regular" tone="tertiary" :style="{ width: '90px', whiteSpace: 'nowrap' }">재생시간</Text>
                    <Text as="span" variant="body" weight="regular" :style="{ flex: 1, fontVariantNumeric: 'tabular-nums' }">03:00:00</Text>
                  </Stack>
                  <Divider variant="dotted" />
                  <Stack direction="row" align="center" gap="md" paddingTop="sm" paddingBottom="sm">
                    <Text as="span" variant="body-sm" weight="regular" tone="tertiary" :style="{ width: '90px', whiteSpace: 'nowrap' }">카테고리</Text>
                    <Text as="span" variant="body" weight="regular" :style="{ flex: 1, width: '660px', height: '21px' }">일상 · ASMR</Text>
                  </Stack>
                  <Divider variant="dotted" />
                  <Stack justify="center" direction="row" gap="md" align="start" paddingTop="md" paddingBottom="sm">
                    <Text as="span" variant="body-sm" weight="regular" tone="tertiary" :style="{ width: '90px', paddingTop: '6px', whiteSpace: 'nowrap' }">
                      태그
                    </Text>
                    <Stack direction="row" gap="xs" :wrap="true" flex="1 1 auto" paddingTop="xs">
                      <Chip size="sm" tone="neutral" variant="default">#힐링</Chip>
                      <Chip size="sm" tone="neutral" variant="default">#수면용</Chip>
                      <Chip size="sm" tone="neutral" variant="default">#여성향</Chip>
                      <Chip size="sm" tone="neutral" variant="default">#위스퍼</Chip>
                    </Stack>
                  </Stack>
                </Card>

                <Stack direction="row" justify="center" align="center" gap="sm" paddingTop="md">
                  <Button variant="ghost" size="sm" leadingIcon="triangle-alert">신고하기</Button>
                  <Button variant="ghost" size="sm" leadingIcon="ban">사용자 차단</Button>
                </Stack>
              </Stack>

              <Stack :style="{ height: 'fit-content' }" as="section" direction="column" gap="md">
                <Stack direction="row" align="center" gap="sm">
                  <Text as="h3" variant="heading-3" weight="bold" :style="{ flex: 1 }">댓글&#32;
                    <Text as="span" variant="heading-3" weight="bold" tone="tertiary">{{ post?.comments_count ?? 0 }}</Text>
                  </Text>
                  <Button variant="ghost" size="sm" trailingIcon="chevron-right">전체보기</Button>
                </Stack>

                <Stack as="div" radius="none" direction="column" align="stretch" justify="start" gap="xxs" padding="none" background="none">
                  <Alert
                    hidden="true"
                    status="info"
                    variant="flat"
                    icon="lock"
                    message="로그인하면 댓글로 의견을 남길 수 있어요."
                    action1Label="로그인"
                    action1Variant="primary"
                    actionPlacement="end"
                    actionSize="sm"
                  />
                  <CommentInput
                    :showCancel="false"
                    :readOnly="false"
                    :disabled="false"
                    initials="ME"
                    placeholder="댓글을 입력하세요"
                    :showAvatar="true"
                    avatarTone="brand"
                    rows="3"
                    maxLength="300"
                    :showAttachment="true"
                    :showCounter="true"
                    :showEmoji="true"
                    submitLabel="등록"
                  />
                  <Text v-if="commentsLoading" tone="tertiary" variant="body-sm">불러오는 중...</Text>
                  <template v-else-if="comments.length > 0">
                    <template v-for="(comment, idx) in comments" :key="comment.id">
                      <Divider v-if="idx > 0" />
                      <Comment
                        :author="comment.commenter?.nickname ?? comment.commenter?.username ?? '팬'"
                        :avatarSrc="comment.commenter?.profile_image ?? undefined"
                        :initials="(comment.commenter?.nickname ?? '?')[0]"
                        :time="timeAgo(comment.created_at)"
                        :body="comment.text ?? ''"
                        :likeCount="comment.likes_count ?? 0"
                        :replyCount="comment.replies_count ?? 0"
                        avatarTone="neutral"
                      />
                    </template>
                  </template>
                  <Text v-else tone="tertiary" variant="body-sm">아직 댓글이 없습니다. 첫 댓글을 남겨보세요!</Text>
                </Stack>
              </Stack>

              <Stack :style="{ maxWidth: '1400px' }" as="section" direction="column" gap="xs">
                <SectionTitle
                  :style="{ width: '100%' }"
                  :title="(post?.creator_user?.nickname ?? '크리에이터') + '의 다른 작품'"
                  icon="hand-coins"
                  as="header"
                  align="center"
                  iconTone="none"
                  :showIcon="false"
                  subtitleTone="tertiary"
                  subtitleVariant="body-sm"
                  titleAs="h4"
                  titleVariant="heading-4"
                  titleWeight="bold"
                  :wrapActions="true"
                >
                  <SectionTitleGroup align="end">
                    <Button trailingIcon="chevron-right" badgeVariant="danger" variant="soft" size="sm" shape="default">모두보기</Button>
                  </SectionTitleGroup>
                </SectionTitle>
                <Text v-if="creatorPosts.length === 0" tone="tertiary">다른 작품이 없습니다.</Text>
                <CardGrid
                  v-else
                  :count="creatorPosts.length"
                  itemSize="custom"
                  itemSizeOverride="240px"
                  layout="row"
                  gap="sm"
                  :arrows="false"
                  edgeFade="fade"
                  scroll="snap"
                >
                  <VideoListCard
                    v-for="p in creatorPosts"
                    :key="p.id"
                    mediaSize="sm"
                    :showAvatar="false"
                    :thumbnailImageUrl="p.locked_thumbnail_url ?? undefined"
                    :title="p.title_ko ?? ''"
                    :creatorName="post?.creator_user?.nickname ?? ''"
                    :meta="timeAgo(p.created_at)"
                    thumbnailAspect="16/9"
                    :avatarAlt="post?.creator_user?.nickname ?? ''"
                    :avatarInitials="(post?.creator_user?.nickname ?? '?')[0]"
                    :showGrain="true"
                    variant="vertical"
                    avatarTone="brand"
                    titleLines="1"
                    size="sm"
                    avatarSize="sm"
                    avatarShape="circle"
                    thumbnailBackground="linear-gradient(140deg, #0c1429, #4c1d95 50%, #be185d)"
                    actionIcon="ellipsis"
                    :showAction="true"
                    @click="router.push('/video/' + p.id)"
                  />
                </CardGrid>
              </Stack>

              <Stack :style="{ maxWidth: '1400px' }" as="section" direction="column" gap="xs">
                <SectionTitle
                  :style="{ width: '100%' }"
                  title="비슷한 작품"
                  icon="hand-coins"
                  as="header"
                  align="center"
                  iconTone="none"
                  :showIcon="false"
                  subtitleTone="tertiary"
                  subtitleVariant="body-sm"
                  titleAs="h4"
                  titleVariant="heading-4"
                  titleWeight="bold"
                  :wrapActions="true"
                >
                  <SectionTitleGroup align="end">
                    <Button trailingIcon="chevron-right" badgeVariant="danger" variant="soft" size="sm" shape="default">모두보기</Button>
                  </SectionTitleGroup>
                </SectionTitle>
                <Text v-if="videoStore.posts.filter(p => String(p.id) !== String(route.params.id)).length === 0" tone="tertiary">비슷한 작품이 없습니다.</Text>
                <CardGrid
                  v-else
                  :count="videoStore.posts.filter(p => String(p.id) !== String(route.params.id)).slice(0, 8).length"
                  itemSize="custom"
                  itemSizeOverride="240px"
                  layout="row"
                  gap="sm"
                  :arrows="false"
                  edgeFade="fade"
                  scroll="snap"
                >
                  <VideoListCard
                    v-for="p in videoStore.posts.filter(p => String(p.id) !== String(route.params.id)).slice(0, 8)"
                    :key="p.id"
                    mediaSize="sm"
                    :showAvatar="true"
                    :thumbnailImageUrl="p.locked_thumbnail_url ?? undefined"
                    :title="p.title_ko ?? ''"
                    :creatorName="p.creator_user?.nickname ?? ''"
                    :meta="timeAgo(p.created_at)"
                    actionLabel="More options"
                    actionSize="sm"
                    thumbnailAspect="16/9"
                    :avatarAlt="p.creator_user?.nickname ?? ''"
                    :avatarInitials="(p.creator_user?.nickname ?? '?')[0]"
                    :avatarSrc="p.creator_user?.profile_image ?? undefined"
                    :showGrain="true"
                    variant="vertical"
                    avatarTone="brand"
                    titleLines="1"
                    size="sm"
                    avatarSize="sm"
                    avatarShape="circle"
                    thumbnailBackground="linear-gradient(140deg, #0c1429, #4c1d95 50%, #be185d)"
                    actionIcon="ellipsis"
                    :showAction="true"
                    style="cursor: pointer;"
                    @click="router.push('/video/' + p.id)"
                  />
                </CardGrid>
              </Stack>
            </Stack>

            <Stack
              :style="{ height: 'fit-content', marginTop: 'auto' }"
              justify="center"
              align="center"
              padding="xl"
              background="none"
              direction="row"
              :wrap="true"
              gap="none"
            >
              <Stack :wrap="true" as="div" radius="none" direction="row" align="stretch" justify="center" gap="sm" padding="none" background="none">
                <Link variant="subtle" size="sm">소개</Link>
                <Link variant="subtle" size="sm">크리에이터 가이드</Link>
                <Link variant="subtle" size="sm">크레딧 정책</Link>
                <Link variant="subtle" size="sm">고객지원</Link>
                <Link variant="subtle" size="sm">한국어</Link>
              </Stack>
              <Stack justify="center" direction="row" width="100%" marginTop="12px">© 2026 YOVO</Stack>
            </Stack>
          </Stack>

          <!-- RIGHT ASIDE -->
          <Stack
            :style="{ height: '100%', paddingBottom: '1rem', maxWidth: '320px', minWidth: '280px', position: 'sticky', top: '0' }"
            as="aside"
            align="stretch"
            gap="2xl"
            padding="none"
          >
            <!-- Trending -->
            <Stack :style="{ height: 'fit-content' }" gap="none" direction="column">
              <Stack :style="{ height: 'fit-content' }" direction="column" gap="none">
                <Stack :style="{ padding: '0px', margin: '0px' }" direction="row" align="center" justify="between" height="21px">
                  <Text as="h3" variant="ui" weight="semibold">YOVO 트랜딩</Text>
                  <Link tailIcon="chevron-right" :external="false" variant="subtle" size="sm" href="#">모두보기</Link>
                </Stack>
                <TopicRow :rank="1" title="달이 지는 도시" sub="317K 시청 · 1,840 후원자" delta="+218%" deltaTone="brand" :divider="true" />
                <TopicRow :rank="2" title="#synthwave" sub="이번 주 새 트랙 218개" delta="+94%" deltaTone="neutral" :divider="true" />
                <TopicRow :rank="3" title="한국어 내레이션" sub="12개 모집 진행 중" delta="+61%" deltaTone="neutral" :divider="true" />
                <TopicRow :rank="4" title="Lumen-X EP.4 비하인드" sub="신규 멤버 +182 / 7일" delta="—" deltaTone="neutral" :divider="true" />
                <TopicRow :rank="5" title="aether.studio" sub="「여름 끝의 라디오」 응답 모집" delta="NEW" deltaTone="brand" :divider="false" />
              </Stack>
            </Stack>

            <!-- Suggested creators -->
            <Stack v-if="creatorStore.discover.length > 0" as="section" direction="column" gap="var(--wb-spacing-space-2)" aria-label="Suggested creators">
              <Stack direction="row" align="center" justify="between" marginBottom="12px" height="21px">
                <Text as="h3" variant="ui" weight="semibold">팔로우 추천</Text>
                <Link variant="subtle" size="sm" @click="creatorStore.fetchDiscover()">새로고침</Link>
              </Stack>
              <Stack direction="column" gap="md">
                <UserBlock
                  v-for="creator in creatorStore.discover.slice(0, 4)"
                  :key="creator.id"
                  avatarSize="sm"
                  :avatarSrc="creator.profile_image ?? undefined"
                  :name="creator.nickname ?? ''"
                  :meta="creator.tags?.slice(0, 2).map(t => '#' + t).join(' · ') ?? ''"
                  :initials="(creator.nickname ?? '?').slice(0, 2).toUpperCase()"
                  avatarTone="brand"
                  size="sm"
                  :style="{ cursor: 'pointer' }"
                  @click="router.push('/creator/' + creator.id)"
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  </Stack>
</template>
