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
            <a-steps :current="current" style="width: 70%;">
              <a-step v-for="item in steps" :key="item.id" :title="item.title" />
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
                <div v-if="current === 0">
                  <a-form :form="addFormOne">
                    <a-row>
                      <!-- 品类 -->
                      <a-col :span="24">
                        <a-form-item
                          label="产品品类"
                          style="margin-top:18px;"
                          :label-col="{ span: 2 }"
                          :wrapper-col="{ span: 6 }"
                          >
                          <a-select
                            placeholder="请选择"
                            :allowClear="true"
                            style="width: 100%;"
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
                            <a-select-option v-for="item in categoryArray" :key="item.categoryId" :value="item.categoryId">{{item.categoryName}}</a-select-option>
                          </a-select>
                        </a-form-item>
                      </a-col>
                    </a-row>
                    <a-row>
                      <!-- 品种 -->
                      <a-col :span="24">
                        <a-form-item
                          label="产品品种"
                          :label-col="{ span: 2 }"
                          :wrapper-col="{ span: 6 }"
                          >
                          <a-select
                            placeholder="请选择"
                            :allowClear="true"
                            style="width: 100%;"
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
                          >
                            <a-select-option v-for="item in breedArray" :key="item.breedId" :value="item.breedId">{{item.breedName}}</a-select-option>
                          </a-select>
                        </a-form-item>
                      </a-col>
                    </a-row>
                    <a-row>
                      <!-- 菌包名称 -->
                      <a-col :span="24">
                        <a-form-item
                          label="菌包名称"
                          :label-col="{ span: 2 }"
                          :wrapper-col="{ span: 6 }"
                          >
                          <a-select
                            placeholder="请选择"
                            :allowClear="true"
                            style="width: 100%;"
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
                            <a-select-option v-for="item in fungusProduceArray" :key="item.fungusProduceId" :value="item.fungusProduceId">{{item.fungusProduceName}}</a-select-option>
                          </a-select>
                        </a-form-item>
                      </a-col>
                    </a-row>
                    <a-row>
                      <!-- 加工车间 -->
                      <a-col :span="24">
                        <a-form-item
                          label="加工车间"
                          :label-col="{ span: 2 }"
                          :wrapper-col="{ span: 6 }"
                          >
                          <a-select
                            placeholder="请选择"
                            :allowClear="true"
                            style="width: 100%;"
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
                          >
                            <a-select-option v-for="item in workshopArray" :key="item.workshopId" :value="item.workshopId">{{item.workshopName}}</a-select-option>
                          </a-select>
                        </a-form-item>
                      </a-col>
                    </a-row>
                    <a-row>
                      <!-- 开始时间 -->
                      <a-col :span="24">
                        <a-form-item
                          label="开始时间"
                          :label-col="{ span: 2 }"
                          :wrapper-col="{ span: 6 }"
                          >
                          <a-date-picker
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
                            @change="datePickerChange" style="width: 100%;"/>
                        </a-form-item>
                      </a-col>
                    </a-row>

                  </a-form>
                </div>
                <!-- 第二步内容 -->
                <div v-else>
                  第二步
                </div>
              </div>
            </div>
            <!-- 底部按钮 -->
            <div class="steps-action">
              <!-- 第一步 -->
              <div v-if="current === 0">
                <a-button type="primary" @click="next">下一步</a-button>
              </div>
              <!-- 第二步 -->
              <div v-else>
                <a-button class="button" type="primary" @click="prev">上一步</a-button>
                <a-button class="button" type="primary">生成任务</a-button>
                <a-button class="button" type="primary">
                  <router-link :to="{name: 'BacteriaBagTaskManagement'}">取消</router-link>
                </a-button>
              </div>
            </div>
          </div>
        </div>
      </a-layout-content>
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
  Button
} from 'ant-design-vue'
import CrumbsNav from '@/components/crumbsNav/CrumbsNav' // 面包屑
import { addTaskCrumbs, stepsArray } from './config.js'
import { getCategory, getBreedList, fungusproduceList, workshopList } from '@/api/farmPlan.js'
Vue.use(Layout)
Vue.use(Steps)
Vue.use(Form)
Vue.use(Row)
Vue.use(Col)
Vue.use(Select)
Vue.use(DatePicker)
Vue.use(Button)
export default {
  components: {
    CrumbsNav
  },
  data () {
    return {
      addTaskCrumbs,
      addFormOne: this.$form.createForm(this),
      current: 0,
      steps: stepsArray,
      bizId: '',
      breedArray: [],
      breedId: '', // 品种id
      breedName: '', // 品种名称
      categoryArray: [],
      categoryId: '', // 品类id
      categoryName: '', // 品类名称
      fungusProduceArray: [],
      fungusProduceId: '', // 菌包id
      fungusProduceName: '', // 菌包名称
      startTime: '', // 任务开始时间
      workshopArray: [],
      workshopId: '', // 车间id
      workshopName: '' // 车间名称
    }
  },
  created() {
    // 获取品种
    this.getCategoryList()
    // 获取菌包
    this.getFungusproduceList()
    // 获取车间
    this.workshopList()
  },
  methods: {
    // 获取品类
    getCategoryList () {
      getCategory()
        .then(res => {
          if (res.success === 'Y') {
            this.categoryArray = res.data || []
          } else {
            this.$message.error(res.message)
          }
        })
    },
    // 获取品种
    getBreedList (value) {
      if (value) {
        getBreedList(value)
          .then(res => {
            if (res.success === 'Y') {
              this.breedArray = res.data || []
            } else {
              this.$message.error(res.message)
            }
          })
      }
    },
    // 获取菌包
    getFungusproduceList () {
      fungusproduceList()
        .then(res => {
          if (res.success === 'Y') {
            this.fungusProduceArray = res.data || []
          } else {
            this.$message.error(res.message)
          }
        })
    },
    // 获取车间
    workshopList () {
      workshopList()
        .then(res => {
          if (res.success === 'Y') {
            this.workshopArray = res.data || []
          } else {
            this.$message.error(res.message)
          }
        })
    },
    // 时间选择
    datePickerChange () {

    },
    // 下一步
    next() {
      this.current = 1
    },
    // 上一步
    prev() {
      this.current = 0
    }

  }
}
</script>

<style lang="less" scoped>
.add-task{
  width: 100%;
  &-wrapper{
    padding: 24px;
    background: #fff;
    margin-bottom: 10px;
    border-radius: 4px;
    .title-wrapper{
      margin-top: 32px;
      text-align: left;
      .title-text{
        font-size: 16px;
        color: #333;
        line-height: 22px;
        margin-left: 8px;
      }
      .icon{
        width: 2px;
        height: 14px;
        background: rgba(60,140,255,1);
        border-radius: 1px;
        display: inline-block;
      }
    }
    .content-wrapper{
      /deep/ .ant-row{
        .ant-form-item-label{
          text-align: left;
          width: 100px;
        }
      }
    }
    .steps-content {

    }
    .steps-action {
      margin-top: 24px;
      .button {
        margin: 0 5px;
      }
    }
  }
}
</style>
