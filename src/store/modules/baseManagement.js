// import Vue from 'vue'
// import { ROUTES, USERTOKEN } from '../mutation-types'

const state = {
  // 判断是不是详情页
  isEdit: false,
  // 判断是不是详情页
  isDetail: false,
  isShowList: true
}
const mutations = {
  UPDATEDETAIL(state, val) {
    state.isEdit = val
  },
  CHECKDETAIL(state, val) {
    state.isDetail = val
  },
  SHOWLIST(state, val) {
    state.isShowList = val
  }
}

const actions = {
  addBase({ commit }, val) {
    commit('UPDATEDETAIL', val)
  },
  checkBaseDetail({ commit }, val) {
    commit('CHECKDETAIL', val)
  },
  showList({ commit }, val) {
    commit('SHOWLIST', val)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
