<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="c-icon c-icon--skip"
    :style="cssProps"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
    />
  </svg>
</template>

<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  color: {
    type: String,
    default: '#000',
  },
  size: {
    type: Number,
    default: 24,
  },
})

const cssProps = computed(() => {
  return {
    '--icon-color': `${props.color}`,
    '--icon-width': `${props.size}px`,
  }
})
</script>
