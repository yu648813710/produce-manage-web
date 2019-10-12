import { axios } from '@/utils/request'
const api = {
  warningList: '/monitor/warning/searchMonitorList/gh/realTime'
}
// 获取菌包列表
export function warningList (data) {
  return axios({
    url: api.warningList,
    method: 'POST',
    data: data
  })
}
// 获取任务管理列表
export function taskManageList (data) {
  return axios({
    url: 'getTaskList',
    method: 'POST',
    data: data,
  })
}
// 获取生长监控数据
export function growthData () {
  return axios({
    url: 'produce/monitor/warning/showEarlyWarningSummary/gh',
    method: 'POST',
  })
}
// 获取湿度/温度报警数据
export function shiduData (data, type) {
  return axios({
    url: `/produce/monitor/warning/searchNewAlarm/${type.dikuai}/${type.type}`,
    method: 'POST',
    data: data,
  })
}
// 获取预警规则列表
export function ruleList (type, data) {
  return axios({
    url: `/produce/monitor/rule/searchWarningList/${type}`,
    method: 'POST',
    data: data,
  })
}

// 新增预警规则
export function addRule (data) {
  return axios({
    url: `/produce/monitor/rule/addWarningRule`,
    method: 'POST',
    data: data,
  })
}

// 获取新增预警规则时基地选项
export function listBaseLandSelect () {
  return axios({
    url: `/produce/monitor/rule/listBaseLand`,
    method: 'GET',
  })
}

// 获取新增预警规则时地块以及负责人选项
export function listBlockLandByBaseLandIdSelect (id) {
  return axios({
    url: `/produce/monitor/rule/listBlockLandByBaseLandId?baseLandId=${id}`,
    method: 'GET',
  })
}

// 编辑预警规则
export function setRule (data) {
  return axios({
    url: `/produce/monitor/rule/editWarning`,
    method: 'POST',
    data: data,
  })
}

// 删除预警规则
export function deleteRule (id) {
  return axios({
    url: `/produce/monitor/rule/removeWarning?blockLandId=${id}`,
    method: 'GET',
  })
}