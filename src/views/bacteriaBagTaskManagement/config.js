const columns = [
  { title: '序号', scopedSlots: { customRender: 'id' }, key: 'id' },
  { title: '任务编号', dataIndex: 'taskNum', key: 'taskNum' },
  { title: '所属车间', dataIndex: 'workshopName', key: 'workshopName' },
  { title: '菌包名称', dataIndex: 'fungusProduceName', key: 'fungusProduceName' },
  { title: '任务开始时间', dataIndex: 'startTime', key: 'startTime' },
  { title: '任务结束时间', dataIndex: 'endTime', key: 'endTime' },
  { title: '状态', dataIndex: 'taskStatusName', key: 'taskStatusName' },
  { title: '创建人', dataIndex: 'createUserName', key: 'createUserName' },
  {
    title: '操作',
    scopedSlots: { customRender: 'operation' },
    key: 'operation',
    align: 'center'
  }
]
// 详情页面列表
const dateilColumns = [
  { title: '序号', scopedSlots: { customRender: 'id' }, key: 'id' },
  { title: '任务操作', dataIndex: 'actionName', key: 'actionName' },
  { title: '开始时间', dataIndex: 'startTime', key: 'startTime' },
  { title: '结束时间', dataIndex: 'endTime', key: 'endTime' },
  { title: '任务完成时间', dataIndex: 'finishTime', key: 'finishTime' },
  { title: '负责人', dataIndex: 'assigner', key: 'assigner' },
  { title: '状态', dataIndex: 'statusName', key: 'statusName' },
  {
    title: '操作',
    scopedSlots: { customRender: 'operation' },
    key: 'operation',
    align: 'center'
  }
]
// 列表面包屑
const crumbsArr = [
  { name: '当前位置', back: false, path: '' },
  { name: '生产管理', back: false, path: '' },
  { name: '菌包任务管理', back: false, path: '' }
]
// 新增面包屑
const addTaskCrumbs = [
  { name: '当前位置', back: false, path: '' },
  { name: '生产管理', back: false, path: '' },
  { name: '菌包任务管理', back: false, path: '' },
  { name: '新增任务', back: false, path: '' }
]
// 详情面包屑
const dateilCrumbsArr = [
  { name: '当前位置', back: false, path: '' },
  { name: '生产管理', back: false, path: '' },
  { name: '菌包任务管理', back: false, path: '' },
  { name: '任务详情', back: false, path: '' }
]
const stepsArray = [
  {
    id: 'step0',
    title: '基本信息'
  },
  {
    id: 'step1',
    title: '生产操作'
  }
]
const dayTime = [
  { dayStart: 1, dayEnd: 1 },
  { dayStart: 2, dayEnd: 2 },
  { dayStart: 2, dayEnd: 2 },
  { dayStart: 2, dayEnd: 2 },
  { dayStart: 3, dayEnd: 3 },
  { dayStart: 3, dayEnd: 3 },
  { dayStart: 4, dayEnd: 43 },
  { dayStart: 44, dayEnd: 45 },
  { dayStart: 46, dayEnd: 47 },
  { dayStart: 48, dayEnd: 48 }
]
// 负责人选择框数组
const assignerRules = [
  [{
    required: true,
    message: '请选择负责人0'
  }],
  [{
    required: true,
    message: '请选择负责人1'
  }],
  [{
    required: true,
    message: '请选择负责人2'
  }],
  [{
    required: true,
    message: '请选择负责人3'
  }],
  [{
    required: true,
    message: '请选择负责人4'
  }],
  [{
    required: true,
    message: '请选择负责人5'
  }],
  [{
    required: true,
    message: '请选择负责人6'
  }],
  [{
    required: true,
    message: '请选择负责人7'
  }],
  [{
    required: true,
    message: '请选择负责人8'
  }],
  [{
    required: true,
    message: '请选择负责人9'
  }]
]
export { columns, dateilColumns, crumbsArr, addTaskCrumbs, dateilCrumbsArr, stepsArray, dayTime, assignerRules }
