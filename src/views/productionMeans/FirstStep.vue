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
            <div v-if="index === (fieldsStep1.length - 1)" class="up-div">
              <a-upload
                :customRequest="selfUpload"
                :beforeUpload="beforeUpload"
                listType="picture-card"
                :fileList="fileList"
                :showUploadList="true"
                @preview="handlePreview"
                @change="handleChange"
                accept=".png,.jpg,.jpeg"
                v-decorator="[`upload_${item.id}`, {
                  rules: item.validators
                }]"
              >
                <div v-if="fileList.length < 5">
                  <a-icon :type="uploadLoading ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">上传</div>
                </div>
              </a-upload>
              <p style="font-size:12px;color:#ccc;">支持JPG、JPEG、PNG格式，不超过5M</p>
            </div>
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
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel" :maskStyle="{backgroundColor: 'transparent'}" destroyOnClose>
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script>
import Vue from 'vue'
import { Form, Row, Col, Select, Input, Button, Icon, Upload, Modal } from 'ant-design-vue'
import { fieldsStep1 } from './config'
import { getCurrentUserInfo, uploadImage, getUserDataDetail } from '@/api/productManage'
// import axios from 'axios'
import moment from 'moment'
Vue.use(Form)
Vue.use(Row)
Vue.use(Col)
Vue.use(Select)
Vue.use(Input)
Vue.use(Button)
Vue.use(Icon)
Vue.use(Upload)
Vue.use(Modal)
export default {
  name: 'firstStep',
  props: {
    info: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  data() {
    return {
      fieldsStep1,
      form: this.$form.createForm(this, { name: 'firstStep' }),
      fileList: [],
      uploadLoading: false,
      previewVisible: false,
      previewImage: '',
      isUploadSuccess: false
    }
  },
  created() {
    let self = this
    if (this.info !== null) {
      console.log('first-info:', this.info)
      let files = []
      let idx = 0
      self.info.landCertificate.forEach(item => {
        idx += 1
        let temp = {
          uid: moment(new Date()).format('YYYY-MM-DDhh:mm:ss') + `img-${idx}`,
          name: `img-${idx}`,
          status: 'done',
          url: item
        }
        files.push(temp)
      })
      self.fileList = files
      this.$nextTick(() => {
        self.form.setFieldsValue({
          field_meansName: self.info.materialName,
          field_companyName: self.info.enterpriseName,
          field_belongIndustry: self.info.industry,
          field_companyAddress: self.info.enterpriseAddress,
          field_landowner: self.info.landowner,
          field_telephone: self.info.mobilePhone,
          field_annualReport: self.info.reportYear,
          field_landArea: self.info.landArea,
          field_plantingArea: self.info.plantArea,
          field_cropCultivation: self.info.cultivation,
          upload_landTrulyProve: files
        })
      })
    } else {
      console.log('断言：此处 === null时，逻辑正常:', this.info)
      this.fetchCurrentUserInfo()
      this.fetchUserDataDetail()
    }
  },
  mounted() {
    this.form.setFieldsValue({
      field_annualReport: moment(new Date()).format('YYYY')
    })
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
    },

    fetchUserDataDetail() {
      let self = this
      getUserDataDetail().then(res => {
        console.log('个人信息:', res)
        if (res && res.success === 'Y') {
          let addressObj = {
            provinceName: res.data.provinceName ? res.data.provinceName + ' ' : ' ',
            cityName: res.data.cityName ? res.data.cityName + ' ' : ' ',
            areaName: res.data.areaName ? res.data.areaName + ' ' : ' ',
            businessAddress: res.data.businessAddress ? res.data.businessAddress + ' ' : ' '
          }
          self.form.setFieldsValue({
            field_companyAddress: addressObj.provinceName + addressObj.cityName + addressObj.areaName + addressObj.businessAddress
          })
        }
      })
    },

    fetchCurrentUserInfo() {
      let self = this
      getCurrentUserInfo().then(res => {
        if (res && res.success === 'Y') {
          console.log('nnnnnnnnnres:', res)
          self.$nextTick(() => {
            self.form.setFieldsValue({
              field_companyName: res.data.companyName,
              field_belongIndustry: res.data.industry
              // field_companyAddress: self.info.enterpriseAddress,
            })
          })
        }
      })
    },

    handleNext() {
      let pm = {
        isPass: false,
        params: {}
      }
      this.form.validateFields((err, values) => {
        if (!err) {
          let files = []
          let tempFiles = []
          let idx = 0
          if (values.upload_landTrulyProve) {
            if (values.upload_landTrulyProve.fileList && values.upload_landTrulyProve.fileList.length > 0) {
              values.upload_landTrulyProve.fileList.forEach(item => {
                if (item.url && item.url !== null) {
                  files.push(item.url)
                  idx += 1
                  let temp = {
                    uid: moment(new Date()).format('YYYY-MM-DDhh:mm:ss') + `img-${idx}`,
                    name: `img-${idx}`,
                    status: 'done',
                    url: item.url
                  }
                  tempFiles.push(temp)
                }
              })
            } else if (values.upload_landTrulyProve.length > 0) {
              values.upload_landTrulyProve.forEach(item => {
                if (item.url && item.url !== null) {
                  files.push(item.url)
                  idx += 1
                  let temp = {
                    uid: moment(new Date()).format('YYYY-MM-DDhh:mm:ss') + `img-${idx}`,
                    name: `img-${idx}`,
                    status: 'done',
                    url: item.url
                  }
                  tempFiles.push(temp)
                }
              })
            }
          }
          this.fileList = tempFiles
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
            landCertificate: files
          }
          pm = {
            isPass: true,
            params
          }
          return pm
        }
        pm.isPass = false
        return pm
      })
      return pm
    },

    // 上传文件之前的钩子
    beforeUpload(file) {
      const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg')
      if (!isJPG) {
        this.$message.error('请上传jpg、jpeg或png格式的图片')
      }
      const isLt2M = (file.size / 1024 / 1024 < 5)
      if (!isLt2M) {
        this.$message.error('图片大小不能超过5M')
      }
      this.isUploadSuccess = isJPG && isLt2M
      return isJPG && isLt2M
    },

    selfUpload({ action, file, onSuccess, onError, onProgress }) {
      let self = this
      let formData = new FormData()
      formData.append('file', file)

      uploadImage(formData)
        .then((res) => {
          self.uploadLoading = false
          if (res.success === 'Y') {
            self.fileList[self.fileList.length - 1].status = 'done'
            self.fileList[self.fileList.length - 1].url = res.data
            self.$emit('haveUploadImg', res.data)
          }
        })
        // eslint-disable-next-line handle-callback-err
        .catch(err => {
          self.$emit('haveUploadImg', '')
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
      if (this.isUploadSuccess) {
        this.uploadLoading = false
        console.log(file)
        this.fileList = file.fileList
        return
      }
      if (file.file.status === 'uploading') {
        this.uploadLoading = true
      }
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ .ant-upload-list-item-info {
  display: flex;
}
.first-step {
  padding: 24px;
  background: #fff;
  margin-bottom: 10px;
  border-radius: 4px;
  .form-fields {
    .up-div {
      display: flex;
      flex-direction: column;
    }
    .ant-form-item {
      text-align: left;
    }
  }
}
</style>
