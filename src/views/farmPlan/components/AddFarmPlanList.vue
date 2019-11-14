<template>
  <div v-if="equipmentList.length" class="green_house">
    <div class="table">
      <!-- 任务管理表格 -->
      <div class="table-content">
        <a-locale-provider :locale="zhCN">
          <a-table
            class="equipmentTable"
            :scroll="{ x: 1320 }"
            :rowKey="record => record.instId"
            :columns="columns"
            :dataSource="equipmentList"
            :loading="loading"
            :pagination="false"
          >
            <span slot="id" slot-scope="text, record, index">{{index + 1}}</span>
            <span slot="useMatetial" class="use-material" slot-scope="text" :title="text">{{text}}</span>
            <span slot="action" slot-scope="text, record" class="operation-box">
              <span slot="title" @click="showDetailTask(record.instId)">查看</span>
              <span slot="title" @click="editTaskShow(record.instId)">编辑</span>
              <span
                slot="title"
                v-if="record.scope!=='public'"
                @click="showDeleteModal(record.instId)"
              >删除</span>
            </span>
          </a-table>
        </a-locale-provider>
      </div>
    </div>
    <!-- 删除弹框 -->
    <a-modal
      title="提示"
      :visible="deleteShow"
      @ok="deleteTask"
      @cancel="hiddenDeleteModal"
      :width="450"
    >
      <p>确认删除此条任务？</p>
    </a-modal>
    <!-- 删除弹框 -->
    <!-- 详情弹框 -->
    <task-detail
      :detail-show="detailTaskShow"
      :detail-data="detailTaskData"
      @hiddenDetailTask="hiddenDetailTask"
    />
    <!-- 详情弹框 -->
    <!-- 编辑弹框 -->
    <edit-task
      :edit-show="editTaskShowState"
      :detail-page-data="detailTaskData"
      :material-data="materialData"
      :util-data="utilData"
      @hiddenEditTask="editTaskHidden"
      @editSbumit="editSbumit"
    />
    <!-- 编辑弹框 -->
  </div>
</template>

<script>
import Vue from 'vue'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { Form, message, Table, Modal } from 'ant-design-vue'
import {
  deleteTemTask,
  getTaskTemDetail,
  getMaterial,
  getUtil
} from '@/api/productManage.js'
import {
  getFarmplanSolutionTaskList,
  editFarmplanSolutionTaskList
} from '@/api/farmPlan.js'
import { tableColumns } from './../config'
import TaskDetail from './TaskDetail'
import EditTask from './EditTask'
Vue.use(Form)
Vue.use(Table)
Vue.use(Modal)
Vue.prototype.$message = message
export default {
  name: 'GreenHouseList',
  components: {
    TaskDetail,
    EditTask
  },
  data() {
    return {
      deleteShow: false,
      zhCN,
      loading: false,
      columns: tableColumns,
      equipmentList: [],
      taskID: '',
      detailTaskShow: false,
      detailTaskData: {},
      editTaskShowState: false,
      materialData: [],
      utilData: []
    }
  },
  props: {
    queryTaskData: {
      type: Object,
      default() {
        return {
          planStartTime: '', // 计划开始日期
          solutionId: '', // 方案id
          tempPlanId: '', // 页面生成的唯一id
          changeFlag: 'Y'
        }
      },
      required: true
    }
  },
  watch: {
    queryTaskData: {
      handler(newVal) {
        console.log(newVal)
        if (newVal.planStartTime && newVal.solutionId && newVal.tempPlanId) {
          this.getTaskManageList(newVal)
        }
      },
      deep: true
    }
  },
  methods: {
    showDeleteModal(id) {
      this.taskID = id
      this.deleteShow = true
    },
    hiddenDeleteModal() {
      this.deleteShow = false
    },
    // 获取任务列表
    getTaskManageList(query) {
      let queryData_ = query
      getFarmplanSolutionTaskList(queryData_).then(res => {
        if (!(res && res.success)) {
          return false
        }
        if (res.success === 'Y') {
          this.equipmentList = res.data
        }
      })
    },
    // 删除任务
    deleteTask() {
      deleteTemTask(this.taskID, this.queryTaskData.tempPlanId).then(res => {
        if (!(res && res.success)) {
          return false
        }
        if (res.success !== 'Y') {
          return false
        }
        this.hiddenDeleteModal()
        this.tipMessage(res.success, res.message)
        this.$emit('changeQueryTaskData')
        this.getTaskManageList(this.queryTaskData)
      })
    },
    // 请求详情数据
    getTaskDetailData(id) {
      getTaskTemDetail(id, this.queryTaskData.tempPlanId).then(res => {
        if (!(res && res.success)) {
          return false
        }
        if (res.success === 'Y') {
          this.detailTaskData = res.data
        }
      })
    },
    // 显示详情
    showDetailTask(id) {
      this.detailTaskShow = true
      this.$nextTick(() => {
        this.getTaskDetailData(id)
      })
    },
    hiddenDetailTask() {
      this.detailTaskShow = false
    },
    // 提示信息
    tipMessage(type, message) {
      if (type === 'Y') {
        this.$message.success(message)
        return false
      }
      this.$message.error(message)
    },
    // 点击修改
    editTaskShow(id) {
      this.editTaskShowState = true
      getTaskTemDetail(id, this.queryTaskData.tempPlanId).then(res => {
        if (!(res && res.success)) {
          return false
        }
        if (res.success === 'Y') {
          this.detailTaskData = res.data
        }
      })
    },
    // 隐藏编辑
    editTaskHidden() {
      this.editTaskShowState = false
    },
    // 请求单位
    getUtilData() {
      getUtil().then(res => {
        if (!(res && res.success)) {
          return false
        }
        if (res.success !== 'Y') {
          return false
        }
        this.utilData = res.data
      })
    },
    // 请求农资
    getMaterialData() {
      getMaterial().then(res => {
        if (!(res && res.success)) {
          return false
        }
        if (res.success !== 'Y') {
          return false
        }
        this.materialData = res.data
      })
    },
    // 提交编辑
    editSbumit(e) {
      e.planStartTime = this.queryTaskData.planStartTime
      e.planId = this.queryTaskData.tempPlanId
      editFarmplanSolutionTaskList(e).then(res => {
        if (!(res && res.success)) {
          return false
        }
        this.tipMessage(res.success, res.message)
        if (res.success === 'Y') {
          this.$emit('changeQueryTaskData')
          this.editTaskHidden() // 隐藏弹窗
          this.getTaskManageList(this.queryTaskData)
        }
      })
    }
  },
  created() {
    this.loading = false
    this.getUtilData()
    this.getMaterialData()
  }
}
</script>

<style lang="less" scoped>
.green_house {
  padding: 0 20px;
}
.form {
  background-color: white;
  padding: 27px 15px 21px 15px;
}
.table {
  border-radius: 4px;
  padding: 20px 16px 24px 16px;
  background-color: white;
  margin-top: 12px;
}
.operation-box {
  span {
    cursor: pointer;
    margin-right: 5px;
    color: #1890ff;
  }
}
.use-material {
  width: 140px;
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
