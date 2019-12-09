const tableColumns = [
  {
    title: '序号',
    scopedSlots: { customRender: 'id' },
    align: 'center',
    width: 70
  },
  {
    title: '车间名称',
    dataIndex: 'blockLandName',
    width: 200,
    scopedSlots: { customRender: 'blockLandName' },
  },
  {
    title: '监测指标',
    scopedSlots: { customRender: 'temperatureSup' },
    key: 'temperatureSup',
    minWidth: 400
  },
  {
    title: '负责人',
    dataIndex: 'principalUser',
    width: 200
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'operation' },
    key: 'operation',
    align: 'center',
    fixed: 'right',
    width: 250
  }
]
const crumbsArr = [
  {
    name: '生产管理',
    back: false,
    path: ''
  },
  {
    name: '生产监控',
    back: false,
    path: ''
  },
  {
    name: '加工车间预警规则列表',
    back: false,
    path: ''
  }
]
export { tableColumns, crumbsArr }
