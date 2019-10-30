<template>
  <div>
    <a-layout style="margin: 16px;background: #eee;">
      <MyBreadCrumb :crumbsArr="breadcrumbs"></MyBreadCrumb>
      <div>
        <!-- 评论输入区 -->
        <div class="edit-block">
          <a-card class="edit-card">
            <a-row slot="title">
              <template v-if="questionInfo.question">
                  <a-icon type="question-circle" theme="filled" style="color:#3C8CFF;margin-right:12px;font-size:20px"/>
                  <span>{{questionInfo.question.questionContent}}</span>
                  <a-button class="tag-btn" size="small" v-for="item in [{id: '000', type: 0, name: questionInfo.question.breedName},{id: '001', type: 1, name: questionInfo.question.targetClazz}]" :key="item.id" :style="{backgroundColor: cmpTagColor(item.type), color: '#fff'}">{{item.name}}</a-button>
              </template>
            </a-row>
            <span v-if="questionInfo.question" slot="extra" style="color: #999">{{questionInfo.question.gmtCreate}}</span>
            <a-spin :spinning="isRepling">
              <a-row class="edit-card-row">
                <img class="edit-icon" src="@/assets/image/user_easyicon.svg" alt="用户">
                <div class="commen-block">
                  <a-textarea class="textarea" placeholder="请输入评论/回复" maxlength="500" :autosize="{minRows: 4, mxRows: 6}" v-model="answerContent" @change="handleReply"></a-textarea>
                  <div class="imgs-btns-block">
                    <a-row class="imgs-block">
                      <img class="edit-img" v-for="im in fileList" :key="im.uid"  :src="im.url" alt="上传中..." @click="handlePreview(im)">
                      <a-upload
                        :customRequest="selfUpload"
                        :beforeUpload="beforeUpload"
                        listType="picture-card"
                        :fileList="fileList"
                        :showUploadList="false"
                        @preview="handlePreview"
                        @change="handleChange"
                      >
                        <div v-if="fileList.length < 9">
                          <a-icon :type="uploadLoading ? 'loading' : 'plus'" />
                          <div class="ant-upload-text">上传</div>
                        </div>
                      </a-upload>
                      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                        <img alt="example" style="width: 100%" :src="previewImage" />
                      </a-modal>
                    </a-row>
                    <a-row class="btns-block">
                      <!-- <a-button style="margin-right: 12px">取消</a-button> -->
                      <a-button type="primary" @click.native="addReply">发布</a-button>
                    </a-row>
                  </div>
                </div>
              </a-row>
            </a-spin>
          </a-card>
        </div>
        <!-- 回复展示区 -->
        <a-spin :spinning="isSpinning">
          <div class="reply-block">
            <a-card class="reply-card">
              <span slot="title">▍<span>全部回复</span></span>
              <ul>
                <ReplyRow v-for="(item, i) in replyList" :key="'reply' + i" :info="item"></ReplyRow>
              </ul>
            </a-card>
          </div>
        </a-spin>
      </div>
      <a-pagination
        class="pagination"
        showSizeChanger
        showQuickJumper
        :defaultCurrent="1"
        :total="total"
        @change="pageOnChange"
        @showSizeChange="pageSizeOnChange"
      />
    </a-layout>
  </div>
</template>

<script>
import MyBreadCrumb from '@/components/crumbsNav/CrumbsNav'
import ReplyRow from './ReplyRow'
import axios from 'axios'
import Vue from 'vue'
import { Col, Row, Button, Input, Layout, Pagination, Card, Spin, Icon, Upload, Modal } from 'ant-design-vue'
import { knowledgeQuizDetail, addKnowledgeQuizReply } from '@/api/productManage'
Vue.use(Col)
Vue.use(Row)
Vue.use(Button)
Vue.use(Input)
Vue.use(Layout)
Vue.use(Pagination)
Vue.use(Card)
Vue.use(Spin)
Vue.use(Icon)
Vue.use(Upload)
Vue.use(Modal)

