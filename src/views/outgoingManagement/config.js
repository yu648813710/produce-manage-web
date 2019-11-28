const columns = [
  { title: '序号', scopedSlots: { customRender: 'id' }, key: 'id' },
  { title: '出库批次号', dataIndex: 'deliveryCode', key: 'deliveryCode' },
  { title: '所属任务编号', dataIndex: 'taskId', key: 'taskId' },
  { title: '菌包名称', dataIndex: 'fungusBagName', key: 'fungusBagName' },
  { title: '出库数量（袋）', dataIndex: 'amount', key: 'amount', align: 'center' },
  { title: '出库时间', scopedSlots: { customRender: 'deliveryTime' }, key: 'deliveryTime', align: 'center' },
  { title: '出库人', dataIndex: 'deliveryUserName', key: 'deliveryUserName' }
]
const crumbsArr = [
  { name: '生产管理', back: false, path: '' },
  { name: '出库管理', back: false, path: '' }
]
export { columns, crumbsArr }
