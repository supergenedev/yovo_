<script setup>
import { computed, useAttrs } from 'vue'
import FollowRow from './FollowRow.vue'
import NavItem from './NavItem.vue'

const attrs = useAttrs()

const props = defineProps({
  label: {
    default: undefined,
  },
  variant: {
    default: 'nav',
  },
})

defineOptions({ inheritAttrs: false })

const tag = computed(() => props.variant === 'nav' ? 'nav' : 'section')

const visibleLabel = computed(() =>
  props.label !== undefined ? props.label : (props.variant === 'follow' ? 'Following' : null)
)

const accessibleLabel = computed(() => {
  if (attrs['aria-label']) return attrs['aria-label']
  if (attrs['aria-labelledby']) return undefined
  if (typeof visibleLabel.value === 'string' && visibleLabel.value) return visibleLabel.value
  return props.variant === 'nav' ? 'Primary' : 'Following'
})

const classes = computed(() =>
  ['sg-ds-library-scope', 'rail-group', attrs.class].filter(Boolean).join(' ')
)
</script>

<template>
  <component
    :is="tag"
    v-bind="{ ...attrs, class: undefined, 'aria-label': accessibleLabel }"
    :class="classes"
  >
    <div v-if="visibleLabel" class="rail-label">
      <span>{{ visibleLabel }}</span>
      <slot name="tail" />
    </div>
    <slot>
      <template v-if="variant === 'nav'">
        <NavItem current icon="house" label="Home" variant="rail" />
        <NavItem icon="radio" label="Live" variant="rail" />
        <NavItem icon="library" label="Library" variant="rail" />
      </template>
      <template v-else>
        <FollowRow initials="HL" name="Hailey Luna" state="live" />
        <FollowRow avatar-tone="teal" initials="NV" name="NeoVoice" />
      </template>
    </slot>
  </component>
</template>
