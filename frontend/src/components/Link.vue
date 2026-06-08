<script setup>
import { computed, useAttrs } from 'vue'
import Icon from './Icon.vue'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
const props = defineProps({
  variant: { type: String, default: 'default' },
  size: { type: String, default: undefined },
  tailIcon: { type: String, default: undefined },
  external: { type: Boolean, default: false },
  href: { type: String, default: '#' },
  rel: { type: String, default: undefined },
  target: { type: String, default: undefined },
})

const classes = computed(() =>
  ['sg-ds-library-scope', 'link', attrs.class].filter(Boolean).join(' ')
)

const externalAttrs = computed(() => {
  if (props.external) {
    return {
      target: props.target ?? '_blank',
      rel: props.rel ?? 'noopener noreferrer',
    }
  }
  return {
    target: props.target,
    rel: props.rel,
  }
})

const hasTailIcon = computed(() => {
  return !!(props.tailIcon || props.external)
})
</script>

<template>
  <a
    v-bind="{ ...($attrs), class: undefined, ...externalAttrs }"
    :class="classes"
    :href="props.href"
    :data-variant="props.variant !== 'default' ? props.variant : undefined"
    :data-size="props.size"
    :data-tail-icon="($slots['tail-icon'] || hasTailIcon) ? true : undefined"
  >
    <slot>Link</slot>
    <span v-if="$slots['tail-icon']" class="link-tail-icon" aria-hidden="true">
      <slot name="tail-icon" />
    </span>
    <span v-else-if="props.tailIcon" class="link-tail-icon" aria-hidden="true">
      <Icon :name="props.tailIcon" size="1em" />
    </span>
    <span v-else-if="props.external" class="link-tail-icon" aria-hidden="true">
      <Icon name="external-link" size="1em" />
    </span>
  </a>
</template>
