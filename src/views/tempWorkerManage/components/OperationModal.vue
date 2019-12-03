<template>
  <div>
    <a-modal
      :title="title"
      :visible="visible"
      :width="1000"
      @ok="handleOk"
      :maskClosable="false"
      :bodyStyle="{
        maxHeight: '490px',
        overflow: 'auto'
      }"
      @cancel="handleCancel"
    >
      <p v-if="contentText">{{ contentText }}</p>
      <a-form
        v-else
        :form="ruleForm"
        @submit="handleOk"
      >
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              :label-col="{ span: 7 }" :wrapper-col="{ span: 15 }"
              label="临时工姓名"
              required
              :validateStatus="validate.userName"
              :help="validate.userName ? '请输入汉字!' : '' "
            >
              <a-input
                autocomplete="off"
                placeholder="请输入"
                v-model="data.userName"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :label-col="{ span: 7 }" :wrapper-col="{ span: 15 }"
              label="临时工手机号"
              required
              :validateStatus="validate.phone"
              :help="validate.phone ? '请输入临时工手机号!' : '' "
            >
              <a-input
                autocomplete="off"
                placeholder="请输入"
                v-model="data.phone"
                :disabled="title === '编辑临时工' ? true : false"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12" >
            <a-form-item>
                  <a-form-item
                    :label-col="{ span: 7 }" :wrapper-col="{ span: 15 }"
                    label="临时工薪酬"
                    required
                    :validateStatus="validate.payment"
                    :help="validate.payment ? '请输入大于0的数字!' : '' "
                    style="display: flex"
                  >
                    <a-row :gutter="0">
                      <a-col :span="20">
                        <a-input
                          autocomplete="off"
                          placeholder="请输入"
                          v-model="data.payment"
                        />
                      </a-col>
                      <a-col :span="4" style="text-align: right">元/天</a-col>
                    </a-row>
                  </a-form-item>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :label-col="{ span: 7 }" :wrapper-col="{ span: 15 }"
              label="是否为贫困户"
              required
              :validateStatus="validate.povertyStatus"
              :help="validate.povertyStatus ? '请选择是否为贫困户!' : '' "
            >
              <a-radio-group name="radioGroup" v-model="data.povertyStatus">
                <a-radio value="Y">是</a-radio>
                <a-radio value="N">否</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>

      </a-form>
    </a-modal>
  </div>
</template>
<script>
import Vue from 'vue'
import { Modal, Row, Col } from 'ant-design-vue'
Vue.use(Modal)
Vue.use(Row)
Vue.use(Col)
export default {
  data() {
    return {
      ruleForm: this.$form.createForm(this)
    }
  },
  props: {
    visible: {
      default: false,
      type: Boolean,
      required: true
    },
    data: {
      default() {
        return {}
      },
      type: Object,
      required: true
    },
    validate: {
      default() {
        return {}
      },
      type: Object,
      required: true
    },
    title: {
      default() {
        return {
        }
      },
      type: String,
      required: true
    },
    contentText: {
      default() {
        return {
        }
      },
      type: String,
      required: true
    }
  },
  watch: {
    visible(val) {
      this.$emit('setForm', this.ruleForm)
    }
  },
  methods: {
    handleOk() {
      this.$emit('confirm', this.ruleForm)
    },
    handleCancel() {
      this.$emit('cancel', this.ruleForm)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
