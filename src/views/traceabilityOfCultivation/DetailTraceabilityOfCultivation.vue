/**
溯源信息详情
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
        <a-row>
          <a-col :span="8" class="detail-item" v-for="(item, index) in 9" :key="index">
            <span class="item-key">任务编号：</span>
            <span class="item-value">{{item}}</span>
          </a-col>
          <a-col :span="8" class="detail-item">
            <span class="item-key">车间图片：</span>
            <span class="item-value">
              <img :src="''" alt="图片" @click="openImgModal(src)">
            </span>
          </a-col>
        </a-row>
      </div>
    </div>
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
import { Row, Col, Table, Button } from 'ant-design-vue'
import CrumbsNav from '@/components/crumbsNav/CrumbsNav' // 面包屑
import { dateilCrumbsArr } from './config.js'
import { getTracesourceDetail } from '@/api/farmPlan.js'
import DetailImg from './components/DetailImg.vue'
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(Button)
export default {
  components: {
    CrumbsNav,
    DetailImg
  },
  data () {
    return {
      dateilCrumbsArr,
      productId: '', // 获取操作详情的id
      detail: '',
      imgVisible: false,
      src: ''
    }
  },
  created () {
    if (this.$route.params.productId) {
      this.productId = this.$route.params.productId
      this.getTracesourceDetail(this.productId)
    }
  },
  methods: {
    // 获取详情
    getTracesourceDetail (productId) {
      getTracesourceDetail(productId)
        .then(res => {
          if (res.success === 'Y') {
            this.detail = res.data
          } else {
            this.$message.error(res.message)
          }
        })
    },
    decode (base64) {
      return ('data:image/png;base64,' + base64)
    },
    openImgModal(src) {
      this.imgVisible = true
      this.src = src
    },
    modalCancel(val) {
      this.imgVisible = val
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
