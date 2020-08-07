/** 农事计划详情页面 */
<template>
  <div>
    <div style="margin: 10px 16px">
      <crumbs-nav :crumbs-arr="crumbsArr" style="margin-bottom: 10px;" />
    </div>
    <div class="wrapper">
      <div class="title-wrapper">
        <div class="icon"></div>
        <span class="title-text">农事计划详情</span>
      </div>
      <div class="detail-wrapper">
        <a-row>
          <a-col :span="12" class="detail-item">
            <span class="item-key">农事计划编号：</span>
            <span class="item-value">{{ detail.farmingNum }}</span>
          </a-col>
          <a-col :span="12" class="detail-item" v-if="detail.productValue">
            <span class="item-key">种植作物：</span>
            <span class="item-value">
              {{
              detail.productValue.productName
              }}
            </span>
          </a-col>
          <a-col :span="12" class="detail-item" v-if="detail.solutionValue">
            <span class="item-key">种植方案：</span>
            <span class="item-value">
              {{
              detail.solutionValue.solutionName
              }}
            </span>
          </a-col>
          <a-col :span="12" class="detail-item" v-if="detail.solutionValue">
            <span class="item-key">企业名称：</span>
            <span class="item-value">{{ detail.companyName }}</span>
          </a-col>
          <a-col :span="12" class="detail-item" v-if="detail.baseLandValue">
            <span class="item-key">种植基地：</span>
            <span class="item-value">
              {{
              detail.baseLandValue.baseLandName
              }}
            </span>
          </a-col>
          <a-col :span="12" v-if="detail.blockLandValue" class="detail-item">
            <span class="item-key">种植地块：</span>
            <span class="item-value">{{ detail.blockLandValue.landName }}</span>
          </a-col>
          <a-col :span="12" class="detail-item">
            <span class="item-key">计划开始时间：</span>
            <span class="item-value">{{ detail.planStartTime }}</span>
          </a-col>
          <a-col :span="12" class="detail-item">
            <span class="item-key">生长周期：</span>
            <span class="item-value">{{ detail.cycleName }}</span>
          </a-col>
          <a-col :span="12" class="detail-item">
            <span class="item-key">出库批次号：</span>
            <span class="item-value">{{ detail.seedValue.deliveryCode }}</span>
          </a-col>
          <a-col :span="12" class="detail-item">
            <span class="item-key">菌包数量：</span>
            <span class="item-value">{{ detail.seedValue.seedNum }}</span>
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="wrapper">
      <div class="title-wrapper">
        <div class="icon"></div>
        <span class="title-text">任务列表</span>
      </div>
      <div class="table-wrapper">
        <div class="block-box">
          <a-button type="primary" class="add-button" @click="showAddDetailTask">添加临时任务</a-button>
        </div>
        <a-table
          :columns="columns"
          :dataSource="listData.records"
          :pagination="pagination"
          :style="{ marginTop: '50px' }"
          :rowKey="record => record.instId"
          :scroll="{ x: 1200 }"
          @change="setPageList"
        >
          <span slot="instId" slot-scope="text, record, index">
            {{
            index + 1
            }}
          </span>
          <div class="text-overflow" slot="useMatetial" :title="text" slot-scope="text">{{ text }}</div>
          <a slot="toDetail" slot-scope="text, record" @click="showPlanDetail(record.instId)">查看</a>
        </a-table>
      </div>
    </div>
    <!-- 任务详情 -->
    <TaskLPlanDetail
      :detail-show="plandDetailShow"
      :detail-data="detailPlanData"
      @hiddenDetailTask="plandDetailHidden"
    />
    <!-- 新增临时任务弹窗 -->
    <task-detail-add-task
      :add-show="addTaskShow"
      :formData="addFormData"
      :cation-data="cationData"
      :plan-start-time="detail.planStartTime"
      @hiddenAddDetailTask="hiddenAddDetailTask"
      @addTaskSbumit="addTaskSbumit"
      @changeType="changeType"
    />
  </div>
