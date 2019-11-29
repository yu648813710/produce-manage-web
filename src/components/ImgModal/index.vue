<template>
  <a-modal
    :visible="imgVisible"
    :maskClosable="false"
    :footer="null"
    @cancel="modalCancel"
    >
    <div class="detail-img-wrapper">
      <img :src="imgUrl" alt="">
    </div>
  </a-modal>
</template>

<script>
import Vue from 'vue'
import { Modal } from 'ant-design-vue'
Vue.use(Modal)
export default {
  props: {
    imgVisible: {
      type: Boolean,
      default: false,
      required: true
    },
    imgUrl: {
      type: String,
      default: '',
      required: true
    }
  },
  methods: {
    modalCancel() {
      this.$emit('modalCancel', false)
    }
  }
}
</script>

<style lang="less" scoped>
.detail-img-wrapper{
  img{
    width: 100%;
    background-size: 100%;
  }
}
</style>
