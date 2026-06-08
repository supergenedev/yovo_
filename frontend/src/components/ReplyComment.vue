<script setup>
import { computed } from 'vue'
import Comment from './Comment.vue'

const props = defineProps({
  author: { default: 'User' },
  authorMeta: { default: undefined },
  avatarSrc: { default: undefined },
  avatarTone: { default: 'brand' },
  body: { default: undefined },
  comment: { default: undefined },
  initials: { default: 'U' },
  liked: { default: false },
  likeCount: { default: undefined },
  pinned: { default: false },
  replyCount: { default: undefined },
  time: { default: undefined },
  verified: { default: false },
  replyTo: { default: undefined },
  showConnector: { default: true },
  class: { default: '' },
})

const resolvedAuthorMeta = computed(() => {
  return props.authorMeta ?? (props.replyTo ? `@${props.replyTo}에게 답글` : undefined)
})

const resolvedClass = computed(() =>
  ['reply-comment', props.class].filter(Boolean).join(' ')
)
</script>

<template>
  <Comment
    :author="props.author"
    :author-meta="resolvedAuthorMeta"
    :avatar-src="props.avatarSrc"
    :avatar-tone="props.avatarTone"
    :body="props.body"
    :comment="props.comment"
    :initials="props.initials"
    :liked="props.liked"
    :like-count="props.likeCount"
    :pinned="props.pinned"
    :reply-count="props.replyCount"
    :time="props.time"
    :verified="props.verified"
    :class="resolvedClass"
    :data-reply-connector="props.showConnector || undefined"
  />
</template>
