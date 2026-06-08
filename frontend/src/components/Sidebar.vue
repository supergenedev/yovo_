<script setup>
import { ref, computed, watch } from 'vue'
import Avatar from './Avatar.vue'
import Button from './Button.vue'
import Icon from './Icon.vue'

// ── Utility helpers ──────────────────────────────────────────────────────────

function normalizeSidebarWidth(value, fallback) {
  if (typeof value === 'number') return Number.isFinite(value) ? `${value}px` : fallback
  if (!value) return fallback
  const trimmed = value.trim()
  if (!trimmed) return fallback
  if (trimmed === 'sm') return '224px'
  if (trimmed === 'md') return '272px'
  if (trimmed === 'lg') return '320px'
  return /^-?\d+(\.\d+)?$/.test(trimmed) ? `${trimmed}px` : trimmed
}

function normalizeSidebarCollapsedWidth(value, fallback) {
  if (typeof value === 'number') return Number.isFinite(value) ? `${value}px` : fallback
  if (!value) return fallback
  const trimmed = value.trim()
  if (!trimmed) return fallback
  return /^-?\d+(\.\d+)?$/.test(trimmed) ? `${trimmed}px` : trimmed
}

function normalizeSidebarLength(value, fallback) {
  if (typeof value === 'number') return Number.isFinite(value) ? `${value}rem` : fallback
  if (!value) return fallback
  const trimmed = value.trim()
  if (!trimmed) return fallback
  return /^-?\d+(\.\d+)?$/.test(trimmed) ? `${trimmed}rem` : trimmed
}

function getSidebarBackgroundFromTone(tone) {
  if (tone === 'subtle') return 'subtle'
  if (tone === 'inverse') return 'inverse'
  if (tone === 'glass') return 'glass'
  return 'surface'
}

function resolveSidebarHeaderMediaSrc(...values) {
  return values.find(isLikelySidebarMediaSource)
}

function isLikelySidebarMediaSource(value) {
  if (!value) return false
  const trimmed = value.trim()
  return /^(https?:\/\/|data:(?:image|video)\/|blob:|\/|\.\/|\.\.\/)/i.test(trimmed)
}

function isSidebarVideoSource(src) {
  const value = src.trim().toLowerCase()
  return /^data:video\//.test(value) || /\.(?:webm|mp4|m4v|mov|ogv)(?:[?#].*)?$/.test(value)
}

function resolveSidebarHeaderMediaFit(value) {
  if (value === 'cover') return 'cover'
  if (value === 'contain') return 'contain'
  if (value === 'auto') return 'none'
  return 'contain'
}

function getSidebarDrawerPlacementFromTrigger(placement) {
  return placement.endsWith('right') ? 'right' : 'left'
}

// ── Props ────────────────────────────────────────────────────────────────────

const props = defineProps({
  activeItem: { default: 'home' },
  background: { default: undefined },
  brand: { default: 'StudioGrid' },
  brandMark: { default: undefined },
  brandMarkBackgroundPosition: { default: undefined },
  brandMarkBackgroundSize: { default: undefined },
  brandMarkIcon: { default: 'sparkles' },
  brandMarkSrc: { default: undefined },
  brandMarkText: { default: 'SG' },
  brandName: { default: undefined },
  brandNameBackgroundPosition: { default: undefined },
  brandNameBackgroundSize: { default: undefined },
  brandNameSrc: { default: undefined },
  bordered: { default: false },
  collapsed: { default: undefined },
  collapsedHeaderDisplay: { default: 'symbol' },
  collapsedToggleVariant: { default: 'ghost' },
  collapsedWidth: { default: undefined },
  defaultCollapsed: { default: false },
  drawerOverlay: { default: true },
  drawerPlacement: { default: undefined },
  drawerTriggerPlacement: { default: 'top-left' },
  expandedBrandDisplay: { default: 'symbol-logo' },
  headerActionLabel: { default: undefined },
  headerLogo: { default: undefined },
  headerLogoAlt: { default: undefined },
  headerLogoFit: { default: undefined },
  headerLogoImage: { default: undefined },
  headerLogoPosition: { default: undefined },
  headerMedia: { default: undefined },
  headerMediaAlt: { default: undefined },
  headerMediaBackgroundAttachment: { default: undefined },
  headerMediaBackgroundImage: { default: undefined },
  headerMediaBackgroundOrigin: { default: undefined },
  headerMediaBackgroundPosition: { default: undefined },
  headerMediaBackgroundSize: { default: undefined },
  headerMediaFit: { default: undefined },
  headerMediaPosition: { default: undefined },
  headerMediaSrc: { default: undefined },
  headerSymbol: { default: undefined },
  headerSymbolAlt: { default: undefined },
  headerSymbolFit: { default: undefined },
  headerSymbolImage: { default: undefined },
  headerSymbolPosition: { default: undefined },
  height: { default: '100%' },
  presentation: { default: 'sidebar' },
  radius: { default: 'none' },
  showFollowing: { default: true },
  signature: { default: undefined },
  soft: { default: false },
  symbolIcon: { default: undefined },
  tone: { default: 'surface' },
  width: { default: 'md' },
  ariaLabel: { default: undefined },
})

