<template>
  <a-modal
    :width="800"
    :maskClosable="false"
    :destroyOnClose="true"
    :confirmLoading="confirmLoading"
    :maskStyle="{background: 'transparent'}"
    v-model="isVisiable"
    @ok="handleOk"
  >
    <span slot="title" :style="{fontWeight: 700, fontSize: '16px'}">添加农资</span>
    <div v-if="iserror" :class="iserror ? 'tip-error' : ''">
      <span>{{errorMsg}}</span>
      <a-button type="link" @click.native="handleErrorX">X</a-button>
    </div>
    <a-form class="form-fields" :form="form" @submit="handleOk">
      <a-row v-if="fields" :gutter="24">
        <a-col v-for="(item, index) in fields" :key="'field' + item.id">
          <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
            <span v-if="index === 5" slot="label">
              <span :style="{color: 'red'}">*&nbsp;&nbsp;</span>
              <span>{{item.label}}</span>
            </span>
            <span v-else slot="label">{{item.label}}</span>
            <a-input
              v-if="index === 6 || index === 7"
              autocomplete="off"
              :placeholder="item.placeholder"
              v-decorator="[`field_${item.id}`, {
                rules: item.validators
              }]"
            />
            <a-row v-else-if="index === 5">
              <a-form-item
                :style="{display: 'inline-block', width: 'calc(100% - 50px)' }"
                class="inline-form-item"
              >
                <a-input
                  autocomplete="off"
                  :placeholder="item.placeholder"
                  v-decorator="[`field_${item.id}`, {
                    rules: item.validators
                  }]"
                ></a-input>
              </a-form-item>
              <span :style="{display: 'inline-block', minWidth: '24px', textAlign: 'center' }">{{unitName}}</span>
            </a-row>
            <a-auto-complete
              v-else-if="index === 0"
              :allowClear="true"
              @search="handleSearchFarmingNum"
              @select="handleSelectFarmingNum"
              :filterOption="filterOption"
              :placeholder="item.placeholder"
              v-decorator="[`select_${item.id}`, {
                rules: item.validators
              }]"
            >
              <template slot="dataSource">
                <a-select-option v-for="dsitem in item.arr" :key="dsitem.farmingPlanId">{{dsitem.farmingNum}}</a-select-option>
              </template>
            </a-auto-complete>
            <a-select
              v-else-if="index === 1 && currentFarmingPlanId !== null"
              notFoundContent="未匹配到数据"
              :getPopupContainer="triggerNode => {
                return triggerNode.parentNode || document.body;
              }"
              v-decorator="[`select_${item.id}`, {
                  rules: item.validators
                }]"
              :placeholder="item.placeholder"
            >
              <a-select-option v-for="sitem in item.arr" :key="sitem.cycleName">{{sitem.cycleName}}</a-select-option>
            </a-select>
            <a-select
              v-else-if="index === 2 && currentFarmingPlanId !== null"
              notFoundContent="未匹配到数据"
              :getPopupContainer="triggerNode => {
                return triggerNode.parentNode || document.body;
              }"
              v-decorator="[`select_${item.id}`, {
                  rules: item.validators
                }]"
              :placeholder="item.placeholder"
              @change="(e, node) => handleFarmingType(e, node)"
            >
              <a-select-option v-for="sitem in item.arr" :key="sitem.farmingTypeId" :instId="sitem.instId">{{sitem.farmingTypeName}}</a-select-option>
            </a-select>
            <a-select
              v-else-if="index === 3 && currentFarmingPlanId !== null"
              notFoundContent="未匹配到数据"
              :getPopupContainer="triggerNode => {
                return triggerNode.parentNode || document.body;
              }"
              v-decorator="[`select_${item.id}`, {
                  rules: item.validators
                }]"
              :placeholder="item.placeholder"
            >
              <a-select-option v-for="sitem in item.arr" :key="sitem.optionId">{{sitem.optionName}}</a-select-option>
            </a-select>
            <a-select
              v-else
              notFoundContent="未匹配到数据"
              :getPopupContainer="triggerNode => {
                return triggerNode.parentNode || document.body;
              }"
              v-decorator="[`select_${item.id}`, {
                  rules: item.validators
                }]"
              :placeholder="item.placeholder"
              @change="(e, it) => handleFarmingAgricultural(e, it)"
            >
              <a-select-option v-for="sitem in item.arr" :key="sitem.materialId" :unitName="sitem.unitName" :unitId="sitem.unitId">{{sitem.materialName}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>
<script>
import Vue from 'vue'
import { Input, Row, Col, Button, Table, Form, Modal, DatePicker, AutoComplete } from 'ant-design-vue'
import { columns, fields } from './config'
import {
  getMaterialNumList,
  getMaterialCycleTypeActionList,
  getMaterialAgricultural,
  addMaterialAgricultural,
  getActionsByFarmingTypeId
} from '@/api/productManage.js'
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(Table)
Vue.use(Form)
Vue.use(Modal)
Vue.use(DatePicker)
Vue.use(AutoComplete)

const unitList = []

export default {
  name: 'addPurchase',
  components: {
  },
  data () {
    return {
      unitList,
      columns,
      fields,
      form: this.$form.createForm(this, { name: 'addPurchase' }),
      isVisiable: false,
      confirmLoading: false,
      iserror: false,
      errorMsg: '',
      currentFarmingPlanId: null,
      unitName: '-',
      unitId: '',
      materialName: '',
      instId: ''
    }
  },
  watch: {
    isVisiable (oval, nval) {
      if (nval === true) {
        this.form.resetFields()
      }
    }
  },
  created() {
    this.fetchMaterialNumList('')
  },
  methods: {
    addMaterial (params) {
      let self = this
      self.confirmLoading = true
      addMaterialAgricultural(params).then(res => {
        if (res && res.success === 'Y') {
          self.confirmLoading = false
          self.isVisiable = false
          self.$message.success(res.message)
          self.$emit('refresh')
          return
        }
        setTimeout(() => {
          self.confirmLoading = false
        }, 5000)
        self.$message.error(res.message)
      })
    },

    /**
     * 查询农事计划编号
     */
    fetchMaterialNumList(farmingNum) {
      getMaterialNumList(farmingNum).then(res => {
        this.currentFarmingPlanId = null
        this.fields[0].arr = (res && res.data) || []
      })
    },

    fetchMaterialAgriculturalBy_farmingTypeId (farmingTypeId) {
      getMaterialAgricultural(farmingTypeId).then(res => {
        if (res && res.success === 'Y') {
          let dt = res.data || []
          this.fields[4].arr = dt
        }
        // this.$message.error('此农事类型下暂无农资')
      })
    },

    /**
     * 查询周期、农事类型、农事操作
     */
    fetchMaterialCycleTypeActionListBy_farmingPlanId (farmingPlanId) {
      getMaterialCycleTypeActionList(farmingPlanId).then(res => {
        console.log('list:', res)
        if (res && res.success === 'Y') {
          let dt = res.data || []
          let cycleList = []
          let farmingTypeList = []
          let cycleMap = new Map()
          dt.forEach(item => {
            if (!cycleMap.has(item.cycleName)) {
              cycleMap.set(item.cycleName, item.cycleName)
              let pm = {
                cycleId: item.cycleId || '',
                cycleName: item.cycleName || ''
              }
              cycleList.push(pm)
            }
            if (!cycleMap.has(item.farmingTypeId)) {
              cycleMap.set(item.farmingTypeId, item.farmingTypeId)
              let pm = {
                farmingTypeId: item.farmingTypeId || '',
                farmingTypeName: item.farmingTypeName || '',
                instId: item.instId
              }
              farmingTypeList.push(pm)
            }
          })
          this.fields[1].arr = cycleList || []
          this.fields[2].arr = farmingTypeList || []
        }
      })
    },

    fetchActionBy_farmingTypeId(farmingTypeId) {
      getActionsByFarmingTypeId(farmingTypeId).then(res => {
        console.log('农事操作：', res)
        if (res && res.success === 'Y') {
          this.fields[3].arr = res.data || []
        }
      })
    },

    handleSearchFarmingNum(value) {
      this.fetchMaterialNumList(value)
    },
    handleSelectFarmingNum(value, e) {
      this.currentFarmingPlanId = value
      this.fetchMaterialCycleTypeActionListBy_farmingPlanId(value)
      if (this.iserror) this.handleErrorX()
    },

    filterOption(input, option) {
      return (
        option.componentOptions.children[0] ? option.componentOptions.children[0].text.toUpperCase().indexOf(input.toUpperCase()) >= 0 : ''
      )
    },

    showError (msg) {
      this.errorMsg = msg
      this.iserror = true
    },

    handleErrorX () {
      this.iserror = false
    },

    tipConfirm (tag, msg) {
      let self = this
      if (tag === 'Y') {
        self.$message.success(msg)
        self.$emit('refresh')
        return
      }
      self.$message.error(msg)
    },

    disabledStartDate (startDate) {
      const nowDate = new Date()
      if (!startDate || !nowDate) {
        return false
      }
      return startDate.valueOf() > nowDate.valueOf()
    },

    validatorOptionName(rule, value, callback) {
      if (this.currentFarmingPlanId === null) {
        callback(new Error('请选择有效的农事计划编号'))
      }
    },

    // handleBlur (e) {
    //   if (this.currentFarmingPlanId === null) {
    //     // this.showError('请选择有效的农事计划编号')
    //     this.$message.error('请选择有效的农事计划编号')
    //   }
    // },

    handleFarmingType (id, node) {
      this.fetchMaterialAgriculturalBy_farmingTypeId(id)
      this.fetchActionBy_farmingTypeId(id)
      this.instId = (node && node.data && node.data.attrs && node.data.attrs.instId) || '-'
    },

    handleFarmingAgricultural(e, node) {
      this.materialName = (node && node.componentOptions && node.componentOptions.children[0] && node.componentOptions.children[0].text) || ''
      this.unitName = (node && node.data && node.data.attrs && node.data.attrs.unitName) || '-'
      this.unitId = (node && node.data && node.data.attrs && node.data.attrs.unitId) || ''
    },

    showModel () {
      this.isVisiable = true
    },

    handleOk (e) {
      e.preventDefault()
      console.log('eeeeeee:', e)
      this.form.validateFields((err, values, e) => {
        console.log('values:', values)
        if (!err) {
          const params = {
            planId: values.select_farmingNum,
            materialDosage: values.field_useLevel,
            materialDesc: values.field_materialDesc,
            instId: this.instId,
            materialUsage: values.field_usage,
            materialId: values.select_cooFramingMaterials,
            materialName: this.materialName,
            materialUnitId: this.unitId,
            materialUnitName: this.unitName
          }
          console.log('params:', params)
          this.addMaterial(params)
        }
      })
    }
  }
}
</script>
<style lang="less">
.tip-error {
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border: 1px solid rgb(243, 60, 60);
  background-color: #fff0ef;
  border-radius: 2px;
  span {
    margin-left: 20px;
  }
}
.show-error {
  display: block;
}
.inline-form-item {
  margin-bottom: unset;
}
</style>
