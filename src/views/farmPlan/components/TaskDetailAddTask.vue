<template>
  <div>
    <a-modal
      title="任务"
      :visible="addShow"
      @cancel="hiddenAddDetailTask"
      @ok="addTaskSbumit"
      :width="750"
      :bodyStyle="{
        height:'380px',
        overflow:'auto'
      }"
      :destroyOnClose="true"
      :maskClosable="false"
      class="task-detail"
    >
      <a-form :form="taskDetailAddTaskForm" @submit="addTaskSbumit" class="form">
        <a-row :gutter="24" class="list">
          <a-col class="item" :span="12">
            <a-form-item label="所属周期" :wrapper-col="{span:24}">
              <a-select
                placeholder="请选择周期"
                style="width: 100%"
                :getPopupContainer="positonFn"
                v-decorator="['cycleId', { rules: [{ required: true, message: '请选择周期' }] }]"
              >
                <a-select-option
                  v-for="(item,index) in formData.lifecycleData"
                  :key="index"
                  :value="item.lifeCycleId"
                >{{item.lifeCycleName}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col class="item" :span="12">
            <a-form-item label="农事类型" :wrapper-col="{span:24}">
              <a-select
                placeholder="请选择类型"
                style="width: 100%"
                :getPopupContainer="positonFn"
                v-decorator="['farmingTypeId', { rules: [{ required: true, message: '请选择类型' }] }]"
              >
                <a-select-option
                  v-for="(item,index) in formData.farmingTypeData"
                  :key="index"
                  :value="item.farmingTypeId"
                >{{item.farmingName}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24" class="list">
          <a-col class="item" :span="12">
            <a-form-item label="农事操作" :wrapper-col="{span:24}">
              <a-select
                placeholder="请选择操作"
                style="width: 100%"
                :getPopupContainer="positonFn"
                v-decorator="['actionId', { rules: [{ required: true, message: '请选择操作' }] }]"
              >
                <a-select-option
                  v-for="(item,index) in formData.cationData"
                  :key="index"
                  :value="item.optionId"
                >{{item.optionName}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col class="item" :span="12">
            <a-form-item label="开始时间" :wrapper-col="{span:24}">
              <a-date-picker
                style="width: 100%"
                placeholder="请选择开始时间"
                v-decorator="['startTime', { rules: [{ required: true, message: '请选择开始时间' }] }]"
                @change="changeStarTime"
                :disabledDate="starDisabledDataFn"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24" class="list">
          <a-col class="item" :span="12">
            <a-form-item label="结束时间" :wrapper-col="{span:24}">
              <a-date-picker
                style="width: 100%"
                placeholder="请选择结束时间"
                v-decorator="['endTime', { rules: [{ required: true, message: '请选择结束时间' }] }]"
                @change="changeEndTime"
                :disabledDate="endDisabledDataFn"
              />
            </a-form-item>
          </a-col>
          <a-col class="item" :span="12">
            <a-form-item label="用途" :wrapper-col="{span:24}">
              <a-input
                placeholder="请输入用途"
                v-decorator="['taskUse', { rules: [{ required: true, message: '请输入用途' }] }]"
              ></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24" class="list">
          <a-col class="item" :span="12">
            <a-form-item label="农事描述" :wrapper-col="{span:24}">
              <a-input
                placeholder="请输入农事描述"
                v-decorator="['taskDescription', { rules: [{ required: false}] }]"
              ></a-input>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <div class="table-box">
        <div class="header">
          <span v-for="(item,index) in navData" :key="index">{{item}}</span>
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
                    v-decorator="['materialId', { rules: [{ required: true, message: '请选择' }] }]"
                    :getPopupContainer="positonFn"
                  >
                    <a-select-option
                      v-for="(item,index) in formData.materialData"
                      :key="index"
                      :value="item.materialId"
                    >{{item.materialName}}</a-select-option>
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
                    v-decorator="['materialDosage', { rules: [{ required: true, message: '请输入' }] }]"
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
                    v-decorator="['materialUnitId', { rules: [{ required: true, message: '请选择' }] }]"
                    :getPopupContainer="positonFn"
                  >
                    <a-select-option
                      v-for="(item,index) in formData.utilData"
                      :key="index"
                      :value="item.unitId"
                    >{{item.unitName}}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="6" class="button">
                <span class="table-delete m-r-10" @click="submitMeterial">确定</span>
                <span class="table-delete" @click="resetRematerialData">取消</span>
              </a-col>
            </a-form>
          </a-row>
        </div>
        <div class="center">
          <p class="item" v-for="(item, index) in taskUseReMaterial" :key="index">
            <span>{{item.materialName}}</span>
            <span v-if="!item.inputEdit" @click="showInputEditItem(index)">{{item.materialDosage}}</span>
            <span v-else>
              <a-input-number
                autocomplete="off"
                :autofocus="item.inputEdit"
                v-model="item.materialDosage"
                @blur="hiddenInputEditItem(index)"
                style="width:80%;"
              ></a-input-number>
            </span>
            <span>{{item.materialUnitName}}</span>
            <span class="table-delete" @click="deleteRematerialData(index)">删除</span>
          </p>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import Vue from 'vue'
import moment from 'moment'
import { Form, Select, Input, DatePicker, InputNumber } from 'ant-design-vue'
Vue.use(Form)
Vue.use(Select)
Vue.use(Input)
Vue.use(DatePicker)
Vue.use(InputNumber)
export default {
  data() {
    return {
      taskDetailAddTaskForm: this.$form.createForm(this, {
        name: 'addDetailTask'
      }),
      materialForm: this.$form.createForm(this, { name: 'material' }),
      navData: ['农资名称', '用量', '用量单位', '操作'],
      taskUseReMaterial: [],
      materialData: [],
      utilData: [],
      starDisabledData: '',
      endDisabledData: ''
    }
  },
  props: {
    addShow: {
      default: false,
      type: Boolean,
      required: true
    },
    formData: {
      default() {
        return {}
      },
      type: Object,
      required: true
    },
    planStartTime: {
      default: '',
      type: String,
      required: true
    }
  },
  watch: {
    formData: {
      handler(val) {
        this.formData = val
      },
      deep: true
    }
  },
  methods: {
    hiddenAddDetailTask() {
      this.$emit('hiddenAddDetailTask')
    },
    addTaskSbumit(e) {
      e.preventDefault()
      this.taskDetailAddTaskForm.validateFields((err, values) => {
        if (!err) {
          values.taskDescription = values.taskDescription
            ? values.taskDescription
            : ''
          values.endTime = moment(values.endTime).format('YYYY-MM-DD')
          values.startTime = moment(values.startTime).format('YYYY-MM-DD')
          let taskUseReMaterial = {
            taskUseReMaterial: this.taskUseReMaterial
          }
          let queryData = Object.assign(values, taskUseReMaterial)
          this.$emit('addTaskSbumit', queryData)
        }
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
    // 插入农资数据
    pushReMaterialData(values) {
      let data = {
        materialName: this.formData.materialData.filter(
          res => res.materialId === values.materialId
        )[0].materialName,
        materialUnitName: this.formData.utilData.filter(
          res => res.unitId === values.materialUnitId
        )[0].unitName,
        inputEdit: false
      }
      data = Object.assign(data, values)
      this.taskUseReMaterial.push(data)
      this.resetRematerialData()
    },
    // 重置农资表单
    resetRematerialData() {
      this.materialForm.resetFields()
    },
    // 删除农资数据
    deleteRematerialData(index) {
      this.taskUseReMaterial.splice(index, 1)
    },
    // 显示农资编辑框
    showInputEditItem(index) {
      this.taskUseReMaterial = this.taskUseReMaterial.map((res, resIndex) => {
        if (index === resIndex) {
          res.inputEdit = true
        }
        return res
      })
    },
    // 隐藏农资编辑框
    hiddenInputEditItem(index) {
      this.taskUseReMaterial = this.taskUseReMaterial.map((res, resIndex) => {
        if (index === resIndex) {
          res.inputEdit = false
        }
        return res
      })
    },
    // 定位事件
    positonFn(e) {
      return document.querySelectorAll('.form')[0]
    },
    // 选择开始事件
    changeStarTime(value, mode) {
      this.starDisabledData = mode
    },
    // 选择结束事件
    changeEndTime(value, mode) {
      console.log(moment(value, 'YYYY-MM-DD'))
      this.endDisabledData = mode
    },
    // 计算不可选开始事件
    starDisabledDataFn(current) {
      if (!this.endDisabledData) {
        return current < moment(this.planStartTime).startOf('day')
      }
      return (
        moment(this.endDisabledData).endOf('day') < current ||
        current < moment(this.planStartTime).startOf('day')
      )
    },
    // 计算不可选结束事件
    endDisabledDataFn(current) {
      return current < moment(this.starDisabledData).startOf('day')
    }
  }
}
</script>
<style lang="less" scoped>
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
.m-r-10 {
  margin-right: 10px;
}
.form {
  position: relative;
}
</style>
