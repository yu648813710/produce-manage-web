<template>
  <div>
    <a-modal
      title="任务"
      :visible="detailShow"
      @cancel="hiddenDetailTask"
      :width="750"
      :footer="null"
      :maskClosable="false"
      class="task-detail"
    >
      <div class="title">
        <span>任务详情</span>
      </div>
      <div class="item">
        <p>
          <span>农事计划编号：</span>
          {{detailData.farmingNum?detailData.farmingNum:'--'}}
        </p>
        <p>
          <span>农事操作：</span>
          {{detailData.actionName?detailData.actionName:'--'}}
        </p>
      </div>
      <div class="item">
        <p>
          <span>农事类型：</span>
          {{detailData.farmingTypeName?detailData.farmingTypeName:'--'}}
        </p>
        <p>
          <span>所属地块：</span>
          {{detailData.farmBizName?detailData.farmBizName:'--'}}
        </p>
      </div>
      <div class="item">
        <p>
          <span>产品周期：</span>
          {{detailData.cycleName?detailData.cycleName:'--'}}
        </p>
        <p>
          <span>使用农资：</span>
          {{detailData.useMaterial?detailData.useMaterial:'--'}}
        </p>
      </div>
      <div class="item">
        <p>
          <span>状态：</span>
          {{detailData.taskStatusName?detailData.taskStatusName:'--'}}
        </p>
        <p>
          <span>任务开始时间：</span>
          {{detailData.startTime?detailData.startTime:'--'}}
        </p>
      </div>
      <div class="item">
        <p>
          <span>任务结束时间：</span>
          {{detailData.endTime?detailData.endTime:'--'}}
        </p>
        <p>
          <span>负责人：</span>
          {{detailData.assigner?detailData.assigner:'--'}}
        </p>
      </div>
      <!-- 任务不同类型 -->
      <template v-if="detailData.extendData">
        <!-- 公用 -->
        <div class="item">
          <p>
            <span>任务完成时间：</span>
            {{pageDetailData.extendData.finishTime?pageDetailData.extendData.finishTime:'--'}}
          </p>
          <p>
            <span>任务图片：</span>
            <span class="img">
              <img
                v-for="(item,index) in pageDetailData.extendData.filePath"
                :key="index"
                :src="item"
                @click="checkBigImg(item)"
              />
            </span>
          </p>
        </div>
        <!-- 公用 -->
        <!-- 包装 -->
        <template v-if="pageDetailData.extendData.packWeight">
          <div class="item">
            <p>
              <span>包装人：</span>
              {{pageDetailData.extendData.packUser?pageDetailData.extendData.packUser:'--'}}
            </p>
            <p>
              <span>包装规格：</span>
              {{pageDetailData.extendData.packWeight?pageDetailData.extendData.packWeight:'--'}}
            </p>
          </div>
        </template>
        <!-- 包装 -->
        <!-- 完成采收 -->
        <template v-if="pageDetailData.extendData.pickTime">
          <div class="item">
            <p>
              <span>采收人：</span>
              {{pageDetailData.extendData.pickUser?pageDetailData.extendData.pickUser:'--'}}
            </p>
            <p>
              <span>采收重量：</span>
              {{pageDetailData.extendData.weight?pageDetailData.extendData.weight:'--'}}
            </p>
          </div>
          <div class="item">
            <p>
              <span>采收时间：</span>
              {{pageDetailData.extendData.pickTime?pageDetailData.extendData.pickTime:'--'}}
            </p>
          </div>
        </template>
        <!-- 完成采收 -->
        <!-- 完成检测 -->
        <template v-if="pageDetailData.extendData.verifyTime">
          <div class="item">
            <p>
              <span>检测人：</span>
              {{pageDetailData.extendData.userName?pageDetailData.extendData.userName:'--'}}
            </p>
            <p>
              <span>检测时间：</span>
              {{pageDetailData.extendData.verifyTime?pageDetailData.extendData.verifyTime:'--'}}
            </p>
          </div>
          <div class="item">
            <p>
              <span>检测机构：</span>
              {{pageDetailData.extendData.verifyOrganization?pageDetailData.extendData.verifyOrganization:'--'}}
            </p>
            <p>
              <span>检测结果：</span>
              {{pageDetailData.extendData.vefiyResult?pageDetailData.extendData.vefiyResult:'--'}}
            </p>
          </div>
        </template>
        <!-- 完成检测 -->
        <!-- 完成存储 -->
        <template v-if="pageDetailData.extendData.cycle">
          <div class="item">
            <p>
              <span>存储周期：</span>
              {{pageDetailData.extendData.cycle?pageDetailData.extendData.cycle:'--'}}
            </p>
            <p>
              <span>存储温度：</span>
              {{pageDetailData.extendData.temperature?pageDetailData.extendData.temperature:'--'}}
            </p>
          </div>
          <div class="item">
            <p>
              <span>存储湿度：</span>
              {{pageDetailData.extendData.humidity?pageDetailData.extendData.humidity:'--'}}
            </p>
          </div>
        </template>
        <!-- 完成存储 -->
      </template>
      <!-- 任务不同类型 结束 -->
    </a-modal>
    <!-- 图片弹窗 -->
    <div
      v-if="showBigImg"
      class="imageContent"
    >
      <div class="imageBox">
        <img
          @click="closeBigImg"
          :src="imgUrl"
          alt
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showBigImg: false
    }
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
    },
    checkBigImg(item) {
      this.imgUrl = item
      this.showBigImg = true
    },
    closeBigImg() {
      this.showBigImg = false
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
        &.img {
          img {
            width: 100px;
            height: 100px;
            margin-right: 10px;
          }
        }
      }
      color: #333;
      line-height: 36px;
    }
  }
}
.imageContent {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  .imageBox {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: rgba(238, 238, 238, 0.5);
    overflow: auto;
  }
}
</style>
