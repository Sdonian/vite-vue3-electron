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
    path: '/information',
    component: Layout,
    name: 'information',
    redirect: '/information/device',
    meta: { title: '数据信息' },
    children: [{
        path: 'device',
        name: 'Device',
        component: () => import('@/views/information/device.vue'),
        meta: { title: '设备信息' }
    }, {
        path: 'statistics',
        name: 'Statistics',
        component: () => import('@/views/information/statistics.vue'),
        meta: { title: '统计信息' }
    }]
}, {
    path: '/settings',
    component: Layout,
    name: 'Settings',
    redirect: '/settings/serverSetting',
    meta: { title: '设置' },
    children: [{
        path: 'serverSetting',
        name: 'ServerSetting',
        component: () => import('@/views/settings/index.vue'),
        meta: { title: '模拟器设置' }
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