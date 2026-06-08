<script setup>
import { computed, useAttrs } from 'vue'
import Chip from './Chip.vue'

const attrs = useAttrs()

const props = defineProps({
  rank: { default: undefined },
  eyebrow: { default: undefined },
  title: { default: 'Topic title' },
  sub: { default: undefined },
  delta: { default: undefined },
  deltaTone: { default: 'neutral' },
  divider: { default: true },
})

const classes = computed(() =>
  ['sg-ds-library-scope', 'topic-row', attrs.class].filter(Boolean).join(' ')
)

const isPrimitiveDelta = computed(() =>
  typeof props.delta === 'string' || typeof props.delta === 'number'
)

const hasDelta = computed(() =>
  props.delta != null && props.delta !== ''
)

const hasRank = computed(() =>
  props.rank != null && props.rank !== ''
)
</script>

<template>
  <div
    v-bind="{ ...$attrs, class: undefined }"
    :class="classes"
    :data-divider="props.divider ? 'true' : 'false'"
    :data-has-rank="hasRank ? 'true' : undefined"
  >
    <span v-if="hasRank" class="topic-row-rank">{{ props.rank }}</span>
    <div class="topic-row-body">
      <span v-if="props.eyebrow" class="topic-row-eyebrow">{{ props.eyebrow }}</span>
      <span class="topic-row-title">{{ props.title }}</span>
      <span v-if="props.sub" class="topic-row-sub">{{ props.sub }}</span>
    </div>
    <span v-if="hasDelta" class="topic-row-delta" :data-tone="props.deltaTone">
      <Chip
        v-if="isPrimitiveDelta"
        class="topic-row-delta-chip"
        size="sm"
        :tone="props.deltaTone === 'brand' ? 'brand' : 'neutral'"
      >{{ props.delta }}</Chip>
      <template v-else>{{ props.delta }}</template>
    </span>
  </div>
</template>
