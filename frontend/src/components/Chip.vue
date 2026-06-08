<script setup>
import { computed, useAttrs } from 'vue'
import Icon from './Icon.vue'

const attrs = useAttrs()

const props = defineProps({
  as: {
    default: 'span',
  },
  icon: {
    default: undefined,
  },
  size: {
    default: 'md',
  },
  tone: {
    default: 'neutral',
  },
  variant: {
    default: 'default',
  },
  pressed: {
    default: undefined,
  },
  removable: {
    default: false,
  },
  onRemove: {
    default: undefined,
  },
  removeLabel: {
    default: '제거',
  },
})

const classes = computed(() =>
  ['sg-ds-library-scope', 'chip', attrs.class].filter(Boolean).join(' ')
)
</script>

<template>
  <button
    v-if="props.as === 'button'"
    v-bind="{ ...$attrs, class: undefined }"
    type="button"
    :class="classes"
    :aria-pressed="props.pressed"
    :data-size="props.size"
    :data-tone="props.tone !== 'neutral' ? props.tone : undefined"
    :data-variant="props.variant !== 'default' ? props.variant : undefined"
  >
    <span v-if="props.icon || $slots.icon" class="chip-icon" aria-hidden="true">
      <slot name="icon">
        <Icon :name="props.icon" size="1em" />
      </slot>
    </span>
    <span class="chip-label"><slot>Tag</slot></span>
  </button>

  <span
    v-else
    v-bind="{ ...$attrs, class: undefined }"
    :class="classes"
    :data-removable="props.removable || undefined"
    :data-size="props.size"
    :data-tone="props.tone !== 'neutral' ? props.tone : undefined"
    :data-variant="props.variant !== 'default' ? props.variant : undefined"
  >
    <span v-if="props.icon || $slots.icon" class="chip-icon" aria-hidden="true">
      <slot name="icon">
        <Icon :name="props.icon" size="1em" />
      </slot>
    </span>
    <span class="chip-label"><slot>Tag</slot></span>
    <button
      v-if="props.removable"
      type="button"
      class="chip-remove"
      :aria-label="props.removeLabel"
      @click="props.onRemove"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  </span>
</template>
