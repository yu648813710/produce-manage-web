const columns = [
  { title: '序号', scopedSlots: { customRender: 'id' }, key: 'id', width: 70 },
  { title: '商品名称', scopedSlots: { customRender: 'productName' }, key: 'productName', width: 150 },
  { title: '产品品种', dataIndex: 'productBreed', key: 'productBreed', width: 150 },
  { title: '生产地', scopedSlots: { customRender: 'address' }, key: 'address', width: 150 },
  { title: '生产企业', scopedSlots: { customRender: 'productionCompany' }, key: 'productionCompany', width: 150 },
  { title: '生产日期', dataIndex: 'productionDate', key: 'productionDate', width: 120 },
  { title: '保质期(天)', dataIndex: 'expiryTime', key: 'expiryTime', width: 110 },
  { title: '木耳图片', scopedSlots: { customRender: 'productPicture' }, key: 'productPicture', align: 'center', width: 100 },
  { title: '溯源二维码', scopedSlots: { customRender: 'qrcodeId' }, key: 'qrcodeId', align: 'center', width: 120 },
  { title: '状态', scopedSlots: { customRender: 'status' }, key: 'status', align: 'center', width: 250 },
  { title: '操作', key: 'operation', scopedSlots: { customRender: 'operation' }, align: 'center', fixed: 'right', width: 300 }
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
  { name: '木耳栽培过程溯源', back: true, path: '/traceabilityofcultivation' },
  { name: '木耳溯源信息维护', back: false, path: '' }
]
export { columns, crumbsArr, dateilCrumbsArr }
