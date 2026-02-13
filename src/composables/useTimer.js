import { ref, computed, watch, onUnmounted } from 'vue'
import { useSettings } from './useSettings.js'

export function useTimer() {
  const settingsStore = useSettings()

  const status = ref('idle')
  const currentMode = ref('focus')

  const timeRemaining = ref(0)
  const focusDoneCount = ref(0)
  let intervalId = null

  const initializeTimer = () => {
    const settings = settingsStore.settings.value

    if (currentMode.value === 'focus') {
      timeRemaining.value = settings.focusTime * 60
    } else {
      const isLongBreak = settings.longBreak && focusDoneCount.value >= settings.focusCount
      timeRemaining.value = isLongBreak ? settings.longBreakTime * 60 : settings.shortBreakTime * 60
    }
  }

  const formatted = computed(() => {
    const minutes = Math.floor(timeRemaining.value / 60)
    const seconds = timeRemaining.value % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  })

  const start = () => {
    // Se è idle, inizializza il timer
    if (status.value === 'idle') {
      initializeTimer()
    }

    // Se è già running, non fare nulla
    if (status.value === 'running') {
      return
    }

    status.value = 'running'

    // Pulisci eventuali intervalli precedenti
    if (intervalId) {
      clearInterval(intervalId)
    }

    intervalId = setInterval(() => {
      if (timeRemaining.value > 0) {
        timeRemaining.value--
      } else {
        // Timer completato
        completeSession()
      }
    }, 1000)
  }

  const pause = () => {
    if (status.value === 'running') {
      status.value = 'paused'
      if (intervalId) {
        clearInterval(intervalId)
        intervalId = null
      }
    }
  }

  const resume = () => {
    if (status.value === 'paused') {
      status.value = 'running'
      intervalId = setInterval(() => {
        if (timeRemaining.value > 0) {
          timeRemaining.value--
        } else {
          completeSession()
        }
      }, 1000)
    }
  }

  const reset = () => {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }

    status.value = 'idle'
    currentMode.value = 'focus'
    focusDoneCount.value = 0
    initializeTimer()
  }

  const skip = () => {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }

    completeSession()
  }

  const completeSession = () => {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }

    const settings = settingsStore.settings.value

    if (currentMode.value === 'focus') {
      focusDoneCount.value++

      currentMode.value = 'break'
      initializeTimer()
      status.value = 'idle'
    } else {
      currentMode.value = 'focus'

      if (focusDoneCount.value >= settings.focusCount) {
        focusDoneCount.value = 0
      }

      initializeTimer()
      status.value = 'idle'
    }
  }

  watch(
    () => settingsStore.settings.value,
    () => {
      if (status.value === 'idle') {
        initializeTimer()
      }
    },
    { deep: true, immediate: true },
  )

  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId)
    }
  })

  return {
    status,
    currentMode,
    timeRemaining,
    focusDoneCount,
    formatted,
    start,
    pause,
    resume,
    reset,
    skip,
  }
}
