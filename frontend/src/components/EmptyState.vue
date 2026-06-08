<script setup>
import { computed, useAttrs } from 'vue'
import Button from './Button.vue'

const attrs = useAttrs()

const props = defineProps({
  actionLabel: { default: 'Create item' },
  artIcon: { default: 'inbox' },
  body: { default: 'When new content arrives, it will appear here.' },
  showArt: { default: true },
  size: { default: 'md' },
  title: { default: 'Nothing here yet' },
  titleLevel: { default: null },
})

const classes = computed(() =>
  ['sg-ds-library-scope', 'empty-state', attrs.class].filter(Boolean).join(' ')
)

const titleTag = computed(() => {
  const level = props.titleLevel ?? (props.size === 'lg' ? 2 : 3)
  return level === 2 ? 'h2' : 'h3'
})

const titleVariant = computed(() => titleTag.value === 'h2' ? 'heading-2' : 'heading-3')
</script>

<template>
  <div v-bind="{ ...$attrs, class: undefined }" :class="classes" :data-size="props.size">
    <div v-if="props.showArt" class="empty-state-art" aria-hidden="true">
      <slot name="art">
        <Icon :name="props.artIcon" size="50%" />
      </slot>
    </div>
    <Text
      v-if="props.title"
      :as="titleTag"
      class="empty-state-title"
      :variant="titleVariant"
    >{{ props.title }}</Text>
    <Text
      v-if="props.body"
      as="p"
      class="empty-state-body"
      tone="secondary"
      variant="body"
    >{{ props.body }}</Text>
    <div class="empty-state-actions">
      <slot name="actions">
        <Button :size="props.size">{{ props.actionLabel }}</Button>
      </slot>
    </div>
  </div>
</template>
