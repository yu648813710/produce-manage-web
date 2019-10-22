<template>
  <a-layout class="plan-market-detail">
    <!-- 基础信息 -->
    <a-card :headStyle="headStyle" :bodyStyle="bodyStyle">
      <span slot="title" class="title-block">▍<span>基本信息</span></span>
      <a-row :gutter="24">
        <a-col :span="8" v-for="item in baseInfos" :key="item.id" style="text-align: left">
          <span class="tip-label">{{item.label}}：</span>
          <span class="tip-value">{{item.value}}</span>
        </a-col>
      </a-row>
    </a-card>
    <!-- 产品周期 -->
    <div class="cycle-list">
      <a-card class="cycle-list-card" :headStyle="headStyle" :bodyStyle="bodyStyle">
        <span slot="title" class="title-block">▍<span>产品周期</span></span>
        <a-row class="content-row" :gutter="24">
          <span>时间单位：</span>
          <a-radio class="radio" :defaultChecked="false" :disabled="true">周</a-radio>
          <a-radio class="radio" :defaultChecked="true">天</a-radio>
        </a-row>
        <a-row class="content-row" :gutter="24">
          <span>产品周期：</span>
          <a-button class="cycle-btn" type="primary" size="small" v-for="item in cycleList" :key="item.lifeCycleId">{{item.lifeCycleName}}</a-button>
        </a-row>
        <a-row class="content-row" :gutter="24">
          <span>周期时长：</span>
          <a-button class="cycle-btn-time" size="small" v-for="item in cycleList" :key="item.lifeCycleId">{{item.cycleLength}}</a-button>
        </a-row>
      </a-card>
    </div>
    <!-- 列表 -->
    <div class="table">
      <a-table
        class="table-tb"
        :columns="columns"
        :dataSource="list"
        :rowKey="e => e.id"
        :style="{marginTop: '50px'}"
        :loading="loading"
        :pagination="false"
      >
        <span slot="itemIndex" slot-scope="text, record, index">{{index+1}}</span>
        <span slot="materialName" slot-scope="text, record">{{record.materialName}}-{{record.materialDosage}}{{record.materialDosageUnit}}</span>
        <span slot="taskWeekly" slot-scope="text, record">第{{record.taskStartDay}}天 - 第{{record.taskEndDay}}天</span>
        <span slot="taskDescription" slot-scope="text, record" :title="record.taskDescription">{{record.taskDescription}}</span>
        <!-- <span class="delete" slot="operation" slot-scope="text, record" @click="handleDelete(record)">删除</span> -->
      </a-table>
    </div>
  </a-layout>
</template>

<script>
import Vue from 'vue';
import { Layout, Row, Col, Card, Table, Radio, Button, message } from 'ant-design-vue';
Vue.use(Layout);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Table);
Vue.use(Radio);
Vue.use(Button);
import { planMarketDetail } from '@/api/productManage';
import formDate from '@/utils/domUtil';

const columns = [
  { title: "序号", key: "itemIndex", scopedSlots: { customRender: 'itemIndex' } },
  { title: '任务操作', dataIndex: 'actionName', key: 'actionName' },
  { title: '所属周期', dataIndex: 'cycleName', key: 'cycleName' },
  { title: '农事类型', dataIndex: 'farmingTypeName', key: 'farmingTypeName' },
  { title: '使用农资及用量(每亩)', key: 'materialName', scopedSlots: { customRender: 'materialName' } },
  { title: '执行周期', key: 'taskWeekly', scopedSlots: { customRender: 'taskWeekly' } },
  { title: '用途', dataIndex: 'taskUse', key: 'taskUse' },
  { title: '农事描述', key: 'taskDescription', scopedSlots: { customRender: 'taskDescription'} }
  // { title: '操作', key: 'operation', scopedSlots: { customRender: 'operation' } }
]

