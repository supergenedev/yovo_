<script setup>
import { ref, watch, onMounted, onUnmounted, computed, useAttrs, useSlots, nextTick } from 'vue'
import Button from './Button.vue'
import PopoverItem from './PopoverItem.vue'
import PopoverList from './PopoverList.vue'

const attrs = useAttrs()
const slots = useSlots()

const props = defineProps({
  arrow: { type: Boolean, default: false },
  buttonAriaLabel: { type: String, default: undefined },
  buttonLabel: { type: String, default: '메뉴' },
  buttonShape: { type: String, default: 'default' },
  buttonSize: { type: String, default: 'sm' },
  buttonVariant: { type: String, default: 'soft' },
  closeOnItemClick: { type: Boolean, default: true },
  defaultOpen: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  fullWidth: { type: Boolean, default: false },
  iconOnly: { type: Boolean, default: false },
  leadingIcon: { type: String, default: undefined },
  placement: { type: String, default: 'bottom-end' },
  popoverId: { type: String, default: undefined },
  trailingIcon: { type: String, default: 'chevron-down' },
})

const emit = defineEmits(['openChange'])

const rootRef = ref(null)
const panelRef = ref(null)
const open = ref(props.defaultOpen)

let generatedIdCounter = Math.random().toString(36).slice(2, 9)
const resolvedPopoverId = computed(() =>
  props.popoverId || `sg-ds-button-popover-${generatedIdCounter}`
)

const classes = computed(() =>
  ['sg-ds-library-scope', 'button-popover', attrs.class].filter(Boolean).join(' ')
)

watch(() => props.defaultOpen, (val) => {
  open.value = val
})

const BUTTON_POPOVER_OFFSET_FALLBACK = 8
const BUTTON_POPOVER_VIEWPORT_MARGIN = 4

function isElementTarget(target) {
  return target instanceof Element
}

function positionButtonPopoverPanel(trigger, panel, placement) {
  const t = trigger.getBoundingClientRect()
  const p = panel.getBoundingClientRect()
  const panelWidth = p.width
  const panelHeight = p.height
  const viewportWidth = document.documentElement.clientWidth
  const viewportHeight = document.documentElement.clientHeight
  const margin = BUTTON_POPOVER_VIEWPORT_MARGIN
  const offsetRaw = parseFloat(getComputedStyle(panel).getPropertyValue('--c-popover-offset'))
  const offset = Number.isFinite(offsetRaw) ? offsetRaw : BUTTON_POPOVER_OFFSET_FALLBACK

  const [requestedSide, align] = placement.split('-')
  let side = requestedSide

  if (side === 'bottom' && t.bottom + offset + panelHeight > viewportHeight && t.top - offset - panelHeight >= 0) {
    side = 'top'
  } else if (side === 'top' && t.top - offset - panelHeight < 0 && t.bottom + offset + panelHeight <= viewportHeight) {
    side = 'bottom'
  } else if (side === 'right' && t.right + offset + panelWidth > viewportWidth && t.left - offset - panelWidth >= 0) {
    side = 'left'
  } else if (side === 'left' && t.left - offset - panelWidth < 0 && t.right + offset + panelWidth <= viewportWidth) {
    side = 'right'
  }

  let top = 0
  let left = 0
  if (side === 'bottom' || side === 'top') {
    top = side === 'bottom' ? t.bottom + offset : t.top - offset - panelHeight
    if (align === 'start') left = t.left
    else if (align === 'end') left = t.right - panelWidth
    else left = t.left + t.width / 2 - panelWidth / 2
  } else {
    left = side === 'right' ? t.right + offset : t.left - offset - panelWidth
    if (align === 'start') top = t.top
    else if (align === 'end') top = t.bottom - panelHeight
    else top = t.top + t.height / 2 - panelHeight / 2
  }

  left = Math.min(Math.max(margin, left), Math.max(margin, viewportWidth - panelWidth - margin))
  top = Math.min(Math.max(margin, top), Math.max(margin, viewportHeight - panelHeight - margin))

  panel.style.left = `${Math.round(left)}px`
  panel.style.top = `${Math.round(top)}px`
}

let rafId = null
let scrollHandler = null
let resizeHandler = null

