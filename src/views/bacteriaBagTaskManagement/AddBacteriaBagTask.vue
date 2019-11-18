<!-- eslint-disable -->
<template>
  <div class="add-task">
    <a-layout>
      <div style="padding-top: 16px;padding-left:16px;">
        <crumbs-nav :crumbs-arr="addTaskCrumbs" />
      </div>
      <a-layout-content style="margin: 16px;margin-top:0;">
        <div class="add-task-wrapper">
          <div>
            <!-- 步骤 -->
            <a-steps
              :current="current"
              style="width: 70%;"
            >
              <a-step
                v-for="item in steps"
                :key="item.id"
                :title="item.title"
              />
            </a-steps>
            <div class="steps-content">
              <!-- title -->
              <div class="title-wrapper">
                <div class="icon"></div>
                <span class="title-text">{{current === 0 ? '基本信息' : '生产操作'}}</span>
              </div>
              <!-- 内容 -->
              <div class="content-wrapper">
                <!-- 第一步内容 -->
                <div v-show="current === 0">
                  <a-form :form="addFormOne">
                    <a-row
                      :span="40"
                      style="margin-top:18px;"
                    >
                      <!-- 品类 -->
                      <a-col :span="8">
                        <a-form-item
                          label="产品品类"
                          :label-col="{ span: 2 }"
                          :wrapper-col="{ span: 22 }"
                        >
                          <a-select
                            placeholder="请选择"
                            :allowClear="true"
                            :getPopupContainer="triggerNode => {
                              return triggerNode.parentNode || document.body;
                            }"
                            style="width: 100%;"
                            :disabled="isEdit"
                            v-decorator="[
                              'categoryId',
                              {
                                rules: [
                                  {
                                    required: true,
                                    message: '请选择产品品类',
                                  }
                                ],
                              },
                            ]"
                            @change="getBreedList"
                          >
                            <a-select-option
                              v-for="item in categoryArray"
                              :key="item.categoryId"
                              :value="item.categoryId"
                            >{{item.categoryName}}</a-select-option>
                          </a-select>
                        </a-form-item>
                      </a-col>
                      <!-- 品种 -->
                      <a-col :span="8">
                        <a-form-item
                          label="产品品种"
                          :label-col="{ span: 2 }"
                          :wrapper-col="{ span: 22 }"
                        >
                          <a-select
                            placeholder="请选择"
                            :allowClear="true"
                            :getPopupContainer="triggerNode => {
                              return triggerNode.parentNode || document.body;
                            }"
                            style="width: 100%;"
                            :disabled="isEdit"
                            v-decorator="[
                              'breedId',
                              {
                                rules: [
                                  {
                                    required: true,
                                    message: '请选择产品品种',
                                  }
                                ],
                              },
                            ]"
                            @change="getBizIdList"
                          >
                            <a-select-option
                              v-for="item in breedArray"
                              :key="item.breedId"
                              :value="item.breedId"
                            >{{item.breedName}}</a-select-option>
                          </a-select>
                        </a-form-item>
                      </a-col>
                      <!-- 菌包名称 -->
                      <a-col :span="8">
                        <a-form-item
                          label="菌包名称"
                          :label-col="{ span: 2 }"
                          :wrapper-col="{ span: 22 }"
                        >
                          <a-select
                            placeholder="请选择"
                            :allowClear="true"
                            :getPopupContainer="triggerNode => {
                              return triggerNode.parentNode || document.body;
                            }"
                            style="width: 100%;"
                            :disabled="isEdit"
                            v-decorator="[
                              'fungusProduceId',
                              {
                                rules: [
                                  {
                                    required: true,
                                    message: '请选择菌包名称',
                                  }
                                ],
                              },
                            ]"
                          >
                            <a-select-option
                              v-for="item in fungusProduceArray"
                              :key="item.bizId"
                              :value="item.bizId"
                            >{{item.fungusProduceName}}</a-select-option>
                          </a-select>
                        </a-form-item>
                      </a-col>
                    </a-row>
                    <a-row :span="40">
                      <!-- 加工车间 -->
                      <a-col :span="8">
                        <a-form-item
                          label="加工车间"
                          :label-col="{ span: 2 }"
                          :wrapper-col="{ span: 22 }"
                        >
                          <a-select
                            placeholder="请选择"
                            :allowClear="true"
                            :getPopupContainer="triggerNode => {
                              return triggerNode.parentNode || document.body;
                            }"
                            style="width: 100%;"
                            :disabled="isEdit"
                            v-decorator="[
                              'workshopId',
                              {
                                rules: [
                                  {
                                    required: true,
                                    message: '请选择加工车间',
                                  }
                                ],
                              },
                            ]"
                            @change="changeWorkshop"
                          >
                            <a-select-option
                              v-for="item in workshopArray"
                              :key="item.workshopId"
                              :value="item.workshopId"
                            >{{item.workshopName}}</a-select-option>
                          </a-select>
                        </a-form-item>
                      </a-col>
                      <!-- 开始时间 -->
                      <a-col :span="8">
                        <a-form-item
                          label="开始时间"
                          :label-col="{ span: 2 }"
                          :wrapper-col="{ span: 22 }"
                        >
                          <a-date-picker
                          format="YYYY-MM-DD"
                          :getCalendarContainer="triggerNode => {
                            return triggerNode.parentNode || document.body;
                          }"
                          :disabledDate="disabledDate"
                            v-decorator="[
                              'startTime',
                              {
                                rules: [
                                  {
                                    required: true,
                                    message: '请选择开始时间',
                                  }
                                ],
                              },
                            ]"
                            @change="datePickerChange"
                            style="width: 100%;"
                          />
                        </a-form-item>
                      </a-col>
                    </a-row>
                  </a-form>
                </div>
                <!-- 第二步内容 -->
                <div v-show="current === 1">
                  <a-form
                    :form="addFormTwo"
                    style="margin-left: 72px;"
                  >
                    <a-row
                      :span="72"
                      style="margin-top:32px;"
                    >
                      <a-col :span="2">
                        <a-form-item
                          label="生产操作"
                          :label-col="{ span: 2 }"
                          :wrapper-col="{ span: 22 }"
                        >
                          <div
                            class="action-text"
                            v-for="(item) in actionArray"
                            :key="isEdit ? item.actionId : item.optionId"
                          >{{isEdit ? item.actionName : item.optionName }}</div>
                        </a-form-item>
                      </a-col>
                      <a-col :span="8">
                        <a-form-item
                          label="操作时长"
                          :label-col="{ span: 2 }"
                          :wrapper-col="{ span: 22 }"
                        >
                          <div
                            class="task-time-box"
                            v-for="(item, index) in dayTime"
                            :key="index"
                          >
                            <span>
                              第
                              <a-form-item style="display:inline-block;">
                                <a-input
                                  class="day-input"
                                  size="small"
                                  v-decorator="[
                                  `taskStartTime_${index}`,
                                  { rules: [{ required: true,  message: '请输入开始天数' },
                                  { validator: handleValidator }] },
                                ]"
                                />
                              </a-form-item>天
                            </span>
                            <span class="day-to"></span>
                            <span>
                              第
                              <a-form-item style="display:inline-block;">
                                <a-input
                                  class="day-input"
                                  size="small"
                                  v-decorator="[
                                  `taskEndTime_${index}`,
                                  { rules: [{ required: true, message: '请输入结束天数' },
                                  { validator: handleValidator }
                                  ] },
                                ]"
                                />
                              </a-form-item>天
                            </span>
                          </div>
                        </a-form-item>
                      </a-col>
                      <a-col :span="14">
                        <a-form-item
                          :label-col="{ span: 2 }"
                          :wrapper-col="{ span: 22 }"
                          v-for="(itemNum, index) in 10"
                          :key="'assigner'+itemNum"
                        >
                          <span
                            v-if="index === 0"
                            slot="label"
                          >负责人</span>
                          <a-select
                            placeholder="请选择"
                            :allowClear="true"
                            :getPopupContainer="triggerNode => {
                              return triggerNode.parentNode || document.body;
                            }"
                            style="width: 100%;"
                            v-decorator="[
                              `assignerId_${index}`,
                              {
                                rules: [{
                                  required: true,
                                  message: `请选择负责人`
                                }],
                              },
                            ]"
                          >
                            <a-select-option
                              v-for="item in assignerArray"
                              :key="item.userId"
                              :value="item.userId"
                            >{{item.userName}}</a-select-option>
                          </a-select>
                        </a-form-item>
                      </a-col>
                    </a-row>
                  </a-form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a-layout-content>
      <!-- 底部按钮 -->
      <div class="steps-action">
        <!-- 第一步 -->
        <div v-if="current === 0">
          <a-button class="button">
            <router-link :to="{name: 'BacteriaBagTaskManagement'}">取消</router-link>
          </a-button>
          <a-button
            class="button"
            type="primary"
            @click="next"
          >下一步</a-button>
        </div>
        <!-- 第二步 -->
        <div v-else>
          <a-button class="button">
            <router-link :to="{name: 'BacteriaBagTaskManagement'}">取消</router-link>
          </a-button>
          <a-button
            class="button"
            type="primary"
            @click="prev"
          >上一步</a-button>
          <a-button
            class="button"
            type="primary"
            @click="handleEstablishTask"
          >生成任务</a-button>
        </div>
      </div>
    </a-layout>
  </div>