</template>
<script>
import Vue from 'vue'
import { Row, Col, Modal } from 'ant-design-vue'
import CrumbsNav from '@/components/crumbsNav/CrumbsNav' // 面包屑
import TaskDetailAddTask from './components/TaskDetailAddTask'
import {
  farmPlanDetail,
  farmPlanDetailList,
  getLifecycleByPlanId,
  getFarmingType,
  getCction,
  addFarmPlanTask
} from '@/api/farmPlan.js'
import { getTaskDetail, getMaterial, getUtil } from '@/api/productManage.js'
import TaskLPlanDetail from './components/TaskLPlanDetail'
import { tableDetailColumuns, crumbsArr } from './config'
Vue.use(Row)
Vue.use(Col)
Vue.use(Modal)
const columns = tableDetailColumuns
export default {
  data() {
    return {
      detail: {},
      columns,
      listData: [],
      pagination: {
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30'],
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0,
        showTotal: total => `共 ${total} 条`
      },
      planId: '',
      plandDetailShow: false,
      detailPlanData: {},
      addTaskShow: false,
      addFormData: {},
      crumbsArr,
      cationData: []
    }
  },
  components: {
    TaskLPlanDetail,
    TaskDetailAddTask,
    CrumbsNav
  },
  created() {
    this.planId = this.$route.params.id
    this.getDetailInfo(this.planId)
    this.getDetailListInfo(this.planId)
    this.getMaterialData()
    this.getUtilData()
    this.getLifecycleData()
    this.getFarmingTypeData()
  },
  methods: {
    getDetailInfo(id) {
      farmPlanDetail(id).then(res => {
        if (res.success === 'Y') {
          this.detail = res.data
        }
      })
    },
    getDetailListInfo(id, pageNo = 1, pageSize = 10) {
      let data = {
        pageNo: pageNo,
        pageSize: pageSize
      }
      farmPlanDetailList(id, data).then(res => {
        if (res.success === 'Y') {
          this.listData = res.data
          this.pagination.total = res.data.total
          this.pagination.current = data.pageNo
          this.pagination.pageSize = data.pageSize
        }
      })
    },
    setPageList(e) {
      console.log(e)
      let current = e.current
      let pageSize = e.pageSize
      this.getDetailListInfo(this.planId, current, pageSize)
    },
    showPlanDetail(id) {
      this.plandDetailShow = true
      this.getPlanDetailData(id)
    },
    plandDetailHidden() {
      this.plandDetailShow = false
    },
    getPlanDetailData(id) {
      getTaskDetail(id).then(res => {
        if (res.success === 'Y') {
          this.detailPlanData = res.data
        }
      })
    },
    // 隐藏临时任务的弹窗
    hiddenAddDetailTask() {
      this.addTaskShow = false
    },
    // 显示临时任务的弹窗
    showAddDetailTask() {
      this.addTaskShow = true
    },
    // 临时任务的提交
    addTaskSbumit(data) {
      data.farmingPlanId = this.planId
      addFarmPlanTask(data).then(res => {
        if (res.success && res.success === 'Y') {
          this.getDetailListInfo(this.planId)
          this.hiddenAddDetailTask()
          this.$message.success(res.message)
          return false
        }
        this.$message.error(res.message)
      })
    },
    // 获取农资物料
    getMaterialData() {
      getMaterial().then(res => {
        if (res.success === 'Y') {
          this.addFormData.materialData = res.data
        }
      })
    },
    // 获取农资单位
    getUtilData() {
      getUtil().then(res => {
        if (res.success === 'Y') {
          this.addFormData.utilData = res.data
        }
      })
    },
    // 获取周期
    getLifecycleData() {
      getLifecycleByPlanId(this.planId).then(res => {
        if (res.success === 'Y') {
          this.addFormData.lifecycleData = res.data
        }
      })
    },
    // 获取类型
    getFarmingTypeData() {
      getFarmingType().then(res => {
        if (res.success === 'Y') {
          this.addFormData.farmingTypeData = res.data
        }
      })
    },
    // 获取操作
    getCctionData(id) {
      getCction(id).then(res => {
        if (res.success === 'Y') {
          this.cationData = res.data
        }
      })
    },
    // 选择农事类型后
    changeType(id) {
      this.getCctionData(id)
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
}
.wrapper {
  position: relative;
  padding: 24px 24px 0 24px;
  background: #fff;
  margin: 0 16px 16px;
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
.text-overflow {
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.add-button {
  float: right;
  margin-bottom: 20px;
  cursor: pointer;
}
.block-box {
  overflow: hidden;
  height: auto;
}
</style>
