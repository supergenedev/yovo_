<script>
export default { inheritAttrs: false }
</script>

<script setup>
import { computed, useAttrs } from 'vue'

const attrs = useAttrs()

const props = defineProps({
  align: { default: undefined },
  as: { default: 'span' },
  lineHeight: { default: undefined },
  tone: { default: 'primary' },
  transform: { default: 'none' },
  truncate: { default: false },
  truncateLines: { default: 1 },
  variant: { default: 'body' },
  weight: { default: undefined },
})

function normalizeSgDsLibraryTextLineHeight(value) {
  if (typeof value === 'number') return Number.isFinite(value) ? value : undefined
  if (typeof value !== 'string') return undefined
  const trimmedValue = value.trim()
  return trimmedValue ? trimmedValue : undefined
}

function normalizeSgDsLibraryTextTruncateLines(value) {
  const numericValue = typeof value === 'number'
    ? value
    : typeof value === 'string' && value.trim()
      ? Number(value)
      : undefined
  if (numericValue === undefined || !Number.isFinite(numericValue)) return undefined
  const lineCount = Math.floor(numericValue)
  return lineCount > 1 ? lineCount : undefined
}

const classes = computed(() =>
  ['sg-ds-library-scope', 'text', attrs.class].filter(Boolean).join(' ')
)

const resolvedLineHeight = computed(() =>
  normalizeSgDsLibraryTextLineHeight(props.lineHeight)
)

const resolvedTruncateLines = computed(() =>
  normalizeSgDsLibraryTextTruncateLines(props.truncateLines)
)

const resolvedStyle = computed(() => {
  const base = typeof attrs.style === 'object' && attrs.style !== null ? { ...attrs.style } : {}
  if (resolvedLineHeight.value !== undefined) base.lineHeight = resolvedLineHeight.value
  if (props.truncate && resolvedTruncateLines.value !== undefined) {
    base['--c-text-truncate-lines'] = resolvedTruncateLines.value
  }
  return base
})

const rootAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs
  return {
    ...rest,
    'data-align': props.align,
    'data-tone': props.tone !== 'inherit' ? props.tone : undefined,
    'data-transform': props.transform !== 'none' ? props.transform : undefined,
    'data-truncate': props.truncate || undefined,
    'data-truncate-lines': props.truncate && resolvedTruncateLines.value !== undefined ? resolvedTruncateLines.value : undefined,
    'data-variant': props.variant !== 'inherit' ? props.variant : undefined,
    'data-weight': props.weight && props.weight !== 'inherit' ? props.weight : undefined,
  }
})
</script>

<template>
  <component
    :is="props.as"
    v-bind="rootAttrs"
    :class="classes"
    :style="resolvedStyle"
  >
    <slot>Text</slot>
  </component>
</template>
