/**
周期信息详情页面
*/
<template>
  <div class="wrapper">
    <crumbsNav :crumbsArr="crumbsArr" style="margin-bottom: 10px;"></crumbsNav>
    <!-- <a-breadcrumb style="text-align: left; height: 40px">
      <a-breadcrumb-item>当前位置：</a-breadcrumb-item>
      <a-breadcrumb-item>生产管理</a-breadcrumb-item>
      <a-breadcrumb-item>
        <router-link :to="{name: 'growthMonitore'}">生长监控</router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item>大棚监控列表</a-breadcrumb-item>
    </a-breadcrumb> -->
    <a-row>
      <a-col :span="18">
        <div class="title-wrapper">
          <div class="icon"></div>
          <span class="title-text">大棚监控列表</span>
        </div>
      </a-col>
      <a-col :span="6">
        <a-input
          autocomplete="off"
          placeholder="Basic usage"
          class="tableSelect"
        />
      </a-col>
    </a-row>
    <div class="table-wrapper">
      <a-table
        :scroll="{ x: 1080 }"
        :columns="columns"
        :dataSource="list"
        :style="{marginTop: '50px'}"
        :loading="loading"
        :pagination="pagination"
        :rowKey="record => record.greenhouseId"
      >
        <span slot="id" slot-scope="text, record, index">{{index + 1}}</span>
        <div
          class="action"
          slot="operation"
          slot-scope="record"
        >
              <span>
                <router-link :to="{name: 'projectDetail', params: record}">编辑</router-link>
              </span>
          <span>
                <router-link :to="{name: 'projectDetail', params: record}">查看</router-link>
              </span>
        </div>
      </a-table>
    </div>

  </div>
</template>
<script>
import Vue from 'vue'
import { Table, Row, Col, Steps, Radio, icon, Modal, Button, Input, Select } from 'ant-design-vue'
import { shiduData } from '@/api/productManage.js'
import crumbsNav from '@/components/crumbsNav/CrumbsNav'

Vue.use(Row)
Vue.use(Col)
Vue.use(Steps)
Vue.use(Radio)
Vue.use(icon)
Vue.use(Modal)
Vue.use(Button)
Vue.use(Input)
Vue.use(Select)
Vue.use(Table)
Vue.use(Row)
Vue.use(Col)
export default {
  components: {
    crumbsNav
  },
  data () {
    return {
      crumbsArr: [
        { name: '生产管理', back: false, path: '' },
        { name: '生长监控', back: false, path: '/growthMonitore' },
        { name: '大棚监控列表', back: false, path: '' }
      ],
      detail: this.$route.params,
      list: [],
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
        { title: '基地名称', dataIndex: 'solutionName' },
        { title: '地块名称', dataIndex: 'categoryName' },
        { title: '温度', dataIndex: 'expertName' },
        { title: '湿度', dataIndex: 'companyName' },
        {
          title: '状态',
          dataIndex: 'status'
        },
        { title: '异常原因', dataIndex: 'companyName' }
      ]
    }
  },
  mounted() {
    this.getShiduData()
  },
  methods: {
    getShiduData() {
      let postData = {
        pageNo: 1,
        pageSize: 10,
        value: ''
      }
      let typeList = {
        dikuai: 'gh',
        type: 'temperature'
      }
      shiduData(postData, typeList).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>
<style lang="less" scoped>
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
  .wrapper{
    position: relative;
    padding: 24px 24px 0 24px ;
    background: #fff;
    border-radius: 4px;

    .title-wrapper{
      position: absolute;
      left: 24px;

      .title-text{
        font-size: 16px;
        color: #333;
        line-height: 22px;
        margin-left: 8px;
      }
      .icon{
        width: 2px;
        height: 14px;
        background: rgba(60,140,255,1);
        border-radius: 1px;
        display: inline-block;
      }
    }

    .detail-wrapper{
      margin-top: 50px;
      text-align: left;

      .detail-item{
        margin-bottom: 32px;

        .item-key{
          font-size: 14px;
          font-weight: 400;
          color: #999;
        }

        .item-value{
          color: #000;
          font-size: 14px;
          margin-left: 10px;
        }
      }
    }
  }

</style>
