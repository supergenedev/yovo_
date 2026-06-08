<script setup>
import { computed, useAttrs } from 'vue'

const attrs = useAttrs()

const props = defineProps({
  alt: { default: '' },
  aspectRatio: { default: '16 / 9' },
  backgroundPosition: { default: 'center' },
  backgroundRepeat: { default: 'no-repeat' },
  backgroundSize: { default: undefined },
  fit: { default: 'cover' },
  mask: { default: 'none' },
  maskAngle: { default: 0 },
  maskEnd: { default: 100 },
  maskStart: { default: 45 },
  overlay: { default: 'none' },
  overlayColor: { default: undefined },
  overlayGlassBlur: { default: undefined },
  overlayMask: { default: 'none' },
  overlayMaskAngle: { default: 0 },
  overlayMaskEnd: { default: 100 },
  overlayMaskStart: { default: 45 },
  radius: { default: undefined },
  rounded: { default: 'md' },
  src: { default: undefined },
  videoAutoPlay: { default: true },
  videoControls: { default: false },
  videoLoop: { default: true },
  videoMuted: { default: true },
  videoPlaysInline: { default: true },
})

function formatMediaBackgroundImage(src) {
  return `url("${src.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}")`
}

function isMediaVideoSource(src) {
  const value = src?.trim() ?? ''
  const path = value.split(/[?#]/, 1)[0].toLowerCase()
  return value.toLowerCase().startsWith('data:video/') || /\.(?:webm|mp4|m4v|mov|ogv|ogg)$/.test(path)
}

function formatMediaAngle(value) {
  const text = String(value).trim()
  return /[a-z)]$/i.test(text) ? text : `${text}deg`
}

function formatMediaPercentage(value) {
  const text = String(value).trim()
  return text.endsWith('%') ? text : `${text}%`
}

function formatMediaLength(value) {
  const text = String(value).trim()
  if (!text) return '0px'
  return /[a-z%)]$/i.test(text) ? text : `${text}px`
}

const isVideo = computed(() => isMediaVideoSource(props.src))
const hasOverlay = computed(() => props.overlay !== 'none' || Boolean(props.overlayColor))

const classes = computed(() =>
  ['sg-ds-library-scope', 'media', `media--fit-${props.fit}`, `media--rounded-${props.rounded}`, attrs.class]
    .filter(Boolean)
    .join(' ')
)

const mediaStyle = computed(() => {
  const style = {}
  style.aspectRatio = props.aspectRatio
  if (hasOverlay.value && props.overlayMask !== 'none') {
    style['--c-media-mask-angle'] = formatMediaAngle(props.overlayMaskAngle)
    style['--c-media-mask-end'] = formatMediaPercentage(props.overlayMaskEnd)
    style['--c-media-mask-start'] = formatMediaPercentage(props.overlayMaskStart)
  }
  if (props.mask !== 'none') {
    style['--c-media-fade-angle'] = formatMediaAngle(props.maskAngle)
    style['--c-media-fade-end'] = formatMediaPercentage(props.maskEnd)
    style['--c-media-fade-start'] = formatMediaPercentage(props.maskStart)
  }
  if (props.overlayColor) {
    style['--c-media-overlay-color'] = props.overlayColor
  }
  if (props.radius !== undefined && props.radius !== '') {
    style.borderRadius = formatMediaLength(props.radius)
  }
  if (props.overlayGlassBlur !== undefined) {
    style['--c-media-glass-blur'] = formatMediaLength(props.overlayGlassBlur)
  }
  if (props.src && !isVideo.value) {
    style.backgroundImage = formatMediaBackgroundImage(props.src)
    style.backgroundPosition = props.backgroundPosition
    style.backgroundRepeat = props.backgroundRepeat
    style.backgroundSize = props.backgroundSize ?? props.fit
  }
  if (attrs.style) {
    Object.assign(style, attrs.style)
  }
  return style
})

const ariaLabel = computed(() =>
  props.src && props.alt && !isVideo.value ? props.alt : attrs['aria-label']
)

const role = computed(() =>
  props.src && props.alt && !isVideo.value ? 'img' : attrs.role
)

const dataOverlay = computed(() => {
  if (props.overlay !== 'none') return props.overlay
  if (props.overlayColor) return 'custom'
  return undefined
})
</script>

<template>
  <div
    v-bind="{ ...($attrs), class: undefined, style: undefined, 'aria-label': undefined, role: undefined }"
    :aria-label="ariaLabel"
    :class="classes"
    :style="mediaStyle"
    :role="role"
    :data-has-media="props.src ? 'true' : undefined"
    :data-overlay="dataOverlay"
    :data-overlay-color="props.overlayColor ? 'true' : undefined"
    :data-overlay-mask="hasOverlay && props.overlayMask !== 'none' ? props.overlayMask : undefined"
    :data-mask="props.mask === 'none' ? undefined : props.mask"
  >
    <video
      v-if="props.src && isVideo"
      :aria-label="props.alt || undefined"
      :autoplay="props.videoAutoPlay"
      class="media-video"
      :controls="props.videoControls"
      :loop="props.videoLoop"
      :muted="props.videoMuted"
      :playsinline="props.videoPlaysInline"
      :src="props.src"
    />
    <slot v-if="$slots.default" />
    <span v-else-if="!props.src" class="media-placeholder" />
    <span v-if="hasOverlay" aria-hidden="true" class="media-overlay" />
  </div>
</template>
