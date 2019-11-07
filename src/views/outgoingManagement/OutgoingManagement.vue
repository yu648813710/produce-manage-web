/**
出库管理
*/
<template>
  <div class="about">
    <a-layout>
      <div style="padding-top: 16px;padding-left:16px;">
        <crumbs-nav :crumbs-arr="crumbsArr" />
      </div>
      <a-layout-content style="margin: 16px;margin-top:0;">
        <div class="search-wrapper">
          <a-form
            :form="sreachForm"
            @submit="sreachOutgoingManagement"
          >
            <a-row :gutter="40">
              <a-col :span="8">
                <a-form-item label="出库时间">
                  <a-date-picker
                  placeholder="请选择"
                  format="YYYY-MM-DD"
                  v-decorator="[
                      'deliveryTime',
                    ]"
                  @change="handleDateChange" style="width: 100%;"/>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="出库人">
                  <a-input
                    placeholder="请输入"
                    autocomplete="off"
                    v-model="userName"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="菌包名称">
                  <a-input
                    placeholder="请输入"
                    autocomplete="off"
                    v-model="fungusBagName"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
          <div>
            <a-button
              type="primary"
              class="button"
              @click="sreachOutgoingManagement"
            >查询</a-button>
            <a-button
              class="button"
              @click="handleReset"
            >重置</a-button>
          </div>
        </div>
        <div class="table-wrapper">
          <a-table
            :columns="columns"
            :dataSource="list"
            :pagination="pagination"
            :loading="loading"
            @change="handleTableChange"
            :rowKey="(record, index) => index"
          >
            <span
              slot="id"
              slot-scope="text, record, index"
            >{{index + 1}}</span>
            <!-- 时间戳转日期 -->
            <span
              slot="deliveryTime"
              slot-scope="text, record"
            >{{formDate(record.deliveryTime)}}</span>
          </a-table>
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>
<script>
import Vue from 'vue'
import CrumbsNav from '@/components/crumbsNav/CrumbsNav' // 面包屑
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
  DatePicker
} from 'ant-design-vue'
import {
  getOutgoingManagementList
} from '@/api/farmPlan.js'
import { columns, crumbsArr } from './config.js'
import domUtil from '@/utils/domUtil.js'
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
Vue.use(DatePicker)
export default {
  components: {
    CrumbsNav
  },
  data() {
    return {
      list: [],
      columns,
      crumbsArr,
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
      visible: false,
      deliveryTime: '', // 出库时间
      userName: '',
      fungusBagName: '', // 菌包
      sreachForm: this.$form.createForm(this)
    }
  },
  created() {
    // 获取列表
    let data = {
      pageNo: this.pagination.current,
      pageSize: this.pagination.pageSize
    }
    this.getList(data)
  },
  methods: {
    // 获取列表
    getList(data) {
      this.pagination.current = data.pageNo
      this.pagination.pageSize = data.pageSize
      this.loading = true
      getOutgoingManagementList(data)
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
    sreachOutgoingManagement() {
      let data = {
        pageNo: 1,
        pageSize: 10,
        deliveryTime: this.deliveryTime,
        userName: this.userName,
        fungusBagName: this.fungusBagName // 菌包名称
      }
      this.getList(data)
    },
    formDate(data) {
      return domUtil.formDate(data)
    },
    // 时间选择
    handleDateChange (e, test) {
      this.deliveryTime = test
    },
    // 分页
    handleTableChange(pagination, filters, sorter) {
      this.pagination.current = pagination.current
      this.pagination.pageSize = pagination.pageSize
      let data = {
        pageNo: pagination.current,
        pageSize: pagination.pageSize,
        deliveryTime: this.deliveryTime,
        userName: this.userName,
        fungusBagName: this.fungusBagName // 菌包ID
      }
      this.getList(data)
    },
    // 重置
    handleReset() {
      this.sreachForm.resetFields()
      this.deliveryTime = ''
      this.userName = ''
      this.fungusBagName = ''
      // 获取列表
      let data = {
        pageNo: 1,
        pageSize: 10
      }
      this.pagination.current = data.pageNo
      this.pagination.pageSize = data.pageSize
      this.getList(data)
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
