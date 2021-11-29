/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-11-19 14:59:42
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-11-19 18:29:11
 */
import { Module } from "vuex";
import { RootStateTypes } from "../interface";
export  interface DemoStateTypes {
  isText: boolean;
  count: number;
  userName?: string;
}
//Module接收两个泛型  interface Module<S, R>   第一个是当前模块state类型，第二个是全局state类型
const demo: Module<DemoStateTypes, RootStateTypes> = {
    state: {
        count:1,
        isText:false,
        userName: 'guoang'
    },
    mutations: {
        addCount(state) {
            state.count++;
        },
    },
    getters: {
        getUserName: (state, getters, rootState) => (id: number) => {
            return state.userName
        },
    },
    
};

export default demo;
