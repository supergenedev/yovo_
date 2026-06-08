<script setup>
import { computed, useAttrs } from 'vue'
import Avatar from './Avatar.vue'
import Button from './Button.vue'
import Icon from './Icon.vue'
import Media from './Media.vue'
import Text from './Text.vue'

const attrs = useAttrs()

const props = defineProps({
  avatarAlt: { default: '' },
  avatarInitials: { default: 'M' },
  avatarShape: { default: 'circle' },
  avatarSize: { default: '2xl' },
  avatarSrc: { default: '' },
  avatarTone: { default: 'coral' },
  eyebrow: { default: '스포트라이트' },
  mediaSrc: { default: '' },
  mediaWidth: { default: '60%' },
  meta: { default: '단편영화 전문 스튜디오' },
  name: { default: 'MIKO Studio' },
  primaryActionIcon: { default: 'lock-open' },
  primaryActionLabel: { default: '구독 · ⓒ 3,900/월' },
  secondaryActionIcon: { default: 'plus' },
  secondaryActionLabel: { default: '팔로우' },
  stat1: { default: '219K 팔로워' },
  stat2: { default: '92 작품' },
  stat3: { default: '+18.2% 지난 30일' },
  verified: { default: true },
})

function formatCssDimension(value) {
  if (typeof value === 'number') return Number.isFinite(value) ? `${value}px` : null
  const trimmed = value?.trim()
  return trimmed || null
}

const mediaWidthCss = computed(() => formatCssDimension(props.mediaWidth))
const hasMedia = computed(() => Boolean(props.mediaSrc))
const hasStats = computed(() => Boolean(props.stat1 || props.stat2 || props.stat3))
const hasActions = computed(() => Boolean(props.primaryActionLabel || props.secondaryActionLabel))

const rootStyle = computed(() => {
  const style = attrs.style ? { ...attrs.style } : {}
  if (mediaWidthCss.value) {
    style['--c-creator-spotlight-media-width'] = mediaWidthCss.value
  }
  return style
})

const classes = computed(() =>
  ['sg-ds-library-scope', 'creator-spotlight', attrs.class].filter(Boolean).join(' ')
)
</script>

<template>
  <section
    v-bind="{ ...$attrs, class: undefined, style: undefined }"
    :class="classes"
    :style="rootStyle"
    :data-has-media="hasMedia ? 'true' : undefined"
  >
    <Media
      v-if="hasMedia"
      aria-hidden="true"
      aspect-ratio="16 / 9"
      background-position="right"
      class="creator-spotlight-media"
      fit="cover"
      overlay="accent"
      overlay-color="var(--s-brand-bg)"
      overlay-mask="fade"
      :overlay-mask-angle="100"
      :overlay-mask-end="60"
      :overlay-mask-start="5"
      rounded="md"
      :src="props.mediaSrc"
    />
    <div class="creator-spotlight-content">
      <Text
        v-if="props.eyebrow"
        as="p"
        class="creator-spotlight-eyebrow"
        tone="inverse"
        variant="body-sm"
      >{{ props.eyebrow }}</Text>
      <Avatar
        :alt="props.avatarAlt"
        class="creator-spotlight-avatar"
        :initials="props.avatarInitials"
        :shape="props.avatarShape"
        :size="props.avatarSize"
        :src="props.avatarSrc"
        :tone="props.avatarTone"
      />
      <div class="creator-spotlight-identity">
        <div class="creator-spotlight-name-row">
          <Text as="h2" class="creator-spotlight-name" tone="inverse" variant="heading-2" weight="bold">{{ props.name }}</Text>
          <Icon
            v-if="props.verified"
            class="creator-spotlight-verified"
            color="var(--s-text-inverse)"
            name="badge-check"
            size="22px"
          />
        </div>
        <Text
          v-if="props.meta"
          as="p"
          class="creator-spotlight-meta"
          tone="inverse"
          variant="body"
        >{{ props.meta }}</Text>
      </div>
      <div v-if="hasStats" class="creator-spotlight-stats">
        <Text
          v-if="props.stat1"
          as="span"
          class="creator-spotlight-stat"
          tone="inverse"
          variant="body-sm"
          weight="semibold"
        >{{ props.stat1 }}</Text>
        <Text
          v-if="props.stat2"
          as="span"
          class="creator-spotlight-stat"
          tone="inverse"
          variant="body-sm"
          weight="semibold"
        >{{ props.stat2 }}</Text>
        <Text
          v-if="props.stat3"
          as="span"
          class="creator-spotlight-stat"
          tone="inverse"
          variant="body-sm"
          weight="semibold"
        >{{ props.stat3 }}</Text>
      </div>
      <div v-if="hasActions" class="creator-spotlight-actions">
        <Button
          v-if="props.primaryActionLabel"
          :leading-icon="props.primaryActionIcon || undefined"
          shape="pill"
          size="md"
          variant="secondary"
        >{{ props.primaryActionLabel }}</Button>
        <Button
          v-if="props.secondaryActionLabel"
          :leading-icon="props.secondaryActionIcon || undefined"
          shape="pill"
          size="md"
          variant="secondary"
        >{{ props.secondaryActionLabel }}</Button>
      </div>
    </div>
  </section>
</template>
