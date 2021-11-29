/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-11-19 14:59:42
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-11-29 10:33:06
 */
import { Module } from "vuex";
import { asyncRoutes, constRoutes } from '@/router'
import { RootStateTypes } from "../interface";
import { filterAsyncRoutes } from '@/utils/handleRoutes'

export  interface RouterState {
  routes: object;
}
//Module接收两个泛型  interface Module<S, R>   第一个是当前模块state类型，第二个是全局state类型
const RouteModule: Module<RouterState, RootStateTypes> = {
    state: {
        routes: []
    },
    getters: {
        routes: (state) => state.routes,
    },
    mutations:{
      setRoutes(state, routes) {
        state.routes = constRoutes.concat(routes)
      }
    },
    actions:{
      async setRoutes({ commit }, permissions) {
        //开源版只过滤动态路由permissions，admin不再默认拥有全部权限
        const finallyAsyncRoutes = await filterAsyncRoutes(
          [...asyncRoutes],
          permissions
        )
        commit('setRoutes', finallyAsyncRoutes)
        return finallyAsyncRoutes
      },
    }
    
};

export default RouteModule;
