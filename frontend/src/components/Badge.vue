<script setup>
import { computed, useAttrs } from 'vue'
import Icon from './Icon.vue'

const attrs = useAttrs()

const props = defineProps({
  status: { default: 'neutral' },
  variant: { default: 'subtle' },
  size: { default: 'md' },
  shape: { default: 'default' },
  icon: { default: undefined },
})

const classes = computed(() =>
  ['sg-ds-library-scope', 'badge', attrs.class].filter(Boolean).join(' ')
)
</script>

<template>
  <span
    v-bind="{ ...$attrs, class: undefined }"
    :class="classes"
    :data-status="props.status"
    :data-variant="props.variant"
    :data-size="props.size"
    :data-shape="props.shape !== 'default' ? props.shape : undefined"
  >
    <span v-if="$slots.icon || props.icon" class="badge-icon" aria-hidden="true">
      <slot name="icon">
        <Icon v-if="props.icon" :name="props.icon" size="1em" />
      </slot>
    </span>
    <slot>Badge</slot>
  </span>
</template>
