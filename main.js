const { app, BrowserWindow, Tray, Menu } = require("electron");
const path = require('path');

let mainWindow, isQuiting, tray;

app.on('before-quit', function () {
    isQuiting = true;
    tray.destroy();
  });

app.whenReady().then(() => {
    tray = new Tray(path.join(__dirname, 'tomato.png'));

    tray.setContextMenu(Menu.buildFromTemplate([
        {
            label: 'Show App', click: function () {
                mainWindow.show();
            }
        },
        {
            label: 'Quit', click: function () {
                isQuiting = true;
                app.quit();
            }
        }
    ]));

    tray.on('click', function (event) {
        mainWindow.show();
    });

    mainWindow = new BrowserWindow({
        width: 400,
        height: 350,
        autoHideMenuBar: true,
        resizable: false,        
        webPreferences: {
        nodeIntegration: true,
        },
    });

    mainWindow.loadFile("index.html");

    mainWindow.on('minimize',function(event){
        event.preventDefault();
        mainWindow.hide();
    });

    mainWindow.on('close', function (event) {
        if(!isQuiting){
            event.preventDefault();
            mainWindow.hide();
            event.returnValue = false;
        }    
        return false;
    });

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});