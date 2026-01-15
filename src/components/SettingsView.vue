<template>
  <section class="c-settings">
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
        :buttons="['rain', 'fire', 'white noise']"
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
      <li>
        <button class="c-settings__about" @click="modalShown = true">
          <InfoIcon />
          <span>About</span>
        </button>
      </li>
    </ul>
  </section>

  <div class="c-modal" :class="{ 'c-modal--show' : modalShown }">
    <button @click="modalShown = false"><CloseIcon /></button>
    <p>Developed by: <a href="https://lela.codes/">lela</a></p>
    <p>Icons by: <a href="https://heroicons.com/outline">Heroicons</a></p>
    <p>Sounds by: <a href="https://freesound.org/people/_lynks/sounds/595717/">rain</a>, <a href="https://freesound.org/people/Nox_Sound/sounds/472591/">fire</a> & <a href="https://freesound.org/people/DJT4NN3R/sounds/347576/">white noise</a></p>
  </div>
</template>

<script setup>
import { onBeforeMount, computed, ref } from 'vue'
import { useSettings } from '../composables/useSettings.js'
import ButtonGroup from './form/ButtonGroup.vue'
import InputNumber from './form/InputNumber.vue'
import ToggleSwitch from './form/ToggleSwitch.vue'
import VolumeSlider from './form/VolumeSlider.vue'
import InfoIcon from './icons/InfoIcon.vue'
import CloseIcon from './icons/CloseIcon.vue'

const settingsStore = useSettings();

const modalShown = ref(false);

const settings = computed(() => {
  return settingsStore.settings.value
});

onBeforeMount(() => {
  settingsStore.loadSettings()
});
</script>

<style lang="scss">
.c-settings__about {
  cursor: pointer;
}

.c-modal {
  display: none;
  position: fixed;
  background-color: var(--background);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &.c-modal--show {
    display: block;
  }
}
</style>
