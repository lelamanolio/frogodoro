<template>
  <div class="c-icon c-icon--chevronr">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="c-icon__svg"
      :style="cssProps"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
  </div>
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
