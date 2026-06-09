<script setup>
import AppSidebar from '@/components/AppSidebar.vue'
</script>

<template>
  <div style="display: flex; width: 100%; min-height: 100vh; overflow: hidden;">
    <AppSidebar />
    <div style="flex: 1; min-width: 0; display: flex; overflow: hidden;">
      <RouterView />
    </div>
  </div>
</template>
