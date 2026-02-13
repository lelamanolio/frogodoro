<template>
  <main class="c-main" :class="bodyThemeClass">
    <TimerView v-if="currentView === 'timer'"/>

    <SettingsView v-if="currentView === 'settings'" @back="updateView" />

    <Menu :view="currentView" @menu-click="updateView" />
  </main>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, computed, watch } from 'vue';
import { useSettings } from './composables/useSettings.js'
import Menu from '@/components/Menu.vue';
import TimerView from './components/TimerView.vue';
import SettingsView from './components/SettingsView.vue';

const settingsStore = useSettings();

const settings = computed(() => {
  return settingsStore.settings.value
});

const bodyThemeClass = computed(() => ({
  'is-dark': settings.value.darkMode === true && settings.value.useSystemTheme === false,
  'is-light': settings.value.darkMode === false && settings.value.useSystemTheme === false
}));

function applyBodyTheme() {
  document.body.classList.remove('is-dark', 'is-light');
  if (bodyThemeClass.value['is-dark']) document.body.classList.add('is-dark');
  if (bodyThemeClass.value['is-light']) document.body.classList.add('is-light');
}

watch(settings, applyBodyTheme, { deep: true });

const currentView = ref('timer');

const updateView = (view) => {
  currentView.value = view;
}

onBeforeMount(() => {
  settingsStore.loadSettings()
});

onMounted(() => {
  applyBodyTheme();
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
  padding-top: 32px;
  padding-left: 32px;
  padding-right: 32px;
}

.c-icon {
  &:hover {
    .c-icon__svg,
    .c-icon__text {
      color: var(--primary-color);
    }
  }
}

.c-icon__svg {
  transition: 0.3s ease color;
  margin: 0 auto;
}

.c-icon__text {
  transition: 0.3s ease color;
  text-transform: uppercase;
  font-size: 10px;
  letter-spacing: 2px;
}
</style>
