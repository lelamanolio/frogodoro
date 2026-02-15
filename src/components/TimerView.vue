<template>
  <section class="c-timer">

    <p class="c-timer__time">{{ formatted }}</p>

    <ul class="c-timer__dots">
      <template v-for="(focus, i) in settings.focusCount">
        <li class="c-timer__focus">
          <svg v-if="i < focusDoneCount" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </li>
      </template>
    </ul>

    <ul class="c-timer__list">
      <li class="c-timer__media" v-if="status !== 'running'" @click="start">
        <PlayIcon :size="32" :color="`var(--text)`" />
      </li>
      <li class="c-timer__media" v-if="status === 'running'" @click="pause">
        <PauseIcon :size="32" :color="`var(--text)`" />
      </li>
      <li class="c-timer__media" @click="reset">
        <ResetIcon :size="32" :color="`var(--text)`" />
      </li>
      <li class="c-timer__media" @click="skip">
        <SkipIcon :size="32" :color="`var(--text)`" />
      </li>
    </ul>

    <div class="c-timer__image">
      <img v-if="currentMode === 'focus'" src="../assets/focus_image.png" />
      <img v-if="currentMode === 'break'" src="../assets/break_image.png" />
    </div>
  </section>
</template>

<script setup>
import { onBeforeMount, computed } from 'vue';
import { useSettings } from '../composables/useSettings.js';
import { useTimer } from '../composables/useTimer.js';
import { useAmbientSound } from '../composables/useAmbientSound.js';
import PlayIcon from './icons/PlayIcon.vue';
import PauseIcon from './icons/PauseIcon.vue';
import ResetIcon from './icons/ResetIcon.vue';
import SkipIcon from './icons/SkipIcon.vue';

const settingsStore = useSettings();
const { formatted, currentMode, status, start, pause, reset, skip, focusDoneCount } = useTimer();
useAmbientSound(status, currentMode);

const settings = computed(() => {
  return settingsStore.settings.value;
});

onBeforeMount(() => {
  settingsStore.loadSettings()
});
</script>

<style lang="scss">
.c-timer__time {
  text-align: center;
  font-size: 56px;
  letter-spacing: 8px;
}

.c-timer__dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 16px;
}

.c-timer__focus {
  width: 24px;
  height: 24px;
  border-radius: 100%;
  border: 2px solid var(--text);
  padding: 4px;
}

.c-timer__image {
  display: flex;
  justify-content: center;

  img {
    max-height: 58dvh;
  }
}

.c-timer__list {
  display: flex;
  justify-content: center;
  gap: 32px;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 24px;
  background-color: var(--background);
  z-index: 5;
}

.c-timer__media {
  cursor: pointer;
}
</style>