// ── Emits ────────────────────────────────────────────────────────────────────

const emit = defineEmits(['collapsedChange'])

// ── State ────────────────────────────────────────────────────────────────────

const uncontrolledCollapsed = ref(props.defaultCollapsed)
const previewCollapsedOverride = ref(null)
const drawerContentMounted = ref(!props.defaultCollapsed)
const drawerTransitionOpen = ref(!props.defaultCollapsed)

// ── Computed ──────────────────────────────────────────────────────────────────

const resolvedCollapsed = computed(() =>
  previewCollapsedOverride.value !== null
    ? previewCollapsedOverride.value
    : props.collapsed !== undefined
      ? props.collapsed
      : uncontrolledCollapsed.value
)

const resolvedBackground = computed(() =>
  props.background ?? getSidebarBackgroundFromTone(props.tone)
)

const resolvedDrawerPlacement = computed(() =>
  props.drawerPlacement ?? getSidebarDrawerPlacementFromTrigger(props.drawerTriggerPlacement)
)

const sidebarStyle = computed(() => ({
  '--c-sidebar-collapsed-width': normalizeSidebarCollapsedWidth(props.collapsedWidth, '88px'),
  '--c-sidebar-height': normalizeSidebarLength(props.height, '100%'),
  '--c-sidebar-width': normalizeSidebarWidth(props.width, undefined),
}))

const drawerRootStyle = computed(() => ({
  '--c-sidebar-collapsed-width': sidebarStyle.value['--c-sidebar-collapsed-width'],
  '--c-sidebar-height': sidebarStyle.value['--c-sidebar-height'],
  '--c-sidebar-width': sidebarStyle.value['--c-sidebar-width'],
}))

const resolvedHeaderSymbolSrc = computed(() =>
  resolveSidebarHeaderMediaSrc(
    props.headerSymbolImage,
    props.headerMediaBackgroundImage,
    props.headerMediaSrc,
    props.brandMarkSrc,
    props.headerMediaBackgroundAttachment,
    props.headerMediaBackgroundOrigin,
  )
)

const resolvedHeaderLogoSrc = computed(() =>
  resolveSidebarHeaderMediaSrc(props.headerLogoImage, props.brandNameSrc)
)

const resolvedHeaderLogo = computed(() =>
  props.headerLogo ?? props.brandName ?? props.signature ?? props.brand
)

const resolvedHeaderSymbolFit = computed(() =>
  props.headerSymbolFit ?? props.headerMediaFit ?? resolveSidebarHeaderMediaFit(props.headerMediaBackgroundSize ?? props.brandMarkBackgroundSize)
)

const resolvedHeaderSymbolPosition = computed(() =>
  props.headerSymbolPosition ?? props.headerMediaPosition ?? props.headerMediaBackgroundPosition ?? props.brandMarkBackgroundPosition
)

const resolvedHeaderLogoFit = computed(() =>
  props.headerLogoFit ?? props.headerMediaFit ?? resolveSidebarHeaderMediaFit(props.brandNameBackgroundSize)
)

const resolvedHeaderLogoPosition = computed(() =>
  props.headerLogoPosition ?? props.brandNameBackgroundPosition ?? 'left center'
)

const resolvedAriaLabel = computed(() =>
  props.ariaLabel ?? (typeof props.brand === 'string' ? `${props.brand} navigation` : 'Sidebar navigation')
)

