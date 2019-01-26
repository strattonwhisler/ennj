const path = require('path');
const url = require('url');
const {
    app,
    protocol,
    BrowserWindow
} = require('electron');

let window;

app.on('ready', () => {
    protocol.registerFileProtocol('ennj', (request, callback) => {
        const requrl = new url.URL(request.url);
        if(requrl.hostname === 'res') {
            callback(path.join(__dirname, '..', 'res', requrl.pathname));
        } else {
            callback(null);
        }
    }, (err) => {
        if(err) console.error('Failed to register \'res://\' protocol')
    });

    window = new BrowserWindow({
        width: 900,
        height: 600,
        // fullscreen: true,
        webPreferences: {
            javascript: true,
            webgl: true,
            webaudio: true,
            devTools: true,
            nodeIntegration: true,
            nodeIntegrationInWorker: true
        }
    });

    window.webContents.openDevTools();

    window.loadURL(url.format({
        pathname: path.join(__dirname, '..', 'test.html'),
        protocol: 'file',
        slashes: true
    }));

    window.on('closed', () => {
        window = null;
    });
});

app.on('window-all-closed', () => {
    app.quit();
});
