import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuex from './store'
//import {ElButton,ElSelect} from 'element-plus'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'
//import './styles/element-variables.module.scss'
import './styles/index.scss'
import './permission'
import tableLoadMore from '@/directive/el-table/tableLoadMore'

//element-plus global options
const elgOptions = { size: 'small', zIndex: 3000, locale };

const vueApp = createApp(App);


//全部导入
vueApp.use(ElementPlus, elgOptions);
//按需导入s
// vueApp.component(ElButton.name, ElButton);
// vueApp.component(ElSelect.name, ElSelect);
//vueApp.config.globalProperties.$ELEMENT = elgOptions;
vueApp.use(vuex);
vueApp.use(router);
vueApp.directive("tableLoadMore", tableLoadMore);
vueApp.mount('#app');

