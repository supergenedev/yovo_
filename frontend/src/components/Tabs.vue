<script setup>
import { ref, computed, useAttrs } from 'vue'
import TabsList from './TabsList.vue'
import Tab from './Tab.vue'
import TabsPanel from './TabsPanel.vue'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const DEFAULT_TABS = [
  { id: 'overview', label: 'Overview', panel: 'Project summary and recent activity.' },
  { id: 'library', label: 'Library', panel: 'Reusable source-backed components.' },
  { id: 'settings', label: 'Settings', panel: 'Workspace preferences.' },
]

const props = defineProps({
  ariaLabel: {},
  defaultValue: {},
  items: {},
  size: {},
  sticky: {},
  stickyOffset: {},
  value: {},
  variant: {},
})

function normalizeStickyOffset(val) {
  if (typeof val === 'number') return Number.isFinite(val) ? `${val}px` : undefined
  if (typeof val !== 'string') return undefined
  const trimmed = val.trim()
  return trimmed || undefined
}

const normalizedItems = computed(() =>
  props.items.map((item, index) => ({
    ...item,
    id: item.id ?? `tab-${index}`,
  }))
)

const fallbackValue = computed(() => normalizedItems.value[0]?.id ?? 'tab')
const localValue = ref(props.defaultValue ?? props.value ?? fallbackValue.value)
const activeValue = computed(() => props.value ?? localValue.value)

const resolvedStyle = computed(() => {
  const offset = props.sticky ? normalizeStickyOffset(props.stickyOffset) : undefined
  if (!offset) return attrs.style
  return { ...attrs.style, '--c-tabs-sticky-offset': offset }
})

const idPrefix = `tabs-${Math.random().toString(36).slice(2, 8)}`

const classes = computed(() =>
  ['sg-ds-library-scope', 'tabs', attrs.class].filter(Boolean).join(' ')
)

function setLocalValue(id) {
  localValue.value = id
}
</script>

<template>
  <div
    v-bind="{ ...$attrs, class: undefined, style: undefined }"
    :class="classes"
    :style="resolvedStyle"
    :data-size="props.size"
    :data-sticky="props.sticky || undefined"
    :data-variant="props.variant"
  >
    <slot>
      <TabsList :label="props.ariaLabel">
        <Tab
          v-for="item in normalizedItems"
          :key="item.id"
          :id="`${idPrefix}-${item.id}`"
          :controls="`${idPrefix}-${item.id}-panel`"
          :selected="item.id === activeValue"
          @click="setLocalValue(item.id)"
        >
          {{ item.label }}
        </Tab>
      </TabsList>
      <TabsPanel
        v-for="item in normalizedItems"
        :key="item.id"
        :id="`${idPrefix}-${item.id}-panel`"
        :labelledBy="`${idPrefix}-${item.id}`"
        :selected="item.id === activeValue"
      >
        {{ item.panel }}
      </TabsPanel>
    </slot>
  </div>
</template>
