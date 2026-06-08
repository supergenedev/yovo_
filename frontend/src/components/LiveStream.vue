<script setup>
import { computed, useAttrs } from 'vue'
import Icon from './Icon.vue'

const attrs = useAttrs()

const props = defineProps({
  label: { default: 'LIVE' },
  viewerCount: { default: '4,218 watching' },
  viewerIcon: { default: 'eye' },
})

const classes = computed(() => ['sg-ds-library-scope', attrs.class].filter(Boolean).join(' '))

const rootStyle = computed(() => {
  const attrsStyle = attrs.style || {}
  return { display: 'inline-flex', gap: '8px', ...attrsStyle }
})
</script>

<template>
  <span v-bind="{ ...$attrs, class: undefined, style: undefined }" :class="classes" :style="rootStyle">
    <span :class="['sg-ds-library-scope', 'live-stream-badge']">
      <slot>{{ props.label }}</slot>
    </span>
    <span :class="['sg-ds-library-scope', 'live-stream-viewer-count']">
      <Icon :name="props.viewerIcon" size="1em" />
      {{ props.viewerCount }}
    </span>
  </span>
</template>
