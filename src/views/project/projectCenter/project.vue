/**
方案中心列表页面
*/
<template>
  <div class="about">
    <div class="crumbCtr">
      <crumbsNav :crumbsArr="crumbsArr"></crumbsNav>
    </div>
    <a-layout>
      <a-layout-content style="margin: 16px">
        <div class="search-wrapper">
          <a-form :form="sreachFrom" @submit="handleSearchClick">
            <a-row>
              <a-col :span="8">
                <a-form-item label="方案名称" :label-col="{ span: 24 }" :wrapper-col="{ span: 20 }">
                  <a-input
                    autocomplete="off"
                    placeholder="请输入方案名称"
                    v-decorator="[
                      'solutionName',
                      { rules: [{ required: false, message: '' }] },
                    ]"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="产品品种" :label-col="{ span: 24 }" :wrapper-col="{ span: 20 }">
                  <a-input
                    autocomplete="off"
                    placeholder="请输入产品品种"
                    v-decorator="[
                      'breedName',
                      { rules: [{ required: false, message: '' }] },
                    ]"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="状态" :label-col="{ span: 24 }" :wrapper-col="{ span: 20 }">
                  <a-select
                    placeholder="请选择状态"
                    :allowClear="true"
                    class="search-input"
                    style="width: 100%"
                    v-decorator="[
                      'status',
                      { rules: [{ required: false, message: '' }] },
                    ]"
                  >
                    <a-select-option
                      v-for="(item) in statusArr"
                      :key="item.value"
                      :value="item.value"
                    >{{item.label}}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="方案权限" :label-col="{ span: 24 }" :wrapper-col="{ span: 20 }">
                  <a-select
                    placeholder="请选择方案权限"
                    :allowClear="true"
                    class="search-input"
                    style="width: 100%"
                    v-decorator="[
                      'solutionScope',
                      { rules: [{ required: false, message: '' }] },
                    ]"
                  >
                    <a-select-option
                      v-for="(item) in projectPowerArr"
                      :key="item.value"
                      :value="item.value"
                    >{{item.label}}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>

          <div>
            <a-button class="button" @click="rest">重置</a-button>
            <a-button type="primary" class="button" @click="handleSearchClick">查询</a-button>
          </div>
        </div>
        <div class="table-wrapper">
          <a-button type="primary" class="add-button">
            <router-link :to="{name: 'addNewProject'}">新增方案</router-link>
          </a-button>
          <div></div>
          <a-table
            :scroll="{ x: 1500 }"
            :columns="columns"
            :dataSource="list"
            :style="{marginTop: '50px'}"
            :pagination="pagination"
            @change="projectPageChange"
            :rowKey="record => record.greenhouseId"
          >
            <span slot="status" slot-scope="text, record">
              <a-switch
                checkedChildren="启用"
                unCheckedChildren="禁用"
                :checked="record.status === 'Y'"
                @change="statusChange(record)"
              />
            </span>
            <span slot="id" slot-scope="text, record, index">{{index + 1}}</span>
            <div class="action" slot="operation" slot-scope="record">
              <span class="actionSpan" @click="_publishTask(record)">
                <span>{{record.publishFlag === 'Y' ? '' : '发布'}}</span>
              </span>
              <span class="actionSpan" @click="_copyProject(record)">拷贝</span>
              <span>
                <router-link :to="{name: 'editProject', params: record}">编辑</router-link>
              </span>
              <span class="actionSpan" @click="openDelDialog(record)">删除</span>
              <span>
                <router-link :to="{name: 'projectDetail', params: record}">查看</router-link>
              </span>
            </div>
          </a-table>
        </div>
      </a-layout-content>
    </a-layout>
    <!--删除框-->
    <a-modal
      title="删除"
      :visible="delVisible"
      @ok="delHandleOk"
      :confirmLoading="delConfirmLoading"
      @cancel="delHandleCancel"
    >
      <p>是否删除该条方案？</p>
    </a-modal>
  </div>
</template>
<script>
import Vue from 'vue'
import crumbsNav from '@/components/crumbsNav/CrumbsNav'
import {
  projectList,
  copyProject,
  editProjectStatus,
  publishTask,
  delProjectTask
} from '@/api/projectCenter.js'
import domUtil from '../../../utils/domUtil'
import {
  Layout,
  Switch,
  Modal,
  Breadcrumb,
  Input,
  Row,
  Col,
  Cascader,
  Button,
  Table,
  Select,
  Form
} from 'ant-design-vue'

