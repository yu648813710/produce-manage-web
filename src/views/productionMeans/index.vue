/**
产品操作
*/
<template>
  <div class="prd-action">
    <crumbsNav :crumbsArr="crumbsArr"></crumbsNav>
    <a-layout>
      <a-layout-content style="margin: 16px">
        <div class="search-wrapper">
          <a-form class="form-fields" :form="form" @submit="handleSubmit">
            <a-row :gutter="40">
              <!-- 资料名称 -->
              <a-col :span="8">
                <a-form-item label="资料名称">
                  <a-input
                    placeholder="请输入资料名称"
                    autocomplete="off"
                    v-decorator="['optionName', {
                      rules: [
                        { required: false, message: '请输入资料名称' }]
                    }]"
                  />
                </a-form-item>
              </a-col>
              <!-- 土地所有人 -->
              <a-col :span="8">
                <a-form-item label="土地所有人">
                  <a-input
                    placeholder="请输入土地所有人"
                    autocomplete="off"
                    v-decorator="['optionName', {
                      rules: [
                        { required: false, message: '请输入土地所有人' }]
                    }]"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col>
                <a-button type="primary" html-type="submit">查询</a-button>
                <a-button style="margin-left: 10px;" @click="handleReset">重置</a-button>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <div class="table-wrapper">
          <a-button type="primary" class="add-button" @click="handleNewAction">新增生产资料</a-button>
          <a-table
            :columns="columns"
            :dataSource="list"
            :style="{marginTop: '50px'}"
            :rowKey="e => e.optionId"
            :pagination="pagination"
            :loading="loading"
            :scroll="{ x: 1240 }"
            @change="handlePage"
          >
            <span slot="itemIndex" slot-scope="text, record, index">{{index+1}}</span>
            <span slot="optionName" slot-scope="text, record" class="line-sp" :title="record.optionName">{{record.optionName}}</span>
            <span
              class="delete"
              slot="operation"
              slot-scope="text, record"
              v-if="record.scope === 'private'"
              @click="handleDelete(record)"
            >删除</span>
          </a-table>
        </div>
      </a-layout-content>
    </a-layout>
    <a-modal
      title="删除操作"
      :visible="isDeleteVisible"
      @ok="handleDeleteOk"
      @cancel="() => isDeleteVisible = false"
    >
      <p style="text-align:center">是否确认删除?</p>
    </a-modal>
    <!-- <AddAction ref="newAction" @refresh="refreshList" /> -->
  </div>
</template>
<script>
import Vue from 'vue'
import {
  Layout,
  Input,
  Row,
  Col,
  Cascader,
  Button,
  Table,
  Form,
  Modal
} from 'ant-design-vue'
import crumbsNav from '@/components/crumbsNav/CrumbsNav'
// import AddAction from './AddAction'
Vue.use(Layout)
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)
Vue.use(Cascader)
Vue.use(Button)
Vue.use(Table)
Vue.use(Form)
Vue.use(Modal)

const columns = [
  {
    title: '序号',
    key: 'itemIndex',
    scopedSlots: { customRender: 'itemIndex' }
  },
  { title: '生产资料编号', key: 'productMeansNum', scopedSlots: { customRender: 'productMeansNum' }, width: 200 },
  { title: '资料名称', dataIndex: 'meansName', key: 'meansName' },
  { title: '栽培作物', dataIndex: 'cropsName', key: 'cropsName' },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '土地所有人', dataIndex: 'landowner', key: 'landowner' },
  { title: '提交时间', dataIndex: 'submitDate', key: 'submitDate' },
  {
    title: '操作',
    key: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
]

let farmingTypes = []
const list = []

export default {
  components: {
    crumbsNav
    // Form,
    // Modal
  },
  created () {
    // this.fetchFramingType()
    // this.fetchList({})
  },
  data () {
    return {
      list,
      columns,
      pageNo: 1,
      pageSize: 10,
      pagination: {
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30'],
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0,
        showTotal: total => `共 ${total} 条`
      },
      loading: false,
      form: this.$form.createForm(this, { name: 'productAction' }),
      farmingTypes,
      crumbsArr: [
        { name: '当前位置', back: false, path: '' },
        { name: '生产管理', back: false, path: '' },
        { name: '生产资料', back: false, path: '' }
      ],
      fetchParams: {},
      isDeleteVisible: false,
      optionId: ''
    }
  },
  methods: {
    fetchList (params) {
      // let postData = {
      //   pageNo: this.pageNo,
      //   pageSize: this.pageSize,
      //   ...params
      // }
      // productActionList(postData).then(res => {
      //   this.loading = false
      //   if (res && res.success === 'Y') {
      //     this.list = res.data && res.data.records
      //     const pagination = { ...this.pagination }
      //     pagination.total = res.data && res.data.total
      //     this.pagination = pagination
      //   }
      // })
    },

    fetchFramingType () {

    },

    handleNewAction () {
      this.$refs.newAction.showModel()
    },

    refreshList () {
      this.fetchList({})
    },

    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          const params = {
            optionName:
              values.optionName === undefined || values.optionName === ''
                ? null
                : values.optionName,
            farmingTypeId:
              values.farmingType === undefined || values.farmingType === ''
                ? null
                : values.farmingType
          }
          this.pageNo = 1
          this.pagination.current = 1
          this.fetchParams = params
          this.fetchList(params)
        }
      })
    },

    handleReset () {
      this.form.resetFields()
      this.pageNo = 1
      this.fetchParams = {}
      this.fetchList(this.fetchParams)
    },

    handlePage (cfg) {
      const pager = { ...this.pagination }
      pager.current = cfg.current
      pager.pageSize = cfg.pageSize
      this.pagination = pager
      this.pageNo = pager.current
      this.pageSize = cfg.pageSize
      this.fetchList(this.fetchParams)
    },

    handleDeleteOk() {
    },

    handleDelete (record) {
      this.optionId = record.optionId
      this.isDeleteVisible = true
    }
  }
}
</script>
<style lang="less" scoped>
.prd-action {
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
}
.search-wrapper {
  padding: 24px;
  background: #fff;
  margin-bottom: 10px;
  border-radius: 4px;

  .search-input-wrapper {
    position: relative;
    margin-bottom: 24px;

    .search-title {
      position: absolute;
      left: 0;
      color: #333;
      font-size: 14px;
    }

    .search-input {
      margin-top: 30px;
    }
  }
  .button {
    margin: 0 5px;
  }
}
.table-wrapper {
  position: relative;
  padding: 24px;
  background: #fff;
  min-height: 360px;
  border-radius: 4px;
  .line-sp {
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 200px;
  }
  .add-button {
    position: absolute;
    right: 24px;
  }
  .delete {
    cursor: pointer;
    color: #3c8dff;
  }
}
</style>
