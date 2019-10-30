/**待采购管理*/
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
            @submit="sreachGetListwaitpurchase"
          >
            <a-row :gutter="40">
              <a-col :span="8">
                <a-form-item label="农资名称">
                  <a-input
                    autocomplete="off"
                    placeholder="请输入"
                    v-model="materialName"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="农事计划编号">
                  <a-input
                    autocomplete="off"
                    placeholder="请输入"
                    v-model="farmingNum"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="所属农事操作">
                  <a-input
                    autocomplete="off"
                    placeholder="请输入"
                    v-model="actionName"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="40" v-show="upDownStatue">
              <a-col :span="8">
                <a-form-item label="所属周期">
                  <a-input
                    autocomplete="off"
                    placeholder="请输入"
                    v-model="planCycleName"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
          <div>
            <a-button
              type="primary"
              class="button"
              @click="sreachGetListwaitpurchase"
            >查询</a-button>
            <a-button
              class="button"
              @click="handleReset"
            >重置</a-button>
            <a-button
              :style="{ marginLeft: '8px' }"
              @click="upDownStatue=!upDownStatue"
            >
              <a-icon :type="!upDownStatue ? 'down' : 'up'" />
              {{!upDownStatue ? '展开' : '收起'}}
            </a-button>
          </div>
        </div>
        <div class="table-wrapper">
          <div>
             <a-button type="primary" style="right: 130px;" class="add-button" @click="batchOperation('batchPurchase')">批量采购</a-button>
             <a-button type="primary" class="add-button" @click="batchOperation('batchDiscard')">批量废弃</a-button>
          </div>
          <a-table
            :columns="columns"
            :dataSource="list"
            :pagination="pagination"
            :loading="loading"
            @change="handleTableChange"
            :style="{marginTop: '50px'}"
            :rowKey="(record, index) => index"
            :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
          >
            <span
              slot="id"
              slot-scope="text, record, index"
            >{{index + 1}}</span>
            <span slot="materialDosage" slot-scope="text, record">
              {{record.materialDosage}}{{record.materialUnitName}}
            </span>
            <span slot="operation" slot-scope="text, record">
              <router-link :to="{name: 'TobePurchasedDateil', params: record}">
                <a-button type="link">查看</a-button>
              </router-link>
              <a-button type="link" @click="setStatus(record, 'Purchase')" style="padding:0;">采购</a-button>
              <a-button type="link" @click="setStatus(record, 'Discard')">废弃</a-button>
            </span>
          </a-table>
        </div>
      </a-layout-content>
    </a-layout>
    <!-- 确认框 -->
    <confirm-modal
    :title="title"
    :visible="visible"
    :bizId="bizId"
    :purchaseStatus="purchaseStatus"
    :contentText="contentText"
    :searchParam="searchParam"
    :isBatch="isBatch"
    @confirm="confirmModal"
    ></confirm-modal>
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
import ConfirmModal from './components/ConfirmModal.vue'
import {
  getListwaitpurchase
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
    CrumbsNav,
    ConfirmModal
  },
  data() {
    return {
      list: [],
      columns,
      crumbsArr,
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
      sreachForm: this.$form.createForm(this),
      title: '确认采购',
      visible: false,
      contentText: '确认采购农资？',
      selectedRowKeys: [],
      bizId: '',
      purchaseStatus: 0, // 废弃：1, 待采购：2, 采购中：3, 已采购：4
      searchParam: { // 批量操作
        bizList: [],
        purchaseStatus: 0
      },
      isBatch: false, // 是否是批量修改
      actionName: '',
      farmingNum: '',
      materialName: '',
      planCycleName: ''
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
      this.loading = true
      getListwaitpurchase(data)
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
    sreachGetListwaitpurchase() {
      let data = {
        pageNo: 1,
        pageSize: 10,
        actionName: this.actionName,
        farmingNum: this.farmingNum,
        materialName: this.materialName,
        planCycleName: this.planCycleName
      }
      this.getList(data)
    },
    // 修改单个状态
    setStatus (record, to) {
      this.bizId = record.bizId
      this.isBatch = false
      if (to === 'Purchase') {
        this.purchaseStatus = 3
        this.title = '确认采购'
        this.visible = true
        this.contentText = '确认采购农资？'
      } else {
        this.purchaseStatus = 1
        this.title = '确认废弃'
        this.visible = true
        this.contentText = '确认废弃农资？'
      }
    },
    // 模态确认
    confirmModal (isVisible) {
      this.visible = isVisible
    },
    // 多选
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.isBatch = true
      let bizList = selectedRows.map((item, index) => {
        return item.bizId
      })
      this.$set(this.searchParam, 'bizList', bizList)
    },
    // 批量操作
    batchOperation (to) {
      if (this.searchParam.bizList.length > 0) {
        if (to === 'batchPurchase') {
          this.$set(this.searchParam, 'purchaseStatus', 3)
          this.title = '确认采购'
          this.visible = true
          this.contentText = '确认批量采购农资？'
        } else {
          this.$set(this.searchParam, 'purchaseStatus', 1)
          this.title = '确认废弃'
          this.visible = true
          this.contentText = '确认批量废弃农资？'
        }
      } else {
        this.$message.error('请先选择农资！')
      }
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
      this.sreachForm.resetFields()
      this.actionName = ''
      this.farmingNum = ''
      this.materialName = ''
      this.planCycleName = ''
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
