<script setup>
import { computed, useAttrs, useSlots } from 'vue'
import UserBlock from './UserBlock.vue'
import CreditBalanceCard from './CreditBalanceCard.vue'

const attrs = useAttrs()
const slots = useSlots()

const props = defineProps({
  // Identity props (passed down to UserBlock)
  action1AriaLabel: { default: undefined },
  action1Icon: { default: undefined },
  action1Label: { default: undefined },
  action1Variant: { default: undefined },
  action2AriaLabel: { default: undefined },
  action2Icon: { default: undefined },
  action2Label: { default: undefined },
  action2Variant: { default: undefined },
  action3AriaLabel: { default: undefined },
  action3Icon: { default: undefined },
  action3Label: { default: undefined },
  action3Variant: { default: undefined },
  avatarAlt: { default: undefined },
  avatarQuietStatus: { default: undefined },
  avatarShape: { default: undefined },
  avatarSize: { default: undefined },
  avatarSrc: { default: undefined },
  avatarStatus: { default: undefined },
  avatarStatusLabel: { default: undefined },
  avatarTone: { default: undefined },
  direction: { default: undefined },
  initials: { default: 'HL' },
  meta: { default: 'Creator · live now' },
  name: { default: 'Hailey Luna' },
  size: { default: undefined },
  verified: { default: true },
  // Card-level props
  tint: { default: 'sunken' },
  variant: { default: 'solid' },
})

const classes = computed(() =>
  ['sg-ds-library-scope', 'card', 'user-card', attrs.class].filter(Boolean).join(' ')
)

const headClasses = computed(() =>
  ['sg-ds-library-scope', 'user-card-head'].filter(Boolean).join(' ')
)

// Build identity props to pass to UserBlock, omitting undefined values
const identityProps = computed(() => {
  const raw = {
    action1AriaLabel: props.action1AriaLabel,
    action1Icon: props.action1Icon,
    action1Label: props.action1Label,
    action1Variant: props.action1Variant,
    action2AriaLabel: props.action2AriaLabel,
    action2Icon: props.action2Icon,
    action2Label: props.action2Label,
    action2Variant: props.action2Variant,
    action3AriaLabel: props.action3AriaLabel,
    action3Icon: props.action3Icon,
    action3Label: props.action3Label,
    action3Variant: props.action3Variant,
    avatarAlt: props.avatarAlt,
    avatarQuietStatus: props.avatarQuietStatus,
    avatarShape: props.avatarShape,
    avatarSize: props.avatarSize,
    avatarSrc: props.avatarSrc,
    avatarStatus: props.avatarStatus,
    avatarStatusLabel: props.avatarStatusLabel,
    avatarTone: props.avatarTone,
    direction: props.direction,
    initials: props.initials,
    meta: props.meta,
    name: props.name,
    size: props.size,
    verified: props.verified,
  }
  return Object.fromEntries(Object.entries(raw).filter(([, v]) => v !== undefined))
})

// Omit "more" action3 props from head's UserBlock
const headUserBlockProps = computed(() => {
  const action3Icon = typeof identityProps.value.action3Icon === 'string'
    ? identityProps.value.action3Icon.trim()
    : ''
  const isMoreAction = ['ellipsis', 'ellipsis-vertical', 'more-horizontal', 'more-vertical'].includes(action3Icon)
  if (!isMoreAction) return identityProps.value
  const { action3AriaLabel, action3Icon: _icon, action3Label, action3Variant, ...rest } = identityProps.value
  return rest
})
</script>

<template>
  <article
    v-bind="{ ...$attrs, class: undefined }"
    :class="classes"
    :data-variant="props.variant"
  >
    <slot>
      <!-- Default layout when no slot content is provided -->
      <!-- Head section -->
      <header :class="headClasses">
        <slot name="head">
          <UserBlock
            :initials="headUserBlockProps.initials ?? 'HL'"
            :meta="headUserBlockProps.meta ?? 'Creator'"
            :name="headUserBlockProps.name ?? 'Hailey Luna'"
            :verified="headUserBlockProps.verified ?? true"
            v-bind="headUserBlockProps"
          />
        </slot>
      </header>

      <!-- Stats section (default tint) -->
      <section
        class="sg-ds-library-scope user-card-section"
        :data-tint="undefined"
      >
        <slot name="stats">
          <dl class="sg-ds-library-scope user-card-stats">
            <slot name="stats-items">
              <div class="sg-ds-library-scope user-card-stat">
                <dd class="user-card-stat-value">128</dd>
                <dt class="user-card-stat-label">포스트</dt>
              </div>
              <div class="sg-ds-library-scope user-card-stat">
                <dd class="user-card-stat-value">12.4K</dd>
                <dt class="user-card-stat-label">팔로워</dt>
              </div>
              <div class="sg-ds-library-scope user-card-stat">
                <dd class="user-card-stat-value">384</dd>
                <dt class="user-card-stat-label">팔로잉</dt>
              </div>
            </slot>
          </dl>
        </slot>
      </section>

      <!-- Section slot (tinted) -->
      <section
        class="sg-ds-library-scope user-card-section"
        :data-tint="props.tint !== 'default' ? props.tint : undefined"
      >
        <slot name="section">
          <CreditBalanceCard />
        </slot>
      </section>
    </slot>
  </article>
</template>
