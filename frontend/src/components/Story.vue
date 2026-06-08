<script setup>
import { computed, useAttrs } from 'vue'
import Avatar from './Avatar.vue'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const props = defineProps({
  as: { type: String, default: 'a' },
  avatarSrc: { type: String, default: undefined },
  avatarTone: { type: String, default: 'brand' },
  badge: { type: String, default: 'LIVE' },
  buttonType: { type: String, default: 'button' },
  href: { type: String, default: '#' },
  initials: { type: String, default: 'HL' },
  label: { type: String, default: 'Hailey' },
  size: { type: String, default: 'md' },
  state: { type: String, default: 'unseen' },
})

function getStoryAvatarSize(size) {
  if (size === 'sm') return 'lg'
  if (size === 'lg') return '2xl'
  return 'xl'
}

const ariaLabel = computed(() => {
  if (attrs['aria-label']) return attrs['aria-label']
  if (props.label) {
    return props.badge ? `${props.label} · ${props.badge}` : props.label
  }
  return undefined
})

const classes = computed(() =>
  ['sg-ds-library-scope', 'story', attrs.class].filter(Boolean).join(' ')
)

function handleAnchorClick(event) {
  if (!props.href || props.href === '#') event.preventDefault()
}
</script>

<template>
  <button
    v-if="props.as === 'button'"
    v-bind="{ ...attrs, class: undefined }"
    :class="classes"
    :type="props.buttonType"
    :aria-label="ariaLabel"
    :data-size="props.size"
    :data-state="props.state"
  >
    <span class="story-ring">
      <Avatar
        :initials="props.initials"
        :size="getStoryAvatarSize(props.size)"
        :src="props.avatarSrc"
        :tone="props.avatarTone"
      />
      <span v-if="props.badge" class="story-badge">{{ props.badge }}</span>
    </span>
    <span v-if="props.label" class="story-label">{{ props.label }}</span>
  </button>

  <a
    v-else
    v-bind="{ ...attrs, class: undefined }"
    :class="classes"
    :href="props.href"
    :aria-label="ariaLabel"
    :data-size="props.size"
    :data-state="props.state"
    @click="handleAnchorClick"
  >
    <span class="story-ring">
      <Avatar
        :initials="props.initials"
        :size="getStoryAvatarSize(props.size)"
        :src="props.avatarSrc"
        :tone="props.avatarTone"
      />
      <span v-if="props.badge" class="story-badge">{{ props.badge }}</span>
    </span>
    <span v-if="props.label" class="story-label">{{ props.label }}</span>
  </a>
</template>
