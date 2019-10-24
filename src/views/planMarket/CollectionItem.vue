<template>
  <div class="collection-item">
    <a-card :title="info.solutionName" class="card-item">
      <a slot="extra" @click="toDetail(info)">查看详情</a>
      <a-row class="card-item-row">
        <span>服务商：</span>
        <span>{{info.companyName}}</span>
      </a-row>
      <a-row class="card-item-row">
        <span>产品品类：</span>
        <span>{{info.categoryName}}</span>
      </a-row>
      <a-row class="card-item-row">
        <span>产品品种：</span>
        <span>{{info.breedName}}</span>
      </a-row>
      <a-row class="card-item-row">
        <span>创建时间：</span>
        <span>{{cmpTime(info.gmtCreate)}}</span>
      </a-row>
    </a-card>
  </div>
</template>

<script>
import Vue from 'vue'
import { Card, Row } from 'ant-design-vue'
import formDate from '@/utils/domUtil'
Vue.use(Card)
Vue.use(Row)
export default {
  name: 'collectionItem',
  props: {
    info: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
    }
  },
  methods: {
    toDetail(info) {
      this.$router.push({ path: `/planMarketDetail/${info.solutionId}` })
    },
    cmpTime(time) {
      return formDate.formDate(time)
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ .ant-card-head-title {
  text-align: start;
}
.collection-item {
  .card-item {
    margin: 10px 0;
    &-row {
      display: flex;
      color: #000;
      margin: 5px 0;
      span:nth-child(1) {
        min-width: 70px;
        text-align: left;
        color: #999;
      }
    }
  }
}
</style>
