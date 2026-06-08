<script setup>
import { computed, useAttrs } from 'vue'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const props = defineProps({
  options: {
    default: () => [
      { label: 'Free', value: 'free' },
      { label: 'Creator', value: 'creator' },
      { label: 'Studio', value: 'studio' },
    ],
  },
  placeholder: { default: 'Choose an option' },
  size: { default: 'md' },
  state: { default: 'default' },
  disabled: { default: undefined },
  value: { default: undefined },
  defaultValue: { default: '' },
})

const wrapperClasses = computed(() =>
  ['sg-ds-library-scope', 'select-wrapper', attrs.class].filter(Boolean).join(' ')
)
</script>

<template>
  <div
    v-bind="{ ...$attrs, class: undefined }"
    :class="wrapperClasses"
    :data-size="props.size"
  >
    <select
      class="select"
      :data-size="props.size"
      :data-state="props.state !== 'default' ? props.state : undefined"
      :disabled="props.disabled"
      :aria-disabled="props.disabled || undefined"
      :value="props.value"
      :default-value="props.value === undefined ? props.defaultValue : undefined"
    >
      <option v-if="props.placeholder" value="" disabled>{{ props.placeholder }}</option>
      <slot>
        <option
          v-for="option in props.options"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
        >{{ option.label }}</option>
      </slot>
    </select>
  </div>
</template>
