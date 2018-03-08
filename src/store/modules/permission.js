import Layout from '@/views/layout/Layout'
const _import = require('@/router/_import_' + process.env.NODE_ENV)
import { getMenuSec } from '@/method'
import { constantRouterMap, constant404Map } from '@/router'
import { getMenuSession, setMenuSession } from '@/utils/auth'

// function hasPermission(roles, route) {
//   if (route.meta && route.meta.role) {
//     return roles.some(role => route.meta.role.indexOf(role) >= 0)
//   } else {
//     return true
//   }
// }

const permission = {
  state: {
    routers: [],
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = routers
    }
  },
  actions: {
    async GenerateRoutes({ commit }, data) {
      let menu = []
      if(getMenuSession()) {
        menu = JSON.parse(getMenuSession())
      }else {
        menu = await getMenuSec()
        setMenuSession(JSON.stringify(menu))
      }
      
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
      }
      tempArray = tempArray.concat(constant404Map)
      commit('SET_ROUTERS', tempArray)

      let tempA = constantRouterMap
      tempA = constantRouterMap.concat(tempArray)
      
      return new Promise((resolve, reject) => {
        resolve(tempA)
      })
    }
  }
}

export default permission
