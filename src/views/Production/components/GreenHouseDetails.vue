<template>
<div>
  <a-modal
    title="新增基地"
    v-model="visible"
    @ok="handleOk"
  >
    <div class="form">
      <a-form :form="form" @submit="handleSubmit">
        <a-row :gutter="40">
          <a-col :span="24">
            <a-form-item
              label="所属公司:"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 20 }"
            >
              <a-select placeholder="请选择公司" v-decorator="['companyName',
          {rules: [{ required: true, message: '请选择公司!' }]}]">
                <a-select-option value="jack">Jack</a-select-option>
                <a-select-option value="lucy">Lucy</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              label="基地名称:"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 20 }"
            >
              <a-select placeholder="请输入基地名称" v-decorator="['baseName',
          {rules: [{ required: true, message: '请输入基地名称!' }]}]">
                <a-select-option value="jack">Jack</a-select-option>
                <a-select-option value="lucy">Lucy</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="40">
          <a-col :span="24">
            <a-form-item
              label="基地面积:"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 20 }"
            >
              <a-select placeholder="请输入基地面积" v-decorator="['baseArea',
          {rules: [{ required: true, message: '请输入基地面积!' }]}]">
                <a-select-option value="jack">Jack</a-select-option>
                <a-select-option value="lucy">Lucy</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              label="基地地址:"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 20 }"
            >
              <a-select placeholder="请输入基地地址" v-decorator="['baseAddress',
          {rules: [{ required: true, message: '请输入基地地址!' }]}]">
                <a-select-option value="jack">Jack</a-select-option>
                <a-select-option value="lucy">Lucy</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="40">
          <a-col :span="24">
            <a-form-item
              label="基地电话:"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 20 }"
            >
              <a-input placeholder="请输入基地电话" v-decorator="['phone',
          {rules: [{ required: true, message: '请输入基地电话!' }]}]"/>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              label="负责人:"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 20 }"
            >
              <a-input placeholder="请输入负责人" v-decorator="['leader',
          {rules: [{ required: true, message: '请输入负责人!' }]}]"/>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>

  </a-modal>
</div>
</template>

<script>
export default {
  name: 'GreenHouseDetails',
  data () {
    return {
      visible: false,
        form: this.$form.createForm(this),
    }
  },
  methods: {
    handleOk (e) {
      console.log(e)
      this.$nextTick(() => {
        this.visible = true
          this.showEditFormData (e)
      })
    },
     // 数据回显
      showEditFormData (data) {
     this.$nextTick(() => {
         this.form.setFieldsValue({
             companyName: data.baseLandName,
             baseName: data.area,
             baseArea: data.createUser,
             baseAddress: data.greenhouseId,
             phone: data.greenhouseName,
             leader: data.iotDeviceNumbers
         });
     })

      },
      handleSubmit (e) {
          e.preventDefault();
          this.form.validateFields((err, values) => {
              if (!err) {
                  console.log('Received values of form: ', values);
              }
          });
      },
  }

}
</script>

<style scoped>

</style>
