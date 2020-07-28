<template>
  <div>
    <a-modal
      title="溯源二维码打印预览"
      :visible="printVisible"
      @ok="printSourceData"
      :confirmLoading="confirmLoading"
      @cancel="printCancel"
      :width="600"
      >
      <div slot="footer">
        <a-button type="primary" v-print="printObj">打印</a-button>
        <a-button @click="printCancel">取消</a-button>
      </div>
      <div style="height: 315px">
        <div class="printBox">
          <div style="display: flex;justify-content: center;align-items: center">
            <div class="source_img">
              <div id="printMe" style="margin-left: 10px;margin-top: 5px;">
                <div class="printContent mg_l_1">
                  <div class="produceName">
                    <div class="label">
                      产品名称：
                    </div>
                    <div class="value">{{lineData.productName}}</div>
                  </div>
                  <div class="produceCompany">
                    <div class="label">
                      生产企业：
                    </div>
                    <div class="value">
                      {{lineData.productionCompany}}
                    </div>
                  </div>
                  <div class="produceLocation">
                    <div class="label">
                      产地：
                    </div>
                    <div class="value" style="line-height: 15px;">
                      {{lineData.mergerAddress}}
                    </div>
                  </div>
                  <div class="producePhone">
                    <div class="label">
                      联系方式：
                    </div>
                    <div class="value" style="display: inline-block;width: 115px;">
                      {{lineData.phone}}
                    </div>
                  </div>
                  <div class="produceCreatDate">
                    <div class="label">
                      生成日期：
                    </div>
                    <div class="value" style="display: inline-block;width: 115px;">
                      {{lineData.productionDate}}
                    </div>
                  </div>
                  <img
                    style="width: 50px;height: 50px;position: absolute;bottom: 7px;right: 6px"
                    :src="decodeImg"
                    alt=""
                  />
                </div>
                <div class="printContent mg_l_5">
                  <div class="produceName">
                    <div class="label">产品名称：</div>
                    <div class="value">{{lineData.productName}}</div>
                  </div>
                  <div class="produceCompany">
                    <div class="label">生产企业：</div>
                    <div class="value">{{lineData.productionCompany}}</div>
                  </div>
                  <div class="produceLocation">
                    <div class="label">产地：</div>
                    <div class="value" style="line-height: 15px;">
                      {{lineData.mergerAddress}}
                    </div>
                  </div>
                  <div class="producePhone">
                    <div class="label">联系方式：</div>
                    <div class="value" style="display: inline-block;width: 115px;">
                      {{lineData.phone}}
                    </div>
                  </div>
                  <div class="produceCreatDate">
                    <div class="label">生成日期：</div>
                    <div class="value" style="display: inline-block;width: 115px;">
                      {{lineData.productionDate}}
                    </div>
                  </div>
                  <img
                    style="width: 50px;height: 50px;position: absolute;bottom: 7px;right: 6px"
                    :src="decodeImg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="previewBox">
          <div class="previewContent">
            <div class="previewName">
              <span class="label2">产品名称：</span>
              <span class="value2">{{lineData.productName}}</span>
            </div>
            <div class="previewCompany">
              <span class="label2">生产企业：</span>
              <span class="value2">{{lineData.productionCompany}}</span>
            </div>
            <div class="previewLocation">
              <span class="label2" style="display: inline-block;margin-top: -3px">产地：</span>
              <span class="value2" style="display: inline-block;width: 270px;margin-top: -5px">
                    {{lineData.mergerAddress}}
                  </span>
            </div>
            <div class="previewPhone">
              <span class="label2">联系方式：</span>
              <span class="value2" style="display: inline-block;width: 140px;">
                    {{lineData.phone}}
                  </span>
            </div>
            <div class="previewCreatDate">
              <span class="label2">生成日期：</span>
              <span class="value2" style="display: inline-block;width: 140px;">
                   {{lineData.productionDate}}
                  </span>
            </div>
            <img
              style="width: 100px;height: 100px;position: absolute;bottom: 20px;right: 18px"
              :src="decodeImg"
              alt=""
            />
          </div>
        </div>
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
    lineData: {
      type: Object,
      default: () => {},
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
      printObj: {
        id: 'printMe',
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
      },
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

<style scoped>
  @media print{
    .no-print{visibility:hidden ;}
    .mg_l_5 {
      margin-left: 15px;
    }
    .mg_l_1 {
      margin-left: 2px;
    }
  }
  @page { size: landscape; }
  @page{
    margin:0.5mm;
  }
  .printBox {
    margin-top: 40px;
  }
  .mg_l_1 {
    margin-left: 1px;
  }
  .mg_l_5 {
    margin-left: 13px;
  }
  .value_text {
    display: inline-block;
    transform: scale(0.7);
  }
  .source_img {
    height: 149px;
    width: 400px;
    display: flex;
    position: relative;
    justify-content: center;
    background: url('../../../assets/image/source_modal1.png') no-repeat;
    background-size: 100% 100%;
    align-items: center;
  }
  .printContent {
    height: 149px;
    width: 185px;
    flex-shrink: 0;
    display: flex;
    position: relative;
    justify-content: center;
    background-size: 100% 100%;
    color: #000000;
    align-items: center;
  }
  .previewContent div {
    position: absolute;
    font-size: 18px;
    /*font-weight: bold;*/
    left: 37px;
    height: 10px;
  }
  .previewBox {
    position: absolute;
    top: 85px;
    right: 50%;
    /*display: none;*/
    margin-right: -212px;
  }
  .previewContent {
    height: 340px;
    width: 425px;
    display: flex;
    position: relative;
    justify-content: center;
    background: url('../../../assets/image/source_modal.png') no-repeat;
    background-size: 100% 100%;
    align-items: center;
  }
  .previewName {
    top: 82px;
  }
  .previewCompany {
    top: 120px;
  }
  .previewLocation {
    display: flex;
    top: 175px;
    height: 72px !important;
  }
  .previewPhone .value2, .previewCreatDate .value2 {
    font-size: 15px !important;
  }
  .value2 {
    color: #000000;
  }
  .previewPhone {
    top: 242px;
  }
  .previewCreatDate {
    top: 272px;
  }
  .label2 {
    width: 60px;
    font-size: 12px;
    color: #000000;
  }

  .printContent>div {
    display: flex;
    width: 100%;
    left: 8px;
    position: absolute;
    align-items: flex-start;
  }

  #printMe {
    height: 149px;
    width: 380px;
    display: flex;
  }

  .printContent div {
    /*font-weight: bold;*/
  }
  .produceName {
    top: 34px;

  }
  .produceCompany {
    top: 51px;
  }
  .produceLocation {
    top: 69px;
    height: 66px;
  }
  .produceLocation .value {
  }
  .producePhone .value, .produceCreatDate .value {
    flex: none !important;
    width: 110px;
    font-size: 12px;
  }
  .producePhone {
    top: 104px;
  }
  .produceCreatDate {
    top: 122px;
  }
  .mg_2 {
    margin-top: -2px;
  }
  .label {
    transform: scale(0.6);
    width: 60px;
    transform-origin: 0 0;
    font-size: 12px;
    flex-shrink: 0;
  }
  .value {
    flex-shrink: 0;
    transform-origin: 0 0;
    transform: scale(0.7);
    width: 180px;
    font-size: 12px;
    position: absolute;
    left: 42px;
  }
  .printText {
    width: 14px;
  }
  .printImgContent {
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  .printImg {
    position: absolute;
    bottom: 14px;
    right: 14px;
    background-size: 100% 100%;
    width: 44px;
    height: 44px;
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
</style>
