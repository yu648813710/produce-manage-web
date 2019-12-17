import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// base config
import VueStorage from 'vue-ls'
import { VueAxios } from './utils/request'
import config from '@/config/defaultSettings'
import { USERTOKEN } from '@/store/mutation-types'
import scroll from 'vue-seamless-scroll'
import Print from '@/plugs/print'
import echarts from 'echarts'

// base library
import { message, Icon, LocaleProvider, InputNumber } from 'ant-design-vue'
import './utils/filter' // global filter
import moment from 'moment'
import 'moment/locale/zh-cn'
import { receiveIframeMassage, sendIframeMassage } from '@/utils/iframeMessage'

// 全局样式
import './assets/css/base.css'

import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'

import G2 from '@antv/g2'

import DataSet from '@antv/data-set'

import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'

import setTheme from './theme'
// 使用主题
// setTheme('green')

import * as utils from './utils/domUtil'
Vue.use(Print) // 注册
Vue.use(scroll)
Vue.prototype.$echarts = echarts
Vue.prototype.utils = utils
moment.locale('zh-cn')

Vue.use(Icon)
Vue.use(InputNumber)
Vue.use(LocaleProvider)
Vue.use(VueAxios)
Vue.use(zhCN)
Vue.use(echarts)
Vue.use(VueStorage, config.storageOptions)
Vue.prototype.$message = message
Vue.config.productionTip = false
Vue.use(G2)
Vue.use(DataSet)
// 初始化token
store.commit('SET_USERTOKEN', Vue.ls.get(USERTOKEN))

// 给父级发送消息
function sendParentMassage () {
  let iframeType = 'producemng'
  let iframeDataType = 'iframeMessage'
  let originMessage
  let origin = window.location.origin
  let port = window.location.origin.split(':')[2]
  let parentOrigin
  if (port === '8081') {
    // 本地开发
    parentOrigin = `${window.location.origin.split(':')[0]}:${window.location.origin.split(':')[1]}:8080`
    originMessage = window.location.origin
  } else {
    parentOrigin = `${origin}/common/`
    originMessage = `${window.location.origin}/${iframeType}/`
  }
  sendIframeMassage(window, { iframeType, iframeDataType, originMessage }, parentOrigin)
}

let vueData = new Vue({
  router,
  store,
  render: h => h(App),
  data () {
    return {
      parentData: ''
    }
  },
  watch: {
    parentData (val) {
      if (val.iframeDataType === 'loginMessage') {
        let skinType
        switch (val.skinType) {
          case 'blue':
            skinType = '#1890FF'
            break
          case 'red':
            skinType = '#FF0000'
            break
          case 'green':
            skinType = '#7DB133'
            break
        }
        window.less.modifyVars({
          '@primary-color': skinType
        })
        setTheme(val.skinType)
        store.commit('SET_PARENT_ROUTER', val.iframeRouterData) // 父级传权限路由
        store.dispatch('Login', val.token).then(res => {
          this.$router.push('/') // 进入第一条路由
        }) // token
      }
    },
    tokenState (val) {
      if (val) {
        this.sendParentTokenStateMassage()
      }
    }
  },
  computed: {
    tokenState () {
      return store.getters.TokenState
    }
  },
  beforeCreate () {
    sendParentMassage()
  },
  methods: {
    // 给父级发通知权限过期
    sendParentTokenStateMassage () {
      let tokenState = 'tokenStateFalse'
      let origin = window.location.origin
      let port = window.location.origin.split(':')[2]
      let parentOrigin
      if (port === '8081') {
        // 本地开发
        parentOrigin = `${window.location.origin.split(':')[0]}:${window.location.origin.split(':')[1]}:8080`
      } else {
        parentOrigin = `${origin}/common/`
      }
      sendIframeMassage(window, { tokenState }, parentOrigin)
    }
  }
}).$mount('#app')
// 注册接受 父级 消息事件
receiveIframeMassage(vueData)
