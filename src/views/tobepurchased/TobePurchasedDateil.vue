/**待采购管理详情*/
<template>
  <div class="wrapper">
    <div class="title-wrapper">
      <div class="icon"></div>
      <span class="title-text">待采购管理详情</span>
    </div>
    <div class="detail-wrapper">
      <a-row>
        <a-col :span="12" class="detail-item">
          <span class="item-key">农资名称：</span>
          <span class="item-value">{{detail.materialName}}</span>
        </a-col>
        <a-col :span="12" class="detail-item">
          <span class="item-key">计划用量：</span>
          <span class="item-value">{{detail.materialDosage}}{{detail.materialUnitName}}</span>
        </a-col>
        <a-col :span="12" class="detail-item">
          <span class="item-key">农事计划编号：</span>
          <span class="item-value">{{detail.farmingNum}}</span>
        </a-col>
        <a-col :span="12" class="detail-item">
          <span class="item-key">所属农事操作：</span>
          <span class="item-value">{{detail.actionName}}</span>
        </a-col>
      </a-row>
      <a-row >
        <a-col :span="12" class="detail-item">
          <span class="item-key">所属周期：</span>
          <span class="item-value">{{detail.planCycleName}}</span>
        </a-col>
        <a-col :span="12" class="detail-item">
          <span class="item-key">所属基地：</span>
          <span class="item-value">{{detail.baseLandName}}</span>
        </a-col>
        <a-col :span="12" class="detail-item">
          <span class="item-key">所属地块：</span>
          <span class="item-value">{{detail.blockLandName}}</span>
        </a-col>
        <a-col :span="12" class="detail-item">
          <span class="item-key">用途：</span>
          <span class="item-value">{{detail.materialUsage}}</span>
        </a-col>
      </a-row>
      <a-row :span="24">
        <a-col :span="24" class="detail-item">
          <span class="item-key">农资描述：</span>
          <span class="item-value">{{detail.materialDesc}}</span>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Row, Col } from 'ant-design-vue'
Vue.use(Row)
Vue.use(Col)
export default {
  name: 'jobShopAdminDetail',
  data () {
    return {
      detail: this.$route.params
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
