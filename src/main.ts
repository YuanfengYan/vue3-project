/*
 * @Author: YuanfengYan yanyuanfeng_sspu@163.com
 * @Date: 2021-10-27 14:41:50
 * @LastEditors: YuanfengYan yanyuanfeng_sspu@163.com
 * @LastEditTime: 2022-09-02 14:06:04
 * @FilePath: /my-project/src/main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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

// 引入多语言
import i18n  from './locales/i18n'

// mock数据
import './mock'

// vuex
import {store} from '@/store'

// // 权限permission
import "@/router/permission"

// 自定义插件
import MyDrag from "@/plugins/drag"


const app = createApp(App)
// 统一注册Icon图标
for (const iconName in ElIconModules) {
  if (Reflect.has(ElIconModules, iconName)) {
    const item = ElIconModules[iconName]
    app.component(iconName, item)
  }
}
app.config.compilerOptions.delimiters = ['${', '}']    
app.provide('user', 'administrator')
// @ts-ignore
app.use(MyDrag)
app.use(i18n)
app.use(VueCesium,{
  cesiumPath: "./Cesium/Cesium.js",
  accessToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2ZmFiZjQxYS0xNjk0LTQ4MjEtYjFiNy02OGFlYjdhMTQxMDkiLCJpZCI6NTgyODQsImlhdCI6MTYyMzA2NTI0NH0.Wsji8RvxIbzVjlJfDuaw2jh5a_yHmNXUhBZNQAr2HkA"
}).use(store).use(ElementPlus).use(VueRouter).mount('#app')

// @ts-ignore
window.app = app

export default app

