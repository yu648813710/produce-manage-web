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

// 全局样式
import './assets/css/base.css'

import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'

import G2 from '@antv/g2'

import DataSet from '@antv/data-set'

import ECharts from 'vue-echarts'

import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
Vue.use(Print) // 注册
Vue.use(scroll)
Vue.prototype.$echarts = echarts
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
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
