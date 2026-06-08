<script setup>
const props = defineProps({
  followersLabel: { default: '팔로워' },
  followersValue: { default: '12.4K' },
  followingLabel: { default: '팔로잉' },
  followingValue: { default: '384' },
  postsLabel: { default: '포스트' },
  postsValue: { default: '128' },
})
</script>

<template>
  <dl class="sg-ds-library-scope user-card-stats" v-bind="$attrs">
    <slot>
      <div class="sg-ds-library-scope user-card-stat">
        <dd class="user-card-stat-value">{{ props.postsValue }}</dd>
        <dt class="user-card-stat-label">{{ props.postsLabel }}</dt>
      </div>
      <div class="sg-ds-library-scope user-card-stat">
        <dd class="user-card-stat-value">{{ props.followersValue }}</dd>
        <dt class="user-card-stat-label">{{ props.followersLabel }}</dt>
      </div>
      <div class="sg-ds-library-scope user-card-stat">
        <dd class="user-card-stat-value">{{ props.followingValue }}</dd>
        <dt class="user-card-stat-label">{{ props.followingLabel }}</dt>
      </div>
    </slot>
  </dl>
</template>
