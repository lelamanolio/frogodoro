<template>
  <main class="c-main" :class="{ 'is-dark' : settings.darkMode === true && settings.useSystemTheme === false, 'is-light' : settings.darkMode === false && settings.useSystemTheme === false }">
    <header>
      <h1>Frogodoro</h1>
    </header>

    <TimerView v-if="currentView === 'timer'"/>
    <SettingsView v-if="currentView === 'settings'" />

    <Menu @menu-click="updateView" />
  </main>
</template>

<script setup>
import { ref, onBeforeMount, computed } from 'vue';
import { useSettings } from './composables/useSettings.js'
import Menu from '@/components/Menu.vue';
import TimerView from './components/TimerView.vue';
import SettingsView from './components/SettingsView.vue';

const settingsStore = useSettings();

const settings = computed(() => {
  return settingsStore.settings.value
});

const currentView = ref('timer');

const updateView = (view) => {
  currentView.value = view;
}

onBeforeMount(() => {
  settingsStore.loadSettings()
});
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.c-main {
  flex-grow: 1;
  padding-bottom: 80px;
}

.c-icon {
  transition: 0.3s ease color;

  &:hover {
    color: var(--primary-color);
  }
}
</style>
