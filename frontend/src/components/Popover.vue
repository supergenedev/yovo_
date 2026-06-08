<script setup>
import { computed, useAttrs } from 'vue'
import PopoverList from './PopoverList.vue'
import PopoverItem from './PopoverItem.vue'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const props = defineProps({
  arrow: { type: Boolean, default: false },
  open: { type: Boolean, default: true },
  placement: { type: String, default: 'bottom-start' },
  popover: { type: String, default: 'auto' },
})

const previewStyle = computed(() => {
  if (props.open) {
    return { display: 'block', opacity: 1, position: 'relative', transform: 'none' }
  }
  return {}
})

const classes = computed(() =>
  ['sg-ds-library-scope', 'popover', attrs.class].filter(Boolean).join(' ')
)
</script>

<template>
  <div
    v-bind="{ ...($attrs), class: undefined }"
    :class="classes"
    :data-placement="props.placement"
    :popover="props.popover"
    :style="{ ...previewStyle, ...($attrs.style || {}) }"
  >
    <slot>
      <PopoverList>
        <PopoverItem icon="user" meta="⇧P">Profile</PopoverItem>
        <PopoverItem icon="settings">Settings</PopoverItem>
        <PopoverItem icon="log-out" tone="danger">Sign out</PopoverItem>
      </PopoverList>
    </slot>
    <span v-if="props.arrow" class="popover-arrow" aria-hidden="true" />
  </div>
</template>
