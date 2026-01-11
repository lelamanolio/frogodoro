<template>
  <svg class="c-icon c-icon--time" :style="cssProps" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
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
