<script setup>
import { ref, computed, onMounted, onUnmounted, watch, useAttrs } from 'vue'
import Button from './Button.vue'

const attrs = useAttrs()

const props = defineProps({
  arrows: { default: false },
  cols: { default: 3 },
  count: { default: 3 },
  edgeFade: { default: 'fade' },
  edgePadding: { default: '' },
  gap: { default: 'md' },
  itemAspectRatio: { default: '' },
  itemSize: { default: undefined },
  itemSizeOverride: { default: undefined },
  itemMinSize: { default: undefined },
  itemMaxSize: { default: undefined },
  layout: { default: 'row' },
  scroll: { default: 'smooth' },
  shadow: { default: false },
})

const ITEM_SIZE_PRESETS = {
  sm: '12rem',
  md: '16.5rem',
  lg: '22rem',
  xl: '28rem',
}

function resolveCardGridItemWidth(size, override) {
  const custom = override?.trim()
  if (custom) return custom
  if (!size || size === 'custom') return undefined
  return ITEM_SIZE_PRESETS[size] ?? String(size).trim() ?? undefined
}

const normalizedCols = computed(() => Math.max(1, Math.round(Number(props.cols) || 1)))

const rowWidth = computed(() =>
  props.layout === 'row' ? resolveCardGridItemWidth(props.itemSize, props.itemSizeOverride) : undefined
)
const rowMinWidth = computed(() =>
  props.layout === 'row' ? props.itemMinSize?.trim() || undefined : undefined
)
const rowMaxWidth = computed(() =>
  props.layout === 'row' ? props.itemMaxSize?.trim() || undefined : undefined
)

const gridStyle = computed(() => {
  const s = {
    '--c-card-grid-cols': normalizedCols.value,
  }
  if (props.edgePadding) s['--c-card-grid-edge-padding'] = props.edgePadding
  if (rowWidth.value) s['--c-card-grid-item-width'] = rowWidth.value
  if (rowMinWidth.value) s['--c-card-grid-item-min-width'] = rowMinWidth.value
  if (rowMaxWidth.value) s['--c-card-grid-item-max-width'] = rowMaxWidth.value
  return s
})

const trackRef = ref(null)
const edge = ref({ left: false, right: false })

function updateEdge() {
  const track = trackRef.value
  if (!track) return
  edge.value = {
    left: track.scrollLeft > 8,
    right: track.scrollWidth - track.clientWidth - track.scrollLeft > 8,
  }
}

let resizeObserver = null
let cleanup = null

function setupScrollListener() {
  teardownScrollListener()
  if (props.layout !== 'row') return
  const track = trackRef.value
  if (!track) return
  updateEdge()
  track.addEventListener('scroll', updateEdge, { passive: true })
  resizeObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(updateEdge)
  resizeObserver?.observe(track)
  cleanup = () => {
    track.removeEventListener('scroll', updateEdge)
    resizeObserver?.disconnect()
    resizeObserver = null
  }
}

function teardownScrollListener() {
  if (cleanup) {
    cleanup()
    cleanup = null
  }
}

onMounted(() => {
  setupScrollListener()
})

onUnmounted(() => {
  teardownScrollListener()
})

watch(
  () => [props.layout, rowWidth.value, rowMinWidth.value, rowMaxWidth.value, props.gap, props.scroll],
  () => {
    setupScrollListener()
  }
)

function scrollByItem(direction) {
  const track = trackRef.value
  if (!track) return
  const firstCell = track.querySelector('.card-grid-cell')
  const step = firstCell ? firstCell.getBoundingClientRect().width + 16 : track.clientWidth * 0.85
  track.scrollBy({ behavior: 'smooth', left: direction * step })
}

const rowClasses = computed(() =>
  [
    'sg-ds-library-scope',
    'card-grid',
    'card-grid--row',
    `card-grid--gap-${props.gap}`,
    `card-grid--edge-${props.edgeFade}`,
    `card-grid--scroll-${props.scroll}`,
    props.shadow ? 'card-grid--shadow' : '',
    edge.value.left ? 'has-left' : '',
    edge.value.right ? 'has-right' : '',
    attrs.class,
  ].filter(Boolean).join(' ')
)

const nonRowClasses = computed(() =>
  [
    'sg-ds-library-scope',
    'card-grid',
    `card-grid--${props.layout}`,
    `card-grid--gap-${props.gap}`,
    props.shadow ? 'card-grid--shadow' : '',
    attrs.class,
  ].filter(Boolean).join(' ')
)
</script>

<template>
  <div
    v-if="layout === 'row'"
    v-bind="{ ...$attrs, class: undefined }"
    :class="rowClasses"
    :style="gridStyle"
  >
    <div class="card-grid-track" ref="trackRef">
      <div
        v-for="(_, index) in Array(Math.max(1, Math.round(Number(count) || 1)))"
        :key="index"
        class="card-grid-cell"
        :style="itemAspectRatio ? { aspectRatio: itemAspectRatio } : undefined"
      >
        <slot />
      </div>
    </div>
    <Button
      v-if="arrows && edge.left"
      aria-label="Previous cards"
      class="card-grid-arrow card-grid-arrow--left"
      :iconOnly="true"
      leadingIcon="chevron-left"
      size="sm"
      variant="secondary"
      @click="scrollByItem(-1)"
    />
    <Button
      v-if="arrows && edge.right"
      aria-label="Next cards"
      class="card-grid-arrow card-grid-arrow--right"
      :iconOnly="true"
      leadingIcon="chevron-right"
      size="sm"
      variant="secondary"
      @click="scrollByItem(1)"
    />
  </div>

  <div
    v-else
    v-bind="{ ...$attrs, class: undefined }"
    :class="nonRowClasses"
    :style="gridStyle"
  >
    <div
      v-for="(_, index) in Array(Math.max(1, Math.round(Number(count) || 1)))"
      :key="index"
      class="card-grid-cell"
      :style="itemAspectRatio ? { aspectRatio: itemAspectRatio } : undefined"
    >
      <slot />
    </div>
  </div>
</template>
