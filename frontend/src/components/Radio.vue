<script setup>
import { computed, useAttrs } from 'vue'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const props = defineProps({
  inputClassName: { default: '' },
  label: { default: 'Option' },
  size: { default: 'md' },
  disabled: { default: undefined },
  value: { default: undefined },
  checked: { default: undefined },
  name: { default: undefined },
})

const classes = computed(() =>
  ['sg-ds-library-scope', 'radio-label', attrs.class].filter(Boolean).join(' ')
)

const inputClasses = computed(() =>
  ['radio', 'radio-input', props.inputClassName].filter(Boolean).join(' ')
)
</script>

<template>
  <label
    v-bind="{ ...$attrs, class: undefined }"
    :class="classes"
    :data-size="props.size"
    :data-disabled="props.disabled || undefined"
  >
    <input
      type="radio"
      :class="inputClasses"
      :data-size="props.size"
      :disabled="props.disabled"
      :aria-disabled="props.disabled || undefined"
      :value="props.value"
      :checked="props.checked"
      :name="props.name"
    />
    <span class="radio-control" :data-size="props.size" aria-hidden="true">
      <span class="radio-dot" />
    </span>
    <span class="radio-label-text">
      <slot>{{ props.label }}</slot>
    </span>
  </label>
</template>
