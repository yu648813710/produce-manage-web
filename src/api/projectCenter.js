import { axios } from '@/utils/request'
// 获取方案中心列表
export function projectList(data) {
  return axios({
    url: '/solution/plan/pc/solution',
    method: 'POST',
    data: data
  })
}
// 获取方案参与人
export function projectUser() {
  return axios({
    url: '/solution/user',
    method: 'GET'
  })
}
// 获取方案中心详情
export function projectDetail(code) {
  return axios({
    url: `/solution/plan/${code}`,
    method: 'GET'
  })
}
// 获取产品品类
export function getCategoryList(data) {
  return axios({
    url: '/solution/plan/category',
    method: 'GET'
  })
}
// 获取产品品种
export function getBreedList(data) {
  return axios({
    url: `/solution/plan/breed/${data}`,
    method: 'GET'
  })
}
// 获取产品周期
export function getLifeCycleList(type) {
  return axios({
    url: `/solution/plan/lifeCycle/${type}`,
    method: 'GET'
  })
}
// 获取农事类型
export function getfarmingTypeList() {
  return axios({
    url: `/solution/plan/farmingType`,
    method: 'GET'
  })
}
// 获取任务操作类型
export function getActionList(code) {
  return axios({
    url: `/solution/plan/action/${code}`,
    method: 'GET'
  })
}
// 获取农资类型/plan
export function getMaterialList(breedID, code) {
  return axios({
    url: `/solution/plan/material/${breedID}/${code}`,
    method: 'GET'
  })
}
// 新增农资任务
export function addNewTask(putData) {
  return axios({
    url: '/solution/plan',
    method: 'POST',
    data: putData
  })
}
// 获取修改方案的详细信息
export function editProjectDetail(solutionId) {
  return axios({
    url: `/solution/plan/solutionDetail/${solutionId}`,
    method: 'POST'
  })
}
// 修改方案
export function editProjectMsg(solutionId, data) {
  return axios({
    url: `/solution/plan`,
    method: 'PUT',
    data: data
  })
}
// 方案状态修改
export function editProjectStatus(solutionId, status) {
  return axios({
    url: `/solution/plan/status/${solutionId}/${status}`,
    method: 'POST'
  })
}
// 发布任务
export function publishTask(solutionId) {
  return axios({
    url: `/solution/plan/publish/${solutionId}`,
    method: 'POST'
  })
}
// 删除方案
export function delProjectTask(solutionId) {
  return axios({
    url: `/solution/plan/${solutionId}`,
    method: 'DELETE'
  })
}
// 拷贝方案
export function copyProject(solutionId) {
  return axios({
    url: `/solution/plan/copy/${solutionId}`,
    method: 'POST'
  })
}
// 检查方案名称是否重复
export function checkProjectRepeat(data) {
  return axios({
    url: `/solution/plan/repeatSolutionName`,
    method: 'POST',
    data: data
  })
}
