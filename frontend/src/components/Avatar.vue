<script setup>
import { computed, useAttrs } from 'vue'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const props = defineProps({
  src: { type: String, default: undefined },
  alt: { type: String, default: '' },
  initials: { type: String, default: undefined },
  size: { type: String, default: 'md' },
  shape: { type: String, default: 'circle' },
  tone: { type: String, default: 'neutral' },
  status: { type: String, default: undefined },
  statusLabel: { type: String, default: undefined },
  quietStatus: { type: Boolean, default: false },
})

const classes = computed(() =>
  ['sg-ds-library-scope', 'avatar', attrs.class].filter(Boolean).join(' ')
)
</script>

<template>
  <span
    v-bind="{ ...attrs, class: undefined }"
    :class="classes"
    :data-size="props.size"
    :data-shape="props.shape !== 'circle' ? props.shape : undefined"
    :data-tone="props.tone !== 'neutral' ? props.tone : undefined"
  >
    <img v-if="props.src" class="avatar-image" :src="props.src" :alt="props.alt" />
    <span class="avatar-fallback" aria-hidden="true">
      <slot name="icon">{{ props.initials ?? '?' }}</slot>
    </span>
    <span
      v-if="props.status"
      class="avatar-status"
      :data-status="props.status"
      :data-quiet="props.status === 'live' && props.quietStatus ? 'true' : undefined"
      :aria-label="props.statusLabel ?? props.status"
    />
  </span>
</template>
