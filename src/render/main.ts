import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuex from './store'
//import {ElButton,ElSelect} from 'element-plus'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import './style/index.scss'

//element-plus global options
const elgOptions = { size: 'small', zIndex: 3000 };

const vueApp = createApp(App);


//全部导入
vueApp.use(ElementPlus, elgOptions);
//按需导入s
// vueApp.component(ElButton.name, ElButton);
// vueApp.component(ElSelect.name, ElSelect);
//vueApp.config.globalProperties.$ELEMENT = elgOptions;
vueApp.use(vuex);
vueApp.use(router);
vueApp.mount('#app');

