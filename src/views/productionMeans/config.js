// 验证有1-3位小数的正实数
const validatorBaseRegex = (rule, value, callback) => {
  let regex = /^[0-9]+(.[0-9]{1,2})?$/
  if (!regex.test(value)) {
    callback(new Error('请输入数字(精确到小数点后两位)'))
  }
  callback()
}
// 验证手机格式
const validatorPhoneRegex = (rule, value, callback) => {
  let regex = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/
  if (!regex.test(value)) {
    callback(new Error('手机格式不正确'))
  }
  callback()
}

const validatorsStep1 = {
  'v-meansName': [{
    required: true,
    message: '请输入资料名称'
  }],
  'v-companyName': [{
    required: true,
    message: '请输入企业名称'
  }],
  'v-belongIndustry': [{
    required: true,
    message: '请输入所属行业'
  }],
  'v-companyAddress': [{
    required: true,
    message: '请输入企业地址'
  }],
  'v-landowner': [{
    required: true,
    message: '请输入土地所有人'
  }],
  'v-telephone': [{
    required: true,
    message: '请输入手机号'
  }, { validator: validatorPhoneRegex }],
  'v-annualReport': [{
    required: true,
    message: '请输入报告年度'
  }],
  'v-landArea': [{
    required: true,
    message: '请输入土地面积'
  }, { validator: validatorBaseRegex }],
  'v-plantingArea': [{
    required: true,
    message: '请输入种植面积'
  }, { validator: validatorBaseRegex }],
  'v-cropCultivation': [{
    required: true,
    message: '请输入栽培作物'
  }],
  'v-landTrulyProve': [{
    required: true,
    message: '请上传土地确权证明'
  }]
}

export const fieldsStep1 = [{
  id: 'meansName',
  label: '资料名称',
  placeholder: '请输入资料名称',
  validators: validatorsStep1['v-meansName'],
  mx: 15,
  isEdit: true
},
{
  id: 'companyName',
  label: '企业名称',
  placeholder: '请输入企业名称',
  validators: validatorsStep1['v-companyName'],
  mx: null,
  isEdit: false // false
},
{
  id: 'belongIndustry',
  label: '所属行业',
  placeholder: '请输入所属行业',
  validators: validatorsStep1['v-belongIndustry'],
  mx: null,
  isEdit: false // false
},
{
  id: 'companyAddress',
  label: '企业地址',
  placeholder: '请输入企业地址',
  validators: validatorsStep1['v-companyAddress'],
  mx: 50,
  isEdit: true
},
{
  id: 'landowner',
  label: '土地所有人',
  placeholder: '请输入土地所有人',
  validators: validatorsStep1['v-landowner'],
  mx: 5,
  isEdit: true
},
{
  id: 'telephone',
  label: '手机',
  placeholder: '请输入手机号',
  validators: validatorsStep1['v-telephone'],
  mx: null,
  isEdit: true
},
{
  id: 'annualReport',
  label: '报告年度',
  placeholder: '请输入报告年度',
  validators: validatorsStep1['v-annualReport'],
  mx: null,
  isEdit: true
},
{
  id: 'landArea',
  label: '土地面积',
  placeholder: '请输入土地面积',
  validators: validatorsStep1['v-landArea'],
  mx: 10,
  isEdit: true
},
{
  id: 'plantingArea',
  label: '种植面积',
  placeholder: '请输入种植面积',
  validators: validatorsStep1['v-plantingArea'],
  mx: 10,
  isEdit: true
},
{
  id: 'cropCultivation',
  label: '栽培作物',
  placeholder: '请输入栽培作物',
  validators: validatorsStep1['v-cropCultivation'],
  mx: 15,
  isEdit: true
},
{
  id: 'landTrulyProve',
  label: '土地确权证明',
  placeholder: '请上传土地确权证明',
  validators: validatorsStep1['v-landTrulyProve'],
  mx: null,
  isEdit: true
}
]

const validatorsStep2 = {
  'v-actualProduction': [{
    required: true,
    message: '请输入实际产量'
  }, { validator: validatorBaseRegex }],
  'v-sales': [{
    required: true,
    message: '请输入销量'
  }, { validator: validatorBaseRegex }],
  'v-salesQuota': [{
    required: true,
    message: '请输入销售额'
  }, { validator: validatorBaseRegex }]
}
export const fieldsStep2 = [{
  id: 'actualProduction',
  label: '实际产量',
  placeholder: '请输入实际产量',
  validators: validatorsStep2['v-actualProduction'],
  mx: 10,
  isEdit: true
},
{
  id: 'sales',
  label: '销量',
  placeholder: '请输入销量',
  validators: validatorsStep2['v-sales'],
  mx: 10,
  isEdit: true
},
{
  id: 'salesQuota',
  label: '销售额',
  placeholder: '请输入销售额',
  validators: validatorsStep2['v-salesQuota'],
  mx: 10,
  isEdit: true
}
]
