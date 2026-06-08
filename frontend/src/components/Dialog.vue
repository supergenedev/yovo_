<script setup>
import { ref, computed, watch, onMounted, onUnmounted, useAttrs } from 'vue'
import Button from './Button.vue'
import Icon from './Icon.vue'
import Text from './Text.vue'

const attrs = useAttrs()

const props = defineProps({
  action1Icon: { default: undefined },
  action1Label: { default: undefined },
  action1Variant: { default: 'ghost' },
  action2Icon: { default: undefined },
  action2Label: { default: undefined },
  action2Variant: { default: 'primary' },
  align: { default: 'center' },
  bordered: { default: false },
  description: { default: undefined },
  dimmed: { default: true },
  footerButtonLayout: { default: 'right' },
  floating: { default: true },
  onAction1: { default: undefined },
  onAction2: { default: undefined },
  onDismiss: { default: undefined },
  open: { default: true },
  scroll: { default: false },
  showClose: { default: true },
  size: { default: 'md' },
  title: { default: undefined },
})

defineOptions({ inheritAttrs: false })

const bodyRef = ref(null)
const uid = Math.random().toString(36).slice(2)
const titleId = attrs['aria-labelledby'] ?? `${uid}-title`
const descriptionId = attrs['aria-describedby'] ?? `${uid}-description`

const hasAction1 = computed(() => typeof props.action1Label === 'string' && props.action1Label.trim().length > 0)
const hasAction2 = computed(() => typeof props.action2Label === 'string' && props.action2Label.trim().length > 0)
const actionButtonSize = computed(() => props.size === 'sm' ? 'sm' : props.size === 'md' ? 'md' : 'lg')

const scrollState = ref({ canScrollDown: false, canScrollUp: false })

let frameId = null
let scrollCleanup = null

const commitScrollState = () => {
  frameId = null
  const el = bodyRef.value
  if (!el) return
  const maxScrollTop = Math.max(0, el.scrollHeight - el.clientHeight)
  const next = {
    canScrollDown: maxScrollTop - el.scrollTop > 1,
    canScrollUp: el.scrollTop > 1,
  }
  if (
    scrollState.value.canScrollDown !== next.canScrollDown ||
    scrollState.value.canScrollUp !== next.canScrollUp
  ) {
    scrollState.value = next
  }
}

const updateScrollState = () => {
  if (frameId !== null) return
  frameId = window.requestAnimationFrame(commitScrollState)
}

const setupScrollListeners = () => {
  const el = bodyRef.value
  if (!props.open || !props.scroll || !el) {
    scrollState.value = { canScrollDown: false, canScrollUp: false }
    return
  }

  updateScrollState()
  el.addEventListener('scroll', updateScrollState, { passive: true })
  window.addEventListener('resize', updateScrollState)

  const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(updateScrollState)
  observer?.observe(el)
  Array.from(el.children).forEach((child) => observer?.observe(child))

  scrollCleanup = () => {
    if (frameId !== null) window.cancelAnimationFrame(frameId)
    el.removeEventListener('scroll', updateScrollState)
    window.removeEventListener('resize', updateScrollState)
    observer?.disconnect()
  }
}

const teardownScrollListeners = () => {
  if (scrollCleanup) {
    scrollCleanup()
    scrollCleanup = null
  }
}

onMounted(() => {
  setupScrollListeners()
})

onUnmounted(() => {
  teardownScrollListeners()
})

watch(
  () => [props.open, props.scroll, props.size],
  () => {
    teardownScrollListeners()
    setupScrollListeners()
  }
)

const handleBodyKeyDown = (event) => {
  if (!props.scroll || event.target !== event.currentTarget) return
  const el = bodyRef.value
  if (!el) return
  const pageStep = Math.max(48, el.clientHeight * 0.82)
  if (event.key === 'PageDown' || event.key === ' ') {
    event.preventDefault()
    el.scrollBy({ behavior: 'smooth', top: pageStep })
  }
  if (event.key === 'PageUp') {
    event.preventDefault()
    el.scrollBy({ behavior: 'smooth', top: -pageStep })
  }
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    el.scrollBy({ behavior: 'smooth', top: 40 })
  }
  if (event.key === 'ArrowUp') {
    event.preventDefault()
    el.scrollBy({ behavior: 'smooth', top: -40 })
  }
  if (event.key === 'End') {
    event.preventDefault()
    el.scrollTo({ behavior: 'smooth', top: el.scrollHeight })
  }
  if (event.key === 'Home') {
    event.preventDefault()
    el.scrollTo({ behavior: 'smooth', top: 0 })
  }
}

const handleAction1Click = (event) => {
  props.onAction1?.()
  event.currentTarget.closest('dialog')?.close('action1')
}

const handleAction2Click = (event) => {
  props.onAction2?.()
  event.currentTarget.closest('dialog')?.close('action2')
}

const handleCloseClick = () => {
  props.onDismiss?.()
}

const dialogClasses = computed(() =>
  ['sg-ds-library-scope', 'dialog', attrs.class].filter(Boolean).join(' ')
)
</script>

<template>
  <div aria-hidden="true" class="sg-ds-library-scope dialog-backdrop" v-if="props.open && props.floating && props.dimmed" />
  <dialog
    v-bind="{ ...attrs, class: undefined }"
    :class="dialogClasses"
    :aria-describedby="props.description ? descriptionId : undefined"
    :aria-labelledby="props.title ? titleId : undefined"
    :data-align="props.align"
    :data-bordered="props.bordered || undefined"
    :data-can-scroll-down="(props.scroll && scrollState.canScrollDown) || undefined"
    :data-can-scroll-up="(props.scroll && scrollState.canScrollUp) || undefined"
    :data-dimmed="props.dimmed"
    :data-floating="props.floating"
    :data-scroll="props.scroll || undefined"
    :data-size="props.size"
    :open="props.open"
  >
    <!-- Header -->
    <header class="sg-ds-library-scope dialog-header">
      <slot name="header">
        <Text v-if="props.title" as="h2" class="dialog-title" variant="heading-3" :id="titleId">{{ props.title }}</Text>
        <Text v-if="props.description" as="p" class="dialog-description" tone="secondary" variant="caption" :id="descriptionId">{{ props.description }}</Text>
        <button
          v-if="props.showClose"
          aria-label="Close dialog"
          class="sg-ds-library-scope dialog-close"
          type="button"
          @click="handleCloseClick"
        >
          <Icon name="x" size="1em" />
        </button>
      </slot>
    </header>

    <!-- Body -->
    <div
      ref="bodyRef"
      class="sg-ds-library-scope dialog-body"
      :data-scroll="props.scroll || undefined"
      :tabindex="props.scroll ? 0 : undefined"
      @keydown="props.scroll ? handleBodyKeyDown : undefined"
    >
      <slot />
    </div>

    <!-- Footer -->
    <footer
      v-if="hasAction1 || hasAction2"
      class="sg-ds-library-scope dialog-footer"
      :data-layout="props.footerButtonLayout"
    >
      <Button
        v-if="hasAction1"
        :leading-icon="props.action1Icon"
        :size="actionButtonSize"
        :variant="props.action1Variant"
        @click="handleAction1Click"
      >{{ props.action1Label }}</Button>
      <Button
        v-if="hasAction2"
        :leading-icon="props.action2Icon"
        :size="actionButtonSize"
        :variant="props.action2Variant"
        @click="handleAction2Click"
      >{{ props.action2Label }}</Button>
    </footer>
  </dialog>
</template>
