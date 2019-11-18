const columns = [
  { title: '序号', scopedSlots: { customRender: 'id' }, key: 'id' },
  { title: '农资名称', dataIndex: 'materialName', key: 'materialName' },
  { title: '计划用量', scopedSlots: { customRender: 'materialDosage' }, key: 'materialDosage' },
  { title: '农事计划编号', dataIndex: 'farmingNum', key: 'farmingNum' },
  { title: '所属农事操作', dataIndex: 'actionName', key: 'actionName' },
  { title: '所属周期', dataIndex: 'planCycleName', key: 'planCycleName' },
  { title: '操作', key: 'operation', scopedSlots: { customRender: 'operation' }, align: 'center' }
]
const crumbsArr = [
  { name: '当前位置', back: false, path: '' },
  { name: '生产管理', back: false, path: '' },
  { name: '采购管理', back: false, path: '' },
  { name: '待采购管理', back: false, path: '' }
]
const dateilCrumbsArr = [
  { name: '当前位置', back: false, path: '' },
  { name: '生产管理', back: false, path: '' },
  { name: '采购管理', back: false, path: '' },
  { name: '待采购管理', back: true, path: '/tobepurchased' },
  { name: '待采购详情', back: false, path: '' }
]
export { columns, crumbsArr, dateilCrumbsArr }
