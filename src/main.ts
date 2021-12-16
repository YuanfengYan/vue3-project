import { createApp } from 'vue'
import App from './App.vue'
import VueRouter from "./router/index"
// VueCesium 地球相关
import VueCesium from 'vue-cesium'
import 'vue-cesium/dist/index.css'
// ui框架
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入icon
import * as ElIconModules from '@element-plus/icons'

// mock数据
import './mock'

// vuex
import {store} from '@/store'

// // 权限permission
import "@/router/permission"

const app = createApp(App)
// 统一注册Icon图标
for (const iconName in ElIconModules) {
  if (Reflect.has(ElIconModules, iconName)) {
    const item = ElIconModules[iconName]
    app.component(iconName, item)
  }
}
app.use(VueCesium,{
  // cesiumPath: "./Cesium/Cesium.js",
  // accessToken:
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2ZmFiZjQxYS0xNjk0LTQ4MjEtYjFiNy02OGFlYjdhMTQxMDkiLCJpZCI6NTgyODQsImlhdCI6MTYyMzA2NTI0NH0.Wsji8RvxIbzVjlJfDuaw2jh5a_yHmNXUhBZNQAr2HkA"
}).use(store).use(ElementPlus).use(VueRouter).mount('#app')

// @ts-ignore
window.app = app

export default app

