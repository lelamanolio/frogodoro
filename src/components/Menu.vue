<template>
  <nav class="c-menu">
    <ul class="c-menu__list">
      <li class="c-menu__item">
        <TimeIcon :size="32" />
      </li>
      <li class="c-menu__item">
        <SettingsIcon :size="32" />
      </li>
    </ul>
  </nav>
</template>

<script setup>
import TimeIcon from '@/components/icons/TimeIcon.vue';
import SettingsIcon from '@/components/icons/SettingsIcon.vue';


</script>

<style lang="scss">
.c-menu {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 24px;
  background-color: #fff;
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
