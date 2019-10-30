export const columns = [{
  title: '序号',
  key: 'itemIndex',
  scopedSlots: {
    customRender: 'itemIndex'
  }
},
{
  title: '农资名称',
  dataIndex: 'materialName',
  key: 'materialName'
},
{
  title: '计划用量',
  key: 'materialDosage',
  scopedSlots: {
    customRender: 'materialDosage'
  }
},
{
  title: '农事计划编号',
  dataIndex: 'farmingNum',
  key: 'farmingNum'
},
{
  title: '所属农事操作',
  key: 'actionName',
  dataIndex: 'actionName'
},
{
  title: '所属周期',
  key: 'planCycleName',
  dataIndex: 'planCycleName'
},
{
  title: '采购状态',
  key: 'purchaseStatus',
  scopedSlots: {
    customRender: 'purchaseStatus'
  }
},
{
  title: '采购金额(元)',
  key: 'purchaseMoney',
  dataIndex: 'purchaseMoney'
},
{
  title: '操作',
  key: 'operation',
  align: 'center',
  scopedSlots: {
    customRender: 'operation'
  }
}
]

// const validatorBaseX = (rule, value, callback) => {
//   if (value && JSON.stringify(value).length > 10) {
//     callback(new Error('不能超过10个字符'))
//   }
//   callback()
// }

// const validatorBaseXXX = (rule, value, callback) => {
//   if (value && JSON.stringify(value).length > 30) {
//     callback(new Error('不能超过30个字符'))
//   }
//   callback()
// }

// const validatorBaseRegex = (rule, value, callback) => {
//   let regex = /^(0|[1-9][0-9]*)$/
//   if (!regex.test(value)) {
//     callback(new Error('请输入整数'))
//   }
//   callback()
// }

const validators = {
  'v-farmingNum': [{
    required: true,
    message: '请关联农事计划编号'
  }],
  'v-assCycle': [{
    required: true,
    message: '请关联周期'
  }],
  'v-assSoilType': [{
    required: true,
    message: '请关联农事类型'
  }],
  'v-assFramingAction': [{
    required: true,
    message: '请关联农事操作'
  }],
  'v-cooFramingMaterials': [{
    required: true,
    message: '请选择农资'
  }],
  'v-useLevel': [{
    required: true,
    message: '请输入用量'
  }],
  'v-useLevelUnit': [{
    required: true,
    message: 'ppx'
  }],
  'v-usage': [{
    required: true,
    message: '请输入用途'
  }],
  'v-materialDesc': [{
    required: false,
    message: '请输入农资描述'
  }]
}

export const fields = [{
  id: 'farmingNum',
  label: '关联农事计划编号',
  placeholder: '请选择农事计划编号',
  validators: validators['v-farmingNum'],
  arr: [
    { id: '000', label: 'num000', value: 'val000' },
    { id: '001', label: 'num001', value: 'val001' },
    { id: '002', label: 'num002', value: 'val002' }
  ]
},
{
  id: 'assCycle',
  label: '关联周期',
  placeholder: '请选择周期',
  validators: validators['v-assCycle'],
  arr: [
    { id: '000', label: 'cyc000', value: 'val000' },
    { id: '001', label: 'cyc001', value: 'val001' },
    { id: '002', label: 'cyc002', value: 'val002' }
  ]
},
{
  id: 'assSoilType',
  label: '关联农事类型',
  placeholder: '请选择农事类型',
  validators: validators['v-assSoilType'],
  arr: [
    { id: '000', label: 'typ000', value: 'val000' },
    { id: '001', label: 'typ001', value: 'val001' },
    { id: '002', label: 'typ002', value: 'val002' }
  ]
},
{
  id: 'assFramingAction',
  label: '关联农事操作',
  placeholder: '请关联农事操作',
  validators: validators['v-assFramingAction'],
  arr: [
    { id: '000', label: 'aci000', value: 'val000' },
    { id: '001', label: 'aci001', value: 'val001' },
    { id: '002', label: 'aci002', value: 'val002' }
  ]
},
{
  id: 'cooFramingMaterials',
  label: '选择农资',
  placeholder: '请选择农资',
  validators: validators['v-cooFramingMaterials'],
  arr: [
    { id: '000', label: 'mat000', value: 'val000' },
    { id: '001', label: 'mat001', value: 'val001' },
    { id: '002', label: 'mat002', value: 'val002' }
  ]
},
{
  id: 'useLevel',
  label: '用量',
  placeholder: '请输入用量',
  validators: validators['v-useLevel'],
  coc: {
    id: 'useLevelUnit',
    label: '',
    placeholder: 'px',
    validators: validators['v-useLevelUnit']
  }
},
{
  id: 'usage',
  label: '用途',
  placeholder: '请输入用途',
  validators: validators['v-usage']
},
{
  id: 'materialDesc',
  label: '农资描述',
  placeholder: '请输入农资描述',
  validators: validators['v-materialDesc']
}
]
