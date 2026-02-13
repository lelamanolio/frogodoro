import { ref } from 'vue'

const storageKey = 'frogodoro.settings'

const settings = ref({
  focusCount: 4,
  focusTime: 25,
  shortBreakTime: 5,
  longBreak: true,
  longBreakTime: 15,
  sounds: true,
  soundType: 'rain',
  volume: 40,
  useSystemTheme: true,
  darkMode: false,
});

function loadSettings () {
  try {
    const raw = localStorage.getItem(storageKey)

    if (raw) {
      settings.value = JSON.parse(raw)
    }
  } catch (e) {
    console.error(e)
  }
}

const setCustomSettings = () => {
  localStorage.setItem(storageKey, JSON.stringify(settings.value))
}

function updateSettings(key, value) {
  settings.value[key] = value;

  setCustomSettings();
}


export function useSettings() {
  return {
    settings,
    loadSettings,
    updateSettings
  }
}
