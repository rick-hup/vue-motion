<script setup lang="ts">
import { Motion } from 'motion-vue'
</script>

<template>
  <Motion
    :initial="{ opacity: 0, scale: 0 }"
    :animate="{ opacity: 1, scale: 1, rotate: 180 }"
    :transition="{
      type: 'spring',
      stiffness: 260,
      damping: 20,
    }"
    class="w-20 h-20 bg-white rounded-lg"
  />
</template>

<style scoped>

</style>