export default {
  name: 'planMarketDetail',
  data() {
    return {
      columns,
      baseInfo: {},
      baseInfos: [],
      cycleList: [],
      list: [],
      loading: false,
      headStyle: {
        display: 'flex',
        flexDirection: 'row', 
        justifyContent: 'flex-start',
        borderBottom: 'none'
      },
      bodyStyle: {
        padding: '0 32px 10px 32px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'

      },
      solutionId: this.$route.params.solutionId
    }
  },
  created() {
    this.fetchInfos(this.solutionId);
  },
  methods: {
    fetchInfos(solutionId) {
      this.loading = true
      planMarketDetail(solutionId).then(res => {
        this.loading = false
        if (res && res.success === 'Y') {
          let info = res.data && res.data.solutionPlan || {}
          this.baseInfo = res.data && res.data.solutionPlan || {}
          this.baseInfos = this.groupBaseInfo(info)
          this.cycleList = res.data && res.data.solutionPlanCycleList || []
          let list = res.data && res.data.solutionPlanCycleMaterialList || []
          for (let i = 0; i < list.length; i++) {
            list[i].id = list[i].planCycleId + i
          }
          this.list = list

          return
        }
        this.cycleList = []
        this.list = []
        message.error(res.message)
      })
    },

    groupBaseInfo(info) {
      let baseInfos = []
      for(let item in info) {
        if (item === 'companyName') {
          let param = {}
          param.id = item
          param.index = 0
          param.label = '供应商'
          param.value = info.companyName ? info.companyName : ''
          baseInfos.push(param)
        } else if (item === 'solutionName') {
          let param = {}
          param.id = item
          param.index = 1
          param.label = '方案名称'
          param.value = info.solutionName ? info.solutionName : ''
          baseInfos.push(param)
        } else if (item === 'categoryName') {
          let param = {}
          param.id = item
          param.index = 2
          param.label = '产品品类'
          param.value = info.categoryName ? info.categoryName : ''
          baseInfos.push(param)
        } else if (item === 'breedName') {
          let param = {}
          param.id = item
          param.index = 3
          param.label = '产品品种'
          param.value = info.breedName ? info.breedName : ''
          baseInfos.push(param)
        } else if (item === 'createUser') {
          let param = {}
          param.id = item
          param.index = 4
          param.label = '创建人'
          param.value = info.createUser ? info.createUser : ''
          baseInfos.push(param)
        } else if (item === 'gmtCreate') {
          let param = {}
          param.id = item
          param.index = 5
          param.label = '创建时间'
          param.value = info.gmtCreate ? formDate.formDate(info.gmtCreate) : ''
          baseInfos.push(param)
        } else if (item === 'cycleAllLength') {
          let param = {}
          param.id = item
          param.index = 6
          param.label = '周期时长'
          param.value = info.cycleAllLength ? info.cycleAllLength : ''
          baseInfos.push(param)
        } else if (item === 'participantUserList') {
          let param = {}
          param.id = item
          param.index = 7
          param.label = '方案参与人'
          param.value = this.cmpUsers(info.participantUserList ? info.participantUserList : [])
          baseInfos.push(param)
        }
      }
      return this.sortByKey(baseInfos, 'index')
    },

    sortByKey(array,key){
      return array.sort(function(a,b){
          var x = a[key];
          var y = b[key];
          return((x<y)?-1:((x>y)?1:0));
      })
    },

    cmpUsers(users) {
      let str = ''
      for (let i in users) {
          if (i != users.length - 1) {
            str += users[i].userName + ','
          } else {
            str += users[i].userName
          }
      }
      return str
    }
  }
}
</script>

<style lang="less" scoped>
.plan-market-detail {
  margin: 16px;
  .title-block {
    color: #3C8DFF;
    span {
      color: #000;
      font-weight: bold;
    }
  }
  .content-row {
    padding: 10px 12px;
  }
  span {
    line-height: 30px;
  }
  .tip-label {
    color: #999;
  }
  .tip-value {
    color: #000;
  }
  .radio {
    width: 68px;
    line-height: 28px;
    border-radius: 14px;
    background-color: #F5F6FA;
  }
  .cycle-btn {
    border-radius: 0;
    box-shadow: none;
    margin-right: 24px;
    min-width: 90px;
  }
  .cycle-btn-time {
    border-radius: 0;
    box-shadow: none;
    margin-right: 24px;
    min-width: 90px;
  }
  .radio:last-child {
    border: 1px solid #3C8CFF;
  }
  .cycle-list {
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    &-card {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      width: 100%;
    }
  }
  .table {
    background-color: #fff;
    &-tb {
      margin: 32px;
    }
    span {
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .delete {
      cursor: pointer;
      color: #3C8DFF;
    }
  }
}
</style>