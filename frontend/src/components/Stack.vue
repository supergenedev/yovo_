<script setup>
import { ref, computed, onMounted, onUnmounted, watch, useAttrs } from 'vue'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const props = defineProps({
  align: { default: 'stretch' },
  as: { default: 'div' },
  background: { default: 'none' },
  bottom: { default: undefined },
  direction: { default: 'column' },
  flex: { default: undefined },
  gap: { default: 'md' },
  glassBlur: { default: undefined },
  height: { default: undefined },
  justify: { default: 'start' },
  left: { default: undefined },
  marginBlock: { default: undefined },
  marginBottom: { default: undefined },
  marginInline: { default: undefined },
  marginLeft: { default: undefined },
  marginRight: { default: undefined },
  marginTop: { default: undefined },
  mask: { default: 'none' },
  maskAngle: { default: undefined },
  maskEnd: { default: undefined },
  maskStart: { default: undefined },
  maxHeight: { default: undefined },
  maxWidth: { default: undefined },
  minHeight: { default: undefined },
  minWidth: { default: undefined },
  overflow: { default: undefined },
  overflowX: { default: undefined },
  overflowY: { default: undefined },
  padding: { default: 'none' },
  paddingBlock: { default: undefined },
  paddingBottom: { default: undefined },
  paddingInline: { default: undefined },
  paddingLeft: { default: undefined },
  paddingRight: { default: undefined },
  paddingTop: { default: undefined },
  position: { default: 'static' },
  radius: { default: 'none' },
  right: { default: undefined },
  scrollFade: { default: false },
  textAlign: { default: undefined },
  top: { default: undefined },
  width: { default: undefined },
  wrap: { default: false },
  zIndex: { default: undefined },
})

const STACK_GAP_VALUES = {
  none: '0px',
  xxs: 'var(--c-stack-gap-xxs)',
  xs: 'var(--c-stack-gap-xs)',
  sm: 'var(--c-stack-gap-sm)',
  md: 'var(--c-stack-gap-md)',
  lg: 'var(--c-stack-gap-lg)',
  xl: 'var(--c-stack-gap-xl)',
  '2xl': 'var(--c-stack-gap-2xl)',
}

const STACK_PADDING_VALUES = {
  none: '0px',
  xs: 'var(--c-stack-padding-xs)',
  sm: 'var(--c-stack-padding-sm)',
  md: 'var(--c-stack-padding-md)',
  lg: 'var(--c-stack-padding-lg)',
  xl: 'var(--c-stack-padding-xl)',
}

function resolveStackValue(value, values) {
  return values[value] ?? value
}

function isNamedStackValue(value, values) {
  return Object.prototype.hasOwnProperty.call(values, value)
}

function formatStackAngle(value) {
  const text = String(value).trim()
  return /[a-z)]$/i.test(text) ? text : `${text}deg`
}

function formatStackPercentage(value) {
  const text = String(value).trim()
  return text.endsWith('%') ? text : `${text}%`
}

function formatStackLength(value) {
  const text = String(value).trim()
  if (!text) return '0px'
  return /[a-z%)]$/i.test(text) ? text : `${text}px`
}

function applyStackLength(style, key, value) {
  if (value === undefined || String(value).trim() === '') return
  style[key] = formatStackLength(value)
}

function applyStackValue(style, key, value) {
  if (value === undefined || String(value).trim() === '') return
  style[key] = value
}

const stackStyle = computed(() => {
  const customStyle = {}

  if (!isNamedStackValue(props.gap, STACK_GAP_VALUES)) {
    customStyle['--c-stack-gap'] = resolveStackValue(props.gap, STACK_GAP_VALUES)
  }
  if (!isNamedStackValue(props.padding, STACK_PADDING_VALUES)) {
    customStyle['--c-stack-padding'] = resolveStackValue(props.padding, STACK_PADDING_VALUES)
  }
  if (props.mask !== 'none') {
    if (props.maskAngle !== undefined) {
      customStyle['--c-stack-mask-angle'] = formatStackAngle(props.maskAngle)
    }
    if (props.maskStart !== undefined) {
      customStyle['--c-stack-mask-start'] = formatStackPercentage(props.maskStart)
    }
    if (props.maskEnd !== undefined) {
      customStyle['--c-stack-mask-end'] = formatStackPercentage(props.maskEnd)
    }
  }
  if (props.glassBlur !== undefined) {
    customStyle['--c-stack-glass-blur'] = formatStackLength(props.glassBlur)
  }

  applyStackLength(customStyle, 'width', props.width)
  applyStackLength(customStyle, 'minWidth', props.minWidth)
  applyStackLength(customStyle, 'maxWidth', props.maxWidth)
  applyStackLength(customStyle, 'height', props.height)
  applyStackLength(customStyle, 'minHeight', props.minHeight)
  applyStackLength(customStyle, 'maxHeight', props.maxHeight)
  applyStackValue(customStyle, 'flex', props.flex)

  if (props.position !== 'static') {
    customStyle.position = props.position
  }

  applyStackLength(customStyle, 'top', props.top)
  applyStackLength(customStyle, 'right', props.right)
  applyStackLength(customStyle, 'bottom', props.bottom)
  applyStackLength(customStyle, 'left', props.left)
  applyStackValue(customStyle, 'zIndex', props.zIndex)

  if (props.overflow && props.overflow !== 'visible') {
    customStyle.overflow = props.overflow
  }
  if (props.overflowX && props.overflowX !== 'visible') {
    customStyle.overflowX = props.overflowX
  }
  if (props.overflowY && props.overflowY !== 'visible') {
    customStyle.overflowY = props.overflowY
  }

  applyStackLength(customStyle, 'marginTop', props.marginTop)
  applyStackLength(customStyle, 'marginRight', props.marginRight)
  applyStackLength(customStyle, 'marginBottom', props.marginBottom)
  applyStackLength(customStyle, 'marginLeft', props.marginLeft)
  applyStackValue(customStyle, 'marginInline', props.marginInline)
  applyStackValue(customStyle, 'marginBlock', props.marginBlock)
  applyStackLength(customStyle, 'paddingTop', props.paddingTop)
  applyStackLength(customStyle, 'paddingRight', props.paddingRight)
  applyStackLength(customStyle, 'paddingBottom', props.paddingBottom)
  applyStackLength(customStyle, 'paddingLeft', props.paddingLeft)
  applyStackValue(customStyle, 'paddingInline', props.paddingInline)
  applyStackValue(customStyle, 'paddingBlock', props.paddingBlock)

  if (props.textAlign) {
    customStyle.textAlign = props.textAlign
  }

  const attrStyle = attrs.style ?? {}
  return Object.keys(customStyle).length > 0
    ? { ...customStyle, ...attrStyle }
    : attrStyle
})

