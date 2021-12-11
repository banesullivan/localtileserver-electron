const {
    app,
    dialog,
    BrowserWindow
} = require('electron')
const pyshell = require('python-shell');
const portfinder = require('portfinder');

function errorLog(err, results) {
    if (err) {
        console.log(err);
    }
};

function createWindow() {
    const path = dialog.showOpenDialog({
        properties: ['openFile', 'openDirectory'],
        message: 'Choose a raster',
    });

    portfinder.getPort((err, port) => {
        // `port` is guaranteed to be a free port in this scope.
        let options = {
            // pythonPath: '/path/to/python/bin/python3.7',
            args: [path, '--port', port, '--browser', false]
        };

        pyshell.run('engine.py', options, errorLog);
        url = `http://localhost:${port}`;
        console.log(url)

        const window = new BrowserWindow({
            width: 800,
            height: 600
        });
        window.loadFile('loading.html');

        setTimeout(() => {
            window.loadURL(url);
        }, 2000);
    })
};

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    app.quit()
})
