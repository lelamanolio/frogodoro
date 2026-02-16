# 🐸 Frogodoro

A free, minimal Pomodoro timer app with ambient sounds and reminders. Built with Vue and Electron.

---

## What is Frogodoro?

Frogodoro is a distraction-free Pomodoro timer designed to help you stay focused and take care of yourself during long work sessions. It sits quietly in the background with ambient sounds, tracks your focus sessions, and reminds you to drink water — no subscriptions, no accounts, no cloud.

---

## Download

[⬇️ Download the latest release](https://github.com/lelamanolio/frogodoro/releases)

---

## Settings

### Timer

| Setting | Description |
|---|---|
| **Sessions** | Number of focus sessions before a long break kicks in |
| **Focus Time** | Duration of each focus session, in minutes |
| **Short Break Time** | Duration of the short break between sessions, in minutes |
| **Long Break** | Enable or disable the long break at the end of a full cycle |
| **Long Break Time** | Duration of the long break, in minutes |

### Sounds

| Setting | Description |
|---|---|
| **Sounds** | Enable or disable ambient sounds entirely |
| **Sounds On Break** | Whether ambient sounds keep playing during breaks. If off, sounds stop when a break starts and resume when focus resumes |
| **Ambient Sound** | Choose between Rain, Fire, or White Noise |
| **Sounds Volume** | Volume level for ambient sounds |

### Reminders

| Setting | Description |
|---|---|
| **Reminders** | Enable periodic reminders while the timer is running — useful for remembering to drink water, stretch, or just take a breath |
| **Reminder Interval** | How often the reminder plays, in minutes. Runs independently from the Pomodoro cycle, so it's not tied to sessions or breaks |

### System

| Setting | Description |
|---|---|
| **Follow System Theme** | Automatically match your OS light/dark mode |
| **Dark Mode** | Manually toggle dark mode, when Follow System Theme is off |

---

## Getting Started

### Dev mode

```bash
npm run electron-dev
```

### Build for all platforms

```bash
npm run electron-build:all
```

This generates:
- `.dmg` for macOS
- `.exe` for Windows
- `.AppImage` and `.deb` for Linux

---

## Tech Stack

- [Vue 3](https://vuejs.org/)
- [Electron](https://www.electronjs.org/)
- [electron-vite](https://electron-vite.org/)
- [electron-builder](https://www.electron.build/)

---