<template>
  <div class="purchase-management">
    <a-layout style="margin: 16px;background: #eee;">
      <MyBreadCrumb :crumbsArr="breadcrumbs"></MyBreadCrumb>
      <div class="search-wrapper">
        <a-form class="form-fields" :form="form" @submit="handleSubmit">
          <a-row :gutter="24">
            <a-col
              v-for="(item, index) in fields"
              :key="'field' + item.id"
              :span="8"
              :style="{ display: index < count ? 'block' : 'none' }"
            >
              <a-form-item :label="item.label">
                <a-select
                  v-if="index === 4"
                  notFoundContent="未匹配到数据"
                  v-decorator="[`select_${item.id}`, {
                    rules: item.validators
                  }]"
                  :placeholder="item.placeholder"
                >
                  <a-select-option v-for="i in item.arrs" :key="i.id">{{i.label}}</a-select-option>
                </a-select>
                <a-input
                  v-else
                  autocomplete="off"
                  :placeholder="item.placeholder"
                  v-decorator="[`field_${item.id}`, {
                    rules: item.validators
                  }]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col>
              <a-button type="primary" html-type="submit">查询</a-button>
              <a-button :style="{ marginLeft: '8px' }" @click="handleReset">重置</a-button>
              <a-button :style="{ marginLeft: '8px' }" @click="() => {expand = !expand}">
                <a-icon :type="expand ? 'up' : 'down'" />
                {{expand ? '收起' : '展开'}}
              </a-button>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div class="list-collection">
        <a-button type="primary" class="add-button" @click="handleAddPurchase">添加农资</a-button>
        <a-table
          :columns="columns"
          :dataSource="list"
          :rowKey="(e, index) => index"
          :style="{marginTop: '50px'}"
          :pagination="pagination"
          :loading="loading"
          @change="pageOnChange"
        >
          <span slot="itemIndex" slot-scope="text, record, index">{{index+1}}</span>
          <span slot="questionContent" slot-scope="text, record">{{record.question.questionContent}}</span>
          <span
            slot="purchaseStatus"
            slot-scope="text, record"
          >{{cmpPurchaseStatus(record.purchaseStatus)}}</span>
          <span slot="materialDosage" slot-scope="text, record">{{record.materialDosage + record.materialUnitName}}</span>
          <a-row slot="operation" slot-scope="text, record">
            <span class="preview" @click="handleDetail(record)" >查看</span>
            <span v-if="record.purchaseStatus === 3" class="preview" @click="handleTagPurchase(record)" >标记为采购</span>
          </a-row>
        </a-table>
      </div>
      <a-modal
        title="采购金额："
        :visible="visible"
        @ok="handleMoneySubmit"
        :confirmLoading="confirmLoading"
        @cancel="handleCancel"
      >
        <a-form class="form-fields" :form="moneyForm" @submit="handleMoneySubmit">
        <a-form-item>
          <a-input
            autocomplete="off"
            placeholder="请输入采购金额"
            v-decorator="['field_money', {
              rules: [{ validator: validatorMoney }]
            }]"
          />
        </a-form-item>
        </a-form>
      </a-modal>
      <!-- <a-pagination
        class="pagination"
        :pageSizeOptions="['6', '12', '18']"
        showSizeChanger
        showQuickJumper
        :defaultCurrent="pageNo"
        :pageSize="pageSize"
        :total="total"
        @change="pageOnChange"
        @showSizeChange="pageSizeOnChange"
      /> -->
    </a-layout>
    <AddPurchase ref="newPurchase" @refresh="refreshList" />
  </div>
</template>
<script>
import MyBreadCrumb from '@/components/crumbsNav/CrumbsNav'
import Vue from 'vue'
import { Form, Col, Row, Button, Input, Layout, Pagination, Select, Table, Modal } from 'ant-design-vue'
import { purchaseManagementList, updatePurchaseState } from '@/api/productManage'
import { columns } from './config'
import AddPurchase from './AddPurchase'
Vue.use(Form)
Vue.use(Col)
Vue.use(Row)
Vue.use(Button)
Vue.use(Input)
Vue.use(Layout)
Vue.use(Pagination)
Vue.use(Select)
Vue.use(Table)
Vue.use(Modal)

const breadcrumbs = [
  { name: '当前位置', back: false, path: '' },
  { name: '生产管理', back: false, path: '' },
  { name: '采购管理', back: false, path: '' }
]

const list = []

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

const validatorMoney = (rule, value, callback) => {
  const regex = /^(([1-9]\d*)|\d)(\.\d{1,2})?$/
  if (!regex.test(value)) {
    callback(new Error('请输入金额，精确到分'))
  }
  callback()
}

const validators = {
  'v-materialName': [
    { required: false, message: '请输入农资名称' },
    { validator: validatorBaseXX }
  ],
  'v-farmingNum': [
    { required: false, message: '请输入农事计划编号' },
    { validator: validatorBaseXX }
  ],
  'v-actionName': [
    { required: false, message: '请输入所属农事操作' },
    { validator: validatorBaseX }
  ],
  'v-planCycleName': [
    { required: false, message: '请输入所属周期' },
    { validator: validatorBaseX }
  ],
  'v-purchaseStatus': [
    { required: false, message: '请选择采购状态' },
    { validator: validatorBaseX }
  ]
}

