import { axios } from '@/utils/request';
// 获取农事计划列表
export function farmPlanList (data) {
  return axios({
    url: '/farmPlan/page/',
    method: 'POST',
    data: data
  })
}
// 新增农事计划选择产品列表
export function selectProFarmPlan () {
  return axios({
    url: '/product/',
    method: 'GET'
  })
}
// 新增农事计划选择种植方案
export function selectSolutionFarmPlan (breedId) {
  return axios({
    url: `/farmPlan/solution/${breedId}`,
    method: 'GET'
  })
}

// 新增农事计划选择基地
export function selectBaselandFarmPlan () {
  return axios({
    url: `/baseland/list/`,
    method: 'GET'
  })
}

// 新增农事计划选择菌包
export function selectFungusbagFarmPlan () {
  return axios({
    url: `/fungusbag/list/`,
    method: 'GET'
  })
}

// 新增农事计划选择地块

export function selectBaseLandIdFarmPlan (baseLandId) {
  return axios({
    url: `/blockland/list/${baseLandId}
    `,
    method: 'GET'
  })
}

// 新增农事类型

export function addFarmPlan (data) {
  return axios({
    url: `/farmPlan/`,
    method: 'POST',
    data
  })
}

// 农事计划详情
export function farmPlanDetail (id) {
  return axios({
    url: `/farmPlan/${id}`,
    method: 'GET'
  })
}

// 农事计划详情任务列表
export function farmPlanDetailList (id, data) {
  return axios({
    url: `/farmPlan/task/${id}`,
    method: 'POST',
    data
  })
}