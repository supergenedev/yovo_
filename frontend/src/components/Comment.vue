<script setup>
import { computed, useAttrs } from 'vue'
import Avatar from './Avatar.vue'
import Button from './Button.vue'
import Icon from './Icon.vue'

const attrs = useAttrs()

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
})

const resolvedBody = computed(() => props.body ?? props.comment)

const classes = computed(() =>
  ['sg-ds-library-scope', 'comment', attrs.class].filter(Boolean).join(' ')
)
</script>

<template>
  <div
    v-bind="{ ...$attrs, class: undefined }"
    :class="classes"
    :data-pinned="props.pinned || undefined"
  >
    <Avatar size="sm" :tone="props.avatarTone" :initials="props.initials" :src="props.avatarSrc" />
    <div class="comment-body">
      <div class="comment-head">
        <span class="comment-author">
          {{ props.author }}
          <span v-if="props.verified" class="comment-verified" aria-label="Verified">
            <Icon name="badge-check" size="1em" />
          </span>
        </span>
        <span v-if="props.authorMeta" class="comment-author-meta">{{ props.authorMeta }}</span>
        <span v-if="props.time" class="comment-time">{{ props.time }}</span>
        <span v-if="props.pinned" class="comment-pinned" aria-label="Pinned">
          <Icon name="pin" size="1em" /> 고정됨
        </span>
      </div>
      <p v-if="resolvedBody" class="comment-text">{{ resolvedBody }}</p>
      <div class="comment-reactions">
        <Button
          :class="props.liked ? 'is-liked' : ''"
          variant="ghost"
          size="sm"
          leading-icon="heart"
          :label="typeof props.likeCount === 'undefined' ? '좋아요' : String(props.likeCount)"
        />
        <Button
          variant="ghost"
          size="sm"
          leading-icon="corner-down-right"
          :label="typeof props.replyCount === 'undefined' || props.replyCount === 0 ? '답글' : `답글 ${props.replyCount}`"
        />
        <Button
          variant="ghost"
          size="sm"
          :icon-only="true"
          leading-icon="flag"
          aria-label="신고"
        />
        <Button
          variant="ghost"
          size="sm"
          :icon-only="true"
          leading-icon="ellipsis"
          aria-label="더보기"
        />
      </div>
    </div>
  </div>
</template>
