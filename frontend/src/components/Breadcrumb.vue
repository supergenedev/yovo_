<script setup>
import { computed, useAttrs, useSlots } from 'vue'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
const slots = useSlots()

const props = defineProps({
  current: { default: undefined },
  items: { default: undefined },
  label: { default: 'Breadcrumb' },
  parent: { default: undefined },
  root: { default: undefined },
  separator: { default: 'slash' },
  size: { default: 'md' },
})

const DEFAULT_BREADCRUMB_ITEMS = [
  { href: '#', label: 'Home' },
  { href: '#', label: 'Library' },
  { label: 'Components' },
]

const resolvedItems = computed(() => {
  if (props.items !== undefined) return props.items
  if (props.root !== undefined || props.parent !== undefined || props.current !== undefined) {
    return [
      { href: '#', label: props.root ?? 'Home' },
      { href: '#', label: props.parent ?? 'Products' },
      { label: props.current ?? 'Headphones' },
    ]
  }
  return DEFAULT_BREADCRUMB_ITEMS
})

const classes = computed(() =>
  ['sg-ds-library-scope', 'breadcrumb', attrs.class].filter(Boolean).join(' ')
)
</script>

<template>
  <nav
    v-bind="{ ...attrs, class: undefined }"
    :aria-label="props.label"
    :class="classes"
    :data-separator="props.separator"
    :data-size="props.size"
  >
    <ol class="breadcrumb-list">
      <slot>
        <li
          v-for="(item, index) in resolvedItems"
          :key="`${String(item.label)}-${index}`"
          class="sg-ds-library-scope breadcrumb-item"
        >
          <span
            v-if="index === resolvedItems.length - 1 || !item.href"
            aria-current="page"
            class="sg-ds-library-scope breadcrumb-current"
          >{{ item.label }}</span>
          <a
            v-else
            :href="item.href"
            class="sg-ds-library-scope breadcrumb-link"
          >{{ item.label }}</a>
        </li>
      </slot>
    </ol>
  </nav>
</template>
