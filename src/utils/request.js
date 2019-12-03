import axios from 'axios'
// import notification from 'ant-design-vue/es/notification'
import message from 'ant-design-vue/es/message'
import store from '@/store'
import { VueAxios } from './axios'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api base_url
  timeout: 6000, // 请求超时时间
  withCredentials: true,
  headers: {
    common: {
      'X-Requested-With': 'XMLHttpRequest',
      'Access-Control-Allow-Origin': '*'
    },
    post: {
      'Content-Type': 'application/x-www-form-urlencoded;application/json;charset=UTF-8'
    }
  }
})
const err = (error) => {
  if (error.response) {
    const data = error.response.data
    if (error.response.status === 403) {
      message.error(error.response.message)
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      message.error(error.response.message)
    }
  }
  store.commit('SET_TOKEN_STATE', true)
  store.commit('UPDATE_LOADING', false)
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  store.commit('UPDATE_LOADING', true)
  const token = store.getters.userToken
  if (token) {
    config.headers['Authorization'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, err)

// response interceptor
service.interceptors.response.use((response) => {
  store.commit('UPDATE_LOADING', false)
  return response.data
}, err)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}
