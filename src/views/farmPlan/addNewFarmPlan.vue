<template>
  <div>
    <a-layout>
      <a-layout-content class="layOutContent">
        <div class="title-wrapper">
          <div class="icon"></div>
          <span class="title-text">新增农事计划</span>
        </div>
        <div class="addContent">
          <a-form :form="addForm" @submit="submit">
            <a-row>
              <a-col :span="11">
                <a-form-item label="选择产品" :label-col="{ span: 24 }" :wrapper-col="{ span: 24 }">
                  <a-select
                    placeholder="请选择"
                    class="detail-input"
                    style="width: 100%"
                    :getPopupContainer="triggerNode => {
                      return triggerNode.parentNode || document.body;
                    }"
                    @change="frameChange"
                    v-decorator="[
                    'productValue',
                    {rules: [{ required: true, message: '请选择产品!' }]}]"
                  >
                    <a-icon slot="suffixIcon" type="smile" />
                    <a-select-option
                      v-for="(item) in frameTypeArr"
                      :id="item.breedId"
                      :key="item.productId+','+item.breedId"
                    >{{item.productName}}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="11" :offset="2">
                <a-form-item label="选择种植方案" :label-col="{ span: 24 }" :wrapper-col="{ span: 24 }">
                  <a-select
                    class="detail-input"
                    placeholder="请选择"
                    style="width: 100%"
                    @change="programChange"
                    :getPopupContainer="triggerNode => {
                      return triggerNode.parentNode || document.body;
                    }"
                    v-decorator="[
                    'solutionValue',
                    {rules: [{ required: true, message: '请选择种植方案!' }]}]"
                  >
                    <a-icon slot="suffixIcon" type="smile" />
                    <a-select-option
                      v-for="(item) in frameProgramArr"
                      :key="item.solutionId"
                    >{{item.solutionName}}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="11">
                <a-form-item label="选择基地" :label-col="{ span: 24 }" :wrapper-col="{ span: 24 }">
                  <a-select
                    class="detail-input"
                    placeholder="请选择"
                    style="width: 100%"
                    :getPopupContainer="triggerNode => {
                      return triggerNode.parentNode || document.body;
                    }"
                    @change="baseChange"
                    v-decorator="[
                    'baseLandValue',
                    {rules: [{ required: true, message: '请选择基地!' }]}]"
                  >
                    <a-icon slot="suffixIcon" type="smile" />
                    <a-select-option
                      v-for="(item) in frameBaseArr"
                      :key="item.baseLandId"
                    >{{item.baseLandName}}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="11" :offset="2">
                <a-form-item label="计划开始时间" :label-col="{ span: 24 }" :wrapper-col="{ span: 24 }">
                  <a-date-picker
                    class="detail-input"
                    format="YYYY-MM-DD"
                     :getCalendarContainer="triggerNode => {
                        return triggerNode.parentNode || document.body;
                      }"
                    placeholder="请选择"
                    :disabledDate="disabledDateFn"
                    style="width: 100%"
                    @change="onTimeChange"
                    v-decorator="[
                    'planStartTime',
                    {rules: [{ required: true, message: '请选择时间!' }]}]"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="11">
                <a-form-item label="选择出库批次" :label-col="{ span: 24 }" :wrapper-col="{ span: 24 }">
                  <a-select
                    class="detail-input"
                    placeholder="请选择"
                    style="width: 100%"
                    :getPopupContainer="triggerNode => {
                      return triggerNode.parentNode || document.body;
                    }"
                    @change="bagChange"
                    v-decorator="[
                    'seedValue',
                    {rules: [{ required: true, message: '请选择菌包!' }]}]"
                  >
                    <a-icon slot="suffixIcon" type="smile" />
                    <a-select-option
                      v-for="(item) in frameBagArr"
                      :key="item.fungusBagId"
                      :value="item.fungusBagId"
                      :amount="item.amount"
                    >{{item.deliveryCode}}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="11" :offset="2">
                <a-form-item label="菌包数量" :label-col="{ span: 24 }" :wrapper-col="{ span: 24 }">
                  <a-input
                    autocomplete="off"
                    placeholder="菌包数量"
                    class="detail-input"
                    @change="seedUnitInput"
                    v-decorator="['seedUnit',
                    {rules: [{ required: true, validator:seedUnitValidator, message: '请输入正确菌包数量!' }]}]"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <div class="detail-input-wrapper" style="text-align: left">
                  <span class="detail-title">选择地块</span>
                  <div class="treeContent">
                    <div class="readyTreeContent">
                      <a-row>
                        <a-col :span="24">
                          <a-checkbox
                            :indeterminate="indeterminateBlank"
                            @change="onCheckAllChangeBlank"
                            :checked="checkAllBlank"
                          >可选</a-checkbox>
                        </a-col>
                        <a-checkbox-group @change="readyCheckChange" v-model="readyValue">
                          <a-col v-for="(item,index) in readyOptions" :span="24" :key="index">
                            <a-checkbox :value="item.blockLandId">{{item.blockLandName}}</a-checkbox>
                          </a-col>
                        </a-checkbox-group>
                      </a-row>
                    </div>
                    <div class="checkBtnGroup">
                      <div>
                        <a-button type="primary" class="add-button" @click="confirmCheck">选择</a-button>
                      </div>
                      <div>
                        <a-button type="primary" class="add-button" @click="cancleCheck">取消</a-button>
                      </div>
                    </div>
                    <div class="confirmTreeContent">
                      <a-row>
                        <a-form-item :label-col="{ span: 24 }" :wrapper-col="{ span: 24 }">
                          <a-col :span="24">
                            <a-checkbox
                              :indeterminate="indeterminateBlankCanle"
                              @change="onCheckAllChangeBlankCanle"
                              :checked="checkAllBlankCanle"
                            >可选</a-checkbox>
                          </a-col>
                          <a-checkbox-group
                            @change="confirmCheckChange"
                            v-decorator="['baseLandVals']"
                          >
                            <a-col v-for="(item,index) in checkOptions" :span="24" :key="index">
                              <a-checkbox :value="item.blockLandId">{{item.blockLandName}}</a-checkbox>
                            </a-col>
                          </a-checkbox-group>
                        </a-form-item>
                      </a-row>
                    </div>
                  </div>
                </div>
              </a-col>
              <a-col :span="6">
                <a-form-item label="种植面积" :label-col="{ span: 24 }" :wrapper-col="{ span: 24 }">
                  <a-input
                    autocomplete="off"
                    placeholder="种植面积"
                    class="detail-input"
                    v-model="farmArea"
                    disabled
                  />
                  <span class="unitLabel">亩</span>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </a-layout-content>
    </a-layout>
    <add-farm-plan-list
      :query-task-data="queryTaskData"
      @changeQueryTaskData="changeQueryTaskData"
    />
    <div class="btnGroup">
      <a-button class="save-button">
        <router-link :to="{name: 'farmPlan'}">取消</router-link>
      </a-button>
      <a-button type="primary" class="add-button" @click="submit">确定</a-button>
    </div>
  </div>
