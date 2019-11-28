<template>
  <div>
    <a-modal
      :title="title"
      :visible="visible"
			:width="width"
      @ok="handleOk"
      @cancel="handleAddCancel"
      >
      <a-form
        :form="ruleForm"
        @submit="handleOk"
        >
        <!-- 车间名称 -->
        <a-form-item
          label="车间名称"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 16 }"
          :colon="false"
          >
          <a-input
            v-if="isEdit"
            autocomplete="off"
            :value="dataEdit.blockLandName"
            :disabled="true"
          />
          <a-select
            v-else
            placeholder="请选择"
            :getPopupContainer="triggerNode => {
              return triggerNode.parentNode || document.body;
            }"
            v-decorator="[
              'shopName',
              {rules: [{ required: true, message: '请选择车间名称!' }]}
            ]"
            @change="getShopNameUser"
            >
            <a-select-option
              v-for="(item,index) in shopNameArr"
              :value="item.workshopId"
              :key="index"
            >{{item.workshopName}}</a-select-option>
          </a-select>
        </a-form-item>
        <!-- 温度 -->
        <a-form-item
          label="温度"
          style="margin-bottom: 0;"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 16 }"
          >
          <a-form-item style="display: inline-block;">
            <a-input
              autocomplete="off"
              v-decorator="[
                'temperatureInf',
                {rules: [{ required: true, message: '请输入温度!' },
                { validator: (rule, value, cb) => this.isInputTemperatureInf(rule, value, cb) }]}
              ]"
              :min="0"
            />
          </a-form-item>
          <span style="padding:0 2%;">-</span>
          <a-form-item style="display: inline-block;">
            <a-input
              autocomplete="off"
              v-decorator="[
                'temperatureSup',
                {rules: [{ required: true, message: '请输入温度!' },
                { validator: (rule, value, cb) => this.isInputTemperatureSup(rule, value, cb) }]}
              ]"
              :min="0"
            />
          </a-form-item>
          <span style="padding:0 1%;">℃</span>
        </a-form-item>
        <!-- 湿度 -->
        <a-form-item
          label="湿度"
          style="margin-bottom: 0;"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 16 }"
          >
          <!-- 不能用数字标签 -->
          <a-form-item style="display: inline-block;">
            <a-input
              autocomplete="off"
              v-decorator="[
                'dampnessInf',
                {rules: [{ required: true, message: '请输入湿度!' },
                { validator: (rule, value, cb) => this.isInputDampnessInf(rule, value, cb) }]}
              ]"
              :min="0"
            />
          </a-form-item>
          <span style="padding:0 2%;">-</span>
          <a-form-item style="display: inline-block;">
            <a-input
              autocomplete="off"
              v-decorator="[
                'dampnessSup',
                {rules: [{ required: true, message: '请输入湿度!' },
                { validator: (rule, value, cb) => this.isInputDampnessSup(rule, value, cb) }]}
              ]"
              :min="0"
            />
          </a-form-item>
          <span style="padding:0 1%;">%</span>
        </a-form-item>
        <!-- 二氧化碳 -->
        <a-form-item
          label="二氧化碳"
          style="margin-bottom: 0;"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 16 }"
          >
          <a-form-item style="display: inline-block;">
            <a-input
              autocomplete="off"
              v-decorator="[
                'co2ConcentrationInf',
                {rules: [{ required: true, message: '请输入二氧化碳!' },
                { validator: (rule, value, cb) => this.isInputCo2ConcentrationInf(rule, value, cb) }]}
              ]"
              :min="0"
              maxlength="4"
            />
          </a-form-item>
          <span style="padding:0 2%;">-</span>
          <a-form-item style="display: inline-block;">
          <a-input
            autocomplete="off"
            v-decorator="[
              'co2ConcentrationSup',
              {rules: [{ required: true, message: '请输入二氧化碳!' },
              { validator: (rule, value, cb) => this.isInputCo2ConcentrationSup(rule, value, cb) }]}
            ]"
            :min="0"
          />
          </a-form-item>
          <span style="padding:0 1%;">ppm</span>
        </a-form-item>
        <!-- 负责人 -->
        <a-form-item
          label="负责人"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 16 }"
          >
          <a-input
            autocomplete="off"
            :value="userId"
            :disabled="true"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { getListUsable, postAddWarningRule, postEditWarning } from '@/api/farmPlan.js'
