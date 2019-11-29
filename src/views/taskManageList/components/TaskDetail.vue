<template>
  <div>
    <a-modal
      title="任务"
      :visible="detailShow"
      @cancel="hiddenDetailTask"
      :width="1000"
      :footer="null"
      :bodyStyle="{
        height: '380px',
        overflow: 'auto'
      }"
      :maskClosable="false"
      class="task-detail"
    >
      <a-layout class="heihgt:600px">
        <div class="title">
          <span>任务详情</span>
        </div>
        <div class="item">
          <p>
            <span>农事计划编号：</span>
            {{ detailData.farmingNum ? detailData.farmingNum : '--' }}
          </p>
          <p>
            <span>农事操作：</span>
            {{ detailData.actionName ? detailData.actionName : '--' }}
          </p>
        </div>
        <div class="item">
          <p>
            <span>农事类型：</span>
            {{ detailData.farmingTypeName ? detailData.farmingTypeName : '--' }}
          </p>
          <p>
            <span>所属地块：</span>
            {{ detailData.farmBizName ? detailData.farmBizName : '--' }}
          </p>
        </div>
        <div class="item">
          <p>
            <span>产品周期：</span>
            {{ detailData.cycleName ? detailData.cycleName : '--' }}
          </p>
          <p>
            <span>使用农资：</span>
            {{ detailData.useMaterial ? detailData.useMaterial : '--' }}
          </p>
        </div>
        <div class="item">
          <p>
            <span>状态：</span>
            {{ detailData.taskStatusName ? detailData.taskStatusName : '--' }}
          </p>
          <p>
            <span>任务开始时间：</span>
            {{ detailData.startTime ? detailData.startTime : '--' }}
          </p>
        </div>
        <div class="item">
          <p>
            <span>任务结束时间：</span>
            {{ detailData.endTime ? detailData.endTime : '--' }}
          </p>
          <p>
            <span>负责人：</span>
            {{ detailData.assigner ? detailData.assigner : '--' }}
          </p>
        </div>
        <div class="item">
          <p>
            <span>用途：</span>
            {{ detailData.taskUse ? detailData.taskUse : '--' }}
          </p>
          <p>
            <span>农事描述：</span>
            {{ detailData.taskDescription ? detailData.taskDescription : '--' }}
          </p>
        </div>
        <!-- 任务不同类型 -->
        <template v-if="detailData.extendData">
          <!-- 公用 -->
          <div class="item">
            <p>
              <span>任务完成时间：</span>
              {{
                detailData.extendData.finishTime
                  ? detailData.extendData.finishTime
                  : '--'
              }}
            </p>
            <p>
              <span>任务图片：</span>
              <span class="img">
                <img
                  v-for="(item, index) in detailData.extendData.filePath"
                  :key="index"
                  :src="item"
                  @click="checkBigImg(item)"
                />
              </span>
            </p>
          </div>
          <!-- 公用 -->
          <!-- 包装 -->
          <template v-if="detailData.extendData.packWeight">
            <div class="item">
              <p>
                <span>包装人：</span>
                {{
                  detailData.extendData.packUser
                    ? detailData.extendData.packUser
                    : '--'
                }}
              </p>
              <p>
                <span>包装规格：</span>
                {{
                  detailData.extendData.packWeight
                    ? detailData.extendData.packWeight
                    : '--'
                }}{{ detailData.extendData.packUnitName }}
              </p>
            </div>
          </template>
          <!-- 包装 -->
          <!-- 完成采收 -->
          <template v-if="detailData.extendData.pickTime">
            <div class="item">
              <p>
                <span>采收人：</span>
                {{
                  detailData.extendData.pickUser
                    ? detailData.extendData.pickUser
                    : '--'
                }}
              </p>
              <p>
                <span>采收重量：</span>
                {{
                  detailData.extendData.weight
                    ? detailData.extendData.weight
                    : '--'
                }}{{ detailData.extendData.unitName }}
              </p>
            </div>
            <div class="item">
              <p>
                <span>采收时间：</span>
                {{
                  detailData.extendData.pickTime
                    ? detailData.extendData.pickTime
                    : '--'
                }}
              </p>
            </div>
          </template>
          <!-- 完成采收 -->
          <!-- 完成检测 -->
          <template v-if="detailData.extendData.verifyTime">
            <div class="item">
              <p>
                <span>检测人：</span>
                {{
                  detailData.extendData.userName
                    ? detailData.extendData.userName
                    : '--'
                }}
              </p>
              <p>
                <span>检测时间：</span>
                {{
                  detailData.extendData.verifyTime
                    ? detailData.extendData.verifyTime
                    : '--'
                }}
              </p>
            </div>
            <div class="item">
              <p>
                <span>检测机构：</span>
                {{
                  detailData.extendData.verifyOrganization
                    ? detailData.extendData.verifyOrganization
                    : '--'
                }}
              </p>
              <p>
                <span>检测结果：</span>
                {{
                  detailData.extendData.vefiyResult
                    ? detailData.extendData.vefiyResult
                    : '--'
                }}
              </p>
            </div>
          </template>
          <!-- 完成检测 -->
          <!-- 完成存储 -->
          <template v-if="detailData.extendData.cycle">
            <div class="item">
              <p>
                <span>存储周期：</span>
                {{
                  detailData.extendData.cycle
                    ? detailData.extendData.cycle
                    : '--'
                }}月
              </p>
              <p>
                <span>存储温度：</span>
                {{
                  detailData.extendData.temperature
                    ? detailData.extendData.temperature
                    : '--'
                }}℃
              </p>
            </div>
            <div class="item">
              <p>
                <span>存储湿度：</span>
                {{
                  detailData.extendData.humidity
                    ? detailData.extendData.humidity
                    : '--'
                }}%
              </p>
            </div>
          </template>
          <!-- 完成存储 -->
        </template>
      </a-layout>
      <!-- 任务不同类型 结束 -->
    </a-modal>
    <!-- 图片弹窗 -->
    <a-modal :visible="showBigImg" :footer="null" @cancel="closeBigImg" :maskClosable="false">
      <img alt="example" style="width: 100%" :src="imgUrl" />
    </a-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showBigImg: false,
      imgUrl: ''
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
  max-height: 600px;
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
  z-index: 9999;
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
