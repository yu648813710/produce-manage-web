/**
企业属性选择组件
*/
<template>
  <div>
    <a-modal
      title="企业属性选择"
      :visible="visible"
      :closable="false"
      :keyboard="false"
      :maskClosable="false"
      :footer="null"
      >
      <a-form :form="modalForm">
        <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item label="企业属性">
                <a-select
                  placeholder="企业类型"
                  :allowClear="true"
                  :getPopupContainer="triggerNode => {
                    return triggerNode.parentNode || document.body;
                  }"
                  style="width: 100%;"
                  v-decorator="[ 'ownerCompanyId',
                    { rules: [{ required: true, message: '请选择企业类型' }] },
                  ]"
                  >
                  <a-select-option v-for="item in companyTypeList" :key="item.typeId" :value="item.typeId">{{item.typeName}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
        </a-row>
        <a-row style="text-align: right; margin-top: 100px;">
          <a-button type="primary" @click="handleModalOk">确认</a-button>
        </a-row>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import Vue from 'vue'
import { Modal, Form, Row, Col, Select, Button } from 'ant-design-vue'
// import { getCompanyType } from '@/api/dataManage.js'
Vue.use(Modal)
Vue.use(Form)
Vue.use(Row)
Vue.use(Col)
Vue.use(Select)
Vue.use(Button)
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
      modalForm: this.$form.createForm(this),
      companyTypeList: []
    }
  },
  created() {
    this.getCompanyType()
  },
  methods: {
    getCompanyType() {
      // getCompanyType()
      //   .then(res => {
      //     console.log(res)
      //   })
    },
    // 确认
    handleModalOk() {
      this.$emit('handleModalCancel', false)
    }
  }
}
</script>

<style  lang="less" scoped>

</style>
