<template>
  <div>
    <a-modal
      :title="infoAddOrEditType==='add'?'新建预警':'修改预警'"
      :visible="visible"
      @ok="handleOk"
      :width="600"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
      <a-form :form="ruleForm" @submit="handleOk">
        <a-form-item label="基地名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-select
            placeholder="选择基地"
            :getPopupContainer="triggerNode => {
              return triggerNode.parentNode || document.body;
            }"
            @change="baseLandChange"
            v-decorator="[
          '基地名称',
          {rules: [{ required: true, message: '请选择基地名称!' }]}
        ]"
            :disabled="infoAddOrEditType==='edit'?true:false"
          >
            <a-select-option
              v-for="(item,index) in baseLandData"
              :value="item.baseLandId"
              :key="index"
            >{{item.baseLandName}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="地块名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-select
            placeholder="选择地块"
            :getPopupContainer="triggerNode => {
              return triggerNode.parentNode || document.body;
            }"
            @change="blockLandChange"
            v-decorator="[
          '地块名称',
          {rules: [{ required: true, message: '请选择地块名称!' }]}
        ]"
            :disabled="infoAddOrEditType==='edit'?true:false"
          >
            <a-select-option
              v-for="(item,index) in blockLandData"
              :value="item.blockLandId"
              :key="index"
            >{{item.blockLandName}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="温度"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 16 }"
          required
          :validate-status="formValidataStatus.temperature"
          :help="formValidataStatus.temperatureText"
        >
          <a-input-number style="width:42%;" v-model="formInputVal.temperatureInf" :min="0" />
          <span style="padding:0 2%;">-</span>
          <a-input-number style="width:42%;" v-model="formInputVal.temperatureSup" :min="0" />
          <span style="padding:0 1%;">℃</span>
        </a-form-item>
        <a-form-item
          label="湿度"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 16 }"
          required
          :validate-status="formValidataStatus.dampness"
          :help="formValidataStatus.dampnessText"
        >
          <a-input-number style="width:42%;" v-model="formInputVal.dampnessInf" :min="0" />
          <span style="padding:0 2%;">-</span>
          <a-input-number style="width:42%;" v-model="formInputVal.dampnessSup" :min="0" />
          <span style="padding:0 1%;">%</span>
        </a-form-item>
        <a-form-item label="负责人" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-input :value="formInputVal.user" disabled />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: this.$form.createForm(this)
    }
  },
  props: {
    infoAddOrEditType: {
      default: 'add',
      type: String,
      required: true
    },
    visible: {
      default: false,
      type: Boolean,
      required: true
    },
    confirmLoading: {
      default: false,
      type: Boolean,
      required: true
    },
    baseLandData: {
      default() {
        return []
      },
      type: Array,
      required: true
    },
    blockLandData: {
      default() {
        return []
      },
      type: Array,
      required: true
    },
    formValidataStatus: {
      default() {
        return {}
      },
      type: Object,
      required: true
    },
    formInputVal: {
      default() {
        return {}
      },
      type: Object,
      required: true
    }
  },
  watch: {
    visible(val) {
      this.$emit('setFrorm', this.ruleForm)
    },
    formInputVal: {
      handler(val) {
        this.formInputVal = val
        console.log(this.formInputVal)
      },
      deep: true
    }
  },
  methods: {
    handleOk() {
      this.$emit('handleOk', this.ruleForm)
    },
    handleCancel() {
      this.$emit('handleCancel', this.ruleForm)
    },
    baseLandChange(e) {
      this.$emit('baseLandChange', e, this.ruleForm)
      this.ruleForm.setFieldsValue({
        基地名称: e
      })
    },
    blockLandChange(e) {
      this.ruleForm.setFieldsValue({
        地块名称: e
      })
      this.$emit('blockLandChange', e, this.ruleForm)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
