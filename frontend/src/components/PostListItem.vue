<script setup>
import { computed, useAttrs } from 'vue'
import Avatar from './Avatar.vue'
import MediaFrame from './MediaFrame.vue'

const attrs = useAttrs()

const props = defineProps({
  mediaFrameProps: { type: Object, default: () => ({}) },
  mediaAspect: { type: String, default: undefined },
  mediaSize: { type: String, default: undefined },
  mediaBackground: { type: String, default: undefined },
  mediaBackgroundToken: { type: String, default: undefined },
  mediaBackgroundTokenCollection: { type: String, default: undefined },
  mediaBadgeStatus: { type: String, default: undefined },
  mediaBadgeText: { type: String, default: undefined },
  mediaBadgeVariant: { type: String, default: undefined },
  mediaCaptionEyebrow: { type: String, default: undefined },
  mediaCaptionTitle: { type: String, default: undefined },
  mediaDuration: { type: String, default: undefined },
  mediaImageUrl: { type: String, default: undefined },
  mediaLive: { type: Boolean, default: undefined },
  mediaLiveLabel: { type: String, default: undefined },
  mediaLocked: { type: Boolean, default: undefined },
  mediaLockActionIcon: { type: String, default: undefined },
  mediaLockActionLabel: { type: String, default: undefined },
  mediaLockActionShape: { type: String, default: undefined },
  mediaLockActionSize: { type: String, default: undefined },
  mediaLockActionVariant: { type: String, default: undefined },
  mediaLockIcon: { type: String, default: undefined },
  mediaLockMessage: { type: String, default: undefined },
  mediaLockTitle: { type: String, default: undefined },
  mediaClassName: { type: String, default: '' },
  mediaOnUnlock: { type: Function, default: undefined },
  mediaPlayLabel: { type: String, default: undefined },
  mediaProgress: { type: [Number, String], default: undefined },
  mediaProgressLabel: { type: String, default: undefined },
  mediaShowGrain: { type: Boolean, default: undefined },
  mediaShowPlay: { type: Boolean, default: undefined },
  mediaSrc: { type: String, default: undefined },
  mediaStyle: { type: Object, default: undefined },
  mediaViewerCount: { type: String, default: undefined },
  mediaWidth: { type: [Number, String], default: undefined },
  thumbnailBackground: { type: String, default: undefined },
  thumbnailImageUrl: { type: String, default: undefined },
  thumbnailAspect: { type: String, default: undefined },
  thumbnailWidth: { type: [Number, String], default: undefined },
  avatarAlt: { type: String, default: undefined },
  avatarShape: { type: String, default: 'circle' },
  avatarSize: { type: String, default: 'xs' },
  avatarSrc: { type: String, default: undefined },
  avatarTone: { type: String, default: 'neutral' },
  showAvatar: { type: Boolean, default: true },
  showPlay: { type: Boolean, default: undefined },
  eyebrowColor: { type: String, default: undefined },
  eyebrowColorToken: { type: String, default: undefined },
  eyebrowColorTokenCollection: { type: String, default: undefined },
  initials: { type: String, default: undefined },
  size: { type: String, default: 'sm' },
  variant: { type: String, default: 'horizontal' },
})

function formatPostListItemCssDimension(value) {
  if (typeof value === 'number') return Number.isFinite(value) ? `${value}px` : null
  const trimmed = value?.trim()
  return trimmed || null
}

function toPostListItemMediaText(value) {
  if (typeof value === 'string' || typeof value === 'number') return String(value)
  return undefined
}

function formatPostListItemTokenReference(collectionId, tokenId) {
  const collection = collectionId?.trim()
  const token = tokenId?.trim()
  return collection && token ? `var(--ds-token-${collection}-${token})` : null
}

function toPostListItemCssColor(value) {
  const trimmed = value?.trim()
  return trimmed || undefined
}

const classes = computed(() =>
  ['sg-ds-library-scope', 'post-list-item', attrs.class].filter(Boolean).join(' ')
)

const mediaFrameClassName = computed(() => props.mediaFrameProps.className ?? '')
const mediaFrameStyle = computed(() => props.mediaFrameProps.style)

const mediaWidthCss = computed(() =>
  formatPostListItemCssDimension(
    props.mediaWidth ?? props.thumbnailWidth ?? mediaFrameStyle.value?.width ?? '128px'
  )
)

const hasAvatar = computed(() => props.showAvatar && Boolean(props.avatarSrc || props.initials))

const resolvedAvatarSize = computed(() => props.avatarSize ?? (props.size === 'lg' ? 'sm' : 'xs'))

const resolvedMediaAspect = computed(() =>
  props.mediaAspect ?? props.thumbnailAspect ?? props.mediaFrameProps.aspect ?? '16/9'
)

const resolvedMediaSize = computed(() =>
  props.mediaSize ?? props.mediaFrameProps.size ?? 'md'
)

const resolvedMediaBackground = computed(() =>
  props.mediaBackground ?? props.thumbnailBackground ?? props.mediaFrameProps.background ?? ''
)

const resolvedMediaBackgroundToken = computed(() =>
  props.mediaBackgroundToken ?? props.mediaFrameProps.backgroundToken ?? ''
)

const resolvedMediaBackgroundTokenCollection = computed(() =>
  props.mediaBackgroundTokenCollection ?? props.mediaFrameProps.backgroundTokenCollection ?? ''
)

const resolvedMediaSrc = computed(() =>
  props.mediaSrc ?? props.thumbnailImageUrl ?? props.mediaFrameProps.src ?? ''
)

const resolvedMediaImageUrl = computed(() =>
  props.mediaImageUrl ?? props.mediaFrameProps.imageUrl ?? ''
)

