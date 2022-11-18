/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-10-26 17:09:25
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2022-08-30 18:06:36
 */
import {
  createRouter,
  createWebHashHistory
} from "vue-router";
// 定义页面组件
import LoginPage from "../views/Login/index.vue"
import HomePage from "../views/Home/index.vue"
import Layout from "../views/Layout/index.vue"
const path = require("path")
interface RouterOption {
  path:string,
  name?:string,
  component:()=>Promise<any>,
  meta:{
    title?: string,
    icon?: string,
    affix: boolean,
  }
}
const files = require.context('@/views/Vue3test', true, /index\.vue$/)
const vueDemoChildren:RouterOption[] = []
files.keys().forEach(path => {
  const name = path.split('/')[1]
  vueDemoChildren.push({
    path: name,
    name: name,
    component: () => import('@/views/Vue3test/'+path.substring(2)),
    meta: {
      title: name,
      icon: 'lock',
      affix: true,
    }
  })
});


console.log('files',files.keys())
console.log('files',files.resolve(files.keys()[0]))
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
      {
        path: 'GSAP',
        name: 'GSAP',
        component: () => import('@/views/Example/GSAP/index.vue'),
        meta: {
          title: 'GSAP',
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
    children: vueDemoChildren,
  },
  {
    path:'/category',
    component: Layout,
    redirect: 'noRedirect',
    alwaysShow: true,
    meta: { title: '分类管理', icon: 'platform'},
    children: [
      {
        path: 'index',
        name: 'categoryIndex',
        component: () => import('@/views/Category/index.vue'),
        meta: {
          title: '分类列表',
          icon: 'list',
          affix: true,
        }
      },
      {
        path: 'create',
        name: 'categoryCreate',
        component: () => import('@/views/Category/create.vue'),
        meta: {
          title: '创建分类',
          icon: 'list',
          affix: true,
        },
      },
      {
        path: 'edit',
        name: 'categoryEdit',
        hidden: true,
        component: () => import('@/views/Category/edit.vue'),
        meta: {
          title: '创建分类',
          icon: 'list',
          affix: true,
        },
      },
    ],
  },
  {
    path:'/comment',
    component: Layout,
    redirect: 'noRedirect',
    alwaysShow: true,
    meta: { title: '评论管理', icon: 'platform'},
    children: [
      {
        path: 'index',
        name: 'commentIndex',
        component: () => import('@/views/Comment/index.vue'),
        meta: {
          title: '用户评论',
          icon: 'list',
          affix: true,
        }
      }
    ],
  },
  {
    path:'/reply',
    component: Layout,
    redirect: 'noRedirect',
    alwaysShow: true,
    meta: { title: '回复管理', icon: 'platform'},
    children: [
      {
        path: 'index',
        name: 'replyIndex',
        component: () => import('@/views/Reply/index.vue'),
        meta: {
          title: '评论回复',
          icon: 'list',
          affix: true,
        }
      }
    ],
  },
  {
    path:'/article',
    component: Layout,
    redirect: 'noRedirect',
    alwaysShow: true,
    meta: { title: '文章管理', icon: 'platform'},
    children: [
      {
        path: 'index',
        name: 'articleIndex',
        component: () => import('@/views/Article/index.vue'),
        meta: {
          title: '分类列表',
          icon: 'list',
          affix: true,
        }
      },
      {
        path: 'create',
        name: 'articleCreate',
        component: () => import('@/views/Article/create.vue'),
        meta: {
          title: '创建文章',
          icon: 'list',
          affix: true,
        },
      },
      {
        path: 'edit',
        name: 'articleEdit',
        hidden: true,
        component: () => import('@/views/Article/edit.vue'),
        meta: {
          title: '文章编辑',
          icon: 'list',
          affix: true,
        },
      },
      {
        path: 'imgaeupload',
        name: 'imageUpload',
        hidden: false,
        component: () => import('@/views/Article/imageupload.vue'),
        meta: {
          title: '七牛图片上传',
          icon: 'list',
          affix: true,
        },
      },
    ],
  }
];

// 3. 创建路由实例
const router =  createRouter({
  history: createWebHashHistory(),
  // mode: "hash",
  routes:constRoutes, //使用上方定义的路由配置
});

export default router 
