<script setup>
const props = defineProps({ href: { default: '#' } })
</script>
<template>
  <a class="sg-ds-library-scope breadcrumb-link" :href="props.href" v-bind="$attrs"><slot>Link</slot></a>
</template>
