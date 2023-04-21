import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 引入element-plus 组件库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import axios from 'axios'
import config from './config'
// 获取环境变量
// 环境变量通常可以从 process.env 获得, 注意 Vite 默认是不加载 .env 文件的
const env = import.meta.env
const app = createApp(App)

app.use(router)
app.use(ElementPlus)
console.log(config);
axios.get(config.mockApi+'/login').then(res => console.log(res))

app.mount('#app')