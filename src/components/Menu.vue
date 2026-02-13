<template>
  <nav class="c-menu">
    <ul class="c-menu__list">
      <li class="c-menu__item" v-if="props.view === 'timer'" @click="emit('menuClick', 'settings')">
        <SettingsIcon :size="32" :color="`var(--text)`" />
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { defineEmits } from 'vue';
import SettingsIcon from '@/components/icons/SettingsIcon.vue';

const emit = defineEmits(['menuClick']);

const props = defineProps({
  view: {
    type: String
  }
})
</script>

<style lang="scss">
.c-menu {
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 24px;
  background-color: var(--background);
  z-index: 5;
}

.c-menu__list {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
}

.c-menu__item {
  cursor: pointer;
}
</style>
