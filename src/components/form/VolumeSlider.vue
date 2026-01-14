<template>
  <div class="c-volume">
    <label class="c-volume__label">Volume: {{ props.value }}</label>
    <input class="c-volume__range" type="range" :value="props.value" min="0" max="100" step="5" @change="e => emit('volumeChange', Number(e.target.value))" />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const emit = defineEmits(['volumeChange']);
const props = defineProps({
  value: {
    type: Number,
  },
});
</script>

<style lang="scss">
.c-volume__range {
    -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  height: 6px;
  border-radius: 12px;
  background-color: var(--primary-color);
}
</style>
