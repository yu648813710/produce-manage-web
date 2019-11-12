/**临时工管理*/
<template>
  <div class="about">
    <a-layout>
      <div style="padding-top: 16px;padding-left:16px;">
        <crumbs-nav :crumbs-arr="crumbsArr"/>
      </div>
      <a-layout-content style="margin: 16px;margin-top:0;">
        <div class="search-wrapper">
          <a-form
            :form="searchForm"
            @submit="searchList"
          >
            <a-row :gutter="40">
              <a-col :span="8">
                <a-form-item label="临时工姓名">
                  <a-input
                    autocomplete="off"
                    placeholder="请输入"
                    v-model="searchParams.userName"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="临时工手机号">
                  <a-input
                    autocomplete="off"
                    placeholder="请输入"
                    v-model="searchParams.phone"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="状态">
                  <a-select
                    placeholder="请选择"
                    :allowClear="true"
                    style="width: 100%;"
                    v-decorator="[
                      'jobStatus',{},
                    ]"
                  >
                    <a-select-option v-for="item in statusArr" :key="item.value" :value="item.value">{{item.name}}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="40" v-show="upDownStatue">
              <a-col :span="8">
                <a-form-item label="是否是贫困户">
                  <a-select
                    placeholder="请选择"
                    :allowClear="true"
                    style="width: 100%;"
                    v-decorator="[
                      'povertyStatus',{},
                    ]"
                  >
                    <a-select-option v-for="item in ifArr" :key="item.value" :value="item.value">{{item.name}}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
          <div>
            <a-button
              type="primary"
              class="button"
              @click="searchList"
            >查询
            </a-button>
            <a-button
              class="button"
              @click="handleReset"
            >重置
            </a-button>
            <a-button
              :style="{ marginLeft: '8px' }"
              @click="upDownStatue=!upDownStatue"
            >
              <a-icon :type="!upDownStatue ? 'down' : 'up'"/>
              {{!upDownStatue ? '展开' : '收起'}}
            </a-button>
          </div>
        </div>
        <div class="table-wrapper">
          <div>
            <a-button type="primary" class="add-button" @click="handleAdd">新增</a-button>
          </div>
          <a-table
            :columns="columns"
            :dataSource="list"
            :pagination="pagination"
            :loading="loading"
            @change="handleTableChange"
            :style="{marginTop: '50px'}"
            :rowKey="(record, index) => index"
          >
            <span
              slot="id"
              slot-scope="text, record, index"
            >{{index + 1}}</span>
            <span slot="jobStatus" slot-scope="text, record">
              <a-switch
                checkedChildren="在职"
                unCheckedChildren="离职"
                :checked="record.jobStatus === 'ON_WORK'"
                @change="handleChangeStatus(record)"
              />
            </span>
            <span slot="operation" slot-scope="text, record">
              <a-button type="link" @click="toDetail(record)">查看</a-button>
              <a-button type="link" @click="handelEdit(record)" style="padding:0;">编辑</a-button>
              <a-button type="link" @click="handelDelete(record)" v-if="record.jobStatus==='NO_WORK'">删除</a-button>
            </span>
          </a-table>
        </div>
      </a-layout-content>
    </a-layout>
    <operation-modal
      :title="title"
      :visible="visible"
      :contentText="contentText"
      :data="form"
      :validate="validate"
      @confirm="handleOk"
      @cancel="handleCancel"
    />
  </div>
</template>
<script>
import Vue from 'vue'
import CrumbsNav from '@/components/crumbsNav/CrumbsNav' // 面包屑
import OperationModal from './components/OperationModal'
import {
  Layout,
  Breadcrumb,
  Input,
  Row,
  Col,
  Cascader,
  Button,
  Table,
  Modal,
  Select,
  Form,
  Radio,
  Switch
} from 'ant-design-vue'
import {
  getTempWorkerList,
  changeJobStatus,
  delTempWorker,
  addTempWorker,
  editTempWorker
} from '@/api/productManage.js'
import { columns, crumbsArr, statusArr, ifArr } from './config.js'

