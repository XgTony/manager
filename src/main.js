import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
// 引入element-plus 组件库
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import router from './router'
import store from './store'
import api from '@/api/index.js'

import request from './utils/request'
import storage from './utils/storage'
import vue3JsonExcel from 'vue3-json-excel'
const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(store)
app.use(vue3JsonExcel)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
// 全局挂载$request
app.config.globalProperties.$request = request
// 全局挂载$storage
app.config.globalProperties.$storage = storage
app.config.globalProperties.$api = api
app.mount('#app')