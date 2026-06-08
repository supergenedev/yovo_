<script setup>
import { computed, useAttrs } from 'vue'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const classes = computed(() =>
  ['sg-ds-library-scope', 'tabs-bar', attrs.class].filter(Boolean).join(' ')
)
</script>

<template>
  <div
    v-bind="{ ...$attrs, class: undefined }"
    :class="classes"
  >
    <slot />
  </div>
</template>
