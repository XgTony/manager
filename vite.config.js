import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  server:{
    // 服务地址
    host:'localhost',
    // 服务端口
    port:8080,
    // 代理
    proxy: {
      '/api':{
        target:'http://localhost:3000'
      }
    }
  },
  plugins: [vue()],
  resolve:{
    alias:{
      '@': resolve(__dirname,'src'),    //路径别名
    },
    extensions: ['.js','.json','.ts']
  },
})
