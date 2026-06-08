<script setup>
import { computed, useAttrs } from 'vue'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const props = defineProps({
  align: { type: String, default: 'start' },
  size: { type: String, default: 'md' },
  variant: { type: String, default: 'default' },
  wrap: { type: Boolean, default: false },
})

const classes = computed(() =>
  ['sg-ds-library-scope', 'toolbar', attrs.class].filter(Boolean).join(' ')
)
</script>

<template>
  <div
    v-bind="{ ...($attrs), class: undefined }"
    :class="classes"
    :data-align="props.align !== 'start' ? props.align : undefined"
    :data-size="props.size"
    :data-variant="props.variant === 'divided' ? 'divided' : undefined"
    :data-wrap="props.wrap ? 'true' : undefined"
  >
    <template v-if="$slots.start || $slots.end">
      <div v-if="$slots.start" class="toolbar-start">
        <slot name="start" />
      </div>
      <div v-if="$slots.end" class="toolbar-end">
        <slot name="end" />
      </div>
    </template>
    <slot v-else />
  </div>
</template>
