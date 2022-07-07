/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-10-26 17:09:25
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2022-07-07 11:30:02
 */
import {
  createRouter,
  createWebHashHistory
} from "vue-router";
// 定义页面组件
import LoginPage from "../views/Login/index.vue"
import HomePage from "../views/Home/index.vue"
import Layout from "../views/Layout/index.vue"

export const constRoutes = [
  {
    path: '/login',
    component: () => import('@/views/Login/index.vue'),
    hidden: true,
  },
  {
    path: '/register',
    component: () => import('@/views/Register/index.vue'),
    hidden: true,
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/401.vue'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404.vue'),
    hidden: true,
  },
  {
    path: '/ViewDemo',
    name: 'ViewDemo',
    component: () => import('@/views/ViewDemo/index.vue'),
    hidden: true,
  },
]
// 定义路由配置
export const asyncRoutes = [
  { 
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/Home/index.vue'),
        meta: {
          title: '首页',
          icon: 'home-filled',
          affix: true,
        },
      },
    ],
  },
  { 
    
    path: '/exp',
    component: Layout,
    redirect: 'noRedirect',
    alwaysShow: true,
    meta: { title: 'Demo', icon: 'platform', permissions: ['admin'] },
    children: [
      {
        path: 'permissions',
        name: 'permissions',
        component: () => import('@/views/Example/Permissions/index.vue'),
        meta: {
          title: '权限分配',
          icon: 'lock',
          affix: true,
        },
      },
      {
        path: 'earth',
        name: 'earth',
        component: () => import('@/views/Example/Earth/index.vue'),
        meta: {
          title: 'Cesium地球',
          icon: 'location',
          affix: true,
        },
      },
      {
        path: 'book',
        name: 'book',
        component: () => import('@/views/Example/Book/index.vue'),
        meta: {
          title: '增删改查',
          icon: 'list',
          affix: true,
        },
      },
      {
        path: 'websocket',
        name: 'websocket',
        component: () => import('@/views/Example/Websocket/index.vue'),
        meta: {
          title: 'Websocket',
          icon: 'list',
          affix: true,
        },
      },
      {
        path: 'svgAvatar',
        name: 'svgAvatar',
        component: () => import('@/views/Example/SvgAvatar/index.vue'),
        meta: {
          title: 'SvgAvatar',
          icon: 'list',
          affix: true,
        },
      },
    ],
  },
  { 
    
    path: '/test',
    component: Layout,
    redirect: 'noRedirect',
    alwaysShow: true,
    meta: { title: '测试', icon: 'platform', permissions: ['admin'] },
    children: [{
        path: 'test1',
        name: 'test1',
        component: () => import('@/views/Vue3test/test1/index.vue'),
        meta: {
          title: 'vueTest1',
          icon: 'lock',
          affix: true,
        }
      },
      {
          path: 'test2',
          name: 'test2',
          component: () => import('@/views/Vue3test/test2/index.vue'),
          meta: {
            title: 'vueTest2',
            icon: 'lock',
            affix: true,
          }
      },
      {
        path: 'othertest',
        name: 'othertest',
        component: () => import('@/views/Vue3test/OtherTest/index.vue'),
        meta: {
          title: 'other Test',
          icon: 'lock',
          affix: true,
        }
    }
    ],
  }
];
// const files = require.context('@/views', true, /\.vue$/)
// console.log('files',files.keys())
// console.log('files',files.resolve(files.keys()[0]))
// 3. 创建路由实例
const router =  createRouter({
  history: createWebHashHistory(),
  // mode: "hash",
  routes:constRoutes, //使用上方定义的路由配置
});

export default router 