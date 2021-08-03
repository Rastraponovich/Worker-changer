"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Native
const path_1 = require("path");
const url_1 = require("url");
// Packages
const electron_1 = require("electron");
const electron_is_dev_1 = __importDefault(require("electron-is-dev"));
const electron_next_1 = __importDefault(require("electron-next"));
electron_1.app.on("ready", async () => {
    await electron_next_1.default("./renderer");
    const mainWindow = new electron_1.BrowserWindow({
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
            preload: path_1.join(__dirname, "preload.js"),
        },
    });
    mainWindow.minimize();
    const appIcon = new electron_1.Tray("./electron-src/favicon-1.ico");
    mainWindow.addListener("minimize", (event) => {
        appIcon.displayBalloon({
            title: "test",
            content: "test booble",
            iconType: "custom",
        });
        event.sender.send("app-command");
    });
    const contextMenu = electron_1.Menu.buildFromTemplate([
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
                    mainWindow.restore();
                }
                else {
                    mainWindow.minimize();
                }
            },
        },
        { label: "Выход", type: "normal", click: () => mainWindow.close() },
    ]);
    contextMenu.items[0].checked = true;
    appIcon.setContextMenu(contextMenu);
    const url = electron_is_dev_1.default
        ? "http://localhost:8000/"
        : url_1.format({
            pathname: path_1.join(__dirname, "../renderer/out/index.html"),
            protocol: "file:",
            slashes: true,
        });
    mainWindow.loadURL(url);
});
// Quit the app once all windows are closed
electron_1.app.on("window-all-closed", electron_1.app.quit);
// listen the channel `message` and resend the received message to the renderer process
electron_1.ipcMain.on("message", (event, message) => {
    console.log(message);
    setTimeout(() => event.sender.send("message", message), 500);
});
