<template>
  <svg class="c-icon c-icon--pause" :style="cssProps" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
  </svg>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  color: {
    type: String,
    default: "#000",
  },
  size: {
    type: Number,
    default: 24,
  },
});

const cssProps = computed(() => {
  return {
    "--icon-color": `${props.color}`,
    "--icon-width": `${props.size}px`,
  };
});
</script>
