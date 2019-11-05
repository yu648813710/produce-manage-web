const columns = [
  { title: '序号', scopedSlots: { customRender: 'id' }, key: 'id' },
  { title: '商品名称', dataIndex: 'productName', key: 'productName' },
  { title: '产品品种', dataIndex: 'productBreed', key: 'productBreed' },
  { title: '生产地', dataIndex: 'address', key: 'address' },
  { title: '生产企业', dataIndex: 'productionCompany', key: 'productionCompany' },
  { title: '生产日期', dataIndex: 'productionDate', key: 'productionDate' },
  { title: '保质期(天)', dataIndex: 'expiryTime', key: 'expiryTime' },
  { title: '木耳图片', scopedSlots: { customRender: 'productPicture' }, key: 'productPicture', align: 'center' },
  { title: '溯源二维码', scopedSlots: { customRender: 'qrcodeId' }, key: 'qrcodeId', align: 'center' },
  { title: '状态', scopedSlots: { customRender: 'status' }, key: 'status' },
  { title: '操作', key: 'operation', scopedSlots: { customRender: 'operation' }, align: 'center' }
]
const crumbsArr = [
  { name: '当前位置', back: false, path: '' },
  { name: '生产管理', back: false, path: '' },
  { name: '溯源服务', back: false, path: '' },
  { name: '木耳栽培过程溯源', back: false, path: '' }
]
const dateilCrumbsArr = [
  { name: '当前位置', back: false, path: '' },
  { name: '生产管理', back: false, path: '' },
  { name: '溯源服务', back: false, path: '' },
  { name: '木耳溯源信息维护', back: false, path: '' }
]
export { columns, crumbsArr, dateilCrumbsArr }
