<script setup>
import { computed } from 'vue'
import Icon from './Icon.vue'

const props = defineProps({
  active: { default: false },
  emphasized: { default: false },
  badge: { default: undefined },
  badgeStatus: { default: 'neutral' },
  badgeVariant: { default: 'subtle' },
  description: { default: undefined },
  href: { default: undefined },
  icon: { default: 'circle' },
  label: { default: 'Item' },
})

const classes = computed(() =>
  ['sg-ds-library-scope', 'sidebar-item', props.active ? 'is-active' : ''].filter(Boolean).join(' ')
)
const isPrimitiveBadge = computed(() => typeof props.badge === 'string' || typeof props.badge === 'number')
</script>

<template>
  <component
    :is="props.href ? 'a' : 'button'"
    :class="classes"
    :href="props.href"
    :aria-current="props.active ? 'page' : undefined"
    :data-emphasized="props.emphasized ? 'true' : undefined"
    v-bind="$attrs"
  >
    <span class="sidebar-item-icon"><Icon :name="props.icon" :size="20" /></span>
    <span class="sidebar-item-body">
      <span class="sidebar-item-label">{{ props.label }}</span>
      <span v-if="props.description" class="sidebar-item-description">{{ props.description }}</span>
    </span>
    <span v-if="props.badge != null && props.badge !== ''" class="sidebar-item-trailing">
      <span v-if="isPrimitiveBadge" class="sidebar-item-badge" :data-status="props.badgeStatus" :data-variant="props.badgeVariant">{{ props.badge }}</span>
      <slot v-else name="badge" />
    </span>
  </component>
</template>
