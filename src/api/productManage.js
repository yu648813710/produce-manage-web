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
    url: '/produce/farmPlan/task/page',
    method: 'POST',
    data: data
  })
}
// 获取生长监控数据
export function growthData (type) {
  return axios({
    url: `/produce/produce/monitor/warning/showEarlyWarningSummary/${type}`,
    method: 'POST'
  })
}
// 获取湿度/温度报警数据
export function shiduData (data, type) {
  return axios({
    url: `/produce/produce/monitor/warning/searchNewAlarm/${type.dikuai}/${type.type}`,
    method: 'POST',
    data: data
  })
}
// 获取温度 || 湿度 单类型总累计预警
export function getSingleTypeData (data, typeList) {
  return axios({
    url: `/produce/produce/monitor/warning/searchAllAlarmsHistory/${typeList.massifType}/${typeList.type}`,
    method: 'POST',
    data: data
  })
}
// 获取总累计预警 || 获取今日新增预警
export function getTotalWarring (data, typeList) {
  return axios({
    url: `/produce/produce/monitor/warning/searchMonitorList/${typeList.massifType}/${typeList.alarmType}/${typeList.staticType}`,
    method: 'POST',
    data: data
  })
}
// 获取预警规则列表
export function ruleList (type, data) {
  return axios({
    url: `/produce/produce/monitor/rule/searchWarningList/${type}`,
    method: 'POST',
    data: data
  })
}

// 新增预警规则
export function addRule (data) {
  return axios({
    url: `/produce/produce/monitor/rule/addWarningRule`,
    method: 'POST',
    data: data
  })
}

// 获取新增预警规则时基地选项
export function listBaseLandSelect () {
  return axios({
    url: `/produce/produce/monitor/rule/listBaseLand`,
    method: 'GET'
  })
}

// 获取新增预警规则时地块以及负责人选项
export function listBlockLandByBaseLandIdSelect (id) {
  return axios({
    url: `/produce/produce/monitor/rule/listBlockLandByBaseLandId?baseLandId=${id}`,
    method: 'GET'
  })
}

// 编辑预警规则
export function setRule (data) {
  return axios({
    url: `/produce/produce/monitor/rule/editWarning`,
    method: 'POST',
    data: data
  })
}

// 删除预警规则
export function deleteRule (id) {
  return axios({
    url: `/produce/produce/monitor/rule/removeWarning?blockLandId=${id}`,
    method: 'GET'
  })
}

// 获取木耳任务的状态
export function getTaskState () {
  return axios({
    url: `/produce/farmPlan/task/status`,
    method: 'GET'
  })
}

// 删除木耳任务
export function deleteTask (taskInstId) {
  return axios({
    url: `/produce/farmPlan/task/${taskInstId}`,
    method: 'DELETE'
  })
}

// 木耳任务详情
export function getTaskDetail (taskInstId) {
  return axios({
    url: `/produce/farmPlan/task/${taskInstId}`,
    method: 'GET'
  })
}

// 方案市场列表
export function planMarketList (params) {
  return axios({
    url: '/solution/plan/pc/list',
    method: 'POST',
    data: params
  })
}

// 方案详情
export function planMarketDetail (solutionId) {
  return axios({
    url: `/solution/plan/${solutionId}`,
    method: 'GET'
  })
}

// 方案市场详情列表
export function planMarketDetailList (data) {
  return axios({
    url: `/solution/plan/materials/list`,
    method: 'POST',
    data
  })
}

// 请求农资
export function getMaterial () {
  return axios({
    url: `/produce/material/`,
    method: 'GET'
  })
}

// 请求度量单位
export function getUtil () {
  return axios({
    url: `/produce/unit/`,
    method: 'GET'
  })
}

// 木耳任务编辑
export function editTask (data) {
  return axios({
    url: `/produce/farmPlan/task/`,
    method: 'patch',
    data
  })
}

// 知识问答分类
export function knowledgeQuizCategory () {
  return axios({
    url: `/solution/dingDing/consult/question/listQuestionClazz`,
    method: 'GET'
  })
}

