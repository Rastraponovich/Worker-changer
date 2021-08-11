"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Native
const path_1 = require("path");
// Packages
const electron_1 = require("electron");
const electron_is_dev_1 = __importDefault(require("electron-is-dev"));
const electron_next_1 = __importDefault(require("electron-next"));
const https_1 = require("https");
const axios_1 = __importDefault(require("axios"));
const test = async () => {
    const schema = `<?xml version="1.0" encoding="windows-1251"?>
    <RK7Query>
        <RK7Command2 CMD="GetRefData" RefName="EMPLOYEES" WithMacroProp="1" PropMask="items.(Code,Name,Ident,genTaxPayerIdNum,OfficialName,Status, GUIDString)" >
            <PROPFILTERS>
                <PROPFILTER name="MainParentIdent" value="100007"/>

            </PROPFILTERS>
        </RK7Command2>
    </RK7Query>`;
    const agent = new https_1.Agent({
        rejectUnauthorized: false,
        secureProtocol: "TLSv1_method",
    });
    const request = await axios_1.default.post(`https://10.20.4.2:86/rk7api/v0/xmlinterface.xml`, schema, {
        httpsAgent: agent,
        auth: {
            username: "Wilde",
            password: "1024",
        },
        timeout: 3000,
        headers: {
            "Content-Type": "text/xml",
        },
    });
    return request.data;
};
electron_1.app.on("ready", async () => {
    await electron_next_1.default("./renderer");
    const mainWindow = new electron_1.BrowserWindow({
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
            preload: path_1.join(__dirname, "preload.js"),
        },
    });
    mainWindow.minimize();
    mainWindow.on("minimize", () => {
        appIcon.displayBalloon({
            title: "asdsad",
            content: "asdsad",
        });
        mainWindow.hide();
    });
    const appIcon = new electron_1.Tray(path_1.join(__dirname, "favicon-1.ico"));
    const contextMenu = electron_1.Menu.buildFromTemplate([
        {
            label: "Показать/Скрыть",
            type: "normal",
            click: () => {
                if (mainWindow.isMinimized()) {
                    mainWindow.restore();
                }
                else {
                    mainWindow.minimize();
                }
            },
        },
        {
            label: "Обновить страницу",
            type: "normal",
            click: () => test(),
        },
        { label: "Выход", type: "normal", click: () => mainWindow.close() },
    ]);
    contextMenu.items[0].checked = true;
    appIcon.setContextMenu(contextMenu);
    const url = electron_is_dev_1.default
        ? "http://localhost:8000/"
        : // format({
            //       pathname: join(__dirname, "../renderer/out/index.html"),
            //       protocol: "file:",
            //       slashes: true,
            //   })
            `file://${path_1.join(__dirname, "../renderer/out/index.html")}`;
    mainWindow.loadURL(url);
});
// Quit the app once all windows are closed
electron_1.app.on("window-all-closed", electron_1.app.quit);
// listen the channel `message` and resend the received message to the renderer process
electron_1.ipcMain.on("message", (event, message) => {
    console.log(message);
    setTimeout(() => event.sender.send("message", message), 500);
});
electron_1.ipcMain.on("getEmp", async (event, message) => {
    console.log(message);
    const request = await test();
    setTimeout(() => event.sender.send("getEmp", request), 500);
});
