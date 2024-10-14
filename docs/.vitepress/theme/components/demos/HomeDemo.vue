<script setup lang="ts">
import { Motion } from 'motion-vue'
import RefreshBox from './RefreshBox.vue'

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
} as any

const items = {
  hidden: { y: 10, opacity: 0, scale: 0 },
  visible: {
    y: 1,
    opacity: 1,
    scale: 0.9,
    duration: 3,
  },
} as any

const list = [0, 1, 2, 3, 4]
</script>

<template>
  <div class="grid grid-cols-4 gap-4">
    <RefreshBox
      title="Animation"
      style="background: linear-gradient(180deg, #f08, #d0e);"
    >
      <Motion
        class="bg-white w-1/3 aspect-square rounded-2xl"
        :initial="{ scale: 0 }"
        :animate="{ rotate: 180, scale: 1 }"
        :transition="{
          type: 'spring',
          stiffness: 260,
          damping: 20,
          delay: 0.6,
        }"
      />
    </RefreshBox>
    <RefreshBox
      title="Variants"
      style="background: linear-gradient(180deg, #d0e, #91f);"
    >
      <Motion
        as="ul"
        :variants="container"
        initial="hidden"
        animate="visible"
        class="rounded-2xl overflow-hidden  list-none p-2  grid-cols-2 grid-rows-2 aspect-square bg-black/20 w-1/3  grid"
      >
        <Motion
          v-for="item in list"
          :key="item"
          :variants="items"
          class="bg-white rounded-full"
        />
      </Motion>
    </RefreshBox>
  </div>
</template>
