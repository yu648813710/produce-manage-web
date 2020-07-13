<template>
  <div class="add-means">
    <MyBreadCrumb :crumbsArr="crumbsArr" style="margin-bottom: 10px;"></MyBreadCrumb>
    <div class="layout">
      <a-steps class="steps" :current="currentStep" size="default">
        <a-step title="生产资料" />
        <a-step title="生产能力" />
      </a-steps>
      <div class="content-forms">
        <div class="tag">
          <span class="title-green">┃</span>
          <span style="font-weight: bold">{{currentStep === 0 ? '生产资料' : '生产能力'}}</span>
        </div>
        <template v-if="$route.query.tag === 'new'">
          <FirstStep v-show="currentStep === 0" ref="validatorFirstStep" :info="null"/>
          <SecondStep v-show="currentStep === 1" ref="validatorSecondStep" :info="null"/>
        </template>
        <template v-else>
          <FirstStep v-if="info !== null && currentStep === 0" ref="validatorFirstStep" :info="info"/>
          <SecondStep v-if="info !== null && currentStep === 1" ref="validatorSecondStep" :info="info"/>
        </template>
      </div>
    </div>
    <div class="content-btn">
      <a-button type="primary" @click="handleNextStep">{{currentStep === 0 ? '下一步' : '上一步'}}</a-button>
      <a-button v-if="currentStep === 1" type="primary" style="margin: 0 20px" @click="handleStepCommit">提交</a-button>
      <a-button v-if="currentStep === 1" type="primary" @click="handleStepCancel">取消</a-button>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Steps, Layout, Button } from 'ant-design-vue'
import MyBreadCrumb from '@/components/crumbsNav/CrumbsNav'
import { produceMeansDetail } from '@/api/productManage'
import FirstStep from './FirstStep'
import SecondStep from './SecondStep'
Vue.use(Steps)
Vue.use(Layout)
Vue.use(Button)

export default {
  name: 'addMeans',
  components: {
    MyBreadCrumb,
    FirstStep,
    SecondStep
  },
  data() {
    return {
      crumbsArr: [
        { name: '生产资料管理', back: true, path: '/productionMeans' },
        { name: '新增生产资料', back: false, path: '' }
      ],
      currentStep: 0,
      firstStepParam: {},
      info: null
    }
  },
  created() {
    if (this.$route.query.tag === 'copy') {
      this.fetchDetail()
    }
  },
  methods: {
    fetchDetail() {
      produceMeansDetail(this.$route.query.bizId).then(res => {
        console.log('查询详情：', res)
        if (res && res.success === 'Y') {
          this.info = res.data
        }
      })
    },

    handleNextStep() {
      if (this.currentStep === 1) {
        this.currentStep = 0
        return
      }
      const pm = this.$refs.validatorFirstStep.handleNext()
      if (pm && pm.isPass === true) {
        this.currentStep = 1
        this.firstStepParam = pm.params
      } else {
        this.currentStep = 0
      }
    },

    handleStepCommit() {
      this.$refs.validatorSecondStep.handleSubmit(this.firstStepParam)
    },

    handleStepCancel() {
      history.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.add-means {
  margin: 10px 16px;
  background-color: #eee;
  .layout {
    background-color: #fff;
    // height: 100vh;
    .steps {
      padding: 20px 0;
      width: 70%;
    }
    .content-forms {
      margin: 0 16px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      .tag {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        span {
          font-size: 16px;
        }
        span:nth-child(2) {
          margin-left: 10px;
        }
      }
    }
  }
  .content-btn {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    margin: 20px 0;
  }
}
</style>
