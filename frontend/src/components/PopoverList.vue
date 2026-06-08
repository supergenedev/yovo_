<script setup>
import { computed, useAttrs } from 'vue'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const classes = computed(() =>
  ['sg-ds-library-scope', 'popover-list', attrs.class].filter(Boolean).join(' ')
)
</script>

<template>
  <ul
    v-bind="{ ...($attrs), class: undefined }"
    :class="classes"
    :role="$attrs.role ?? 'menu'"
  >
    <slot />
  </ul>
</template>
