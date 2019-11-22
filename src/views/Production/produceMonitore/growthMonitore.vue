/**
周期列表页面
*/
<template>
  <div class="about">
    <a-row>
      <a-col :span="8">
        <div class="titleLeft"></div>
      </a-col>
      <a-col :span="8">
        <div class="marketTitle">柞水木耳种植基地监控总览</div>
      </a-col>
      <a-col :span="8">
        <div class="titleRight"></div>
      </a-col>
    </a-row>
    <a-row>
      <div class="warringContent">
        <div class="warrningBox">
          <div class="warrningLabel">
            <div>
              <div class="warringTitle">总累计预警</div>
              <div class="warringNum1" @click="warringDetailList(3)">{{totalWarring}}</div>
            </div>
            <div>
              <div class="warringTitle">今日新增预警</div>
              <div class="warringNum2">{{componenyType === 0 ? ghNewWarring : wsNewWarring}}</div>
            </div>
          </div>
          <div class="warringIMG">
            <div class="imgContent">
              <div
                class="warring1"
                @click="warringDetailList(2)"
              >
                <router-link :to="{name: 'massifDetail'}"></router-link>
                <div :title="'新增' + newTemperatureWarring + '条预警'">新增{{newTemperatureWarring}}条预警</div>
                <div>温度预警</div>
              </div>
              <div
                class="warring2"
                @click="warringDetailList(1)"
              >
                <div :title="'新增' + newDampnessWarring + '条预警'">新增{{newDampnessWarring}}条预警</div>
                <div>湿度预警</div>
              </div>
              <div
                v-if="componenyType !== 0"
                class="warring3"
                @click="warringDetailList(8)"
              >
                <router-link :to="{name: 'massifDetail'}"></router-link>
                <div :title="'新增' + co2NewCount + '条预警'">新增{{co2NewCount}}条预警</div>
                <div>二氧化碳预警</div>
              </div>
              <div class="pointLine1"></div>
              <div class="pointLine2"></div>
              <div class="pointLine3"></div>
              <div class="pointLine4"></div>
              <div v-if="componenyType !== 0">
                <div class="pointLine5"></div>
                <div class="pointLine6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a-row>
    <a-row style="margin-bottom: 25px;">
      <div class="warringStaticContent">
        <div class="staticEchart">
          <div class="staticLabel">累计预警详情</div>
          <div
            class="echartsContent"
            id="pieEcharts"
          ></div>
        </div>
        <div class="staticEchart">
          <div class="staticLabel">基地详情</div>
          <div class="staticTotal">
            <div class="staticNum">
              <span>大棚数量</span>
              <span>使用中</span>
              <span>{{inUseHouse}}</span>
            </div>
            <div class="staticNum">
              <span>露天地块</span>
              <span>使用中</span>
              <span>{{inUseMassif}}</span>
            </div>
          </div>
        </div>
      </div>
    </a-row>
  </div>
