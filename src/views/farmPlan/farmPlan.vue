/**
菌包列表页面
*/
<template>
  <div class="about">
    <a-layout>
      <a-layout-content style="margin: 16px">
        <div class="search-wrapper">
          <a-row :gutter="40">
            <a-col :span="8">
              <div class="search-input-wrapper">
                <span class="search-title">地块名称</span>
                <a-input
                  placeholder="Basic usage"
                  class="search-input"
                />
              </div>
            </a-col>
            <a-col :span="8">
              <div class="search-input-wrapper">
                <span class="search-title">所属基地</span>
                <a-cascader
                  style="width: 100%"
                  placeholder="Select Address"
                  class="search-input"
                />
              </div>
            </a-col>
            <a-col :span="8">
              <div class="search-input-wrapper">
                <span class="search-title">负责人</span>
                <a-cascader
                  style="width: 100%"
                  placeholder="Select Address"
                  class="search-input"
                />
              </div>
            </a-col>
          </a-row>
          <div>
            <a-button class="button">重置</a-button>
            <a-button
              type="primary"
              class="button"
            >查询</a-button>
          </div>
        </div>
        <div class="table-wrapper">
          <a-button
            type="primary"
            class="add-button"
          >
            <router-link :to="{name: 'addNewFarmPlan'}">新增农事计划</router-link>
          </a-button>
          <a-table
            :columns="columns"
            :dataSource="list"
            :style="{marginTop: '50px'}"
            :loading="loading"
            :pagination="pagination"
            rowKey="farmingNum"
          >
            <span
              slot="id"
              slot-scope="text, record, index"
            >{{index + 1}}</span>
            <router-link
              slot="operation"
              slot-scope="text, record"
              :to="{name: 'farmPlanDetail', params: { id: record.farmingPlanId}}"
            >查看</router-link>
          </a-table>
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>
<script>
const list = []
import Vue from 'vue'
import { farmPlanList } from '@/api/farmPlan.js'
import {
  Layout,
  Breadcrumb,
  Input,
  Row,
  Col,
  Icon,
  Cascader,
  Button,
  Table
} from 'ant-design-vue'
Vue.use(Layout)
Vue.use(Breadcrumb)
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)
Vue.use(Icon)
Vue.use(Cascader)
Vue.use(Button)
Vue.use(Table)
export default {
  component: {
    // 'a-button': Button
  },
  created() {
    this.getFarmPlanList()
  },
  data() {
    return {
      list,
      columns: [
        {
          title: '农事编号',
          dataIndex: 'farmingNum',
          key: 'farmingNum'
        },

        {
          title: '产品名称',
          dataIndex: 'productValue.productName',
          key: 'productName'
        },
        {
          title: '所属基地',
          dataIndex: 'baseLandValue.baseLandName',
          key: 'baseLandName'
        },
        {
          title: '所属地块',
          dataIndex: 'blockLandValue.landName',
          key: 'landName'
        },
        {
          title: '种植方案',
          dataIndex: 'solutionValue.solutionName',
          key: 'solutionName'
        },
        { title: '生长周期', dataIndex: 'cycleName', key: 'cycleName' },
        { title: '创建人', dataIndex: 'createUserName', key: 'createUserName' },
        {
          title: '计划开始时间',
          dataIndex: 'planStartTime',
          key: 'planStartTime'
        },
        {
          title: '操作',
          key: 'operation',
          scopedSlots: { customRender: 'operation' },
          width: 160,
          align: 'center',
          fixed: 'right'
        }
      ],
      loading: false,
      pagination: {
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30'],
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0,
        showTotal: total => `共 ${total} 条`
      }
    }
  },
  methods: {
    getFarmPlanList() {
      let postData = {
        pageNo: this.pagination.current,
        pageSize: this.pagination.pageSize
      }
      farmPlanList(postData).then(res => {
        this.list = res.data.records
        console.log(this.list)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.search-wrapper {
  padding: 24px;
  background: #fff;
  margin-bottom: 10px;
  height: 168px;
  border-radius: 4px;

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
