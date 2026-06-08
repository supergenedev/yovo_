<script setup>
import { computed, useAttrs } from 'vue'
import Stat from './Stat.vue'

const attrs = useAttrs()

const props = defineProps({
  brandStat: { default: false },
  items: { default: null },
  size: { default: 'md' },
})

const DEFAULT_ITEMS = [
  { value: '124K', label: 'plays' },
  { value: '18.4K', label: 'likes' },
  { value: '1,248', label: 'comments' },
]

const renderedItems = computed(() => {
  if (props.items !== null && props.items !== undefined) {
    return props.items
  }
  return [
    ...DEFAULT_ITEMS,
    ...(props.brandStat
      ? [{ value: '1,840', label: 'supporters', tone: 'brand', icon: 'gem', spacerBefore: true }]
      : []),
  ]
})

const classes = computed(() =>
  ['sg-ds-library-scope', 'stat-list', attrs.class].filter(Boolean).join(' ')
)
</script>

<template>
  <ul
    v-bind="{ ...$attrs, class: undefined }"
    :class="classes"
    :data-size="props.size === 'sm' ? 'sm' : undefined"
    data-separators="explicit"
    :role="$attrs.role ?? 'list'"
  >
    <template v-if="$slots.default">
      <slot />
    </template>
    <template v-else>
      <template v-for="(item, index) in renderedItems" :key="index">
        <li v-if="index > 0 && item.spacerBefore" class="spacer" />
        <li v-if="index > 0" aria-hidden="true" class="stat-separator">·</li>
        <Stat
          :icon="item.icon"
          :label="item.label"
          :tone="item.tone"
          :value="item.value"
        />
      </template>
    </template>
  </ul>
</template>
