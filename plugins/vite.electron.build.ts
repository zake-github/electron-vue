// 生产环境插件
import type { Plugin } from 'vite';

// vite 插件要求导出一个对象 有一个name属性

export const ElectronPlugins = (): Plugin => {
    return {
        name: 'electron-dev', 
        // 配置vite钩子
        configureServer(server) {
            server?.httpServer?.on('listening', () => {
                const addressInfo = server.httpServer?.address()
                console.log(addressInfo)
            })

        }
    }
}