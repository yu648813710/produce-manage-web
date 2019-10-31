import { axios } from '@/utils/request'
// 获取农事计划列表
export function farmPlanList (data) {
  return axios({
    url: '/produce/farmPlan/page/',
    method: 'POST',
    data: data
  })
}
// 新增农事计划选择产品列表
export function selectProFarmPlan () {
  return axios({
    url: '/produce/product/',
    method: 'GET'
  })
}
// 新增农事计划选择种植方案
export function selectSolutionFarmPlan (breedId) {
  return axios({
    url: `/produce/farmPlan/solution/${breedId}`,
    method: 'GET'
  })
}

// 新增农事计划选择基地
export function selectBaselandFarmPlan () {
  return axios({
    url: `/produce/baseland/list/`,
    method: 'GET'
  })
}

// 新增农事计划选择菌包
export function selectFungusbagFarmPlan () {
  return axios({
    url: `/produce/fungusbag/list/`,
    method: 'GET'
  })
}

// 新增农事计划选择地块

export function selectBaseLandIdFarmPlan (baseLandId) {
  return axios({
    url: `/produce/blockland/list/${baseLandId}
    `,
    method: 'GET'
  })
}

// 新增农事类型

export function addFarmPlan (data) {
  return axios({
    url: `/produce/farmPlan/`,
    method: 'POST',
    data
  })
}

// 农事计划详情
export function farmPlanDetail (id) {
  return axios({
    url: `/produce/farmPlan/${id}`,
    method: 'GET'
  })
}

// 农事计划详情任务列表
export function farmPlanDetailList (id, data) {
  return axios({
    url: `/produce/farmPlan/task/${id}`,
    method: 'POST',
    data
  })
}
// 获取加工车间规则列表
export function searchWarningList (data) {
  return axios({
    url: `/produce/produce/monitor/rule/searchWarningList/ws`,
    method: 'POST',
    data
  })
}
// 获取负责人
export const getListPrincipalUserByCompanyId = () => {
  return axios({
    url: '/produce/principalUser/listPrincipalUserByCompanyId/',
    method: 'get'
  })
}
// 获取车间名称
export const getListUsable = () => {
  return axios({
    url: '/produce/workshop/listUsable/',
    method: 'get'
  })
}
// 者编辑监控规则信息
export const postEditWarning = (data) => {
  return axios({
    url: '/produce/produce/monitor/rule/editWarning/',
    method: 'post',
    data
  })
}
// 新增辑监控规则信息
export const postAddWarningRule = (data) => {
  return axios({
    url: '/produce/produce/monitor/rule/addWarningRule/',
    method: 'post',
    data
  })
}
// 删除加工车间监控规则信息
export const removeWarning = (blockLandId) => {
  return axios({
    url: `/produce/produce/monitor/rule/removeWarning?blockLandId=${blockLandId}`,
    method: 'get'
  })
}
// 出库管理列表查询
export const getOutgoingManagementList = (data) => {
  return axios({
    url: `/produce/delivery/page/`,
    method: 'post',
    data
  })
}
// 获登录用户企业下的菌包名称
export const getAllName = () => {
  return axios({
    url: `/produce/fungusbag/getAllName`,
    method: 'get'
  })
}
// 获取生产批次管理列表
export const getProductionBatchList = (data) => {
  return axios({
    url: `/produce/productionPatch/list/`,
    method: 'post',
    data
  })
}
// 代采购列表
export const getListwaitpurchase = (data) => {
  return axios({
    url: `/produce/purchase/listwaitpurchase/`,
    method: 'post',
    data
  })
}
// 修改单个代采购列表状态
export const setStatus = (bizId, purchaseStatus) => {
  return axios({
    url: `/produce/purchase/status/${bizId}?purchaseStatus=${Number(purchaseStatus)}`,
    method: 'get'
  })
}
// 批量操作修改农资
export const setBatchStatus = (data) => {
  return axios({
    url: `/produce/purchase/batchstatus`,
    method: 'PUT',
    data
  })
}
// 获取菌包任务管理的所属车间
export const workshopList = () => {
  return axios({
    url: `/produce/workshop/list`,
    method: 'get'
  })
}
// 获取菌包任务管理的菌包名称
export const fungusproduceList = () => {
  return axios({
    url: `/produce/fungusproduce/list`,
    method: 'get'
  })
}
// 获取菌包任务管理列表
export const getBacteriaBagTask = (data) => {
  return axios({
    url: `/produce/fungus/task/page/`,
    method: 'post',
    data
  })
}
// 获取菌包任务管理新增中的品类
export const getCategory = () => {
  return axios({
    url: `/produce/product/category/`,
    method: 'get'
  })
}
// 获取菌包任务管理新增中的品种
export const getBreedList = (categoryId) => {
  return axios({
    url: `/produce/product/breed/${categoryId}`,
    method: 'get'
  })
}
// // 获取菌包任务管理新增中的菌包列表
// export const getFungusproduceList = () => {
//   return axios({
//     url: `produce/fungusproduce/list/`, // ${breedId}
//     method: 'get'
//   })
// }

// 农事计划新增时的任务列表
export const getFarmplanSolutionTaskList = (data) => {
  return axios({
    url: `/produce/farmPlan/solution/task`,
    method: 'post',
    data
  })
}

// 农事计划新增时的任务修改提交
export const editFarmplanSolutionTaskList = (data) => {
  return axios({
    url: `/produce/farmPlan/task/temp`,
    method: 'patch',
    data
  })
}
