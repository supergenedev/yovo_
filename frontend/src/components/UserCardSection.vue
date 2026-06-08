<script setup>
const props = defineProps({
  tint: { default: 'default' },
})
</script>

<template>
  <section
    class="sg-ds-library-scope user-card-section"
    :data-tint="props.tint !== 'default' ? props.tint : undefined"
    v-bind="$attrs"
  >
    <slot />
  </section>
</template>
