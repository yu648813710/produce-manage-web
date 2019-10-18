<template>
  <div class="green_house">
    <!-- 导航 -->
    <crumbs-nav :crumbs-arr="crumbsArr" />
    <!-- 导航 -->
    <!-- 搜索组件 -->
    <search-form
      :select-data="selectStateData"
      @searchTask="searchTask"
      @clearSearch="clearSearch"
    ></search-form>
    <!-- 搜索组件 -->
    <div class="table">
      <!-- 任务管理表格 -->
      <div class="table-content">
        <a-locale-provider :locale="zhCN">
          <a-table
            class="equipmentTable"
            :scroll="{ x: 1500 }"
            :rowKey="record => record.instId"
            :columns="columns"
            :dataSource="equipmentList"
            :pagination="pagination"
            :loading="loading"
            @change="setPageList"
          >
            <span
              slot="id"
              slot-scope="text, record, index"
            >{{index + 1}}</span>
            <span
              slot="action"
              slot-scope="text, record"
              class="operation-box"
            >
              <span
                slot="title"
                @click="getTaskDetailData(record.instId)"
              >查看</span>
              <span
                slot="title"
                @click="showModal(record)"
              >编辑</span>
              <span
                slot="title"
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
    <!-- 编辑弹框 -->
  </div>
</template>

<script>
import Vue from 'vue'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import {
  Button,
  Breadcrumb,
  Form,
  Icon,
  Row,
  Input,
  Col,
  Table,
  Tooltip,
  Select,
  message,
  Modal,
  LocaleProvider
} from 'ant-design-vue'
import {
  taskManageList,
  getTaskState,
  deleteTask,
  getTaskDetail
} from '@/api/productManage.js'
import { tableColumns, crumbsArr } from './config'
import SearchForm from './components/SearchForm'
import TaskDetail from './components/TaskDetail'
import CrumbsNav from '@/components/crumbsNav/CrumbsNav'
// const confirm = Modal.confirm
Vue.use(Form)
Vue.use(Button)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Input)
Vue.use(Col)
Vue.use(Table)
Vue.use(Select)
Vue.use(Tooltip)
Vue.use(Modal)
Vue.use(Breadcrumb)
Vue.use(LocaleProvider)
Vue.prototype.$message = message
export default {
  name: 'GreenHouseList',
  components: {
    SearchForm,
    CrumbsNav,
    TaskDetail
  },
  data() {
    return {
      deleteShow: false,
      zhCN,
      loading: false,
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
      columns: tableColumns,
      equipmentList: [],
      selectStateData: [],
      taskID: '',
      detailTaskShow: false,
      detailTaskData: {}
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
    getTaskManageList(current, pageSize, queryData) {
      let queryData_ = queryData
        ? queryData
        : {
            actionName: '', // 操作名称
            blockLandName: '', // 地块名称
            cycleName: '', // 周期名称
            farmingNum: '', // 农事编号
            farmingTypeName: '', // 农事类型名称
            taskStatus: '' // 任务状态
          }
      let postData = {
        page: current,
        pageSize: pageSize
      }
      postData = Object.assign(postData, queryData_)
      taskManageList(postData).then(res => {
        if (res.code === 200) {
          this.equipmentList = res.data.records
          this.pagination.pageNo = current
          this.pagination.pageSize = pageSize
        }
      })
    },
    // 获取选择状态
    getTaskStateData() {
      getTaskState().then(res => {
        if (res.code === 200) {
          this.selectStateData = res.data
        }
      })
    },
    // 删除任务
    deleteTask() {
      deleteTask(this.taskID).then(res => {
        if (res.code !== 200) {
          return false
        }
        this.hiddenDeleteModal()
        this.tipMessage(res.success, res.message)
        this.getTaskManageList(
          this.pagination.current,
          this.pagination.pageSize
        )
      })
    },
    // 页码设置
    setPageList(e) {
      let current = e.current
      let pageSize = e.pageSize

      this.getTaskManageList(current, pageSize)
    },
    // 搜索任务
    searchTask(e) {
      this.getTaskManageList(
        this.pagination.current,
        this.pagination.pageSize,
        e
      )
    },
    // 清楚搜索条件
    clearSearch(e) {
      this.getTaskManageList(this.pagination.current, this.pagination.pageSize)
    },
    // 请求详情数据
    getTaskDetailData(id) {
      this.detailTaskShow = true
      getTaskDetail(id).then(res => {
        if (res.code === 200) {
          this.detailTaskData = res.data
        }
        console.log(res)
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
    }
  },
  created() {
    let self = this
    this.loading = false
    this.getTaskManageList(this.pagination.current, this.pagination.pageSize)
    this.getTaskStateData()
  }
}
</script>

<style lang="less" scoped>
.green_house {
  padding: 20px;
}
.form {
  background-color: white;
  padding: 27px 15px 21px 15px;
}
.table {
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
</style>
