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
    console.log('Icon loaded from:', iconPath)
  } else {
    console.warn('Icon not found, using default icon')
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
          label: 'Quit',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => {
            app.quit()
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo', label: 'Undo' },
        { role: 'redo', label: 'Redo' },
        { type: 'separator' },
        { role: 'cut', label: 'Cut' },
        { role: 'copy', label: 'Copy' },
        { role: 'paste', label: 'Paste' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload', label: 'Reload' },
        { role: 'forceReload', label: 'Force Reload' },
        { role: 'toggleDevTools', label: 'Developer Tools' },
        { type: 'separator' },
        { role: 'resetZoom', label: 'Actual Size' },
        { role: 'zoomIn', label: 'Zoom In' },
        { role: 'zoomOut', label: 'Zoom Out' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'Toggle Full Screen' },
      ],
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize', label: 'Minimize' },
        { role: 'close', label: 'Close' },
      ],
    },
  ]

  // macOS-specific menu
  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: 'about', label: 'About ' + app.getName() },
        { type: 'separator' },
        { role: 'services', label: 'Services' },
        { type: 'separator' },
        { role: 'hide', label: 'Hide ' + app.getName() },
        { role: 'hideOthers', label: 'Hide Others' },
        { role: 'unhide', label: 'Show All' },
        { type: 'separator' },
        { role: 'quit', label: 'Quit ' + app.getName() },
      ],
    })
  }

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

app.whenReady().then(() => {
  if (process.platform === 'darwin') {
    const iconPath = getIconPath()
    console.log('Attempting to load icon from:', iconPath)

    if (iconPath) {
      try {
        const icon = nativeImage.createFromPath(iconPath)

        if (icon && !icon.isEmpty()) {
          app.dock.setIcon(icon)
          console.log('✓ Dock icon set successfully from:', iconPath)
          console.log('  Icon size:', icon.getSize())
        } else {
          console.warn('⚠ Icon empty or invalid')
          const pngPath = iconPath.replace('.icns', '.png')
          if (existsSync(pngPath)) {
            const pngIcon = nativeImage.createFromPath(pngPath)
            if (!pngIcon.isEmpty()) {
              app.dock.setIcon(pngIcon)
              console.log('✓ Using PNG icon as fallback')
            }
          }
        }
      } catch (error) {
        console.error('✗ Error loading dock icon:', error.message)
        console.error('  Stack:', error.stack)
      }
    } else {
      console.warn('⚠ Icon path not found for dock')
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
