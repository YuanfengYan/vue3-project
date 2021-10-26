import { createApp } from 'vue'
import App from './App.vue'
import VueRouter from "./router/index.js"
import './mock'

createApp(App).use(VueRouter).mount('#app')
