<template>
  <a-modal
    :title="''"
    :visible="imgVisible"
    :footer="null"
    :maskClosable="false"
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
  width: 470px;
  height: 250px;
  img{
    width: 470px;
    height: 250px;
    background-size: 100% 100%;
  }
}
</style>
