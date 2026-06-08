<script setup>
import { computed, useAttrs } from 'vue'
import Avatar from './Avatar.vue'

const attrs = useAttrs()

const props = defineProps({
  as: { default: 'a' },
  avatarSrc: { default: undefined },
  avatarTone: { default: 'brand' },
  buttonType: { default: 'button' },
  href: { default: '#' },
  initials: { default: 'HL' },
  name: { default: 'Hailey Luna' },
  size: { default: 'sm' },
  state: { default: 'default' },
  tail: { default: undefined },
  tailStatus: { default: undefined },
  tailVariant: { default: undefined },
})

const isLive = computed(() => props.state === 'live')

const classes = computed(() =>
  ['sg-ds-library-scope', 'follow-row', attrs.class].filter(Boolean).join(' ')
)

const resolvedTailStatus = computed(() =>
  props.tailStatus ?? (isLive.value ? 'live' : 'neutral')
)

const resolvedTailVariant = computed(() =>
  props.tailVariant ?? 'plain'
)

const isPrimitiveTail = computed(() =>
  typeof props.tail === 'string' || typeof props.tail === 'number'
)

// tail rendering logic:
// tail == null  → default span ('LIVE' or '5m')
// tail === ''   → nothing
// isPrimitiveTail → span with tail value
// otherwise    → use slot named "tail"
const showDefaultTail = computed(() => props.tail == null)
const showEmptyTail = computed(() => props.tail === '')
const showPrimitiveTail = computed(() => !showDefaultTail.value && !showEmptyTail.value && isPrimitiveTail.value)
const showSlotTail = computed(() => !showDefaultTail.value && !showEmptyTail.value && !isPrimitiveTail.value)
</script>

<template>
  <component
    :is="props.as"
    v-bind="{ ...$attrs, class: undefined }"
    :class="classes"
    :data-size="props.size"
    :data-state="isLive ? 'live' : undefined"
    :href="props.as === 'a' ? props.href : undefined"
    :type="props.as === 'button' ? props.buttonType : undefined"
  >
    <Avatar
      :initials="props.initials"
      :size="props.size === 'md' ? 'md' : 'sm'"
      :src="props.avatarSrc"
      :status="isLive ? 'live' : undefined"
      :tone="props.avatarTone"
    />
    <span class="follow-row-name">{{ props.name }}</span>

    <!-- default tail (null) -->
    <span
      v-if="showDefaultTail"
      class="follow-row-tail"
      :data-status="resolvedTailStatus"
      :data-variant="resolvedTailVariant"
      :data-tone="resolvedTailStatus === 'live' ? 'live' : undefined"
    >{{ isLive ? 'LIVE' : '5m' }}</span>

    <!-- empty string tail → render nothing -->

    <!-- primitive tail (string/number) -->
    <span
      v-else-if="showPrimitiveTail"
      class="follow-row-tail"
      :data-status="resolvedTailStatus"
      :data-variant="resolvedTailVariant"
      :data-tone="resolvedTailStatus === 'live' ? 'live' : undefined"
    >{{ props.tail }}</span>

    <!-- custom tail slot -->
    <slot v-else-if="showSlotTail" name="tail" />
  </component>
</template>
