<template>
  <div>
    <a-modal
			:title="title"
			:visible="visible"
			@ok="handleDelOk"
			@cancel="handleDelCancel"
      :maskClosable="false"
      :bodyStyle="{
        height: '380px',
        overflow: 'auto'
      }"
			>
			<p>{{contentText}}</p>
		</a-modal>
  </div>
</template>

<script>
import Vue from 'vue'
import {
  Modal
} from 'ant-design-vue'
import {
  setStatus,
  setBatchStatus
} from '@/api/farmPlan.js'
Vue.use(Modal)
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    bizId: {
      type: String,
      default: ''
    },
    purchaseStatus: {
      type: Number,
      default: 0
    },
    contentText: {
      type: String,
      default: ''
    },
    isBatch: {
      type: Boolean,
      default: false
    },
    searchParam: { // 批量操作
      type: Object,
      default: () => {
        return {
          bizList: [],
          purchaseStatus: 0
        }
      }
    }
  },
  data() {
    return {

    }
  },
  methods: {
    handleDelOk () {
      if (this.isBatch) { // isBatch === true 则是批量操作
        if (this.searchParam.bizList.length > 0) {
          setBatchStatus(this.searchParam)
            .then(res => {
              if (res.success === 'Y') {
                let data = {
                  pageNo: 1,
                  pageSize: 10
                }
                this.$parent.getList(data)
                this.$emit('confirm', false)
                this.$message.success(res.message)
              } else {
                this.$message.error(res.message)
              }
            })
        } else {
          this.$message.error('请先选择农资！')
        }
      } else {
        if (this.bizId && this.purchaseStatus > 0) {
          setStatus(this.bizId, this.purchaseStatus)
            .then(res => {
              if (res.success === 'Y') {
                // 获取列表
                let data = {
                  pageNo: 1,
                  pageSize: 10
                }
                this.$parent.getList(data)
                this.$emit('confirm', false)
                this.$message.success(res.message)
              } else {
                this.$message.error(res.message)
              }
            })
        } else {
          this.$message.error('ID或者状态为空！')
        }
      }
    },
    handleDelCancel () {
      this.$emit('confirm', false)
    }
  }
}
</script>

<style lang="less">

</style>
