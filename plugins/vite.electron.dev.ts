// 开发环境插件
import type { Plugin } from 'vite';
import type { AddressInfo } from 'net';
import { spawn } from 'child_process';
import fs from 'node:fs';

// vite 插件要求导出一个对象 有一个name属性
const buildBackground = () => {
  require('esbuild').buildSync({
    entryPoints: ['src/background.ts'],
    bundle: true,
    outfile: 'dist/background.js',
    platform: 'node',
    target: 'node16',
    external: ['electron']
  });
};
export const ElectronPlugins = (): Plugin => {
  return {
    name: 'electron-dev',
    // 配置vite钩子
    configureServer(server) {
      buildBackground();
      server?.httpServer?.on('listening', () => {
        //读取vite服务信息
        const addressInfo = server.httpServer?.address() as AddressInfo;
        //拼接ip electron启动服务使用
        const IP = `http://localhost:${addressInfo.port}`;
        //第一个参数是electron入口文件
        //require('electron')返回一个路径
        //electron 需要把ts编译成js
        //进程传参法发送给electron
        //electron 0 'dist/background.js' 1 IP 2 参数顺序
        let ElectronProcess = spawn(require('electron'), [
          'dist/background.js',
          IP
        ]);
        fs.watchFile('src/background.ts', () => {
          ElectronProcess.kill();
          buildBackground();
          ElectronProcess = spawn(require('electron'), [
            'dist/background.js',
            IP
          ]);
        });
        ElectronProcess.stderr.on('data', data => {
          console.log('日志', data.toString());
        });
        console.log(IP);
      });
    }
  };
};
