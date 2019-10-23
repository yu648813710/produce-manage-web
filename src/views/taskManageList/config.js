const tableColumns = [
  {
    title: '序号', scopedSlots: { customRender: 'id' }, align: 'center',
    width: 60,
  },
  { title: '农事计划编号', dataIndex: 'farmingNum' },
  {
    title: '农事操作', dataIndex: 'actionName',
    width: 100,
  },
  {
    title: '所属周期', dataIndex: 'cycleName',
    width: 100,
  },
  { title: '所属地块', dataIndex: 'farmBizName' },
  {
    title: '农事类型', dataIndex: 'farmingTypeName',
    width: 100,
  },
  { title: '使用农资', dataIndex: 'useMaterial' },
  {
    title: '状态',
    dataIndex: 'taskStatusName',
  },
  { title: '执行时长', dataIndex: 'executeCycle' },
  {
    title: '任务开始时间', dataIndex: 'startTime',
    width: 120,
  },
  {
    title: '任务结束时间', dataIndex: 'endTime',
    width: 120,
  },
  {
    title: '任务完成时间', dataIndex: 'executeTime',
    width: 120,
  },
  {
    title: '负责人', dataIndex: 'assigner',
    width: 100,
  },
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