<script setup>
import Text from './Text.vue'

const props = defineProps({
  label: { default: 'Label' },
  value: { default: '0' },
  delta: { default: undefined },
  deltaTone: { default: 'positive' },
})
</script>

<template>
  <li class="sg-ds-library-scope credit-balance-card-row" v-bind="$attrs">
    <Text as="span" tone="secondary" variant="ui-sm">{{ props.label }}</Text>
    <span>
      <Text as="strong" variant="ui" weight="semibold">{{ props.value }}</Text>
      <span v-if="props.delta" class="credit-balance-card-delta" :data-tone="props.deltaTone">{{ props.delta }}</span>
    </span>
  </li>
</template>
