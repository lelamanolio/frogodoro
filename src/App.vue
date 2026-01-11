<template>
  <header>
    <h1>Frogodoro</h1>
  </header>

  <TimerView v-show="currentView === 'timer'"/>
  <SettingsView v-show="currentView === 'settings'" />

  <Menu @menu-click="updateView" />
</template>

<script setup>
import { ref } from 'vue';
import Menu from '@/components/Menu.vue';
import TimerView from './components/TimerView.vue';
import SettingsView from './components/SettingsView.vue';

const currentView = ref('timer');

const updateView = (view) => {
  currentView.value = view;
}
</script>
