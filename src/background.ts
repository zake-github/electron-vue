// electron 主进程文件

import { app, BrowserWindow } from 'electron';

app.whenReady().then(() => {
  const win = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true, //可以在渲染进程中使用node的api 为了安全不允许使用
      contextIsolation: false, //关闭渲染进程的沙箱
      webSecurity: false //关闭跨域检测
    }
  });
  if (process.argv[2]) {
    win.webContents.openDevTools(); // 开发环境控制台
    win.loadURL(process.argv[2]); //开发环境
  } else {
    win.loadFile('index.html'); //生产环境
  }
});
