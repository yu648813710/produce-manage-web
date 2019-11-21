/** 菌包列表页面 */
<template>
  <div class="about">
    <a-layout>
      <a-layout-content style="margin: 16px">
        <!-- 导航 -->
        <crumbs-nav :crumbs-arr="crumbsArr" />
        <div class="search-wrapper">
          <div
            class="search-input-box"
            :style="downUpSearch ? 'height:86px' : ''"
          >
            <a-row :gutter="40">
              <a-col :span="8">
                <div class="search-input-wrapper">
                  <span class="search-title">农事计划编号</span>
                  <a-input
                    autocomplete="off"
                    placeholder="请输入农事计划编号"
                    class="search-input"
                    v-model="searchInputVal.farmingNum"
                  />
                </div>
              </a-col>
              <a-col :span="8">
                <div class="search-input-wrapper">
                  <span class="search-title">产品名称</span>
                  <a-input
                    autocomplete="off"
                    style="width: 100%"
                    placeholder="请输入产品名称"
                    class="search-input"
                    v-model="searchInputVal.productName"
                  />
                </div>
              </a-col>
              <a-col :span="8">
                <div class="search-input-wrapper">
                  <span class="search-title">所属基地</span>
                  <a-input
                    autocomplete="off"
                    style="width: 100%"
                    placeholder="请输入所属基地"
                    class="search-input"
                    v-model="searchInputVal.baseLandName"
                  />
                </div>
              </a-col>
            </a-row>
            <a-row :gutter="40">
              <a-col :span="8">
                <div class="search-input-wrapper">
                  <span class="search-title">所属地块</span>
                  <a-input
                    autocomplete="off"
                    placeholder="请输入所属地块"
                    class="search-input"
                    v-model="searchInputVal.blockLandName"
                  />
                </div>
              </a-col>
              <a-col :span="8">
                <div class="search-input-wrapper">
                  <span class="search-title">创建人</span>
                  <a-input
                    autocomplete="off"
                    style="width: 100%"
                    placeholder="请输入创建人"
                    class="search-input"
                    v-model="searchInputVal.createUserName"
                  />
                </div>
              </a-col>
              <a-col :span="8">
                <div class="search-input-wrapper">
                  <span class="search-title">种植方案</span>
                  <a-input
                    autocomplete="off"
                    style="width: 100%"
                    placeholder="请输入种植方案"
                    class="search-input"
                    v-model="searchInputVal.solutionPlanName"
                  />
                </div>
              </a-col>
            </a-row>
          </div>
          <div>
            <a-button type="primary" class="button" @click="searchFarmPlanList"
              >查询</a-button
            >
            <a-button class="button" @click="clearInputVal">重置</a-button>
            <a-button
              :style="{ marginLeft: '8px' }"
              @click="downUpSearch = !downUpSearch"
            >
              <a-icon :type="downUpSearch ? 'down' : 'up'" />
              {{ downUpSearch ? '展开' : '收起' }}
            </a-button>
          </div>
        </div>
        <div class="table-wrapper">
          <a-button type="primary" class="add-button">
            <router-link :to="{ name: 'addNewFarmPlan' }"
              >新增农事计划</router-link
            >
          </a-button>
          <a-table
            :columns="columns"
            :dataSource="list"
            :scroll="{ x: 1500 }"
            :style="{ marginTop: '50px' }"
            :loading="loading"
            :pagination="pagination"
            @change="setPageList"
            :rowKey="record => record.farmingPlanId"
          >
            <span slot="id" slot-scope="text, record, index">{{
              index + 1
            }}</span>
            <router-link
              slot="operation"
              slot-scope="text, record"
              :to="{
                name: 'farmPlanDetail',
                params: { id: record.farmingPlanId }
              }"
              >查看</router-link
            >
          </a-table>
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>
<script>
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
import CrumbsNav from '@/components/crumbsNav/CrumbsNav' // 面包屑
const list = []
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
  components: {
    CrumbsNav
  },
  created() {
    this.getFarmPlanList(this.pagination.current, this.pagination.pageSize)
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
          key: 'solutionName',
          width: 160
        },
        {
          title: '生长周期',
          dataIndex: 'cycleName',
          key: 'cycleName',
          width: 130
        },
        {
          title: '创建人',
          dataIndex: 'createUserName',
          key: 'createUserName',
          width: 130
        },
        {
          title: '计划开始时间',
          dataIndex: 'planStartTime',
          key: 'planStartTime',
          width: 140
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
      },
      searchInputVal: {
        baseLandName: '', // 基地名称
        blockLandName: '', // 地块名称
        createUserName: '', // 创建人姓名
        cycleName: '', // 周期名称
        farmingNum: '', // 农事计划编号
        productName: '', // 产品名称
        solutionPlanName: '' // 方案名称
      },
      downUpSearch: true,
      crumbsArr: [
        {
          name: '当前位置',
          back: false,
          path: ''
        },
        {
          name: '生产管理',
          back: false,
          path: ''
        },
        {
          name: '农事计划',
          back: false,
          path: ''
        }
      ]
    }
  },
  methods: {
    getFarmPlanList(current, pageSize) {
      let postData = {
        pageNo: current,
        pageSize: pageSize
      }
      postData = Object.assign(postData, this.searchInputVal)
      farmPlanList(postData).then(res => {
        if (res.code === 200) {
          this.list = res.data.records
          this.pagination.current = current
          this.pagination.total = res.data.total
          this.pagination.pageSize = pageSize
        }
      })
    },
    // 页码设置
    setPageList(e) {
      console.log(e)
      let current = e.current
      let pageSize = e.pageSize

      this.getFarmPlanList(current, pageSize)
    },
    // 重置搜索条件
    clearInputVal() {
      this.searchInputVal = {
        baseLandName: '', // 基地名称
        blockLandName: '', // 地块名称
        createUserName: '', // 创建人姓名
        cycleName: '', // 周期名称
        farmingNum: '', // 农事计划编号
        productName: '', // 产品名称
        solutionPlanName: '' // 方案名称
      }
      this.getFarmPlanList(this.pagination.current, this.pagination.pageSize)
    },
    // 搜索开始
    searchFarmPlanList() {
      this.pagination.current = 1
      this.getFarmPlanList(this.pagination.current, this.pagination.pageSize)
    }
  }
}
</script>
<style lang="less" scoped>
.search-wrapper {
  padding: 24px;
  background: #fff;
  margin-bottom: 10px;
  height: auto;
  overflow: hidden;
  border-radius: 4px;
  .search-input-box {
    height: auto;
    overflow: hidden;
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
