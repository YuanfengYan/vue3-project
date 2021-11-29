import { Module } from "vuex";
import { RootStateTypes } from "../interface";
import { getUserInfo, loginApi, logout } from '@/api/user'
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from '@/utils/accessToken'
// import { resetRouter } from '@/router'
import settingConfig from '@/config/setting.config'
const {tokenName , title} = settingConfig
// @ts-ignore
export  interface UserState {
  accessToken: string|null;
  username: string;
  avatar: string;
  permissions: [];
}

//Module接收两个泛型  interface Module<S, R>   第一个是当前模块state类型，第二个是全局state类型
const UserModule: Module<UserState, RootStateTypes> = {
    state: {
        accessToken: getAccessToken(),
        username: '',
        avatar: '',
        permissions: [],
    },
    getters: {
        accessToken: (state) => state.accessToken,
        username: (state) => state.username,
        avatar: (state) => state.avatar,
        permissions: (state) => state.permissions,
    },
    mutations:{
      setAccessToken(state, accessToken) {
        state.accessToken = accessToken
        setAccessToken(accessToken)
      },
      setUsername(state, username) {
        state.username = username
      },
      setAvatar(state, avatar) {
        state.avatar = avatar
      },
      setPermissions(state, permissions) {
        state.permissions = permissions
      },
    },
    actions:{
      // 设置权限状态
       setPermissions({ commit }, permissions) {
          commit('setPermissions', permissions)
        },
        // 登录
        async login({ commit }, userInfo) {
          const { data } = await loginApi(userInfo)
          const accessToken = data[tokenName]
          if (accessToken) {
            commit('setAccessToken', accessToken)
            const hour = new Date().getHours()
            const thisTime =
              hour < 8
                ? '早上好'
                : hour <= 11
                ? '上午好'
                : hour <= 13
                ? '中午好'
                : hour < 18
                ? '下午好'
                : '晚上好'
                console.log(thisTime)
            // Vue.prototype.$baseNotify(`欢迎登录${title}`, `${thisTime}！`)
          } else {
            console.log(`登录接口异常，未正确返回${tokenName}...`)
            // Vue.prototype.$baseMessage(
            //   `登录接口异常，未正确返回${tokenName}...`,
            //   'error'
            // )
          }
        },
        async getUserInfo({ commit, state }) {
          const { data } = await getUserInfo(state.accessToken)
          if (!data) {
            // Vue.prototype.$baseMessage('验证失败，请重新登录...', 'error')
            return false
          }
          const { permissions, username, avatar } = data
          if (permissions && username && Array.isArray(permissions)) {
            commit('setPermissions', permissions)
            commit('setUsername', username)
            commit('setAvatar', avatar)
            return permissions
          } else {
            // Vue.prototype.$baseMessage('用户信息接口异常', 'error')
            return false
          }
        },
        async logout({ dispatch ,state}) {
          await logout(state.accessToken)
          await dispatch('resetAccessToken')
          // await resetRouter()
        },
        resetAccessToken({ commit }) {
          commit('setPermissions', [])
          commit('setAccessToken', '')
          removeAccessToken()
        },
    }
    
};

export default UserModule;