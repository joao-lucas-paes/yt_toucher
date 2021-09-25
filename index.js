const { app, BrowserWindow, Menu, Tray } = require('electron');

var win = null;
var isOpen;
app.setUserTasks([]);

function createWindow () {
    isOpen = true;
    win = new BrowserWindow({
    width: 600,
    height: 600,
    minHeight:600,
    minWidth:600,
    maxHeight:600,
    maxWidth:600,
    webPreferences:{
        devTools:true,
        nodeIntegration:true,
        contextIsolation:false,
        nativeWindowOpen:true
    },
    autoHideMenuBar:true,
    frame:false,
    icon:__dirname+'/img/playIcon.png'
    });
    win.setThumbarButtons([
        {
          tooltip: 'button1',
          icon: __dirname+'/img/play.png',
          click () { console.log('button1 clicked') }
        }, {
          tooltip: 'button2',
          icon: __dirname+'/img/stop.png',
          click () { console.log('button2 clicked.') }
        }
      ]);
    win.loadFile(__dirname+'/html/index.html');
    win.blur=win.minimize();
}

app.whenReady().then(() => {
    var contextMenu = Menu.buildFromTemplate([
        { label: 'Abrir mini reprodutor', click:  function(){
            console.log(isOpen);
            if(isOpen)
                win.show();
            else
                createWindow();
        } },
        { label: 'Sair', click:  function(){
            app.isQuiting = true;
            app.quit();
        } }
    ]);
    tray = new Tray(__dirname+'/img/playIcon.png');
    tray.setContextMenu(contextMenu);
    createWindow();
    app.on('activate', ()=>{
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    })
})

app.on('window-all-closed',()=>{
    isOpen = false;
});
