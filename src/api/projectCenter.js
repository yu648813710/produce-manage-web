import { axios } from '@/utils/ProduceRequest';
// 获取方案中心列表
export function projectList(data) {
  return axios({
    url: '/plan/pc/solution',
    method: 'POST',
    data: data,
  })
}
//获取方案参与人
export function projectUser() {
  return axios({
    url: '/user',
    method: 'GET',
  })
}
// 获取方案中心详情
export function projectDetail(code) {
  return axios({
    url: `/plan/${code}`,
    method: 'GET',
  })
}
// 获取产品品类
export function getCategoryList(data) {
  return axios({
    url: '/plan/category',
    method: 'GET',
  })
}
// 获取产品品种
export function getBreedList(data) {
  return axios({
    url: `/plan/breed/${data}`,
    method: 'GET',
  })
}
// 获取产品周期
export function getLifeCycleList(type) {
  return axios({
    url: `/plan/lifeCycle/${type}`,
    method: 'GET',
  })
}
// 获取农事类型
export function getfarmingTypeList() {
  return axios({
    url: `/plan/farmingType`,
    method: 'GET',
  })
}
// 获取任务操作类型
export function getActionList(code) {
  return axios({
    url: `/plan/action/${code}`,
    method: 'GET',
  })
}
// 获取农资类型/plan
export function getMaterialList(breedID,code) {
  return axios({
    url: `/plan/material/${breedID}/${code}`,
    method: 'GET',
  })
}
// 新增农资任务
export function addNewTask(putData) {
  return axios({
    url: '/plan',
    method: 'POST',
    data: putData
  })
}
