<script setup>
import { computed, useAttrs } from 'vue'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const props = defineProps({
  rows: {
    default: 4,
  },
  size: {
    default: 'md',
  },
  state: {
    default: 'default',
  },
  disabled: {
    default: undefined,
  },
  readOnly: {
    default: undefined,
  },
})

const classes = computed(() =>
  ['sg-ds-library-scope', 'textarea', attrs.class].filter(Boolean).join(' ')
)

function normalizeRows(value) {
  const parsed = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(parsed) && parsed > 0 ? Math.round(parsed) : 4
}
</script>

<template>
  <textarea
    v-bind="{ ...attrs, class: undefined }"
    :class="classes"
    :data-size="props.size"
    :data-state="props.state !== 'default' ? props.state : undefined"
    :disabled="props.disabled"
    :aria-disabled="props.disabled || undefined"
    :readonly="props.readOnly"
    :rows="normalizeRows(props.rows)"
  />
</template>
