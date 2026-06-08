<script setup>
import { ref, watch, computed, useAttrs } from 'vue'

const attrs = useAttrs()

const props = defineProps({
  color: { type: String },
  name: { type: String },
  size: { type: [String, Number] },
  strokeWidth: { type: [String, Number] },
  source: { type: String },
})

// SVG fetch cache (module-level, shared across all instances)
const svgCache = new Map()
const inflight = new Map()

function loadSvg(url) {
  const cached = svgCache.get(url)
  if (cached != null) return Promise.resolve(cached)
  const pending = inflight.get(url)
  if (pending) return pending
  const promise = fetch(url)
    .then((response) => (response.ok ? response.text() : ''))
    .then((text) => {
      svgCache.set(url, text)
      inflight.delete(url)
      return text
    })
    .catch(() => {
      svgCache.set(url, '')
      inflight.delete(url)
      return ''
    })
  inflight.set(url, promise)
  return promise
}

function toCssSize(value) {
  if (typeof value === 'number' && Number.isFinite(value)) return `${value}px`
  if (typeof value === 'string' && value.trim()) {
    const trimmed = value.trim()
    return /^\d+(\.\d+)?$/.test(trimmed) ? `${trimmed}px` : trimmed
  }
  return '1em'
}

function toCssColor(value) {
  const trimmed = value?.trim()
  return trimmed ? trimmed : undefined
}

function prepareSvg(svg, strokeWidth) {
  const sw = typeof strokeWidth === 'number' ? String(strokeWidth) : (strokeWidth.trim() || '2')
  return svg.replace(/<svg\b([^>]*)>/i, (_match, attrs) => {
    let nextAttrs = attrs
    nextAttrs = nextAttrs.replace(/\s(width|height)="[^"]*"/g, '')
    nextAttrs = nextAttrs.replace(/\sstroke-width="[^"]*"/g, '')
    nextAttrs = nextAttrs.replace(/\sstyle="[^"]*"/g, '')
    return `<svg${nextAttrs} width="100%" height="100%" stroke-width="${sw}" style="display:block">`
  })
}

// The icon source URL — callers pass it directly via `source` prop
// (replaces resolveWorkbenchIconSource(name) from the React version)
const markup = ref(props.source ? (svgCache.get(props.source) ?? '') : '')

watch(
  () => props.source,
  (source) => {
    if (!source) {
      markup.value = ''
      return
    }
    const cached = svgCache.get(source)
    if (cached != null) {
      markup.value = cached
      return
    }
    loadSvg(source).then((text) => {
      markup.value = text
    })
  },
  { immediate: true }
)

const cssSize = computed(() => toCssSize(props.size))
const cssColor = computed(() => toCssColor(props.color))

const mergedStyle = computed(() => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: cssSize.value,
  height: cssSize.value,
  flexShrink: 0,
  color: cssColor.value ?? 'inherit',
}))

const svgHtml = computed(() => prepareSvg(markup.value, props.strokeWidth))

const classes = computed(() =>
  ['sg-ds-library-icon', attrs.class].filter(Boolean).join(' ')
)
</script>

<template>
  <span
    v-if="props.source && markup"
    aria-hidden="true"
    v-bind="{ ...$attrs, class: undefined }"
    :class="classes"
    :style="mergedStyle"
    v-html="svgHtml"
  />
</template>
