export const columns = [{
  title: '序号',
  key: 'itemIndex',
  scopedSlots: {
    customRender: 'itemIndex'
  }
},
{
  title: '任务操作',
  dataIndex: 'actionName',
  key: 'actionName'
},
{
  title: '所属周期',
  dataIndex: 'cycleName',
  key: 'cycleName'
},
{
  title: '农事类型',
  dataIndex: 'farmingTypeName',
  key: 'farmingTypeName'
},
{
  title: '使用农资及用量(每亩)',
  key: 'materialName',
  scopedSlots: {
    customRender: 'materialName'
  }
},
{
  title: '执行周期',
  key: 'taskWeekly',
  scopedSlots: {
    customRender: 'taskWeekly'
  }
},
{
  title: '用途',
  dataIndex: 'taskUse',
  key: 'taskUse'
},
{
  title: '农事描述',
  key: 'taskDescription',
  scopedSlots: {
    customRender: 'taskDescription'
  }
}
  // { title: '操作', key: 'operation', scopedSlots: { customRender: 'operation' } }
]
