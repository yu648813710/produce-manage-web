/**
农事计划详情页面
*/
<template>
  <div>
    <div class="wrapper">
      <div class="title-wrapper">
        <div class="icon"></div>
        <span class="title-text">农事计划详情</span>
      </div>
      <div class="detail-wrapper">
        <a-row>
          <a-col
            :span="12"
            class="detail-item"
          >
            <span class="item-key">农事计划编号：</span>
            <span class="item-value">{{detail.farmingNum}}</span>
          </a-col>
          <a-col
            :span="12"
            class="detail-item"
            v-if="detail.productValue"
          >
            <span class="item-key">种植作物：</span>
            <span class="item-value">{{detail.productValue.productName}}</span>
          </a-col>
          <a-col
            :span="12"
            class="detail-item"
            v-if="detail.solutionValue"
          >
            <span class="item-key">种植方案：</span>
            <span class="item-value">{{detail.solutionValue.solutionName}}</span>
          </a-col>
          <a-col
            :span="12"
            class="detail-item"
            v-if="detail.baseLandValue"
          >
            <span class="item-key">种植基地：</span>
            <span class="item-value">{{detail.baseLandValue.baseLandName}}</span>
          </a-col>
          <a-col
            :span="12"
            v-if="detail.blockLandValue"
            class="detail-item"
          >
            <span class="item-key">种植地块：</span>
            <span class="item-value">{{detail.blockLandValue.landName}}</span>
          </a-col>
          <a-col
            :span="12"
            class="detail-item"
          >
            <span class="item-key">计划开始时间：</span>
            <span class="item-value">{{detail.planStartTime}}</span>
          </a-col>
          <a-col
            :span="12"
            class="detail-item"
            v-if="detail.taskEntitys"
          >
            <span class="item-key">生长周期：</span>
            <span
              class="item-value"
              v-if="detail.taskEntitys[0]"
            >{{detail.taskEntitys[0].taskParam.cycleName}}</span>
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
        <a-table
          :columns="columns"
          :dataSource="listData.records"
          :pagination="pagination"
          :style="{marginTop: '50px'}"
          :rowKey="record => record.instId"
          :scroll="{x:1200}"
          @change="setPageList"
        >
          <span
            slot="instId"
            slot-scope="text, record, index"
          >{{index+1}}</span>
          <div
            class="text-overflow"
            slot="useMatetial"
            :title="text"
            slot-scope="text, record, index"
          >{{text}}</div>
          <a
            slot="toDetail"
            slot-scope="text, record, index"
          >操作</a>
        </a-table>
      </div>
    </div>
  </div>
</template>
<script>
const columns = [
  {
    title: '序号',
    dataIndex: 'instId',
    scopedSlots: { customRender: 'instId' }
  },
  { title: '农事操作', dataIndex: 'actionName', key: 'actionName' },
  { title: '所属周期', dataIndex: 'cycleName', key: 'cycleName' },
  { title: '农事类型', dataIndex: 'farmingTypeName', key: 'farmingTypeName' },
  {
    title: '使用农资',
    dataIndex: 'useMatetial',
    width: '200px',
    scopedSlots: { customRender: 'useMatetial' }
  },
  { title: '状态', dataIndex: 'taskStatusName', key: 'taskStatusName' },
  { title: '执行周期', dataIndex: 'executeCycle', key: 'executeCycle' },
  { title: '任务开始时间', dataIndex: 'startTime', key: 'startTime' },
  { title: '任务完成时间', dataIndex: 'finishTime', key: 'finishTime' },
  { title: '负责人', dataIndex: 'assigner', key: 'assigner' },
  {
    title: '操作',
    scopedSlots: { customRender: 'toDetail' }
  }
]
import Vue from 'vue'
import { Row, Col } from 'ant-design-vue'
import { farmPlanDetail, farmPlanDetailList } from '@/api/farmPlan.js'
Vue.use(Row)
Vue.use(Col)
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
      planId: ''
    }
  },
  created() {
    this.planId = this.$route.params.id
    this.getDetailInfo(this.planId)
    this.getDetailListInfo(this.planId)
  },
  methods: {
    getDetailInfo(id) {
      farmPlanDetail(id).then(res => {
        if (res.success === 'Y') {
          console.log(res.data)
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
          console.log(res.data)
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
  margin: 16px;
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
</style>

