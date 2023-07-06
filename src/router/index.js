// createRouter 创建路由
// createWebHashHistory 哈希路由
import { createRouter, createWebHashHistory } from 'vue-router'

import Home from './../components/Home.vue'

const routes = [
    {
        name: 'login',
        path: '/login',
        meta: {
            title: '登录'
        },
        component: () => import('@/views/Login.vue')
    },
    {
        name: 'home',
        path: '/',
        component: Home,
        redirect: '/welcome',
        meta: {
            title: '首页'
        },
        children: [
            {
                name: 'welcome',
                path: '/welcome',
                component: () => import('@/views/Welcome.vue'),
                meta: {
                    title: '欢迎页'
                },
            },
            {
                name: 'user',
                path: 'system/user',
                component: () => import('@/views/User.vue'),
                meta: {
                    title: '用户管理'
                },
            },
            {
                name: 'menu',
                path: 'system/menu',
                component: () => import('@/views/menu.vue'),
                meta: {
                    title: '菜单管理'
                }
            }

        ]
    },
]


const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router