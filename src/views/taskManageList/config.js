const tableColumns = [
  { title: '序号', scopedSlots: { customRender: 'id' }, align: 'center' },
  { title: '农事计划编号', dataIndex: 'farmingNum' },
  { title: '农事操作', dataIndex: 'actionName' },
  { title: '所属周期', dataIndex: 'cycleName' },
  { title: '所属地块', dataIndex: 'farmBizName' },
  { title: '农事类型', dataIndex: 'farmingTypeName' },
  { title: '使用农资', dataIndex: 'useMaterial' },
  {
    title: '状态',
    dataIndex: 'taskStatusName',
  },
  { title: '执行时长', dataIndex: 'executeCycle' },
  { title: '任务开始时间', dataIndex: 'startTime' },
  { title: '任务结束时间', dataIndex: 'endTime' },
  { title: '负责人', dataIndex: 'assigner' },
  {
    title: '操作',
    scopedSlots: { customRender: 'action' },
    width: 160,
    align: 'center',
    fixed: 'right'
  }
]

const crumbsArr = [
  {
    name: '当前位置',
    back: false,
    path: ''
  },
  {
    name: '生产管理',
    back: false,
    path: ''
  },
  {
    name: '任务管理',
    back: false,
    path: ''
  }
]

export { tableColumns, crumbsArr }