const classes = computed(() =>
  ['sg-ds-library-scope', 'stack', attrs.class].filter(Boolean).join(' ')
)

// Scroll fade
const stackRef = ref(null)
const scrollFadeEdges = ref({ bottom: false, left: false, right: false, top: false })

function isScrollableStackOverflow(value) {
  return value === 'auto' || value === 'scroll' || value === 'overlay'
}

function getStackScrollFadeEdges(node) {
  const computedStyle = window.getComputedStyle(node)
  const maxScrollTop = Math.max(0, node.scrollHeight - node.clientHeight)
  const maxScrollLeft = Math.max(0, node.scrollWidth - node.clientWidth)
  const canScrollY = maxScrollTop > 1 && isScrollableStackOverflow(computedStyle.overflowY)
  const canScrollX = maxScrollLeft > 1 && isScrollableStackOverflow(computedStyle.overflowX)
  const scrollTop = Math.max(0, node.scrollTop)
  const scrollLeft = Math.max(0, node.scrollLeft)
  return {
    bottom: canScrollY && scrollTop < maxScrollTop - 1,
    left: canScrollX && scrollLeft > 1,
    right: canScrollX && scrollLeft < maxScrollLeft - 1,
    top: canScrollY && scrollTop > 1,
  }
}

let scrollFadeFrame = 0
let scrollFadeCleanup = null

function setupScrollFade() {
  if (scrollFadeCleanup) {
    scrollFadeCleanup()
    scrollFadeCleanup = null
  }

  if (!props.scrollFade) {
    scrollFadeEdges.value = { bottom: false, left: false, right: false, top: false }
    return
  }

  const node = stackRef.value
  if (!node) return

  const updateScrollFadeEdges = () => {
    if (scrollFadeFrame) {
      window.cancelAnimationFrame(scrollFadeFrame)
    }
    scrollFadeFrame = window.requestAnimationFrame(() => {
      scrollFadeFrame = 0
      scrollFadeEdges.value = getStackScrollFadeEdges(node)
    })
  }

  updateScrollFadeEdges()
  node.addEventListener('scroll', updateScrollFadeEdges, { passive: true })

  const resizeObserver = typeof ResizeObserver !== 'undefined'
    ? new ResizeObserver(updateScrollFadeEdges)
    : null
  resizeObserver?.observe(node)
  Array.from(node.children).forEach((child) => resizeObserver?.observe(child))
  window.addEventListener('resize', updateScrollFadeEdges)

  scrollFadeCleanup = () => {
    if (scrollFadeFrame) {
      window.cancelAnimationFrame(scrollFadeFrame)
    }
    node.removeEventListener('scroll', updateScrollFadeEdges)
    resizeObserver?.disconnect()
    window.removeEventListener('resize', updateScrollFadeEdges)
  }
}

onMounted(() => {
  setupScrollFade()
})

onUnmounted(() => {
  if (scrollFadeCleanup) scrollFadeCleanup()
})

watch(
  () => [
    props.as,
    props.height,
    props.maxHeight,
    props.maxWidth,
    props.minHeight,
    props.minWidth,
    props.overflow,
    props.overflowX,
    props.overflowY,
    props.scrollFade,
    props.width,
  ],
  () => {
    setupScrollFade()
  }
)
</script>

<template>
  <component
    :is="props.as"
    v-bind="{ ...($attrs), class: undefined, style: undefined }"
    ref="stackRef"
    :class="classes"
    :style="stackStyle"
    :data-align="props.align !== 'stretch' ? props.align : undefined"
    :data-background="props.background !== 'none' ? props.background : undefined"
    :data-direction="props.direction !== 'column' ? props.direction : undefined"
    :data-gap="isNamedStackValue(props.gap, STACK_GAP_VALUES) ? props.gap : undefined"
    :data-justify="props.justify !== 'start' ? props.justify : undefined"
    :data-mask="props.mask !== 'none' ? props.mask : undefined"
    :data-padding="isNamedStackValue(props.padding, STACK_PADDING_VALUES) ? props.padding : undefined"
    :data-radius="props.radius !== 'none' ? props.radius : undefined"
    :data-scroll-fade="props.scrollFade ? 'true' : undefined"
    :data-scroll-fade-bottom="props.scrollFade && scrollFadeEdges.bottom ? 'true' : undefined"
    :data-scroll-fade-left="props.scrollFade && scrollFadeEdges.left ? 'true' : undefined"
    :data-scroll-fade-right="props.scrollFade && scrollFadeEdges.right ? 'true' : undefined"
    :data-scroll-fade-top="props.scrollFade && scrollFadeEdges.top ? 'true' : undefined"
    :data-wrap="props.wrap ? 'true' : undefined"
  >
    <slot />
  </component>
</template>
