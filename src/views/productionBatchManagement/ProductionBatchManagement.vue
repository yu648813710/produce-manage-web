/**生产批次管理*/
<template>
  <div class="about">
    <a-layout style="margin: 10px 16px;">
      <crumbs-nav :crumbs-arr="crumbsArr" style="margin-bottom: 10px;"/>
      <a-layout-content>
        <div class="search-wrapper">
          <a-form
            :form="sreachForm"
            @submit="sreachProductionBatchManagement"
          >
            <a-row :gutter="40">
              <a-col :span="8">
                <a-form-item label="生产批次号" :colon="false">
                  <a-input
                    autocomplete="off"
                    placeholder="请输入生产批次号"
                    v-model="productionPatchCode"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="产品名称" :colon="false">
                  <a-input
                    autocomplete="off"
                    placeholder="请输入产品名称"
                    v-model="productName"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="采收人" :colon="false">
                  <a-input
                    autocomplete="off"
                    placeholder="请输入采收人"
                    v-model="harvester"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
          <div>
            <a-button
              type="primary"
              class="button"
              @click="sreachProductionBatchManagement"
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
  Form
} from 'ant-design-vue'
import {
  getProductionBatchList
} from '@/api/farmPlan.js'
import { columns, crumbsArr } from './config.js'
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
      sreachForm: this.$form.createForm(this),
      productionPatchCode: '',
      productName: '',
      harvester: ''
    }
  },
  created() {
    // 获取列表
    let data = {
      pageNo: 1,
      pageSize: 10
    }
    this.getList(data)
  },
  methods: {
    // 获取列表
    getList(data) {
      this.pagination.current = data.pageNo
      this.pagination.pageSize = data.pageSize
      this.loading = true
      getProductionBatchList(data)
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
    sreachProductionBatchManagement() {
      let data = {
        pageNo: 1,
        pageSize: 10,
        harvester: this.harvester,
        productName: this.productName,
        productionBatchCode: this.productionPatchCode // 菌包ID
      }
      this.getList(data)
    },
    // 分页
    handleTableChange(pagination, filters, sorter) {
      this.pagination.current = pagination.current
      this.pagination.pageSize = pagination.pageSize
      let data = {
        pageNo: pagination.current,
        pageSize: pagination.pageSize,
        harvester: this.harvester,
        productName: this.productName,
        productionBatchCode: this.productionPatchCode // 菌包ID
      }
      this.getList(data)
    },
    // 重置
    handleReset() {
      this.sreachForm.resetFields()
      this.harvester = ''
      this.productName = ''
      this.productionPatchCode = ''
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
