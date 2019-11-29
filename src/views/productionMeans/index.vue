<template>
  <div class="prd-means" style="margin: 10px 16px;background: #eee;">
    <MyBreadCrumb :crumbsArr="crumbsArr" style="margin-bottom: 10px;"></MyBreadCrumb>
    <a-layout>
      <a-layout-content>
        <div class="search-wrapper">
          <a-form class="form-fields" :form="form" @submit="handleSubmit">
            <a-row :gutter="40">
              <!-- 资料名称 -->
              <a-col :span="8">
                <a-form-item label="资料名称" :colon="false">
                  <a-input
                    placeholder="请输入资料名称"
                    autocomplete="off"
                    v-decorator="['materialName', {
                      rules: [
                        { required: false, message: '请输入资料名称' }]
                    }]"
                  />
                </a-form-item>
              </a-col>
              <!-- 土地所有人 -->
              <a-col :span="8">
                <a-form-item label="土地所有人" :colon="false">
                  <a-input
                    placeholder="请输入土地所有人"
                    autocomplete="off"
                    v-decorator="['landowner', {
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
            :rowKey="e => e.materialNum"
            :pagination="pagination"
            :loading="loading"
            :scroll="{ x: 1200 }"
            @change="handlePage"
          >
            <span slot="itemIndex" slot-scope="text, record, index" class="line-sp-sm">{{index+1}}</span>
            <span slot="materialNum" slot-scope="text, record" class="line-sp" :title="record.materialNum">{{record.materialNum}}</span>
            <span slot="materialName" slot-scope="text, record" class="line-sp" :title="record.materialName">{{record.materialName}}</span>
            <span slot="cultivation" slot-scope="text, record" class="line-sp-sm" :title="record.cultivation">{{record.cultivation}}</span>
            <span slot="landowner" slot-scope="text, record" class="line-sp" :title="record.landowner">{{record.landowner}}</span>
            <span slot="submitTime" slot-scope="text, record" class="line-sp" :title="record.submitTime">{{record.submitTime}}</span>
            <span slot="status" slot-scope="text, record" class="line-sp-sm">
              <a-switch checkedChildren="启用" unCheckedChildren="禁用" :defaultChecked="switchStatus(record.status)" @change="(e) => handleSwitchClick(e, record)"/>
            </span>
            <a-row slot="operation" slot-scope="text, record" class="line-sp">
              <span class="delete" @click="handleCopy(record)">拷贝</span>
              <span class="delete viw" @click="handleDetail(record)">查看</span>
              <span class="delete" @click="handleDelete(record)">删除</span>
            </a-row>
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
      <p>是否确认删除?</p>
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
  Modal,
  Switch
} from 'ant-design-vue'
import MyBreadCrumb from '@/components/crumbsNav/CrumbsNav'
import { produceMeansList, putProduceMeansStatus, produceMeansDelete } from '@/api/productManage'
Vue.use(Layout)
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)
Vue.use(Cascader)
Vue.use(Button)
Vue.use(Table)
Vue.use(Form)
Vue.use(Modal)
Vue.use(Switch)

const columns = [
  { title: '序号', key: 'itemIndex', scopedSlots: { customRender: 'itemIndex' }, width: 100 },
  { title: '生产资料编号', key: 'materialNum', scopedSlots: { customRender: 'materialNum' }, width: 200 },
  { title: '资料名称', key: 'materialName', scopedSlots: { customRender: 'materialName' }, width: 200 },
  { title: '栽培作物', key: 'cultivation', scopedSlots: { customRender: 'cultivation' }, width: 100 },
  { title: '状态', key: 'status', scopedSlots: { customRender: 'status' }, width: 100 },
  { title: '土地所有人', key: 'landowner', scopedSlots: { customRender: 'landowner' }, width: 200 },
  { title: '提交时间', key: 'submitTime', scopedSlots: { customRender: 'submitTime' }, width: 200 },
  { title: '操作', key: 'operation', scopedSlots: { customRender: 'operation' }, width: 200, fixed: 'right', align: 'center' }
]

let farmingTypes = []
const list = []

export default {
  components: {
    MyBreadCrumb
    // Form,
    // Modal
  },
  created () {
    this.fetchList({})
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
        { name: '生产管理', back: false, path: '' },
        { name: '生产资料', back: false, path: '' }
      ],
      fetchParams: {},
      isDeleteVisible: false,
      bizId: '',
      switchStatus: (e) => e === 'Y'
    }
  },
  methods: {
    fetchList (params) {
      let postData = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        ...params
      }
      produceMeansList(postData).then(res => {
        this.loading = false
        if (res && res.success === 'Y') {
          this.list = res.data && res.data.records
          const pagination = { ...this.pagination }
          pagination.total = res.data && res.data.total
          this.pagination = pagination
        }
      })
    },

    fetchChangeStatus(bizId, status) {
      putProduceMeansStatus(bizId, status).then(res => {
        if (res && res.success === 'Y') {
          this.$message.success(res.message)
          this.fetchList(this.fetchParams)
          return
        }
        this.$message.error(res.message)
      })
    },

    handleSwitchClick(checked, record) {
      let tempStatus = record.status
      if (checked) {
        tempStatus = 'Y'
      } else {
        tempStatus = 'N'
      }
      this.fetchChangeStatus(record.bizId, tempStatus)
    },

    handleNewAction () {
      this.$router.push({ path: '/addMeans', query: { tag: 'new' } })
    },

    refreshList () {
      this.fetchList({})
    },

    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          const params = {
            materialName:
              values.materialName === undefined || values.materialName === ''
                ? null
                : values.materialName,
            landowner:
              values.landowner === undefined || values.landowner === ''
                ? null
                : values.landowner
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
      produceMeansDelete(this.bizId).then(res => {
        if (res && res.success === 'Y') {
          this.$message.success(res.message)
          this.isDeleteVisible = false
          this.fetchList(this.fetchParams)
          return
        }
        this.$message.error(res.message)
      })
    },

    handleDelete (record) {
      this.bizId = record.bizId
      this.isDeleteVisible = true
    },

    handleCopy (record) {
      this.$router.push({ path: '/addMeans', query: { bizId: record.bizId, tag: 'copy' } })
    },

    handleDetail (record) {
      this.$router.push({ path: '/productionMeansDetail', query: { bizId: record.bizId } })
    }
  }
}
</script>
<style lang="less" scoped>
.prd-means {
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
  .line-sp-sm {
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100px;
  }
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
  .viw  {
    margin: 0 10px;
  }
}
</style>
