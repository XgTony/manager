import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// https://vitejs.dev/config/
const ENV = process.env.NODE_ENV;
export default defineConfig({
  publicPath: ENV === "development" ? "" : "./",
  server: {
    // 服务地址
    host: 'localhost',
    // 服务端口
    port: 8080,
    // 代理
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      }
    }
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),    //路径别名
    },
    extensions: ['.js', '.json', '.ts']
  },

  build: {
    chunkSizeWarningLimit: 1500,
  },


})