</template>
<script>
import Vue from 'vue'
import { Row, Col } from 'ant-design-vue'
import { growthData } from '@/api/productManage.js'
import echartsConfig from './echartsConfig'
Vue.use(Row)
Vue.use(Col)
export default {
  component: {
    // 'a-button': Button
  },
  data() {
    return {
      componenyType: 1,
      totalWarring: 0,
      ghNewWarring: 0,
      wsNewWarring: 0,
      historyTemperatureWarring: 0,
      historydampnessWarring: 0,
      newTemperatureWarring: 0,
      co2NewCount: 0,
      newDampnessWarring: 0,
      warring2: 0,
      inUseHouse: 0,
      inUseMassif: 0,
      myChart: '',
      pieData: [
        { name: '湿度', value: 0, key: 'dampness' },
        { name: '温度', value: 0, key: 'temperature' },
        { name: '二氧化碳', value: 0, key: 'co2Count' }
      ],
      timer: '',
      crumbsArr: [
        { name: '当前位置', back: false, path: '' },
        { name: '生产管理', back: false, path: '' },
        { name: '生长监控', back: true, path: '/projectCenter' },
        { name: '新增方案', back: false, path: '' }
      ]
    }
  },
  created() {},
  mounted() {
    this.checkConpanyType()
    this.getGrowthData()
    this.timer = setInterval(this.getGrowthData, 300000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    checkConpanyType() {
      if (this.componenyType === 0) {
        this.pieData.forEach((item, index) => {
          if (item.key === 'co2Count') {
            this.pieData.splice(index, 1)
          }
        })
      }
    },
    getGrowthData() {
      let type = this.componenyType === 0 ? 'gh' : 'ws'
      growthData(type).then(res => {
        this.totalWarring = res.data.alarmHistoryTotal
        this.inUseMassif = res.data.landOpenAirCount // 地块数量
        this.inUseHouse = res.data.landGreenhousesCount // 大棚数量
        this.historyTemperatureWarring = res.data.temperatureHistoryCount // 历史温度数量
        this.historydampnessWarring = res.data.dampnessHistoryCount // 历史湿度数量
        this.newTemperatureWarring = res.data.temperatureNewCount // 新增温度数量
        this.co2NewCount = res.data.co2NewCount ? res.data.co2NewCount : 0 // 新增二氧化碳数量
        this.newDampnessWarring = res.data.dampnessNewCount // 新增湿度数量
        this.warring2 = res.data.dampnessHistoryCount // 历史湿度数量
        this.ghNewWarring = this.newTemperatureWarring + this.newDampnessWarring
        this.wsNewWarring = this.newTemperatureWarring + this.newDampnessWarring + this.co2NewCount
        this.pieData[1].value = this.historyTemperatureWarring
        this.pieData[0].value = this.historydampnessWarring
        if (this.pieData[2]) {
          this.pieData[2].value = res.data.co2HistoryCount
        }
        this.initPieEcharts()
        console.log(this.pieData)
      })
    },
    initPieEcharts() {
      let self = this
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(document.getElementById('pieEcharts'))
      // 绘制图表
      echartsConfig.pieEchartsOption(this.myChart, self)
      if (this.myChart) {
        this.myChart.on('click', (params) => {
          if (params.name === '温度') {
            this.warringDetailList(5)
          } else if (params.name === '湿度') {
            this.warringDetailList(6)
          } else if (params.name === '二氧化碳') {
            this.warringDetailList(7)
          }
          console.log(params)
        })
      }
    },
    warringDetailList(index) {
      if (index === 3 || index === 5 || index === 6 || index === 7) {
        this.$router.push({
          path: 'warringList',
          query: { 'type': index }
        })
        console.log(this.$route.matched)
      } else if (index === 1 || index === 2 || index === 8) {
        this.$router.push({
          path: 'warringnewlist',
          query: { 'type': index }
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.about {
  background: url('./ststic/market_bg.png') no-repeat;
  background-size: 100% 100%;
  overflow: auto;
  min-width: 1080px;
  height: 100%;
}

.marketTitle {
  width: 100%;
  height: 65px;
  line-height: 65px;
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  color: #01fff4;
  position: relative;
}
.titleLeft {
  height: 65px;
  margin-top: 20px;
  background: url('./ststic/top_left.png') no-repeat;
  background-size: 100%;
}
.titleRight {
  height: 65px;
  margin-top: 20px;
  background: url('./ststic/top_right.png') no-repeat;
  background-size: 100%;
}
.warringStaticContent {
  height: 168px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 60px;
  .staticEchart {
    height: 168px;
    width: 514px;
    background: url('./ststic/split_bg.png') no-repeat;
    background-size: 100% 100%;
    position: relative;
    .staticLabel {
      width: 140px;
      height: 22px;
      font-size: 16px;
      font-weight: 500;
      color: rgba(255, 213, 0, 1);
      line-height: 22px;
      padding: 20px;
    }
    .echartsContent {
      min-height: 140px;
      min-width: 430px;
    }
    .staticTotal {
      margin: 40px;
      display: flex;
      .staticNum span {
        display: inline-block;
        margin-right: 20px;
        color: #94b1ee;
      }
      .staticNum span:nth-of-type(1) {
        font-size: 16px;
      }
      .staticNum span:nth-of-type(2) {
        font-size: 13px;
      }
      .staticNum span:nth-of-type(3) {
        font-size: 14px;
        color: #fff;
      }
    }
  }
}
.warringContent {
  display: flex;
  justify-content: center;
  .warrningBox {
    height: 427px;
    width: 900px;
    //border: 1px dashed #01FFF4;
    background: url('./ststic/middle_img.png') no-repeat;
    background-size: 900px 427px;
    background-position: 0 40px;
    display: flex;
    flex-wrap: wrap;
    .warrningLabel {
      width: 100%;
      height: 60px;
      padding-top: 20px;
      display: flex;
      justify-content: center;

      .warringTitle {
        width: 170px;
        height: 25px;
        font-size: 18px;
        font-weight: 500;
        color: rgba(255, 213, 0, 1);
        line-height: 25px;
      }
      .warringNum1 {
        font-size: 20px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 28px;
        cursor: pointer;
      }
      .warringNum2 {
        font-size: 20px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 28px;
      }
    }
    .warringIMG {
      height: 192px;
      width: 100%;
      display: flex;
      justify-content: center;
      .imgContent {
        width: 427px;
        position: relative;
        .warring1 {
          height: 60px;
          width: 112px;
          background-color: #ffd500;
          position: absolute;
          text-align: left;
          line-height: 20px;
          left: -94px;
          top: 46px;
          cursor: pointer;
          padding: 12px;
        }
        .warring1 div:nth-of-type(1){
          width: 88px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .warring2 div:nth-of-type(1){
          width: 88px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .warring2 {
          height: 60px;
          width: 112px;
          background-color: #ffd500;
          position: absolute;
          text-align: left;
          line-height: 20px;
          right: -24px;
          top: 76px;
          cursor: pointer;
          padding: 12px;
        }
        .warring3 {
          height: 60px;
          width: 112px;
          background-color: #ffd500;
          position: absolute;
          text-align: left;
          line-height: 20px;
          left: -12px;
          top: -54px;
          cursor: pointer;
          padding: 12px;
        }
        .pointLine1 {
          height: 2px;
          width: 30px;
          background-color: #ffd500;
          position: absolute;
          left: 17px;
          top: 75px;
        }
        .pointLine5{
          height: 2px;
          width: 30px;
          background-color: #ffd500;
          position: absolute;
          left: 99px;
          top: -24px;
        }
        .pointLine6 {
          height: 2px;
          width: 100px;
          background-color: #ffd500;
          position: absolute;
          transform: rotate(80deg);
          left: 88px;
          top: 24px;
        }
        .pointLine2 {
          height: 2px;
          width: 100px;
          background-color: #ffd500;
          position: absolute;
          transform: rotate(80deg);
          left: 6px;
          top: 124px;
        }
        .pointLine3 {
          height: 2px;
          width: 30px;
          background-color: #ffd500;
          position: absolute;
          right: 88px;
          top: 108px;
        }
        .pointLine4 {
          height: 2px;
          width: 100px;
          background-color: #ffd500;
          position: absolute;
          transform: rotate(-80deg);
          right: 76px;
          top: 157px;
        }
      }
    }
  }
}
</style>
