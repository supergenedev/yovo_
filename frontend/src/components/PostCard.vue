<script setup>
import { computed, useAttrs, useSlots } from 'vue'
import AudioBlock from './AudioBlock.vue'
import AudioFrame from './AudioFrame.vue'
import AudioPlayer from './AudioPlayer.vue'
import Button from './Button.vue'
import Chip from './Chip.vue'
import CollabCredits from './CollabCredits.vue'
import ImageGrid from './ImageGrid.vue'
import MediaFrame from './Media.vue'
import Toolbar from './Toolbar.vue'
import TopComment from './TopComment.vue'
import UserBlock from './UserBlock.vue'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
const slots = useSlots()

const props = defineProps({
  userName: { default: 'User' },
  userMeta: { default: undefined },
  userInitials: { default: 'U' },
  userAvatarSrc: { default: undefined },
  avatarTone: { default: 'brand' },
  verified: { default: false },
  title: { default: undefined },
  prose: { default: undefined },
  proseVariant: { default: 'default' },
  imageUrl: { default: undefined },
  imageAspect: { default: '16/9' },
  imageTile1Src: { default: undefined },
  imageTile2Src: { default: undefined },
  imageTile3Src: { default: undefined },
  imageTile4Src: { default: undefined },
  imageTile5Src: { default: undefined },
  imageTile6Src: { default: undefined },
  imageTileCount: { default: '4' },
  audioArtAlt: { default: 'Track cover art' },
  audioArtImageUrl: { default: '' },
  stats: { default: undefined },
  kind: { default: undefined },
  bodyVariant: { default: 'none' },
  cardVariant: { default: 'solid' },
  cardPadding: { default: 'lg' },
})

const classes = computed(() =>
  ['sg-ds-library-scope', 'post-card', 'card', attrs.class].filter(Boolean).join(' ')
)

const hasText = computed(() => Boolean(props.title || props.prose))

const resolvedStats = computed(() => props.stats ?? getPostCardStatsForBodyVariant(props.bodyVariant))

const visibleMetrics = computed(() => getPostCardVisibleMetrics(resolvedStats.value))
const likeStat = computed(() => findPostCardStat(resolvedStats.value, ['like', 'likes']))
const commentStat = computed(() => findPostCardStat(resolvedStats.value, ['comment', 'comments', 'reply', 'replies', 'chat']))
const shareStat = computed(() => findPostCardStat(resolvedStats.value, ['share', 'shares']))

const hasBodySlot = computed(() => Boolean(slots.body))
const hasEngagementSlot = computed(() => Boolean(slots.engagement))
const hasToolbarSlot = computed(() => Boolean(slots.toolbar))
const hasDefaultSlot = computed(() => Boolean(slots.default))

const hasEngagement = computed(() =>
  hasEngagementSlot.value ||
  hasToolbarSlot.value ||
  visibleMetrics.value.length > 0 ||
  Boolean(likeStat.value) ||
  Boolean(commentStat.value) ||
  Boolean(shareStat.value)
)

// Body variant helpers
const isLiveVideo = computed(() => !hasBodySlot.value && props.bodyVariant === 'live-video')
const isVideoCollab = computed(() => !hasBodySlot.value && props.bodyVariant === 'video-collab')
const isMusicRelease = computed(() => !hasBodySlot.value && props.bodyVariant === 'music-release')
const isVoiceClip = computed(() => !hasBodySlot.value && props.bodyVariant === 'voice-clip')
const isImageUpdate = computed(() => !hasBodySlot.value && props.bodyVariant === 'image-update')

// Show inline imageUrl only when no bodySlot and no bodyVariant override
const showInlineImage = computed(() =>
  Boolean(props.imageUrl) &&
  !hasBodySlot.value &&
  !isLiveVideo.value &&
  !isVideoCollab.value &&
  !isMusicRelease.value &&
  !isVoiceClip.value &&
  !isImageUpdate.value
)

// Engagement variant
const showLiveVideoEngagement = computed(() => !hasEngagementSlot.value && props.bodyVariant === 'live-video')
const showVideoCollabEngagement = computed(() => !hasEngagementSlot.value && props.bodyVariant === 'video-collab')
const showVoiceClipEngagement = computed(() => !hasEngagementSlot.value && props.bodyVariant === 'voice-clip')
const showImageUpdateEngagement = computed(() => !hasEngagementSlot.value && props.bodyVariant === 'image-update')

const videoCollabItems = [
  { avatarTone: 'purple', credit: '+4.2k crd', initials: 'MS', name: 'Mika Studio', role: 'DIR', verified: true },
  { avatarTone: 'brand', credit: '+2.8k crd', initials: 'HL', name: 'Hailey Luna', role: 'VOC', verified: true },
  { avatarTone: 'teal', credit: '+1.1k crd', initials: 'NV', name: 'NeoVoice', role: 'AI' },
]
const imageUpdateCollabItems = [
  { avatarTone: 'pink', credit: '+1.4k crd', initials: 'MK', name: 'Mika', role: 'ART', verified: true },
  { avatarTone: 'coral', credit: '+680 crd', initials: 'RN', name: 'Rina', role: '3D' },
]

