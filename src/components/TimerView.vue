<template>
  <section class="c-timer">
    <!-- minutes  -->
    <!-- focus count -->
    <ul class="c-timer__dots">
      <template v-for="focus in settings.focusCount">
        <li class="c-timer__focus"></li>
      </template>
    </ul>

    {{ formatted }}

    Cycle: {{ focusDoneCount }}/{{ settings.focusCount }}

    <div class="c-timer__image">
      <img v-if="currentMode === 'focus'" src="../assets/focus_image.png" />
      <img v-if="currentMode === 'break'" src="../assets/break_image.png" />
    </div>

    <ul class="c-timer__list">
      <li class="c-timer__media" v-if="status === 'idle'" @click="start">
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
import { ref, onBeforeMount, computed } from 'vue';
import { useSettings } from '../composables/useSettings.js';
import { useTimer } from '@/composables/useTimer.js'
import PlayIcon from './icons/PlayIcon.vue';
import PauseIcon from './icons/PauseIcon.vue';
import ResetIcon from './icons/ResetIcon.vue';
import SkipIcon from './icons/SkipIcon.vue';

const settingsStore = useSettings();

const currentMode = ref('focus');
const currentStatus = ref('idle');

const settings = computed(() => {
  return settingsStore.settings.value;
});

onBeforeMount(() => {
  settingsStore.loadSettings()
});

const {
  mode,
  status,
  formatted,
  focusDoneCount,
  start,
  pause,
  resume,
  reset,
  skip,
} = useTimer()

// (optional) if long break is disabled, show a nicer cycle label
const cycleLabel = computed(() => `${focusDoneCount.value}/${settings.value.focusCount}`)
</script>

<style lang="scss">
.c-timer {
}

.c-timer__dots {
  display: flex;
  justify-content: center;
}

.c-timer__focus {
  width: 20px;
  height: 20px;
  border-radius: 100%;
  border: 2px solid var(--text);
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
