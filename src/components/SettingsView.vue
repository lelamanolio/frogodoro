<template>
  <section class="c-settings">
    <header class="c-settings__header">
      <button class="c-settings__back" @click="emit('back', 'timer')">
        <ChevronLIcon :color="`var(--text)`" />
        <span>Back</span>
      </button>
      <h1 class="c-settings__title">
        Settings
      </h1>
    </header>

    <div class="c-settings__form">
      <div class="c-settings__item">
        <p class="c-settings__label">Focus Count:</p>
        <div class="c-settings__input">
          <InputNumber
            :number="settings.focusCount"
            :step="1"
            @number-change="(val) => settingsStore.updateSettings('focusCount', val)"
          />
        </div>
      </div>
      <div class="c-settings__item">
        <p class="c-settings__label">Focus Time:</p>
        <div class="c-settings__input">
          <InputNumber
            :number="settings.focusTime"
            :step="5"
            @number-change="(val) => settingsStore.updateSettings('focusTime', val)"
          />
        </div>
      </div>
      <div class="c-settings__item">
        <p class="c-settings__label">Short Break Time:</p>
        <div class="c-settings__input">
          <InputNumber
            :number="settings.shortBreakTime"
            :step="5"
            @number-change="(val) => settingsStore.updateSettings('shortBreakTime', val)"
          />
        </div>
      </div>
      <div class="c-settings__item">
        <p class="c-settings__label">Long Break:</p>
        <div class="c-settings__input">
          <ToggleSwitch
            :value="settings.longBreak"
            @toggle-change="(val) => settingsStore.updateSettings('longBreak', val)"
          />
        </div>
      </div>
      <div class="c-settings__item">
        <p class="c-settings__label">Long Break Time:</p>
        <div class="c-settings__input">
          <InputNumber
            :class="settings.longBreak === false ? 'c-number--disabled' : ''"
            :number="settings.longBreakTime"
            :step="5"
            @number-change="(val) => settingsStore.updateSettings('longBreakTime', val)"
          />
        </div>
      </div>
      <div class="c-settings__item">
        <p class="c-settings__label">Sounds:</p>
        <div class="c-settings__input">
          <ToggleSwitch
            :value="settings.sounds"
            @toggle-change="(val) => settingsStore.updateSettings('sounds', val)"
          />
        </div>
      </div>
      <div class="c-settings__item">
        <p class="c-settings__label">Sounds Type:</p>
        <div class="c-settings__input c-settings__input--group">
          <ButtonGroup
            :group="'sounds'"
            :buttons="['rain', 'fire', 'white noise']"
            @sound-change="(val) => settingsStore.updateSettings('soundType', val)"
            :value="settings.soundType"
          />
        </div>
      </div>
      <div class="c-settings__item">
        <p class="c-settings__label">Sounds Volume:</p>
        <div class="c-settings__input">
          <VolumeSlider
            :value="settings.volume"
            @volume-change="(val) => settingsStore.updateSettings('volume', val)"
          />
        </div>
      </div>
      <div class="c-settings__item">
        <p class="c-settings__label">Use System Theme:</p>
        <div class="c-settings__input">
          <ToggleSwitch
            :value="settings.useSystemTheme"
            @toggle-change="(val) => settingsStore.updateSettings('useSystemTheme', val)"
          />
        </div>
      </div>
      <div class="c-settings__item">
        <p class="c-settings__label">Dark Mode:</p>
        <div class="c-settings__input">
          <ToggleSwitch
            :class="settings.useSystemTheme === true ? 'c-toggle--disabled' : ''"
            :value="settings.darkMode"
            @toggle-change="(val) => settingsStore.updateSettings('darkMode', val)"
          />
        </div>
      </div>
      <div class="c-settings__item">
        <p class="c-settings__label">About:</p>
        <div class="c-settings__input">
          <button class="c-settings__about" @click="modalShown = true">
            <InfoIcon />
            <span>About</span>
          </button>
        </div>
      </div>
    </div>
  </section>

  <div class="c-modal" :class="{ 'c-modal--show' : modalShown }">
    <button @click="modalShown = false"><CloseIcon /></button>
    <p>Developed by: <a href="https://lela.codes/">lela</a></p>
    <p>Icons by: <a href="https://heroicons.com/outline">Heroicons</a></p>
    <p>Sounds by: <a href="https://freesound.org/people/_lynks/sounds/595717/">rain</a>, <a href="https://freesound.org/people/Nox_Sound/sounds/472591/">fire</a> & <a href="https://freesound.org/people/DJT4NN3R/sounds/347576/">white noise</a></p>
  </div>
</template>

<script setup>
import { onBeforeMount, computed, ref, defineEmits } from 'vue'
import { useSettings } from '../composables/useSettings.js'
import ButtonGroup from './form/ButtonGroup.vue'
import InputNumber from './form/InputNumber.vue'
import ToggleSwitch from './form/ToggleSwitch.vue'
import VolumeSlider from './form/VolumeSlider.vue'
import InfoIcon from './icons/InfoIcon.vue'
import CloseIcon from './icons/CloseIcon.vue'
import ChevronLIcon from './icons/ChevronLIcon.vue'

const emit = defineEmits(['back']);

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
.c-settings__header {
  display: flex;
  gap: 48px;
  align-items: flex-end;
  margin-bottom: 16px;
}

.c-settings__back {
  cursor: pointer;
  display: flex;
  border: 0;
  padding: 0;
  gap: 4px;
}

.c-settings__title {
  font-size: 28px;
}

.c-settings__form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.c-settings__item {
  display: grid;
  grid-template-columns: 250px 1fr;
  align-items: center;
}

.c-settings__label {
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 2px;
}

.c-settings__input {
  max-width: 120px;
}

.c-settings__input--group {
  max-width: 300px;
}

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
