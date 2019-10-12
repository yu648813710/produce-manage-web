<template>
<div class="green_house">
  <a-breadcrumb style="text-align: left; height: 40px">
    <a-breadcrumb-item>当前位置：</a-breadcrumb-item>
    <a-breadcrumb-item>数据管理</a-breadcrumb-item>
    <a-breadcrumb-item>任务管理</a-breadcrumb-item>
  </a-breadcrumb>
  <div class="form">
    <!-- 搜索条件 -->
    <a-form  class="searchForm">
      <a-row :gutter="24">
        <!--          &lt;!&ndash; 基地名称 &ndash;&gt;-->
        <a-col :span="8">
          <a-form-item
            label="农事计划:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 24 }"
          >
            <a-select  placeholder="请选择农事计划">
              <!--                <a-select-option v-for="(item, index) in equipmentStatusList" :key="index" :value="item.id">{{item.name}}</a-select-option>-->
              <a-select-option value="china">
                China
              </a-select-option>
              <a-select-option value="usa">
                U.S.A
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <!--          &lt;!&ndash; 所属公司 &ndash;&gt;-->
        <a-col :span="8">
          <a-form-item
            label="农事类型:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 24 }"
          >
            <a-select  placeholder="请选择农事类型">
              <!--                <a-select-option v-for="(item, index) in equipmentStatusList" :key="index" :value="item.id">{{item.name}}</a-select-option>-->
              <a-select-option value="china">
                China
              </a-select-option>
              <a-select-option value="usa">
                U.S.A
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <!--          &lt;!&ndash; 负责人 &ndash;&gt;-->
        <a-col :span="8">
          <a-form-item
            label="所属地块:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 24 }"
          >
            <a-select  placeholder="请选择地块">
              <!--                <a-select-option v-for="(item, index) in equipmentStatusList" :key="index" :value="item.id">{{item.name}}</a-select-option>-->
              <a-select-option value="china">
                黎明
              </a-select-option>
              <a-select-option value="usa">
                王浩
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            label="产品周期:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 24 }"
          >
            <a-select  placeholder="请选择周期">
              <!--                <a-select-option v-for="(item, index) in equipmentStatusList" :key="index" :value="item.id">{{item.name}}</a-select-option>-->
              <a-select-option value="china">
                黎明
              </a-select-option>
              <a-select-option value="usa">
                王浩
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            label="状态:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 24 }"
          >
            <a-select  placeholder="请选择状态">
              <!--                <a-select-option v-for="(item, index) in equipmentStatusList" :key="index" :value="item.id">{{item.name}}</a-select-option>-->
              <a-select-option value="china">
                黎明
              </a-select-option>
              <a-select-option value="usa">
                王浩
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col
          :span="24"
          :style="{ textAlign: 'center' }"
        >
          <a-button
            type="primary"
            html-type="submit"
          >
            查询
          </a-button>
          <a-button
            :style="{ marginLeft: '8px' }"
          >
            重置
          </a-button>
          <a-button
            :style="{ marginLeft: '8px', fontSize: '12px' }"
          >
            <a-icon :type="true ? 'up' : 'down'" />收起
          </a-button>
        </a-col>
      </a-row>
    </a-form>
  </div>
  <div class="table">
    <!-- 任务管理表格 -->
    <div class="table-content">
      <a-locale-provider :locale="zhCN">
        <a-table
          class="equipmentTable"
          :scroll="{ x: 1500 }"
          :rowKey="record => record.greenhouseId"
          :columns="columns"
          :dataSource="equipmentList"
          :pagination='pagination'
          :loading="loading"
        >
          <span slot="id" slot-scope="text, record, index">{{index + 1}}</span>
          <span slot="action" slot-scope="text, record">
            <!-- 编辑 -->
              <span slot="title" style="color: #1890ff; cursor:pointer" @click="showModal(record)">编辑</span>
          </span>
        </a-table>
      </a-locale-provider>
    </div>
  </div>
<GreenHouseDetails ref="GreenHouse"></GreenHouseDetails>
</div>
</template>

<script>
import Vue from 'vue'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { Button, Breadcrumb, Form, Icon, Row, Input, Col, Table, Tooltip, Select, message, Modal, LocaleProvider } from 'ant-design-vue'
import { axios } from '../../utils/request'
import {taskManageList} from '@/api/productManage.js'
import GreenHouseDetails from './components/GreenHouseDetails'
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
    GreenHouseDetails
  },
  data () {
    return {
      visible: false,
      zhCN,
      // 搜索项表单
      searchForm: {
        baseName: '',
        userAccount: '',
        phoneNumber: ''
      },
      loading: false,
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
        { title: '农事计划编号', dataIndex: 'taskCode' },
        { title: '农事操作', dataIndex: 'farmAction' },
        { title: '农事类型', dataIndex: 'farmType' },
        { title: '所属地块', dataIndex: 'massifName' },
        { title: '产品周期', dataIndex: 'cycleName' },
        { title: '使用农资', dataIndex: 'productionName' },
        { title: '负责人', dataIndex: 'principalUser' },
        { title: '创建人', dataIndex: 'createUser' },
        { title: '状态',
          dataIndex: 'status',
          customRender: (text) => {
            if (text == 'n') { return '禁用中' } else if (text == 'y') { return '使用中' }
          } },
        { title: '操作', scopedSlots: { customRender: 'action' }, width: 160, align: 'center', fixed: 'right' }
      ],
      equipmentList: []

    }
  },
  methods: {
    showModal (record) {
      console.log(record)
    },
      getTaskManageList(){
        let postData = {
            page: this.pagination.current,
            pageSize: this.pagination.pageSize,
        }
          taskManageList(postData).then((res)=>{
              console.log(res)
          })
      },
  },
  mounted () {
    let self = this
    this.loading = false
    this.getTaskManageList();
  }
}
</script>

<style scoped>
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
</style>