Vue.use(Layout)
Vue.use(Breadcrumb)
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)
Vue.use(Cascader)
Vue.use(Button)
Vue.use(Table)
Vue.use(Modal)
Vue.use(Select)
Vue.use(Form)
Vue.use(Radio)
Vue.use(Switch)
export default {
  components: {
    CrumbsNav,
    OperationModal
  },
  data() {
    return {
      list: [],
      columns,
      crumbsArr,
      statusArr,
      ifArr,
      ruleForm: '',
      upDownStatue: true,
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
      searchForm: this.$form.createForm(this),
      title: '',
      visible: false,
      contentText: '',
      tempWorkerId: '',
      searchParams: {
        userName: '',
        phone: '',
        jobStatus: '',
        povertyStatus: ''
      },
      form: {
        userName: '',
        phone: '',
        payment: '',
        povertyStatus: 'Y'
      },
      validate: {
        userName: '',
        phone: '',
        payment: '',
        povertyStatus: ''
      },
      modalType: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取列表
    getList() {
      let postData = this.searchParams
      postData.pageNo = this.pagination.current
      postData.pageSize = this.pagination.pageSize
      this.loading = true
      getTempWorkerList(postData)
        .then(res => {
          this.loading = false
          if (res.success === 'Y') {
            this.list = (res.data && res.data.records) || []
            this.pagination.total = (res.data && res.data.total) || 0
          } else {
            this.$message.error(res.message)
          }
        })
        .catch((error) => {
          console.log(error)
          this.loading = false
        })
    },
    // 查询方法
    searchList() {
      this.searchForm.validateFields((err, values) => {
        this.searchParams.jobStatus = values.jobStatus
        this.searchParams.povertyStatus = values.povertyStatus
      })
      this.pagination.current = 1
      this.getList()
    },
    // 新增请求方法
    addRequest() {
      let flag = this.validateForm()
      if (flag) {
        addTempWorker(this.form)
          .then(res => {
            if (res.success === 'Y') {
              this.$message.success(res.message)
              this.closeModal()
              this.getList()
            } else {
              this.$message.error(res.message)
            }
          })
      }
    },
    // 编辑请求方法
    editRequest() {
      let flag = this.validateForm()
      if (flag) {
        editTempWorker(this.form)
          .then(res => {
            if (res.success === 'Y') {
              this.$message.success(res.message)
              this.closeModal()
              this.getList()
            } else {
              this.$message.error(res.message)
            }
          })
      }
    },
    // 删除请求方法
    deleteRequest() {
      delTempWorker(this.tempWorkerId)
        .then(res => {
          if (res.success === 'Y') {
            this.$message.success(res.message)
            this.closeModal()
          } else {
            this.$message.error(res.message)
          }
        })
    },
    // 修改在职状态
    handleChangeStatus(record) {
      let data = {
        tempWorkerId: record.tempWorkerId,
        jobStatus: record.jobStatus === 'NO_WORK' ? 'ON_WORK' : 'NO_WORK'
      }
      changeJobStatus(data)
        .then(res => {
          if (res.success === 'Y') {
            this.$message.success(res.message)
            this.getList()
          } else {
            this.$message.error(res.message)
          }
        })
    },
    // 控制模态框开关
    closeModal() {
      this.visible = false
      this.contentText = ''
      this.form = {
        userName: '',
        phone: '',
        payment: '',
        povertyStatus: 'Y'
      }
      this.validate = {
        userName: '',
        phone: '',
        payment: '',
        povertyStatus: ''
      }
    },
    // 点击新增
    handleAdd() {
      this.visible = true
      this.title = '新增临时工'
      this.modalType = 'add'
    },
    // 点击编辑
    handelEdit(record) {
      this.visible = true
      this.title = '编辑临时工'
      this.modalType = 'edit'
      this.form = {
        userName: record.userName,
        phone: record.phone,
        payment: record.payment,
        povertyStatus: record.povertyStatus,
        tempWorkerId: record.tempWorkerId
      }
    },
    // 点击删除
    handelDelete(record) {
      this.tempWorkerId = record.tempWorkerId
      this.visible = true
      this.title = '确定删除'
      this.contentText = '确定删除该临时工？'
      this.modalType = 'delete'
    },
    // 点击查看
    toDetail(record) {
      this.$router.push({
        name: 'TempWorkerDetail',
        query: { 'tempWorkerId': record.tempWorkerId }
      })
    },
    // 表单校验
    validateForm() {
      this.validate = {
        userName: '',
        phone: '',
        payment: '',
        povertyStatus: ''
      }
      let reg = new RegExp(/[^\u4E00-\u9FA5]/g, '')
      if (reg.test(this.form.userName || !this.form.userName.trim())) {
        this.form.userName = ''
        this.validate.userName = 'error'
      }
      if (!this.form.phone.trim()) {
        this.form.phone = ''
        this.validate.phone = 'error'
      }
      if (!(this.form.payment > 0)) {
        this.form.payment = ''
        this.validate.payment = 'error'
      }
      if (!this.form.povertyStatus) {
        this.validate.povertyStatus = 'error'
      }
      if (this.validate.userName || this.validate.phone || this.validate.payment || this.validate.povertyStatus) {
        return false
      } else {
        return true
      }
    },
    // 模态框确定
    handleOk() {
      switch (this.modalType) {
        case 'delete':
          this.deleteRequest()
          break
        case 'add':
          this.addRequest()
          break
        case 'edit':
          this.editRequest()
          break
      }
    },
    // 模态框取消
    handleCancel() {
      this.closeModal()
    },
    // 分页
    handleTableChange(pagination, filters, sorter) {
      this.pagination.current = pagination.current
      this.pagination.pageSize = pagination.pageSize
      let data = {
        pageNo: pagination.current,
        pageSize: pagination.pageSize,
        actionName: this.actionName,
        farmingNum: this.farmingNum,
        materialName: this.materialName,
        planCycleName: this.planCycleName
      }
      this.getList(data)
    },
    // 重置
    handleReset() {
      this.searchForm.resetFields()
      this.searchParams = {
        userName: '',
        phone: '',
        jobStatus: '',
        povertyStatus: ''
      }
      this.pagination.current = 1
      this.getList()
    }
  }
}
</script>
<style lang="less" scoped>
  .search-wrapper {
    padding: 24px;
    background: #fff;
    margin-bottom: 10px;
    border-radius: 4px;

    .ant-form-item {
      text-align: left;
    }

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

    .add-button {
      position: absolute;
      right: 24px;
    }
  }
</style>
