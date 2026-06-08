<script setup>
import { computed, useAttrs, useSlots } from 'vue'
import CommentInput from './CommentInput.vue'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
const slots = useSlots()

const props = defineProps({
  className: { default: '' },
  context: { default: undefined },
  placeholder: { default: '답글을 입력하세요' },
  replyTo: { default: undefined },
  showConnector: { default: true },
  submitLabel: { default: '답글' },
  textareaLabel: { default: '대댓글 입력' },
})

const resolvedContext = computed(() => {
  if (props.context !== undefined) return props.context
  if (props.replyTo) return null // handled via slot in template
  return '대댓글 작성'
})

const classes = computed(() =>
  ['reply-comment-input', props.className].filter(Boolean).join(' ')
)
</script>

<template>
  <CommentInput
    v-bind="{ ...$attrs, class: undefined }"
    :class="classes"
    :context="props.context === undefined && props.replyTo ? undefined : resolvedContext"
    :data-reply-connector="props.showConnector || undefined"
    :placeholder="props.placeholder"
    :submit-label="props.submitLabel"
    :textarea-label="props.textareaLabel"
  >
    <template v-if="props.context === undefined && props.replyTo" #context>
      <span class="reply-comment-input-target">@{{ props.replyTo }}</span>에게 답글
    </template>
    <template v-for="(_, name) in slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps ?? {}" />
    </template>
  </CommentInput>
</template>
