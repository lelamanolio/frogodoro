import { app, BrowserWindow, Menu, shell, nativeImage } from 'electron'
import { join, dirname, resolve } from 'path'
import { fileURLToPath } from 'node:url'
import { existsSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))

let mainWindow = null

function getIconPath() {
  const resourcesPath = resolve(__dirname, '../../resources')

  let iconFile
  if (process.platform === 'win32') {
    iconFile = join(resourcesPath, 'icon.ico')
  } else if (process.platform === 'darwin') {
    iconFile = join(resourcesPath, 'icon.icns')
  } else {
    iconFile = join(resourcesPath, 'icon.png')
  }

  return existsSync(iconFile) ? iconFile : null
}

function createWindow() {
  const iconPath = getIconPath()
  const windowOptions = {
    width: 1000,
    height: 700,
    minWidth: 1000,
    minHeight: 700,
    titleBarStyle: 'default',
    frame: true,
    show: false,
    webPreferences: {
      preload: join(__dirname, '../preload/preload.mjs'),
      contextIsolation: true,
      nodeIntegration: false,
      devTools: process.env.NODE_ENV === 'development',
    },
  }

  if (iconPath) {
    windowOptions.icon = iconPath
    console.log('Icona caricata da:', iconPath)
  } else {
    console.warn('Icona non trovata, usando icona di default')
  }

  mainWindow = new BrowserWindow(windowOptions)

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()

    if (process.env.NODE_ENV === 'development') {
      mainWindow.webContents.openDevTools()
    }
  })

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173')
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

function createMenu() {
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Esci',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => {
            app.quit()
          },
        },
      ],
    },
    {
      label: 'Modifica',
      submenu: [
        { role: 'undo', label: 'Annulla' },
        { role: 'redo', label: 'Ripeti' },
        { type: 'separator' },
        { role: 'cut', label: 'Taglia' },
        { role: 'copy', label: 'Copia' },
        { role: 'paste', label: 'Incolla' },
      ],
    },
    {
      label: 'Visualizza',
      submenu: [
        { role: 'reload', label: 'Ricarica' },
        { role: 'forceReload', label: 'Forza ricarica' },
        { role: 'toggleDevTools', label: 'Strumenti sviluppatore' },
        { type: 'separator' },
        { role: 'resetZoom', label: 'Zoom normale' },
        { role: 'zoomIn', label: 'Ingrandisci' },
        { role: 'zoomOut', label: 'Riduci' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'Schermo intero' },
      ],
    },
    {
      label: 'Finestra',
      submenu: [
        { role: 'minimize', label: 'Riduci a icona' },
        { role: 'close', label: 'Chiudi' },
      ],
    },
  ]

  // Menu specifico per macOS
  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: 'about', label: 'Informazioni su ' + app.getName() },
        { type: 'separator' },
        { role: 'services', label: 'Servizi' },
        { type: 'separator' },
        { role: 'hide', label: 'Nascondi ' + app.getName() },
        { role: 'hideOthers', label: 'Nascondi altre' },
        { role: 'unhide', label: 'Mostra tutte' },
        { type: 'separator' },
        { role: 'quit', label: 'Esci da ' + app.getName() },
      ],
    })
  }

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

app.whenReady().then(() => {
  if (process.platform === 'darwin') {
    const iconPath = getIconPath()
    console.log('Tentativo di caricare icona da:', iconPath)

    if (iconPath) {
      try {
        const icon = nativeImage.createFromPath(iconPath)

        if (icon && !icon.isEmpty()) {
          app.dock.setIcon(icon)
          console.log('✓ Icona dock impostata correttamente da:', iconPath)
          console.log('  Dimensioni icona:', icon.getSize())
        } else {
          console.warn('⚠ Icona vuota o non valida')
          const pngPath = iconPath.replace('.icns', '.png')
          if (existsSync(pngPath)) {
            const pngIcon = nativeImage.createFromPath(pngPath)
            if (!pngIcon.isEmpty()) {
              app.dock.setIcon(pngIcon)
              console.log('✓ Usata icona PNG come fallback')
            }
          }
        }
      } catch (error) {
        console.error("✗ Errore nel caricare l'icona della dock:", error.message)
        console.error('  Stack:', error.stack)
      }
    } else {
      console.warn('⚠ Percorso icona non trovato per la dock')
      console.warn('  __dirname:', __dirname)
    }
  }

  createMenu()

  createWindow()

  app.on('web-contents-created', (event, contents) => {
    contents.on('new-window', (event, navigationUrl) => {
      event.preventDefault()
      shell.openExternal(navigationUrl)
    })
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
