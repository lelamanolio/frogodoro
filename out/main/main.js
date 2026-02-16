import { app, nativeImage, shell, BrowserWindow, Menu } from "electron";
import { dirname, resolve, join } from "path";
import { fileURLToPath } from "node:url";
import { existsSync } from "fs";
import __cjs_mod__ from "node:module";
const __filename = import.meta.filename;
const __dirname = import.meta.dirname;
const require2 = __cjs_mod__.createRequire(import.meta.url);
const __dirname$1 = dirname(fileURLToPath(import.meta.url));
let mainWindow = null;
function getIconPath() {
  const resourcesPath = resolve(__dirname$1, "../../resources");
  let iconFile;
  if (process.platform === "win32") {
    iconFile = join(resourcesPath, "icon.ico");
  } else if (process.platform === "darwin") {
    iconFile = join(resourcesPath, "icon.icns");
  } else {
    iconFile = join(resourcesPath, "icon.png");
  }
  return existsSync(iconFile) ? iconFile : null;
}
function createWindow() {
  const iconPath = getIconPath();
  const windowOptions = {
    width: 1e3,
    height: 700,
    minWidth: 1e3,
    minHeight: 700,
    // Usa 'default' per permettere il drag della finestra
    // Se vuoi un design personalizzato, usa 'hiddenInset' e aggiungi CSS con -webkit-app-region: drag
    titleBarStyle: "default",
    frame: true,
    show: false,
    // Non mostrare finché non è pronta
    webPreferences: {
      preload: join(__dirname$1, "../preload/preload.mjs"),
      contextIsolation: true,
      nodeIntegration: false,
      // Abilita DevTools solo in sviluppo
      devTools: process.env.NODE_ENV === "development"
    }
  };
  if (iconPath) {
    windowOptions.icon = iconPath;
    console.log("Icona caricata da:", iconPath);
  } else {
    console.warn("Icona non trovata, usando icona di default");
  }
  mainWindow = new BrowserWindow(windowOptions);
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    if (process.env.NODE_ENV === "development") {
      mainWindow.webContents.openDevTools();
    }
  });
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });
  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:5173");
  } else {
    mainWindow.loadFile(join(__dirname$1, "../renderer/index.html"));
  }
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}
function createMenu() {
  const template = [
    {
      label: "File",
      submenu: [
        {
          label: "Esci",
          accelerator: process.platform === "darwin" ? "Cmd+Q" : "Ctrl+Q",
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: "Modifica",
      submenu: [
        { role: "undo", label: "Annulla" },
        { role: "redo", label: "Ripeti" },
        { type: "separator" },
        { role: "cut", label: "Taglia" },
        { role: "copy", label: "Copia" },
        { role: "paste", label: "Incolla" }
      ]
    },
    {
      label: "Visualizza",
      submenu: [
        { role: "reload", label: "Ricarica" },
        { role: "forceReload", label: "Forza ricarica" },
        { role: "toggleDevTools", label: "Strumenti sviluppatore" },
        { type: "separator" },
        { role: "resetZoom", label: "Zoom normale" },
        { role: "zoomIn", label: "Ingrandisci" },
        { role: "zoomOut", label: "Riduci" },
        { type: "separator" },
        { role: "togglefullscreen", label: "Schermo intero" }
      ]
    },
    {
      label: "Finestra",
      submenu: [
        { role: "minimize", label: "Riduci a icona" },
        { role: "close", label: "Chiudi" }
      ]
    }
  ];
  if (process.platform === "darwin") {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: "about", label: "Informazioni su " + app.getName() },
        { type: "separator" },
        { role: "services", label: "Servizi" },
        { type: "separator" },
        { role: "hide", label: "Nascondi " + app.getName() },
        { role: "hideOthers", label: "Nascondi altre" },
        { role: "unhide", label: "Mostra tutte" },
        { type: "separator" },
        { role: "quit", label: "Esci da " + app.getName() }
      ]
    });
  }
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
app.whenReady().then(() => {
  if (process.platform === "darwin") {
    const iconPath = getIconPath();
    console.log("Tentativo di caricare icona da:", iconPath);
    if (iconPath) {
      try {
        const icon = nativeImage.createFromPath(iconPath);
        if (icon && !icon.isEmpty()) {
          app.dock.setIcon(icon);
          console.log("✓ Icona dock impostata correttamente da:", iconPath);
          console.log("  Dimensioni icona:", icon.getSize());
        } else {
          console.warn("⚠ Icona vuota o non valida");
          const pngPath = iconPath.replace(".icns", ".png");
          if (existsSync(pngPath)) {
            const pngIcon = nativeImage.createFromPath(pngPath);
            if (!pngIcon.isEmpty()) {
              app.dock.setIcon(pngIcon);
              console.log("✓ Usata icona PNG come fallback");
            }
          }
        }
      } catch (error) {
        console.error("✗ Errore nel caricare l'icona della dock:", error.message);
        console.error("  Stack:", error.stack);
      }
    } else {
      console.warn("⚠ Percorso icona non trovato per la dock");
      console.warn("  __dirname:", __dirname$1);
    }
  }
  createMenu();
  createWindow();
  app.on("web-contents-created", (event, contents) => {
    contents.on("new-window", (event2, navigationUrl) => {
      event2.preventDefault();
      shell.openExternal(navigationUrl);
    });
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