// 知识问答列表
export function knowledgeQuizList (data) {
  return axios({
    url: `/solution/loresupervise/showquestionlist`,
    method: 'POST',
    data
  })
}

// 知识问答详情
export function knowledgeQuizDetail (data) {
  return axios({
    url: `/solution/loresupervise/showanswerdetail`,
    method: 'POST',
    data
  })
}

// 新增回复
export function addKnowledgeQuizReply (data) {
  return axios({
    url: `/solution/loresupervise/`,
    method: 'POST',
    data
  })
}

// 采购管理列表
export function purchaseManagementList (data) {
  return axios({
    url: '/produce/purchase/pagepurchase',
    method: 'POST',
    data
  })
}

// 待采购详情
export function toPurchaseDetail (bizId) {
  return axios({
    url: `/produce/purchase/waitpurchasedetail/${bizId}`,
    method: 'GET'
  })
}

// 更新采购状态
export function updatePurchaseState (data) {
  return axios({
    url: `/produce/purchase`,
    method: 'PUT',
    data
  })
}

// 查询农事计划编号
export function getMaterialNumList (farmingNum) {
  return axios({
    url: `/produce/farmPlan/list?farmingNum=${farmingNum}`,
    method: 'GET'
  })
}
// 查询临时工列表
export function getTempWorkerList (data) {
  return axios({
    url: `/produce/temp/page`,
    method: 'POST',
    data
  })
}
// 临时工新增
export function addTempWorker (data) {
  return axios({
    url: `/produce/temp/`,
    method: 'PUT',
    data
  })
}
// 临时工编辑
export function editTempWorker (data) {
  return axios({
    url: `/produce/temp/`,
    method: 'patch',
    data
  })
}
// 临时工删除
export function delTempWorker (tempWorkerId) {
  return axios({
    url: `produce/temp/${tempWorkerId}`,
    method: 'delete'
  })
}
// 临时工在职状态更新
export function changeJobStatus (data) {
  return axios({
    url: `/produce/temp/status/job`,
    method: 'patch',
    data
  })
}
// 临时工查看详情
export function detailTempWorker (tempWorkerId) {
  return axios({
    url: `/produce/temp/${tempWorkerId}`,
    method: 'GET'
  })
}
// 临时工任务列表查询
export function getTaskList (data) {
  return axios({
    url: `produce/temp/task/page `,
    method: 'POST',
    data
  })
}
// 临时工任务详情
export function detailTask (instId) {
  return axios({
    url: `/produce/temp//task/${instId} `,
    method: 'GET'
  })
}

// 查询周期、农事类型、农事操作
export function getMaterialCycleTypeActionList (planId) {
  return axios({
    url: `/produce/farmPlan/task/listTask?planId=${planId}`,
    method: 'GET'
  })
}

// 查询农资列表
export function getMaterialAgricultural (farmingTypeId) {
  return axios({
    url: `/produce/material/farming?farmingTypeId=${farmingTypeId}`,
    method: 'GET'
  })
}

// 新增农资
export function addMaterialAgricultural (data) {
  return axios({
    url: `/produce/purchase`,
    method: 'POST',
    data
  })
}

// 临时任务详情
export function getTaskTemDetail (taskInstId, planId) {
  return axios({
    url: `/produce/farmPlan/task/temp/${taskInstId}/${planId}`,
    method: 'get'
  })
}

// 删除临时任务
export function deleteTemTask (taskInstId, planId) {
  return axios({
    url: `/produce/farmPlan/task/temp/${taskInstId}/${planId}`,
    method: 'delete'
  })
}

// 通过农事类型Id查询农事操作
export function getActionsByFarmingTypeId (farmingTypeId) {
  return axios({
    url: `/produce/action/all/${farmingTypeId}`,
    method: 'GET'
  })
}

// 生产资料-列表产查询
export function produceMeansList (data) {
  return axios({
    url: '/produce/enterprise/material/pages',
    method: 'POST',
    data
  })
}

// 生产资料-启用、禁用状态
export function putProduceMeansStatus (id, status) {
  return axios({
    url: `/produce/enterprise/material/${id}/${status}`,
    method: 'PUT'
  })
}
