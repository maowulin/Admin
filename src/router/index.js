import Vue from 'vue'
import Router from 'vue-router'
import { getMenuSec } from '@/method'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

export const constantRouterMap = [
  {
    path: '/login',
    component: _import('login/index'),
    hidden: true
  },
  // {
  //   path: '/',
  //   component: _import('hdkj/index'),
  //   hidden: true
  // },
  // {
  //   path: '/about',
  //   component: _import('hdkj/about'),
  //   hidden: true
  // },
  // {
  //   path: '/recruit',
  //   component: _import('hdkj/recruit'),
  //   hidden: true
  // },
  // {
  //   path: '/rela',
  //   component: _import('hdkj/rela'),
  //   hidden: true
  // },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: { title: '首页', icon: 'example', noCache: true }
    }]
  }
]

export const constant404Map = [{
  path: '*',
  redirect: '/404',
  hidden: true
}]

export default new Router({
  // mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

