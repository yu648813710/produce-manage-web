<template>
  <a-modal
    :title="title"
    :visible="visible"
    :width="modalWidth + 50"
    :footer="null"
    @cancel="handleCancel"
    >
    <div class="decodeContent" :style="{width:modalWidth ? modalWidth + 'px' : '240px'}">
      <img
        :style="{width:modalWidth ? modalWidth + 'px' : '240px'}"
        :src="src"
        :alt="title"
      />
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
    },
    modalWidth: {
      type: Number,
      default: 240,
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
  height: auto;
  img{
    background-size: 100% 100%;
  }
}
</style>
