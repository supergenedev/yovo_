<script setup>
import { computed, useAttrs } from 'vue'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const props = defineProps({
  placement: { type: String, default: 'top' },
  arrow: { type: Boolean, default: true },
  tipId: { type: String, default: undefined },
})

let idCounter = 0
const autoId = `tip-${++idCounter}-${Math.random().toString(36).slice(2, 7)}`
const resolvedId = computed(() => props.tipId ?? autoId)

const classes = computed(() =>
  ['sg-ds-library-scope', 'tooltip-wrapper', attrs.class].filter(Boolean).join(' ')
)
</script>

<template>
  <span v-bind="{ ...($attrs), class: undefined }" :class="classes">
    <span class="tooltip-trigger" :tabindex="0" :aria-describedby="resolvedId">
      <slot name="trigger" />
    </span>
    <span class="tooltip" :id="resolvedId" role="tooltip" :data-placement="props.placement">
      <slot name="tip" />
      <span v-if="props.arrow" class="tooltip-arrow" aria-hidden="true" />
    </span>
  </span>
</template>
