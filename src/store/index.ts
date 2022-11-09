/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-11-12 15:25:39
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-12-15 15:51:53
 */

import { createStore, Store } from "vuex"
import { InjectionKey } from 'vue'
import {RootStateTypes} from './interface'
import createPersistedState from "vuex-persistedstate";

import getters from './getters'
const files = require.context('./modules', false, /\.ts$/)
// console.log('files',files.keys())
const modules:any = {}
files.keys().forEach((key:string) => {
  modules[key.replace(/(\.\/|\.ts)/g, '')] = files(key).default
})
Object.keys(modules).forEach((key) => {
  modules[key]['namespaced'] = true
})
 /* vuex数据持久化配置 */
 const plugins = [
   //@ts-nocheck
  createPersistedState({
    // 存储方式：localStorage、sessionStorage、cookies
    storage: window.sessionStorage,
    // 存储的 key 的key值
    key: "store",
  })
]
// 创建一个新的 store 实例
export const store = createStore<RootStateTypes>({
  state: {
    isLogin:true,
    count:12,
  },
  mutations: {
    loginOut (state:RootStateTypes) {
      state.isLogin = false
    }
  },
  modules,
  getters,
  // plugins


})

export const key: InjectionKey<Store<RootStateTypes>> = Symbol('vue-store')

export default store



