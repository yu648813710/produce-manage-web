const tableColumns = [
  {
    title: '序号',
    scopedSlots: { customRender: 'id' },
    align: 'center',
    width: 80
  },
  {
    title: '任务操作',
    dataIndex: 'actionName',
    width: 120
  },
  {
    title: '所属周期',
    dataIndex: 'cycleName',
    width: 120
  },
  {
    title: '农事类型',
    dataIndex: 'farmingTypeName',
    width: 120
  },
  {
    title: '使用农资',
    dataIndex: 'useMatetial',
    scopedSlots: { customRender: 'useMatetial' },
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
    width: 140
  },
  {
    title: '任务结束时间',
    dataIndex: 'endTime',
    width: 140
  },
  {
    title: '负责人',
    dataIndex: 'assigner',
    width: 130
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'action' },
    width: 160,
    align: 'center',
    fixed: 'right'
  }
]
const tableDetailColumuns = [
  {
    title: '序号',
    dataIndex: 'instId',
    scopedSlots: { customRender: 'instId' }
  },
  { title: '农事操作', dataIndex: 'actionName', key: 'actionName' },
  { title: '所属周期', dataIndex: 'cycleName', key: 'cycleName' },
  { title: '农事类型', dataIndex: 'farmingTypeName', key: 'farmingTypeName' },
  {
    title: '使用农资',
    dataIndex: 'useMatetial',
    width: '200px',
    scopedSlots: { customRender: 'useMatetial' }
  },
  { title: '状态', dataIndex: 'taskStatusName', key: 'taskStatusName' },
  { title: '执行周期', dataIndex: 'executeCycle', key: 'executeCycle' },
  { title: '任务开始时间', dataIndex: 'startTime', key: 'startTime' },
  { title: '任务结束时间', dataIndex: 'endTime', key: 'endTime' },
  { title: '负责人', dataIndex: 'assigner', key: 'assigner' },
  {
    title: '操作',
    scopedSlots: { customRender: 'toDetail' }
  }
]
export { tableColumns, tableDetailColumuns }
