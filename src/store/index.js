import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import baseManagement from "./modules/baseManagement";

const requireContext = require.context('./modules', true, /\.js$/)
const modules = { baseManagement }
requireContext.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = requireContext(key).default
})

Vue.use(Vuex)

export default new Vuex.Store({
  modules: modules,
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters
})
