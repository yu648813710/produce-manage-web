/**
地块预警规则列表
 */
<template>
  <div class="rule-list">
    <!-- 导航 -->
    <crumbs-nav :crumbs-arr="crumbsArr" />
    <!-- 搜索 -->
    <div class="search-wrapper" style="margin-bottom: 16px;">
      <a-form :form="sreachForm">
        <a-row :gutter="40">
          <a-col :span="8">
            <a-form-item label="车间名称">
              <a-input
                placeholder="请输入"
                v-decorator="[
                  'inputContent',
                  { rules: [{ required: false, message: '' }] },
                ]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="负责人">
              <a-select placeholder="请选择"
                :allowClear="true"
                style="width: 400px;"
                v-decorator="[
                  'userId',
                  {
                    rules: [
                      {
                        required: false,
                        message: '',
                      }
                    ],
                  },
                ]"
                >
                <a-select-option v-for="item in lerderUser" :key="item.userId" :value="item.userId">
                  {{item.userName}}
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
          @click="getSearchWarningList"
        >查询</a-button>
        <a-button class="button" @click="handleReset">重置</a-button>
      </div>
    </div>
    <!-- 表格 -->
    <div class="table-wrapper">
      <a-button type="primary" class="add-button" @click="handleAddClick">新增预警</a-button>
      <!-- 任务管理表格 -->
      <a-table
        :columns="tableColumns"
        :dataSource="list"
        :pagination="pagination"
        :loading="loading"
        :style="{marginTop: '50px'}"
        @change="setPageList"
      >
        <span
          slot="id"
          slot-scope="text, record, index"
        >{{index + 1}}</span>
        <span slot="temperatureSup" slot-scope="text">
          <!-- {{text}} -->
          <span>温度{{text.temperatureInf}}-{{text.temperatureSup}}℃、</span>
          <span>湿度{{text.dampnessInf}}-{{text.dampnessSup}}%、</span>
          <span>二氧化碳浓度{{text.co2ConcentrationInf}}ppm-{{text.co2ConcentrationSup}}ppm</span>
        </span>
        <span
          slot="operation"
          slot-scope="text"
        >
          <a-button
            type="link"
            @click="editTaskShow(text)"
          >编辑</a-button>
          <a-button
            type="link"
            @click="showDeleteModal(text)"
          >删除</a-button>
        </span>
      </a-table>
    </div>
    <!-- 新建编辑模态框 -->
    <rulelist-editmodal
    v-if="visible"
    :title="modalTitle"
    :visible="visible"
    :isEdit="isEdit"
    :dataEdit="dataEdit"
    :width="800"
    @cancel="handleAddCancel"
    ></rulelist-editmodal>
    <!-- 删除 -->
    <a-modal
			title="删除预警规则"
			:visible="visibleDelete"
			@ok="handleDelOk"
			@cancel="handleDelCancel"
			>
			<p>是否删除此预警规则信息？</p>
		</a-modal>
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
import CrumbsNav from '@/components/crumbsNav/CrumbsNav' // 面包屑
import RulelistEditmodal from './components/RulelistEditmodal.vue' // 面包屑
import { tableColumns, crumbsArr } from './config'
import { searchWarningList, getListPrincipalUserByCompanyId, removeWarning } from '@/api/farmPlan.js'

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
  name: 'RuleList',
  components: {
    CrumbsNav,
    RulelistEditmodal
  },
  data () {
    return {
      zhCN,
      loading: false,
      crumbsArr,
      tableColumns,
      lerderUser: [], // 负责人
      list: [],
      pagination: {
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30'],
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0,
        showTotal: total => `共 ${total} 条`
      },
      sreachForm: this.$form.createForm(this),
      modalTitle: '新建预警',
      visible: false,
      dataEdit: {},
      isEdit: false,
      visibleDelete: false,
      blockLandId: ''
    }
  },
  created () {
    // 获取列表
    let data = {
      inputContent: '',
      principalUser: '',
      pageNo: 1,
      pageSize: 10
    }
    this.getTableList(data)
    // 获取负责人
    this.getListPrincipalUserByCompanyId()
  },
  methods: {
    // 获取列表
    getTableList (data) {
      this.loading = true
      searchWarningList(data)
        .then(res => {
          this.loading = false
          if (res.success === 'Y') {
            this.list = res.data && res.data.records
            this.pagination = {
              total: res.data.total
            }
          } else {
            this.$message.error(res.message)
          }
        })
        .catch(() => {
          this.$message.error('请求超时')
          this.loading = false
        })
    },
    // 获取负责人
    getListPrincipalUserByCompanyId () {
      getListPrincipalUserByCompanyId()
        .then(res => {
          if (res.success === 'Y') {
            this.lerderUser = res.data
          } else {
            this.$message.error(res.message)
          }
        })
    },
    // 搜索查询方法
    getSearchWarningList () {
      this.sreachForm.validateFields((err, value) => {
        console.log(err)
        // 查询方法
        let data = {
          inputContent: value.inputContent,
          principalUser: value.userId,
          pageNo: 1,
          pageSize: 10
        }
        this.getTableList(data)
      })
    },
    // 新增预警
    handleAddClick () {
      this.visible = true
      this.isEdit = false
      this.modalTitle = '新建预警'
    },
    // 分页点击事件
    setPageList (pagination, filters, sorter) {
      if (pagination.current > 0) {
        // 查询方法
        let data = {
          inputContent: '',
          principalUser: '',
          pageNo: pagination.current,
          pageSize: pagination.pageSize
        }
        this.getTableList(data)
      }
    },
    // 编辑
    editTaskShow (data) {
      this.isEdit = true
      this.modalTitle = '编辑预警规则'
      this.dataEdit = data
      this.visible = true
    },
    // 删除
    showDeleteModal (text) {
      this.visibleDelete = true
      if (text.blockLandId) {
        this.blockLandId = text.blockLandId
      }
    },
    // 重置
    handleReset () {
      this.sreachForm.resetFields()
      // 查询方法
      let data = {
        inputContent: '',
        principalUser: '',
        pageNo: 1,
        pageSize: 10
      }
      this.getTableList(data)
    },
    // 取消
    handleAddCancel (val) {
      this.visible = val
    },
    // 删除确认
    handleDelOk () {
      if (this.blockLandId) {
        removeWarning(this.blockLandId)
          .then(res => {
            console.log(res)
            this.visibleDelete = false
            if (res.success === 'Y') {
              let data = {
                inputContent: '',
                principalUser: '',
                pageNo: 1,
                pageSize: 10
              }
              this.getTableList(data)
            }
            this.$message.success(res.message)
          })
      } else {
        this.$message.error('预警规则ID为空')
      }
    },
    // 删除取消
    handleDelCancel () {
      this.visibleDelete = false
    }
  }
}
</script>

<style lang="less" scoped>
.rule-list{
  padding: 20px;
  .search-wrapper{
    border-radius: 4px;
    background-color: white;
    padding: 27px 15px 21px 15px;
    .ant-form-item{
      text-align: left;
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
}
</style>
