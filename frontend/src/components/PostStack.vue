<script setup>
import { computed, useAttrs } from 'vue'
import Icon from './Icon.vue'
import PostCard from './PostCard.vue'
import PostStackNewPill from './PostStackNewPill.vue'

const attrs = useAttrs()

const props = defineProps({
  newCount: { default: 4 },
  showNewPill: { type: Boolean, default: true },
})

const classes = computed(() =>
  ['sg-ds-library-scope', 'post-stack', attrs.class].filter(Boolean).join(' ')
)
</script>

<template>
  <div v-bind="{ ...$attrs, class: undefined }" :class="classes">
    <PostStackNewPill v-if="props.showNewPill" :count="props.newCount" />
    <slot>
      <PostCard title="Live session notes" prose="A compact feed stack using source-backed post cards." />
      <PostCard userName="Koda" userInitials="KO" title="garden_after_midnight.wav" prose="New remix stems are open." />
    </slot>
  </div>
</template>
