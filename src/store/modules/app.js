import Vue from 'vue'
import { USERTOKEN, ROUTES, PARENTROUTES, TOKENSTATE } from '../mutation-types'

const app = {
  state: {
    // 是否登录的凭据
    [USERTOKEN]: '',
    // 动态路由
    [ROUTES]: null,
    // 父级平台传值的路由
    [PARENTROUTES]: null,
    // 权限过期判断
    [TOKENSTATE]: false
  },
  getters: {
    ParentRouter: state => state[PARENTROUTES],
    ShowRouter: state => {
      let showRouter = []
      state[ROUTES].map(
        res => {
          if (!res.hidden) {
            showRouter.push(res)
          }
        }
      )
      return showRouter
    },
    TokenState: state => state[TOKENSTATE]
  },
  mutations: {
    SET_USERTOKEN (state, token) {
      let expires = 7 * 24 * 60 * 60 * 1000
      state[USERTOKEN] = token
      Vue.ls.set(USERTOKEN, token, expires)
    },
    CLEAR_USERTOKEN () {
      Vue.ls.remove(USERTOKEN)
    },
    SET_ROUTES (state, routes) {
      state[ROUTES] = routes
    },
    SET_PARENT_ROUTER (state, router) {
      let expires = 7 * 24 * 60 * 60 * 1000
      state[PARENTROUTES] = router
      Vue.ls.set(PARENTROUTES, router, expires)
    },
    SET_TOKEN_STATE (state, tokenState) {
      state[TOKENSTATE] = tokenState
    }
  },
  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        /**
         * 调用登录接口获取token(此处假设已经获取到token)
         * token 用户登录凭证
         * expires 过期时间
         */
        commit('SET_USERTOKEN', userInfo)
        resolve()
        // if (sessionStorage.getItem("user")){
        //   let token = '123'
        //  commit('SET_USERTOKEN', token)
        //  resolve()
        // }
      })
    },
    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve, reject) => {
        /**
         * 调用退出登录接口
         * 清空token凭证
         */
        commit('CLEAR_USERTOKEN')
        resolve()
      })
    },
    // 获取用户信息和权限(将用户信息缓存在vuex中)
    GetUserInfo ({ commit, getters }) {
      return new Promise((resolve, reject) => {
        /**
         * 需要调菜单权限接口获取权限列表
         * 这里假设已经获取到菜单权限
         */
        // let auth = [
        //   {
        //     name: '首页'
        //   },
        //   { name: '地块监控列表' },
        //   { name: '地块预警规则列表' },
        //   { name: '任务管理' },
        //   {
        //     name: '生长监控',
        //     children: [
        //       { name: '生长监控大屏' },
        //       { name: '生长监控预警列表' },
        //       { name: '生长监控预警汇总列表' },
        //       { name: '地块预警规则列表' }
        //     ]
        //   },
        //   {
        //     name: '生产监控',
        //     children: [
        //       { name: '生产监控大屏' },
        //       { name: '生产监控预警列表' },
        //       { name: '生产监控预警汇总列表' },
        //       { name: '加工车间预警规则列表' }
        //     ]
        //   },
        //   { name: '方案详情' },
        //   { name: '新增方案' },
        //   { name: '修改方案' },
        //   { name: '销售市场分析' },
        //   { name: '农事计划' },
        //   { name: '农事计划详情' },
        //   { name: '新增农事计划' },
        //   { name: '新增临时任务' },
        //   { name: '方案中心' },
        //   { name: '方案市场' },
        //   { name: '方案市场详情' },
        //   { name: '知识问答' },
        //   { name: '知识问答详情' },
        //   { name: '出库管理' },
        //   { name: '生产批次管理' },
        //   { name: '待采购管理' },
        //   { name: '待采购管理详情' },
        //   { name: '采购管理' },
        //   { name: '采购管理详情' },
        //   { name: '菌包任务管理' },
        //   { name: '新增菌包任务' },
        //   { name: '菌包任务详情' },
        //   { name: '临时工管理' },
        //   { name: '临时工详情' },
        //   { name: '木耳栽培过程溯源' },
        //   { name: '木耳溯源信息维护' },
        //   { name: '生产资料' },
        //   { name: '新增生产资料' },
        //   { name: '生产资料详情' }
        // ]
        // resolve(auth)
        resolve(getters.ParentRouter)
      })
    },
    // 根据后端返回的权限过滤路由
    GenerateRoutes ({ commit }, { ChildRoutes, authList }) {
      return new Promise((resolve, reject) => {
        let routes = recursionRouter(ChildRoutes, authList)
        commit('SET_ROUTES', routes)
        resolve(routes)
      })
    }
  }
}

/**
 * 递归过滤路由
 * @param {*} DynamicRoutes 前端配置好的动态路由
 * @param {*} authList 后端返回的权限列表
 * @return {Array} realRoutes 过滤后的路由
 */
function recursionRouter (DynamicRoutes = [], authList = []) {
  var realRoutes = []
  DynamicRoutes.forEach((v, i) => {
    authList.forEach((item, index) => {
      if (item.nodeNo === v.meta.nodeNo) {
        // if (item.name === v.meta.name) {
        if (item.children && item.children.length > 0) {
          v.children = recursionRouter(v.children, item.children)
        }
        realRoutes.push(v)
      }
    })
  })
  return realRoutes
}

export default app
