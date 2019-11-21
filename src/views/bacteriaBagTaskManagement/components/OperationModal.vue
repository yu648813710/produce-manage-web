/**
操作详情模态框
*/
<template>
  <div>
     <a-modal
      title="操作详情"
      :visible="visible"
			:width="800"
      @ok="handleOk"
      @cancel="handleAddCancel"
      >
      <div class="detail-wrapper">
        <a-row class="row-style" type="flex" >
          <a-col>
            <span class="item-key">操作名称：</span>
            <span class="item-value">{{commonData.actionName}}</span>
          </a-col>
        </a-row>
        <a-row class="row-style" type="flex" >
          <a-col>
            <span class="item-key">任务编号：</span>
            <span class="item-value">{{commonData.farmingNum}}</span>
          </a-col>
        </a-row>
        <a-row class="row-style" type="flex" >
          <a-col>
            <span class="item-key">车间名称：</span>
            <span class="item-value">{{commonData.farmBizName}}</span>
          </a-col>
        </a-row>
        <a-row class="row-style" type="flex" >
          <a-col>
            <span class="item-key">状态：</span>
            <span class="item-value">{{commonData.taskStatusName}}</span>
          </a-col>
        </a-row>
        <a-row class="row-style" type="flex" >
          <a-col>
            <span class="item-key">任务开始时间：</span>
            <span class="item-value">{{commonData.startTime}}</span>
          </a-col>
        </a-row>
        <a-row class="row-style" type="flex" >
          <a-col>
            <span class="item-key">任务结束时间：</span>
            <span class="item-value">{{commonData.endTime}}</span>
          </a-col>
        </a-row>
        <a-row class="row-style" type="flex" >
          <a-col>
            <span class="item-key">任务完成时间：</span>
            <span class="item-value">{{commonData.extendData && commonData.extendData.finishTime ? commonData.extendData.finishTime.substring(0, 10) : ''}}</span>
          </a-col>
        </a-row>
        <a-row class="row-style" type="flex" >
          <a-col>
            <span class="item-key">负责人：</span>
            <span class="item-value">{{commonData.assigner}}</span>
          </a-col>
        </a-row>
        <!-- 出库 -->
        <div v-if="commonData.actionId === 'J010'">
          <a-row class="row-style" type="flex"  >
            <a-col>
              <span class="item-key">出库时间：</span>
              <span class="item-value">{{ commonData.extendData && commonData.extendData.deliveryTime ? commonData.extendData.deliveryTime : ''}}</span>
            </a-col>
          </a-row>
          <a-row class="row-style" type="flex" >
            <a-col>
              <span class="item-key">出库数量：</span>
              <span class="item-value">{{ commonData.extendData && commonData.extendData.amount ? commonData.extendData.amount : ''}}
                {{commonData.extendData && commonData.extendData.unitName ? commonData.extendData.unitName : ''}}</span>
            </a-col>
          </a-row>
          <a-row class="row-style" type="flex" >
            <a-col>
              <span class="item-key">出库人：</span>
              <span class="item-value">{{ commonData.extendData && commonData.extendData.userName ? commonData.extendData.userName : ''}}</span>
            </a-col>
          </a-row>
          <a-row class="row-style" type="flex" >
            <a-col>
              <span class="item-key">规格：</span>
              <span class="item-value">
                {{ commonData.extendData && commonData.extendData.Specification && commonData.extendData.Specification.high}}
                {{commonData.extendData && commonData.extendData.Specification && commonData.extendData.Specification.unitName ? commonData.extendData.Specification.unitName  : ''}}
                * {{ commonData.extendData && commonData.extendData.Specification && commonData.extendData.Specification.diameter}}
                {{commonData.extendData && commonData.extendData.Specification && commonData.extendData.Specification.unitName ? commonData.extendData.Specification.unitName  : ''}}
              </span>
            </a-col>
          </a-row>
        </div>
        <!-- 质检 -->
        <div v-if="commonData.actionId === 'J008'">
          <a-row class="row-style" type="flex"  >
            <a-col>
              <span class="item-key">检验时间：</span>
              <span class="item-value">{{ commonData.extendData && commonData.extendData.verifyTime ? commonData.extendData.verifyTime : ''}}</span>
            </a-col>
          </a-row>
          <a-row class="row-style" type="flex" >
            <a-col>
              <span class="item-key">检验人员：</span>
              <span class="item-value">{{ commonData.extendData && commonData.extendData.userName ? commonData.extendData.userName : ''}}</span>
            </a-col>
          </a-row>
          <a-row class="row-style" type="flex" >
            <a-col>
              <span class="item-key">检验机构：</span>
              <span class="item-value">{{ commonData.extendData && commonData.extendData.verifyOrganization ? commonData.extendData.verifyOrganization : ''}}</span>
            </a-col>
          </a-row>
          <a-row class="row-style" type="flex" >
            <a-col>
              <span class="item-key">检验结果：</span>
              <span class="item-value">{{ commonData.extendData && commonData.extendData.vefiyResult ? commonData.extendData.vefiyResult : ''}}</span>
            </a-col>
          </a-row>
        </div>
        <a-row class="row-style" type="flex" >
            <a-col style="display: flex;">
              <span class="item-key">完成照片：</span>
              <span class="item-value" v-if="commonData.extendData && commonData.extendData.filePath">
                <img v-for="(item, index) in commonData.extendData.filePath" :key="index" :src="item" alt="" @click="openImgModal(item)">
              </span>
            </a-col>
          </a-row>
      </div>
     </a-modal>
     <detail-img
      v-if="imgVisible && src"
      :imgVisible="imgVisible"
      :imgUrl="src"
      @modalCancel="modalCancel"
    ></detail-img>
  </div>
