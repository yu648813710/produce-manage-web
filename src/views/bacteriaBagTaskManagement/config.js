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
const crumbsArr = [
  { name: '当前位置', back: false, path: '' },
  { name: '生产管理', back: false, path: '' },
  { name: '菌包任务管理', back: false, path: '' }
]
const addTaskCrumbs = [
  { name: '当前位置', back: false, path: '' },
  { name: '生产管理', back: false, path: '' },
  { name: '菌包任务管理', back: false, path: '' },
  { name: '新增任务', back: false, path: '' }
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
export { columns, crumbsArr, addTaskCrumbs, stepsArray }
