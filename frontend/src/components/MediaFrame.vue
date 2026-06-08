<script setup>
import { computed, useAttrs } from 'vue'
import Badge from './Badge.vue'
import Button from './Button.vue'
import Icon from './Icon.vue'

const attrs = useAttrs()

const props = defineProps({
  aspect: { default: '16/9' },
  size: { default: 'md' },
  fit: { default: 'width' },
  maxHeight: { default: '' },
  align: { default: 'start' },
  background: { default: '' },
  backgroundToken: { default: '' },
  backgroundTokenCollection: { default: '' },
  badgeText: { default: '' },
  badgeStatus: { default: undefined },
  badgeVariant: { default: undefined },
  captionEyebrow: { default: '' },
  captionTitle: { default: '' },
  duration: { default: '' },
  imageUrl: { default: '' },
  live: { default: false },
  liveLabel: { default: '' },
  locked: { default: false },
  lockIcon: { default: '' },
  lockTitle: { default: '' },
  lockMessage: { default: '' },
  lockActionLabel: { default: '' },
  lockActionIcon: { default: '' },
  lockActionVariant: { default: 'primary' },
  lockActionSize: { default: 'sm' },
  lockActionShape: { default: 'pill' },
  playLabel: { default: '' },
  progress: { default: undefined },
  progressLabel: { default: '' },
  showGrain: { default: true },
  showPlay: { default: true },
  src: { default: '' },
  viewerCount: { default: '' },
})

const emit = defineEmits(['unlock'])

const normalizedAspect = computed(() => props.aspect === '1/1' ? '1' : props.aspect)

const rootStyle = computed(() => {
  const base = attrs.style ?? {}
  return props.maxHeight
    ? { ...base, '--c-media-frame-max-height': props.maxHeight }
    : base
})

const classes = computed(() =>
  ['sg-ds-library-scope', 'media-frame', attrs.class].filter(Boolean).join(' ')
)

const tokenBackground = computed(() => {
  const collection = props.backgroundTokenCollection?.trim()
  const token = props.backgroundToken?.trim()
  return collection && token ? `var(--ds-token-${collection}-${token})` : null
})

const mediaFrameBackground = computed(() => {
  const value = tokenBackground.value ?? props.background
  return formatBackground(value)
})

const resolvedImageUrl = computed(() => props.src || props.imageUrl)

const normalizedProgress = computed(() => {
  const value = props.progress
  if (value === undefined || value === '') return null
  const parsed = Number(value)
  if (!Number.isFinite(parsed)) return null
  return Math.min(100, Math.max(0, parsed))
})

const progressStyle = computed(() => {
  if (normalizedProgress.value === null) return undefined
  return { '--media-frame-progress': `${normalizedProgress.value}%` }
})

const hasCaption = computed(() => Boolean(props.captionEyebrow || props.captionTitle))

const resolvedBadgeStatus = computed(() =>
  props.badgeStatus ?? (props.locked ? 'warning' : 'info')
)

const resolvedBadgeVariant = computed(() =>
  props.badgeVariant ?? (props.locked ? 'solid' : 'subtle')
)

function formatBackground(value) {
  const trimmed = value?.trim()
  if (!trimmed) return undefined
  return looksLikeImageUrl(trimmed) ? formatImageBackground(trimmed) : trimmed
}

function formatImageBackground(src) {
  return `center / cover no-repeat url("${src.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}")`
}

