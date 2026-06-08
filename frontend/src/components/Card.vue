<script setup>
import { computed, useAttrs } from 'vue'
import Text from './Text.vue'

const attrs = useAttrs()

const props = defineProps({
  variant: { default: 'solid' },
  padding: { default: 'md' },
  gap: { default: undefined },
  interactive: { default: false },
  title: { default: undefined },
  subtitle: { default: undefined },
})

const CARD_GAP_VALUES = {
  none: '0px',
  xs: 'var(--s-space-stack-xs)',
  sm: 'var(--s-space-stack-sm)',
  md: 'var(--s-space-stack-md)',
  lg: 'var(--s-space-stack-lg)',
}

function resolveCardGap(gap) {
  if (!gap) return undefined
  return CARD_GAP_VALUES[gap] ?? gap
}

const resolvedGap = computed(() => resolveCardGap(props.gap))

const cardStyle = computed(() => {
  const base = attrs.style || {}
  if (resolvedGap.value) {
    return { ...base, '--c-card-gap': resolvedGap.value, gap: resolvedGap.value }
  }
  return base
})

const classes = computed(() =>
  ['sg-ds-library-scope', 'card', attrs.class].filter(Boolean).join(' ')
)

const dataGap = computed(() =>
  CARD_GAP_VALUES[props.gap] ? props.gap : undefined
)

const dataInteractive = computed(() =>
  props.interactive || undefined
)
</script>

<template>
  <article
    v-bind="{ ...$attrs, class: undefined, style: undefined }"
    :class="classes"
    :style="cardStyle"
    :data-gap="dataGap"
    :data-variant="props.variant"
    :data-padding="props.padding"
    :data-interactive="dataInteractive"
  >
    <div v-if="$slots.media" class="card-media">
      <slot name="media" />
    </div>
    <header v-if="props.title || props.subtitle" class="card-header">
      <Text v-if="props.title" as="h3" class="card-title" variant="heading-3">{{ props.title }}</Text>
      <Text v-if="props.subtitle" as="p" class="card-subtitle" tone="secondary" variant="body">{{ props.subtitle }}</Text>
    </header>
    <div v-if="$slots.default" class="card-body">
      <slot />
    </div>
    <footer v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </footer>
  </article>
</template>
