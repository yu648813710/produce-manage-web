const columns = [
  { title: '序号', scopedSlots: { customRender: 'id' }, key: 'id', align: 'center' },
  { title: '临时工姓名', dataIndex: 'userName', key: 'userName', align: 'center' },
  { title: '临时工手机号', dataIndex: 'phone', key: 'phone', align: 'center' },
  { title: '完成总工时（天）', dataIndex: 'workTimes', key: 'workTimes', align: 'center' },
  { title: '临时工薪酬（元/天）', dataIndex: 'payment', key: 'payment', align: 'center' },
  { title: '状态', scopedSlots: { customRender: 'jobStatus' }, key: 'jobStatus', width: 100, align: 'center' },
  {
    title: '是否为贫困户',
    dataIndex: 'povertyStatus',
    key: 'povertyStatus',
    align: 'center',
    customRender: text => {
      if (text === 'Y') {
        return '是'
      } else if (text === 'N') {
        return '否'
      }
    }
  },
  { title: '创建时间', dataIndex: 'gmtCreate', key: 'gmtCreate', align: 'center' },
  { title: '创建人', dataIndex: 'createUserName', key: 'createUserName', align: 'center' },
  { title: '操作', key: 'operation', scopedSlots: { customRender: 'operation' }, align: 'center' }
]
const detailColumns = [
  { title: '序号', scopedSlots: { customRender: 'id' }, key: 'id' },
  { title: '农事操作', dataIndex: 'actionName', key: 'actionName' },
  { title: '所属周期', dataIndex: 'cycleName', key: 'cycleName' },
  { title: '农事类型', dataIndex: 'farmingTypeName', key: 'farmingTypeName' },
  { title: '使用农资', dataIndex: 'useMaterial', scopedSlots: { customRender: 'useMaterial' }, key: 'useMaterial', width: 100 },
  { title: '状态', dataIndex: 'taskStatusName', key: 'taskStatusName' },
  { title: '执行时长', scopedSlots: { customRender: 'cycle' }, key: 'cycleEndTime' },
  { title: '任务开始时间', dataIndex: 'startTime', key: 'startTime' },
  { title: '任务结束时间', dataIndex: 'endTime', key: 'endTime' },
  { title: '任务完成时间', dataIndex: 'extendData.finishTime', key: 'extendData.finishTime' },
  { title: '负责人', dataIndex: 'assigner', key: 'assigner' },
  { title: '操作', key: 'operation', scopedSlots: { customRender: 'operation' }, align: 'center' }
]
const crumbsArr = [
  { name: '当前位置', back: false, path: '' },
  { name: '生产管理', back: false, path: '' },
  { name: '临时工管理', back: false, path: '' }
]
const detailCrumbsArr = [
  { name: '当前位置', back: false, path: '' },
  { name: '生产管理', back: false, path: '' },
  { name: '临时工管理', back: false, path: '' },
  { name: '临时工详情', back: false, path: '' }
]
const statusArr = [
  { name: '在职', value: 'ON_WORK' },
  { name: '离职', value: 'NO_WORK' }
]
const ifArr = [
  { name: '是', value: 'Y' },
  { name: '否', value: 'N' }
]
export { columns, detailColumns, crumbsArr, detailCrumbsArr, statusArr, ifArr }
