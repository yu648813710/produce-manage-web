<template>
  <div class="reply-row">
    <a-layout>
      <a-row class="row">
        <img class="user-icon" src="./static/user_easyicon.svg" :alt="info.answerUserName" />
        <span class="user-name">{{info.answerUserName}}</span>
        <span class="common-date">{{(info.answer && info.answer.gmtCreate) || ''}}</span>
      </a-row>
      <a-row class="row">
        <span>{{(info.answer && info.answer.answerContent) || ''}}</span>
      </a-row>
      <a-row v-if="info.pictureList && info.pictureList.length > 0" class="row">
        <img class="common-img" v-for="(item, i) in info.pictureList" :key="i" :src="item" :alt="'加载中...' + i" @click="handlePreview(item)">
      </a-row>
    </a-layout>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>
<script>
import Vue from 'vue'
import { Col, Row, Button, Input, Layout, Modal } from 'ant-design-vue'
Vue.use(Col)
Vue.use(Row)
Vue.use(Button)
Vue.use(Input)
Vue.use(Layout)
Vue.use(Modal)

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
    return {
      previewVisible: false,
      previewImage: ''
    }
  },
  methods: {
    handleCancel() {
      this.previewVisible = false
    },

    handlePreview(file) {
      this.previewImage = file
      this.previewVisible = true
    }
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
    cursor: pointer;
  }
}
</style>
