<template>
  <div class="c-number" :class="numberClasses">
    <button class="c-number__button c-number__button--chevronl" @click="handleNumberChange('decrement')">
      <ChevronLIcon class="c-number__icon" :color="`var(--text)`" />
    </button>
    <input class="c-number__input" type="number" :value="props.number" @change="e => emit('numberChange', Number(e.target.value))" @focus="toggleFocusClass('focus')" @blur="toggleFocusClass('blur')" />
    <button class="c-number__button c-number__button--chevronr" @click="handleNumberChange('increment')">
      <ChevronRIcon class="c-number__icon" :color="`var(--text)`" />
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';
import ChevronLIcon from '../icons/ChevronLIcon.vue';
import ChevronRIcon from '../icons/ChevronRIcon.vue';

const emit = defineEmits(['numberChange']);
const props = defineProps({
  number: {
    type: Number,
  },
  step: {
    type: Number,
  }
});

const numberClasses = ref([]);

const handleNumberChange = (type) => {
  if (type === 'increment') {
    emit('numberChange', props.number + props.step);
  }

  if (type === 'decrement') {
    emit('numberChange', props.number - props.step);
  }
}

const toggleFocusClass = (type) => {
  if (type === 'focus') {
    numberClasses.value.push('c-number--focus');
  }

  if (type === 'blur') {
    numberClasses.value = [];
  }
}
</script>

<style lang="scss">
.c-number {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--text-muted);
  border-radius: 12px;
  transition: border 0.1s linear, background-color 0.1s linear;

  &:hover {
    border: 1px solid var(--text);
    background-color: color-mix(in srgb, var(--background) 99%, var(--text) 1%);
  }

  &.c-number--focus {
    border: 1.5px solid var(--primary-color);
  }
}

.c-number__button {
  border: none;
  cursor: pointer;
  padding: 6px 8px;

  &:hover {
    .c-number__icon {
      color: var(--primary-color);
    }
  }
}

.c-number__icon {
  transition: color 0.1s linear;
}


.c-number__input {
  border: none;
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  appearance: textfield;
  background-color: transparent;
  padding: 6px 0px;
  width: 40px;
  text-align: center;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }

  &:focus,
  &:focus-within {
    outline: none;
  }
}
</style>