function getPostCardStatsForBodyVariant(variant) {
  if (variant === 'live-video') {
    return [
      { label: 'Viewers', value: '3.8k', icon: 'eye' },
      { label: 'Likes', value: '12.4k' },
      { label: 'Chat', value: 824 },
      { label: 'Supporters', value: '2,180', tone: 'brand', icon: 'gem', spacerBefore: true },
    ]
  }
  if (variant === 'music-release') {
    return [
      { label: 'Plays', value: '28.2k' },
      { label: 'Saves', value: '4.1k' },
      { label: 'Remixes', value: 128 },
      { label: 'Credits', value: '8,920', tone: 'brand', icon: 'gem', spacerBefore: true },
    ]
  }
  if (variant === 'video-collab') {
    return [
      { label: 'Views', value: '42.8k' },
      { label: 'Likes', value: '9.6k' },
      { label: 'Comments', value: 284 },
      { label: 'Credits', value: '12.4k', tone: 'brand', icon: 'gem', spacerBefore: true },
    ]
  }
  if (variant === 'voice-clip') {
    return [
      { label: 'Replies', value: 36 },
      { label: 'Saves', value: 412 },
      { label: 'Shares', value: 57 },
    ]
  }
  if (variant === 'image-update') {
    return [
      { label: 'Votes', value: '5.6k' },
      { label: 'Likes', value: '18.1k' },
      { label: 'Comments', value: 492 },
      { label: 'Supporters', value: '3,740', tone: 'brand', icon: 'gem', spacerBefore: true },
    ]
  }
  return [
    { label: 'Listens', value: '1.2k' },
    { label: 'Likes', value: 342 },
    { label: 'Comments', value: 18 },
    { label: 'Supporters', value: '1,840', tone: 'brand', icon: 'gem', spacerBefore: true },
  ]
}

function findPostCardStat(stats, labels) {
  if (!stats) return null
  const labelSet = new Set(labels)
  return stats.find((stat) => labelSet.has(normalizePostCardStatLabel(stat.label))) ?? null
}

function getPostCardVisibleMetrics(stats) {
  if (!stats || stats.length === 0) return []
  const hiddenLabels = new Set(['like', 'likes', 'comment', 'comments', 'reply', 'replies', 'chat', 'share', 'shares'])
  const preferred = stats.filter((stat) => {
    const label = normalizePostCardStatLabel(stat.label)
    if (hiddenLabels.has(label)) return false
    return stat.tone === 'brand' || ['view', 'views', 'viewer', 'viewers', 'listen', 'listens', 'play', 'plays', 'vote', 'votes'].includes(label)
  })
  return preferred.slice(0, 2)
}

function normalizePostCardStatLabel(label) {
  return label.trim().toLowerCase().replace(/[^a-z0-9]+/g, '')
}
</script>

