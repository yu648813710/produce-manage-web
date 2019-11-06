/**关联批次号 */
<template>
  <div>
    <a-modal
      title="关联批次号"
      :visible="visible"
      @ok="handleModalOk"
			:width="800"
      @cancel="handleModalCancel"
      :destroyOnClose="true"
      >
      <a-form :form="modalForm">
        <a-form-item label="关联批次号" :label-col="{ span: 7 }" :wrapper-col="{ span: 12 }">
            <a-input
              placeholder="请输入批次号"
              autocomplete="off"
              v-decorator="[
                'relationNum',
                { rules: [{ required: true, message: '请输入关联批次号' },
                ] },
              ]"
            />
					</a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import Vue from 'vue'
import { Modal, Form, Input } from 'ant-design-vue'
import { batchCode } from '@/api/farmPlan.js'
Vue.use(Modal)
Vue.use(Form)
Vue.use(Input)
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
      required: true
    },
    productId: {
      type: String,
      default: '',
      required: true
    }
  },
  data () {
    return {
      modalForm: this.$form.createForm(this)
    }
  },
  methods: {
    // 模态确认事件
    handleModalOk() {
      this.modalForm.validateFields((err, values) => {
        if (!err && this.productId) {
          let params = {
            productionBatchCode: values.relationNum
          }
          batchCode(this.productId, params)
            .then(res => {
              if (res.success === 'Y') {
                this.$message.success(res.message)
                let data = {
                  pageNo: 1,
                  pageSize: 10
                }
                // 获取列表
                this.$parent.getList(data)
                this.$emit('relationModal', false)
              } else {
                this.$message.error(res.message)
                // this.$emit('relationModal', false)
              }
            })
        }
      })
    },
    // 模态取消事件
    handleModalCancel() {
      this.$emit('relationModal', false)
    }
  }
}
</script>

<style>

</style>
