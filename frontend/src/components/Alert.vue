<script setup>
import { computed, useAttrs, useSlots } from 'vue'
import Icon from './Icon.vue'
import Button from './Button.vue'
import Text from './Text.vue'

const attrs = useAttrs()
const slots = useSlots()

const props = defineProps({
  action1Label: { type: String, default: undefined },
  action1Variant: { type: String, default: undefined },
  action2Label: { type: String, default: undefined },
  action2Variant: { type: String, default: undefined },
  actionPlacement: { type: String, default: 'below' },
  actionShape: { type: String, default: 'default' },
  actionSize: { type: String, default: 'sm' },
  actions: { type: Array, default: undefined },
  dismissible: { type: Boolean, default: false },
  dismissLabel: { type: String, default: '알림 닫기' },
  hideIcon: { type: Boolean, default: false },
  icon: { type: String, default: undefined },
  message: { type: String, default: undefined },
  onDismiss: { type: Function, default: undefined },
  role: { type: String, default: undefined },
  status: { type: String, default: 'info' },
  title: { type: String, default: undefined },
  variant: { type: String, default: 'subtle' },
})

const STATUS_DEFAULT_ICON_NAME = {
  info: 'info',
  success: 'circle-check-big',
  warning: 'triangle-alert',
  danger: 'circle-x',
}

const resolvedRole = computed(() => {
  if (props.role) return props.role
  return (props.status === 'danger' || props.status === 'warning') ? 'alert' : 'status'
})

const classes = computed(() =>
  ['sg-ds-library-scope', 'alert', attrs.class].filter(Boolean).join(' ')
)

const iconName = computed(() => {
  if (props.hideIcon) return null
  if (slots.icon) return null
  return (props.icon && props.icon.trim()) || STATUS_DEFAULT_ICON_NAME[props.status] || null
})

const showIcon = computed(() => !props.hideIcon && (slots.icon || iconName.value))

const builtActions = computed(() => {
  const result = []
  const firstLabel = props.action1Label?.trim()
  if (firstLabel) result.push({ label: firstLabel, variant: props.action1Variant ?? 'primary' })
  const secondLabel = props.action2Label?.trim()
  if (secondLabel) result.push({ label: secondLabel, variant: props.action2Variant ?? 'ghost' })
  return result
})

const resolvedActions = computed(() => {
  if (props.actions && Array.isArray(props.actions) && props.actions.length > 0) return props.actions
  if (builtActions.value.length > 0) return builtActions.value
  return null
})

const showBelowActions = computed(() => resolvedActions.value != null && props.actionPlacement !== 'end')
const showInlineActions = computed(() => resolvedActions.value != null && props.actionPlacement === 'end')
</script>

<template>
  <div
    v-bind="{ ...$attrs, class: undefined }"
    :class="classes"
    :role="resolvedRole"
    :data-status="props.status"
    :data-variant="props.variant"
    :data-dismissible="props.dismissible || undefined"
    :data-action-placement="props.actionPlacement === 'end' ? 'end' : undefined"
  >
    <span v-if="showIcon" class="alert-icon" aria-hidden="true">
      <slot name="icon">
        <Icon :name="iconName" size="1em" />
      </slot>
    </span>

    <div class="alert-content">
      <Text v-if="props.title" as="h4" class="alert-title" tone="inherit" variant="ui" weight="semibold">
        {{ props.title }}
      </Text>
      <Text v-if="props.message" as="p" class="alert-message" tone="inherit" variant="body-sm">
        {{ props.message }}
      </Text>
      <div v-if="showBelowActions" class="alert-actions">
        <Button
          v-for="(action, i) in resolvedActions"
          :key="`${action.label}-${i}`"
          :size="props.actionSize"
          :shape="props.actionShape"
          :variant="action.variant ?? (i === 0 ? 'primary' : 'ghost')"
          @click="action.onClick"
        >
          {{ action.label }}
        </Button>
      </div>
    </div>

    <div v-if="showInlineActions" class="alert-actions" data-placement="end">
      <Button
        v-for="(action, i) in resolvedActions"
        :key="`${action.label}-${i}`"
        :size="props.actionSize"
        :shape="props.actionShape"
        :variant="action.variant ?? (i === 0 ? 'primary' : 'ghost')"
        @click="action.onClick"
      >
        {{ action.label }}
      </Button>
    </div>

    <button
      v-if="props.dismissible"
      type="button"
      class="alert-dismiss"
      :aria-label="props.dismissLabel"
      @click="props.onDismiss"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  </div>
</template>
