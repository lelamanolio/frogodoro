<template>
  <section class="c-timer">

    <p>{{ formatted }}</p>

    <ul class="c-timer__dots">
      <template v-for="(focus, i) in settings.focusCount">
        <li class="c-timer__focus">
          <svg v-if="i < focusDoneCount" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </li>
      </template>
    </ul>

    <div class="c-timer__image">
      <img v-if="currentMode === 'focus'" src="../assets/focus_image.png" />
      <img v-if="currentMode === 'break'" src="../assets/break_image.png" />
    </div>

    <ul class="c-timer__list">
      <li class="c-timer__media" @click="start">
        <PlayIcon :size="32" :color="`var(--text)`" />
      </li>
      <li class="c-timer__media" v-if="status === 'running'" @click="resume">
        <PlayIcon :size="32" :color="`var(--text)`" />
      </li>
      <li class="c-timer__media" @click="pause">
        <PauseIcon :size="32" :color="`var(--text)`" />
      </li>
      <li class="c-timer__media" @click="reset">
        <ResetIcon :size="32" :color="`var(--text)`" />
      </li>
      <li class="c-timer__media" @click="skip">
        <SkipIcon :size="32" :color="`var(--text)`" />
      </li>
    </ul>
  </section>
</template>

<script setup>
import { onBeforeMount, computed } from 'vue';
import { useSettings } from '../composables/useSettings.js';
import { useTimer } from '../composables/useTimer.js';
import PlayIcon from './icons/PlayIcon.vue';
import PauseIcon from './icons/PauseIcon.vue';
import ResetIcon from './icons/ResetIcon.vue';
import SkipIcon from './icons/SkipIcon.vue';

const settingsStore = useSettings();
const { formatted, currentMode, start, pause, resume, reset, skip, focusDoneCount } = useTimer();

const settings = computed(() => {
  return settingsStore.settings.value;
});

onBeforeMount(() => {
  settingsStore.loadSettings()
});
</script>

<style lang="scss">
.c-timer {
}

.c-timer__dots {
  display: flex;
  justify-content: center;
}

.c-timer__focus {
  width: 28px;
  height: 28px;
  border-radius: 100%;
  border: 2px solid var(--text);
  padding: 4px;
}

.c-timer__image {
  display: flex;
  justify-content: center;

  img {
    max-height: 75dvh;
  }
}

.c-timer__media {
}

.c-timer__list {
  display: flex;
  justify-content: center;
  gap: 32px;
}

.c-timer__media {
  cursor: pointer;
}
</style>
