/**
 菌包信息详情页面
*/
<template>
  <div class="wrapper">
    <div class="title-wrapper">
      <div class="icon"></div>
      <span class="title-text">菌包详情</span>
    </div>
    <div class="detail-wrapper">
      <a-row>
        <a-col :span="12" class="detail-item">
          <span class="item-key">菌包名称：</span>
          <span class="item-value">{{detail.fungusBagName}}</span>
        </a-col>
        <a-col :span="12" class="detail-item">
          <span class="item-key">菌包类别：</span>
          <span class="item-value">{{detail.categoryName}}</span>
        </a-col>
        <a-col :span="12" class="detail-item">
          <span class="item-key">生产批次号：</span>
          <span class="item-value">{{detail.productionLotNumber}}</span>
        </a-col>
        <a-col :span="12" class="detail-item">
          <span class="item-key">生产企业：</span>
          <span class="item-value">{{detail.produceCompanyName}}</span>
        </a-col>
        <a-col :span="12" class="detail-item">
          <span class="item-key">包装时间：</span>
          <span class="item-value">{{detail.packagingDate}}</span>
        </a-col>
        <a-col :span="12" class="detail-item">
          <span class="item-key">规格（g/包）：</span>
          <span class="item-value">{{detail.specification}}</span>
        </a-col>
        <a-col :span="12" class="detail-item">
          <span class="item-key">追溯码：</span>
          <span class="item-value">{{detail.qrCode}}</span>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { Row,Col} from 'ant-design-vue'
  Vue.use(Row)
  Vue.use(Col)
  export default {
    data () {
      return {
        detail: this.$route.params
      }
    },
  }
</script>
<style lang="less" scoped>
  .wrapper{
    position: relative;
    padding: 24px 24px 0 24px ;
    background: #fff;
    margin: 0 24px;
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
        }
      }
    }
  }


</style>

