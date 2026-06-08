<script setup>
import { computed, useAttrs, useSlots } from 'vue'
import Icon from './Icon.vue'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
const slots = useSlots()

const props = defineProps({
  icon: { type: String, default: undefined },
  meta: { type: String, default: undefined },
  tone: { type: String, default: 'default' },
  type: { type: String, default: 'button' },
})

const classes = computed(() =>
  ['sg-ds-library-scope', 'popover-item', attrs.class].filter(Boolean).join(' ')
)

const hasIcon = computed(() => slots.icon || props.icon)
</script>

<template>
  <li role="none">
    <button
      v-bind="{ ...($attrs), class: undefined }"
      :class="classes"
      :data-tone="props.tone === 'danger' ? 'danger' : undefined"
      :role="$attrs.role ?? 'menuitem'"
      :type="props.type"
    >
      <span v-if="hasIcon" class="popover-item-icon" aria-hidden="true">
        <slot name="icon">
          <Icon :name="props.icon" size="1em" />
        </slot>
      </span>
      <span><slot>Menu item</slot></span>
      <span v-if="props.meta || $slots.meta" class="popover-item-meta">
        <slot name="meta">{{ props.meta }}</slot>
      </span>
    </button>
  </li>
</template>
