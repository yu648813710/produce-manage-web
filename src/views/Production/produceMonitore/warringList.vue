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
          <a-form
            :form="sreachFrom"
            @submit="handleSearchClick"
            class="form"
          >
            <a-row>
              <a-col :span="8">
                <a-form-item
                  label="地块名称"
                  :label-col="{ span: 24 }"
                  :wrapper-col="{ span: 20 }"
                >
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
                <a-form-item
                  label="异常原因"
                  :label-col="{ span: 24 }"
                  :wrapper-col="{ span: 20 }"
                >
                  <a-select
                    placeholder="请选择异常原因"
                    :getPopupContainer="positonFn"
                    :dropdownStyle="dropdownStyle"
                    style="width: 100%"
                    v-decorator="[
                      'warringType',
                      { rules: [{ required: false, message: '' }] },
                    ]"
                  >
                    <a-select-option
                      style="text-align: left"
                      v-for="(item, index) in alarmTypeArr"
                      :key="index"
                      :value="item.value"
                    >{{item.label}}
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
              @click="searchWarringList"
            >查询
            </a-button>
            <a-button
              class="button"
              @click="restSearch"
            >重置
            </a-button>
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
          @change="warringListPageChange"
          :rowKey="record => record.greenhouseId"
        >
          <span
            class="alarmCtr"
            slot="status"
            slot-scope="text, record"
          >{{record.status === 'normal' ? '正常' : '异常'}}</span>
          <span
            class="alarmCtr"
            slot="reason"
            slot-scope="text, record"
            :title="formatWarringReason(record.reason)"
          >{{formatWarringReason(record.reason)}}</span>
          <span
            slot="id"
            slot-scope="text, record, index"
          >{{index + 1}}</span>
        </a-table>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import {
  Table,
  Row,
  Col,
  Steps,
  Radio,
  icon,
  Modal,
  Button,
  Input,
  Select,
  Form
} from 'ant-design-vue'
import { getTotalWarring, getSingleTypeData } from '@/api/productManage.js'
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
// const columns1 = [
//   { title: '序号', scopedSlots: { customRender: 'id' }, align: 'center' },
//   { title: '基地名称', dataIndex: 'baseLandName' },
//   { title: '地块名称', dataIndex: 'blockLandName' },
//   { title: '温度℃', dataIndex: 'temperature' },
//   // { title: 'CO₂浓度', dataIndex: 'co2Concentration' },
//   {
//     title: '湿度',
//     dataIndex: 'dampness',
//     customRender: text => {
//       return text + '%'
//     }
//   },
//   {
//     title: '状态',
//     dataIndex: 'status',
//     scopedSlots: { customRender: 'status' }
//   },
//   {
//     title: '异常原因',
//     dataIndex: 'reason',
//     scopedSlots: { customRender: 'reason' }
//   }
// ]
const columns = [
  { title: '序号', scopedSlots: { customRender: 'id' }, align: 'center' },
  // { title: '基地名称', dataIndex: 'baseLandName' },
  { title: '车间名称', dataIndex: 'blockLandName' },
  { title: '温度℃', dataIndex: 'temperature' },
  { title: 'CO₂浓度', dataIndex: 'co2Concentration' },
  {
    title: '湿度',
    dataIndex: 'dampness',
    customRender: text => {
      if (text) {
        return text + '%'
      }
      return ''
    }
  },
  {
    title: '状态',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '异常原因',
    dataIndex: 'reason',
    scopedSlots: { customRender: 'reason' }
  }
]
export default {
  components: {
    crumbsNav
  },
  data() {
    return {
      dropdownStyle: {
        'text-align': 'left'
      },
      warringType: '', // ws
      componenyType: 1,
      baseLandName: '', // 温度过高 温度过低 湿度过高 湿度过低 二氧化碳过高 二氧化碳过低
      alarmTypeArr: [
        { label: '温度过高', value: '温度过高' },
        { label: '温度过低', value: '温度过低' },
        { label: '湿度过高', value: '湿度过高' },
        { label: '湿度过低', value: '湿度过低' },
        { label: '二氧化碳浓度过高', value: '二氧化碳过高' },
        { label: '二氧化碳浓度过低', value: '二氧化碳过低' }
      ],
      detail: this.$route.query.type,
      list: [],
      sreachFrom: this.$form.createForm(this),
      listType: 0,
      warringListType: 'all',
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
      columns,
      crumbsArr: [
        { name: '生产管理', back: false, path: '' },
        { name: '生长监控', back: false, path: '/production/growthMonitore' },
        { name: '地块监控列表', back: false, path: '' }
      ]
    }
  },
  mounted() {
    this.checkComponenyType()
    this.listType = this.$route.query.type ? this.$route.query.type : 3
    console.log(this.$route.query.type)
    this.getTableData()
    // this.formatTableColumn()
  },
  methods: {
    positonFn(e) {
      return document.querySelectorAll('.form')[0]
    },
    checkComponenyType() {
      if (this.componenyType === 0) {
        this.columns.forEach((item, index) => {
          if (item.dataIndex === 'co2Concentration') {
            this.columns.splice(index, 1)
          }
        })
        for (let i = 0; i < this.alarmTypeArr.length; i++) {
          this.alarmTypeArr.forEach((item, index) => {
            if (item.value === '二氧化碳过低' || item.value === '二氧化碳过高') {
              // console.log('!!!!', item)
              this.alarmTypeArr.splice(index, 1)
            }
          })
        }
      }
    },
    formatWarringReason(reson) {
      let data = JSON.parse(reson)
      let formatReson = ''
      for (let i = 0; i < data.length; i++) {
        // eslint-disable-next-line no-unused-expressions
        formatReson += data[ i ] + ' '
      }
      // console.log(formatReson)
      return formatReson
    },
    // 重置查询条件
    restSearch() {
      this.sreachFrom.resetFields()
      this.listType = 3
      this.searchWarringList()
    },
    warringListPageChange(page) {
      this.pagination.pageSize = page.pageSize
      this.pagination.current = page.current
      console.log('this.listType: ', this.listType)
      if (this.listType === 3) {
        this.getTotalData(null, 1)
      } else {
        this.getTableData(this.listType, 1)
      }
    },
    // 查询预警列表
    searchWarringList() {
      this.warringListType = 'all'
      this.listType = 3
      // eslint-disable-next-line handle-callback-err
      this.sreachFrom.validateFields((err, values) => {
        console.log('$$$$values: ', values)
        this.pagination.current = 1
        this.baseLandName = values.baseLandName ? values.baseLandName : ''
        this.warringType = values.warringType ? values.warringType : ''
        if (+this.listType === 1 || +this.listType === 2) {
          this.getTotalData(null, 2)
        } else if (
          +this.listType === 3 ||
          +this.listType === 5 ||
          +this.listType === 6 ||
          +this.listType === 7
        ) {
          this.getTotalData(null, 1)
        }
      })
    },
    getTableData() {
      /**
       * listType === 1 湿度列表
       * listType === 2 温度列表
       * listType === 3 历史总累计列表
       * listType === 4 今日新增总累计列表
       * listType === 5 历史总累计温度列表
       * listType === 6 历史总累计湿度列表
       * listType === 7 历史总累计二氧化碳列表
       */
      if (this.listType === 3 || this.listType === '3') {
        this.warringListType = 'all'
        this.getTotalData(null, 1) // 获取历史总累计列表
      } else if (this.listType === 5 || this.listType === '5') {
        this.warringListType = 'singleType'
        this.getTotalData(2, 1) // 获取历史温度预警数据
      } else if (this.listType === 6 || this.listType === '6') {
        this.warringListType = 'singleType'
        this.getTotalData(1, 1) // 获取历史湿度预警数据
      } else if (this.listType === 7 || this.listType === '7') {
        this.getTotalData(3, 1) // 获取历史湿度预警数据
      }
    },
    // 获取历史 温度 || 湿度 预警
    getHistorySingleData(type) {
      let postData = {
        pageNo: this.pagination.current,
        pageSize: this.pagination.pageSize
      }
      let typeList = {
        massifType: this.componenyType === 0 ? 'gh' : 'ws',
        type: type === 1 ? 'temperature' : 'dampness' // indicatorName：湿度：dampness 温度：temperature 二氧化碳浓度：co2_concentration 不区分指标名：all
      }
      getSingleTypeData(postData, typeList).then(res => {
        this.list = res.data.records
        this.pagination.total = res.data.total
        // console.log(res)
      })
    },
    /**
     * 获取历史总累计预警
     * alarmType === 1 湿度 alarmType === 2 temperature alarmType === 3 二氧化碳
     * staticType === 1 历史总列表 staticType === 2 新增总列表
     */
    getTotalData(alarmType, staticType) {
      let postData = {
        inputContent: this.baseLandName, // 输入框的模糊查询地块或车间的名陈
        alarmType: this.warringType, // 预警类型查询 下拉框值默认为 温度过高 温度过低 湿度过高 湿度过低 二氧化碳过高 二氧化碳过低
        pageNo: this.pagination.current,
        pageSize: this.pagination.pageSize
      }
      let typeList = {}
      if (alarmType && staticType) {
        let type
        switch (alarmType) {
          case 1:
            type = 'dampness'
            break
          case 2:
            type = 'temperature'
            break
          case 3:
            type = 'co2_concentration'
            break
        }
        typeList = {
          massifType: this.componenyType === 0 ? 'gh' : 'ws',
          alarmType: type,
          staticType: staticType === 1 ? 'history' : 'realTime'
        }
      } else {
        typeList = {
          massifType: this.componenyType === 0 ? 'gh' : 'ws',
          alarmType: 'all',
          staticType: staticType === 1 ? 'history' : 'realTime'
        }
      }
      getTotalWarring(postData, typeList).then(res => {
        if (res.success === 'Y') {
          this.pagination.total = (res && res.data && res.data.total) || 0
          // res && res.data && res.data.total
          this.list = res.data.records ? res.data.records : []
        }
        console.log(res)
      })
    },
    handleSearchClick() {
      this.sreachFrom.validateFields((err, values) => {
        console.log(err, values)
      })
    }
  }
}
</script>
<style lang="less" scoped>
  #app{
    text-align: left !important;
  }
  .form{
    position: relative;
  }
  .alarmCtr {
    color: red;
    max-width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
  }

  .search-wrapper {
    padding: 24px;
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

  .crumbCtr {
    margin: 16px 16px 0 16px;
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

  .wrapper {
    position: relative;
    margin: 16px;
    margin-top: 0px;
    border-radius: 4px;

    .title-wrapper {
      text-align: left;

      .title-text {
        font-size: 16px;
        color: #333;
        line-height: 22px;
        margin-left: 8px;
      }

      .icon {
        width: 2px;
        height: 14px;
        background: rgba(60, 140, 255, 1);
        border-radius: 1px;
        display: inline-block;
      }
    }

    .detail-wrapper {
      margin-top: 50px;
      text-align: left;

      .detail-item {
        margin-bottom: 32px;

        .item-key {
          font-size: 14px;
          font-weight: 400;
          color: #999;
        }

        .item-value {
          color: #000;
          font-size: 14px;
          margin-left: 10px;
        }
      }
    }
  }
</style>