Vue.use(Layout)
Vue.use(Form)
Vue.use(Switch)
Vue.use(Select)
Vue.use(Modal)
Vue.use(Breadcrumb)
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)
Vue.use(Cascader)
Vue.use(Button)
Vue.use(Table)
export default {
  components: {
    crumbsNav
  },
  created () { },
  async mounted () {
    await this.getProjectList()
    console.log(this.list)
  },
  data () {
    return {
      sreachFrom: this.$form.createForm(this),
      crumbsArr: [
        { name: '当前位置', back: false, path: '' },
        { name: '生产管理', back: false, path: '' },
        { name: '方案中心', back: false, path: '' }
      ],
      searchParams: {
        status: '',
        solutionScope: '',
        solutionName: '',
        breedName: ''
      },
      projectPowerArr: [
        { value: 'market', label: '公开市场' },
        { value: 'company', label: '公司私有' }
      ],
      statusArr: [{ value: 'Y', label: '启用' }, { value: 'N', label: '禁用' }],
      list: [],
      delVisible: false,
      delConfirmLoading: false,
      solutionId: '',
      pagination: {
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30'],
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0,
        showTotal: total => `共 ${total} 条`
      },
      columns: [
        { title: '序号', scopedSlots: { customRender: 'id' }, align: 'center' },
        { title: '方案名称', dataIndex: 'solutionName', key: 'projectName' },
        { title: '产品品种', dataIndex: 'categoryName', key: 'categoryName' },
        {
          title: '专家姓名',
          dataIndex: 'solutionExpertName',
          key: 'solutionExpertName'
        },
        { title: '方案提供公司', dataIndex: 'companyName', key: 'companyName' },
        {
          title: '创建时间',
          dataIndex: 'gmtCreate',
          customRender: text => {
            return domUtil.formDate(text)
          }
        },
        {
          title: '周期时长',
          dataIndex: 'cycleTotalLength',
          key: 'cycleTotalLength',
          customRender: text => {
            return text
          }
        },
        {
          title: '方案状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' },
          key: 'status'
        },
        {
          title: '发布状态',
          dataIndex: 'publishFlag',
          key: 'publishFlag',
          customRender: text => {
            if (text === 'Y') {
              return '已发布'
            } else if (text === 'N') {
              return '未发布'
            }
          }
        },
        {
          title: '方案权限',
          dataIndex: 'solutionScope',
          key: 'solutionScope',
          customRender: text => {
            if (text === 'market') {
              return '公开市场'
            } else if (text === 'company') {
              return '公司私有'
            }
          }
        },
        {
          title: '操作',
          key: 'operation',
          scopedSlots: { customRender: 'operation' },
          width: 210,
          align: 'center',
          fixed: 'right'
        }
      ]
    }
  },
  methods: {
    handleSearchClick () {
      this.sreachFrom.validateFields((err, values) => {
        console.log(err)
        this.pagination.current = 1
        this.searchParams.solutionScope = values.solutionScope ? values.solutionScope : ''
        this.searchParams.status = values.status ? values.status : ''
        this.searchParams.solutionName = values.solutionName ? values.solutionName : ''
        this.searchParams.breedName = values.breedName ? values.breedName : ''
        this.getProjectList()
      })
    },
    // 分页栏页数改变
    projectPageChange (page) {
      this.pagination.pageSize = page.pageSize
      this.pagination.current = page.current
      this.getProjectList()
    },
    // 查询方案列表
    searchProjectList () {
      this.getProjectList()
    },
    // 拷贝方案
    _copyProject (record) {
      copyProject(record.solutionId).then(res => {
        if (res.success === 'Y') {
          this.getProjectList()
        }
      })
    },
    rest () {
      this.searchParams.breedName = ''
      this.searchParams.solutionScope = ''
      this.searchParams.status = ''
      this.searchParams.solutionName = ''
      this.sreachFrom.resetFields()
      this.getProjectList()
    },
    // 搜索栏状态改变
    searchStatusChange (value) {
      this.searchParams.status = value
    },
    // 搜索栏权限改变
    powerChange (value) {
      this.searchParams.solutionScope = value
    },
    // 删除方案
    delHandleOk () {
      this.delConfirmLoading = true
      delProjectTask(this.solutionId).then(res => {
        if (res.code === 200) {
          this.delVisible = false
          this.delConfirmLoading = false
          this.getProjectList()
        }
      })
    },
    delHandleCancel () {
      this.delVisible = false
    },
    openDelDialog (record) {
      this.delVisible = true
      this.solutionId = record.solutionId
    },
    _publishTask (record) {
      if (record.publishFlag === 'Y') {
        return
      }
      publishTask(record.solutionId).then(res => {
        if (res.code === 200) {
          this.getProjectList()
        }
      })
    },
    statusChange (record) {
      let projectStatus = ''
      projectStatus = record.status === 'Y' ? 'N' : 'Y'
      editProjectStatus(record.solutionId, projectStatus).then(res => {
        if (res.code === 200) {
          this.getProjectList()
        }
      })
      console.log(projectStatus)
    },
    getProjectList () {
      let postData = this.searchParams
      postData.pageNo = this.pagination.current
      postData.pageSize = this.pagination.pageSize
      projectList(postData).then(res => {
        let unit = ''
        for (let i = 0; i < res.data.records.length; i++) {
          if (res.data.records[i].cycleUnit === 3) {
            unit = '周'
          } else if (res.data.records[i].cycleUnit === 5) {
            unit = '天'
          }
          res.data.records[i].cycleTotalLength =
            res.data.records[i].cycleTotalLength + unit
        }
        this.list = res.data.records
        for (let i = 0; i < this.list.length; i++) {
          this.list[i].expertName = '张强'
        }
        this.pagination.total = res.data.total
      })
    },
    editProject (record) {
      this.$router.to({ name: 'productDetail', params: record })
    }
  }
}
</script>
<style lang="less" scoped>
.crumbCtr {
  height: 20px;
  line-height: 20px;
  margin-top: 20px;
  margin-left: 16px;
  text-align: left;
}
.actionSpan {
  color: #1890ff;
  background-color: transparent;
  cursor: pointer;
}
.search-title {
  color: #333;
  font-size: 14px;
  display: inline-block;
  line-height: 32px;
  margin-bottom: 30px;
  text-align: right;
}
.search-wrapper {
  padding: 24px;
  background: #fff;
  margin-bottom: 10px;
  height: 260px;
  border-radius: 4px;

  .search-input-wrapper {
    position: relative;
    margin-bottom: 24px;

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

  .action span {
    display: inline-block;
    width: 35px;
  }
}
</style>
