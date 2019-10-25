/*
地块监测列表
*/
<template>
  <div class="base">
    <a-breadcrumb style="text-align: left; height: 40px">
      <a-breadcrumb-item>当前位置：</a-breadcrumb-item>
      <a-breadcrumb-item>生产管理</a-breadcrumb-item>
      <a-breadcrumb-item>生长监测</a-breadcrumb-item>
      <a-breadcrumb-item>实时监测</a-breadcrumb-item>
    </a-breadcrumb>
    <div class="form">
      <!-- 搜索条件 -->
      <a-form class="searchForm">
        <a-row :gutter="24">
          <!--          &lt;!&ndash; 基地名称 &ndash;&gt;-->
          <a-col :span="8">
            <a-form-item
              label="地块名称:"
              :label-col="{ span: 24 }"
              :wrapper-col="{ span: 24 }"
            >
              <a-input
                autocomplete="off"
                v-model="searchForm.baseName"
                placeholder="请输入"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="table">
      <!-- 设备列表表格 -->
      <div class="table-content">
        <a-locale-provider :locale="zhCN">
          <a-table
            class="equipmentTable"
            :rowKey="record => record.id"
            :columns="columns"
            :dataSource="equipmentList"
            :pagination="pagination"
            :loading="loading"
          >
            <span
              slot="id"
              slot-scope="text, record, index"
            >{{index + 1}}</span>
            <span
              slot="action"
              slot-scope=""
            >
              <!-- 编辑 -->
              <span
                slot="title"
                style="color: #1890ff; cursor:pointer"
                @click="showModal"
              >编辑</span>
            </span>
          </a-table>
        </a-locale-provider>
      </div>
    </div>
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
import { warningList } from '@/api/productManage'
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
  name: 'BaseList',
  components: {},
  data() {
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
        total: 100,
        showTotal: total => `共 ${total} 条`
      },
      columns: [
        { title: '序号', scopedSlots: { customRender: 'id' }, align: 'center' },
        { title: '基地名称', dataIndex: 'baseLandName' },
        { title: '地块名称', dataIndex: 'blockLandName' },
        { title: '温度', dataIndex: 'temperature' },
        { title: '湿度', dataIndex: 'dampness' },
        {
          title: '状态',
          dataIndex: 'status',
          customRender: text => {
            if (text === 'abnormal') {
              return '异常的'
            } else {
              return '正常的'
            }
          }
        },
        { title: '异常原因', dataIndex: 'reason' }
      ],
      equipmentList: [],
      requestData: {},
      requestParam: {
        pageNo: 1,
        pageSize: 10,
        value: null
      }
    }
  },
  methods: {
    showModal() {
      this.visible = true
    },
    requestList() {
      warningList(this.requestParam).then(res => {
        this.requestData = res.data // 请求数据
        this.pagination.current = res.data.current // 当前页
        this.pagination.total = res.data.total // 总数
        this.equipmentList = res.data.records // 列表数据
      })
    }
  },
  mounted() {
    this.requestList()
  }
}
</script>

<style scoped>
.base {
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
