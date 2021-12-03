
import router from '@/router'
import store from '@/store/index'
// import settingConfig  from "@/config/index"
const routesWhiteList = ['/login', '/register', '/404', '/401']
router.beforeEach(async(to, from, next) => {
  const hasToken = store.getters['user/accessToken']
  if(hasToken){
    if(to.path == '/login'){
      next({ path: '/' })
    }else{
      console.log(to)
      const hasPermissions =
      store.getters['user/permissions'] &&
      store.getters['user/permissions'].length > 0
      // 先查询在store存储中是否存在权限，若存在，说明之前已经写入过权限路由
      if(hasPermissions){
          next()
      }else{
        const permissions = await store.dispatch('user/getUserInfo');
        const accessRoutes = await store.dispatch('router/setRoutes', permissions)
        console.log(accessRoutes,permissions)
        accessRoutes.forEach((item:any) => {
          router.addRoute(item)
        })
        next({ ...to, replace: true })
      }
    }
  }else{
    if(routesWhiteList.indexOf(to.path)>-1){
      next()
    }else{
      next(`/login?redirect=${to.path}`)
    }
  }

  next()
})