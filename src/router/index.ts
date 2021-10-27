/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-10-26 17:09:25
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-10-26 18:46:09
 */
import {
  createRouter,
  createWebHashHistory
} from "vue-router";
// 定义页面组件
import LoginPage from "../views/Login/index.vue"
import HomePage from "../views/Home/index.vue"

// 定义路由配置
const routes = [
  { 
    path: "/",
    redirect: '/home'
  },
  { 
    path: "/home",
    component: HomePage
  },
  { 
    path: "/login",
    component: LoginPage
  },
];
// 3. 创建路由实例
const router =  createRouter({
  history: createWebHashHistory(),
  // mode: "hash",
  routes, //使用上方定义的路由配置
});

export default router 