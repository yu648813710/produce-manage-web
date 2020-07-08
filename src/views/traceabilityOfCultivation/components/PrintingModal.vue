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
              <div class="printContent" id="printMe">
                <div class="produceName">
                  <div class="label">产品名称：</div>
                  <div class="value mg_2">{{lineData.productName}}</div>
                </div>
                <div class="produceName">
                  <div class="label">产品名称：</div>
                  <div class="value mg_2">{{lineData.productName}}</div>
                </div>
                <div class="produceCompany">
                  <div class="label">生产企业：</div>
                  <div class="value">{{lineData.productionCompany}}</div>
                </div>
                <div class="produceCompany">
                  <div class="label">生产企业：</div>
                  <div class="value">{{lineData.productionCompany}}</div>
                </div>
                <div class="produceLocation">
                  <div class="label">产地：</div>
                  <div class="value" style="line-height: 30px;margin-top: -7px">
                    {{lineData.mergerAddress}}
                  </div>
                </div>
                <div class="produceLocation">
                  <div class="label">产地：</div>
                  <div class="value" style="line-height: 30px;margin-top: -7px">
                    {{lineData.mergerAddress}}
                  </div>
                </div>
                <div class="producePhone">
                  <div class="label">联系方式：</div>
                  <div class="value" style="display: inline-block;width: 140px;">
                    {{lineData.phone}}
                  </div>
                </div>
                <div class="producePhone">
                  <div class="label">联系方式：</div>
                  <div class="value" style="display: inline-block;width: 140px;">
                    {{lineData.phone}}
                  </div>
                </div>
                <div class="produceCreatDate">
                  <div class="label">生成日期：</div>
                  <div class="value" style="display: inline-block;width: 140px;">
                    {{lineData.productionDate}}
                  </div>
                </div>
                <div class="produceCreatDate">
                  <div class="label">生成日期：</div>
                  <div class="value" style="display: inline-block;width: 140px;">
                    {{lineData.productionDate}}
                  </div>
                </div>
                <img
                  style="width: 62px;height: 62px;position: absolute;bottom: 14px;right: 14px"
                  :src="decodeImg"
                  alt=""
                />
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
            <div class="previewName">
              <span class="label2">产品名称：</span>
              <span class="value2">{{lineData.productName}}</span>
            </div>
            <div class="previewCompany">
              <span class="label2">生产企业：</span>
              <span class="value2">{{lineData.productionCompany}}</span>
            </div>
            <div class="previewCompany">
              <span class="label2">生产企业：</span>
              <span class="value2">{{lineData.productionCompany}}</span>
            </div>
            <div class="previewLocation">
              <span class="label2" style="display: inline-block;margin-top: -3px">产地：</span>
              <span class="value2" style="display: inline-block;width: 140px;margin-top: -5px">
                    {{lineData.mergerAddress}}
                  </span>
            </div>
            <div class="previewLocation">
              <span class="label2" style="display: inline-block;margin-top: -3px">产地：</span>
              <span class="value2" style="display: inline-block;width: 140px;margin-top: -5px">
                    {{lineData.mergerAddress}}
                  </span>
            </div>
            <div class="previewPhone">
              <span class="label2">联系方式：</span>
              <span class="value2" style="display: inline-block;width: 140px;">
                    {{lineData.phone}}
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
            <div class="previewCreatDate">
              <span class="label2">生成日期：</span>
              <span class="value2" style="display: inline-block;width: 140px;">
                    {{lineData.productionDate}}
                  </span>
            </div>
            <img
              style="width: 131px;height: 130px;position: absolute;bottom: 40px;right: 40px"
              :src="decodeImg"
              alt=""
            />
            <img
              style="width: 131px;height: 130px;position: absolute;bottom: 40px;right: 40px"
              :src="decodeImg"
              alt=""
            />
          </div>
<!--          <div class="previewContent">-->
<!--            <div class="previewName">这是一个产品名称</div>-->
<!--            <div class="previewCompany">这是一个生产企业</div>-->
<!--            <div class="previewLocation">这是一个产地这是一个产地这是一个产地</div>-->
<!--            <div class="previewPhone">1555555555</div>-->
<!--            <div class="previewCreatDate">2020/05/10</div>-->
<!--            <img-->
<!--              style="width: 131px;height: 130px;position: absolute;bottom: 42px;right: 42px"-->
<!--              :src="decodeImg"-->
<!--              alt=""-->
<!--            />-->
<!--          </div>-->
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
      type: Boolean,
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
  }
  @page { size: landscape; }
  @page{
    margin:0.5mm;
  }
  .printBox {
    margin-top: 40px;
  }
  .source_img {
    height: 149px;
    width: 185px;
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
    display: flex;
    position: relative;
    justify-content: center;
    background-size: 100% 100%;
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
  .previewLocation .value2, .previewPhone .value2, .previewCreatDate .value2 {
    font-size: 15px !important;
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
  }

  .printContent>div {
    display: flex;
    width: 248%;
    position: absolute;
    align-items: flex-start;
  }
  .printContent div {
    /*font-weight: bold;*/
  }
  .produceName {
    transform: scale(0.333);
    top: 34px;

  }
  .produceCompany {
    transform: scale(0.333);
    top: 51px;
  }
  .produceLocation {
    transform: scale(0.333);
    top: 54px;
    height: 66px;
  }
  .produceLocation .value, .producePhone .value, .produceCreatDate .value {
    flex: none !important;
    width: 135px;
    font-size: 15px;
  }
  .producePhone {
    transform: scale(0.333);
    top: 104px;
  }
  .produceCreatDate {
    transform: scale(0.333);
    top: 117px;
  }
  .mg_2 {
    margin-top: -2px;
  }
  .label {
    width: 90px;
    font-size: 12px;
  }
  .value {
    flex: 1;
    font-size: 18px;
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
