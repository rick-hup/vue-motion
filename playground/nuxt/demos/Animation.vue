<script setup lang="ts">
import { Motion } from 'motion-vue'
import { ref } from 'vue'

const key = ref(1)
</script>

<template>
  <div
    class="py-4"
    style="background:linear-gradient(135deg, #f08, #d0e)"
  >
    <Motion
      :initial="{
        scale: 0,
      }"
      :animate="{
        scale: 1,
        rotate: 180,
      }"
      :transition="{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }"
      class="w-1/2 aspect-square bg-white rounded-md mx-auto"
      data-a="123"
      @click="key = key + 1"
    />
  </div>
</template>

<style scoped>

</style>
