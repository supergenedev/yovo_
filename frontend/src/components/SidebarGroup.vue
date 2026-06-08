<script setup>
import Icon from './Icon.vue'

const props = defineProps({
  count: { default: undefined },
  label: { default: undefined },
  seeAllHref: { default: undefined },
  seeAllIcon: { default: 'chevron-right' },
  seeAllLabel: { default: undefined },
})
</script>

<template>
  <div class="sg-ds-library-scope sidebar-group" v-bind="$attrs">
    <div v-if="props.label" class="sidebar-group-label">
      <span class="sidebar-group-label-head">
        <span class="sidebar-group-label-text">{{ props.label }}</span>
        <span v-if="props.count != null" class="sidebar-group-label-count">{{ props.count }}</span>
      </span>
      <span v-if="props.seeAllLabel" class="sidebar-group-label-tail">
        <a class="sidebar-group-label-seeall" :href="props.seeAllHref">
          <span class="sidebar-group-label-seeall-text">{{ props.seeAllLabel }}</span>
          <span v-if="props.seeAllIcon" class="sidebar-group-label-seeall-icon" aria-hidden="true">
            <Icon :name="props.seeAllIcon" size="1em" />
          </span>
        </a>
      </span>
    </div>
    <div class="sidebar-group-items"><slot /></div>
  </div>
</template>
