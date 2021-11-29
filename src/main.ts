import { createApp } from 'vue'
import App from './App.vue'
import VueRouter from "./router/index"

// ui框架
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// mock数据
import './mock'
// vuex
import {store} from '@/store'



const app = createApp(App)
app.use(VueRouter).use(store).use(ElementPlus).mount('#app')

// @ts-ignore
window.app = app

export default app

