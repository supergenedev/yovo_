<script setup>
import { ref, computed, watch, onMounted, useAttrs, nextTick } from 'vue'
import Button from './Button.vue'

const attrs = useAttrs()

const props = defineProps({
  align: { default: 'center' },
  cardMinWidth: { default: '' },
  cardWidth: { default: 78 },
  count: { default: 3 },
  edgeFade: { default: 'fade' },
  gap: { default: 'md' },
  indicatorPosition: { default: 'outside' },
  indicators: { default: true },
  itemAspectRatio: { default: '' },
  itemHeight: { default: '' },
  loop: { default: true },
  shadow: { default: false },
  startIndex: { default: 0 },
})

defineOptions({ inheritAttrs: false })

const viewportRef = ref(null)
const activeIndex = ref(normalizeCarouselIndex(props.startIndex, Number(props.count) || 1))

watch(() => [props.startIndex, props.count], ([newStart, newCount]) => {
  activeIndex.value = normalizeCarouselIndex(newStart, Math.max(1, Math.round(Number(newCount) || 1)))
})

watch(activeIndex, async () => {
  await nextTick()
  scrollToActive()
})

onMounted(() => {
  scrollToActive()
})

function scrollToActive() {
  const viewport = viewportRef.value
  const cell = viewport?.querySelectorAll('.carousel-cell')[activeIndex.value]
  cell?.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: props.align === 'start' ? 'start' : 'center',
  })
}

const normalizedCount = computed(() => Math.max(1, Math.round(Number(props.count) || 1)))

const canMove = computed(() => normalizedCount.value > 1)

function move(direction) {
  if (!canMove.value) return
  const current = activeIndex.value
  const length = normalizedCount.value
  const next = current + direction
  if (props.loop) {
    activeIndex.value = (next + length) % length
  } else {
    activeIndex.value = Math.min(length - 1, Math.max(0, next))
  }
}

function handleKeyDown(event) {
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    move(-1)
  }
  if (event.key === 'ArrowRight') {
    event.preventDefault()
    move(1)
  }
}

const carouselStyle = computed(() => ({
  '--c-carousel-card-width': normalizeCarouselCardWidth(props.cardWidth),
  '--c-carousel-card-min-width': normalizeCarouselLength(props.cardMinWidth),
  '--c-carousel-item-height': normalizeCarouselLength(props.itemHeight),
}))

const classes = computed(() =>
  [
    'sg-ds-library-scope',
    'carousel',
    `carousel--align-${props.align}`,
    `carousel--edge-${props.edgeFade}`,
    `carousel--gap-${props.gap}`,
    `carousel--indicators-${props.indicatorPosition}`,
    props.shadow ? 'carousel--shadow' : '',
    attrs.class,
  ].filter(Boolean).join(' ')
)

const itemIndices = computed(() => Array.from({ length: normalizedCount.value }, (_, i) => i))

function cellStyle(index) {
  return {
    ...(props.itemAspectRatio ? { aspectRatio: props.itemAspectRatio } : null),
    ...(props.itemHeight ? { height: 'var(--c-carousel-item-height)' } : null),
  }
}

function cellClass(index) {
  return ['carousel-cell', index === activeIndex.value ? 'is-active' : ''].filter(Boolean).join(' ')
}

function normalizeCarouselIndex(value, count) {
  if (count <= 0) return 0
  const parsed = Number(value)
  return Math.min(count - 1, Math.max(0, Number.isFinite(parsed) ? Math.round(parsed) : 0))
}

function normalizeCarouselCardWidth(value) {
  const parsed = typeof value === 'number' ? value : Number(String(value).replace('%', '').trim())
  if (!Number.isFinite(parsed)) return '78%'
  return `${Math.min(100, Math.max(1, parsed))}%`
}

function normalizeCarouselLength(value) {
  if (typeof value === 'number') return Number.isFinite(value) ? `${value}px` : undefined
  const text = value?.trim()
  if (!text) return undefined
  return /^-?\d+(\.\d+)?$/.test(text) ? `${text}px` : text
}
</script>

<template>
  <div
    v-if="normalizedCount > 0"
    v-bind="{ ...$attrs, class: undefined }"
    :class="classes"
    :style="carouselStyle"
    aria-roledescription="carousel"
    role="region"
  >
    <div
      ref="viewportRef"
      class="carousel-viewport"
      :tabindex="0"
      @keydown="handleKeyDown"
    >
      <div class="carousel-track">
        <div
          v-for="index in itemIndices"
          :key="index"
          :aria-current="index === activeIndex ? 'true' : undefined"
          :aria-label="`Show card ${index + 1}`"
          :class="cellClass(index)"
          :style="cellStyle(index)"
          :tabindex="0"
          role="button"
          @click="activeIndex = index"
        >
          <slot :name="`item-${index}`">
            <slot />
          </slot>
        </div>
      </div>
    </div>
    <div v-if="canMove" class="carousel-controls">
      <Button aria-label="Previous card" :icon-only="true" leading-icon="chevron-left" size="sm" variant="secondary" @click="move(-1)" />
      <Button aria-label="Next card" :icon-only="true" leading-icon="chevron-right" size="sm" variant="secondary" @click="move(1)" />
    </div>
    <div v-if="indicators" aria-label="Carousel indicators" class="carousel-indicators">
      <button
        v-for="index in itemIndices"
        :key="index"
        :aria-label="`Go to card ${index + 1}`"
        :aria-pressed="index === activeIndex"
        :class="index === activeIndex ? 'carousel-dot is-active' : 'carousel-dot'"
        type="button"
        @click="activeIndex = index"
      />
    </div>
  </div>
</template>
