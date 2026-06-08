<script setup>
import { computed, useAttrs } from 'vue'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const props = defineProps({
  background: { default: 'default' },
  eyebrow: { default: '' },
  meta: { default: '' },
  title: { default: '' },
  variant: { default: 'neutral' },
})

const classes = computed(() =>
  ['sg-ds-library-scope', 'audio-frame', attrs.class].filter(Boolean).join(' ')
)

const hasHeader = computed(() =>
  Boolean(props.eyebrow || props.title || props.meta)
)
</script>

<template>
  <section
    v-bind="{ ...attrs, class: undefined }"
    :class="classes"
    :data-background="props.background !== 'default' && props.background !== 'auto' ? props.background : undefined"
    :data-variant="props.variant !== 'neutral' ? props.variant : undefined"
  >
    <header v-if="hasHeader || $slots.action" class="audio-frame-head">
      <div class="audio-frame-copy">
        <span v-if="props.eyebrow" class="audio-frame-eyebrow">{{ props.eyebrow }}</span>
        <strong v-if="props.title" class="audio-frame-title">{{ props.title }}</strong>
        <span v-if="props.meta" class="audio-frame-meta">{{ props.meta }}</span>
      </div>
      <div v-if="$slots.action" class="audio-frame-action">
        <slot name="action" />
      </div>
    </header>
    <div v-if="$slots.default" class="audio-frame-body">
      <slot />
    </div>
    <footer v-if="$slots.footer" class="audio-frame-footer">
      <slot name="footer" />
    </footer>
  </section>
</template>
