const listColumns = [
  { title: '序号', scopedSlots: { customRender: 'id' }, align: 'center' },
  { title: '基地名称', dataIndex: 'baseLandName', scopedSlots: { customRender: 'baseLandName' } },
  { title: '地块名称', dataIndex: 'blockLandName' },
  { title: '监测指标', dataIndex: 'temperature' },
  {
    title: '操作',
    key: 'operation',
    scopedSlots: { customRender: 'operation' },
    width: 160,
    align: 'center',
    fixed: 'right'
  }
]
export { listColumns }
