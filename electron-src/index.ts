// Native
import { join } from "path"

// Packages
import { BrowserWindow, app, ipcMain, IpcMainEvent, Tray, Menu } from "electron"
import isDev from "electron-is-dev"
import prepareNext from "electron-next"
import { Agent } from "https"
import axios from "axios"

const test = async () => {
    const schema = `<?xml version="1.0" encoding="windows-1251"?>
    <RK7Query>
        <RK7Command2 CMD="GetRefData" RefName="EMPLOYEES" WithMacroProp="1" PropMask="items.(Code,Name,Ident,genTaxPayerIdNum,OfficialName,Status, GUIDString)" >
            <PROPFILTERS>
                <PROPFILTER name="MainParentIdent" value="100007"/>

            </PROPFILTERS>
        </RK7Command2>
    </RK7Query>`
    const agent = new Agent({
        rejectUnauthorized: false,
        secureProtocol: "TLSv1_method",
    })
    const request = await axios.post(
        `https://10.20.4.2:86/rk7api/v0/xmlinterface.xml`,
        schema,
        {
            httpsAgent: agent,
            auth: {
                username: "Wilde",
                password: "1024",
            },
            timeout: 3000,
            headers: {
                "Content-Type": "text/xml",
            },
        }
    )
    return request.data
}

app.on("ready", async () => {
    await prepareNext("./renderer")

    const mainWindow = new BrowserWindow({
        width: 800,
        darkTheme: true,
        hasShadow: true,
        roundedCorners: true,
        // frame: false,
        height: 600,
        // skipTaskbar: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: false,
            preload: join(__dirname, "preload.js"),
        },
    })
    mainWindow.minimize()

    mainWindow.on("minimize", () => {
        appIcon.displayBalloon({
            title: "asdsad",
            content: "asdsad",
        })
        mainWindow.hide()
    })
    const appIcon = new Tray(join(__dirname, "favicon-1.ico"))

    const contextMenu = Menu.buildFromTemplate([
        {
            label: "Показать/Скрыть",
            type: "normal",
            click: () => {
                if (mainWindow.isMinimized()) {
                    mainWindow.restore()
                } else {
                    mainWindow.minimize()
                }
            },
        },
        {
            label: "Обновить страницу",
            type: "normal",
            click: () => test(),
        },

        { label: "Выход", type: "normal", click: () => mainWindow.close() },
    ])
    contextMenu.items[0].checked = true
    appIcon.setContextMenu(contextMenu)

    const url = isDev
        ? "http://localhost:8000/"
        : // format({
          //       pathname: join(__dirname, "../renderer/out/index.html"),
          //       protocol: "file:",
          //       slashes: true,
          //   })
          `file://${join(__dirname, "../renderer/out/index.html")}`

    mainWindow.loadURL(url)
})

// Quit the app once all windows are closed
app.on("window-all-closed", app.quit)

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on("message", (event: IpcMainEvent, message: any) => {
    console.log(message)

    setTimeout(() => event.sender.send("message", message), 500)
})
ipcMain.on("getEmp", async (event: IpcMainEvent, message: any) => {
    console.log(message)
    const request = await test()
    setTimeout(() => event.sender.send("getEmp", request), 500)
})
