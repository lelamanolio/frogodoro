<template>
  <section class="c-settings">
    <header class="c-settings__header">
      <button class="c-settings__back" @click="emit('back', 'timer')">
        <ChevronLIcon :color="`var(--text)`" />
        <span>Back</span>
      </button>
      <h1 class="c-settings__title">Settings</h1>
    </header>

    <div class="c-settings__settings">
      <div class="c-settings__group">
        <h2 class="c-settings__group-title">Timer</h2>

        <div class="c-settings__items">
          <div class="c-settings__item">
            <p class="c-settings__label">Sessions:</p>
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
        </div>
      </div>
    </div>

    <div class="c-settings__settings">
      <div class="c-settings__group">
        <h2 class="c-settings__group-title">Sounds</h2>

        <div class="c-settings__items">
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
            <p class="c-settings__label">Sounds On Break:</p>
            <div class="c-settings__input">
              <ToggleSwitch
                :value="settings.soundOnBreak"
                @toggle-change="(val) => settingsStore.updateSettings('soundOnBreak', val)"
              />
            </div>
          </div>
          <div class="c-settings__item">
            <p class="c-settings__label">Ambient Sound:</p>
            <div class="c-settings__input c-settings__input--max">
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
            <div class="c-settings__input c-settings__input--min">
              <VolumeSlider
                :value="settings.volume"
                @volume-change="(val) => settingsStore.updateSettings('volume', val)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="c-settings__settings">
      <div class="c-settings__group">
        <h2 class="c-settings__group-title">Reminders</h2>

        <div class="c-settings__items">
          <div class="c-settings__item">
            <p class="c-settings__label">Reminders:</p>
            <div class="c-settings__input">
              <ToggleSwitch
                :value="settings.reminders"
                @toggle-change="(val) => settingsStore.updateSettings('reminders', val)"
              />
            </div>
          </div>
          <div class="c-settings__item">
            <p class="c-settings__label">Reminder Interval:</p>
            <div class="c-settings__input">
              <InputNumber
                :class="settings.reminders === false ? 'c-number--disabled' : ''"
                :number="settings.remindersTime"
                :step="5"
                @number-change="(val) => settingsStore.updateSettings('remindersTime', val)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="c-settings__settings">
      <div class="c-settings__group">
        <h2 class="c-settings__group-title">System</h2>

        <div class="c-settings__items">
          <div class="c-settings__item">
            <p class="c-settings__label">Follow System Theme:</p>
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
            <button class="c-settings__about" @click="modalShown = true">
              <span>About</span>
              <ChevronRIcon :color="`var(--text)`" :size="20" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="c-modal" :class="{ 'c-modal--show': modalShown }">
    <h2 class="c-modal__title">
      <InfoIcon :color="`var(--text)`" :size="32" />
      <span>About</span>
    </h2>
    <button class="c-modal__close" @click="modalShown = false">
      <CloseIcon :color="`var(--text)`" />
    </button>
    <p>Developed by: <a href="https://lela.codes/">lela</a></p>
    <p>Icons by: <a href="https://heroicons.com/outline">Heroicons</a></p>
    <p>
      Sounds by: <a href="https://freesound.org/people/_lynks/sounds/595717/">rain</a>,
      <a href="https://freesound.org/people/Nox_Sound/sounds/472591/">fire</a> &
      <a href="https://freesound.org/people/DJT4NN3R/sounds/347576/">white noise</a>
    </p>
  </div>
</template>

<script setup>
import { onBeforeMount, computed, ref, defineEmits } from 'vue'
import { useSettings } from '../composables/useSettings.js'
import ButtonGroup from './form/ButtonGroup.vue'
import InputNumber from './form/InputNumber.vue'
import ToggleSwitch from './form/ToggleSwitch.vue'
import VolumeSlider from './form/VolumeSlider.vue'
import CloseIcon from './icons/CloseIcon.vue'
import ChevronLIcon from './icons/ChevronLIcon.vue'
import InfoIcon from './icons/InfoIcon.vue'
import ChevronRIcon from './icons/ChevronRIcon.vue'

const emit = defineEmits(['back'])

const settingsStore = useSettings()

const modalShown = ref(false)

const settings = computed(() => {
  return settingsStore.settings.value
})

onBeforeMount(() => {
  settingsStore.loadSettings()
})
</script>

<style lang="scss">
.c-settings__header {
  display: flex;
  gap: 32px;
  align-items: flex-end;
  margin-bottom: 24px;
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
  line-height: 1;
}

.c-settings__group-title {
  font-size: 18px;
  letter-spacing: 4px;
  text-transform: uppercase;
  margin-top: 32px;
  margin-bottom: 8px;
}


.c-settings__item {
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--text-muted);
}

.c-settings__input {
  max-width: 120px;
}

.c-settings__input--min {
  max-width: min-content;
}

.c-settings__input--max {
  max-width: max-content;
}

.c-settings__about {
  cursor: pointer;
  display: flex;
  border: 0;
  padding: 0;
  gap: 4px;
  align-items: center;
}

.c-modal {
  border-radius: 12px;
  border: 2px solid var(--primary-color);
  display: none;
  position: fixed;
  background-color: var(--background);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 42px;

  &.c-modal--show {
    display: block;
  }

  a {
    text-decoration-color: var(--primary-color);
    color: var(--primary-color);
  }
}

.c-modal__title {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 4px;
  font-size: 18px;
}

.c-modal__close {
  cursor: pointer;
  padding: 8px;
  border: 0;
  position: absolute;
  top: 16px;
  right: 16px;
}
</style>
