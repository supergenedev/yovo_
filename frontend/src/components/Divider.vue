<script setup>
import { computed, useAttrs } from 'vue'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const props = defineProps({
  label: { default: null },
  orientation: { default: 'horizontal' },
  variant: { default: 'solid' },
  inset: { default: 'none' },
  labelPosition: { default: 'center' },
})

const classes = computed(() =>
  ['sg-ds-library-scope', 'divider', attrs.class].filter(Boolean).join(' ')
)

const labeledClasses = computed(() =>
  ['sg-ds-library-scope', 'divider-labeled', attrs.class].filter(Boolean).join(' ')
)

const dataOrientation = computed(() =>
  props.orientation !== 'horizontal' ? props.orientation : undefined
)

const dataVariant = computed(() =>
  props.variant !== 'solid' ? props.variant : undefined
)

const dataInset = computed(() =>
  props.inset !== 'none' ? props.inset : undefined
)

const dataLabelPosition = computed(() =>
  props.labelPosition !== 'center' ? props.labelPosition : undefined
)

const attrsWithoutClass = computed(() => {
  const { class: _, ...rest } = attrs
  return rest
})
</script>

<template>
  <div
    v-if="props.label != null && props.orientation === 'horizontal'"
    v-bind="attrsWithoutClass"
    :class="labeledClasses"
    role="separator"
    :data-label-position="dataLabelPosition"
    :data-orientation="dataOrientation"
    :data-variant="dataVariant"
    :data-inset="dataInset"
  >
    <span class="divider-label">{{ props.label }}</span>
  </div>

  <div
    v-else-if="props.orientation === 'vertical'"
    v-bind="attrsWithoutClass"
    :class="classes"
    role="separator"
    aria-orientation="vertical"
    :data-orientation="dataOrientation"
    :data-variant="dataVariant"
    :data-inset="dataInset"
  />

  <hr
    v-else
    v-bind="attrsWithoutClass"
    :class="classes"
    :data-orientation="dataOrientation"
    :data-variant="dataVariant"
    :data-inset="dataInset"
  />
</template>
