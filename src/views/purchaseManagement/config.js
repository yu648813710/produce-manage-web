export const columns = [{
  title: '序号',
  key: 'itemIndex',
  scopedSlots: {
    customRender: 'itemIndex'
  },
  width: 100
},
{
  title: '农资名称',
  scopedSlots: {
    customRender: 'materialName'
  },
  key: 'materialName',
  width: 150
},
{
  title: '计划用量',
  key: 'materialDosage',
  scopedSlots: {
    customRender: 'materialDosage'
  },
  width: 150
},
{
  title: '农事计划编号',
  key: 'farmingNum',
  scopedSlots: {
    customRender: 'farmingNum'
  },
  width: 200
},
{
  title: '所属农事操作',
  key: 'actionName',
  scopedSlots: {
    customRender: 'actionName'
  },
  width: 150
},
{
  title: '所属周期',
  key: 'planCycleName',
  scopedSlots: {
    customRender: 'planCycleName'
  },
  width: 150
},
{
  title: '采购状态',
  key: 'purchaseStatus',
  scopedSlots: {
    customRender: 'purchaseStatus'
  },
  width: 150
},
{
  title: '采购金额(元)',
  key: 'purchaseMoney',
  scopedSlots: {
    customRender: 'purchaseMoney'
  },
  width: 150
},
{
  title: '操作',
  key: 'operation',
  align: 'center',
  scopedSlots: {
    customRender: 'operation'
  },
  fixed: 'right',
  width: 200
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

// 验证有1-3位小数的正实数
const validatorBaseRegex = (rule, value, callback) => {
  let regex = /^[0-9]+(.[0-9]{1,3})?$/
  if (!regex.test(value)) {
    callback(new Error('请输入数字(精确到小数点后三位)'))
  }
  callback()
}

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
  }, { validator: validatorBaseRegex }],
  'v-useLevelUnit': [{
    required: true,
    message: ''
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
  arr: []
},
{
  id: 'assCycle',
  label: '关联周期',
  placeholder: '请选择周期',
  validators: validators['v-assCycle'],
  arr: []
},
{
  id: 'assSoilType',
  label: '关联农事类型',
  placeholder: '请选择农事类型',
  validators: validators['v-assSoilType'],
  arr: []
},
{
  id: 'assFramingAction',
  label: '关联农事操作',
  placeholder: '请关联农事操作',
  validators: validators['v-assFramingAction'],
  arr: []
},
{
  id: 'cooFramingMaterials',
  label: '选择农资',
  placeholder: '请选择农资',
  validators: validators['v-cooFramingMaterials'],
  arr: []
},
{
  id: 'useLevel',
  label: '用量',
  placeholder: '请输入用量',
  validators: validators['v-useLevel']
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
