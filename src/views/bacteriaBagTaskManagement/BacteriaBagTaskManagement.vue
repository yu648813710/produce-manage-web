/**菌包任务管理 */
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
            @submit="sreachTaskItem"
          >
            <a-row :gutter="40">
              <a-col :span="8">
                <a-form-item label="所属车间">
                  <a-select
                    placeholder="请选择"
                    :allowClear="true"
                    style="width: 100%;"
                    v-decorator="[
                      'workshopId', {},
                    ]"
                  >
                    <a-select-option v-for="item in workshopArr" :key="item.workshopId" :value="item.workshopId">{{item.workshopName}}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="日期范围">
                  <a-range-picker
                    @change="handleDateChange"
                    v-decorator="[
                      'time', {},
                    ]"
                    style="width: 100%;"
                    format="YYYY-MM-DD"
                  />
                  <!--  -->
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="菌包名称">
                  <a-select
                    placeholder="请选择"
                    :allowClear="true"
                    style="width: 100%;"
                    v-decorator="[
                      'fungusProduceId',{},
                    ]"
                  >
                    <a-select-option v-for="item in fungusBagArr" :key="item.bizId" :value="item.bizId">{{item.fungusProduceName}}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
          <div>
            <a-button
              type="primary"
              class="button"
              @click="sreachTaskItem"
            >查询</a-button>
            <a-button
              class="button"
              @click="handleReset"
            >重置</a-button>
          </div>
        </div>
        <div class="table-wrapper">
          <a-button
            type="primary"
            class="add-button"
          ><router-link :to="{name: 'AddBacteriaBagTask'}">新增任务</router-link></a-button>
          <a-table
            :columns="columns"
            :dataSource="list"
            :pagination="pagination"
            :loading="loading"
             :scroll="{ x: 1200 }"
            @change="handleTableChange"
            :style="{marginTop: '50px'}"
            :rowKey="(record, index) => index"
          >
            <span slot="id" slot-scope="text, record, index">{{index + 1}}</span>
            <span slot="workshopName" class="tableLineCtr" slot-scope="text, record" :title="record.workshopName">
              {{record.workshopName}}
            </span>
            <span slot="fungusProduceName" class="tableLineCtr" slot-scope="text, record" :title="record.fungusProduceName">
              {{record.fungusProduceName}}
            </span>
            <span slot="operation" slot-scope="text, record">
              <!-- 未开始支持编辑 -->
              <a-button type="link" @click="editTask(record.bizId)" v-if="Number(record.taskStatus) === 1">编辑</a-button>
              <a-button type="link" style="padding:0;" @click="handleOpenDatell(record.bizId)">查看</a-button>
              <!-- 未开始与已完成支持编辑 -->
              <a-button type="link" @click="handleDeleteChange(record.bizId)" v-if="Number(record.taskStatus) === 1 || Number(record.taskStatus) === 4">删除</a-button>
            </span>
          </a-table>
        </div>
      </a-layout-content>
    </a-layout>
    <!-- 删除确认框 -->
    <a-modal
      title="删除任务"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <p>是否删除此任务信息？</p>
    </a-modal>
  </div>
</template>
<script>
import Vue from 'vue'
import {
  workshopList,
  fungusproduceList,
  getBacteriaBagTask,
  deleteFungusTask
} from '@/api/farmPlan.js'
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
import CrumbsNav from '@/components/crumbsNav/CrumbsNav' // 面包屑
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
Vue.use(DatePicker)
export default {
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
      workshopId: '',
      workshopArr: [],
      startTime: '',
      endTime: '',
      fungusBagArr: [],
      fungusProduceId: '',
      deleteBizId: ''
    }
  },
  components: {
    CrumbsNav
  },
  created() {
    // 获取车间名称
    this.getListUsable()
    // 获取菌包名称
    this.getAllName()
    let data = {
      pageNo: this.pagination.current,
      pageSize: this.pagination.pageSize
    }
    this.getList(data)
  },
  methods: {
    // 获取车间名称
    getListUsable () {
      workshopList()
        .then(res => {
          if (res.success === 'Y') {
            this.workshopArr = res.data || []
          } else {
            this.$message.error(res.message)
          }
        })
    },
    // 时间选择
    handleDateChange (e, test) {
      const [startTime, endTime] = test
      this.startTime = startTime
      this.endTime = endTime
    },
    // 获取菌包名称
    getAllName () {
      fungusproduceList()
        .then(res => {
          if (res.success === 'Y') {
            this.fungusBagArr = res.data || []
          } else {
            this.$message.error(res.message)
          }
        })
    },
    // 获取列表
    getList(data) {
      this.pagination.current = data.pageNo
      this.pagination.pageSize = data.pageSize
      this.loading = true
      getBacteriaBagTask(data)
        .then(res => {
          if (res.success === 'Y') {
            this.list = (res.data && res.data.records) || []
            this.pagination.total = (res.data && res.data.total) || 0
          } else {
            this.$message.error(res.message)
          }
          this.loading = false
        })
        .catch(error => {
          console.log(error)
          this.loading = false
        })
    },
    // 查询方法
    sreachTaskItem(e) {
      this.sreachForm.validateFields((err, values) => {
        console.log(err)
        this.workshopId = values.workshopId
        this.fungusProduceId = values.fungusProduceId
      })
      this.loading = true
      let data = {
        pageNo: this.pagination.current,
        pageSize: this.pagination.pageSize,
        workshopId: this.workshopId,
        startTime: this.startTime,
        endTime: this.endTime,
        fungusProduceId: this.fungusProduceId
      }
      this.getList(data)
    },
    // 编辑任务
    editTask (bizId) {
      this.$router.push({
        name: 'AddBacteriaBagTask',
        query: { 'bizId': bizId }
      })
    },
    // 查看详情
    handleOpenDatell (bizId) {
      this.$router.push({
        name: 'BacteriaBagTaskDateil',
        query: { 'bizId': bizId }
      })
    },
    // 分页
    handleTableChange(pagination, filters, sorter) {
      this.pagination.current = pagination.current
      this.pagination.pageSize = pagination.pageSize
      let data = {
        pageNo: this.pagination.current,
        pageSize: this.pagination.pageSize,
        workshopId: this.workshopId,
        startTime: this.startTime,
        endTime: this.endTime,
        fungusProduceId: this.fungusProduceId
      }
      this.getList(data)
    },
    // 删除出现确认框
    handleDeleteChange (bizId) {
      if (bizId) {
        this.deleteBizId = bizId
        this.visible = true
      }
    },
    // 确认删除
    handleOk() {
      deleteFungusTask(this.deleteBizId)
        .then(res => {
          this.visible = false
          if (res.success === 'Y') {
            let data = {
              pageNo: 1,
              pageSize: 10
            }
            this.getList(data)
          } else {
            this.$message.error(res.message)
          }
        })
    },
    handleCancel() {
      this.visible = false
    },
    // 重置
    handleReset() {
      this.sreachForm.resetFields()
      this.workshopId = ''
      this.startTime = ''
      this.endTime = ''
      this.fungusProduceId = ''
      // 重新获取一遍列表
      this.pagination.current = 1
      this.pagination.pageSize = 10
      let data = {
        pageNo: 1,
        pageSize: 10
      }
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
.tableLineCtr {
  display: inline-block;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
