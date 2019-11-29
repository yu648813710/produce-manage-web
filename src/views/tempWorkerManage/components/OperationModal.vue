<template>
  <div>
    <a-modal
      :title="title"
      :visible="visible"
      :width="1000"
      @ok="handleOk"
      :maskClosable="false"
      :bodyStyle="{
        height: '380px',
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
        <a-form-item
          label="临时工姓名"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 16 }"
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
        <a-form-item
          label="临时工手机号"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 16 }"
          required
          :validateStatus="validate.phone"
          :help="validate.phone ? '请输入临时工手机号!' : '' "
        >
          <a-input
            autocomplete="off"
            placeholder="请输入"
            v-model="data.phone"
          />
        </a-form-item>
        <a-form-item>
          <a-form-item
            label="临时工薪酬"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 18 }"
            style="display:inline-block;width:calc(100% - 50px)"
            required
            :validateStatus="validate.payment"
            :help="validate.payment ? '请输入大于0的数字!' : '' "
          >
            <a-input
              autocomplete="off"
              placeholder="请输入"
              v-model="data.payment"
            />
          </a-form-item>元/天
        </a-form-item>
        <a-form-item
          label="是否为贫困户"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 16 }"
          required
          :validateStatus="validate.povertyStatus"
          :help="validate.povertyStatus ? '请选择是否为贫困户!' : '' "
        >
          <a-radio-group name="radioGroup" v-model="data.povertyStatus">
            <a-radio value="Y">是</a-radio>
            <a-radio value="N">否</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
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
