<script setup>
import { computed, useAttrs } from 'vue'
import Icon from './Icon.vue'

const attrs = useAttrs()

const props = defineProps({
  count: { default: 4 },
  label: { default: null },
  type: { default: 'button' },
})

const classes = computed(() =>
  ['sg-ds-library-scope', 'post-stack-new-pill', attrs.class].filter(Boolean).join(' ')
)
</script>

<template>
  <button v-bind="{ ...$attrs, class: undefined }" :class="classes" :type="props.type">
    <Icon name="arrow-up" size="var(--c-post-stack-new-pill-icon-size)" />
    {{ props.label ?? `${props.count} new posts` }}
  </button>
</template>
