<template>
  <div class="c-number">
    <button class="c-number__button c-number__button--chevronl">
      <ChevronLIcon />
    </button>
    <input class="c-number__input" type="number" />
    <button class="c-number__button c-number__button--chevronr">
      <ChevronRIcon />
    </button>
  </div>
</template>

<script setup>
import ChevronLIcon from '../icons/ChevronLIcon.vue';
import ChevronRIcon from '../icons/ChevronRIcon.vue';
</script>

<style lang="scss">
.c-number {
  display: flex;
  align-items: center;
  justify-content: center;
}

.c-number__button {
  border: none;
  cursor: pointer;
}

.c-number__input {
  border: none;
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  appearance: textfield;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
}
</style>
