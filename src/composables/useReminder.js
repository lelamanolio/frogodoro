import { watch, onUnmounted } from 'vue'
import { useSettings } from './useSettings.js'

const base = typeof import.meta.env?.BASE_URL === 'string' ? import.meta.env.BASE_URL : '/'
const chimesPath = `${base}sounds/chimes.mp3`

export function useReminder(statusRef) {
  const settingsStore = useSettings()
  let timeoutId = null
  let intervalId = null
  let audio = null

  function playChimes() {
    const settings = settingsStore.settings.value
    if (!settings.reminders) return

    try {
      if (!audio) {
        audio = new Audio(chimesPath)
      }
      const vol = settings.volume ?? 40
      audio.volume = Math.min(1, Math.max(0, vol / 100))
      audio.currentTime = 0
      const playPromise = audio.play()
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch((e) => {
          console.warn('Reminder chimes play failed:', e)
        })
      }
    } catch (e) {
      console.warn('Reminder chimes not available:', e)
    }
  }

  function clearScheduling() {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  function scheduleReminders() {
    clearScheduling()

    const settings = settingsStore.settings.value
    if (statusRef.value !== 'running' || !settings.reminders) return

    const minutesMs = (settings.remindersTime || 10) * 60 * 1000

    timeoutId = setTimeout(() => {
      timeoutId = null
      playChimes()
      intervalId = setInterval(playChimes, minutesMs)
    }, minutesMs)
  }

  const stop = watch(
    [
      statusRef,
      () => settingsStore.settings.value.reminders,
      () => settingsStore.settings.value.remindersTime,
    ],
    scheduleReminders,
    { immediate: true },
  )

  onUnmounted(() => {
    stop()
    clearScheduling()
    audio = null
  })
}
