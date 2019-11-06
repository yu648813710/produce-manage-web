<!--
图片上传组件
params:
    disabled: 是否可点击上传图片 默认为false
    selfImgUrl: 图片路径，编辑时做回显使用
    isAdd: 判断添加或编辑 默认为true
    visible: 判断弹窗是否打开，做事件监听使用
event:
    haveUploadImg: 图片上传成功后的回调
-->
<template>
  <div class="massifMsg">
    <a-upload
      :disabled="disabled"
      name="avatar"
      listType="picture-card"
      class="avatar-uploader"
      :customRequest="selfUpload"
      :showUploadList="false"
      :headers="{'Content-Type': 'multipart/form-data'}"
      :beforeUpload="beforeUpload"
      @change="handleChange"
    >
      <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
      <div v-else>
          <a-icon :type="loading ? 'loading' : 'plus'" />
          <div class="ant-upload-text">上传图片</div>
      </div>
    </a-upload>
  </div>
</template>

<script>
// import axios from 'axios'
import Vue from 'vue'
import { Upload } from 'ant-design-vue'
import { uploadImage } from '@/api/farmPlan.js'
Vue.use(Upload)
export default {
  name: 'uploadComponent',
  data() {
    return {
      imageUrl: '',
      loading: false
    }
  },
  props: {
    disabled: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    selfImgUrl: {
      type: String
    },
    isAdd: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    visible: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  watch: {
    selfImgUrl: {
      handler(newVal) {
        this.imageUrl = newVal
      },
      immediate: true
    }
  },
  methods: {
    // 重置上传方法
    selfUpload({ action, file, onSuccess, onError, onProgress }) {
      let self = this
      let formData = new FormData()
      formData.append('file', file)
      // http://172.21.128.125:9090/produce/oss/fileUpload
      uploadImage(formData)
        .then((res) => {
          if (res.code === 200) {
            self.imageUrl = res.data
            self.loading = false
            self.$emit('haveUploadImg', res.data)
          }
        })
        // eslint-disable-next-line handle-callback-err
        .catch(err => {
          self.$emit('haveUploadImg', '')
        })
    },
    // 上传图片
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.imageUrl = ''
        this.$emit('haveUploadImg', this.imageUrl)
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        // getBase64(info.file.originFileObj, (imageUrl) => {
        //     this.form.setFieldsValue({
        //         massifImg: imageUrl,
        //     });
        //     this.imgErr = false;
        //     this.formObj.imageUrl = imageUrl
        //     this.loading = false
        // })
      }
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJPG) {
        this.$message.error('请上传 jpg 或 png 格式的图片')
      }
      const isLt2M = file.size / 1024 / 1024 < 5
      if (!isLt2M) {
        this.$message.error('图片大小必须小于 5MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style scoped lang="less">
  .massifMsg img {
    width: 102px;
  }
</style>
