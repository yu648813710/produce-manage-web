<template>
  <div class="reply-row">
    <a-layout>
      <a-row class="row">
        <img class="user-icon" src="@/assets/image/user_easyicon.svg" :alt="info.createUser" />
        <span class="user-name">{{info.createUser}}</span>
        <span class="common-date">{{info.gmtCreate}}</span>
      </a-row>
      <a-row class="row">
        <span>{{info.answerContent}}</span>
      </a-row>
      <a-row v-if="info.filePaths && info.filePaths.length > 0" class="row">
        <img class="common-img" v-for="item in info.filePaths" :key="item.id" :src="item.url" :alt="item.url">
      </a-row>
    </a-layout>
  </div>
</template>
<script>
import Vue from 'vue'
import { Col, Row, Button, Input, Layout } from 'ant-design-vue'
Vue.use(Col)
Vue.use(Row)
Vue.use(Button)
Vue.use(Input)
Vue.use(Layout)

export default {
  name: 'replyRow',
  props: {
    info: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>
.reply-row {
  font-size: 14px;
  padding-bottom: 25px;
  margin-bottom: 25px;
  border-bottom: 1px solid #999;
  .row {
    display: flex;
    background-color: #fff;
  }
  .row:nth-child(2) {
    padding: 24px 0;
    span {
      font-size: 14px;
      text-align: left;
    }
  }
  .user-icon {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 8px;
  }
  .user-name {
    color: #000;
    margin-right: 24px;
  }
  .common-date {
    color: #999;
  }
  .common-img {
    width: 74px;
    height: 74px;
    margin-right: 16px;
  }
}
</style>
