<template>
  <scroll-bar>
    <el-menu mode="vertical" unique-opened :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#fff" active-text-color="#409EFF">
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'
import Layout from '@/views/layout/Layout'
// const _import = require('@/router/_import_' + process.env.NODE_ENV)
// import { getMenuSec } from '@/method'
// import { constant404Map } from '@/router'
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
      
      let storeRoute = store.getters.route
      let optionRoute = this.$router.options.routes
      return optionRoute.concat(storeRoute)
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
   
  }
}
</script>