</template>

<script>
import Vue from 'vue'
import { Modal, Row, Col } from 'ant-design-vue'
import { getTaskOption } from '@/api/farmPlan.js'
import DetailImg from './DetailImg'
Vue.use(Modal)
Vue.use(Row)
Vue.use(Col)
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
      required: true
    },
    instId: {
      type: String,
      default: '',
      required: true
    }
  },
  components: {
    DetailImg
  },
  data() {
    return {
      commonData: {
        actionId: '',
        farmingNum: '', // 任务编号
        actionName: '', // 操作名称
        farmBizName: '', // 车间名称
        startTime: '', // 开始时间
        endTime: '', // 结束时间
        taskStatusName: '', // 任务状态
        assigner: '', // 负责人
        extendData: {
          filePath: []
        } // 详情
      },
      imgVisible: false,
      src: ''
    }
  },
  created () {
    if (this.instId) {
      this.getTaskOption(this.instId)
    } else {
      this.$message.error('操作ID为空！')
    }
  },
  methods: {
    getTaskOption(instId) {
      getTaskOption(instId)
        .then(res => {
          if (res.success === 'Y') {
            console.log(res.data, 'res.data')
            this.commonData = { ...res.data }
          } else {
            this.$message.error(res.message)
          }
        })
    },
    openImgModal(src) {
      this.imgVisible = true
      this.src = src
    },
    modalCancel(val) {
      this.imgVisible = val
    },
    handleOk() {
      this.$emit('operationModalOk', false)
    },
    handleAddCancel() {
      this.$emit('operationModalOk', false)
    }
  }
}
</script>

<style lang="less" scoped>
.detail-wrapper{
  .row-style{
    margin-bottom: 20px;
    margin-left: 260px;
    .item-key {
      display: inline-block;
      min-width: 100px;
      text-align: right;
      color:#999;
    }
    .item-value{
      color:#000;
      img{
        width: 72px;
        height: 72px;
        background-size: 100% 100%;
        margin-right: 15px;
      }
    }
  }

}
</style>
