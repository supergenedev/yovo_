<script setup>
import { computed, useAttrs } from 'vue'
import Icon from './Icon.vue'
import Text from './Text.vue'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const props = defineProps({
  icon: { type: String, default: undefined },
  label: { type: String, default: 'plays' },
  tone: { type: String, default: 'default' },
  value: { type: [String, Number], default: '124K' },
})

const classes = computed(() =>
  ['sg-ds-library-scope', 'stat', attrs.class].filter(Boolean).join(' ')
)
</script>

<template>
  <li
    v-bind="{ ...$attrs, class: undefined }"
    :class="classes"
    :data-tone="props.tone === 'brand' ? 'brand' : undefined"
  >
    <Icon v-if="props.icon" :name="props.icon" size="1em" />
    <Text as="strong" tone="inherit" variant="ui" weight="semibold">{{ props.value }}</Text>
    <Text as="span" tone="inherit" variant="ui-sm">{{ props.label }}</Text>
  </li>
</template>
