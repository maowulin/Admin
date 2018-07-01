import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
// import { Message } from 'element-ui'
import { getToken, removeToken, getMenuSession, removeMenuSession } from '@/utils/auth' // 验权

const whiteList = ['/login'] // 不重定向白名单

if(getMenuSession()) {
  store.dispatch('GenerateRoutes').then(res => { // 拉取routers
    router.addRoutes(store.getters.route)
  })
}

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({path: '/'})
    } else {
      if (!getMenuSession()) {
        store.dispatch('GenerateRoutes').then(res => { // 拉取routers
          router.addRoutes(store.getters.route)
          next()
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done() 
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
