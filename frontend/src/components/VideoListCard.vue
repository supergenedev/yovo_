<script setup>
import { computed, useAttrs } from 'vue'
import Avatar from './Avatar.vue'
import Badge from './Badge.vue'
import Button from './Button.vue'
import Icon from './Icon.vue'
import MediaFrame from './MediaFrame.vue'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const props = defineProps({
  actionIcon: { default: 'ellipsis' },
  actionLabel: { default: 'More options' },
  actionSize: { default: undefined },
  avatarAlt: { default: '' },
  avatarInitials: { default: '코다' },
  avatarShape: { default: 'circle' },
  avatarSize: { default: undefined },
  avatarSrc: { default: '' },
  avatarTone: { default: 'brand' },
  badgeStatus: { default: 'warning' },
  badgeText: { default: '15+' },
  badgeVariant: { default: 'solid' },
  creatorBadge: { default: '후원자 145k' },
  creatorBadgeStatus: { default: 'neutral' },
  creatorBadgeVariant: { default: 'flat' },
  creatorName: { default: '코다 / Koda' },
  creatorVerified: { default: true },
  duration: { default: '17:02' },
  eyebrow: { default: undefined },
  eyebrowColor: { default: undefined },
  eyebrowColorToken: { default: undefined },
  eyebrowColorTokenCollection: { default: undefined },
  mediaSize: { default: 'md' },
  meta: { default: '92K 시청 · 1주 전' },
  progress: { default: 64 },
  progressLabel: { default: 'Media progress' },
  showAction: { default: true },
  showAvatar: { default: undefined },
  showGrain: { default: true },
  showPlay: { default: false },
  size: { default: 'lg' },
  thumbnailAspect: { default: '16/9' },
  thumbnailBackground: { default: 'linear-gradient(140deg, #0c1429, #4c1d95 50%, #be185d)' },
  thumbnailImageUrl: { default: '' },
  thumbnailWidth: { default: '50%' },
  title: { default: '새벽이 떠오를 때 — 2인 콜라보 단편' },
  titleLines: { default: undefined },
  variant: { default: 'vertical' },
})

const resolvedShowAvatar = computed(() => props.showAvatar ?? props.variant === 'vertical')
const resolvedAvatarSize = computed(() => props.avatarSize ?? (props.size === 'lg' ? 'md' : 'sm'))
const resolvedActionSize = computed(() => props.actionSize ?? (props.size === 'lg' && props.variant === 'vertical' ? 'md' : 'sm'))
const hasAvatar = computed(() => resolvedShowAvatar.value && Boolean(props.avatarSrc || props.avatarInitials))
const hasCreatorLine = computed(() => Boolean(props.creatorName || props.creatorBadge || (props.creatorVerified && props.creatorName)))

function formatCssDimension(value) {
  if (typeof value === 'number') return Number.isFinite(value) ? `${value}px` : null
  const trimmed = value?.trim()
  return trimmed || null
}

function formatLineCount(value) {
  if (typeof value === 'number') return Number.isFinite(value) && value > 0 ? String(Math.round(value)) : null
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0 ? String(Math.round(parsed)) : null
}

function formatTokenReference(collectionId, tokenId) {
  const collection = collectionId?.trim()
  const token = tokenId?.trim()
  return collection && token ? `var(--ds-token-${collection}-${token})` : null
}

function toCssColor(value) {
  const trimmed = value?.trim()
  return trimmed || undefined
}

const classes = computed(() =>
  ['sg-ds-library-scope', 'video-list-card', attrs.class].filter(Boolean).join(' ')
)

const rootStyle = computed(() => {
  const thumbnailWidthCss = formatCssDimension(props.thumbnailWidth)
  const titleLineCount = formatLineCount(props.titleLines)
  const eyebrowCssColor = toCssColor(
    formatTokenReference(props.eyebrowColorTokenCollection, props.eyebrowColorToken) ?? props.eyebrowColor
  )
  return {
    ...(attrs.style || {}),
    ...(thumbnailWidthCss ? { '--c-video-list-card-thumbnail-width': thumbnailWidthCss } : {}),
    ...(titleLineCount ? { '--c-video-list-card-title-lines': titleLineCount } : {}),
    ...(eyebrowCssColor ? { '--video-list-card-eyebrow-color': eyebrowCssColor } : {}),
  }
})
</script>

<template>
  <article
    v-bind="{ ...attrs, class: undefined, style: undefined }"
    :class="classes"
    :style="rootStyle"
    :data-size="props.size"
    :data-variant="props.variant"
  >
    <MediaFrame
      class="video-list-card-media"
      :aspect="props.thumbnailAspect"
      :background="props.thumbnailBackground"
      :badge-status="props.badgeStatus"
      :badge-text="props.badgeText"
      :badge-variant="props.badgeVariant"
      caption-eyebrow=""
      caption-title=""
      :duration="props.duration"
      :progress="props.progress"
      :progress-label="props.progressLabel"
      :show-grain="props.showGrain"
      :show-play="props.showPlay"
      :size="props.mediaSize"
      :src="props.thumbnailImageUrl"
    />
    <div class="video-list-card-info">
      <Avatar
        v-if="hasAvatar"
        :alt="props.avatarAlt"
        class="video-list-card-avatar"
        :initials="props.avatarInitials"
        :shape="props.avatarShape"
        :size="resolvedAvatarSize"
        :src="props.avatarSrc"
        :tone="props.avatarTone"
      />
      <div class="video-list-card-body">
        <span v-if="props.eyebrow" class="video-list-card-eyebrow">{{ props.eyebrow }}</span>
        <span class="video-list-card-title">{{ props.title }}</span>
        <span v-if="hasCreatorLine" class="video-list-card-creator">
          <span v-if="props.creatorName" class="video-list-card-creator-identity">
            <span class="video-list-card-creator-name">{{ props.creatorName }}</span>
            <Icon
              v-if="props.creatorVerified"
              class="video-list-card-verified"
              color="var(--c-video-list-card-verified-color)"
              name="badge-check"
              size="12"
              stroke-width="2.5"
            />
          </span>
          <Badge
            v-if="props.creatorBadge"
            class="video-list-card-creator-badge"
            size="sm"
            :status="props.creatorBadgeStatus"
            :variant="props.creatorBadgeVariant"
          >
            {{ props.creatorBadge }}
          </Badge>
        </span>
        <span v-if="props.meta" class="video-list-card-meta">{{ props.meta }}</span>
      </div>
      <Button
        v-if="props.showAction"
        :aria-label="props.actionLabel"
        class="video-list-card-action"
        :icon-only="true"
        :leading-icon="props.actionIcon"
        :size="resolvedActionSize"
        variant="ghost"
      >
        {{ props.actionLabel }}
      </Button>
    </div>
  </article>
</template>
