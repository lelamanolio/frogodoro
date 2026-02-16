import { watch, onUnmounted } from 'vue'
import { useSettings } from './useSettings.js'

const soundFiles = {
  rain: 'rain.mp3',
  fire: 'fire.mp3',
  'white noise': 'white-noise.mp3',
}

function getSoundPath(soundType) {
  const filename = soundFiles[soundType]
  if (!filename) return null
  return `/sounds/${filename}`
}

export function useAmbientSound(statusRef, currentModeRef) {
  const settingsStore = useSettings()
  let audio = null

  function getShouldPlay() {
    const settings = settingsStore.settings.value
    const status = statusRef.value
    const mode = currentModeRef.value
    if (!settings.sounds) return false
    if (status !== 'running') return false
    if (mode === 'focus') return true
    return settings.soundOnBreak === true
  }

  function ensureAudio(soundType) {
    const path = getSoundPath(soundType)
    if (!path) return null
    if (audio && audio.src?.endsWith(path)) return audio
    if (audio) {
      audio.pause()
      audio = null
    }
    try {
      audio = new Audio(path)
      audio.loop = true
    } catch (e) {
      console.warn('Ambient sound not available:', path, e)
      return null
    }
    return audio
  }

  function updateVolume() {
    if (!audio) return
    const vol = settingsStore.settings.value.volume ?? 40
    audio.volume = Math.min(1, Math.max(0, vol / 100))
  }

  function tick() {
    const settings = settingsStore.settings.value
    const shouldPlay = getShouldPlay()

    if (!shouldPlay) {
      if (audio) {
        audio.pause()
        audio.currentTime = 0
      }
      return
    }

    const a = ensureAudio(settings.soundType)
    if (!a) return
    updateVolume()
    const playPromise = a.play()
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch((e) => {
        console.warn('Ambient sound play failed:', e)
      })
    }
  }

  const stop = watch(
    [
      statusRef,
      currentModeRef,
      () => settingsStore.settings.value.sounds,
      () => settingsStore.settings.value.soundOnBreak,
      () => settingsStore.settings.value.soundType,
      () => settingsStore.settings.value.volume,
    ],
    tick,
    { immediate: true, deep: true },
  )

  onUnmounted(() => {
    stop()
    if (audio) {
      audio.pause()
      audio = null
    }
  })

  return { tick }
}