const sidebarClasses = computed(() => [
  'sg-ds-library-scope',
  'sidebar',
  `sidebar--bg-${resolvedBackground.value}`,
  `sidebar--radius-${props.radius}`,
  `sidebar--presentation-${props.presentation}`,
  props.presentation === 'drawer' ? `sidebar--drawer-placement-${resolvedDrawerPlacement.value}` : '',
  `sidebar--expanded-brand-${props.expandedBrandDisplay}`,
  props.bordered ? 'sidebar--bordered' : '',
  props.soft ? 'sidebar--soft' : '',
  resolvedCollapsed.value ? 'is-collapsed' : 'is-expanded',
].filter(Boolean).join(' '))

const drawerAnchorClasses = computed(() => [
  'sg-ds-library-scope',
  'sidebar',
  `sidebar--bg-${resolvedBackground.value}`,
  `sidebar--radius-${props.radius}`,
  `sidebar--presentation-${props.presentation}`,
  props.presentation === 'drawer' ? `sidebar--drawer-placement-${resolvedDrawerPlacement.value}` : '',
  `sidebar--expanded-brand-${props.expandedBrandDisplay}`,
  props.bordered ? 'sidebar--bordered' : '',
  props.soft ? 'sidebar--soft' : '',
  'is-collapsed',
  'sidebar-drawer-anchor',
  !resolvedCollapsed.value ? 'is-open-anchor' : '',
].filter(Boolean).join(' '))

const drawerPanelClasses = computed(() => [
  'sg-ds-library-scope',
  'sidebar',
  `sidebar--bg-${resolvedBackground.value}`,
  `sidebar--radius-${props.radius}`,
  `sidebar--presentation-${props.presentation}`,
  props.presentation === 'drawer' ? `sidebar--drawer-placement-${resolvedDrawerPlacement.value}` : '',
  `sidebar--expanded-brand-${props.expandedBrandDisplay}`,
  props.bordered ? 'sidebar--bordered' : '',
  props.soft ? 'sidebar--soft' : '',
  'is-expanded',
].filter(Boolean).join(' '))

const drawerLayoutClasses = computed(() => [
  'sg-ds-library-scope',
  'sidebar-drawer-layout',
  `sidebar-drawer-layout--${resolvedCollapsed.value ? 'collapsed' : 'expanded'}`,
].join(' '))

const drawerRootClasses = computed(() => [
  'sg-ds-library-scope',
  'sidebar-drawer-root',
  `sidebar-drawer-root--${resolvedDrawerPlacement.value}`,
  drawerTransitionOpen.value ? 'is-open' : '',
  props.soft ? 'sidebar-drawer-root--soft' : '',
].filter(Boolean).join(' '))

const shouldRenderDrawerContent = computed(() =>
  !resolvedCollapsed.value || drawerContentMounted.value
)

// ── Watchers ──────────────────────────────────────────────────────────────────

watch(() => props.collapsed, () => {
  previewCollapsedOverride.value = null
})

watch([() => props.presentation, resolvedCollapsed], () => {
  if (props.presentation !== 'drawer') {
    drawerContentMounted.value = false
    drawerTransitionOpen.value = false
    return
  }
  if (!resolvedCollapsed.value) {
    drawerContentMounted.value = true
    requestAnimationFrame(() => {
      drawerTransitionOpen.value = true
    })
    return
  }
  drawerTransitionOpen.value = false
  if (!drawerContentMounted.value) return
  setTimeout(() => {
    drawerContentMounted.value = false
  }, 360)
}, { immediate: true })

// ── Methods ───────────────────────────────────────────────────────────────────

function toggleCollapsed() {
  const nextCollapsed = !resolvedCollapsed.value
  if (props.collapsed === undefined) {
    uncontrolledCollapsed.value = nextCollapsed
  } else if (!emit) {
    previewCollapsedOverride.value = nextCollapsed
  }
  emit('collapsedChange', nextCollapsed)
}

function isVideoSource(src) {
  return isSidebarVideoSource(src)
}
</script>

