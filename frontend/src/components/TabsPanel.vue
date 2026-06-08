<script setup>
import { computed, useAttrs } from 'vue'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const props = defineProps({
  labelledBy: {},
  selected: {},
})

const classes = computed(() =>
  ['sg-ds-library-scope', 'tab-panel', attrs.class].filter(Boolean).join(' ')
)
</script>

<template>
  <div
    v-bind="{ ...$attrs, class: undefined }"
    :aria-labelledby="props.labelledBy"
    :class="classes"
    :hidden="!props.selected || undefined"
    role="tabpanel"
  >
    <slot>Panel content</slot>
  </div>
</template>
