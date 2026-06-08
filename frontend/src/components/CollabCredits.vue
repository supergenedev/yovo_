<script setup>
import { computed, useAttrs } from 'vue'
import Avatar from './Avatar.vue'
import Icon from './Icon.vue'

const attrs = useAttrs()

const props = defineProps({
  ariaLabel: { default: 'Collaborators' },
  avatarTone: { default: undefined },
  credit: { default: undefined },
  initials: { default: undefined },
  items: { default: undefined },
  name: { default: undefined },
  role: { default: undefined },
  title: { default: 'Collaborators' },
  verified: { default: undefined },
})

const DEFAULT_ITEMS = [
  { avatarTone: 'brand', credit: '+820 crd', initials: 'HL', name: 'Hailey Luna', role: 'VOICE', verified: true },
  { avatarTone: 'teal', credit: '+420 crd', initials: 'NV', name: 'NeoVoice', role: 'AI', verified: true },
  { avatarTone: 'amber', credit: '+260 crd', initials: 'KO', name: 'Koda', role: 'MIX', verified: false },
]

function getInitials(name) {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || '?'
  )
}

const renderedItems = computed(() => {
  const hasSingleItemProps = [
    props.avatarTone,
    props.credit,
    props.initials,
    props.name,
    props.role,
    props.verified,
  ].some((value) => value !== undefined)

  if (hasSingleItemProps) {
    return [
      {
        avatarTone: props.avatarTone,
        credit: props.credit,
        initials: props.initials,
        name: props.name ?? 'Hailey Luna',
        role: props.role ?? 'VOICE',
        verified: props.verified,
      },
    ]
  }
  return props.items ?? DEFAULT_ITEMS
})

const classes = computed(() =>
  ['sg-ds-library-scope', 'collab-credits-section', attrs.class].filter(Boolean).join(' ')
)
</script>

<template>
  <section v-bind="{ ...$attrs, class: undefined }" :class="classes">
    <h3 v-if="props.title" class="collab-credits-title">{{ props.title }}</h3>
    <ul :aria-label="props.ariaLabel" class="collab-credits">
      <slot>
        <li
          v-for="item in renderedItems"
          :key="`${item.role}-${item.name}`"
          class="collab-credits-row"
        >
          <Avatar
            size="xs"
            :tone="item.avatarTone ?? 'neutral'"
            :initials="item.initials ?? getInitials(item.name)"
          />
          <span class="collab-credits-identity">
            <span class="collab-credits-name">
              {{ item.name }}
              <span v-if="item.verified" class="collab-credits-verified" aria-label="Verified">
                <Icon name="badge-check" size="1em" />
              </span>
            </span>
            <span class="collab-credits-role">{{ item.role }}</span>
          </span>
          <span v-if="item.credit" class="collab-credits-credit">{{ item.credit }}</span>
        </li>
      </slot>
    </ul>
  </section>
</template>
