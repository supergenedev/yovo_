<script setup>
import { computed, useAttrs, useSlots } from 'vue'
import Avatar from './Avatar.vue'
import Button from './Button.vue'
import Icon from './Icon.vue'

const attrs = useAttrs()
const slots = useSlots()

const props = defineProps({
  name: { default: 'User' },
  meta: { default: undefined },
  initials: { default: 'U' },
  avatarAlt: { default: '' },
  avatarInitials: { default: undefined },
  avatarQuietStatus: { default: false },
  avatarShape: { default: 'circle' },
  avatarSize: { default: 'md' },
  avatarSrc: { default: undefined },
  avatarStatus: { default: undefined },
  avatarStatusLabel: { default: undefined },
  avatarTone: { default: 'neutral' },
  verified: { default: false },
  size: { default: 'md' },
  direction: { default: 'row' },
  action1Icon: { default: undefined },
  action1Label: { default: undefined },
  action1Variant: { default: 'ghost' },
  action1AriaLabel: { default: undefined },
  action2Icon: { default: undefined },
  action2Label: { default: undefined },
  action2Variant: { default: 'primary' },
  action2AriaLabel: { default: undefined },
})

defineOptions({ inheritAttrs: false })

const classes = computed(() =>
  ['sg-ds-library-scope', 'user-block', attrs.class].filter(Boolean).join(' ')
)

const resolvedInitials = computed(() => props.avatarInitials ?? props.initials)

const hasTailSlot = computed(() => !!slots.tail)
const hasDefaultSlot = computed(() => !!slots.default)
const showActionsDiv = computed(() => !hasTailSlot.value && !hasDefaultSlot.value)

function resolveAction(label, icon) {
  const resolvedLabel = typeof label === 'string' ? label.trim() : ''
  const resolvedIcon = typeof icon === 'string' ? icon.trim() : ''
  if (!resolvedLabel && !resolvedIcon) return null
  return { resolvedLabel, resolvedIcon, iconOnly: !resolvedLabel }
}

const action1 = computed(() => resolveAction(props.action1Label, props.action1Icon))
const action2 = computed(() => resolveAction(props.action2Label, props.action2Icon))
const hasActions = computed(() => !!(action1.value || action2.value))
</script>

<template>
  <div
    v-bind="{ ...$attrs, class: undefined }"
    :class="classes"
    :data-size="props.size"
    :data-direction="props.direction === 'stack' ? 'stack' : undefined"
  >
    <Avatar
      :alt="props.avatarAlt"
      :initials="resolvedInitials"
      :quiet-status="props.avatarQuietStatus"
      :shape="props.avatarShape"
      :size="props.avatarSize"
      :src="props.avatarSrc"
      :status="props.avatarStatus"
      :status-label="props.avatarStatusLabel"
      :tone="props.avatarTone"
    >
      <template v-if="$slots['avatar-icon']" #icon>
        <slot name="avatar-icon" />
      </template>
    </Avatar>

    <div class="user-block-body">
      <span class="user-block-name">
        {{ props.name }}
        <span v-if="props.verified" class="user-block-verified" aria-label="Verified">
          <Icon name="badge-check" size="1em" />
        </span>
      </span>
      <span v-if="props.meta" class="user-block-meta">{{ props.meta }}</span>
    </div>

    <div v-if="hasTailSlot" class="user-block-tail">
      <slot name="tail" />
    </div>
    <div v-else-if="hasDefaultSlot" class="user-block-tail">
      <slot />
    </div>
    <div v-else-if="showActionsDiv && hasActions" class="user-block-tail">
      <div class="user-block-actions">
        <Button
          v-if="action1"
          :aria-label="action1.iconOnly ? (props.action1AriaLabel || action1.resolvedIcon) : props.action1AriaLabel"
          :icon-only="action1.iconOnly"
          :leading-icon="action1.resolvedIcon || undefined"
          size="sm"
          :variant="props.action1Variant"
        >
          {{ action1.resolvedLabel || props.action1AriaLabel || action1.resolvedIcon }}
        </Button>
        <Button
          v-if="action2"
          :aria-label="action2.iconOnly ? (props.action2AriaLabel || action2.resolvedIcon) : props.action2AriaLabel"
          :icon-only="action2.iconOnly"
          :leading-icon="action2.resolvedIcon || undefined"
          size="sm"
          :variant="props.action2Variant"
        >
          {{ action2.resolvedLabel || props.action2AriaLabel || action2.resolvedIcon }}
        </Button>
      </div>
    </div>
  </div>
</template>