<template>
  <!-- Drawer presentation -->
  <div
    v-if="props.presentation === 'drawer'"
    :class="drawerLayoutClasses"
    :style="drawerRootStyle"
  >
    <!-- Drawer anchor (always-collapsed sidebar placeholder) -->
    <aside
      :aria-label="resolvedAriaLabel"
      :class="drawerAnchorClasses"
      :aria-hidden="!resolvedCollapsed ? true : undefined"
      data-collapsed="true"
      :style="sidebarStyle"
    >
      <div class="sidebar-header">
        <Button
          v-if="collapsedHeaderDisplay === 'menu-button'"
          :aria-label="headerActionLabel ?? 'Expand sidebar'"
          class="sidebar-collapsed-toggle"
          :iconOnly="true"
          leadingIcon="menu"
          @click="toggleCollapsed"
          size="sm"
          :variant="collapsedToggleVariant"
        />
        <button
          v-else
          :aria-label="headerActionLabel ?? 'Expand sidebar'"
          class="sidebar-identity"
          :disabled="false"
          @click="toggleCollapsed"
          :title="headerActionLabel ?? 'Expand sidebar'"
          type="button"
        >
          <span class="sidebar-header-symbol">
            <template v-if="resolvedHeaderSymbolSrc">
              <video
                v-if="isVideoSource(resolvedHeaderSymbolSrc)"
                :aria-hidden="(headerSymbolAlt ?? headerMediaAlt ?? '') ? undefined : true"
                :aria-label="(headerSymbolAlt ?? headerMediaAlt ?? '') || undefined"
                autoplay
                class="sidebar-header-symbol-image"
                :draggable="false"
                loop
                muted
                playsinline
                preload="metadata"
                :src="resolvedHeaderSymbolSrc"
                :style="{ objectFit: resolvedHeaderSymbolFit, objectPosition: resolvedHeaderSymbolPosition }"
              />
              <img
                v-else
                :alt="headerSymbolAlt ?? headerMediaAlt ?? ''"
                class="sidebar-header-symbol-image"
                :draggable="false"
                :src="resolvedHeaderSymbolSrc"
                :style="{ objectFit: resolvedHeaderSymbolFit, objectPosition: resolvedHeaderSymbolPosition }"
              />
            </template>
            <slot v-else name="headerSymbol">
              <Icon v-if="brandMarkIcon || symbolIcon" :name="brandMarkIcon || symbolIcon" size="100%" />
              <span v-else class="sidebar-symbol-text">{{ brandMarkText }}</span>
            </slot>
          </span>
          <span v-if="resolvedHeaderLogoSrc || resolvedHeaderLogo" class="sidebar-header-logo">
            <template v-if="resolvedHeaderLogoSrc">
              <video
                v-if="isVideoSource(resolvedHeaderLogoSrc)"
                :aria-hidden="(headerLogoAlt ?? '') ? undefined : true"
                :aria-label="(headerLogoAlt ?? '') || undefined"
                autoplay
                class="sidebar-header-logo-image"
                :draggable="false"
                loop
                muted
                playsinline
                preload="metadata"
                :src="resolvedHeaderLogoSrc"
                :style="{ objectFit: resolvedHeaderLogoFit, objectPosition: resolvedHeaderLogoPosition }"
              />
              <img
                v-else
                :alt="headerLogoAlt ?? ''"
                class="sidebar-header-logo-image"
                :draggable="false"
                :src="resolvedHeaderLogoSrc"
                :style="{ objectFit: resolvedHeaderLogoFit, objectPosition: resolvedHeaderLogoPosition }"
              />
            </template>
            <template v-else>{{ resolvedHeaderLogo }}</template>
          </span>
        </button>
      </div>
    </aside>

    <!-- Drawer panel (expanded sidebar overlay) -->
    <div
      v-if="shouldRenderDrawerContent"
      :aria-hidden="resolvedCollapsed ? true : undefined"
      :class="drawerRootClasses"
      :style="drawerRootStyle"
    >
      <button
        v-if="drawerOverlay"
        aria-hidden="true"
        class="sidebar-drawer-scrim"
        @click="toggleCollapsed"
        :tabindex="-1"
        type="button"
      />
      <div class="sidebar-drawer-panel">
        <aside
          :aria-label="resolvedAriaLabel"
          :class="drawerPanelClasses"
          data-collapsed="false"
          :style="sidebarStyle"
        >
          <div class="sidebar-header">
            <button
              class="sidebar-identity"
              :disabled="true"
              type="button"
            >
              <span class="sidebar-header-symbol">
                <template v-if="resolvedHeaderSymbolSrc">
                  <video
                    v-if="isVideoSource(resolvedHeaderSymbolSrc)"
                    :aria-hidden="(headerSymbolAlt ?? headerMediaAlt ?? '') ? undefined : true"
                    :aria-label="(headerSymbolAlt ?? headerMediaAlt ?? '') || undefined"
                    autoplay
                    class="sidebar-header-symbol-image"
                    :draggable="false"
                    loop
                    muted
                    playsinline
                    preload="metadata"
                    :src="resolvedHeaderSymbolSrc"
                    :style="{ objectFit: resolvedHeaderSymbolFit, objectPosition: resolvedHeaderSymbolPosition }"
                  />
                  <img
                    v-else
                    :alt="headerSymbolAlt ?? headerMediaAlt ?? ''"
                    class="sidebar-header-symbol-image"
                    :draggable="false"
                    :src="resolvedHeaderSymbolSrc"
                    :style="{ objectFit: resolvedHeaderSymbolFit, objectPosition: resolvedHeaderSymbolPosition }"
                  />
                </template>
                <slot v-else name="headerSymbol">
                  <Icon v-if="brandMarkIcon || symbolIcon" :name="brandMarkIcon || symbolIcon" size="100%" />
                  <span v-else class="sidebar-symbol-text">{{ brandMarkText }}</span>
                </slot>
              </span>
              <span v-if="resolvedHeaderLogoSrc || resolvedHeaderLogo" class="sidebar-header-logo">
                <template v-if="resolvedHeaderLogoSrc">
                  <video
                    v-if="isVideoSource(resolvedHeaderLogoSrc)"
                    :aria-hidden="(headerLogoAlt ?? '') ? undefined : true"
                    :aria-label="(headerLogoAlt ?? '') || undefined"
                    autoplay
                    class="sidebar-header-logo-image"
                    :draggable="false"
                    loop
                    muted
                    playsinline
                    preload="metadata"
                    :src="resolvedHeaderLogoSrc"
                    :style="{ objectFit: resolvedHeaderLogoFit, objectPosition: resolvedHeaderLogoPosition }"
                  />
                  <img
                    v-else
                    :alt="headerLogoAlt ?? ''"
                    class="sidebar-header-logo-image"
                    :draggable="false"
                    :src="resolvedHeaderLogoSrc"
                    :style="{ objectFit: resolvedHeaderLogoFit, objectPosition: resolvedHeaderLogoPosition }"
                  />
                </template>
                <template v-else>{{ resolvedHeaderLogo }}</template>
              </span>
            </button>
            <Button
              :aria-label="headerActionLabel ?? 'Collapse sidebar'"
              class="sidebar-toggle"
              :iconOnly="true"
              leadingIcon="chevron-left"
              @click="toggleCollapsed"
              size="sm"
              variant="ghost"
            />
          </div>
          <nav class="sidebar-nav">
            <slot>
              <!-- Default nav content -->
              <SidebarGroup label="Browse">
                <SidebarItem :active="activeItem === 'home'" icon="house" label="Home" description="For you" />
                <SidebarItem :active="activeItem === 'watch'" icon="play" label="Watch" description="Continue" />
                <SidebarItem :active="activeItem === 'library'" icon="library" label="Library" badge="12" />
              </SidebarGroup>
              <SidebarGroup v-if="showFollowing" label="Following">
                <SidebarFollowRow initials="HL" name="Hailey Luna" status="live" />
                <SidebarFollowRow avatarTone="teal" initials="NV" name="NeoVoice" />
                <SidebarFollowRow avatarTone="purple" initials="MX" name="Mika X" />
              </SidebarGroup>
              <SidebarGroup label="Manage">
                <SidebarItem :active="activeItem === 'audience'" icon="users" label="Audience" />
                <SidebarItem :active="activeItem === 'settings'" icon="settings" label="Settings" />
              </SidebarGroup>
            </slot>
          </nav>
          <slot name="footer" />
        </aside>
      </div>
    </div>
  </div>

  <!-- Sidebar presentation (default) -->
  <aside
    v-else
    :aria-label="resolvedAriaLabel"
    :class="sidebarClasses"
    :data-collapsed="resolvedCollapsed ? 'true' : 'false'"
    :style="sidebarStyle"
  >
    <div class="sidebar-header">
      <Button
        v-if="resolvedCollapsed && collapsedHeaderDisplay === 'menu-button'"
        :aria-label="headerActionLabel ?? 'Expand sidebar'"
        class="sidebar-collapsed-toggle"
        :iconOnly="true"
        leadingIcon="menu"
        @click="toggleCollapsed"
        size="sm"
        :variant="collapsedToggleVariant"
      />
      <button
        v-else
        :aria-label="resolvedCollapsed ? (headerActionLabel ?? 'Expand sidebar') : undefined"
        class="sidebar-identity"
        :disabled="!resolvedCollapsed"
        @click="resolvedCollapsed ? toggleCollapsed : undefined"
        :title="resolvedCollapsed ? (headerActionLabel ?? 'Expand sidebar') : undefined"
        type="button"
      >
        <span class="sidebar-header-symbol">
          <template v-if="resolvedHeaderSymbolSrc">
            <video
              v-if="isVideoSource(resolvedHeaderSymbolSrc)"
              :aria-hidden="(headerSymbolAlt ?? headerMediaAlt ?? '') ? undefined : true"
              :aria-label="(headerSymbolAlt ?? headerMediaAlt ?? '') || undefined"
              autoplay
              class="sidebar-header-symbol-image"
              :draggable="false"
              loop
              muted
              playsinline
              preload="metadata"
              :src="resolvedHeaderSymbolSrc"
              :style="{ objectFit: resolvedHeaderSymbolFit, objectPosition: resolvedHeaderSymbolPosition }"
            />
            <img
              v-else
              :alt="headerSymbolAlt ?? headerMediaAlt ?? ''"
              class="sidebar-header-symbol-image"
              :draggable="false"
              :src="resolvedHeaderSymbolSrc"
              :style="{ objectFit: resolvedHeaderSymbolFit, objectPosition: resolvedHeaderSymbolPosition }"
            />
          </template>
          <slot v-else name="headerSymbol">
            <Icon v-if="brandMarkIcon || symbolIcon" :name="brandMarkIcon || symbolIcon" size="100%" />
            <span v-else class="sidebar-symbol-text">{{ brandMarkText }}</span>
          </slot>
        </span>
        <span v-if="resolvedHeaderLogoSrc || resolvedHeaderLogo" class="sidebar-header-logo">
          <template v-if="resolvedHeaderLogoSrc">
            <video
              v-if="isVideoSource(resolvedHeaderLogoSrc)"
              :aria-hidden="(headerLogoAlt ?? '') ? undefined : true"
              :aria-label="(headerLogoAlt ?? '') || undefined"
              autoplay
              class="sidebar-header-logo-image"
              :draggable="false"
              loop
              muted
              playsinline
              preload="metadata"
              :src="resolvedHeaderLogoSrc"
              :style="{ objectFit: resolvedHeaderLogoFit, objectPosition: resolvedHeaderLogoPosition }"
            />
            <img
              v-else
              :alt="headerLogoAlt ?? ''"
              class="sidebar-header-logo-image"
              :draggable="false"
              :src="resolvedHeaderLogoSrc"
              :style="{ objectFit: resolvedHeaderLogoFit, objectPosition: resolvedHeaderLogoPosition }"
            />
          </template>
          <template v-else>{{ resolvedHeaderLogo }}</template>
        </span>
      </button>
      <Button
        v-if="!resolvedCollapsed"
        :aria-label="headerActionLabel ?? 'Collapse sidebar'"
        class="sidebar-toggle"
        :iconOnly="true"
        leadingIcon="chevron-left"
        @click="toggleCollapsed"
        size="sm"
        variant="ghost"
      />
    </div>
    <nav class="sidebar-nav">
      <slot>
        <!-- Default nav content -->
        <SidebarGroup label="Browse">
          <SidebarItem :active="activeItem === 'home'" icon="house" label="Home" description="For you" />
          <SidebarItem :active="activeItem === 'watch'" icon="play" label="Watch" description="Continue" />
          <SidebarItem :active="activeItem === 'library'" icon="library" label="Library" badge="12" />
        </SidebarGroup>
        <SidebarGroup v-if="showFollowing" label="Following">
          <SidebarFollowRow initials="HL" name="Hailey Luna" status="live" />
          <SidebarFollowRow avatarTone="teal" initials="NV" name="NeoVoice" />
          <SidebarFollowRow avatarTone="purple" initials="MX" name="Mika X" />
        </SidebarGroup>
        <SidebarGroup label="Manage">
          <SidebarItem :active="activeItem === 'audience'" icon="users" label="Audience" />
          <SidebarItem :active="activeItem === 'settings'" icon="settings" label="Settings" />
        </SidebarGroup>
      </slot>
    </nav>
    <slot name="footer" />
  </aside>
</template>
