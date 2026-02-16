// Preload script per Electron
// Questo script viene eseguito prima che il contenuto della pagina venga caricato
// e può esporre API sicure al renderer process

import { contextBridge } from 'electron'

// Esponi API sicure al renderer process se necessario
// Esempio:
// contextBridge.exposeInMainWorld('electronAPI', {
//   // API esposte qui
// })
