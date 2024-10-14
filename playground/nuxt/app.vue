<script setup lang="ts">
import Animation from './demos/Animation.vue'
</script>

<template>
  <div>
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="100"
        height="100"
        rx="20"
        fill="#00DC82"
      />
      <path
        d="M30 30H70V50H50V70H30V30Z"
        fill="white"
      />
    </svg>
    <Animation />
  </div>
</template>
