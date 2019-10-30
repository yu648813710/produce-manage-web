/**
菌包任务管理详情
*/
<template>
  <div>
    <!-- 面包屑 -->
    <div style="padding-top: 16px;padding-left:16px;">
      <crumbs-nav :crumbs-arr="dateilCrumbsArr" />
    </div>
    <!-- 基础信息 -->
    <div class="wrapper">
      <div class="title-wrapper">
        <div class="icon"></div>
        <span class="title-text">菌包基础信息</span>
      </div>
      <div class="detail-wrapper">
        <a-row >
          <a-col :span="8" class="detail-item">
            <span class="item-key">任务编号：</span>
            <span class="item-value">{{dateil.taskNum}}</span>
          </a-col>
          <a-col :span="8" class="detail-item">
            <span class="item-key">产品品种：</span>
            <span class="item-value">{{dateil.breedName}}</span>
          </a-col>
          <a-col :span="8" class="detail-item">
            <span class="item-key">菌包名称：</span>
            <span class="item-value">{{dateil.fungusProduceName}}</span>
          </a-col>
        </a-row>
        <a-row >
          <a-col :span="8" class="detail-item">
            <span class="item-key">产品品类：</span>
            <span class="item-value">{{dateil.categoryName}}</span>
          </a-col>
          <a-col :span="8" class="detail-item">
            <span class="item-key">创建人：</span>
            <span class="item-value">{{dateil.createUserName}}</span>
          </a-col>
          <a-col :span="8" class="detail-item">
            <span class="item-key">状态：</span>
            <span class="item-value">{{dateil.statusName}}</span>
          </a-col>
        </a-row>
        <a-row >
          <a-col :span="8" class="detail-item">
            <span class="item-key">所属车间：</span>
            <span class="item-value">{{dateil.workshopName}}</span>
          </a-col>
          <a-col :span="8" class="detail-item">
            <span class="item-key">开始时间：</span>
            <span class="item-value">{{dateil.startTime}}</span>
          </a-col>
          <a-col :span="8" class="detail-item">
            <span class="item-key">结束时间：</span>
            <span class="item-value">{{dateil.endTime}}</span>
          </a-col>
        </a-row>
      </div>
    </div>
    <!-- 操作列表 -->
    <div class="wrapper">
      <div class="title-wrapper">
        <div class="icon"></div>
        <span class="title-text">操作列表</span>
      </div>
      <div class="detail-wrapper" style="padding-bottom: 50px;">
        <a-table
          :columns="dateilColumns"
          :dataSource="dateil.actionTasks"
          :pagination="false"
          :loading="loading"
          :style="{marginTop: '50px'}"
          :rowKey="(record, index) => index"
        >
          <span slot="id" slot-scope="text, record, index">{{index + 1}}</span>
          <span slot="operation" slot-scope="text, record">
            <a-button type="link" @click="handleOpenModal(record)">查看</a-button>
          </span>
        </a-table>
      </div>
    </div>
    <!-- 查看的模态框 -->
    <operation-modal
    :visible="visible"
    @operationModalOk="operationModalOk"
    ></operation-modal>
  </div>

</template>
<script>
import Vue from 'vue'
import { Row, Col, Table, Button } from 'ant-design-vue'
import CrumbsNav from '@/components/crumbsNav/CrumbsNav' // 面包屑
import OperationModal from './components/OperationModal.vue'
import { dateilCrumbsArr, dateilColumns } from './config.js'
import { getFungusTask } from '@/api/farmPlan.js'
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(Button)
export default {
  components: {
    CrumbsNav,
    OperationModal
  },
  data () {
    return {
      dateilCrumbsArr,
      dateilColumns,
      loading: false,
      visible: false,
      dateil: {
        taskNum: '',
        breedName: '',
        fungusProduceName: '',
        categoryName: '',
        createUserName: '',
        statusName: '',
        workshopName: '',
        startTime: '',
        endTime: '',
        actionTasks: []
      } // 详情
    }
  },
  created () {
    if (this.$route.query.bizId) {
      this.bizId = this.$route.query.bizId
      this.getFungusTask(this.bizId)
    }
  },
  methods: {
    // 获取详情
    getFungusTask (bizId) {
      getFungusTask(bizId)
        .then(res => {
          if (res.success === 'Y') {
            this.dateil = { ...res.data }
          } else {
            this.$message.error(res.message)
          }
        })
    },
    // 点击查看
    handleOpenModal () {
      this.visible = true
    },
    operationModalOk (val) {
      this.visible = val
    },
    decode (base64) {
      return ('data:image/png;base64,' + base64)
    }
  }
}
</script>
<style lang="less" scoped>
  .wrapper{
    position: relative;
    padding: 24px 24px 0 24px ;
    background: #fff;
    margin: 16px;
    margin-top: 0;
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
        display: flex;
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
          img{
            width: 80px;
            height: 80px;
          }
        }
      }
    }
  }
</style>
