<template>
  <div>
    <a-modal
      title="任务"
      :visible="editShow"
      @cancel="hiddenEditTask"
      @ok="editSbumit"
      :width="1000"
      :bodyStyle="{
        height: '380px',
        overflow: 'auto'
      }"
      :destroyOnClose="true"
      :maskClosable="false"
      class="task-detail"
    >
      <a-form :form="editFrom" @submit="editFromSubmit">
        <a-row :gutter="24" class="list">
          <a-col class="item" :span="12">
            <span>所属周期：</span>
            {{ detailPageData.cycleName }}
          </a-col>
          <a-col class="item" :span="12">
            <span>农事类型：</span>
            {{ detailPageData.farmingTypeName }}
          </a-col>
        </a-row>
        <a-row :gutter="24" class="list">
          <a-col class="item" :span="12">
            <span>任务操作：</span>
            {{ detailPageData.actionName }}
          </a-col>
          <a-col class="item" :span="12">
            <span>执行时长：</span>
            第
            <a-form-item class="form-item">
              <a-input-number
                autocomplete="off"
                class="input"
                v-decorator="[
                  'cycleStartTime',
                  { rules: [{ required: true, message: '请输入正确周期' }] }
                ]"
                @change="cycleStartTimeInput"
                :min="1"
              ></a-input-number> </a-form-item
            >天~ 第
            <a-form-item class="form-item">
              <a-input-number
                autocomplete="off"
                class="input"
                v-decorator="[
                  'cycleEndTime',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请输入正确周期',
                        validator: cycleEndTimeFun
                      }
                    ]
                  }
                ]"
                :min="cycleEndTimeMin"
              ></a-input-number> </a-form-item
            >天
          </a-col>
        </a-row>
        <a-row :gutter="24" class="list">
          <a-col class="item" :span="12">
            <span>任务开始时间：</span>
            {{ detailPageData.startTime }}
          </a-col>
          <a-col class="item" :span="12">
            <span>任务结束时间：</span>
            {{ detailPageData.endTime }}
          </a-col>
        </a-row>
        <a-row :gutter="24" class="list">
          <a-col class="item" :span="12">
            <span>用途：</span>
            {{ detailPageData.taskUse ? detailPageData.taskUse : '--' }}
          </a-col>
          <a-col class="item" :span="12">
            <span>描述：</span>
            {{
              detailPageData.taskDescription
                ? detailPageData.taskDescription
                : '--'
            }}
          </a-col>
        </a-row>
      </a-form>
      <div class="table-box">
        <div class="header">
          <span v-for="(item, index) in navData" :key="index">{{ item }}</span>
        </div>
        <div class="select">
          <a-row :gutter="24">
            <a-form :form="materialForm" @submit="submitMeterial">
              <a-col :span="6">
                <a-form-item
                  :label-col="{ span: 24 }"
                  :wrapper-col="{ span: 24 }"
                  class="item-select"
                >
                  <a-select
                    placeholder="请选择"
                    style="width: 100%"
                    :getPopupContainer="
                      triggerNode => {
                        return triggerNode.parentNode || document.body
                      }
                    "
                    v-decorator="[
                      'materialId',
                      { rules: [{ required: true, message: '请选择' }] }
                    ]"
                    @change="materialChange"
                  >
                    <a-select-option
                      v-for="(item, index) in materialData"
                      :key="index"
                      :value="item.materialId"
                      >{{ item.materialName }}</a-select-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item
                  :label-col="{ span: 24 }"
                  :wrapper-col="{ span: 24 }"
                  class="item-select"
                >
                  <a-input
                    autocomplete="off"
                    placeholder="请输入"
                    v-decorator="[
                      'materialDosage',
                      { rules: [{ required: true, message: '请输入' }] }
                    ]"
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item
                  :label-col="{ span: 24 }"
                  :wrapper-col="{ span: 24 }"
                  class="item-select"
                >
                  <a-select
                    placeholder="请选择"
                    style="width: 100%"
                    disabled
                    :getPopupContainer="
                      triggerNode => {
                        return triggerNode.parentNode || document.body
                      }
                    "
                    v-decorator="[
                      'materialUnitId',
                      { rules: [{ required: true, message: '请选择' }] }
                    ]"
                  >
                    <a-select-option
                      v-for="(item, index) in utilData"
                      :key="index"
                      :value="item.unitId"
                      >{{ item.unitName }}</a-select-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="6" class="button">
                <span class="table-delete m-r-10" @click="submitMeterial"
                  >确定</span
                >
                <span class="table-delete" @click="resetRematerialData"
                  >取消</span
                >
              </a-col>
            </a-form>
          </a-row>
        </div>
        <div class="center">
          <p
            class="item"
            v-for="(item, index) in detailPageData.taskUseReMaterial"
            :key="index"
          >
            <span>{{ item.materialName }}</span>
            <span v-if="!item.inputEdit" @click="showInputEditItem(index)">{{
              item.materialDosage
            }}</span>
            <span v-else>
              <a-input-number
                autocomplete="off"
                :autofocus="item.inputEdit"
                v-model="item.materialDosage"
                @blur="hiddenInputEditItem(index)"
                style="width:80%;"
              ></a-input-number>
            </span>
            <span>{{ item.materialUnitName }}</span>
            <span class="table-delete" @click="deleteRematerialData(index)"
              >删除</span
            >
          </p>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navData: ['农资名称', '用量', '用量单位', '操作'],
      materialForm: this.$form.createForm(this, { name: 'material' }),
      editFrom: this.$form.createForm(this, { name: 'editFrom' }),
      materialFormData: {
        meterial: null,
        number: null,
        unit: null
      },
      cycleEndTimeMin: 0
    }
  },
  props: {
    editShow: {
      type: Boolean,
      default: false,
      required: true
    },
    detailPageData: {
      default: {},
      required: true
    },
    utilData: {
      default: [],
      required: true
    },
    materialData: {
      default: [],
      required: true
    }
  },
  watch: {
    detailPageData(val) {
      this.detailPageData = val
      this.detailPageData.taskUseReMaterial.map(res => {
        res.inputEdit = false
      })
      this.$set(this.detailPageData)
      console.log(this.detailPageData)
      this.editFromSetVal()
    }
  },
  methods: {
    // 显示农资编辑框
    showInputEditItem(index) {
      this.detailPageData.taskUseReMaterial = this.detailPageData.taskUseReMaterial.map(
        (res, resIndex) => {
          if (index === resIndex) {
            res.inputEdit = true
          }
          return res
        }
      )
    },
    // 隐藏农资编辑框
    hiddenInputEditItem(index) {
      this.detailPageData.taskUseReMaterial = this.detailPageData.taskUseReMaterial.map(
        (res, resIndex) => {
          if (index === resIndex) {
            res.inputEdit = false
          }
          return res
        }
      )
    },
    // 隐藏编辑框
    hiddenEditTask() {
      this.$emit('hiddenEditTask')
    },
    // 提交编辑框
    editSbumit() {
      this.editFromSubmit()
    },
    // 提交编辑表单
    editFromSubmit() {
      this.editFrom.validateFields((err, values) => {
        if (err) {
          return false
        }
        let queryData = {
          instId: this.detailPageData.instId,
          taskUseReMaterial: this.detailPageData.taskUseReMaterial
        }
        queryData = Object.assign(queryData, values)
        console.log(queryData)
        this.$emit('editSbumit', queryData)
      })
    },
    // 提交农资
    submitMeterial(e) {
      e.preventDefault()
      this.materialForm.validateFields((err, values) => {
        if (!err) {
          this.pushReMaterialData(values)
        }
      })
    },
    // 编辑表单赋值
    editFromSetVal() {
      let self = this
      this.editFrom.setFieldsValue({
        cycleStartTime: self.detailPageData.cycleStartTime
          ? self.detailPageData.cycleStartTime
          : 0,
        cycleEndTime: self.detailPageData.cycleEndTime
          ? self.detailPageData.cycleEndTime
          : 0
      })
    },
    // 插入农资数据
    pushReMaterialData(values) {
      let data = {
        materialName: this.materialData.filter(
          res => res.materialId === values.materialId
        )[0].materialName,
        materialUnitName: this.utilData.filter(
          res => res.unitId === values.materialUnitId
        )[0].unitName,
        inputEdit: false
      }
      data = Object.assign(data, values)
      this.detailPageData.taskUseReMaterial.push(data)
      console.log(this.detailPageData.taskUseReMaterial)
      this.resetRematerialData()
    },
    // 删除农资数据
    deleteRematerialData(index) {
      this.detailPageData.taskUseReMaterial.splice(index, 1)
    },
    // 重置农资表单
    resetRematerialData() {
      this.materialForm.resetFields()
    },
    // 周期结束天数
    cycleEndTimeFun(rule, value, callback) {
      let startTime = this.editFrom.getFieldValue('cycleStartTime')
      if (rule.field === 'cycleEndTime' && (!value || value < startTime)) {
        callback(rule.message)
      }
      callback()
    },
    // 开始周期
    cycleStartTimeInput(e) {
      this.cycleEndTimeMin = e
    },
    // 农资选择
    materialChange(e) {
      let materialId = e
      let materialUnitId
      this.materialData.map(item => {
        if (item.materialId === materialId) {
          materialUnitId = item.unitId
        }
      })
      this.materialForm.setFieldsValue({
        materialUnitId: materialUnitId
      })
    }
  }
}
</script>
<style lang="less" scoped>
.task-detail {
  /deep/ .ant-modal-body {
    max-height: 600px;
    overflow: auto;
  }
  height: 600px;
  .list {
    height: auto;
    overflow: hidden;
    .item {
      line-height: 46px;
      span {
        color: #999;
      }
      .form-item {
        display: inline-block;
        width: 14%;
        margin: 2%;
        .input {
          width: 100%;
        }
      }
      .input-item {
        margin: 10px 0;
      }
    }
  }
}
.m-r-10 {
  margin-right: 10px;
}
.table-box {
  width: 500px;
  margin-top: 20px;
  .header {
    padding: 0 30px;
    height: 52px;
    line-height: 52px;
    background: #fafafa;
    color: #999;
    overflow: hidden;
    span {
      float: left;
      width: 20%;
      &:nth-child(1) {
        width: 40%;
      }
    }
  }
  .select {
    height: auto;
    line-height: 52px;
    border-bottom: 1px solid #e8e8e8;
    .item-select {
      height: 48px;
      margin: 4px 0 0;
    }
    .button {
      margin-top: 14px;
    }
  }
  .center {
    .item {
      height: 52px;
      line-height: 52px;
      overflow: hidden;
      border-bottom: 1px solid #e8e8e8;
      padding: 0 30px;
      span {
        float: left;
        width: 20%;
        &:nth-child(1) {
          width: 40%;
        }
      }
    }
  }
}
.table-delete {
  color: #1890ff;
  cursor: pointer;
}
</style>
