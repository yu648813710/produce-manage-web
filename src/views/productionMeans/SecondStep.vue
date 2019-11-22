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
import { produceMeansAdd, produceMeansEdit } from '@/api/productManage'
Vue.use(Form)
Vue.use(Row)
Vue.use(Col)
Vue.use(Select)
Vue.use(Input)
Vue.use(Button)
Vue.use(Icon)
export default {
  name: 'secondStep',
  props: {
    info: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  data() {
    return {
      fieldsStep2,
      form: this.$form.createForm(this, { name: 'secondStep' })
    }
  },
  created() {
    let self = this
    if (this.info !== null) {
      console.log('second-info:', this.info)
      this.$nextTick(() => {
        self.form.setFieldsValue({
          field_actualProduction: self.info.realOutput,
          field_sales: self.info.salesVolume,
          field_salesQuota: self.info.salesValue
        })
      })
    } else {
      console.log('断言：此处 === null时，逻辑正常:', this.info)
    }
  },
  methods: {
    fetchAdd(params) {
      produceMeansAdd(params).then(res => {
        if (res && res.success === 'Y') {
          this.$message.success(res.message)
          history.go(-1)
          return
        }
        this.$message.error(res.message)
      })
    },
    fetchEdit(params) {
      let postData = {
        bizId: this.info.bizId,
        ...params
      }
      produceMeansEdit(postData).then(res => {
        if (res && res.success === 'Y') {
          this.$message.success(res.message)
          history.go(-1)
          return
        }
        this.$message.error(res.message)
      })
    },

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
          //
          if (this.info && this.info.bizId && this.info.bizId !== null) {
            console.log('修改：bizId为：', this.info.bizId)
            this.fetchEdit(newParams)
            return
          }
          this.fetchAdd(newParams)
          console.log('新增-断言:bizId不存在即为正常:', !!this.info && !!this.info.bizId)
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
