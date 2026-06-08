<script setup>
import { computed, useAttrs, useSlots } from 'vue'
import Icon from './Icon.vue'
import Text from './Text.vue'

const attrs = useAttrs()
const slots = useSlots()

const props = defineProps({
  dismissLabel: { type: String, default: 'Dismiss notification' },
  icon: { type: String, default: undefined },
  message: { type: String, default: 'File uploaded.' },
  showDismiss: { type: Boolean, default: true },
  state: { type: String, default: 'visible' },
  status: { type: String, default: 'success' },
  title: { type: String, default: undefined },
  variant: { type: String, default: 'solid' },
})

const STATUS_ICON = {
  danger: 'circle-x',
  info: 'info',
  success: 'circle-check-big',
  warning: 'triangle-alert',
}

const resolvedRole = computed(() =>
  attrs.role ?? (props.status === 'danger' || props.status === 'warning' ? 'alert' : 'status')
)

const classes = computed(() =>
  ['sg-ds-library-scope', 'toast', attrs.class].filter(Boolean).join(' ')
)

const resolvedIconName = computed(() => props.icon || STATUS_ICON[props.status])
</script>

<template>
  <div
    v-bind="{ ...$attrs, class: undefined }"
    :class="classes"
    :data-state="props.state"
    :data-status="props.status"
    :data-variant="props.variant"
    :role="resolvedRole"
  >
    <span class="toast-icon" aria-hidden="true">
      <slot name="icon">
        <Icon :name="resolvedIconName" size="1em" />
      </slot>
    </span>

    <div class="toast-content">
      <slot>
        <Text v-if="props.title" as="p" class="toast-title" tone="inherit" variant="ui" weight="semibold">
          {{ props.title }}
        </Text>
        <Text v-if="props.message" as="p" class="toast-message" tone="inherit" variant="body-sm">
          {{ props.message }}
        </Text>
      </slot>
    </div>

    <button
      v-if="props.showDismiss"
      type="button"
      class="sg-ds-library-scope toast-dismiss"
      :aria-label="props.dismissLabel"
    >
      <Icon name="x" size="1em" />
    </button>
  </div>
</template>
