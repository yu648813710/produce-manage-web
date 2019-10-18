<template>
  <div>
    <a-modal
      title="任务"
      :visible="detailShow"
      @cancel="hiddenDetailTask"
      :width="750"
      :footer="null"
      class="task-detail"
    >
      <div class="title">
        <span>任务详情</span>
      </div>
      <div class="item">
        <p>
          <span>农事计划编号：</span>
          {{detailData.farmingNum}}
        </p>
        <p>
          <span>农事操作：</span>
          {{detailData.actionName}}
        </p>
      </div>
      <div class="item">
        <p>
          <span>农事类型：</span>
          {{detailData.farmingTypeName}}
        </p>
        <p>
          <span>所属地块：</span>
          {{detailData.blockLandName}}
        </p>
      </div>
      <div class="item">
        <p>
          <span>产品周期：</span>
          {{detailData.cycleName}}
        </p>
        <p>
          <span>使用农资：</span>
          {{detailData.useMaterial}}
        </p>
      </div>
      <div class="item">
        <p>
          <span>状态：</span>
          {{detailData.startTime}}
        </p>
        <p>
          <span>任务开始时间：</span>
          {{detailData.startTime}}
        </p>
      </div>
      <div class="item">
        <p>
          <span>任务结束时间：</span>
          {{detailData.endTime}}
        </p>
        <p>
          <span>负责人：</span>
          {{detailData.assigner}}
        </p>
      </div>
    </a-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  props: {
    detailShow: {
      tyep: Boolean,
      default: false,
      required: true
    },
    detailData: {
      tyep: Object,
      default: false,
      required: true
    }
  },
  watch: {
    detailData(val) {
      this.detailData = val
    }
  },
  methods: {
    hiddenDetailTask() {
      this.$emit('hiddenDetailTask')
    }
  }
}
</script>
<style lang="less" scoped>
.task-detail {
  .title {
    color: #333;
    font-size: 16px;
    span {
      padding-left: 8px;
      border-left: 2px solid #3c8cff;
    }
    margin-bottom: 20px;
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
}
</style>