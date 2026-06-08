<script setup>
import { ref, computed, watch, useAttrs } from 'vue'
import AudioPlayer from './AudioPlayer.vue'

const attrs = useAttrs()

const props = defineProps({
  artAlt: { default: '' },
  artBackground: { default: 'linear-gradient(135deg, #111827 0%, #7c3aed 48%, #f43f5e 100%)' },
  artImageUrl: { default: '' },
  artName: { default: 'dusk.exe' },
  bars: { default: undefined },
  endTime: { default: '3:25' },
  onProgressChange: { default: undefined },
  playedBars: { default: 16 },
  playLabel: { default: 'Play track' },
  progress: { default: undefined },
  progressLabel: { default: 'Audio progress' },
  startTime: { default: '1:14' },
})

const DEFAULT_AUDIO_BLOCK_BAR_COUNT = 32

function toFiniteNumber(value, fallback) {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) return parsed
  }
  return fallback
}

function clampProgress(value) {
  return Math.max(0, Math.min(100, toFiniteNumber(value, 0)))
}

const derivedProgress = computed(() => {
  const sourceBarCount = props.bars && props.bars.length > 0 ? props.bars.length : DEFAULT_AUDIO_BLOCK_BAR_COUNT
  const playedBarCount = toFiniteNumber(props.playedBars, 16)
  return clampProgress(
    props.progress !== undefined
      ? props.progress
      : (playedBarCount <= sourceBarCount
          ? (playedBarCount / sourceBarCount) * 100
          : playedBarCount)
  )
})

const localProgress = ref(derivedProgress.value)

watch(derivedProgress, (val) => {
  localProgress.value = val
})

const controlledProgress = computed(() => props.progress !== undefined)

const progress = computed(() => controlledProgress.value ? derivedProgress.value : localProgress.value)

const artStyle = computed(() => ({ background: props.artBackground }))

const trackStyle = computed(() => ({ '--audio-block-progress': `${progress.value}%` }))

const classes = computed(() =>
  ['sg-ds-library-scope', 'audio-block', attrs.class].filter(Boolean).join(' ')
)

function handleProgressChange(event) {
  const nextProgress = Number(event.currentTarget.value)
  const clamped = clampProgress(nextProgress)
  if (!controlledProgress.value) localProgress.value = clamped
  if (props.onProgressChange) props.onProgressChange(clamped)
}
</script>

<template>
  <div v-bind="{ ...$attrs, class: undefined }" :class="classes">
    <div class="audio-block-art" :style="artStyle">
      <img v-if="props.artImageUrl" class="audio-block-art-image" :src="props.artImageUrl" :alt="props.artAlt" />
      <span class="audio-block-art-name">{{ props.artName }}</span>
    </div>
    <div class="audio-block-content">
      <AudioPlayer
        :bars="props.bars"
        :played-bars="props.playedBars"
        :play-label="props.playLabel"
        :progress="progress"
        time=""
        variant="inline"
      />
      <div class="audio-block-timecode">
        <span>{{ props.startTime }}</span>
        <input
          :aria-label="props.progressLabel"
          class="audio-block-timecode-track"
          :max="100"
          :min="0"
          :step="1"
          :style="trackStyle"
          type="range"
          :value="Math.round(progress)"
          @change="handleProgressChange"
        />
        <span>{{ props.endTime }}</span>
      </div>
    </div>
  </div>
</template>