export default {
  props: {
    title: {
      type: String,
      default: '新建预警',
      required: true
    },
    visible: {
      type: Boolean,
      default: false,
      required: true
    },
    // 模态框宽度
    width: {
      type: Number,
      default: 800,
      required: true
    },
    // 是否是编辑
    isEdit: {
      type: Boolean,
      default: false,
      required: true
    },
    // 编辑时之前的对象
    dataEdit: {
      default: {},
      required: true
    }
  },
  data () {
    return {
      ruleForm: this.$form.createForm(this),
      shopNameArr: [],
      temperatureInf: 0,
      temperatureSup: 0,
      dampnessInf: 0,
      dampnessSup: 0,
      co2ConcentrationInf: 0,
      co2ConcentrationSup: 0,
      userId: ''

    }
  },
  created () {
    // 获取加工车间
    this.getListUsable()
  },
  mounted () {
    if (Object.keys(this.dataEdit).length > 0 && this.isEdit) {
      this.$nextTick(() => {
        this.ruleForm.setFieldsValue({
          temperatureInf: this.dataEdit.temperatureInf,
          temperatureSup: this.dataEdit.temperatureSup,
          dampnessInf: this.dataEdit.dampnessInf,
          dampnessSup: this.dataEdit.dampnessSup,
          co2ConcentrationInf: this.dataEdit.co2ConcentrationInf,
          co2ConcentrationSup: this.dataEdit.co2ConcentrationSup
        })
        this.userId = this.dataEdit.principalUser
      })
    }
  },
  methods: {
    // 获取车间名称
    getListUsable () {
      getListUsable()
        .then(res => {
          if (res.success === 'Y') {
            this.shopNameArr = res.data
          } else {
            this.$message.error(res.message)
          }
        })
    },
    // 根据车间名称获取负责人
    getShopNameUser (value) {
      this.shopNameArr.forEach((item) => {
        if (item.workshopId === value) {
          this.userId = item.principalUser
        }
      })
    },
    // 点击新增
    handleOk () {
      this.ruleForm.validateFields((err, value) => {
        if (!err) {
          let data = [
            {
              farmType: 'ws',
              blockLandId: this.isEdit ? this.dataEdit.blockLandId : value.shopName,
              indicatorId: this.dataEdit.indicatorId,
              indicatorName: 'temperature',
              indicatorInf: value.temperatureInf,
              indicatorSup: value.temperatureSup
            },
            {
              farmType: 'ws',
              blockLandId: this.isEdit ? this.dataEdit.blockLandId : value.shopName,
              indicatorId: this.dataEdit.indicatorId,
              indicatorName: 'dampness',
              indicatorInf: value.dampnessInf,
              indicatorSup: value.dampnessSup
            },
            {
              farmType: 'ws',
              blockLandId: this.isEdit ? this.dataEdit.blockLandId : value.shopName,
              indicatorId: this.dataEdit.indicatorId,
              indicatorName: 'co2_concentration',
              indicatorInf: value.co2ConcentrationInf,
              indicatorSup: value.co2ConcentrationSup
            }
          ]
          if (this.isEdit) {
            postEditWarning(data)
              .then(res => {
                this.$emit('cancel', false)
                if (res.success === 'Y') {
                  this.handleAddCancel()
                  let parentData = {
                    inputContent: '',
                    principalUser: '',
                    pageNo: 1,
                    pageSize: 10
                  }
                  this.$parent.getTableList(parentData)
                  this.$message.success(res.message)
                } else {
                  this.$message.error(res.message)
                }
              })
          } else {
            postAddWarningRule(data)
              .then(res => {
                this.$emit('cancel', false)
                if (res.success === 'Y') {
                  this.handleAddCancel()
                  let parentData = {
                    inputContent: '',
                    principalUser: '',
                    pageNo: 1,
                    pageSize: 10
                  }
                  this.$parent.getTableList(parentData)
                  this.$message.success(res.message)
                } else {
                  this.$message.error(res.message)
                }
              })
          }
        }
      })
    },
    handleAddCancel () {
      this.$emit('cancel', false)
    },
    // 温度
    isInputTemperatureInf (rule, value, callback) {
      if (!isNaN(value) && value <= 100 && value > -100) {
        this[rule.field] = value
        if (this.temperatureSup && value > this.temperatureSup) {
          callback(new Error('左侧数值不能大于右侧数值'))
        } else {
          callback()
        }
      } else if (value) {
        callback(new Error('温度应小于等于100℃大于-100℃'))
      } else {
        callback(new Error(' '))
      }
    },
    isInputTemperatureSup (rule, value, callback) {
      if (!isNaN(value) && value <= 100 && value > -100) {
        this[rule.field] = value
        if (this.temperatureInf && this.temperatureInf > value) {
          callback(new Error('左侧数值不能大于右侧数值'))
        } else {
          callback()
        }
      } else if (value) {
        callback(new Error('温度应小于等于100℃大于-100℃'))
      } else {
        callback(new Error(' '))
      }
    },
    // 湿度
    isInputDampnessInf (rule, value, callback) {
      if (!isNaN(value) && value >= 0 && value <= 100) {
        this[rule.field] = value
        if (this.dampnessSup && value > this.dampnessSup) {
          callback(new Error('左侧数值不能大于右侧数值'))
        } else {
          callback()
        }
      } else if (value) {
        callback(new Error('湿度应大于0小于等于100%'))
      } else {
        callback(new Error(' '))
      }
    },
    isInputDampnessSup (rule, value, callback) {
      if (!isNaN(value) && value >= 0 && value <= 100) {
        this[rule.field] = value
        if (this.dampnessInf && this.dampnessInf > value) {
          callback(new Error('左侧数值不能大于右侧数值'))
        } else {
          callback()
        }
      } else if (value) {
        callback(new Error('湿度应大于0小于等于100%'))
      } else {
        callback(new Error(' '))
      }
    },
    // 二氧化碳
    isInputCo2ConcentrationInf (rule, value, callback) {
      if (!isNaN(value) && value > 0 && value < 10000) {
        this[rule.field] = value
        if (this.co2ConcentrationSup && value > this.co2ConcentrationSup) {
          callback(new Error('左侧数值不能大于右侧数值'))
        } else {
          callback()
        }
      } else if (value) {
        callback(new Error('二氧化碳最小值应大于0'))
      } else {
        callback(new Error(' '))
      }
    },
    isInputCo2ConcentrationSup (rule, value, callback) {
      if (!isNaN(value) && value > 0 && value < 10000) {
        this[rule.field] = value
        if (this.co2ConcentrationInf && this.co2ConcentrationInf > value) {
          callback(new Error('左侧数值不能大于右侧数值'))
        } else {
          callback()
        }
      } else if (value) {
        callback(new Error('二氧化碳最大值应大于0小于等于9999'))
      } else {
        callback(new Error(' '))
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
