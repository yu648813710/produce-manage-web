const tableColumns = [
  {
    title: '序号',
    scopedSlots: { customRender: 'id' },
    align: 'center',
    width: 80
  },
  { title: '农事计划编号', dataIndex: 'farmingNum', width: 150 },
  {
    title: '农事操作',
    dataIndex: 'actionName',
    width: 120
  },
  {
    title: '所属周期',
    dataIndex: 'cycleName',
    width: 150
  },
  {
    title: '所属地块',
    dataIndex: 'farmBizName',
    scopedSlots: { customRender: 'farmBizName' },
    width: 140
  },
  {
    title: '农事类型',
    dataIndex: 'farmingTypeName',
    width: 120
  },
  {
    title: '使用农资',
    dataIndex: 'useMaterial',
    scopedSlots: { customRender: 'useMaterial' },
    width: 120
  },
  {
    title: '状态',
    dataIndex: 'taskStatusName',
    width: 120
  },
  {
    title: '执行时长',
    dataIndex: 'executeCycle',
    width: 200
  },
  {
    title: '任务开始时间',
    dataIndex: 'startTime',
    width: 150
  },
  {
    title: '任务结束时间',
    dataIndex: 'endTime',
    width: 150
  },
  {
    title: '任务完成时间',
    dataIndex: 'executeTime',
    width: 150
  },
  {
    title: '负责人',
    dataIndex: 'assigner',
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
