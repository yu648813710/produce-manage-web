<template>
  <div>
    <a-layout>
      <a-layout-content class="layOutContent">
        <div class="title-wrapper">
          <div class="icon"></div>
          <span class="title-text">新增农事计划</span>
        </div>
        <div class="addContent">
          <a-row>
            <a-col :span="11">
              <div class="detail-input-wrapper">
                <span class="detail-title">选择产品</span>
                <a-select
                  class="detail-input"
                  placeholder="请选择"
                  style="width: 100%"
                  @change="frameChange"
                >
                  <a-icon
                    slot="suffixIcon"
                    type="smile"
                  />
                  <a-select-option
                    v-for="(item) in frameTypeArr"
                    :id="item.breedId"
                    :key="item.productId+','+item.breedId"
                  >{{item.productName}}</a-select-option>
                </a-select>
              </div>
            </a-col>
            <a-col
              :span="11"
              :offset="2"
            >
              <div class="detail-input-wrapper">
                <span class="detail-title">选择种植方案</span>
                <a-select
                  class="detail-input"
                  placeholder="请选择"
                  style="width: 100%"
                  @change="programChange"
                >
                  <a-icon
                    slot="suffixIcon"
                    type="smile"
                  />
                  <a-select-option
                    v-for="(item) in frameProgramArr"
                    :key="item.solutionId"
                  >{{item.solutionName}}</a-select-option>
                </a-select>
              </div>
            </a-col>
            <a-col :span="11">
              <div class="detail-input-wrapper">
                <span class="detail-title">选择基地</span>
                <a-select
                  class="detail-input"
                  placeholder="请选择"
                  style="width: 100%"
                  @change="baseChange"
                >
                  <a-icon
                    slot="suffixIcon"
                    type="smile"
                  />
                  <a-select-option
                    v-for="(item) in frameBaseArr"
                    :key="item.baseLandId"
                  >{{item.baseLandName}}</a-select-option>
                </a-select>
              </div>
            </a-col>
            <a-col
              :span="11"
              :offset="2"
            >
              <div class="detail-input-wrapper">
                <span class="detail-title">计划开始时间</span>
                <a-date-picker
                  class="detail-input"
                  showTime
                  format="YYYY-MM-DD"
                  placeholder="请选择时间"
                  @change="onTimeChange"
                  @ok="onOk"
                />
              </div>
            </a-col>
            <a-col :span="11">
              <div class="detail-input-wrapper">
                <span class="detail-title">选择菌包</span>
                <a-select
                  class="detail-input"
                  placeholder="请选择"
                  style="width: 100%"
                  @change="bagChange"
                >
                  <a-icon
                    slot="suffixIcon"
                    type="smile"
                  />
                  <a-select-option
                    v-for="(item) in frameBagArr"
                    :key="item.fungusBagId"
                  >{{item.fungusBagName}}</a-select-option>
                </a-select>
              </div>
            </a-col>
            <a-col
              :span="11"
              :offset="2"
            >
              <div class="detail-input-wrapper">
                <span class="detail-title">菌包数量</span>
                <a-input
                  placeholder="Basic usage"
                  class="detail-input"
                  v-model="bagVal"
                />
              </div>
            </a-col>
            <a-col :span="24">
              <div
                class="detail-input-wrapper"
                style="text-align: left"
              >
                <span class="detail-title">选择地块</span>
                <div class="treeContent">
                  <div class="readyTreeContent">
                    <!--                    <a-checkbox-group :options="readyOptions" v-model="readyValue" />-->
                    <a-row>
                      <a-col :span="24">
                        <a-checkbox
                          :indeterminate="indeterminateBlank"
                          @change="onCheckAllChangeBlank"
                          :checked="checkAllBlank"
                        >可选</a-checkbox>
                      </a-col>
                      <a-checkbox-group
                        @change="readyCheckChange"
                        v-model="readyValue"
                      >
                        <a-col
                          v-for="(item,index) in readyOptions"
                          :span="24"
                          :key="index"
                        >
                          <a-checkbox :value="item.blockLandId">{{item.blockLandName}}</a-checkbox>
                        </a-col>
                      </a-checkbox-group>
                    </a-row>
                  </div>
                  <div class="checkBtnGroup">
                    <div>
                      <a-button
                        type="primary"
                        class="add-button"
                        @click="confirmCheck"
                      >选择</a-button>
                    </div>
                    <div>
                      <a-button
                        type="primary"
                        class="add-button"
                        @click="cancleCheck"
                      >取消</a-button>
                    </div>
                  </div>
                  <div class="confirmTreeContent">
                    <a-row>
                      <a-col :span="24">
                        <a-checkbox
                          :indeterminate="indeterminateBlankCanle"
                          @change="onCheckAllChangeBlankCanle"
                          :checked="checkAllBlankCanle"
                        >可选</a-checkbox>
                      </a-col>
                      <a-checkbox-group
                        @change="confirmCheckChange"
                        v-model="checkValue"
                      >
                        <a-col
                          v-for="(item,index) in checkOptions"
                          :span="24"
                          :key="index"
                        >
                          <a-checkbox :value="item.blockLandId">{{item.blockLandName}}</a-checkbox>
                        </a-col>
                      </a-checkbox-group>
                    </a-row>
                  </div>
                </div>
              </div>
            </a-col>
            <a-col :span="6">
              <div class="detail-input-wrapper">
                <span class="detail-title">种植面积</span>
                <a-input
                  placeholder="Basic usage"
                  class="detail-input"
                  v-model="farmArea"
                  disabled
                />
                <span class="unitLabel">亩</span>
              </div>
            </a-col>
          </a-row>
        </div>
      </a-layout-content>
    </a-layout>
    <div class="btnGroup">
      <a-button
        type="primary"
        class="save-button"
        @click="save"
      >
        <router-link :to="{name: 'farmPlan'}">取消</router-link>
      </a-button>
      <a-button
        type="primary"
        class="add-button"
        @click="submit"
      >确定</a-button>
    </div>
  </div>
