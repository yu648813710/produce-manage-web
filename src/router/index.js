import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import NProgress from 'nprogress' // 页面进度条
import 'nprogress/nprogress.css' // 页面进度条 style
import { ConstantRoute, DynamicRoute } from './Route'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
NProgress.configure({ showSpinner: false }) // NProgress Configuration
const requireContext = require.context('./routes', true, /\.js$/) // 获取路由文件
const requireAll = context => context.keys().map(context) // 处理方法
const ChildRoutes = []
requireAll(requireContext)
  .sort((a, b) => {
    return a.default.sort - b.default.sort // 按照 sort 排序
  })
  .forEach(item => {
    ChildRoutes.push(...item.default.routes)
  })
Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: '/producemng/',
  scrollBehavior: () => ({ y: 0 }),
  routes: ConstantRoute
})
router.beforeEach((to, form, next) => {
  console.log(DynamicRoute)
  NProgress.start()
  to.meta &&
    (typeof to.meta.name !== 'undefined' &&
      setDocumentTitle(`${to.meta.name} - ${domTitle}`))
  if (store.getters.userToken) {
    if (to.path !== '/login') {
      /* 已有token */
      if (store.getters.routes) {
        /* 已获取菜单权限 */
        next()
      } else {
        /* 未获取菜单权限 */
        store
          .dispatch('GetUserInfo')
          .then(authList => {
            return store.dispatch('GenerateRoutes', { ChildRoutes, authList })
          })
          .then(routes => {
            let MainRoute = DynamicRoute.find(v => v.path === '/')
            MainRoute.children.push(...routes)
            router.addRoutes(DynamicRoute)
            next({ ...to })
          }).catch(res => {
            console.log(res)
          })
      }
    } else {
      next('/')
    }
  } else {
    /* 没有token */
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})
router.afterEach(() => {
  NProgress.done() // 进度条
})
export default router
