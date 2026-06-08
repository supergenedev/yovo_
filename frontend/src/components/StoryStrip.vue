<script setup>
import { ref, computed, onMounted, onUnmounted, watch, useAttrs } from 'vue'
import Story from './Story.vue'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const props = defineProps({
  as: { type: String, default: 'nav' },
  label: { type: String, default: 'Live creators' },
  scroll: { type: String, default: 'auto' },
})

const stripRef = ref(null)
const autoScroll = ref('none')

const resolvedScroll = computed(() =>
  props.scroll === 'auto' ? autoScroll.value : props.scroll
)

const classes = computed(() =>
  ['sg-ds-library-scope', 'story-strip', attrs.class].filter(Boolean).join(' ')
)

const ariaLabel = computed(() =>
  attrs['aria-label'] ?? props.label
)

function parseCssPixelValue(value) {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function getScrollEdgeTolerance(element) {
  const style = window.getComputedStyle(element)
  return Math.max(
    1,
    parseCssPixelValue(style.paddingInlineStart),
    parseCssPixelValue(style.paddingLeft),
    parseCssPixelValue(style.scrollPaddingInlineStart),
    parseCssPixelValue(style.scrollPaddingLeft),
  ) + 1
}

function getAutoScroll(element) {
  const maxScrollLeft = Math.max(0, element.scrollWidth - element.clientWidth)
  const edgeTolerance = getScrollEdgeTolerance(element)
  if (maxScrollLeft <= edgeTolerance) return 'none'

  const scrollLeft = Math.max(0, Math.min(maxScrollLeft, element.scrollLeft))
  const canScrollStart = scrollLeft > edgeTolerance
  const canScrollEnd = maxScrollLeft - scrollLeft > edgeTolerance
  if (canScrollStart && canScrollEnd) return 'both'
  if (canScrollEnd) return 'start'
  if (canScrollStart) return 'end'
  return 'none'
}

let frame = 0
let observer = null

function scheduleUpdate() {
  if (frame) window.cancelAnimationFrame(frame)
  frame = window.requestAnimationFrame(() => {
    if (stripRef.value) autoScroll.value = getAutoScroll(stripRef.value)
  })
}

function setupListeners() {
  const element = stripRef.value
  if (!element || props.scroll !== 'auto') return

  scheduleUpdate()
  element.addEventListener('scroll', scheduleUpdate, { passive: true })
  window.addEventListener('resize', scheduleUpdate)

  const ResizeObserverCtor = window.ResizeObserver
  observer = ResizeObserverCtor ? new ResizeObserverCtor(scheduleUpdate) : null
  observer?.observe(element)
  Array.from(element.children).forEach((child) => observer?.observe(child))
}

function teardownListeners() {
  const element = stripRef.value
  if (frame) window.cancelAnimationFrame(frame)
  if (element) element.removeEventListener('scroll', scheduleUpdate)
  window.removeEventListener('resize', scheduleUpdate)
  observer?.disconnect()
  observer = null
}

onMounted(() => {
  setupListeners()
})

onUnmounted(() => {
  teardownListeners()
})

watch(() => props.scroll, () => {
  teardownListeners()
  setupListeners()
})
</script>

<template>
  <component
    :is="props.as"
    v-bind="{ ...attrs, class: undefined }"
    :class="classes"
    :aria-label="ariaLabel"
    :data-scroll="resolvedScroll !== 'both' ? resolvedScroll : undefined"
    ref="stripRef"
  >
    <slot>
      <Story avatar-tone="brand" initials="HL" label="Hailey" />
      <Story avatar-tone="teal" badge="ON" initials="NV" label="NeoVoice" />
      <Story avatar-tone="amber" badge="" initials="KO" label="Koda" state="seen" />
    </slot>
  </component>
</template>