</template>

<script>
import Vue from 'vue'
import {
  Layout,
  Steps,
  Form,
  Row,
  Col,
  Select,
  DatePicker,
  Input,
  Button
} from 'ant-design-vue'
import CrumbsNav from '@/components/crumbsNav/CrumbsNav' // 面包屑
import moment from 'moment'
import { addTaskCrumbs, stepsArray, dayTime } from './config.js'
import {
  getCategory,
  getBreedList,
  getFungusproduceList,
  workshopList,
  actionList,
  userList,
  postFungusTask,
  postEditFungusTask,
  getFungusTask
} from '@/api/farmPlan.js'
Vue.use(Layout)
Vue.use(Steps)
Vue.use(Form)
Vue.use(Row)
Vue.use(Col)
Vue.use(Select)
Vue.use(DatePicker)
Vue.use(Input)
Vue.use(Button)
export default {
  components: {
    CrumbsNav
  },
  data() {
    return {
      addTaskCrumbs,
      addFormOne: this.$form.createForm(this), // 第一步的from表单校验
      addFormTwo: this.$form.createForm(this), // 第二步的from表单校验
      current: 0,
      steps: stepsArray,
      bizId: '',
      breedArray: [],
      breedId: '', // 品种id
      categoryArray: [],
      categoryId: '', // 品类id
      fungusProduceArray: [],
      fungusProduceId: '', // 菌包id
      startTime: '', // 任务开始时间
      workshopArray: [],
      workshopId: '', // 车间id
      assignerArray: [], // 负责人
      assignerId: '',
      actionArray: [], // 生产操作列表
      dayTime, // 操作时长
      actionTasks: [], // 生产操作
      editCategoryId: '', // 品类ID
      editBreedId: '', // 品种id
      editWorkshopId: '', // 编辑的车间
      isEdit: false
    }
  },
  created() {
    if (this.$route.query.bizId) {
      this.bizId = this.$route.query.bizId
      this.isEdit = true
      this.getFungusTask(this.bizId)
    } else {
      this.isEdit = false
      // 获取生产操作
      this.actionList()
    }
    // 获取品种
    this.getCategoryList()
    // 获取车间
    this.workshopList()
    // 获取负责人
    this.AssignerList()
  },
  methods: {
    // 获取品类
    getCategoryList() {
      getCategory().then(res => {
        if (res.success === 'Y') {
          this.categoryArray = res.data || []
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 获取品种
    getBreedList(value) {
      if (value) {
        // 如果品类有修改清空品种和菌包内的数据 让其重新选择
        if (this.editCategoryId !== value) {
          this.editCategoryId = value
          this.addFormOne.setFieldsValue({
            breedId: '',
            fungusProduceId: ''
          })
          this.actionTasks = [] // 将第二步的值设置为默认数据
        }
        getBreedList(value).then(res => {
          if (res.success === 'Y') {
            this.breedArray = res.data || []
          } else {
            this.$message.error(res.message)
          }
        })
      }
    },
    // 选择品种获取菌包
    getBizIdList(value) {
      if (value) {
        // 如果品种有修改清空菌包内的数据 让其重新选择
        if (this.editBreedId !== value) {
          this.editBreedId = value
          this.addFormOne.setFieldsValue({
            fungusProduceId: ''
          })
          this.actionTasks = [] // 将第二步的值设置为默认数据
        }
        // 获取菌包
        getFungusproduceList(value).then(res => {
          if (res.success === 'Y') {
            this.fungusProduceArray = res.data || []
          } else {
            this.$message.error(res.message)
          }
        })
      }
    },
    // 获取车间
    workshopList() {
      workshopList().then(res => {
        if (res.success === 'Y') {
          this.workshopArray = res.data || []
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 选择车间
    changeWorkshop(value) {
      if (value) {
        // 如果车间有修改清空第二步的值
        if (this.editWorkshopId !== value) {
          this.editWorkshopId = value
          this.actionTasks = [] // 将第二步的值设置为默认数据
        }
      }
    },
    // 时间选择
    datePickerChange(e, value) {
      if (value) {
        this.startTime = value
      }
    },
    // 获取生产操作
    actionList() {
      actionList().then(res => {
        if (res.success === 'Y') {
          this.actionArray = res.data || []
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 获取负责人
    AssignerList() {
      userList().then(res => {
        if (res.success === 'Y') {
          this.assignerArray = res.data || []
        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleValidator (rule, value, callback) {
      console.log(rule, value, callback)
      if (value) {
        let reg = /^[0-9]\d*$/
        if (!isNaN(Number(value)) && Number(value) >= 0 && reg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的单价'))
        }
      } else {
        callback(new Error(' '))
      }
    },
    // 下一步
    next() {
      // 校验是否必填的都填了
      this.addFormOne.validateFields((err, values) => {
        if (!err) {
          this.breedId = values.breedId
          this.categoryId = values.categoryId
          this.fungusProduceId = values.fungusProduceId
          this.workshopId = values.workshopId
          // 打开下一步
          this.current = 1
          // 设置第二步的默认天数
          if (this.actionTasks.length > 0 && this.bizId) {
            // 如果有这个两个值就是编辑
            this.$nextTick(() => {
              let editObj = {}
              this.actionTasks.forEach((item, index) => {
                editObj[`taskStartTime_${index}`] = item.taskStartTime // 开始天数
                editObj[`taskEndTime_${index}`] = item.taskEndTime // 结束天数
                editObj[`assignerId_${index}`] = item.assignerId // 负责人
              })
              this.addFormTwo.setFieldsValue(editObj)
            })
          } else {
            let obj = {}
            this.dayTime.forEach((item, index) => {
              obj[`taskStartTime_${index}`] = item.dayStart
              obj[`taskEndTime_${index}`] = item.dayEnd
              obj[`assignerId_${index}`] = ''
            })
            this.$nextTick(() => {
              this.addFormTwo.setFieldsValue(obj)
            })
          }
        }
      })
    },
    // 上一步
    prev() {
      this.current = 0
    },
    // 创建任务
    handleEstablishTask() {
      this.addFormTwo.validateFields((err, values) => {
        if (!err) {
          let assignerArray = []
          let taskStartTimeArray = []
          let taskEndTimeArray = []
          for (let i = 0; i < 10; i++) {
            assignerArray[i] = {}
            taskStartTimeArray[i] = {}
            taskEndTimeArray[i] = {}
            let assignerIdKey = `assignerId_${i}`
            let taskStartTimeKey = `taskStartTime_${i}`
            let taskEndTimeKey = `taskEndTime_${i}`
            assignerArray[i][assignerIdKey] = values[assignerIdKey]
            taskStartTimeArray[i][taskStartTimeKey] = values[taskStartTimeKey]
            taskEndTimeArray[i][taskEndTimeKey] = values[taskEndTimeKey]
          }
          this.actionTasks = this.actionArray.map((item, index) => {
            return {
              instId: this.isEdit ? item.instId : null,
              actionId: this.isEdit ? item.actionId : item.optionId,
              actionName: this.isEdit ? item.actionName : item.optionName,
              assignerId: assignerArray[index][`assignerId_${index}`],
              taskStartTime:
                taskStartTimeArray[index][`taskStartTime_${index}`],
              taskEndTime: taskEndTimeArray[index][`taskEndTime_${index}`]
            }
          })
          let data = {
            actionTasks: this.actionTasks,
            bizId: this.bizId,
            breedId: this.breedId,
            categoryId: this.categoryId,
            fungusProduceId: this.fungusProduceId,
            startTime: this.startTime,
            workshopId: this.workshopId
          }
          // console.log(this.actionTasks, data)
          if (this.isEdit) {
            postEditFungusTask(data)
              .then(res => {
                if (res.success === 'Y') {
                  this.$router.push({ name: 'BacteriaBagTaskManagement' })
                  this.$message.success(res.message)
                } else {
                  this.$message.error(res.message)
                }
              })
          } else {
            // 新增接口
            postFungusTask(data)
              .then(res => {
                if (res.success === 'Y') {
                  this.$router.push({ name: 'BacteriaBagTaskManagement' })
                  this.$message.success(res.message)
                } else {
                  this.$message.error(res.message)
                }
              })
          }
        }
      })
    },
    // 编辑获取详情
    getFungusTask(bizId) {
      getFungusTask(bizId).then(res => {
        if (res.success === 'Y') {
          // 根据品类获取品种
          if (res.data && res.data.categoryId) {
            this.editCategoryId = res.data.categoryId
            this.getBreedList(res.data.categoryId)
          }
          // 根据品种获取菌包名称
          if (res.data && res.data.breedId) {
            this.editBreedId = res.data.breedId
            this.getBizIdList(res.data.breedId)
          }
          this.editWorkshopId = (res.data && res.data.workshopId) || ''
          this.addFormOne.setFieldsValue({
            categoryId: (res.data && res.data.categoryId) || '',
            breedId: (res.data && res.data.breedId) || '',
            fungusProduceId: (res.data && res.data.fungusProduceId) || '',
            workshopId: (res.data && res.data.workshopId) || '',
            startTime: moment(
              (res.data && res.data.startTime) || '',
              'YYYY-MM-DD'
            )
          })
          this.startTime = (res.data && res.data.startTime) || ''
          this.actionTasks = (res.data && res.data.actionTasks) || []
          this.actionArray = (res.data && res.data.actionTasks) || [] // 如果是操作取返回回来的生产操作
          console.log(this.actionArray, '详情')
        } else {
          this.$message.error(res.message)
        }
      })
    },
    disabledDate(current) {
      return current && current < moment().subtract(1, 'day')
    }
  }
}
</script>
<style lang="less" scoped>
.add-task {
  width: 100%;
  &-wrapper {
    padding: 24px;
    background: #fff;
    margin-bottom: 10px;
    border-radius: 4px;
    .steps-content {
      .title-wrapper {
        margin-top: 32px;
        text-align: left;
        .title-text {
          font-size: 16px;
          color: #333;
          line-height: 22px;
          margin-left: 8px;
        }
        .icon {
          width: 2px;
          height: 14px;
          background: rgba(60, 140, 255, 1);
          border-radius: 1px;
          display: inline-block;
        }
      }
      .content-wrapper {
        /deep/ .ant-row {
          .ant-form-item-label {
            text-align: left;
            width: 100px;
          }
        }
        .action-text {
          width: 72px;
          height: 24px;
          background: #3c8dff;
          text-align: center;
          line-height: 24px;
          font-size: 12px;
          border-radius: 2px;
          color: #fff;
          margin-bottom: 39px;
        }
        .action-text:first-child {
          margin-top: 12px;
        }
        .task-time-box {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .day-input {
            width: 72px;
            height: 24px;
            text-align: center;
            margin: 0 8px;
          }
          .day-to {
            display: inline-block;
            width: 24px;
            height: 1px;
            margin: 0 16px;
            margin-bottom: 20px;
            background: #ddd;
          }
        }
        .task-time-box:first-child {
          margin-top: 4px;
        }
      }
      .button {
        margin: 0 5px;
      }
    }
  }
  .steps-action {
    text-align: right;
    margin-right: 16px;
    margin-bottom: 16px;
    .button {
      margin: 0 5px;
    }
  }
}
</style>
