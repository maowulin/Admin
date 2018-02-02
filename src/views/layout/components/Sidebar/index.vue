<template>
  <scroll-bar>
    <el-menu mode="vertical" unique-opened :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#fff" active-text-color="#409EFF">
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'
import Layout from '@/views/layout/Layout'
const _import = require('@/router/_import_' + process.env.NODE_ENV)
import { getMenuSec } from '@/method'
import { constant404Map } from '@/router'
export default {
  components: { SidebarItem, ScrollBar },
  data() {
    return {}
  },
  created() {
    // console.log(this.routes)
    // this.addAdminRouter()
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'route'
    ]),
    routes() {
      // console.log(this.route)
      // this.$router.options.routes = this.route
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    async addAdminRouter() {
      const menu = await getMenuSec()
      let tempArray = []
      for (let i = 0; i < menu.length; i++) {
        let tempObj = {
          path: '',
          component: Layout,
          redirect: '',
          name: '',
          meta: { title: '', icon: '' },
          children: []
        }
        const list = menu[i]
        const children = menu[i].children
        tempObj.path = '/' + list.event
        tempObj.redirect = '/' + list.event + '/' + children[0].event
        tempObj.name = list.event
        tempObj.meta.title = list.menu
        tempObj.meta.icon = list.ext1
        for (let j = 0; j < children.length; j++) {
          const item = children[j]
          tempObj.children[j] = {
            path: item.url,
            name: item.event,
            component: _import(list.event + '/' + item.event),
            meta: { title: item.menu, icon: item.ext1 }
          }
        }
        tempArray.push(tempObj)
        this.$router.options.routes.push(tempObj)
      }
      this.$router.addRoutes(tempArray)
      this.$router.addRoutes(constant404Map)
      this.routes = this.$router.options.routes
      // console.log(Router)
      // 1、在addroutes前，使用router.options.routes=XXXXX的方法手动添加
      // 2、在store里维护一个routes对象，然后使用这个对象遍历生成侧面导航栏
      // 这个系统再切换用户时，路由不会动态更新。所以需要在登出函数中加上location.reload();刷新浏览器。
    }
  }
}
</script>
