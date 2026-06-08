<script setup>
const props = defineProps({
  align: { default: 'start' },
})
</script>

<template>
  <div
    class="sg-ds-library-scope section-title-group"
    :data-align="props.align === 'end' ? 'end' : undefined"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
