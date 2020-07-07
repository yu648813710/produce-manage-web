/** 溯源信息详情 */
<template>
  <div style="margin: 10px 16px;">
    <!-- 面包屑 -->
    <crumbs-nav :crumbs-arr="dateilCrumbsArr" style="margin-bottom: 10px;" />
    <!-- 基础信息 -->
    <div class="wrapper">
      <div class="title-wrapper">
        <div class="icon"></div>
        <span class="title-text">产品基础信息</span>
      </div>
      <div class="detail-wrapper">
        <a-row>
          <a-col :span="8" class="detail-item">
            <span class="item-key">产品名称：</span>
            <span class="item-value">{{ detail.productName }}</span>
          </a-col>
          <a-col :span="8" class="detail-item">
            <span class="item-key">产品品种：</span>
            <span class="item-value">{{ detail.productBreed }}</span>
          </a-col>
          <a-col :span="8" class="detail-item">
            <span class="item-key">产品品类：</span>
            <span class="item-value">{{ detail.productCategory }}</span>
          </a-col>
          <a-col :span="8" class="detail-item">
            <span class="item-key">生产企业：</span>
            <span class="item-value">{{ detail.productionCompany }}</span>
          </a-col>
          <a-col :span="8" class="detail-item">
            <span class="item-key">生产地：</span>
            <span class="item-value">{{ detail.mergerAddress }}</span>
          </a-col>
          <a-col :span="8" class="detail-item">
            <span class="item-key">生产日期：</span>
            <span class="item-value">{{ detail.productionDate }}</span>
          </a-col>
          <a-col :span="8" class="detail-item">
            <span class="item-key">保质期：</span>
            <span class="item-value">{{ detail.expiryTime }} 天</span>
          </a-col>
          <a-col :span="8" class="detail-item">
            <span class="item-key">联系方式：</span>
            <span class="item-value">{{ detail.phone }}</span>
          </a-col>
          <a-col :span="8" class="detail-item">
            <span class="item-key">木耳图片：</span>
            <span class="item-value">
              <img
                :src="detail.filePath"
                alt="图片"
                @click="openImgModal(detail.filePath)"
              />
            </span>
          </a-col>
        </a-row>
      </div>
    </div>
    <!-- 其他信息 -->
    <div
      class="wrapper"
      v-for="(card, cardindex) in nodeInfoList"
      :key="cardindex"
    >
      <div class="title-wrapper">
        <div class="icon"></div>
        <span class="title-text">{{ card.title }}</span>
      </div>
      <div class="detail-wrapper">
        <a-row>
          <a-col
            :span="8"
            class="detail-item"
            v-for="(item, index) in card.infos"
            :key="index"
          >
            <span class="item-key">{{ item.fieldLabel }}：</span>
            <template v-if="item.field === 'filePath'">
              <template v-if="item.value.sort">
                <span
                  class="item-value"
                  v-for="(imgItem, index) in item.value"
                  :key="index + 'img'"
                >
                  <img
                    :src="imgItem"
                    alt="图片"
                    @click="openImgModal(imgItem)"
                  />
                </span>
              </template>
              <span class="item-value" v-else style="margin-right:10px;">
                <img
                  :src="item.value"
                  alt="图片"
                  @click="openImgModal(item.value)"
                />
              </span>
            </template>
            <span class="item-value" v-else>{{ item.value }}</span>
          </a-col>
        </a-row>
      </div>
    </div>
    <ImgModal
      v-if="imgVisible && src"
      :imgUrl="src"
      :imgVisible="imgVisible"
      @modalCancel="modalCancel"
    />
  </div>
</template>
<script>
import Vue from 'vue'
import { Row, Col, Table, Button } from 'ant-design-vue'
import CrumbsNav from '@/components/crumbsNav/CrumbsNav' // 面包屑
import { dateilCrumbsArr } from './config.js'
import { getTracesourceDetail } from '@/api/farmPlan.js'
import ImgModal from '@/components/ImgModal'
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(Button)
export default {
  components: {
    CrumbsNav,
    ImgModal
  },
  data() {
    return {
      dateilCrumbsArr,
      productId: '', // 获取操作详情的id
      detail: {
        expiryTime: '',
        filePath: '',
        mergerAddress: '',
        productBreed: '',
        productCategory: '',
        productName: '',
        productionCompany: '',
        productionDate: ''
      }, // 基础信息
      nodeInfoList: [],
      imgVisible: false,
      src: ''
    }
  },
  created() {
    if (this.$route.query.productId) {
      this.productId = this.$route.query.productId
      this.getTracesourceDetail(this.productId)
    }
  },
  methods: {
    // 获取详情
    getTracesourceDetail(productId) {
      getTracesourceDetail(productId).then(res => {
        console.log(res)
        if (res.success === 'Y') {
          this.detail = (res.data && res.data.productBaseInfo) || {}
          this.nodeInfoList = (res.data && res.data.nodeInfoList) || []
        } else {
          this.$message.error(res.message)
        }
      })
    },
    decode(base64) {
      return 'data:image/png;base64,' + base64
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
.wrapper {
  position: relative;
  padding: 24px 24px 0 24px;
  background: #fff;
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
</style>
