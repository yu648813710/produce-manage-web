<template>
  <a-layout style="margin: 10px 16px;">
    <crumbsNav :crumbsArr="crumbsArr" style="margin-bottom: 10px"></crumbsNav>
    <div class="wrapper">
      <div class="title-wrapper">
        <div class="icon"></div>
        <span class="title-text">农资详情</span>
      </div>
      <div class="detail-wrapper">
        <a-row :gutter="24">
          <template v-for="item in list">
            <a-col :key="item.id" :span="12" class="detail-item">
              <span class="item-key">{{item.label}}</span>
              <span class="item-value">{{item.value}}</span>
            </a-col>
          </template>
        </a-row>
      </div>
    </div>
  </a-layout>
</template>
<script>
import Vue from 'vue'
import { Row, Col, Layout } from 'ant-design-vue'
import { toPurchaseDetail } from '@/api/productManage.js'
import crumbsNav from '@/components/crumbsNav/CrumbsNav'
Vue.use(Row)
Vue.use(Col)
Vue.use(Layout)

const list = [
  { id: '000', label: '农资名称：', value: null },
  { id: '001', label: '计划用量：', value: null },
  { id: '002', label: '农事计划编号：', value: null },
  { id: '003', label: '所属农事操作：', value: null },
  { id: '004', label: '所属周期', value: null },
  { id: '005', label: '所属基地：', value: null },
  { id: '006', label: '所属地块：', value: null },
  // { id: '007', label: '用途：', value: null },
  { id: '007', label: '农资描述：', value: null },
  { id: '008', label: '采购金额：', value: null }
]

export default {
  name: 'purchaseMngDetail',
  components: {
    crumbsNav
  },
  data () {
    return {
      list,
      crumbsArr: [
        { name: '数据管理', back: false, path: '' },
        { name: '采购管理', back: true, path: '/purchaseManagement' },
        { name: '采购管理详情', back: false, path: '' }
      ],
      bizId: this.$route.query.bizId
    }
  },
  created () {
    this.fetchDetail()
  },
  methods: {
    fetchDetail () {
      toPurchaseDetail(this.bizId).then(res => {
        if (res && res.success === 'Y') {
          const dt = res && res.data
          console.log('dt:', dt)
          list[0].value = dt.materialName
          list[1].value = dt.materialDosage + dt.materialUnitName
          list[2].value = dt.farmingNum
          list[3].value = dt.actionName
          list[4].value = dt.planCycleName
          list[5].value = dt.baseLandName
          list[6].value = dt.blockLandName
          // list[7].value = dt.materialUsage
          list[7].value = dt.materialDesc
          list[8].value = dt.purchaseMoney === null ? '0' : dt.purchaseMoney + '元'
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.wrapper {
  position: relative;
  padding: 24px 24px 0 24px;
  background: #fff;
  border-radius: 4px;

  .title-wrapper {
    display: flex;
    align-items: center;
    .title-text {
      font-size: 16px;
      font-weight: 600;
      color: #333;
      line-height: 22px;
      margin-left: 8px;
    }
    .icon {
      width: 4px;
      height: 16px;
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
      .item-img {
        width: 100px;
        height: 100px;
      }
      .hiddenWarp {
        overflow: hidden;
        width: 80%;
        overflow-wrap: inherit;
        display: inline-block;
        height: 14px;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
