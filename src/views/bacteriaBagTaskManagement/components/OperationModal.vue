/**
操作详情模态框
*/
<template>
  <div>
     <a-modal
      title="操作详情"
      :visible="visible"
			:width="800"
      @ok="handleOk"
      @cancel="handleAddCancel"
      >
     </a-modal>
  </div>
</template>

<script>
import Vue from 'vue'
import { Modal } from 'ant-design-vue'
Vue.use(Modal)
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data() {
    return {

    }
  },
  methods: {
    handleOk() {
      this.$emit('operationModalOk', false)
    },
    handleAddCancel() {
      this.$emit('operationModalOk', false)
    }
  }
}
</script>

<style>

</style> */
