import { app, BrowserWindow, Menu, shell, nativeImage } from 'electron'
import { join, dirname, resolve } from 'path'
import { fileURLToPath } from 'node:url'
import { existsSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Riferimento globale alla finestra principale
let mainWindow = null

// Determina il percorso dell'icona in base alla piattaforma
function getIconPath() {
  // In sviluppo: __dirname è out/main/, quindi risaliamo alla root del progetto
  // In produzione: resources viene copiata da electron-builder
  const resourcesPath = resolve(__dirname, '../../resources')
  
  let iconFile
  if (process.platform === 'win32') {
    iconFile = join(resourcesPath, 'icon.ico')
  } else if (process.platform === 'darwin') {
    iconFile = join(resourcesPath, 'icon.icns')
  } else {
    iconFile = join(resourcesPath, 'icon.png')
  }
  
  // Verifica che il file esista, altrimenti ritorna null
  return existsSync(iconFile) ? iconFile : null
}

function createWindow() {
  const iconPath = getIconPath()
  const windowOptions = {
    width: 1000,
    height: 700,
    minWidth: 1000,
    minHeight: 700,
    // Usa 'default' per permettere il drag della finestra
    // Se vuoi un design personalizzato, usa 'hiddenInset' e aggiungi CSS con -webkit-app-region: drag
    titleBarStyle: 'default',
    frame: true,
    show: false, // Non mostrare finché non è pronta
    webPreferences: {
      preload: join(__dirname, '../preload/preload.mjs'),
      contextIsolation: true,
      nodeIntegration: false,
      // Abilita DevTools solo in sviluppo
      devTools: process.env.NODE_ENV === 'development',
    },
  }
  
  // Aggiungi l'icona solo se esiste
  if (iconPath) {
    windowOptions.icon = iconPath
    console.log('Icona caricata da:', iconPath)
  } else {
    console.warn('Icona non trovata, usando icona di default')
  }
  
  mainWindow = new BrowserWindow(windowOptions)

  // Mostra la finestra quando è pronta (evita flash bianco)
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    
    // Focus sulla finestra
    if (process.env.NODE_ENV === 'development') {
      mainWindow.webContents.openDevTools()
    }
  })

  // Gestisci link esterni (apri nel browser predefinito)
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })

  // electron-vite gestisce automaticamente il caricamento in sviluppo
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173')
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  // Gestisci la chiusura della finestra
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// Crea il menu dell'applicazione
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
  // Imposta l'icona dell'app (per macOS principalmente)
  if (process.platform === 'darwin') {
    const iconPath = getIconPath()
    console.log('Tentativo di caricare icona da:', iconPath)
    
    if (iconPath) {
      try {
        // Usa createFromPath con il percorso assoluto
        const icon = nativeImage.createFromPath(iconPath)
        
        if (icon && !icon.isEmpty()) {
          // Imposta l'icona della dock (richiede un oggetto nativeImage, non un percorso)
          app.dock.setIcon(icon)
          console.log('✓ Icona dock impostata correttamente da:', iconPath)
          console.log('  Dimensioni icona:', icon.getSize())
        } else {
          console.warn('⚠ Icona vuota o non valida')
          // Prova a caricare come PNG come fallback
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
        console.error('✗ Errore nel caricare l\'icona della dock:', error.message)
        console.error('  Stack:', error.stack)
      }
    } else {
      console.warn('⚠ Percorso icona non trovato per la dock')
      console.warn('  __dirname:', __dirname)
    }
  }
  
  // Crea il menu dell'applicazione
  createMenu()
  
  // Crea la finestra principale
  createWindow()
  
  // Prevenire nuove finestre (opzionale, per app single-window)
  app.on('web-contents-created', (event, contents) => {
    contents.on('new-window', (event, navigationUrl) => {
      event.preventDefault()
      shell.openExternal(navigationUrl)
    })
  })
})

// Gestisci la chiusura dell'app su macOS
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
