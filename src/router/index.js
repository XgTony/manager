// createRouter 创建路由
// createWebHashHistory 哈希路由
import { createRouter, createWebHashHistory } from 'vue-router'
import HelloWorld from './../components/HelloWorld.vue'
import Welcome from './../components/Welcome.vue'
import Login from './../components/Login.vue'
import Home from './../components/Home.vue'

const routes = [
    {
        name: 'home',
        path: '/',
        component: Home,
        redirect: '/welcome',
        meta:{
            title: '首页'
        },
        children: [
            {
                name: 'welcome',
                path: '/welcome',
                component: Welcome,
                meta:{
                    title: '欢迎页'
                },
            },
            {
                name: 'login',
                path: '/login',
                component: Login,
                meta:{
                    title: '登录'
                },
            },
        ]
    }
]


const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router