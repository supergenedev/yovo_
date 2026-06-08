<script>
const DEFAULT_WAVEFORM = [
  32, 54, 72, 48, 64, 84, 46, 36, 68, 58, 76, 42,
  52, 88, 62, 34, 74, 56, 44, 82, 66, 38, 58, 78,
  48, 70, 52, 40, 86, 60, 36, 68,
]
</script>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, useAttrs } from 'vue'
import Icon from './Icon.vue'

const attrs = useAttrs()

const props = defineProps({
  autoFillBars: { default: true },
  bars: { default: () => DEFAULT_WAVEFORM },
  playedBars: { default: 12 },
  playLabel: { default: 'Play audio' },
  progress: { default: undefined },
  size: { default: 'md' },
  time: { default: '0:14 / 0:36' },
  variant: { default: 'default' },
})

const waveformRef = ref(null)
const autoBarCount = ref(DEFAULT_WAVEFORM.length)

const sourceBars = computed(() => props.bars.length > 0 ? props.bars : DEFAULT_WAVEFORM)

const renderedBars = computed(() => {
  const targetCount = props.autoFillBars
    ? Math.max(sourceBars.value.length, autoBarCount.value)
    : sourceBars.value.length
  return Array.from({ length: targetCount }, (_item, index) => sourceBars.value[index % sourceBars.value.length] ?? 50)
})

const safeProgress = computed(() => clampProgress(props.progress))

const safePlayedBars = computed(() => {
  if (safeProgress.value === null) {
    return Math.max(0, Math.min(Math.round(toFiniteNumber(props.playedBars, 0)), renderedBars.value.length))
  }
  return Math.max(0, Math.min(Math.round(renderedBars.value.length * (safeProgress.value / 100)), renderedBars.value.length))
})

const classes = computed(() =>
  ['sg-ds-library-scope', 'audio-player', attrs.class].filter(Boolean).join(' ')
)

function parseCssLength(value, fallback) {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

function clampBarHeight(value) {
  if (!Number.isFinite(value)) return 50
  return Math.max(16, Math.min(100, Math.round(value)))
}

function clampProgress(value) {
  const numeric = toFiniteNumber(value, Number.NaN)
  if (!Number.isFinite(numeric)) return null
  return Math.max(0, Math.min(100, numeric))
}

function toFiniteNumber(value, fallback) {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) return parsed
  }
  return fallback
}

let observer = null

function updateBarCount() {
  const waveform = waveformRef.value
  if (!waveform) return
  const computedStyle = window.getComputedStyle(waveform)
  const gap = parseCssLength(computedStyle.columnGap || computedStyle.gap, 2)
  const barWidth = parseCssLength(computedStyle.getPropertyValue('--c-audio-player-bar-width'), 2)
  const availableWidth = waveform.clientWidth
  if (availableWidth <= 0) {
    autoBarCount.value = sourceBars.value.length
    return
  }
  const nextCount = Math.max(
    sourceBars.value.length,
    Math.min(160, Math.floor((availableWidth + gap) / Math.max(1, barWidth + gap))),
  )
  if (autoBarCount.value !== nextCount) {
    autoBarCount.value = nextCount
  }
}

function setupObserver() {
  if (observer) {
    observer.disconnect()
    observer = null
  }
  if (!props.autoFillBars) {
    autoBarCount.value = sourceBars.value.length
    return
  }
  const waveform = waveformRef.value
  if (!waveform) return
  updateBarCount()
  observer = new ResizeObserver(updateBarCount)
  observer.observe(waveform)
}

onMounted(() => {
  setupObserver()
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
})

watch([() => props.autoFillBars, () => sourceBars.value.length], () => {
  setupObserver()
})
</script>

<template>
  <div
    v-bind="{ ...$attrs, class: undefined }"
    :class="classes"
    :data-size="props.size === 'sm' ? 'sm' : undefined"
    :data-variant="props.variant !== 'default' ? props.variant : undefined"
  >
    <button class="audio-player-play" type="button" :aria-label="props.playLabel">
      <Icon name="play" size="42%" />
    </button>
    <div class="audio-player-waveform" aria-hidden="true" ref="waveformRef">
      <span
        v-for="(height, index) in renderedBars"
        :key="`${height}-${index}`"
        :class="index < safePlayedBars ? 'played' : undefined"
        :style="{ height: `${clampBarHeight(height)}%` }"
      />
    </div>
    <span v-if="props.time" class="audio-player-time">{{ props.time }}</span>
  </div>
</template>
