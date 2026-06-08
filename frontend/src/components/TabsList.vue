<script setup>
import { ref, computed, onMounted, onUnmounted, useAttrs } from 'vue'
import Tab from './Tab.vue'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const props = defineProps({
  label: {},
})

const listRef = ref(null)
let ro = null
let mo = null

function syncScrollable() {
  const el = listRef.value
  if (!el) return
  el.dataset.scrollable = el.scrollWidth > el.clientWidth ? 'true' : 'false'
}

onMounted(() => {
  syncScrollable()
  ro = new ResizeObserver(syncScrollable)
  ro.observe(listRef.value)
  mo = new MutationObserver(syncScrollable)
  mo.observe(listRef.value, { childList: true, subtree: true, characterData: true })
})

onUnmounted(() => {
  ro?.disconnect()
  mo?.disconnect()
})

const classes = computed(() =>
  ['sg-ds-library-scope', 'tabs-list', attrs.class].filter(Boolean).join(' ')
)
</script>

<template>
  <div
    v-bind="{ ...$attrs, class: undefined }"
    ref="listRef"
    :aria-label="props.label"
    :class="classes"
    role="tablist"
  >
    <slot>
      <Tab :selected="true">Overview</Tab>
      <Tab>Activity</Tab>
    </slot>
  </div>
</template>
