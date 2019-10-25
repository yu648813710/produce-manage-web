const columns = [
  { title: '序号', scopedSlots: { customRender: 'id' }, key: 'id' },
  { title: '生产批次号', dataIndex: 'productionPatchCode', key: 'productionPatchCode' },
  { title: '产品名称', dataIndex: 'productName', key: 'productName' },
  { title: '采收人', dataIndex: 'harvester', key: 'harvester' },
  { title: '采摘量（斤）', dataIndex: 'amount', key: 'amount', align: 'center' }
]
const crumbsArr = [
  { name: '当前位置', back: false, path: '' },
  { name: '生产管理', back: false, path: '' },
  { name: '生产批次管理', back: false, path: '' }
]
export { columns, crumbsArr }
