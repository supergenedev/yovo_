<script setup>
import { computed, useAttrs } from 'vue'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const props = defineProps({
  inputClassName: { type: String, default: '' },
  label: { type: String, default: 'Enable notifications' },
  size: { type: String, default: 'md' },
  disabled: { type: Boolean, default: undefined },
})

const labelClasses = computed(() =>
  ['sg-ds-library-scope', 'switch-label', attrs.class].filter(Boolean).join(' ')
)

const inputClasses = computed(() =>
  ['switch', 'switch-input', props.inputClassName].filter(Boolean).join(' ')
)
</script>

<template>
  <label
    v-bind="{ ...($attrs), class: undefined }"
    :class="labelClasses"
    :data-size="props.size"
    :data-disabled="props.disabled || undefined"
  >
    <input
      type="checkbox"
      role="switch"
      :class="inputClasses"
      :data-size="props.size"
      :disabled="props.disabled"
      :aria-disabled="props.disabled || undefined"
    />
    <span class="switch-track" :data-size="props.size" aria-hidden="true">
      <span class="switch-thumb" />
    </span>
    <span class="switch-label-text">{{ props.label }}</span>
  </label>
</template>