</template>

<script>
import {
  selectProFarmPlan,
  selectSolutionFarmPlan,
  selectBaselandFarmPlan,
  selectFungusbagFarmPlan,
  selectBaseLandIdFarmPlan,
  addFarmPlan
} from '@/api/farmPlan.js'

import moment from 'moment'
import Vue from 'vue'
import {
  Table,
  Row,
  Col,
  Steps,
  Radio,
  icon,
  Modal,
  Button,
  Input,
  Select,
  DatePicker,
  Checkbox,
  Layout
} from 'ant-design-vue'
const readyOptions = [
  // { blockLandName: '地块1', blockLandId: 1 },
  // { blockLandName: '地块2', blockLandId: 2 },
  // { blockLandName: '地块3', blockLandId: 3 },
  // { blockLandName: '地块4', blockLandId: 4 }
]
Vue.use(Layout)
Vue.use(Row)
Vue.use(Col)
Vue.use(Steps)
Vue.use(Radio)
Vue.use(icon)
Vue.use(Modal)
Vue.use(Button)
Vue.use(Input)
Vue.use(Select)
Vue.use(Table)
Vue.use(DatePicker)
Vue.use(Checkbox)
export default {
  name: 'baseDetail',
  watch: {},
  data() {
    return {
      readyOptions,
      checkOptions: [],
      frameTypeArr: [{ label: '木耳', value: 1 }],
      frameProgramArr: [{ label: '种植方案', value: 1 }],
      frameBaseArr: [{ label: '种植基地', value: 1 }],
      frameBagArr: [{ label: '菌包类型', value: 1 }],
      frameMassifArr: [{ label: '地块类型', value: 1 }],
      farmArea: '',
      frameType: {}, // 产品选择值
      programType: null,
      baseType: null,
      bagType: null,
      massifType: null,
      startDate: '',
      bagVal: '',
      readyValue: [],
      checkValue: [],
      checkAllBlank: false,
      indeterminateBlank: true,
      checkAllBlankCanle: false,
      indeterminateBlankCanle: true
    }
  },
  created() {
    this.requestSelctProduct() // 请求方案
    this.requestSelectBaseland() // 请求基地
    this.requestSelectFungusbag() // 请求菌包
  },
  methods: {
    moment,
    onTimeChange(value, dateString) {
      this.startDate = dateString
    },
    onOk(value) {
      console.log('onOk: ', value)
    },
    readyCheckChange(value) {
      this.readyValue = value
      this.indeterminateBlank =
        !!value.length && value.length < this.readyOptions.length

      this.checkAllBlank = value.length === this.readyOptions.length
    },
    confirmCheckChange(value) {
      this.checkValue = value

      this.indeterminateBlankCanle =
        !!value.length && value.length < this.checkOptions.length

      this.checkAllBlankCanle = value.length === this.checkOptions.length
    },
    confirmCheck() {
      let checkData = []
      this.readyValue.map(id => {
        this.readyOptions.map(res => {
          if (res.blockLandId === id) {
            checkData.push(res)
          }
        })
      })
      this.calcBlankArea(this.readyValue)
      this.checkOptions = checkData
    },
    calcBlankArea(val) {
      let result_ = 0
      val.map(id => {
        this.readyOptions.map(res => {
          if (res.blockLandId === id) {
            result_ += parseFloat(res.blockLandArea)
          }
        })
      })
      console.log(result_)
      this.farmArea = result_
    },
    cancleCheck() {
      if (!this.checkValue.length) {
        return false
      }
      let checkedVal = []
      this.checkValue.map((id, idIndex) => {
        checkedVal.push(id)
        this.readyValue.map((res, resIndex) => {
          if (res === id) {
            this.readyValue.splice(resIndex, 1)
          }
        })
        this.checkOptions.map((res, resIndex) => {
          if (res.blockLandId === id) {
            this.checkOptions.splice(resIndex, 1)
          }
        })
        checkedVal.map((res, index) => {
          if (res === id) {
            checkedVal.splice(index, 1)
          }
        })
      })
      this.checkValue = checkedVal
      this.checkAllBlank = false
      this.checkAllBlankCanle = false
    },
    async save() {},
    submit() {
      let massifType = []
      for (let i = 0; i < this.checkOptions.length; i++) {
        massifType.push(this.checkOptions[i].value)
      }
      let that = this
      let postData = {
        baseLandValue: {
          baseLandId: that.baseType, // 基地id
          baseLandName: that.frameBaseArr.filter(
            res => res.baseLandId === that.baseType
          )[0].baseLandName
        }, // 基地名称
        blockLandValues: that.checkOptions.map(res => {
          return {
            landId: res.blockLandId,
            landName: res.blockLandName
          }
        }),
        productValue: {
          productId: that.frameType.productId, // 产品id
          productName: that.frameTypeArr.filter(
            res => res.productId === that.frameType.productId
          )[0].productName // 产品名称
        },
        seedValue: {
          seedId: that.bagType, // 菌包id
          seedName: that.frameBagArr.filter(
            res => res.fungusBagId === that.bagType
          )[0].fungusBagName, // 菌包名称
          seedUnit: {
            amount: that.bagVal // 菌包数量
          }
        },
        solutionValue: {
          solutionId: that.programType, // 种植方案id
          solutionName: that.frameProgramArr.filter(
            res => res.solutionId === that.programType
          )[0].solutionName // 种植方案名称
        },
        planStartTime: that.startDate,
        plantValue: {
          amount: that.farmArea
        }
      }
      console.log('submit', postData)
      this.requestAddFarmPlan(postData)
    },
    frameChange(data) {
      let dataArr = data.split(',')
      this.frameType.productId = dataArr[0]
      this.frameType.breedId = dataArr[1]
      console.log(data)
      this.requestSelectSolution(this.frameType.breedId) // 请求方案
    },
    programChange(data) {
      this.programType = data
      console.log(data)
    },
    baseChange(data) {
      this.baseType = data
      this.requestSelectBaseLandId(data) // 请求地块
      console.log(data)
    },
    bagChange(data) {
      this.bagType = data
      console.log(data)
    },
    massifChange(data) {
      this.massifType = data
      console.log(data)
    },
    requestSelctProduct() {
      selectProFarmPlan().then(res => {
        if (res.code == 200) {
          this.frameTypeArr = res.data
        }
      })
    },
    requestSelectSolution(breedId) {
      selectSolutionFarmPlan(breedId).then(res => {
        if (res.code === 200) {
          this.frameProgramArr = res.data
        }
      })
    },
    requestSelectBaseland() {
      selectBaselandFarmPlan().then(res => {
        if (res.code === 200) {
          this.frameBaseArr = res.data
        }
      })
    },
    requestSelectFungusbag() {
      selectFungusbagFarmPlan().then(res => {
        if (res.code === 200) {
          this.frameBagArr = res.data
        }
      })
    },
    requestSelectBaseLandId(baseLandId) {
      selectBaseLandIdFarmPlan(baseLandId).then(res => {
        if (res.code === 200) {
          this.readyOptions = res.data
        }
      })
    },
    onCheckAllChangeBlank(e) {
      Object.assign(this, {
        readyValue: e.target.checked
          ? readyOptions.map(item => item.blockLandId)
          : [],
        indeterminateBlank: false,
        checkAllBlank: e.target.checked
      })
    },
    onCheckAllChangeBlankCanle(e) {
      Object.assign(this, {
        checkValue: e.target.checked
          ? readyOptions.map(item => item.blockLandId)
          : [],
        indeterminateBlankCanle: false,
        checkAllBlankCanle: e.target.checked
      })
    },
    requestAddFarmPlan(data) {
      addFarmPlan(data).then(res => {
        if (res.success === 'Y') {
          this.$router.push('/farmPlan/farmPlan')
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.layOutContent {
  position: relative;
  padding: 24px 24px 0 24px;
  background: #fff;
  margin: 16px;
  border-radius: 4px;
}
.unitLabel {
  position: absolute;
  right: -25px;
  margin-top: 40px;
}
.treeContent {
  display: flex;
  padding-top: 30px;
  /deep/.ant-checkbox-group-item {
    display: block;
  }
  .readyTreeContent {
    width: 15%;
    border: 1px solid #d9d9d9;
    padding: 10px;
  }
  .confirmTreeContent {
    width: 15%;
    border: 1px solid #d9d9d9;
    padding: 10px;
  }
  .checkBtnGroup {
    width: 65px;
    margin: 0 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .add-button {
      margin-bottom: 30px;
    }
  }
}
.title-wrapper {
  text-align: left;

  .title-text {
    font-size: 16px;
    color: #333;
    line-height: 22px;
    margin-left: 8px;
  }
  .icon {
    width: 2px;
    height: 14px;
    background: rgba(60, 140, 255, 1);
    border-radius: 1px;
    display: inline-block;
  }
}
.addContent {
  position: relative;
  padding: 24px;
  background: #fff;
  min-height: 360px;
  border-radius: 4px;

  .detail-input-wrapper {
    position: relative;
    margin-bottom: 24px;

    .detail-title {
      position: absolute;
      left: 0;
      color: #333;
      font-size: 14px;
    }
    /deep/.ant-calendar-picker {
      width: 100% !important;
    }
    /deep/.ant-select-enabled {
      margin-top: 30px;
    }

    .detail-input {
      margin-top: 30px;
    }
  }
}
.btnGroup {
  text-align: right;
  margin: 16px;
  .save-button {
    margin-right: 15px;
    background-color: #fff;
    color: #333;
    border-color: #d9d9d9;
  }
}
</style>