const resolvedMediaDuration = computed(() =>
  props.mediaDuration ?? props.mediaFrameProps.duration ?? ''
)

const resolvedMediaBadgeText = computed(() =>
  props.mediaBadgeText ?? props.mediaFrameProps.badgeText ?? ''
)

const resolvedMediaShowPlay = computed(() =>
  props.mediaShowPlay ?? props.showPlay ?? props.mediaFrameProps.showPlay ?? false
)

const resolvedMediaStyle = computed(() => ({
  ...(mediaFrameStyle.value ?? {}),
  ...(props.mediaStyle ?? {}),
  width: props.variant === 'vertical' ? '100%' : (mediaWidthCss.value ?? undefined),
}))

const eyebrowCssColor = computed(() =>
  toPostListItemCssColor(
    formatPostListItemTokenReference(props.eyebrowColorTokenCollection, props.eyebrowColorToken) ?? props.eyebrowColor
  )
)

const rootStyle = computed(() => {
  const base = attrs.style ?? {}
  if (eyebrowCssColor.value) {
    return { ...base, '--post-list-item-eyebrow-color': eyebrowCssColor.value }
  }
  return base
})

const mediaFrameClass = computed(() =>
  ['post-list-item-media', mediaFrameClassName.value, props.mediaClassName].filter(Boolean).join(' ')
)
</script>

<template>
  <div
    v-bind="{ ...$attrs, class: undefined, style: undefined }"
    :class="classes"
    :data-size="props.size"
    :data-variant="props.variant"
    :style="rootStyle"
  >
    <MediaFrame
      v-bind="props.mediaFrameProps"
      :aspect="resolvedMediaAspect"
      :size="resolvedMediaSize"
      :background="resolvedMediaBackground"
      :background-token="resolvedMediaBackgroundToken"
      :background-token-collection="resolvedMediaBackgroundTokenCollection"
      :badge-status="props.mediaBadgeStatus ?? props.mediaFrameProps.badgeStatus"
      :badge-text="resolvedMediaBadgeText"
      :badge-variant="props.mediaBadgeVariant ?? props.mediaFrameProps.badgeVariant"
      :caption-eyebrow="props.mediaCaptionEyebrow ?? props.mediaFrameProps.captionEyebrow ?? ''"
      :caption-title="props.mediaCaptionTitle ?? props.mediaFrameProps.captionTitle ?? ''"
      :class="mediaFrameClass"
      :duration="resolvedMediaDuration"
      :image-url="resolvedMediaImageUrl"
      :live="props.mediaLive ?? props.mediaFrameProps.live ?? false"
      :live-label="props.mediaLiveLabel ?? props.mediaFrameProps.liveLabel ?? ''"
      :locked="props.mediaLocked ?? props.mediaFrameProps.locked ?? false"
      :lock-action-icon="props.mediaLockActionIcon ?? props.mediaFrameProps.lockActionIcon ?? ''"
      :lock-action-label="props.mediaLockActionLabel ?? props.mediaFrameProps.lockActionLabel ?? ''"
      :lock-action-shape="props.mediaLockActionShape ?? props.mediaFrameProps.lockActionShape ?? 'pill'"
      :lock-action-size="props.mediaLockActionSize ?? props.mediaFrameProps.lockActionSize ?? 'sm'"
      :lock-action-variant="props.mediaLockActionVariant ?? props.mediaFrameProps.lockActionVariant ?? 'primary'"
      :lock-icon="props.mediaLockIcon ?? props.mediaFrameProps.lockIcon ?? ''"
      :lock-message="props.mediaLockMessage ?? props.mediaFrameProps.lockMessage ?? ''"
      :lock-title="props.mediaLockTitle ?? props.mediaFrameProps.lockTitle ?? ''"
      :on-unlock="props.mediaOnUnlock ?? props.mediaFrameProps.onUnlock"
      :progress="props.mediaProgress ?? props.mediaFrameProps.progress"
      :progress-label="props.mediaProgressLabel ?? props.mediaFrameProps.progressLabel ?? ''"
      :show-grain="props.mediaShowGrain ?? props.mediaFrameProps.showGrain ?? true"
      :show-play="resolvedMediaShowPlay"
      :src="resolvedMediaSrc"
      :style="resolvedMediaStyle"
      :viewer-count="props.mediaViewerCount ?? props.mediaFrameProps.viewerCount ?? ''"
      :play-label="props.mediaPlayLabel ?? props.mediaFrameProps.playLabel ?? ''"
    >
      <slot name="media-overlay" />
    </MediaFrame>

    <div
      class="post-list-item-body"
      :data-avatar="hasAvatar ? 'true' : 'false'"
      :data-avatar-size="hasAvatar ? resolvedAvatarSize : undefined"
    >
      <span class="post-list-item-main">
        <Avatar
          v-if="hasAvatar"
          :alt="props.avatarAlt"
          class="post-list-item-avatar"
          :initials="props.initials"
          :shape="props.avatarShape"
          :size="resolvedAvatarSize"
          :src="props.avatarSrc"
          :tone="props.avatarTone"
        />
        <span class="post-list-item-content">
          <span v-if="$slots.eyebrow" class="post-list-item-eyebrow">
            <slot name="eyebrow" />
          </span>
          <span class="post-list-item-title">
            <slot name="title">Post title</slot>
          </span>
          <span v-if="$slots.meta" class="post-list-item-meta">
            <slot name="meta" />
          </span>
        </span>
      </span>
      <span v-if="$slots.caption" class="post-list-item-caption">
        <slot name="caption" />
      </span>
    </div>
  </div>
</template>
