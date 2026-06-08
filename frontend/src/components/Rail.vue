<script setup>
import { computed, useAttrs } from 'vue'
import Divider from './Divider.vue'
import FollowRow from './FollowRow.vue'
import Icon from './Icon.vue'
import Link from './Link.vue'
import NavItem from './NavItem.vue'
import RailFooter from './RailFooter.vue'
import RailGroup from './RailGroup.vue'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const props = defineProps({
  activeItem: { default: 'home' },
  brand: { default: 'StudioGrid' },
  collapsed: { default: false },
  footerPrimaryLabel: { default: 'Dark mode' },
  footerSecondaryLabel: { default: 'Settings' },
  showFollowing: { default: true },
  showFooter: { default: true },
  size: { default: 'default' },
  subtitle: { default: 'Creator studio' },
})

const ariaLabel = computed(() => attrs['aria-label'] ?? `${props.brand} navigation`)

const classes = computed(() =>
  ['sg-ds-library-scope', 'app-rail', attrs.class].filter(Boolean).join(' ')
)
</script>

<template>
  <aside
    v-bind="{ ...attrs, class: undefined }"
    :aria-label="ariaLabel"
    :class="classes"
    :data-collapsed="props.collapsed || undefined"
    :data-size="props.size !== 'default' ? props.size : undefined"
  >
    <slot>
      <header class="rail-head">
        <div class="rail-brand" :aria-label="props.brand">
          <span class="rail-brand-mark" aria-hidden="true">
            <Icon name="sparkles" size="1em" />
          </span>
          <span class="rail-brand-text">
            <span class="rail-brand-name">{{ props.brand }}</span>
            <span v-if="props.subtitle" class="rail-brand-subtitle">{{ props.subtitle }}</span>
          </span>
        </div>
      </header>

      <div class="rail-body">
        <RailGroup aria-label="Primary">
          <NavItem :current="props.activeItem === 'home'" icon="house" label="Home" variant="rail" />
          <NavItem :current="props.activeItem === 'live'" icon="radio" label="Live" tail="12" variant="rail" />
          <NavItem :current="props.activeItem === 'library'" icon="library" label="Library" variant="rail" />
          <NavItem :current="props.activeItem === 'messages'" icon="bell" label="Messages" tail="3" variant="rail" />
        </RailGroup>

        <template v-if="props.showFollowing">
          <Divider inset="both" />
          <RailGroup label="Following" variant="follow">
            <template #tail>
              <Link size="sm" variant="subtle">All</Link>
            </template>
            <FollowRow initials="HL" name="Hailey Luna" state="live" />
            <FollowRow avatar-tone="teal" initials="NV" name="NeoVoice" />
            <FollowRow avatar-tone="violet" initials="MX" name="Mika X" />
          </RailGroup>
        </template>
      </div>

      <RailFooter
        v-if="props.showFooter"
        :primary-label="props.footerPrimaryLabel"
        :secondary-label="props.footerSecondaryLabel"
      />
    </slot>
  </aside>
</template>
