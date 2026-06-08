<script setup>
import { computed, useAttrs } from 'vue'
import Button from './Button.vue'
import Icon from './Icon.vue'
import Text from './Text.vue'

const attrs = useAttrs()

const props = defineProps({
  action1Icon: { default: '' },
  action1IconPosition: { default: 'trailing' },
  action1Label: { default: '' },
  action1Variant: { default: 'soft' },
  action2Icon: { default: '' },
  action2IconPosition: { default: 'trailing' },
  action2Label: { default: '' },
  action2Variant: { default: 'soft' },
  actionSize: { default: 'sm' },
  align: { default: 'start' },
  as: { default: 'header' },
  icon: { default: 'sparkles' },
  iconAction1Icon: { default: '' },
  iconAction1Label: { default: '' },
  iconAction2Icon: { default: '' },
  iconAction2Label: { default: '' },
  iconActionVariant: { default: 'soft' },
  iconColor: { default: '' },
  iconColorToken: { default: '' },
  iconColorTokenCollection: { default: '' },
  iconLabel: { default: '' },
  iconTone: { default: 'brand' },
  showIcon: { default: true },
  subtitle: { default: '' },
  subtitleTone: { default: 'tertiary' },
  subtitleVariant: { default: 'body-sm' },
  title: { default: '섹션 타이틀' },
  titleAs: { default: 'h3' },
  titleVariant: { default: 'heading-3' },
  titleWeight: { default: 'bold' },
  wrapActions: { default: true },
})

defineOptions({ inheritAttrs: false })

const showMainIcon = computed(() => props.showIcon && Boolean(props.icon))
const hasTitle = computed(() => props.title !== null && props.title !== undefined && props.title !== '')
const hasSubtitle = computed(() => props.subtitle !== null && props.subtitle !== undefined && props.subtitle !== '')
const hasTextAction1 = computed(() => Boolean(props.action1Label))
const hasTextAction2 = computed(() => Boolean(props.action2Label))
const hasIconAction1 = computed(() => Boolean(props.iconAction1Icon && props.iconAction1Label))
const hasIconAction2 = computed(() => Boolean(props.iconAction2Icon && props.iconAction2Label))
const hasActions = computed(() => hasTextAction1.value || hasTextAction2.value || hasIconAction1.value || hasIconAction2.value)

const resolvedIconColor = computed(() => {
  const collection = props.iconColorTokenCollection?.trim()
  const token = props.iconColorToken?.trim()
  return (collection && token) ? `var(--ds-token-${collection}-${token})` : props.iconColor
})

const iconStyle = computed(() => resolvedIconColor.value
  ? { '--c-section-title-icon-color': resolvedIconColor.value }
  : undefined
)

const classes = computed(() =>
  ['sg-ds-library-scope', 'section-title', attrs.class].filter(Boolean).join(' ')
)
</script>

<template>
  <component
    :is="props.as"
    v-bind="{ ...$attrs, class: undefined }"
    :class="classes"
    :data-align="props.align"
    :data-custom-actions="$slots.default ? true : undefined"
    :data-wrap-actions="props.wrapActions ? true : undefined"
  >
    <div class="section-title-copy">
      <div class="section-title-main">
        <span
          v-if="showMainIcon"
          :aria-hidden="props.iconLabel ? undefined : true"
          :aria-label="props.iconLabel || undefined"
          class="section-title-icon"
          :data-tone="props.iconTone"
          :role="props.iconLabel ? 'img' : undefined"
          :style="iconStyle"
        >
          <Icon :name="props.icon" size="1em" />
        </span>
        <Text
          v-if="hasTitle"
          :as="props.titleAs"
          class="section-title-heading"
          :variant="props.titleVariant"
          :weight="props.titleWeight"
        >
          {{ props.title }}
        </Text>
      </div>
      <Text
        v-if="hasSubtitle"
        as="span"
        class="section-title-subtitle"
        :tone="props.subtitleTone"
        :variant="props.subtitleVariant"
      >
        {{ props.subtitle }}
      </Text>
    </div>

    <div v-if="$slots.default" class="section-title-groups">
      <slot />
    </div>
    <div v-else-if="hasActions" class="section-title-actions">
      <Button
        v-if="hasTextAction1"
        :leading-icon="props.action1IconPosition === 'leading' ? props.action1Icon : undefined"
        :size="props.actionSize"
        :trailing-icon="props.action1IconPosition === 'trailing' ? props.action1Icon : undefined"
        :variant="props.action1Variant"
      >
        {{ props.action1Label }}
      </Button>
      <Button
        v-if="hasTextAction2"
        :leading-icon="props.action2IconPosition === 'leading' ? props.action2Icon : undefined"
        :size="props.actionSize"
        :trailing-icon="props.action2IconPosition === 'trailing' ? props.action2Icon : undefined"
        :variant="props.action2Variant"
      >
        {{ props.action2Label }}
      </Button>
      <Button
        v-if="hasIconAction1"
        :aria-label="props.iconAction1Label"
        :icon-only="true"
        :leading-icon="props.iconAction1Icon"
        shape="pill"
        :size="props.actionSize"
        :variant="props.iconActionVariant"
      />
      <Button
        v-if="hasIconAction2"
        :aria-label="props.iconAction2Label"
        :icon-only="true"
        :leading-icon="props.iconAction2Icon"
        shape="pill"
        :size="props.actionSize"
        :variant="props.iconActionVariant"
      />
    </div>
  </component>
</template>
