<template>
  <div>
    <a-layout style="margin: 16px;background: #eee;">
      <MyBreadCrumb :crumbsArr="breadcrumbs"></MyBreadCrumb>
      <div>
        <!-- 评论输入区 -->
        <div class="edit-block">
          <a-card class="edit-card">
            <a-row slot="title">
              <span>info.solutionName</span>
              <a-button class="tag-btn" size="small" v-for="item in [{id: '000', type: 0, name: '黑木耳'},{id: '001', type: 1, name: '害虫病'}]" :key="item.id" :style="{backgroundColor: cmpTagColor(item.type), color: '#fff'}">{{item.name}}</a-button>
            </a-row>
            <span slot="extra" style="color: #999">2019-10-22 15:45</span>
            <a-row class="edit-card-row">
              <img class="edit-icon" src="@/assets/image/logo.png" alt="用户">
              <div class="commen-block">
                <a-textarea class="textarea" placeholder="请输入评论/回复" :autosize="{minRows: 4, mxRows: 6}" @change="handleReply"></a-textarea>
                <div class="imgs-btns-block">
                  <a-row class="imgs-block">
                    <img class="edit-img" src="@/assets/image/logo.png" alt="~">
                    <img class="edit-img" src="@/assets/image/logo.png" alt="~">
                  </a-row>
                  <a-row class="btns-block">
                    <a-button>取消</a-button>
                    <a-button style="margin: 0 12px">上传附件</a-button>
                    <a-button type="primary">发布</a-button>
                  </a-row>
                </div>
              </div>
            </a-row>
          </a-card>
        </div>
        <!-- 回复展示区 -->
        <div class="reply-block">
          <a-card class="reply-card">
            <span slot="title">▍<span>全部回复</span></span>
            <ul>
              <ReplyRow v-for="item in replyList" :key="item.id" :info="item"></ReplyRow>
            </ul>
          </a-card>
        </div>
      </div>
    </a-layout>
  </div>
</template>

<script>
import MyBreadCrumb from "@/components/crumbsNav/CrumbsNav";
import ReplyRow from './ReplyRow';
import Vue from "vue";
import { Col, Row, Button, Input, Layout, Pagination, Card, message } from "ant-design-vue";
Vue.use(Col);
Vue.use(Row);
Vue.use(Button);
Vue.use(Input);
Vue.use(Layout);
Vue.use(Pagination);
Vue.use(Card);

const breadcrumbs = [
  { name: "方案管理", back: false, path: "" },
  { name: "知识库问答", back: false, path: "" },
  { name: "详情", back: false, path: "" }
];

const replyList = [
  { 
    id: '000', 
    userIcon: 'http://img.redocn.com/sheji/20171013/BG1kejifengbeijingsucai_8786105.jpg', 
    userName: '罗沈季', 
    date: '2019-10-22 16:21', 
    desc: '这只是一段文字介绍，这只是一段文字介绍', 
    imgs: [
      {id: '000', url: 'http://img.redocn.com/sheji/20171013/BG1kejifengbeijingsucai_8786105.jpg'}, 
      {id: '001', url: 'http://img.redocn.com/sheji/20171013/BG1kejifengbeijingsucai_8786105.jpg'}, 
      {id: '002', url: 'http://img.redocn.com/sheji/20171013/BG1kejifengbeijingsucai_8786105.jpg'}, 
      {id: '003', url: 'http://img.redocn.com/sheji/20171013/BG1kejifengbeijingsucai_8786105.jpg'}
    ]
  },
  { 
    id: '001', 
    userIcon: 'http://img.redocn.com/sheji/20171013/BG1kejifengbeijingsucai_8786105.jpg', 
    userName: '薛灵灵', 
    date: '2019-10-22 16:21', 
    desc: '这只是一段文字介绍，这只是一段文字介绍', 
    imgs: [
      {id: '000', url: 'http://img.redocn.com/sheji/20171013/BG1kejifengbeijingsucai_8786105.jpg'}, 
      {id: '001', url: 'http://img.redocn.com/sheji/20171013/BG1kejifengbeijingsucai_8786105.jpg'}, 
      {id: '002', url: 'http://img.redocn.com/sheji/20171013/BG1kejifengbeijingsucai_8786105.jpg'}, 
      {id: '003', url: 'http://img.redocn.com/sheji/20171013/BG1kejifengbeijingsucai_8786105.jpg'}
    ]
  }
]

export default {
  name: 'knowledgeQuizDetail',
  components: {
    MyBreadCrumb,
    ReplyRow
  },
  data() {
    return {
      breadcrumbs,
      replyList
    }
  },
  methods: {
    cmpTagColor(tag) {
      return tag === 0 ? '#5ABB3C' : 
             tag === 1 ? '#FF9801' : '#5ABB3C' 
    },

    handleReply(e) {
      console.log('评论内容：', e.target.value)
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ .ant-card-head {
  border: none;
  .ant-card-head-wrapper {
    border-bottom: 1px solid #e8e8e8;
  }
  .ant-card-head-title {
    text-align: start;
  }
}

.edit-block {
  .edit-card {
    margin: 10px 0;
    .tag-btn {
      margin: 0 10px;
      border: none;
      border-radius: 0;
    }
    &-row {
      color: #000;
      margin: 5px 0;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
      .commen-block {
        border: 1px solid #eee;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        padding: 10px;
        .textarea {
          border: none;
          background-color: #efefef;
          padding: 10px;
        }
        .imgs-btns-block {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          .imgs-block {
            padding-top: 10px;
          }
          .btns-block {
            top: 30px;
          }
        }
      }
      .edit-icon {
        width: 24px;
        height: 24px;
        margin-right: 10px;
      }
      .edit-img {
        width: 74px;
        height: 74px;
        margin-right: 16px;
      }
      span:nth-child(1) {
        min-width: 70px;
        text-align: left;
        color: #999;
      }
    }
  }
}

.reply-block {
  .reply-card {
    span {
      color: #3C8CFF;
      font-size: 14px;
      span {
        color: #000;
        font-weight: bold;
      }
    }
  }
}
</style>