function cleanupPositionListeners() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler, true)
    scrollHandler = null
  }
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
    resizeHandler = null
  }
}

watch(open, async (isOpen) => {
  cleanupPositionListeners()

  const panel = panelRef.value
  if (!panel) return

  const supportsPopover = typeof panel.showPopover === 'function'

  if (!isOpen) {
    if (supportsPopover && panel.matches(':popover-open')) {
      const activeEl = panel.ownerDocument.activeElement
      if (activeEl && panel.contains(activeEl)) {
        rootRef.value?.querySelector('button')?.focus({ preventScroll: true })
      }
      try { panel.hidePopover() } catch { /* already closed */ }
    }
    return
  }

  if (supportsPopover && !panel.matches(':popover-open')) {
    try { panel.showPopover() } catch { /* already open */ }
  }

  await nextTick()

  const reposition = () => {
    const root = rootRef.value
    if (root && panelRef.value) positionButtonPopoverPanel(root, panelRef.value, props.placement)
  }
  reposition()
  rafId = requestAnimationFrame(reposition)

  scrollHandler = reposition
  resizeHandler = reposition
  window.addEventListener('scroll', scrollHandler, true)
  window.addEventListener('resize', resizeHandler)
})

let pointerDownHandler = null
let keyDownHandler = null

watch(open, (isOpen) => {
  if (pointerDownHandler) {
    document.removeEventListener('pointerdown', pointerDownHandler)
    pointerDownHandler = null
  }
  if (keyDownHandler) {
    document.removeEventListener('keydown', keyDownHandler)
    keyDownHandler = null
  }

  if (!isOpen) return

  pointerDownHandler = (event) => {
    const root = rootRef.value
    if (!root || root.contains(event.target)) return
    setOpen(false)
  }
  keyDownHandler = (event) => {
    if (event.key !== 'Escape') return
    setOpen(false)
    rootRef.value?.querySelector('button')?.focus({ preventScroll: true })
  }

  document.addEventListener('pointerdown', pointerDownHandler)
  document.addEventListener('keydown', keyDownHandler)
})

onUnmounted(() => {
  cleanupPositionListeners()
  if (pointerDownHandler) document.removeEventListener('pointerdown', pointerDownHandler)
  if (keyDownHandler) document.removeEventListener('keydown', keyDownHandler)
})

function setOpen(nextOpen) {
  open.value = nextOpen
  emit('openChange', nextOpen)
}

function handleTriggerClick() {
  if (props.disabled) return
  setOpen(!open.value)
}

function handlePanelClick(event) {
  if (!props.closeOnItemClick || !isElementTarget(event.target)) return
  if (event.target.closest('.popover-item')) setOpen(false)
}
</script>

<template>
  <div
    v-bind="{ ...$attrs, class: undefined }"
    :class="classes"
    :data-full-width="props.fullWidth ? 'true' : undefined"
    :data-open="open ? 'true' : undefined"
    :data-placement="props.placement"
    ref="rootRef"
  >
    <Button
      :aria-controls="resolvedPopoverId"
      :aria-expanded="open"
      aria-haspopup="menu"
      :aria-label="props.buttonAriaLabel || (props.iconOnly && typeof props.buttonLabel === 'string' ? props.buttonLabel : undefined)"
      :disabled="props.disabled"
      :iconOnly="props.iconOnly"
      :leadingIcon="props.leadingIcon"
      :shape="props.buttonShape"
      :size="props.buttonSize"
      :trailingIcon="props.iconOnly ? undefined : props.trailingIcon"
      :variant="props.buttonVariant"
      @click="handleTriggerClick"
    >
      {{ props.buttonLabel }}
    </Button>
    <div
      class="sg-ds-library-scope popover button-popover-panel"
      :data-placement="props.placement"
      :id="resolvedPopoverId"
      popover="manual"
      ref="panelRef"
      @click="handlePanelClick"
    >
      <slot>
        <PopoverList>
          <PopoverItem icon="list-filter">필터 적용</PopoverItem>
          <PopoverItem icon="arrow-down-up">정렬 변경</PopoverItem>
          <PopoverItem icon="settings">표시 설정</PopoverItem>
        </PopoverList>
      </slot>
      <span v-if="props.arrow" class="popover-arrow" aria-hidden="true" />
    </div>
  </div>
</template>
