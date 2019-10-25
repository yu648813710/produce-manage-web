/**
 * @columns 表头（a-table）
 */
export const columns = [{
  title: '序号',
  key: 'itemIndex',
  scopedSlots: {
    customRender: 'itemIndex'
  }
},
{
  title: '问题描述',
  key: 'questionContent',
  scopedSlots: {
    customRender: 'questionContent'
  }
},
{
  title: '品种',
  dataIndex: 'question.breedName',
  key: 'breedName'
},
{
  title: '品类',
  dataIndex: 'question.categoryName',
  key: 'categoryName'
},
{
  title: '分类',
  dataIndex: 'question.targetClazz',
  key: 'targetClazz'
},
{
  title: '提交人',
  dataIndex: 'question.createUserName',
  key: 'createUserName'
},
{
  title: '创建日期',
  dataIndex: 'question.gmtCreate',
  key: 'gmtCreate'
},
{
  title: '回复数',
  dataIndex: 'answerCount',
  key: 'answerCount'
},
{
  title: '是否为常见问题',
  key: 'questionType',
  scopedSlots: {
    customRender: 'questionType'
  }
},
{
  title: '是否需要回复',
  key: 'replayFlag',
  scopedSlots: {
    customRender: 'replayFlag'
  }
},
{
  title: '操作',
  key: 'operation',
  scopedSlots: {
    customRender: 'operation'
  }
}
]

/**
 *
 * @rule {正则等其他校验规则}
 * @value {通过此值校验是否满足规则}
 * @callback {校验结果反馈}
 * @validators  {不同Input对应的校验规则}
 * @fields  {最终Form表单}
 */
const validatorBaseX = (rule, value, callback) => {
  if (value && JSON.stringify(value).length > 10) {
    callback(new Error('不能超过10个字符'))
  }
  callback()
}

const validatorBaseXX = (rule, value, callback) => {
  if (value && JSON.stringify(value).length > 20) {
    callback(new Error('不能超过20个字符'))
  }
  callback()
}

const validators = {
  'v-questionContent': [{
    required: false,
    message: '请输入问题描述'
  },
  {
    validator: validatorBaseXX
  }
  ],
  'v-categoryName': [{
    required: false,
    message: '请输入品种'
  },
  {
    validator: validatorBaseXX
  }
  ],
  'v-targetClazz': [{
    required: false,
    message: '请选择分类'
  },
  {
    validator: validatorBaseX
  }
  ],
  'v-questionType': [{
    required: false,
    message: '请选择是否为常见问题'
  },
  {
    validator: validatorBaseX
  }
  ],
  'v-replyType': [{
    required: false,
    message: '请选择是否需要回复'
  },
  {
    validator: validatorBaseX
  }
  ],
  'v-startDate': [{
    required: false,
    message: '开始日期'
  }],
  'v-endDate': [{
    required: false,
    message: '结束日期'
  }]
}

export const fields = [{
  id: 'questionContent',
  label: '问题描述',
  placeholder: '请输入问题描述',
  validators: validators['v-questionContent']
},
{
  id: 'categoryName',
  label: '品种',
  placeholder: '请输入品种',
  validators: validators['v-breed']
},
{
  id: 'targetClazz',
  label: '分类',
  placeholder: '请选择分类',
  arrs: [],
  validators: validators['v-targetClazz']
},
{
  id: 'questionType',
  label: '是否为常见问题',
  placeholder: '请选择是否为常见问题',
  arrs: [{
    id: 0,
    label: '是'
  },
  {
    id: 1,
    label: '否'
  }
  ],
  validators: validators['v-questionType']
},
{
  id: 'replyType',
  label: '是否需要回复',
  placeholder: '请选择是否需要回复',
  arrs: [{
    id: 'Y',
    label: '是'
  },
  {
    id: 'N',
    label: '否'
  }
  ],
  validators: validators['v-replyType']
},
{
  id: 'creatStartDate',
  label: '创建日期',
  placeholder: '开始日期',
  validators: validators['v-startDate']
},
{
  id: 'creatEndDate',
  label: '',
  placeholder: '结束日期',
  validators: validators['v-endDate']
}
]
