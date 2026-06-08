<script setup>
import { computed, useAttrs } from 'vue'
import Avatar from './Avatar.vue'

const attrs = useAttrs()

const props = defineProps({
  author: { default: 'SOYU' },
  comment: { default: '4:12쯤 첼로 들어올 때 진짜 소름… 한 번에 갔다는 게 안 믿겨요' },
  initials: { default: 'SY' },
  avatarTone: { default: 'pink' },
  avatarSrc: { default: undefined },
})

const classes = computed(() =>
  ['sg-ds-library-scope', 'top-comment', attrs.class].filter(Boolean).join(' ')
)
</script>

<template>
  <div v-bind="{ ...$attrs, class: undefined }" :class="classes">
    <Avatar size="xs" :tone="props.avatarTone" :initials="props.initials" :src="props.avatarSrc" />
    <p class="top-comment-body">
      <span class="top-comment-author">{{ props.author }}</span>
      {{ props.comment }}
    </p>
  </div>
</template>