const breadcrumbs = [
  { name: '方案管理', back: false, path: '' },
  { name: '知识库问答', back: false, path: '' },
  { name: '详情', back: false, path: '' }
]

const replyList = []

export default {
  name: 'knowledgeQuizDetail',
  components: {
    MyBreadCrumb,
    ReplyRow
  },
  data() {
    return {
      breadcrumbs,
      pageNo: 0,
      pageSize: 10,
      total: 0,
      pagination: {},
      questionId: '',
      replyList,
      questionInfo: {},
      isSpinning: false,
      isRepling: false,
      answerContent: '',
      uploadLoading: false,

      previewVisible: false,
      previewImage: '',
      fileList: []
    }
  },
  created() {
    this.questionId = this.$route.query.questionId
    if (this.questionId) {
      this.fetchDetail()
    } else {
      this.$message.error('详情ID为空！')
    }
  },
  methods: {
    fetchDetail() {
      let postData = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        questionId: this.questionId
      }
      this.isSpinning = true
      knowledgeQuizDetail(postData).then(res => {
        this.isSpinning = false
        if (res && res.success === 'Y') {
          this.total = (res.data && res.data.answers && res.data.answers.total) || 0
          this.replyList = (res.data.answers && res.data.answers.records) || []
          this.questionInfo = (res.data && res.data.question) || {}
          return
        }
        this.replyList = []
        this.questionInfo = {}
      })
    },

    addReply() {
      let self = this
      let files = []
      this.isRepling = true
      this.fileList.forEach(item => {
        files.push(item.url)
      })
      let params = {
        answerContent: this.answerContent,
        questionId: this.questionId,
        filePaths: files
      }
      addKnowledgeQuizReply(params).then(res => {
        setTimeout(() => {
          self.isRepling = false
        }, 1000)
        if (res && res.success === 'Y') {
          self.fetchDetail()
          self.$message.success(res.message)
          self.answerContent = ''
          self.fileList = []
          return
        }
        self.$message.error(res.message)
      })
    },

    cmpTagColor(tag) {
      return tag === 0 ? '#5ABB3C'
        : tag === 1 ? '#FF9801' : '#5ABB3C'
    },

    handleReply(e) {
      this.answerContent = e.target.value || ''
    },

    pageOnChange(current) {
      const pager = { ...this.pagination }
      pager.current = current
      this.pagination = pager
      this.pageNo = pager.current
      this.fetchDetail({})
    },

    pageSizeOnChange(curr, pageSize) {
      const pager = { ...this.pagination }
      pager.pageSize = pageSize
      this.pagination = pager
      this.pageNo = 0
      this.pageSize = pager.pageSize
      this.fetchDetail({})
    },

    // 上传文件之前的钩子
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJPG) {
        this.$message.error('请上传 jpg 或 png 格式的图片')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('图片大小必须小于 2MB!')
      }
      return isJPG && isLt2M
    },

    selfUpload({ action, file, onSuccess, onError, onProgress }) {
      let self = this
      let formData = new FormData()
      formData.append('file', file)
      axios
        .post('http://172.21.128.125:9090/produce/oss/fileUpload', formData)
        .then(res => {
          self.uploadLoading = false
          if (res.data.success === 'Y') {
            self.fileList[self.fileList.length - 1].status = 'done'
            self.fileList[self.fileList.length - 1].url = res.data.data
          }
        })
    },

    handleCancel() {
      this.previewVisible = false
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange(file) {
      this.fileList = file.fileList
      if (file.file.status === 'uploading') {
        this.uploadLoading = true
      }
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
/deep/ .ant-upload.ant-upload-select-picture-card {
  width: 74px;
  height: 74px;
  margin: 0;
}

.edit-block {
  .edit-card {
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
            display: flex;
            padding-top: 10px;
            .ant-upload-select-picture-card {
              width: 74px;
              height: 74px;
            }
            .ant-upload-select-picture-card i {
              font-size: 32px;
              color: #999;
            }

            .ant-upload-select-picture-card .ant-upload-text {
              color: #666;
            }
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
        cursor: pointer;
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

.pagination {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
</style>
