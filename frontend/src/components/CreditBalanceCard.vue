<script setup>
import { computed, useAttrs } from 'vue'
import Button from './Button.vue'
import Text from './Text.vue'

const attrs = useAttrs()

const props = defineProps({
  action1Label: { default: 'Top up' },
  action1Variant: { default: 'primary' },
  action2Label: { default: 'History' },
  action2Variant: { default: 'secondary' },
  balance: { default: '2,480' },
  eyebrow: { default: 'Credit balance' },
  rows: { default: null },
  showActions: { default: true },
  showRows: { default: true },
  unit: { default: 'CRD' },
})

const resolvedRows = computed(() =>
  props.rows ?? [
    { delta: '+18%', deltaTone: 'positive', label: 'This month', value: '1,240' },
    { label: 'Pending', value: '320' },
  ]
)

const classes = computed(() =>
  ['sg-ds-library-scope', 'credit-balance-card', attrs.class].filter(Boolean).join(' ')
)
</script>

<template>
  <div v-bind="{ ...$attrs, class: undefined }" :class="classes">
    <Text v-if="props.eyebrow" as="div" class="credit-balance-card-eyebrow" tone="tertiary" variant="eyebrow">
      {{ props.eyebrow }}
    </Text>

    <slot name="balance">
      <div :class="['sg-ds-library-scope', 'credit-balance-card-balance'].join(' ')">
        {{ props.balance }}
        <Text v-if="props.unit" as="span" class="credit-balance-card-unit" tone="secondary" variant="caption">
          {{ props.unit }}
        </Text>
      </div>
    </slot>

    <slot name="rows">
      <ul v-if="props.showRows && resolvedRows.length > 0" class="credit-balance-card-rows">
        <li
          v-for="(row, index) in resolvedRows"
          :key="`${row.label}-${index}`"
          class="sg-ds-library-scope credit-balance-card-row"
        >
          <Text as="span" tone="secondary" variant="ui-sm">{{ row.label }}</Text>
          <span>
            <Text as="strong" variant="ui" weight="semibold">{{ row.value }}</Text>
            <span
              v-if="row.delta"
              class="credit-balance-card-delta"
              :data-tone="row.deltaTone ?? 'positive'"
            >{{ row.delta }}</span>
          </span>
        </li>
      </ul>
    </slot>

    <div v-if="props.showActions" class="credit-balance-card-actions">
      <slot name="actions">
        <Button v-if="props.action1Label" size="sm" :variant="props.action1Variant">{{ props.action1Label }}</Button>
        <Button v-if="props.action2Label" size="sm" :variant="props.action2Variant">{{ props.action2Label }}</Button>
      </slot>
    </div>

    <slot />
  </div>
</template>
