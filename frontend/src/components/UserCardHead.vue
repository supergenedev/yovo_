<script setup>
import { computed } from 'vue'
import UserBlock from './UserBlock.vue'

const props = defineProps({
  name: { default: 'Hailey Luna' },
  initials: { default: 'HL' },
  meta: { default: undefined },
  avatarSrc: { default: undefined },
  avatarTone: { default: undefined },
  avatarSize: { default: 'md' },
  verified: { default: false },
})
</script>

<template>
  <header class="sg-ds-library-scope user-card-head" v-bind="$attrs">
    <slot>
      <UserBlock
        :name="props.name"
        :initials="props.initials"
        :meta="props.meta"
        :avatar-src="props.avatarSrc"
        :avatar-tone="props.avatarTone"
        :avatar-size="props.avatarSize"
        :verified="props.verified"
      />
    </slot>
  </header>
</template>
