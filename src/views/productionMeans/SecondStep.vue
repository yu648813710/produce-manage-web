<template>
  <div class="second-step">
    <a-form class="form-fields" :form="form" @submit="handleSubmit">
      <a-row :gutter="24">
        <a-col
          v-for="(item, index) in fieldsStep2"
          :key="'field' + item.id"
          :span="12"
        >

            <a-form-item>
            <span slot="label" style="color: red">*<span style="color: #000">{{item.label}}</span></span>
              <span>
                <a-form-item style="display:inline-block;width:calc(100% - 20px)">
                  <a-input
                    autocomplete="off"
                    :placeholder="item.placeholder"
                    v-decorator="[`field_${item.id}`, {
                      rules: item.validators
                    }]"
                  />
                </a-form-item>
                {{index === 2 ? '元' : '斤'}}
              </span>
            </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script>
import Vue from 'vue'
import { Form, Row, Col, Select, Input, Button, Icon } from 'ant-design-vue'
import { fieldsStep2 } from './config'
import { produceMeansAdd } from '@/api/productManage'
Vue.use(Form)
Vue.use(Row)
Vue.use(Col)
Vue.use(Select)
Vue.use(Input)
Vue.use(Button)
Vue.use(Icon)
export default {
  name: 'secondStep',
  data() {
    return {
      fieldsStep2,
      form: this.$form.createForm(this, { name: 'secondStep' })
    }
  },
  methods: {
    fetchAdd(params) {
      produceMeansAdd(params).then(res => {
        console.log('新增：', res)
      })
    },

    // handleSubmit (e) {
    //   e.preventDefault()
    //   this.form.validateFields((err, values) => {
    //     if (!err) {
    //       const params = {
    //         materialName: values.field_materialName === undefined || values.field_materialName === '' ? null : values.field_materialName,
    //         farmingNum: values.field_farmingNum === undefined || values.field_farmingNum === '' ? null : values.field_farmingNum,
    //         actionName: values.field_actionName === undefined || values.field_actionName === '' ? null : values.field_actionName,
    //         planCycleName: values.field_planCycleName === undefined || values.field_planCycleName === '' ? null : values.field_planCycleName,
    //         purchaseStatus: values.select_purchaseStatus === undefined || values.select_purchaseStatus === '' ? null : values.select_purchaseStatus
    //       }
    //       console.log('params:', params)
    //     }
    //   })
    // },

    handleSubmit(firstStepParams) {
      this.form.validateFields((err, values) => {
        if (!err) {
          const params = {
            realOutput: values.field_actualProduction,
            salesVolume: values.field_sales,
            salesValue: values.field_salesQuota
          }
          let newParams = Object.assign(firstStepParams, params)
          console.log('newParams:', newParams)
          // this.fetchAdd(newParams)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.second-step {
  width: 100%;
  padding: 24px;
  background: #fff;
  margin-bottom: 10px;
  border-radius: 4px;
  .form-fields {
    .sp-unit {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
    .ant-form-item {
      text-align: left;
    }
  }
}
</style>
