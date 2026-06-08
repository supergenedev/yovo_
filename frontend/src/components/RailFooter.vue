<script setup>
import { computed, useAttrs } from 'vue'
import Button from './Button.vue'

const attrs = useAttrs()

const props = defineProps({
  primaryLabel: { default: 'Dark mode' },
  primaryIcon: { default: 'moon' },
  secondaryLabel: { default: '' },
  secondaryIcon: { default: 'settings' },
})

const classes = computed(() =>
  ['sg-ds-library-scope', 'rail-footer', attrs.class].filter(Boolean).join(' ')
)
</script>

<template>
  <div v-bind="{ ...$attrs, class: undefined }" :class="classes">
    <template v-if="$slots.default">
      <slot />
    </template>
    <template v-else>
      <Button
        :leading-icon="props.primaryIcon"
        size="sm"
        variant="ghost"
      >
        {{ props.primaryLabel }}
      </Button>
      <Button
        v-if="props.secondaryLabel"
        :leading-icon="props.secondaryIcon"
        size="sm"
        variant="ghost"
      >
        {{ props.secondaryLabel }}
      </Button>
    </template>
  </div>
</template>
