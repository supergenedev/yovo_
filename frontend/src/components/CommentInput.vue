<script setup>
import { computed, useAttrs } from 'vue'
import Avatar from './Avatar.vue'
import Button from './Button.vue'
import Icon from './Icon.vue'
import Textarea from './Textarea.vue'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const props = defineProps({
  autoFocus: { default: false },
  avatarSrc: { default: undefined },
  avatarTone: { default: 'brand' },
  cancelLabel: { default: '취소' },
  context: { default: undefined },
  defaultValue: { default: '' },
  disabled: { default: false },
  helperText: { default: undefined },
  initials: { default: 'U' },
  maxLength: { default: undefined },
  name: { default: undefined },
  placeholder: { default: '댓글을 입력하세요' },
  readOnly: { default: false },
  required: { default: false },
  rows: { default: 3 },
  showAttachment: { default: true },
  showAvatar: { default: true },
  showCancel: { default: false },
  showCounter: { default: true },
  showEmoji: { default: true },
  showMention: { default: false },
  submitDisabled: { default: false },
  submitLabel: { default: '등록' },
  textareaId: { default: undefined },
  textareaLabel: { default: '댓글 입력' },
})

function normalizeOptionalNumber(value) {
  if (typeof value === 'undefined') return undefined
  const parsed = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(parsed) && parsed > 0 ? Math.round(parsed) : undefined
}

const normalizedMaxLength = computed(() => normalizeOptionalNumber(props.maxLength))
const hasTools = computed(() => props.showAttachment || props.showEmoji || props.showMention)
const counter = computed(() =>
  props.showCounter && normalizedMaxLength.value
    ? `${props.defaultValue.length}/${normalizedMaxLength.value}`
    : ''
)
const hasMeta = computed(() => Boolean(props.helperText || counter.value))
const lockControls = computed(() => props.disabled || props.readOnly)

const classes = computed(() =>
  ['sg-ds-library-scope', 'comment-input', attrs.class].filter(Boolean).join(' ')
)
</script>

<template>
  <div
    v-bind="{ ...attrs, class: undefined }"
    :class="classes"
    :data-disabled="props.disabled || undefined"
    :data-readonly="props.readOnly || undefined"
    :data-show-avatar="props.showAvatar ? undefined : 'false'"
  >
    <Avatar v-if="props.showAvatar" size="sm" :tone="props.avatarTone" :initials="props.initials" :src="props.avatarSrc" />
    <div class="comment-input-panel">
      <div v-if="props.context" class="comment-input-context">
        <Icon name="corner-down-right" size="1em" />
        <span>{{ props.context }}</span>
      </div>
      <Textarea
        :id="props.textareaId"
        :name="props.name"
        class="comment-input-textarea"
        :aria-label="props.textareaLabel"
        :auto-focus="props.autoFocus"
        :default-value="props.defaultValue"
        :disabled="props.disabled"
        :max-length="normalizedMaxLength"
        :placeholder="props.placeholder"
        :read-only="props.readOnly"
        :required="props.required"
        :rows="props.rows"
        size="md"
      />
      <div class="comment-input-toolbar">
        <div v-if="hasTools" class="comment-input-tools">
          <Button
            v-if="props.showAttachment"
            aria-label="파일 첨부"
            class="comment-input-tool"
            :disabled="lockControls"
            :icon-only="true"
            label="파일 첨부"
            leading-icon="paperclip"
            size="sm"
            variant="ghost"
          />
          <Button
            v-if="props.showEmoji"
            aria-label="이모지 추가"
            class="comment-input-tool"
            :disabled="lockControls"
            :icon-only="true"
            label="이모지 추가"
            leading-icon="smile"
            size="sm"
            variant="ghost"
          />
          <Button
            v-if="props.showMention"
            aria-label="멘션 추가"
            class="comment-input-tool"
            :disabled="lockControls"
            :icon-only="true"
            label="멘션 추가"
            leading-icon="at-sign"
            size="sm"
            variant="ghost"
          />
        </div>
        <span v-else class="comment-input-toolbar-spacer" aria-hidden="true" />
        <div class="comment-input-actions">
          <span v-if="hasMeta" class="comment-input-meta">
            <span v-if="props.helperText" class="comment-input-helper">{{ props.helperText }}</span>
            <span v-if="counter" class="comment-input-counter">{{ counter }}</span>
          </span>
          <Button
            v-if="props.showCancel"
            class="comment-input-cancel"
            :disabled="props.disabled"
            :label="props.cancelLabel"
            size="sm"
            variant="ghost"
          />
          <Button
            class="comment-input-submit"
            :disabled="props.disabled || props.submitDisabled || props.readOnly"
            :label="props.submitLabel"
            leading-icon="send"
            size="sm"
            variant="primary"
          />
        </div>
      </div>
    </div>
  </div>
</template>