const fields = [
  {
    id: 'materialName',
    label: '农资名称',
    placeholder: '请输入农资名称',
    validators: validators['v-materialName']
  },
  {
    id: 'farmingNum',
    label: '农事计划编号',
    placeholder: '请输入农事计划编号',
    validators: validators['v-farmingNum']
  },
  {
    id: 'actionName',
    label: '所属农事操作',
    placeholder: '请输入所属农事操作',
    validators: validators['v-actionName']
  },
  {
    id: 'planCycleName',
    label: '所属周期',
    placeholder: '请输入所属周期',
    validators: validators['v-planCycleName']
  },
  {
    id: 'purchaseStatus',
    label: '请选择采购状态',
    placeholder: '请选择采购状态',
    validators: validators['v-purchaseStatus'],
    arrs: [
      { id: 1, label: '废弃' },
      { id: 2, label: '待采购' },
      { id: 3, label: '采购中' },
      { id: 4, label: '已采购' }
    ]
  }
]

export default {
  name: 'purchaseManagement',
  components: {
    MyBreadCrumb,
    AddPurchase
  },
  data () {
    return {
      breadcrumbs,
      fields,
      columns,
      list,
      pagination: { showQuickJumper: true, showSizeChanger: true },
      form: this.$form.createForm(this, { name: 'purchaseManagement' }),
      moneyForm: this.$form.createForm(this, { name: 'moneyForm' }),
      loading: false,
      expand: false,
      pageNo: 1,
      pageSize: 10,
      fetchParams: {},
      visible: false,
      confirmLoading: false,
      validatorMoney,
      purchaseRecord: {}
    }
  },
  computed: {
    count () {
      return this.expand ? 5 : 3
    }
  },
  created () {
    this.fetchList({})
  },
  methods: {
    fetchList (params) {
      let postdata = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        ...params
      }
      purchaseManagementList(postdata).then(res => {
        this.loading = false
        if (res && res.success === 'Y') {
          const pagination = { ...this.pagination }
          pagination.total = res.data && res.data.total
          this.pagination = pagination
          this.list = res.data && res.data.records
          return
        }
        this.list = []
      })
    },

    cmpPurchaseStatus (tag) {
      return tag === 1 ? '废弃'
        : tag === 2 ? '待采购'
          : tag === 3 ? '采购中' : '已采购'
    },

    handleDetail (record) {
      this.$router.push({
        name: 'purchaseMngDetail',
        query: { 'bizId': record.bizId }
      })
    },

    showModal() {
      this.visible = true
    },

    handleTagPurchase (record) {
      this.purchaseRecord = record
      this.showModal()
    },

    handleOk(e) {
      let self = this
      this.confirmLoading = true
      setTimeout(() => {
        self.visible = false
        self.confirmLoading = false
      }, 2000)
    },
    handleCancel(e) {
      this.visible = false
    },

    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          const params = {
            materialName: values.field_materialName === undefined || values.field_materialName === '' ? null : values.field_materialName,
            farmingNum: values.field_farmingNum === undefined || values.field_farmingNum === '' ? null : values.field_farmingNum,
            actionName: values.field_actionName === undefined || values.field_actionName === '' ? null : values.field_actionName,
            planCycleName: values.field_planCycleName === undefined || values.field_planCycleName === '' ? null : values.field_planCycleName,
            purchaseStatus: values.select_purchaseStatus === undefined || values.select_purchaseStatus === '' ? null : values.select_purchaseStatus
          }
          console.log('params:', params)
          this.pageNo = 1
          this.pagination.current = 1
          this.fetchParams = params
          this.fetchList(params)
        }
      })
    },

    handleMoneySubmit (e) {
      let self = this
      e.preventDefault()
      this.moneyForm.validateFields((err, values) => {
        if (!err) {
          let params = {
            bizId: self.purchaseRecord.bizId,
            purchaseMoney: parseFloat(values.field_money),
            purchaseStatus: 4
          }
          self.confirmLoading = true
          updatePurchaseState(params).then(res => {
            self.confirmLoading = false
            if (res && res.success === 'Y') {
              self.visible = false
              self.$message.success(res.message)
              self.fetchList({})
              return
            }
            self.$message.error(res.message)
          })
        }
      })
    },

    handleReset () {
      this.form.resetFields()
      this.fetchList({})
    },

    handleAddPurchase () {
      console.log('新增+++')
      this.$refs.newPurchase.showModel()
    },

    refreshList () {
      this.fetchList({})
    },

    pageOnChange (cfg) {
      const pager = { ...this.pagination }
      pager.current = cfg.current
      pager.pageSize = cfg.pageSize
      this.pagination = pager
      this.pageNo = pager.current
      this.pageSize = pager.pageSize
      this.fetchList(this.fetchParams)
    },

    pageSizeOnChange (cfg, pageSize) {
      this.pageNo = 1
      this.pageSize = pageSize
      this.fetchList(this.fetchParams)
    }
  }
}
</script>
<style lang="less" scoped>
.purchase-management {
  .search-wrapper {
    padding: 24px;
    background: #fff;
    margin-bottom: 10px;
    border-radius: 4px;
    .form-fields {
      .ant-form-item {
        text-align: left;
      }
    }
  }
  .list-collection {
    position: relative;
    padding: 24px;
    background-color: #fff;
    min-height: 360px;
    border-radius: 4px;
    .add-button {
      position: absolute;
      right: 24px;
    }
    .preview {
      cursor: pointer;
      color: #3c8dff;
    }
    .preview + .preview {
      margin-left: 1em;
    }
    span {
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
</style>
