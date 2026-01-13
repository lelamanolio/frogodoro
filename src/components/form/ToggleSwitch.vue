<template>
  <div class="c-toggle">
    <input type="checkbox" class="c-toggle__checkbox" :checked="props.value" @change="e => emit('toggleChange', e.target.checked)" />
    <div class="c-toggle__knob">
      <span></span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const emit = defineEmits(['toggleChange']);
const props = defineProps({
  value: {
    type: Boolean,
  },
});
</script>

<style lang="scss">
.c-toggle {
  border-radius: 12px;
  position: relative;
  width: 74px;
  height: 36px;
  overflow: hidden;
  background-color: var(--background);
  border: 1px solid var(--text-muted);
  transition: border 0.1s linear, background-color 0.1s linear;

  &:hover {
    border: 1px solid var(--text);
    background-color: color-mix(in srgb, var(--background) 99%, var(--text) 1%);
  }

  &.c-toggle--disabled {
    cursor: not-allowed;
    pointer-events: none;
    opacity: 0.5;
  }
}

.c-toggle__checkbox {
  position: relative;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 2;

  &:checked + .c-toggle__knob {
    &:before {
      left: 42px;
      content: 'ON';
    }

    span {
      left: 42px;
    }
  }
}

.c-toggle__knob {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  &:before {
    content: "OFF";
    position: absolute;
    width: calc(50% - 12px);
    left: 6px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text);
    font-size: 10px;
    text-align: center;
    z-index: 1;
  }
}

.c-toggle__knob span {
  position: absolute;
  top: 6px;
  left: 6px;
  bottom: 6px;
  width: calc(50% - 12px);
  color: var(--text);
  background-color: var(--primary-color);
  border-radius: 6px;
  transition: 0.3s ease all, left 0.3s cubic-bezier(0.18, 0.89, 0.35, 1.15);
}
</style>
