<script setup>
import { computed, useAttrs, useSlots } from 'vue'
import Icon from './Icon.vue'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
const slots = useSlots()

const props = defineProps({
  badge: {},
  badgeText: {},
  badgeVariant: {},
  controls: {},
  label: {},
  leadingIcon: {},
  trailingIcon: {},
  selected: {},
})

const classes = computed(() =>
  ['sg-ds-library-scope', 'tab', attrs.class].filter(Boolean).join(' ')
)

const showBadge = computed(() =>
  props.badge && String(props.badgeText ?? '').length > 0
)

const hasLeadingIcon = computed(() =>
  !!slots['leading-icon'] || !!props.leadingIcon
)

const hasTrailingIcon = computed(() =>
  !!slots['trailing-icon'] || !!props.trailingIcon
)
</script>

<template>
  <button
    v-bind="{ ...$attrs, class: undefined }"
    :aria-controls="props.controls"
    :aria-selected="props.selected"
    :class="classes"
    role="tab"
    :tabindex="props.selected ? 0 : -1"
    type="button"
  >
    <span v-if="hasLeadingIcon" class="tab-icon" aria-hidden="true">
      <slot name="leading-icon">
        <Icon :name="props.leadingIcon" size="1em" />
      </slot>
    </span>
    <span class="tab-label">
      <slot>{{ props.label ?? 'Tab' }}</slot>
    </span>
    <span v-if="showBadge" class="tab-badge" :data-status="props.badgeVariant" aria-hidden="true">{{ props.badgeText }}</span>
    <span v-if="hasTrailingIcon" class="tab-icon" aria-hidden="true">
      <slot name="trailing-icon">
        <Icon :name="props.trailingIcon" size="1em" />
      </slot>
    </span>
  </button>
</template>
