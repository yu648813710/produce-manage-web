<template>
  <a-modal
    :title="title"
    :visible="visible"
    :width="240"
    :footer="null"
    @cancel="handleCancel"
    >
    <div class="decodeContent">
      <div class="deodeImgContent">
        <img
          style="width: 200px;height: 200px"
          :src="src"
          :alt="title"
        />
      </div>
    </div>
  </a-modal>
</template>

<script>
import Vue from 'vue'
import { Modal } from 'ant-design-vue'
Vue.use(Modal)
export default {
  props: {
    title: {
      type: String,
      default: '',
      required: true
    },
    visible: {
      type: Boolean,
      default: false,
      required: true
    },
    src: {
      type: String,
      default: '',
      required: true
    }
  },
  methods: {
    handleCancel() {
      this.$emit('hideImgModal', false)
    }
  }
}
</script>

<style lang="less" scoped>
.decodeContent {
  height: 200px;
  width: 200px;
  .deodeImgContent {
    height: 200px;
    width: 200px;
  }
}
</style>
