import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '../layout/index.vue'

const routers: RouteRecordRaw[] = [{
    path: '/404',
    component: () => import('@/views/404.vue'),
    meta: {
        hidden: true
    }
}, {
    path: '/',
    component: Layout,
    name: 'Home',
    redirect: '/home',
    meta: {},
    children: [{
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: { title: '首页' }
    }]
}, {
    path: '/settings',
    component: Layout,  
    name: 'Settings',
    redirect: '/settings/base',
    meta: { title: '设置' },
    children: [{
        path: 'base',
        name: 'Settings',
        component: () => import('@/views/settings/index.vue'),
        meta: { title: '基础' }
    }, {
        path: 'configSetting',
        name: 'ConfigSetting',
        component: () => import('@/views/settings/configSetting.vue'),
        meta: { title: '配置文件' }
    }]
}];
const router = createRouter({
    history: createWebHistory(),
    routes: routers
});

export default router;