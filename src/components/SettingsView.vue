<template>
  <div>
    Settings
    <ul>
      <li>Focus Count -> number</li>
      <li>
        <InputNumber
          :number="settings.focusCount"
          :step="1"
          @number-change="(val) => settingsStore.updateSettings('focusCount', val)"
        />
      </li>
      <li>Focus Time -> minutes</li>
      <InputNumber
        :number="settings.focusTime"
        :step="5"
        @number-change="(val) => settingsStore.updateSettings('focusTime', val)"
      />
      <li>Short Break Time -> minutes</li>
      <InputNumber
        :number="settings.shortBreakTime"
        :step="5"
        @number-change="(val) => settingsStore.updateSettings('shortBreakTime', val)"
      />
      <li>Long Break -> on/off</li>
      <ToggleSwitch
        :value="settings.longBreak"
        @toggle-change="(val) => settingsStore.updateSettings('longBreak', val)"
      />
      <li>Long Break Time -> minutes</li>
      <InputNumber
        :class="settings.longBreak === false ? 'c-number--disabled' : ''"
        :number="settings.longBreakTime"
        :step="5"
        @number-change="(val) => settingsStore.updateSettings('longBreakTime', val)"
      />
      <li>Sounds -> on/off</li>
      <ToggleSwitch
        :value="settings.sounds"
        @toggle-change="(val) => settingsStore.updateSettings('sounds', val)"
      />
      <li>Sounds > -> lofi / rain / fire</li>
      <ButtonGroup
        :group="'sounds'"
        :buttons="['lofi', 'rain', 'fire']"
        @sound-change="(val) => settingsStore.updateSettings('soundType', val)"
        :value="settings.soundType"
      />
      <li>Sound volume -> slider (range input)</li>
      <VolumeSlider
        :value="settings.volume"
        @volume-change="(val) => settingsStore.updateSettings('volume', val)"
      />
      <li>Use system theme -> on/off</li>
      <ToggleSwitch
        :value="settings.useSystemTheme"
        @toggle-change="(val) => settingsStore.updateSettings('useSystemTheme', val)"
      />
      <li>Dark mode -> on/off</li>
      <ToggleSwitch
        :class="settings.useSystemTheme === true ? 'c-toggle--disabled' : ''"
        :value="settings.darkMode"
        @toggle-change="(val) => settingsStore.updateSettings('darkMode', val)"
      />
      <li>About -> developer, Heroicons, app version</li>
    </ul>
  </div>
</template>

<script setup>
import { onBeforeMount, computed } from 'vue'
import { useSettings } from '../composables/useSettings.js'
import ButtonGroup from './form/ButtonGroup.vue'
import InputNumber from './form/InputNumber.vue'
import ToggleSwitch from './form/ToggleSwitch.vue'
import VolumeSlider from './form/VolumeSlider.vue'

const settingsStore = useSettings();

const settings = computed(() => {
  return settingsStore.settings.value
});

onBeforeMount(() => {
  settingsStore.loadSettings()
});
</script>
