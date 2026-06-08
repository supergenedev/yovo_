<script setup>
import { ref, computed, watch, onMounted, onUnmounted, useAttrs } from 'vue'
import Button from './Button.vue'

const attrs = useAttrs()

const props = defineProps({
  background: { default: 'surface' },
  minSize: { default: undefined },
  onDismiss: { default: undefined },
  open: { default: true },
  overlay: { default: true },
  position: { default: 'bottom' },
  size: { default: '48%' },
  soft: { default: false },
})

defineOptions({ inheritAttrs: false })

function normalizeDrawerLength(value) {
  if (typeof value === 'number') return Number.isFinite(value) ? `${value}%` : undefined
  const text = value?.trim()
  if (!text) return undefined
  return /^-?\d+(\.\d+)?$/.test(text) ? `${text}%` : text
}

const bodyRef = ref(null)
const bodyScrollFrameRef = ref(null)
const bodyScrollState = ref({ down: false, up: false })

const minSizeValue = computed(() => normalizeDrawerLength(props.minSize))
const sizeValue = computed(() => normalizeDrawerLength(props.size))

const drawerStyle = computed(() => ({
  '--c-drawer-min-size': minSizeValue.value,
  '--c-drawer-size': sizeValue.value,
}))

const rootStyle = computed(() => ({
  ...drawerStyle.value,
  ...(attrs.style || {}),
}))

const rootClass = computed(() =>
  [
    'sg-ds-library-scope',
    'drawer-root',
    `drawer-root--${props.position}`,
    props.open ? 'is-open' : '',
    props.soft ? 'drawer-root--soft' : '',
    attrs.class,
  ].filter(Boolean).join(' ')
)

const drawerClass = computed(() =>
  [
    'drawer',
    `drawer--${props.position}`,
    `drawer--bg-${props.background}`,
    props.soft ? 'drawer--soft' : '',
  ].filter(Boolean).join(' ')
)

const bodyClass = computed(() =>
  [
    'drawer-body',
    bodyScrollState.value.up ? 'can-scroll-up' : '',
    bodyScrollState.value.down ? 'can-scroll-down' : '',
  ].filter(Boolean).join(' ')
)

let observer = null

function updateScrollState() {
  bodyScrollFrameRef.value = null
  const body = bodyRef.value
  if (!body) return
  const maxScrollTop = Math.max(0, body.scrollHeight - body.clientHeight)
  const nextState = {
    up: body.scrollTop > 1,
    down: body.scrollTop < maxScrollTop - 1,
  }
  if (bodyScrollState.value.up !== nextState.up || bodyScrollState.value.down !== nextState.down) {
    bodyScrollState.value = nextState
  }
}

function scheduleScrollStateUpdate() {
  if (bodyScrollFrameRef.value !== null) return
  bodyScrollFrameRef.value = window.requestAnimationFrame(updateScrollState)
}

function setupScrollListeners() {
  const body = bodyRef.value
  if (!body || !props.open) {
    if (bodyScrollState.value.up || bodyScrollState.value.down) {
      bodyScrollState.value = { down: false, up: false }
    }
    return
  }
  body.addEventListener('scroll', scheduleScrollStateUpdate, { passive: true })
  observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(scheduleScrollStateUpdate)
  observer?.observe(body)
  Array.from(body.children).forEach((child) => observer?.observe(child))
  scheduleScrollStateUpdate()
}

function teardownScrollListeners() {
  if (bodyScrollFrameRef.value !== null) {
    window.cancelAnimationFrame(bodyScrollFrameRef.value)
    bodyScrollFrameRef.value = null
  }
  const body = bodyRef.value
  if (body) body.removeEventListener('scroll', scheduleScrollStateUpdate)
  observer?.disconnect()
  observer = null
}

onMounted(() => {
  setupScrollListeners()
})

onUnmounted(() => {
  teardownScrollListeners()
})

watch(
  [() => props.open, () => props.position, sizeValue, minSizeValue],
  () => {
    teardownScrollListeners()
    setupScrollListeners()
  }
)
</script>

<template>
  <div
    v-bind="{ ...$attrs, class: undefined, style: undefined }"
    :aria-hidden="!props.open"
    :class="rootClass"
    :style="rootStyle"
  >
    <button
      v-if="props.overlay"
      aria-hidden="true"
      class="drawer-scrim"
      :tabindex="-1"
      type="button"
      @click="props.onDismiss"
    />
    <div
      :aria-modal="props.open || undefined"
      :class="drawerClass"
      role="dialog"
      :style="drawerStyle"
    >
      <div class="drawer-head">
        <Button
          aria-label="Close drawer"
          :icon-only="true"
          leading-icon="x"
          size="sm"
          variant="ghost"
          @click="props.onDismiss"
        />
      </div>
      <div :class="bodyClass" ref="bodyRef">
        <slot>Drawer content</slot>
      </div>
    </div>
  </div>
</template>
