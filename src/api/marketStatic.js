import { axios } from '@/utils/productanalysisRequest.js';
// 均价趋势数据
export function getLineData (type) {
  return axios({
    url: `/productanalysis/pricetrend/${type}`,
    method: 'GET',
  })
}
// 区域均价情况
export function getQipaoData (type) {
  return axios({
    url: `/productanalysis/regionavgprice/${type}`,
    method: 'GET',
  })
}
// 区域木耳价格
export function getTableData (type) {
  return axios({
    url: `/productanalysis/productcurrentdata`,
    method: 'GET',
  })
}
// 销量热区
export function getPieData (type) {
  return axios({
    url: `/productanalysis/hottopn`,
    method: 'GET',
  })
}