<template>
  <article
    v-bind="{ ...$attrs, class: undefined }"
    :class="classes"
    :data-variant="props.cardVariant"
    :data-padding="props.cardPadding"
    :data-kind="props.kind || undefined"
  >
    <header class="post-card-head">
      <UserBlock
        avatar-size="md"
        :avatar-src="props.userAvatarSrc"
        :avatar-tone="props.avatarTone"
        :initials="props.userInitials"
        :meta="props.userMeta"
        :name="props.userName"
        :verified="props.verified"
      >
        <template #tail>
          <Button aria-label="More" icon-only leading-icon="more-horizontal" size="sm" variant="ghost" />
        </template>
      </UserBlock>
    </header>

    <div v-if="hasText" class="post-card-text">
      <h2 v-if="props.title" class="post-card-title">{{ props.title }}</h2>
      <p
        v-if="props.prose"
        class="post-card-prose"
        :data-variant="props.proseVariant === 'lead' ? 'lead' : undefined"
      >{{ props.prose }}</p>
    </div>

    <!-- Inline image (no bodyVariant override) -->
    <MediaFrame
      v-if="showInlineImage"
      :aspect="props.imageAspect"
      caption-eyebrow=""
      caption-title=""
      :image-url="props.imageUrl"
      :show-play="props.kind === 'live' || props.kind === 'video'"
    />

    <!-- Body slot (custom) -->
    <slot name="body" />

    <!-- Body variant: live-video -->
    <MediaFrame
      v-if="isLiveVideo"
      aspect="16/9"
      background="linear-gradient(140deg, #0f172a 0%, #155e75 42%, #e11d48 100%)"
      caption-eyebrow="ON AIR · 42m"
      caption-title="NeoVoice duet session"
      live
      :src="props.imageUrl"
      viewer-count="3,812 watching"
    />

    <!-- Body variant: video-collab -->
    <template v-if="isVideoCollab">
      <MediaFrame
        aspect="4/5"
        badge-text="AI video"
        background="linear-gradient(145deg, #172554 0%, #7c2d12 46%, #db2777 100%)"
        caption-eyebrow="PREMIERE · 02:17"
        caption-title="City Bloom / final motion cut"
        duration="2:17"
        :src="props.imageUrl"
      />
      <CollabCredits :items="videoCollabItems" />
    </template>

    <!-- Body variant: music-release -->
    <AudioFrame
      v-if="isMusicRelease"
      eyebrow="MUSIC RELEASE"
      meta="Stem package · 4:02 · Remix open"
      title="garden_after_midnight.wav"
      variant="music"
    >
      <AudioBlock
        :art-alt="props.audioArtAlt"
        art-background="linear-gradient(145deg, #0f172a 0%, #0d9488 44%, #f59e0b 100%)"
        :art-image-url="props.audioArtImageUrl"
        art-name="garden.m4a"
        end-time="4:02"
        :played-bars="21"
        start-time="2:08"
      />
      <Toolbar size="sm" wrap>
        <template #start>
          <Chip icon="music" size="sm" tone="brand">Melodic pop</Chip>
          <Chip icon="mic-2" size="sm">Open vocal</Chip>
          <Chip icon="sparkles" size="sm">Remixable</Chip>
        </template>
      </Toolbar>
    </AudioFrame>

    <!-- Body variant: voice-clip -->
    <AudioFrame
      v-if="isVoiceClip"
      eyebrow="VOICE NOTE"
      meta="0:42 · Producer feedback"
      title="0:18 호흡 체크"
      variant="voice"
    >
      <AudioPlayer :played-bars="9" size="sm" time="0:18 / 0:42" variant="compact" />
    </AudioFrame>

    <!-- Body variant: image-update -->
    <template v-if="isImageUpdate">
      <ImageGrid
        aspect="4/3"
        cols="2"
        :image-tile1-src="props.imageTile1Src || props.imageUrl"
        :image-tile2-src="props.imageTile2Src"
        :image-tile3-src="props.imageTile3Src"
        :image-tile4-src="props.imageTile4Src"
        :image-tile5-src="props.imageTile5Src"
        :image-tile6-src="props.imageTile6Src"
        :tile-count="props.imageTileCount"
      />
      <CollabCredits :items="imageUpdateCollabItems" />
    </template>

    <!-- Default slot (children) -->
    <slot />

    <!-- Engagement footer -->
    <footer v-if="hasEngagement" class="post-card-engagement">
      <slot v-if="hasToolbarSlot" name="toolbar" />
      <div
        v-else
        class="post-card-engagement-default"
        :data-has-metrics="visibleMetrics.length > 0 || undefined"
      >
        <div v-if="visibleMetrics.length > 0" class="post-card-metrics" aria-label="Post metrics">
          <span
            v-for="stat in visibleMetrics"
            :key="stat.label"
            class="post-card-metric"
            :data-tone="stat.tone === 'brand' ? 'brand' : undefined"
          >
            <strong>{{ stat.value }}</strong>
            {{ stat.label }}
          </span>
        </div>
        <div class="post-card-action-row">
          <div class="post-card-actions" aria-label="Post actions">
            <Button class="post-card-action" size="sm" variant="ghost" leading-icon="heart">
              <span>Like</span>
              <span v-if="likeStat" class="post-card-action-count">{{ likeStat.value }}</span>
            </Button>
            <Button class="post-card-action" size="sm" variant="ghost" leading-icon="message-circle">
              <span>Comment</span>
              <span v-if="commentStat" class="post-card-action-count">{{ commentStat.value }}</span>
            </Button>
            <Button class="post-card-action" size="sm" variant="ghost" leading-icon="share-2">
              <span>Share</span>
              <span v-if="shareStat" class="post-card-action-count">{{ shareStat.value }}</span>
            </Button>
          </div>
          <Button class="post-card-support-action" size="sm" leading-icon="gem">Support</Button>
        </div>
      </div>

      <!-- Engagement variant slot or auto-rendered TopComment -->
      <div v-if="hasEngagementSlot" class="post-card-context">
        <slot name="engagement" />
      </div>
      <div v-else-if="showLiveVideoEngagement" class="post-card-context">
        <TopComment
          author="SOYU"
          avatar-tone="pink"
          comment="브릿지에서 신스 톤 조금 더 밝게 가면 후렴이 확 열릴 것 같아요."
          initials="SY"
        />
      </div>
      <div v-else-if="showVideoCollabEngagement" class="post-card-context">
        <TopComment
          author="Koda"
          avatar-tone="amber"
          comment="2절 컷 전환 타이밍이 좋아요. 리믹스용 스템도 열어두면 바로 붙겠습니다."
          initials="KO"
        />
      </div>
      <div v-else-if="showVoiceClipEngagement" class="post-card-context">
        <TopComment
          author="Hailey"
          avatar-tone="brand"
          comment="확인했어요. 마지막 음절 숨소리는 살리고 앞부분만 정리해서 다시 올릴게요."
          initials="HL"
        />
      </div>
      <div v-else-if="showImageUpdateEngagement" class="post-card-context">
        <TopComment
          author="NeoVoice"
          avatar-tone="teal"
          comment="2번 톤이 보컬 질감하고 가장 잘 맞습니다. 라이브 썸네일로도 명확해요."
          initials="NV"
        />
      </div>
    </footer>
  </article>
</template>