function looksLikeImageUrl(value) {
  const lower = value.toLowerCase()
  return lower.startsWith('http://') ||
    lower.startsWith('https://') ||
    lower.startsWith('data:image/') ||
    lower.startsWith('blob:') ||
    lower.startsWith('/') ||
    lower.startsWith('./') ||
    lower.startsWith('../') ||
    /\.(?:avif|gif|jpe?g|png|svg|webp)(?:[?#].*)?$/i.test(value)
}
</script>

<template>
  <div
    v-bind="{ ...$attrs, class: undefined, style: undefined }"
    :class="classes"
    :style="rootStyle"
    :data-aspect="normalizedAspect"
    :data-caption="hasCaption || undefined"
    :data-fit="props.fit === 'height' ? 'height' : undefined"
    :data-max-height="props.maxHeight ? 'true' : undefined"
    :data-align="props.align === 'start' ? undefined : props.align"
    :data-locked="props.locked || undefined"
    :data-size="props.size"
  >
    <div class="media-frame-aspect" aria-hidden="true" />
    <div class="media-frame-bg" :style="{ background: mediaFrameBackground }">
      <img v-if="resolvedImageUrl" :src="resolvedImageUrl" alt="" />
    </div>
    <div v-if="props.showGrain" class="media-frame-grain" />
    <div v-if="hasCaption" class="media-frame-caption-scrim" aria-hidden="true" />

    <!-- Badge without live -->
    <div v-if="props.badgeText && !props.live" class="media-frame-overlay" data-position="top-start">
      <Badge
        :status="resolvedBadgeStatus"
        :variant="resolvedBadgeVariant"
        size="sm"
        shape="default"
        :icon="props.locked ? 'lock' : undefined"
      >
        {{ props.badgeText }}
      </Badge>
    </div>

    <!-- Live overlay -->
    <div v-if="props.live" class="media-frame-overlay" data-position="top-full">
      <span class="media-frame-live-group">
        <Badge
          v-if="props.badgeText"
          :status="resolvedBadgeStatus"
          :variant="resolvedBadgeVariant"
          size="sm"
          shape="default"
          :icon="props.locked ? 'lock' : undefined"
        >
          {{ props.badgeText }}
        </Badge>
        <span class="media-frame-live-badge">{{ props.liveLabel }}</span>
      </span>
      <span class="media-frame-viewer-count">{{ props.viewerCount }}</span>
    </div>

    <!-- Duration -->
    <div v-if="props.duration" class="media-frame-overlay" data-position="bottom-end">
      <span class="media-frame-duration">{{ props.duration }}</span>
    </div>

    <!-- Progress bar -->
    <span
      v-if="normalizedProgress !== null"
      :aria-label="props.progressLabel"
      :aria-valuemax="100"
      :aria-valuemin="0"
      :aria-valuenow="normalizedProgress"
      class="media-frame-progress"
      role="progressbar"
      :style="progressStyle"
    />

    <!-- Overlay slot -->
    <slot name="overlay" />

    <!-- Lock overlay -->
    <div v-if="props.locked" class="media-frame-lock">
      <span v-if="props.lockIcon" class="media-frame-lock-icon" aria-hidden="true">
        <Icon :name="props.lockIcon" size="var(--c-media-frame-lock-icon-size)" />
      </span>
      <span v-if="props.lockTitle" class="media-frame-lock-title">{{ props.lockTitle }}</span>
      <span v-if="props.lockMessage" class="media-frame-lock-message">{{ props.lockMessage }}</span>
      <Button
        v-if="props.lockActionLabel"
        class="media-frame-lock-action"
        :size="props.lockActionSize"
        :shape="props.lockActionShape"
        :variant="props.lockActionVariant"
        :leading-icon="props.lockActionIcon || undefined"
        @click="emit('unlock')"
      >
        {{ props.lockActionLabel }}
      </Button>
    </div>

    <!-- Play button -->
    <button v-if="props.showPlay" class="media-frame-play" type="button" :aria-label="props.playLabel">
      <Icon name="play" size="var(--c-media-frame-play-icon-size)" :style="{ marginLeft: 'var(--c-media-frame-play-icon-offset)' }" />
    </button>

    <!-- Caption -->
    <div v-if="hasCaption" class="media-frame-caption">
      <span v-if="props.captionEyebrow" class="eyebrow">{{ props.captionEyebrow }}</span>
      <span v-if="props.captionTitle" class="title">{{ props.captionTitle }}</span>
    </div>
  </div>
</template>