</template>
<script>
import { createUuid } from '@/utils/common.js'
import {
  selectProFarmPlan,
  selectSolutionFarmPlan,
  selectBaselandFarmPlan,
  selectFungusbagFarmPlan,
  selectBaseLandIdFarmPlan,
  addFarmPlan
} from '@/api/farmPlan.js'
import AddFarmPlanList from './components/AddFarmPlanList'
import moment from 'moment'
import Vue from 'vue'
import {
  Form,
  Row,
  Col,
  Radio,
  Button,
  Input,
  Select,
  DatePicker,
  Checkbox,
  Layout
} from 'ant-design-vue'
Vue.use(Form)
Vue.use(Layout)
Vue.use(Row)
Vue.use(Col)
Vue.use(Radio)
Vue.use(Button)
Vue.use(Input)
Vue.use(Select)
Vue.use(DatePicker)
Vue.use(Checkbox)
export default {
  name: 'baseDetail',
  components: {
    AddFarmPlanList
  },
  watch: {},
  data() {
    return {
      readyOptions: [], // 可选择数据
      checkOptions: [], // 已选择数据
      frameTypeArr: [], // 产品种类渲染数据
      frameProgramArr: [], // 种植方案渲染数据
      frameBaseArr: [], // 基地渲染数据
      frameBagArr: [], // 菌包渲染数据
      farmArea: '', // 种植面积
      frameType: {}, // 产品选择值
      programType: null,
      baseType: null,
      bagType: null,
      massifType: null,
      startDate: '',
      bagVal: '',
      readyValue: [], // 可选择的地块值
      checkValue: [], // 已经选择的地块值
      checkAllBlank: false,
      indeterminateBlank: true,
      checkAllBlankCanle: false,
      indeterminateBlankCanle: true,
      tempPlanId: '', // 页面唯一id
      queryTaskData: {
        planStartTime: '', // 计划开始日期
        solutionId: '', // 方案id
        tempPlanId: '', // 页面生成的唯一id
        changeFlag: 'Y'
      },
      addForm: this.$form.createForm(this, { name: 'addForm' })
    }
  },
  created() {
    this.requestSelctProduct() // 请求方案
    this.requestSelectBaseland() // 请求基地
    this.requestSelectFungusbag() // 请求菌包
    this.tempPlanId = createUuid()
    this.queryTaskData.tempPlanId = this.tempPlanId
  },
  methods: {
    moment,
    onTimeChange(value, dateString) {
      this.startDate = dateString
      this.queryTaskData.changeFlag =
        dateString === this.queryTaskData.planStartTime ? 'N' : 'Y'
      this.queryTaskData.planStartTime = dateString
    },
    readyCheckChange(value) {
      this.readyValue = value
      this.indeterminateBlank =
        !!value.length && value.length < this.readyOptions.length

      this.checkAllBlank = value.length === this.readyOptions.length
    },
    confirmCheckChange(value) {
      this.checkValue = value
      this.addForm.setFieldsValue({ baseLandVals: value })
      this.indeterminateBlankCanle =
        !!value.length && value.length < this.checkOptions.length

      this.checkAllBlankCanle = value.length === this.checkOptions.length
    },
    confirmCheck() {
      let checkData = this.checkOptions
      this.readyValue.map(id => {
        this.readyOptions.map((res, index) => {
          if (res.blockLandId === id) {
            checkData.push(res)
            this.readyOptions.splice(index, 1)
          }
        })
      })
      checkData.map((res, index) => {
        this.readyValue.map((resReady, resIndex) => {
          if (resReady === res.blockLandId) {
            this.readyValue.splice(resIndex, 1)
          }
        })
      })
      this.checkAllBlank = false
      this.checkOptions = checkData
      this.calcBlankArea()
    },
    calcBlankArea() {
      let result_ = 0
      this.checkOptions.map(res => {
        result_ += parseFloat(res.blockLandArea)
      })
      this.farmArea = result_
    },
    disabledDateFn(current) {
      // 配合moment插件使用
      return current && moment().startOf('day') >= current
    },
    cancleCheck() {
      if (!this.checkValue.length) {
        return false
      }
      let checkedVal = []
      this.checkValue.map((id, idIndex) => {
        checkedVal.push(id)
        this.checkOptions.map((res, resIndex) => {
          if (res.blockLandId === id) {
            this.readyOptions.push(res)
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
      this.addForm.setFieldsValue({ baseLandVals: checkedVal })
      this.checkAllBlank = false
      this.checkAllBlankCanle = false
      this.calcBlankArea()
    },
    submit() {
      this.addForm.validateFields((err, values) => {
        if (this.checkOptions.length === 0) {
          this.addForm.setFields({
            baseLandVals: { errors: [{ message: '请选择地块!' }] }
          })
        } else {
          this.addForm.setFields({ baseLandVals: { errors: [] } })
        }
        if (!err) {
          this.submitDataSet()
        }
      })
    },
    submitDataSet() {
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
        },
        tempPlanId: this.tempPlanId // 页面临时id
      }
      this.requestAddFarmPlan(postData)
    },
    frameChange(data) {
      let dataArr = data.split(',')
      this.frameType.productId = dataArr[0]
      this.frameType.breedId = dataArr[1]
      this.requestSelectSolution(this.frameType.breedId) // 请求方案
      this.addForm.setFieldsValue({ solutionValue: undefined })
    },
    programChange(data) {
      this.programType = data
      this.queryTaskData.solutionId = data
    },
    baseChange(data) {
      this.baseType = data
      this.requestSelectBaseLandId(data) // 请求地块
      this.checkOptions = []
      this.readyOptions = []
      this.readyValue = []
      this.checkValue = []
      this.checkAllBlank = false
      this.checkAllBlankCanle = false
    },
    bagChange(data, amount) {
      this.bagType = data
      this.bagVal = amount.data.attrs.amount
      this.addForm.setFieldsValue({ seedUnit: amount.data.attrs.amount })
    },
    seedUnitInput(e) {
      this.addForm.setFieldsValue({ seedUnit: e.data })
    },
    massifChange(data) {
      this.massifType = data
    },
    requestSelctProduct() {
      selectProFarmPlan().then(res => {
        if (res.code === 200) {
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
      let self_ = this
      Object.assign(this, {
        readyValue: e.target.checked
          ? self_.readyOptions.map(item => item.blockLandId)
          : [],
        indeterminateBlank: false,
        checkAllBlank: e.target.checked
      })
    },
    onCheckAllChangeBlankCanle(e) {
      let self_ = this
      Object.assign(this, {
        checkValue: e.target.checked
          ? self_.checkOptions.map(item => item.blockLandId)
          : [],
        indeterminateBlankCanle: false,
        checkAllBlankCanle: e.target.checked
      })
      this.addForm.setFieldsValue({ baseLandVals: this.checkValue })
    },
    requestAddFarmPlan(data) {
      addFarmPlan(data).then(res => {
        if (res.success === 'Y') {
          this.$router.push('/farmPlan')
        }
      })
    },
    baseLandRules(rule, value, callback) {
      if (this.checkOptions.length === 0) {
        callback(rule.message)
        return false
      }
      callback()
    },
    seedUnitValidator(rule, value, callback) {
      if (value <= 0 || value > this.bagVal) {
        callback(rule.message)
        return false
      }
      callback()
    },
    changeQueryTaskData() {
      this.queryTaskData.changeFlag = 'N'
    }
  }
}
</script>
<style scoped lang='less'>
@import './css/addNewFarmPlan.less';
</style>
