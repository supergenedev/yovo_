<script setup>
import { computed, useAttrs, useSlots } from 'vue'
import Icon from './Icon.vue'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
const slots = useSlots()

const props = defineProps({
  as: { type: String, default: undefined },
  current: { type: Boolean, default: false },
  icon: { type: String, default: undefined },
  label: { type: String, default: 'Navigation item' },
  selected: { type: Boolean, default: false },
  size: { type: String, default: 'md' },
  variant: { type: String, default: 'default' },
})

const classes = computed(() =>
  ['sg-ds-library-scope', 'nav-item', attrs.class].filter(Boolean).join(' ')
)

// Merge $attrs (minus class) with shared data/aria attributes into one object
const mergedAttrs = computed(() => {
  const { class: _class, ...rest } = attrs
  return {
    ...rest,
    'aria-current': props.current ? 'page' : undefined,
    'aria-selected': props.selected ? true : undefined,
    'data-size': props.size,
    'data-selected': props.selected ? 'true' : undefined,
    'data-variant': props.variant !== 'default' ? props.variant : undefined,
  }
})

const buttonAttrs = computed(() => ({
  ...mergedAttrs.value,
  type: mergedAttrs.value.type ?? 'button',
}))

const hasIcon = computed(() => !!(slots.icon || props.icon))

const isButton = computed(() =>
  props.as === 'button' || (props.as === undefined && !attrs.href)
)

function handleAnchorClick(event) {
  const href = attrs.href
  if (!href || href === '#') event.preventDefault()
}
</script>

<template>
  <button
    v-if="isButton"
    v-bind="buttonAttrs"
    :class="classes"
  >
    <span v-if="hasIcon" class="nav-item-icon" aria-hidden="true">
      <slot name="icon">
        <Icon :name="props.icon" size="1em" />
      </slot>
    </span>
    <span class="nav-item-label">
      <slot>{{ props.label }}</slot>
    </span>
    <span v-if="$slots.tail" class="nav-item-tail">
      <slot name="tail" />
    </span>
  </button>

  <a
    v-else
    v-bind="mergedAttrs"
    :class="classes"
    @click="handleAnchorClick"
  >
    <span v-if="hasIcon" class="nav-item-icon" aria-hidden="true">
      <slot name="icon">
        <Icon :name="props.icon" size="1em" />
      </slot>
    </span>
    <span class="nav-item-label">
      <slot>{{ props.label }}</slot>
    </span>
    <span v-if="$slots.tail" class="nav-item-tail">
      <slot name="tail" />
    </span>
  </a>
</template>
