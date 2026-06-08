<script setup>
const props = defineProps({ align: { default: 'start' } })
</script>
<template>
  <div class="sg-ds-library-scope toolbar-group" :data-align="props.align === 'end' ? 'end' : undefined" v-bind="$attrs"><slot /></div>
</template>
