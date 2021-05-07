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
        meta: { title: '首页', icon: 'icon-dashboard' }
    }]
}, {
    path: '/information',
    component: Layout,
    name: 'information',
    redirect: '/information/device',
    meta: { title: '数据信息', icon: 'icon-View' },
    children: [{
        path: 'device',
        name: 'Device',
        component: () => import('@/views/information/device.vue'),
        meta: { title: '设备信息', icon: 'icon-charge-device' }
    }, {
        path: 'statistics',
        name: 'Statistics',
        component: () => import('@/views/information/statistics.vue'),
        meta: { title: '统计信息', icon: 'icon-linechart' }
    }, {
        path: 'newData',
        name: 'NewData',
        component: () => import('@/views/information/newData/index.vue'),
        meta: { title: '数据管理', icon: 'icon-newData' }
    }]
}, {
    path: '/settings',
    component: Layout,
    name: 'Settings',
    redirect: '/settings/serverSetting',
    meta: { title: '设置', icon: 'icon-setting' },
    children: [{
        path: 'serverSetting',
        name: 'ServerSetting',
        component: () => import('@/views/settings/index.vue'),
        meta: { title: '模拟器设置', icon: 'icon-server' }
    }, {
        path: 'malfunctionSetting',
        name: 'MalfunctionSetting',
        component: () => import('@/views/settings/malfunctionSetting.vue'),
        meta: { title: '故障设置', icon: 'icon-malfunction' }
    }, {
        path: 'configSetting',
        name: 'ConfigSetting',
        component: () => import('@/views/settings/configSetting.vue'),
        meta: { title: '配置文件', icon: 'icon-config' }
    }]
}, {
    path: '/helper',
    component: Layout,
    name: 'Helper',
    redirect: '/helper/linux',
    meta: { title: '帮助文档', icon: 'icon-help' },
    children: [{
        path: 'linux',
        name: 'Linux',
        component: () => import('@/views/helper/linux.vue'),
        meta: { title: '服务端', icon: 'icon-linux' }
    }, {
        path: 'desktop',
        name: 'Desktop',
        component: () => import('@/views/helper/desktop.vue'),
        meta: { title: '桌面端', icon: 'icon-pc' }
    }, {
        path: 'web',
        name: 'Web',
        component: () => import('@/views/helper/web.vue'),
        meta: { title: 'web端', icon: 'icon-web' }
    },]
}];
const router = createRouter({
    history: createWebHistory(),
    routes: routers
});

export default router;