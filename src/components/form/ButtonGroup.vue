<template>
  <div class="c-button-group">
    <template v-for="button of props.buttons">
      <input class="c-button-group__input" type="radio" :value="button" :id="button" :name="props.group" :checked="props.value === button" @change="e => emit('soundChange', e.target.value)" />
      <label class="c-button-group__label" :for="button">
        {{ button }}
      </label>
    </template>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const emit = defineEmits(['soundChange']);
const props = defineProps({
  group: {
    type: String,
  },
  buttons: {
    type: Array,
  },
  value: {
    type: String
  }
});
</script>

<style lang="scss">
.c-button-group {
  display: flex;
}

.c-button-group__label {
  padding: 6px 12px;
  cursor: pointer;
  border: 1px solid var(--text-muted);
  transition: border 0.1s linear, background-color 0.1s linear;

  &:hover {
    border: 1px solid var(--text);
    background-color: color-mix(in srgb, var(--background) 99%, var(--text) 1%);
  }

  &:first-of-type {
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
  }

  &:last-of-type {
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
  }
}

.c-button-group__input {
  opacity: 0;
  position: absolute;
  visibility: hidden;

  &:checked + .c-button-group__label {
    background-color: var(--primary-color);
    color: var(--background);
  }
}
</style>
