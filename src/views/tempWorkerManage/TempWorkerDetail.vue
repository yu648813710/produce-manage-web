/**临时工详情*/
<template>
  <div>
    <!-- 面包屑 -->
    <div style="padding-top: 16px;padding-left:16px;">
      <crumbs-nav :crumbs-arr="detailCrumbsArr"/>
    </div>
    <!-- 基础信息 -->
    <div class="wrapper">
      <div class="title-wrapper">
        <div class="icon"></div>
        <span class="title-text">临时工详情</span>
      </div>
      <div class="detail-wrapper">
        <a-row>
          <a-col :span="8" class="detail-item">
            <span class="item-key">临时工姓名：</span>
            <span class="item-value">{{detail.userName}}</span>
          </a-col>
          <a-col :span="8" class="detail-item">
            <span class="item-key">临时工手机号：</span>
            <span class="item-value">{{detail.phone}}</span>
          </a-col>
          <a-col :span="8" class="detail-item">
            <span class="item-key">是否为贫困户：</span>
            <span class="item-value">{{detail.povertyStatus}}</span>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="8" class="detail-item">
            <span class="item-key">状态：</span>
            <span class="item-value">{{detail.jobStatus}}</span>
          </a-col>
          <a-col :span="8" class="detail-item">
            <span class="item-key">累计总工时：</span>
            <span class="item-value">{{detail.workTimes}}</span>
          </a-col>
          <a-col :span="8" class="detail-item">
            <span class="item-key">临时工薪酬：</span>
            <span class="item-value">{{detail.payment}}</span>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="8" class="detail-item">
            <span class="item-key">创建时间：</span>
            <span class="item-value">{{detail.payment}}</span>
          </a-col>
          <a-col :span="8" class="detail-item">
            <span class="item-key">创建人：</span>
            <span class="item-value">{{detail.payment}}</span>
          </a-col>
        </a-row>
      </div>
    </div>
    <!-- 任务列表 -->
    <div class="wrapper">
      <div class="title-wrapper">
        <div class="icon"></div>
        <span class="title-text">任务列表</span>
      </div>
      <div class="detail-wrapper" style="padding-bottom: 50px;">
        <a-table
          :columns="detailColumns"
          :dataSource="list"
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
    <a-modal
      :title="title"
      :visible="visible"
      :footer="null"
      @cancel="closeModal"
    >
      <div class="item">
        <p>
          <span>农事操作：</span>
          {{taskDetail.actionName}}
        </p>
        <p>
          <span>所属周期：</span>
          {{taskDetail.cycleName}}
        </p>
      </div>
      <div class="item">
        <p>
          <span>农事类型：</span>
          {{taskDetail.farmingTypeName}}
        </p>
        <p>
          <span>使用农资：</span>
          {{taskDetail.useMaterial}}
        </p>
      </div>
      <div class="item">
        <p>
          <span>状态：</span>
          {{taskDetail.taskStatusName}}
        </p>
        <p>
          <span>执行时长：</span>
          {{taskDetail.cycleEndTime}}
        </p>
      </div>
      <div class="item">
        <p>
          <span>任务开始时间：</span>
          {{taskDetail.startTime}}
        </p>
        <p>
          <span>任务结束时间：</span>
          {{taskDetail.endTime}}
        </p>
      </div>
      <div class="item">
        <p>
          <span>任务完成时间：</span>
          {{taskDetail.endTime}}
        </p>
        <p>
          <span>负责人：</span>
          {{taskDetail.assigner}}
        </p>
      </div>
    </a-modal>
  </div>

</template>
<script>
import Vue from 'vue'
import { Row, Col, Table, Button, Modal } from 'ant-design-vue'
import CrumbsNav from '@/components/crumbsNav/CrumbsNav' // 面包屑
import { detailCrumbsArr, detailColumns } from './config.js'
import { detailTempWorker, getTaskList, detailTask } from '@/api/productManage.js'

Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(Button)
Vue.use(Modal)
export default {
  components: {
    CrumbsNav,
  },
  data() {
    return {
      detailCrumbsArr,
      detailColumns,
      list: [],
      title: '任务详情',
      loading: false,
      visible: false,
      pagination: {
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30'],
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0,
        showTotal: total => `共 ${total} 条`
      },
      detail: {
        jobStatus: '',
        payment: '',
        phone: '',
        povertyStatus: '',
        tempWorkerId: '',
        userName: '',
        workTimes: ''
      }, // 详情
      taskDetail: {}
    }
  },
  created() {
    this.getTempWorkerDetail()
    this.getTaskList()
  },
  methods: {
    // 获取临时工详情
    getTempWorkerDetail() {
      detailTempWorker(this.$route.query.tempWorkerId)
        .then(res => {
          if (res.success === 'Y') {
            this.detail = res.data
          } else {
            this.$message.error(res.message)
          }
        }).catch()
    },
    // 获取任务列表
    getTaskList() {
      let data = {
        pageNo: this.pagination.current,
        pageSize: this.pagination.pageSize,
        tempWorkerId: this.$route.query.tempWorkerId
      }
      getTaskList(data)
        .then(res => {
          if (res.success === 'Y') {
            this.list = res.data.records
          } else {
            this.$message.error(res.message)
          }
        }).catch()
    },
    // 获取任务详情
    getTaskDetail(record) {
      detailTask(record.instId)
        .then(res => {
          if (res.success === 'Y') {
            this.taskDetail = res.data
          } else {
            this.$message.error(res.message)
          }
        }).catch()
    },
    // 打开弹窗
    handleOpenModal(record) {
      this.visible = true
      this.getTaskDetail(record)
    },
    // 关闭弹窗
    closeModal() {
      this.visible = false
    }
  }
}
</script>
<style lang="less" scoped>
  .wrapper {
    position: relative;
    padding: 24px 24px 0 24px;
    background: #fff;
    margin: 16px;
    margin-top: 0;
    border-radius: 4px;

    .title-wrapper {
      position: absolute;
      left: 24px;

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
        display: flex;
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

          img {
            width: 80px;
            height: 80px;
          }
        }
      }
    }
  }
  .item {
    height: auto;
    overflow: hidden;

    p {
      width: 48%;
      float: left;
      margin-right: 4%;

      &:nth-child(2) {
        margin-right: 0%;
      }

      span {
        color: #999;
      }

      color: #333;
      line-height: 36px;
    }
  }
</style>
