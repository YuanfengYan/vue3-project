import { Module } from "vuex";
import { RootStateTypes } from "../interface";
import { getUserInfo, loginApi, logout } from '@/api/user'
import { getInfo, login as loginApi2,getInfo as getUserInfo2 } from '@/api/blog/admin'
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
  userId:number|string;
}

//Module接收两个泛型  interface Module<S, R>   第一个是当前模块state类型，第二个是全局state类型
const UserModule: Module<UserState, RootStateTypes> = {
    state: {
        accessToken: getAccessToken(),
        username: '',
        avatar: '',
        userId: "",
        permissions: [],
    },
    getters: {
        accessToken: (state) => state.accessToken,
        username: (state) => state.username,
        avatar: (state) => state.avatar,
        permissions: (state) => state.permissions,
        userId: (state) => state.userId,
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
      setuserId(state, userId) {
        state.userId = userId
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
          // const data  = await loginApi({
          //   name:'admin',
          //   pass:'admin'
          // })
          // const data  = await loginApi2({
          //   email:'yanyuanfeng_sspu@163.com',
          //   password:'www.14020'
          // })
          const data  = await loginApi2({
            email:userInfo.name,
            password:userInfo.pass
          })
          console.log('loginApi',data)
          const accessToken =  data.data[tokenName]
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
            // Vue.prototype.$baseNotify(`欢迎登录${title}`, `${thisTime}！`)
          } else {
            console.log(`登录接口异常，未正确返回${tokenName}...`)
            // Vue.prototype.$baseMessage(
            //   `登录接口异常，未正确返回${tokenName}...`,
            //   'error'
            // )
          }
        },
        async getUserInfo({ commit,dispatch, state }) {
          const { data } = await getUserInfo2()
          if (!data) {
            // Vue.prototype.$baseMessage('验证失败，请重新登录...', 'error')
            await dispatch('resetAccessToken')
            window.location.reload()
            return false
          }
          const { permissions, nickname,id } = data
          if (permissions && nickname && Array.isArray(permissions)) {
            commit('setPermissions', permissions)
            commit('setUsername', nickname)
            // todo 头像
            commit('setAvatar', 'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif')
            commit('setuserId', id)
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
