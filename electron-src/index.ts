// Native
import { join } from "path"
import { format } from "url"

// Packages
import { BrowserWindow, app, ipcMain, IpcMainEvent, Tray, Menu } from "electron"
import isDev from "electron-is-dev"
import prepareNext from "electron-next"

app.on("ready", async () => {
    await prepareNext("./renderer")

    const mainWindow = new BrowserWindow({
        width: 800,
        darkTheme: true,
        // kiosk: true,
        // show: false,
        hasShadow: true,
        roundedCorners: true,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: false,
            preload: join(__dirname, "preload.js"),
        },
    })
    mainWindow.minimize()

    const appIcon = new Tray("./electron-src/favicon-1.ico")

    const contextMenu = Menu.buildFromTemplate([
        {
            label: "Показать/Скрыть",
            type: "normal",
            click: () => {
                if (mainWindow.isMinimized()) {
                    // appIcon.displayBalloon({
                    //     title: "asdsad",
                    //     content: "asdsadsadsa",
                    //     iconType: "error",
                    // })
                    mainWindow.restore()
                } else {
                    mainWindow.minimize()
                }
            },
        },
        { label: "Выход", type: "normal", click: () => mainWindow.close() },
    ])
    contextMenu.items[0].checked = true
    appIcon.setContextMenu(contextMenu)

    const url = isDev
        ? "http://localhost:8000/"
        : format({
              pathname: join(__dirname, "../renderer/out/index.html"),
              protocol: "file:",
              slashes: true,
          })

    mainWindow.loadURL(url)
})

// Quit the app once all windows are closed
app.on("window-all-closed", app.quit)

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on("message", (event: IpcMainEvent, message: any) => {
    console.log(message)

    setTimeout(() => event.sender.send("message", message), 500)
})
