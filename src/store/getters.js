import { USERTOKEN, ROUTES, IPCONFIG } from './mutation-types'
const getters = {
  userToken: state => state.app[USERTOKEN],
  routes: state => state.app[ROUTES],
  ip: state => state.app[IPCONFIG]
}

export default getters
