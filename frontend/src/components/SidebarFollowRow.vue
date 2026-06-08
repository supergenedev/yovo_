<script setup>
import { computed } from 'vue'
import Avatar from './Avatar.vue'

const props = defineProps({
  active: { default: false },
  as: { default: 'button' },
  avatarSrc: { default: undefined },
  avatarTone: { default: 'brand' },
  description: { default: undefined },
  initials: { default: 'HL' },
  name: { default: 'Hailey Luna' },
  size: { default: 'md' },
  status: { default: 'default' },
  tail: { default: undefined },
  tailStatus: { default: undefined },
  tailVariant: { default: 'plain' },
})

const isLive = computed(() => props.status === 'live')
const classes = computed(() =>
  ['sg-ds-library-scope', 'sidebar-item', 'sidebar-follow-row', props.active ? 'is-active' : ''].filter(Boolean).join(' ')
)
const resolvedTailStatus = computed(() => props.tailStatus ?? (isLive.value ? 'live' : 'neutral'))
</script>

<template>
  <component
    :is="props.as === 'a' ? 'a' : props.as === 'div' ? 'div' : 'button'"
    :class="classes"
    :data-size="props.size"
    :aria-current="props.active ? 'page' : undefined"
    v-bind="$attrs"
  >
    <span class="sidebar-item-icon sidebar-follow-row-avatar">
      <Avatar
        :initials="props.initials"
        :size="props.size === 'sm' ? 'sm' : 'md'"
        :src="props.avatarSrc"
        :status="isLive ? 'live' : undefined"
        :tone="props.avatarTone"
        quiet-status
      />
    </span>
    <span class="sidebar-item-body">
      <span class="sidebar-item-label">{{ props.name }}</span>
      <span v-if="props.description" class="sidebar-item-description">{{ props.description }}</span>
    </span>
    <span v-if="props.tail || isLive" class="sidebar-item-trailing">
      <span class="sidebar-follow-row-tail" :data-status="resolvedTailStatus" :data-variant="props.tailVariant">
        {{ props.tail || (isLive ? 'LIVE' : '') }}
      </span>
    </span>
  </component>
</template>
