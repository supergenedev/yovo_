<script setup>
import SidebarItem from './SidebarItem.vue'

const props = defineProps({
  primaryLabel: { default: 'Dark mode' },
  primaryIcon: { default: 'moon' },
  primaryHref: { default: undefined },
  secondaryLabel: { default: 'Settings' },
  secondaryIcon: { default: 'settings' },
  secondaryHref: { default: undefined },
})
</script>
<template>
  <div class="sg-ds-library-scope sidebar-footer" v-bind="$attrs">
    <slot>
      <SidebarItem v-if="props.primaryLabel" class="sidebar-footer-action" :href="props.primaryHref" :icon="props.primaryIcon" :label="props.primaryLabel" />
      <SidebarItem v-if="props.secondaryLabel" class="sidebar-footer-action" :href="props.secondaryHref" :icon="props.secondaryIcon" :label="props.secondaryLabel" />
    </slot>
  </div>
</template>
