<template>
  <div>
    Settings

    <ul>
      <li>Focus Count -> number</li>
      <li>
        <InputNumber :number="settings.focusCount" :step="1" @number-change="val => updateSettings('focusCount', val)" />
      </li>
      <li>Focus Time -> minutes</li>
        <InputNumber :number="settings.focusTime" :step="5" @number-change="val => updateSettings('focusTime', val)" />
      <li>Short Break Time -> minutes</li>
        <InputNumber :number="settings.shortBreakTime" :step="5" @number-change="val => updateSettings('shortBreakTime', val)" />
      <li>Long Break -> on/off</li>
        <ToggleSwitch />
      <li>Long Break Time -> minutes</li>
        <InputNumber :number="settings.longBreakTime" :step="5" @number-change="val => updateSettings('longBreakTime', val)" />
      <li>Sounds -> on/off</li>
        <ToggleSwitch />
      <li>Sounds > -> lofi / white noises</li>
        <ButtonGroup />
      <li>Sound volume -> slider (range input)</li>
      <li>Use system theme -> on/off</li>
        <ToggleSwitch />
      <li>Dark mode -> on/off</li>
        <ToggleSwitch />
      <li>About -> developer, Heroicons, app version</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import ButtonGroup from './form/ButtonGroup.vue';
import InputNumber from './form/InputNumber.vue';
import ToggleSwitch from './form/ToggleSwitch.vue';

const settings = ref({
  focusCount: 4,
  focusTime: 25,
  shortBreakTime: 5,
  longBreak: true,
  longBreakTime: 15,
  sounds: true,
  soundType: 'lofi',
  volume: 40,
  useSystemTheme: true,
  darkMode: false
});
const storageKey = 'frogodoro.settings';

const setCustomSettings = () => {
  localStorage.setItem(storageKey, JSON.stringify(settings.value));
}

const updateSettings = (key, value) => {
  settings.value[key] = value;

  setCustomSettings();
}

onBeforeMount(() => {
  try {
    const raw = localStorage.getItem(storageKey);

    if (raw) {
      settings.value = JSON.parse(raw);
    }
  } catch (e) {
    console.error(e);
  }
})
</script>

<style lang="scss">

</style>
