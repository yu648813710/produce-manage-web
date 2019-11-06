<template>
  <div>
    <a-modal
      title="打印溯源二维码"
      :visible="printVisible"
      @ok="printSourceData"
      :confirmLoading="confirmLoading"
      @cancel="printCancel"
      :width="246"
      okText="打印"
      cancelText="取消"
      >
      <div class="printBox">
        <section
          ref="printArea"
          style="height: 100px;width: 155px;"
        >
          <div
            id="printArea"
            class="printContent"
          >
            <img
              style="position: absolute;top: 0px;left: 8px;height: 78px;"
              :src="printBgImg"
              alt=""
            />
            <div class="printImg">
              <img
                style="width: 45px;height: 45px;position: absolute;top: 10px;left: 33px;"
                :src="decodeImg"
                alt=""
              />
            </div>
          </div>
        </section>
      </div>
    </a-modal>
  </div>
</template>

<script>
import Vue from 'vue'
import { Modal } from 'ant-design-vue'
const printBgImg = require('@/assets/image/source_bg.png')
Vue.use(Modal)
export default {
  props: {
    printVisible: {
      type: Boolean,
      default: false,
      required: true
    },
    decodeImg: {
      type: String,
      default: '',
      required: true
    }
  },
  data() {
    return {
      printBgImg,
      confirmLoading: false
    }
  },
  methods: {
    printSourceData() {
      this.$print(this.$refs.printArea)
      this.$emit('printHideModal', false)
    },
    printCancel() {
      this.$emit('printHideModal', false)
    }
  }
}
</script>

<style lang="less" scoped>
  .printBox {
    margin-left: 40px;
    .printContent {
      height: 100px;
      width: 155px;
      display: flex;
      position: relative;
      justify-content: center;
      align-items: center;
      .printText {
        width: 14px;
      }
      .printImgContent {
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        .printImg {
          background-size: 100% 100%;
          width: 160px;
          height: 160px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .printFoot {
          height: 26px;
          width: 160px;
          border-radius: 13px;
          font-size: 12px;
          line-height: 26px;
          color: #fff;
          font-weight: 500;
          background-color: green;
        }
      }
    }
  }
</style>
