<template>
  <div class="first-step">
    <a-form class="form-fields" :form="form" @submit="handleSubmit">
      <a-row :gutter="24">
        <a-col
          v-for="(item, index) in fieldsStep1"
          :key="'field' + item.id"
          :span="12"
        >
          <a-form-item>
            <span v-if="index === 7 || index === 8" slot="label" style="color: red">*<span style="color: #000">{{item.label}}</span></span>
            <span v-else slot="label">{{item.label}}</span>
            <a-upload
              v-if="index === (fieldsStep1.length - 1)"
              :customRequest="selfUpload"
              :beforeUpload="beforeUpload"
              listType="picture-card"
              :fileList="fileList"
              :showUploadList="true"
              @preview="handlePreview"
              @change="handleChange"
              v-decorator="[`upload_${item.id}`, {
                rules: item.validators
              }]"
            >
              <div v-if="fileList.length < 5">
                <a-icon :type="uploadLoading ? 'loading' : 'plus'" />
                <div class="ant-upload-text">上传</div>
              </div>
            </a-upload>

            <span v-else-if="index === 7 || index === 8">
              <a-form-item style="display:inline-block;width:calc(100% - 20px)">
                <a-input
                  autocomplete="off"
                  :placeholder="item.placeholder"
                  v-decorator="[`field_${item.id}`, {
                    rules: item.validators
                  }]"
                  :maxLength="item.mx"
                  :disabled="!item.isEdit"
                />
              </a-form-item>亩
            </span>

            <a-input
              v-else
              autocomplete="off"
              :placeholder="item.placeholder"
              v-decorator="[`field_${item.id}`, {
                rules: item.validators
              }]"
              :maxLength="item.mx"
              :disabled="!item.isEdit"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script>
import Vue from 'vue'
import { Form, Row, Col, Select, Input, Button, Icon, Upload } from 'ant-design-vue'
import { fieldsStep1 } from './config'
import axios from 'axios'
Vue.use(Form)
Vue.use(Row)
Vue.use(Col)
Vue.use(Select)
Vue.use(Input)
Vue.use(Button)
Vue.use(Icon)
Vue.use(Upload)
export default {
  name: 'firstStep',
  data() {
    return {
      fieldsStep1,
      form: this.$form.createForm(this, { name: 'firstStep' }),
      fileList: [],
      uploadLoading: false
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        console.log('hhhhhhhhhhhh：', values)
        if (!err) {
          const params = {
            materialName: values.field_materialName === undefined || values.field_materialName === '' ? null : values.field_materialName,
            farmingNum: values.field_farmingNum === undefined || values.field_farmingNum === '' ? null : values.field_farmingNum,
            actionName: values.field_actionName === undefined || values.field_actionName === '' ? null : values.field_actionName,
            planCycleName: values.field_planCycleName === undefined || values.field_planCycleName === '' ? null : values.field_planCycleName,
            purchaseStatus: values.select_purchaseStatus === undefined || values.select_purchaseStatus === '' ? null : values.select_purchaseStatus
          }
          console.log('params:', params)
        }
      })
    },

    handleNext() {
      let pm = {
        isPass: false,
        params: {}
      }
      this.form.validateFields((err, values) => {
        console.log('hhhhhhhhhhhh：', values)
        if (!err) {
          const params = {
            materialName: values.field_meansName,
            enterpriseName: values.field_companyName || '',
            industry: values.field_belongIndustry || '',
            enterpriseAddress: values.field_companyAddress,
            landowner: values.field_landowner,
            mobilePhone: values.field_telephone,
            reportYear: values.field_annualReport,
            landArea: values.field_landArea,
            plantArea: values.field_plantingArea,
            cultivation: values.field_cropCultivation,
            landCertificate: values.upload_landTrulyProve
          }
          console.log('params:', params)
          pm = {
            isPass: true,
            params
          }
          return pm
        }
        pm.isPass = false
        return pm
      })
      console.log('iiiiiiiiiiiii:', pm)
      return pm
    },

    // 上传文件之前的钩子
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
      if (!isJPG) {
        this.$message.error('请上传jpg、jpeg或png格式的图片')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('图片大小不能超过5M')
      }
      return isJPG && isLt2M
    },

    selfUpload({ action, file, onSuccess, onError, onProgress }) {
      let self = this
      let formData = new FormData()
      formData.append('file', file)
      axios
        .post('http://172.21.128.125:9090/produce/oss/fileUpload', formData)
        .then(res => {
          self.uploadLoading = false
          if (res.data.success === 'Y') {
            self.fileList[self.fileList.length - 1].status = 'done'
            self.fileList[self.fileList.length - 1].url = res.data.data
          }
        })
    },

    handleCancel() {
      this.previewVisible = false
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange(file) {
      this.fileList = file.fileList
      if (file.file.status === 'uploading') {
        this.uploadLoading = true
      }
    }
  }
}
</script>
<style lang="less" scoped>
.first-step {
  padding: 24px;
  background: #fff;
  margin-bottom: 10px;
  border-radius: 4px;
  .form-fields {
    .ant-form-item {
      text-align: left;
    }
  }
}
</style>
