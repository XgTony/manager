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
                component: () => import('@/views/Menu.vue'),
                meta: {
                    title: '菜单管理'
                }
            },
            {
                name: 'role',
                path: 'system/role',
                component: () => import('@/views/Role.vue'),
                meta: {
                    title: '角色管理'
                }
            },
            {
                name: 'dept',
                path: 'system/dept',
                component: () => import('@/views/Dept.vue'),
                meta: {
                    title: '部门管理'
                }
            },
            {
                name: 'leave',
                path: 'audit/leave',
                component: () => import('@/views/Leave.vue'),
                meta: {
                    title: '审批管理'
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