<script setup>
import { computed, useAttrs } from 'vue'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const props = defineProps({
  title: { type: String, default: 'Filter by' },
  body: { type: String, default: 'Choose which items to include in the results.' },
})

const classes = computed(() =>
  ['sg-ds-library-scope', 'popover-content', attrs.class].filter(Boolean).join(' ')
)
</script>

<template>
  <div
    v-bind="{ ...($attrs), class: undefined }"
    :class="classes"
  >
    <slot>
      <h4 v-if="props.title">{{ props.title }}</h4>
      <p v-if="props.body">{{ props.body }}</p>
    </slot>
  </div>
</template>
