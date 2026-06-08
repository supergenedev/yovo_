<script setup>
import { ref, watch, computed, useAttrs } from 'vue'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const props = defineProps({
  disabled: {
    default: undefined,
  },
  indeterminate: {
    default: false,
  },
  inputClassName: {
    default: '',
  },
  label: {
    default: 'Remember me',
  },
  size: {
    default: 'md',
  },
})

const labelClasses = computed(() =>
  ['sg-ds-library-scope', 'checkbox-label', attrs.class].filter(Boolean).join(' ')
)

const inputClasses = computed(() =>
  ['checkbox', props.inputClassName].filter(Boolean).join(' ')
)

const inputRef = ref(null)

watch(
  () => props.indeterminate,
  (val) => {
    if (inputRef.value) inputRef.value.indeterminate = val
  },
  { immediate: true }
)
</script>

<template>
  <label
    v-bind="{ ...$attrs, class: undefined }"
    :class="labelClasses"
    :data-size="props.size"
    :data-disabled="props.disabled || undefined"
  >
    <input
      ref="inputRef"
      type="checkbox"
      :class="inputClasses"
      :data-size="props.size"
      :data-indeterminate="props.indeterminate || undefined"
      :disabled="props.disabled"
      :aria-disabled="props.disabled || undefined"
      :aria-checked="props.indeterminate ? 'mixed' : undefined"
    />
    <span class="checkbox-label-text">{{ props.label }}</span>
  </label>
</template>
