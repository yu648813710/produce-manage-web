<template>
  <div class="add-means">
    <MyBreadCrumb :crumbsArr="crumbsArr"></MyBreadCrumb>
    <div class="layout">
      <a-steps class="steps" :current="currentStep" size="default">
        <a-step title="生产资料" />
        <a-step title="生产能力" />
      </a-steps>
      <div class="content-forms">
        <div class="tag">
          <span style="color: #3C8CFF">┃</span>
          <span style="font-weight: bold">{{currentStep === 0 ? '生产资料' : '生产能力'}}</span>
        </div>
        <FirstStep v-show="currentStep === 0" ref="validatorFirstStep"/>
        <SecondStep v-show="currentStep === 1" ref="validatorSecondStep"/>
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
        { name: '当前位置', back: false, path: '' },
        { name: '生产管理', back: false, path: '' },
        { name: '生产资料', back: false, path: '' },
        { name: '新增生产资料', back: true, path: '/productionMeans' }
      ],
      currentStep: 0,
      firstStepParam: {}
    }
  },
  methods: {
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
      this.$router.back(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.add-means {
  margin: 16px;
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
