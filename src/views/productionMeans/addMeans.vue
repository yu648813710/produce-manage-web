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
        { name: '当前位置', back: false, path: '' },
        { name: '生产管理', back: false, path: '' },
        { name: '生产资料', back: false, path: '' },
        { name: '新增生产资料', back: true, path: '/productionMeans' }
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
          // this.list[1].value = res.data.enterpriseName
          // this.list[2].value = res.data.industry
          // this.list[3].value = res.data.enterpriseAddress
          // this.list[4].value = res.data.landowner
          // this.list[5].value = res.data.mobilePhone
          // this.list[6].value = res.data.reportYear + ' 年'
          // this.list[10].value = res.data.landArea + ' 亩'
          // this.list[11].value = res.data.plantArea + ' 亩'
          // this.list[12].value = res.data.cultivation
          // this.list[13].value = res.data.realOutput + ' 斤'
          // this.list[14].value = res.data.salesVolume + ' 斤'
          // this.list[15].value = res.data.salesValue + ' 元'
          // this.list[16].label = res.data.landCertificate[0]
          // this.list[16].value = res.data.landCertificate[1]
          // this.list[17].label = res.data.landCertificate[2]
          // this.list[17].value = res.data.landCertificate[3]
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
