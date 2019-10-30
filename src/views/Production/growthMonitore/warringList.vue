/**
地块监控列表页面
*/
<template>
  <div>
    <div class="crumbCtr">
      <crumbsNav :crumbsArr="crumbsArr"></crumbsNav>
    </div>
    <div class="wrapper">
      <div class="search-wrapper">
        <a-row>
          <a-form :form="sreachFrom" @submit="handleSearchClick">
            <a-row>
              <a-col :span="8">
                <a-form-item label="地块名称" :label-col="{ span: 24 }" :wrapper-col="{ span: 20 }">
                  <a-input
                    autocomplete="off"
                    placeholder="请输入地块名称"
                    v-decorator="[
                      'baseLandName',
                      { rules: [{ required: false, message: '' }] },
                    ]"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="异常原因" :label-col="{ span: 24 }" :wrapper-col="{ span: 20 }">
                  <a-input
                    autocomplete="off"
                    placeholder="请输入异常原因"
                    v-decorator="[
                      'noNormalReason',
                      { rules: [{ required: false, message: '' }] },
                    ]"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
          <div>
            <a-button type="primary" class="button" @click="searchWarringList">查询</a-button>
            <a-button class="button" @click="rest">重置</a-button>
          </div>
        </a-row>
      </div>
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
            slot-scope=""
          >
          </div>
        </a-table>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Table, Row, Col, Steps, Radio, icon, Modal, Button, Input, Select, Form } from 'ant-design-vue'
import { shiduData, getTotalWarring } from '@/api/productManage.js'
import crumbsNav from '@/components/crumbsNav/CrumbsNav'
Vue.use(Row)
Vue.use(Form)
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
const columns1 = [
  { title: '序号', scopedSlots: { customRender: 'id' }, align: 'center' },
  { title: '基地名称', dataIndex: 'baseLandName' },
  { title: '地块名称', dataIndex: 'blockLandName' },
  { title: '湿度',
    dataIndex: 'indicatorValue',
    customRender: (text) => {
      return text + '%'
    }
  },
  {
    title: '状态',
    dataIndex: 'status',
    customRender: (text) => {
      if (text === 'normal') {
        return '正常'
      } else if (text === 'abnormal') {
        return '异常'
      }
    }
  },
  { title: '异常原因', dataIndex: 'reason' }

]
const columns2 = [
  { title: '序号', scopedSlots: { customRender: 'id' }, align: 'center' },
  { title: '基地名称', dataIndex: 'baseLandName' },
  { title: '地块名称', dataIndex: 'blockLandName' },
  { title: '温度℃', dataIndex: 'indicatorValue' },
  {
    title: '状态',
    dataIndex: 'status',
    customRender: (text) => {
      if (text === 'normal') {
        return '正常'
      } else if (text === 'abnormal') {
        return '异常'
      }
    }
  },
  { title: '异常原因', dataIndex: 'reason' }

]
const columns3 = [
  { title: '序号', scopedSlots: { customRender: 'id' }, align: 'center' },
  { title: '基地名称', dataIndex: 'baseLandName' },
  { title: '地块名称', dataIndex: 'blockLandName' },
  { title: '温度℃', dataIndex: 'temperature' },
  { title: 'CO₂浓度', dataIndex: 'co2Concentration' },
  { title: '湿度',
    dataIndex: 'dampness',
    customRender: (text) => {
      return text + '%'
    }
  },
  {
    title: '状态',
    dataIndex: 'status',
    customRender: (text) => {
      if (text === 'normal') {
        return '正常'
      } else if (text === 'abnormal') {
        return '异常'
      }
    }
  },
  { title: '异常原因',
    dataIndex: 'reason'
    // customRender: (text) => {
    //   if (text === 'normal') {
    //     return '正常'
    //   } else if (text === 'abnormal') {
    //     return '异常'
    //   }
    // }
  }

]
export default {
  components: {
    crumbsNav
  },
  data () {
    return {
      detail: this.$route.query.type,
      list: [],
      sreachFrom: this.$form.createForm(this),
      listType: 0,
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
      columns1,
      columns2,
      columns3,
      columns: '',
      crumbsArr: [
        { name: '当前位置', back: false, path: '' },
        { name: '生产管理', back: false, path: '' },
        { name: '生长监控', back: true, path: '/production/growthMonitore' },
        { name: '地块监控列表', back: false, path: '' }
      ]
    }
  },
  mounted() {
    this.listType = this.$route.query.type
    console.log(this.$route.query.type)
    this.getTableData()
    this.formatTableColumn()
  },
  methods: {
    // 查询预警列表
    searchWarringList() {
      if (this.listType === 1 || this.listType === 2) {
        this.columns = this.columns3
        this.getTotalData(2)
      }
    },
    formatTableColumn() {
      /**
       * listType === 1 湿度列表
       * listType === 2 温度列表
       * listType === 3 历史总累计列表
       * listType === 4 今日新增总累计列表
       */
      if (this.listType === 1) {
        this.columns = this.columns1
      } else if (this.listType === 2) {
        this.columns = this.columns2
      } else if (this.listType === 3 || this.listType === 4) {
        this.columns = this.columns3
      }
    },
    getTableData() {
      if (this.$route.query.type === 1) {
        this.getShiduData()
      } else if (this.$route.query.type === 2) {
        this.getWenduData()
      } else if (this.$route.query.type === 3) {
        this.getTotalData(1)
      } else if (this.$route.query.type === 4) {
        this.getTotalData(2)
      }
    },
    // 获取历史总累计预警
    getTotalData(type) {
      let postData = {
        alarmType: '温度过高', // 预警类型查询 下拉框值默认为 温度过高 温度过低 湿度过高 湿度过低 二氧化碳过高 二氧化碳过低
        inputContent: '', // 输入框的模糊查询地块或车间的名陈
        pageNo: 1,
        pageSize: 10
      }
      let typeList = {
        massifType: 'gh',
        type: type === 1 ? 'history' : 'realTime'
      }
      getTotalWarring(postData, typeList).then((res) => {

      })
    },
    getShiduData() {
      let postData = {
        pageNo: 1,
        pageSize: 10
      }
      let typeList = {
        dikuai: 'gh',
        type: 'dampness'
      }
      shiduData(postData, typeList).then((res) => {
        console.log(res)
        this.list = res.data.records
      })
    },
    handleSearchClick() {
      this.sreachFrom.validateFields((err, values) => {
        console.log(err, values)
      })
    },
    getWenduData() {
      let postData = {
        pageNo: 1,
        pageSize: 10
      }
      let typeList = {
        dikuai: 'gh',
        type: 'temperature'
      }
      shiduData(postData, typeList).then((res) => {
        if (res.code === 200 && res.data.records) {
          this.list = res.data.records
        } else {
          this.list = []
        }
        console.log(this.list)
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .search-wrapper {
    background: #fff;
    margin-bottom: 10px;
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
  .crumbCtr{
    height: 20px;
    line-height: 20px;
    margin-top: 20px;
    margin-left: 16px;
    text-align: left;
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
  .wrapper{
    position: relative;
    padding: 24px 24px 0 24px ;
    background: #fff;
    margin: 16px;
    border-radius: 4px;

    .title-wrapper{
      text-align: left;

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
