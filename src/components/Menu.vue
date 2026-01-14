<template>
  <nav class="c-menu">
    <ul class="c-menu__list">
      <li class="c-menu__item" @click="emit('menuClick', 'timer')">
        <TimeIcon :size="32" :color="`var(--text)`" />
      </li>
      <li class="c-menu__item" @click="emit('menuClick', 'settings')">
        <SettingsIcon :size="32" :color="`var(--text)`" />
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { defineEmits } from 'vue';
import TimeIcon from '@/components/icons/TimeIcon.vue';
import SettingsIcon from '@/components/icons/SettingsIcon.vue';

const emit = defineEmits(['menuClick']);
</script>

<style lang="scss">
.c-menu {
  position: fixed;
  bottom: 0;
  width: 100%;
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
