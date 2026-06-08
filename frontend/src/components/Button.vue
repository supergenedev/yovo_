<script setup>
import { computed, useAttrs } from 'vue'
import Icon from './Icon.vue'

const attrs = useAttrs()

const props = defineProps({
  label: { default: '버튼' },
  variant: { default: 'primary' },
  size: { default: 'md' },
  shape: { default: 'default' },
  leadingIcon: { default: undefined },
  trailingIcon: { default: undefined },
  iconOnly: { default: false },
  loading: { default: false },
  badge: { default: false },
  badgeText: { default: '' },
  badgeVariant: { default: 'danger' },
  type: { default: 'button' },
  disabled: { default: false },
})

const classes = computed(() =>
  ['sg-ds-library-scope', 'btn', attrs.class].filter(Boolean).join(' ')
)

const showBadge = computed(() =>
  props.badge && String(props.badgeText).length > 0
)
</script>

<template>
  <button
    v-bind="{ ...($attrs), class: undefined }"
    :class="classes"
    :type="props.type"
    :data-variant="props.variant"
    :data-size="props.size"
    :data-shape="props.shape === 'pill' ? 'pill' : undefined"
    :data-loading="props.loading || undefined"
    :data-icon-only="props.iconOnly || undefined"
    :disabled="props.disabled"
    :aria-disabled="props.disabled || undefined"
    :aria-busy="props.loading || undefined"
  >
    <span v-if="props.loading" class="btn-spinner" aria-hidden="true" />

    <span v-if="$slots.leadingIcon || props.leadingIcon" class="btn-icon" aria-hidden="true">
      <slot name="leadingIcon">
        <Icon :name="props.leadingIcon" size="1em" />
      </slot>
    </span>

    <span v-if="!props.iconOnly" class="btn-label">
      <slot>{{ props.label }}</slot>
    </span>

    <span
      v-if="showBadge && !props.iconOnly"
      class="btn-badge"
      :data-status="props.badgeVariant"
      aria-hidden="true"
    >{{ props.badgeText }}</span>

    <span v-if="($slots.trailingIcon || props.trailingIcon) && !props.iconOnly" class="btn-icon" aria-hidden="true">
      <slot name="trailingIcon">
        <Icon :name="props.trailingIcon" size="1em" />
      </slot>
    </span>
  </button>
</template>
