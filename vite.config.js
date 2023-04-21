import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    // 服务地址
    host:'localhost',
    // 服务端口
    port:8080,
    // 代理
    proxy: {
      
    }
  },
  plugins: [vue()],
})
