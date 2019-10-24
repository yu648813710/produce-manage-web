/**
修改方案页面
*/
<template>
  <div style="height: 100%">
    <div class="crumbCtr">
      <crumbsNav :crumbsArr="crumbsArr"></crumbsNav>
    </div>
    <div class="wrapper">
      <a-steps :current="current" :labelPlacement="vertical">
        <a-step :labelPlacement="vertical" v-for="(item, index) in steps" :key="index" :title="item.title"/>
      </a-steps>
      <!--基本信息-->
      <div v-show="current === 0">
        <div class="title-wrapper">
          <div class="icon"></div>
          <span class="title-text">基本信息</span>
        </div>
        <div class="detail-wrapper">
          <a-form
            :form="msgForm.form"
            @submit="handleMsgSubmit"
          >
            <a-row>
              <a-col :span="11">
                <div class="search-input-wrapper">
                  <a-form-item :label="`方案名称`" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                    <a-input
                      v-decorator="msgForm.projectNameRule"
                      placeholder="请输入方案名称"
                      class="search-input"
                    />
                    <div class="ant-form-explain">
                      <span v-if="projectNameRepeat">方案名称已存在，请重新输入</span>
                    </div>
                  </a-form-item>
                </div>
              </a-col>
              <a-col :span="11">
                <div class="search-input-wrapper">
                  <a-form-item :label="`产品品类`" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                    <a-select class="detail-input" placeholder="请选择产品品类" style="width: 100%"
                              @change="categoryChange"
                              v-decorator="msgForm.productCategoryRule"
                    >
                      <a-select-option v-for="(item,index) in productCategoryList"
                                       :key="item.value"
                      >
                        {{item.label}}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                </div>
              </a-col>
              <a-col :span="11">
                <div class="search-input-wrapper">
                  <a-form-item :label="`产品品种`" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                    <a-select class="detail-input" placeholder="请选择产品品种" style="width: 100%"
                              @change="breedChange"
                              v-decorator="msgForm.productVarietyRule"
                    >
                      <a-select-option v-for="(item,index) in productVarietyList"
                                       :key="item.value"
                      >
                        {{item.label}}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                </div>
              </a-col>
              <a-col :span="11">
                <div class="search-input-wrapper">
                  <a-form-item :label="`方案权限`" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                    <a-select class="detail-input" placeholder="请选择方案权限" style="width: 100%"
                              @change="projectPowerChange"
                              v-decorator="msgForm.projectPowerRule"
                    >
                      <a-select-option v-for="(item,index) in projectPowerArr"
                                       :key="item.value"
                      >
                        {{item.label}}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                </div>
              </a-col>
              <a-col :span="11">
                <div class="search-input-wrapper">
                  <a-form-item :label="`参与人`" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                    <a-select class="detail-input" placeholder="请选择参与人" style="width: 100%"
                              mode="multiple"
                              @change="participantUserChange"
                              v-decorator="msgForm.participantUserRule"
                    >
                      <a-select-option v-for="(item,index) in participantUserIdArr"
                                       :key="item.value"
                      >
                        {{item.label}}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                </div>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </div>
      <!--产品周期-->
      <div v-show="current === 1">
        <div class="title-wrapper">
          <div class="icon"></div>
          <span class="title-text">产品周期</span>
        </div>
        <div class="detail-wrapper">
          <a-row class="lineCtr">
            <a-col :span="2">
              <div class="search-input-wrapper overHidden">
                <span class="step2-title">时间单位：</span>
              </div>
            </a-col>
            <a-col :span="20">
              <a-radio-group name="radioGroup" @change="checkRadio" :value="dateType">
                <div :class="dateType === '3' ? 'checkDateTpyeRadio' : 'dateTpyeRadio'">
                  <a-radio value="3">周</a-radio>
                </div>
                <div :class="dateType === '5' ? 'checkDateTpyeRadio' : 'dateTpyeRadio'">
                  <a-radio value="5">天</a-radio>
                </div>
              </a-radio-group>
            </a-col>
          </a-row>
          <a-row class="lineCtr">
            <a-col :span="2">
              <div class="search-input-wrapper overHidden">
                <span class="step2-title">生长周期：</span>
              </div>
            </a-col>
            <a-col :span="20">
              <div class="growthCycle" v-for="(item,index) in cycleList" :key="index">
                <a-button type="primary">{{item.label}}</a-button>
              </div>
              <span @click="editCycle">
                <a-button type="primary"><a-icon type="setting"/>编辑周期</a-button>
              </span>
            </a-col>
          </a-row>
          <a-row class="lineCtr">
            <a-col :span="2">
              <div class="search-input-wrapper overHidden">
                <span class="step2-title">周期时长：</span>
              </div>
            </a-col>
            <a-col :span="21">
              <div class="cycleForm">
                <a-form :form="cycleForm.form" @submit="cycleSubmit" :label-col="{ span: 0 }"
                        :wrapper-col="{ span: 3 }">
                  <a-form-item
                    v-for="(k, index) in cycleList"
                    :key="index"
                    :required="false"
                  >
                    <div class="growthCycle">
                      <a-input-number
                        :min="1"
                        class="search-input"
                        v-decorator="[
          `${index}`,
          {
          validateTrigger: ['change', 'blur'],
            rules: [
              {
                required: true,
                whitespace: true,
                message: '请输入周期时长',
              },
            ],
          },
        ]"
                      />
                    </div>

                  </a-form-item>
                </a-form>
              </div>

            </a-col>

          </a-row>
        </div>
      </div>
      <!--任务列表-->
      <div style="padding-bottom: 50px" v-show="current === 2">
        <div class="title-wrapper">
          <div class="icon"></div>
          <span class="title-text">任务列表</span>
        </div>
        <div @click="addTask">
          <a-button
            type="primary"
            class="add-button"
          >
            新增任务
          </a-button>
        </div>

        <a-table
          :scroll="{ x: 1280 }"
          :columns="columns"
          :dataSource="list"
          :style="{marginTop: '50px'}"
        >
          <div slot="tableNongZi" slot-scope="record" class="tableLineCtr">
            {{record[0] ? record[0].name + '-' + record[0].consumption + record[0].unit : ''}}
          </div>
          <div slot="executionCycle" :title="record" slot-scope="record" class="tableLineCtr">
            {{record}}
          </div>
          <span slot="id" slot-scope="text, record, index">{{index + 1}}</span>
          <div slot="expandedRowRender" slot-scope="record" style="margin: 0" class="expendLine">
            <div class="expendContent" v-for="(item, index) in record.tableNongZi" :key="index">
              <div class="tableCtrol1"></div>
              <div class="tableCtrol1">{{record.taskAction}}</div>
              <div class="tableCtrol1">{{record.cycle}}</div>
              <div class="tableCtrol1">{{record.type}}</div>
              <div class="tableCtrol2">
                <div :title="item.name + '-' + item.consumption + item.unit" class="textOverCtr">{{item.name}} - {{item.consumption}}{{item.unit}}</div>
              </div>
              <div class="textOverCtr" :title="record.executionCycle">{{record.executionCycle}}</div>

              <div :title="record.purpose" class="textOverCtr">{{record.purpose}}</div>
              <div :title="record.cycleDescription" class="tableCtrol1 textOverCtr">{{record.cycleDescription}}</div>
              <div></div>

            </div>

          </div>
          <div
            class="action"
            slot="operation"
            slot-scope="record"
          >
            <span @click="editAction(record)">编辑</span>
            <span @click="taskAction(1,record)">删除</span>
          </div>
          <div class="textOverCtr" slot="purpose" slot-scope="text, record, index" :title="record.purpose">
            {{record.purpose}}
          </div>
          <div class="textOverCtr" slot="cycleDescription" slot-scope="text, record, index"
               :title="record.cycleDescription">{{record.cycleDescription}}
          </div>
        </a-table>
      </div>

    </div>
    <div class="steps-action">
      <a-button
        v-if="current < steps.length - 2"
        type="primary" @click="next"
      >
        下一步
      </a-button>
      <a-button
        v-if="current == steps.length - 2"
        type="primary"
        @click="commitTaskData"
      >
        提交方案
      </a-button>
      <a-button
        v-if="current>0"
        style="margin-left: 8px"
        @click="prev"
      >
        上一步
      </a-button>
    </div>
    <!--    编辑周期排序-->
    <div v-if="visible">
      <a-modal
        title="编辑周期"
        :width="1150"
        :maskClosable="false"
        :keyboard="false"
        okText="确定"
        cancelText='取消'
        :visible="visible"
        @ok="handleOk(1)"
        :confirmLoading="confirmLoading"
        @cancel="handleCancel(1)"
      >
        <a-row class="lineCtr">
          <a-col :span="2">
            <div class="search-input-wrapper overHidden">
              <span class="step2-title">周期时长：</span>
            </div>
          </a-col>
          <a-col :span="19">
            <div class="growthCycle" v-for="(item,index) in arrList" :key="index">
              <a-button type="primary">{{item.label}}</a-button>
              <div class="moneLabel" v-for="(item,moveIndex) in moveList" :key="index" @click="moveLabel(index,moveIndex)">
                {{item.label}}
              </div>
            </div>
          </a-col>
          <a-col :span="3">
            <a-select placeholder="请选择" :disabled="selectList.length === 0 ? true : false" style="width: 120px"
                      @select="handleChange">
              <a-icon slot="suffixIcon" type="smile"/>
              <a-select-option v-for="(item,index) in selectList" :key="JSON.stringify(item)">{{item.label}}
              </a-select-option>
            </a-select>
          </a-col>
        </a-row>
      </a-modal>
    </div>
    <!--    添加周期任务-->
    <div v-if="isAddTask">
      <a-modal
        title="新增任务"
        :width="1150"
        :maskClosable="false"
        :keyboard="false"
        okText="确定"
        cancelText='取消'
        :visible="isAddTask"
        @ok="handleOk(2)"
        :confirmLoading="confirmLoading"
        @cancel="handleCancel(2)"
      >
        <a-row>
          <a-form
            :form="taskForm.form"
            @submit="taskSubmit"
          >
            <a-col :span="11">
              <a-form-item :label="`所属周期`" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                <a-select class="detail-input" placeholder="请选择周期" style="width: 100%"
                          @change="cycleChange"
                          :disabled="checkIsEditTask"
                          v-decorator="taskForm.cycleRule"
                >
                  <a-select-option v-for="(item,index) in taskCycle"
                                   :key="JSON.stringify(item)"
                  >
                    {{item.label}}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item :label="`农事类型`" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                <a-select class="detail-input" placeholder="请选择农事类型" style="width: 100%"
                          @change="frameChange"
                          :disabled="checkIsEditTask"
                          v-decorator="taskForm.frameRule"
                >
                  <a-select-option v-for="(item,index) in frameType"
                                   :key="JSON.stringify(item)"
                  >
                    {{item.label}}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item :label="`任务操作`" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                <a-select class="detail-input" placeholder="请选择任务操作" style="width: 100%"
                          :disabled="!isFrameType || checkIsEditTask"
                          @change="actionChange"
                          v-decorator="taskForm.actionRule"
                >
                  <a-select-option v-for="(item,index) in actionType"
                                   :key="JSON.stringify(item)"
                  >
                    {{item.label}}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="1"></a-col>
            <a-col :span="11">
              <a-row>
                <a-col :span="6">
                  <a-form-item style="text-align: right" :label="`执行周期(天):`" :label-col="{ span: 23 }"
                               :wrapper-col="{ span: 1 }">
                    <a-input
                      style="display: none"
                      v-decorator="taskForm.actionInputRule"
                      placeholder="请输入开始周期"
                      class="search-input"
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="7">
                  <a-form-item :label-col="{ span: 0 }" :wrapper-col="{ span: 24 }">
                    <a-input-number
                      :min="1"
                      style="width: 100%"
                      v-decorator="taskForm.minActionRule"
                      placeholder="请输入开始周期"
                      class="search-input"
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="1" class="splitLine">
                  一
                </a-col>
                <a-col :span="7">
                  <a-form-item :label-col="{ span: 0 }" :wrapper-col="{ span: 24 }">
                    <a-input-number
                      :min="1"
                      style="width: 100%"
                      v-decorator="taskForm.maxActionRule"
                      placeholder="请输入结束周期"
                      class="search-input"
                    />
                  </a-form-item>
                </a-col>
              </a-row>
            </a-col>
            <a-col :span="11">
              <a-form-item :label="`用途`" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                <a-input
                  v-decorator="taskForm.purposeRule"
                  placeholder="请输入用途"
                  class="search-input"
                />
              </a-form-item>
            </a-col>
            <a-col :span="11">
              <a-form-item :label="`农事描述`" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                <a-input
                  v-decorator="taskForm.cycleDescRule"
                  placeholder="请输入农事描述"
                  class="search-input"
                />
              </a-form-item>
            </a-col>
          </a-form>
          <!--          <a-col :span="11" :offset="2">-->
          <!--            <div class="search-input-wrapper">-->
          <!--              <span class="search-title">农事描述</span>-->
          <!--              <a-input-->
          <!--                placeholder="Basic usage"-->
          <!--                class="search-input"-->
          <!--                v-model="cycleDesc"-->
          <!--              />-->
          <!--            </div>-->
          <!--          </a-col>-->

        </a-row>
        <a-row>
          <div class="tableHead">
            <li v-for="(item,index) in tableHead" :key="index">{{item.label}}</li>
          </div>
          <div>
            <a-select placeholder="请选择" class="tableSelect"
                      :disabled="!isFrameType"
                      v-model="nongziName"
                      @change="nameChange">
              <a-icon slot="suffixIcon" type="smile"/>
              <a-select-option v-for="(item,index) in name" :key="JSON.stringify(item)">{{item.label}}
              </a-select-option>
            </a-select>
            <a-input-number
              :min="1"
              class="tableSelect"
              v-model="consumption"
            />
            <a-input
              placeholder="Basic usage"
              class="tableSelect"
              v-model="unit"
            />
            <div class="tableAction">
              <span @click="confirmTable(1)">确定</span>
              <span @click="confirmTable(2)">取消</span>
            </div>
          </div>
          <div>
            <li v-for="(item,index) in tableList" :key="index" class="tableLine">
              <span :title="item.name">{{item.name}}</span>
              <span :title="item.consumption">{{item.consumption}}</span>
              <span :title="item.unit">{{item.unit}}</span>
              <span style="color: #3C8CFF;cursor: pointer" @click="delTableLine(index)">删除</span>
            </li>
          </div>
        </a-row>
      </a-modal>
    </div>


  </div>
</template>
<script>
    const tableHead = [
        {label: '农资名称'},
        {label: '用量'},
        {label: '用量单位'},
        {label: '操作'}
    ]
    const productCategoryRule = [
        'productCategory',
        {rules: [{required: true, message: '请选择产品品类'}]}
    ]
    const productVarietyRule = [
        'productVariety',
        {rules: [{required: true, message: '请选择产品品种'}]}
    ]
    const projectPowerRule = [
        'projectPower',
        {rules: [{required: true, message: '请选择产品权限'}]}
    ]
    const participantUserRule = [
        'participantUser',
        {rules: [{required: false,}]}
    ]
    const cycleRule = [
        'taskCycle',
        {rules: [{required: true, message: '请选择周期'}]}
    ]
    const frameRule = [
        'frameType',
        {rules: [{required: true, message: '请选择农事类型'}]}
    ]
    const actionRule = [
        'actionType',
        {rules: [{required: true, message: '请选择任务操作'}]}
    ]
    const minActionRule = [
        'minActionType',
        {rules: [{required: true, message: '请输入开始周期'}]}
    ]
    const maxActionRule = [
        'maxActionType',
        {rules: [{required: true, message: '请输入结束周期'}]}
    ]
    const actionInputRule = [
        'actionInput',
        {rules: [{required: true, message: ''}]}
    ]
    const purposeRule = [
        'purpose',
        {rules: [{required: true, message: '请输入用途'}]}
    ]
    const cycleDescRule = [
        'cycleDesc',
        {rules: [{required: false, message: '请输入农事描述'}]}
    ]
    import Vue from 'vue'
    import domUtil from "../../../utils/domUtil";
    import {
        editProjectDetail,
        getCategoryList,
        getBreedList,
        getLifeCycleList,
        getfarmingTypeList,
        getActionList,
        getMaterialList,
        addNewTask,
        projectUser,
        editProjectMsg, checkProjectRepeat,
    } from '@/api/projectCenter.js'
    import {Form, Table, Row, Col, Steps, Radio, icon, Modal, Button, Input, Select} from 'ant-design-vue'
    import crumbsNav from "@/components/crumbsNav/CrumbsNav";
    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Form)
    Vue.use(Steps)
    Vue.use(Radio)
    Vue.use(icon)
    Vue.use(Modal)
    Vue.use(Button)
    Vue.use(Input)
    Vue.use(Select)
    Vue.use(Table)
    export default {
        data() {
            return {
                crumbsArr:[
                    {name: '当前位置', back: false, path: ''},
                    {name: '生产管理', back: false, path: ''},
                    {name: '方案中心', back: true, path: '/projectCenter'},
                    {name: '编辑方案', back: false, path: ''},
                ],
                projectDetail: this.$route.params,
                list: [],
                msgForm: {
                    projectNameRule: '',
                    productCategoryRule,
                    productVarietyRule,
                    projectPowerRule,
                    participantUserRule,
                    form: this.$form.createForm(this),
                    isCategory: false,
                },
                isFrameType: false,
                taskForm: {
                    form: this.$form.createForm(this),
                    cycleRule,
                    frameRule,
                    actionRule,
                    purposeRule,
                    cycleDescRule,
                    minActionRule,
                    maxActionRule,
                    actionInputRule,
                },
                nongziName: '',
                cycleForm: {
                    form: this.$form.createForm(this),
                },
                columns: [
                    {title: '序号', dataIndex: 'id', key: 'id', width: 160, columnTitle: 'id', scopedSlots: {customRender: 'id'},},
                    {title: '任务操作', dataIndex: 'taskAction', key: 'taskAction', width: 160, columnTitle: 'taskAction'},
                    {title: '所属周期', dataIndex: 'cycle', key: 'cycle', width: 160,},
                    {title: '农事类型', dataIndex: 'type', key: 'type', width: 160,},
                    {
                        title: '使用农资及用量', dataIndex: 'tableNongZi', key: 'tableNongZi',
                        width: 180,
                        scopedSlots: {customRender: 'tableNongZi'},
                    },
                    {title: '执行周期', dataIndex: 'executionCycle', key: 'executionCycle', width: 160,scopedSlots: {customRender: 'executionCycle'},},
                    {
                        title: '用途',
                        dataIndex: 'purpose',
                        key: 'purpose',
                        width: 160,
                        columnTitle: 'purpose',
                        scopedSlots: {customRender: 'purpose'},
                    },
                    {
                        title: '农事描述',
                        dataIndex: 'cycleDescription',
                        key: 'cycleDescription',
                        width: 160,
                        columnTitle: 'cycleDescription',
                        scopedSlots: {customRender: 'cycleDescription'},
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        scopedSlots: {customRender: 'operation'},
                        width: 160,
                    }
                ],
                tableHead,
                detail: this.$route.params,
                steps: [{
                    title: '基本信息',
                    content: '基本信息',
                    labelPlacement: 'vertical'
                }, {
                    title: '产品周期',
                    content: '产品周期',
                }, {
                    title: '任务列表',
                    content: '任务列表',
                }, {
                    title: '已完成',
                    content: '已完成',
                }],
                projectPowerArr: [
                    {label: '公开市场', value: 'market'},
                    {label: '公司私有', value: 'company'},
                ],
                participantUserIdArr: [],
                projectPower: '', //权限
                participantUser: [], //参与人
                current: 0,
                vertical: 'vertical',
                projectName: '',
                productVarietyList: [],
                productCategoryList: [],
                productCategory: '',
                productVariety: '',
                solutionPlan: {},
                dateType: '3',
                cycleList: [],
                taskCycle: [],
                cycleData: [],
                lifeCycleId: '',
                visible: false,
                confirmLoading: false,
                ModalText: 'Content of the modal',
                moveList: [
                    {label: '前移', index: 1, type: '准备期'},
                    {label: '后移', index: 2, type: '准备期'},
                    {label: '删除', index: 3, type: '准备期'},
                ],
                arrList: [],
                dateList: ['cycleDate0', 'cycleDate1', 'cycleDate2'],
                selectList: [],
                formatList: [],
                isAddTask: false,
                isAdd: false,
                frameType: [],
                actionType: [],
                actionId: '',
                farmingTypeId: '',
                cycleType: [
                    {label: '所属周期', type: 1, duration: ''},
                ],
                minActionType: 0,
                maxActionType: 0,
                useType: [
                    {label: '用途', type: 1, duration: ''},
                ],
                cycleDesc: '',
                taskCacheList: {},
                name: [],
                consumption: '',
                unit: '',
                tableProduction: {},
                tableList: [],
                checkIsEditTask: false,
                tableDataID: 0,
                taskList: [],
                purpose: '',
                projectNameRepeat: false,
                projectNameValidator: '',
            }
        },
        components: {
            crumbsNav,
        },
        mounted() {
            let self = this;
            this.projectNameValidator = (rule, value, callback) => {
                this.projectNameRepeat = false;
                callback()
            }
            this.msgForm.projectNameRule = [`projectName`, {
                rules: [{
                    required: true,
                    message: '请输入基地名称',
                },{validator: self.projectNameValidator}],
            }
            ]
            for (let i = 0; i < this.list.length; i++) {
                this.list[i].index = i
            }

            //this.getLifeCycleArr();
            this.getFrameTypeArr();
            this.getProjectDetail();
            console.log(this.projectDetail.solutionId)
            //this.getActionTypeArr();
            //this.getMaterialArr();
        },
        methods: {
            //获取方案详情
            async getProjectDetail(){
                await this._getprojectUser();
                await this.getCategoryArr();
                await editProjectDetail(this.detail.solutionId).then((res) => {
                    let detailData = res.data;
                    let solutionPlan = detailData.solutionPlan;
                    let solutionPlanCycleList = detailData.solutionPlanCycleList
                    this.setProjectTable(solutionPlanCycleList);
                    this.setProjectCycle(solutionPlanCycleList);
                    this.setProjectMsg(solutionPlan);
                    this.getBreedArr(solutionPlan.categoryId);
                    // this.getLifeCycleArr(solutionPlan.breedId)

                })
            },
            //方案任务列表回填
            setProjectTable(solutionPlanCycleList){
                let self = this;
                let tableList = []
                for(let i=0; i<solutionPlanCycleList.length; i++){
                    if(solutionPlanCycleList[i].cycleTasks.length>0){
                        for(let j=0; j<solutionPlanCycleList[i].cycleTasks.length; j++){
                            tableList.push(solutionPlanCycleList[i].cycleTasks[j])
                            let nongzi = [];
                            let values = solutionPlanCycleList[i].cycleTasks[j];
                            self.taskCacheList.cycleDescription = values.taskDescription;
                            self.taskCacheList.cycleDesc = values.taskDescription;
                            self.taskCacheList.purpose = values.taskUse;
                            self.taskCacheList.taskCycle = JSON.stringify({label: solutionPlanCycleList[i].lifeCycleName, value:solutionPlanCycleList[i].lifeCycleId});
                            self.taskCacheList.cycle = solutionPlanCycleList[i].lifeCycleName;
                            self.taskCacheList.tableNongZi = values.cycleTaskMaterials;
                            self.taskCacheList.frameType = JSON.stringify({value:values.farmingTypeId, label: values.farmingTypeName});
                            self.taskCacheList.type = values.farmingTypeName;
                            self.taskCacheList.actionType = JSON.stringify({value:values.actionId, label: values.actionName});
                            self.taskCacheList.taskAction = values.actionName;
                            self.taskCacheList.minActionType = values.taskStartDay;
                            self.taskCacheList.maxActionType = values.taskEndDay;
                            self.taskCacheList.executionCycle = '第' + values.taskStartDay + '天' + '-' + '第' + values.taskEndDay + '天'
                            self.taskCacheList.taskId = values.taskId;
                            for(let i=0; i<this.taskCacheList.tableNongZi.length; i++){
                                this.taskCacheList.tableNongZi[i].name = this.taskCacheList.tableNongZi[i].materialName
                                this.taskCacheList.tableNongZi[i].unit = this.taskCacheList.tableNongZi[i].materialDosageUnit
                                this.taskCacheList.tableNongZi[i].consumption = this.taskCacheList.tableNongZi[i].materialDosage
                                nongzi.push({
                                    taskMaterialId: this.taskCacheList.tableNongZi[i].taskMaterialId,
                                    materialDosage: this.taskCacheList.tableNongZi[i].consumption,
                                    materialId: this.taskCacheList.tableNongZi[i].materialId,
                                })
                            }
                            self.taskList.push({
                                taskId: values.taskId,
                                actionId: values.actionId,
                                farmingTypeId: values.farmingTypeId,
                                lifeCycleId: solutionPlanCycleList[i].lifeCycleId,
                                taskDescription: values.taskDescription,
                                taskEndDay: Number(values.taskEndDay),
                                taskStartDay: Number(values.taskStartDay),
                                taskMaterial: nongzi,
                                taskUse: values.taskUse,
                            })
                            let lineData = JSON.parse(JSON.stringify(this.taskCacheList))
                            this.list.push(lineData);
                            console.log(this.list)
                        }
                    }
                }
                console.log(tableList);

                for (let i = 0; i < this.list.length; i++) {
                    this.list[i].index = i
                }

            },
            //基础信息数据回填
            setProjectMsg(solutionPlan){
                let userArr = [];
                for(let i=0; i<solutionPlan.participantUserList.length; i++){
                    userArr.push(solutionPlan.participantUserList[i].userId)
                }
                this.productVariety = solutionPlan.breedId;
                this.msgForm.form = this.$form.createForm(this, {
                    mapPropsToFields: () => {
                        return {
                            projectName: this.$form.createFormField({
                                value: solutionPlan.solutionName,
                            }),
                            productCategory: this.$form.createFormField({
                                value: solutionPlan.categoryId,
                            }),
                            productVariety: this.$form.createFormField({
                                value: solutionPlan.breedId,
                            }),
                            projectPower: this.$form.createFormField({
                                value: solutionPlan.solutionScope,
                            }),
                            participantUser: this.$form.createFormField({
                                value: userArr,
                            }),
                        }

                    }
                })
            },
            //方案周期数据回填
            setProjectCycle(solutionPlanCycleList){
                let cycleArr = [];
                let cycleObj = {};
                this.dateType = solutionPlanCycleList[0].cycleUnit
                for(let i=0; i< solutionPlanCycleList.length; i++){
                    cycleObj[i] = this.$form.createFormField({
                        value: (solutionPlanCycleList[i].cycleLength).toString(),
                    })
                    this.cycleList.push({
                        planCycleId: solutionPlanCycleList[i].planCycleId,
                        value: solutionPlanCycleList[i].lifeCycleId,
                        label: solutionPlanCycleList[i].lifeCycleName,
                        duration: ''
                    })
                    cycleArr.push(cycleObj);
                    console.log(cycleObj)
                }
                console.log(cycleObj)
                this.cycleForm.form = this.$form.createForm(this, {
                    mapPropsToFields: () => {
                        return cycleObj
                    }
                })
            },
            //校验基础信息
            handleMsgSubmit() {
                let self = this
                this.msgForm.form.validateFields((err, values) => {
                    console.log(values)
                    if (!err) {
                        let data = {
                            solutionId: this.detail.solutionId,
                            solutionName: values.projectName,
                        }
                        checkProjectRepeat(data).then( (res) => {
                            if(res.message === '方案名称重复'){
                                this.projectNameRepeat = true;
                                return false;
                            }else {
                                self.solutionPlan = {
                                    solutionId: this.detail.solutionId,
                                    solutionName: values.projectName,
                                    breedId: values.productVariety,
                                    categoryId: values.productCategory,
                                    solutionScope: values.projectPower,
                                    participantUserIdList: values.participantUser,
                                }
                                self.current++
                                return true
                                console.log(values)
                            }
                        })
                    } else if (err) {
                        return false
                    }
                })
            },
            //校验周期
            cycleSubmit() {
                let self = this;
                this.cycleForm.form.validateFields((err, values) => {
                    console.log(this.cycleList)
                    if (!err) {
                        let stepCycleList = [];
                        for (let i = 0; i < this.cycleList.length; i++) {
                            stepCycleList.push({
                                cycleLength: Number(values[i]),
                                cycleSort: i,
                                cycleUnit: this.dateType,
                                lifeCycleId: this.cycleList[i].value,
                                planCycleId: this.cycleList[i].planCycleId,
                            })
                            this.cycleList[i].direction = i;
                            this.taskCycle.push(
                                {label: this.cycleList[i].label, value: this.cycleList[i].value},
                            )
                        }
                        console.log(stepCycleList);
                        this.formatList = JSON.parse(JSON.stringify(this.cycleList))
                        this.cycleData = stepCycleList;
                        self.current++
                        console.log(stepCycleList)
                        console.log(values)
                    }
                })
            },
            //校验任务新增
            taskSubmit() {
                let self = this;
                this.taskForm.form.validateFields((err, values) => {
                    console.log(values)
                    if (!err) {
                        if (this.isAdd) {
                            let nongzi = []
                            for (let i = 0; i < this.tableList.length; i++) {
                                nongzi.push({
                                    materialDosage: this.tableList[i].consumption,
                                    materialId: this.tableList[i].materialId,
                                })
                            }
                            self.taskList.push({
                                taskId: '',
                                actionId: self.actionId,
                                farmingTypeId: self.farmingTypeId,
                                lifeCycleId: self.lifeCycleId,
                                taskDescription: values.cycleDesc,
                                taskEndDay: Number(values.maxActionType),
                                taskStartDay: Number(values.minActionType),
                                taskMaterial: nongzi,
                                taskUse: values.purpose,
                            })
                            console.log(self.taskList)
                            self.taskCacheList.taskId = '';
                            self.taskCacheList.cycleDescription = values.cycleDesc;
                            self.taskCacheList.cycleDesc = values.cycleDesc;
                            self.taskCacheList.purpose = values.purpose;
                            self.taskCacheList.taskCycle = values.taskCycle;
                            self.taskCacheList.frameType = values.frameType;
                            self.taskCacheList.actionType = values.actionType;
                            self.taskCacheList.minActionType = values.minActionType;
                            self.taskCacheList.maxActionType = values.maxActionType;
                            self.taskCacheList.executionCycle = '第' + values.minActionType + '天' + '-' + '第' + values.maxActionType + '天'
                            // let lineData = JSON.parse(JSON.stringify(self.taskCacheList))
                            self.taskCacheList.tableNongZi = self.tableList;
                            console.log(self.taskCacheList)
                            // console.log(lineData)
                            self.list.push(self.taskCacheList);
                            for (let i = 0; i < self.list.length; i++) {
                                self.list[i].index = i
                            }
                            console.log(self.list)
                            console.log(self.tableList)
                            console.log(self.taskList)
                            this.formatDialogData();
                            this.taskCacheList = {};
                            self.isAddTask = false;
                            console.log(values)
                        } else if (!this.isAdd) {
                            let nongzi = []
                            for (let i = 0; i < this.tableList.length; i++) {
                                nongzi.push({
                                    taskMaterialId: this.tableList[i].taskMaterialId ? this.tableList[i].taskMaterialId : '',
                                    materialDosage: this.tableList[i].consumption,
                                    materialId: this.tableList[i].materialId,
                                })
                            }
                            self.taskList[self.tableDataID].actionId = self.actionId;
                            self.taskList[self.tableDataID].farmingTypeId = self.farmingTypeId;
                            self.taskList[self.tableDataID].lifeCycleId = self.lifeCycleId;
                            self.taskList[self.tableDataID].taskDescription = values.cycleDesc;
                            self.taskList[self.tableDataID].taskEndDay = Number(values.maxActionType);
                            self.taskList[self.tableDataID].taskStartDay = Number(values.minActionType);
                            self.taskList[self.tableDataID].taskMaterial = nongzi;
                            self.taskList[self.tableDataID].taskUse = values.purpose;
                            console.log(self.taskList)
                            self.taskCacheList.cycleDescription = values.cycleDesc;
                            self.taskCacheList.cycleDesc = values.cycleDesc;
                            self.taskCacheList.purpose = values.purpose;
                            self.taskCacheList.taskCycle = values.taskCycle;
                            self.taskCacheList.frameType = values.frameType;
                            self.taskCacheList.actionType = values.actionType;
                            self.taskCacheList.minActionType = values.minActionType;
                            self.taskCacheList.maxActionType = values.maxActionType;
                            self.taskCacheList.executionCycle = '第' + values.minActionType + '天' + '-' + '第' + values.maxActionType + '天'
                            self.taskCacheList.type = JSON.parse(values.frameType).label;
                            self.taskCacheList.cycle = JSON.parse(values.taskCycle).label;
                            self.taskCacheList.taskAction = JSON.parse(values.actionType).label
                            let lineData = JSON.parse(JSON.stringify(this.taskCacheList))
                            lineData.tableNongZi = self.tableList;
                            self.list[self.tableDataID] = lineData;
                            self.list[self.tableDataID].index = self.tableDataID;
                            console.log(self.list)
                            this.formatDialogData();
                            this.taskCacheList = {};
                            self.isAddTask = false;
                        }
                    }
                })
            },
            //获取方案参与人
            _getprojectUser() {
                this.participantUserIdArr = [];
                projectUser().then((res) => {
                    for (let i = 0; i < res.data.length; i++) {
                        this.participantUserIdArr.push(
                            {label: res.data[i].userName, value: res.data[i].userId}
                        )
                    }
                    console.log(res);
                })
            },
            formatDialogData() {
                this.tableList = [];
                this.tableProduction = {};
                this.consumption = '';
                this.unit = '';
                this.minActionType = '';
                this.maxActionType = '';
                this.cycleDesc = '';
            },
            selectLabel(item) {
                console.log(item)
            },
            getLifeCycleArr(code) {
                let self = this;
                self.cycleList = [];
                getLifeCycleList(code).then((res) => {
                    for (let i = 0; i < res.data.length; i++) {
                        self.cycleList.push({
                            planCycleId: '',
                            value: res.data[i].lifeCycleId,
                            label: res.data[i].lifeCycleName,
                            duration: ''
                        })
                    }
                })
            },
            getCategoryArr() {
                let self = this;
                getCategoryList().then((res) => {
                    for (let i = 0; i < res.data.length; i++) {
                        self.$nextTick();
                        self.productCategoryList.push({value: res.data[i].categoryId, label: res.data[i].categoryName})
                    }
                })
            },
            getBreedArr(type) {
                let self = this;
                self.productVarietyList = [];
                getBreedList(type).then((res) => {
                    for (let i = 0; i < res.data.length; i++) {
                        self.productVarietyList.push({value: res.data[i].breedId, label: res.data[i].breedName})
                    }
                })
            },
            getFrameTypeArr() {
                let self = this;
                getfarmingTypeList().then((res) => {
                    for (let i = 0; i < res.data.length; i++) {
                        self.frameType.push({value: res.data[i].farmingTypeId, label: res.data[i].farmingName})
                    }
                })
                console.log(self.frameType)
            },
            getActionTypeArr(code) {
                let self = this;
                self.actionType = [];
                getActionList(code).then((res) => {
                    for (let i = 0; i < res.data.length; i++) {
                        self.actionType.push({value: res.data[i].optionId, label: res.data[i].optionName})
                        // self.taskForm.form.setFieldsValue({
                        //     actionType: self.actionType[0].value,
                        // });
                    }
                })
            },
            getMaterialArr(code) {
                let self = this;
                self.name = [];
                getMaterialList(this.productVariety, code).then((res) => {
                    for (let i = 0; i < res.data.length; i++) {
                        self.name.push({
                            value: res.data[i].materialId,
                            label: res.data[i].materialName,
                            unit: res.data[i].unitName,
                            materialId: res.data[i].materialId
                        })
                    }
                    this.nongziName = self.name[0].label
                    this.unit = self.name[0].unit
                    this.tableProduction.name = self.name[0].label;
                    this.tableProduction.unit = self.name[0].unit;
                    this.tableProduction.materialId = self.name[0].materialId;
                })
            },
            categoryChange(value) {
                this.msgForm.isCategory = true;
                this.productCategory = value;
                this.list = [];
                this.taskList = [];
                this.taskCacheList = [];
                this.getBreedArr(value.toString());
                console.log(value)
            },
            breedChange(item) {
                console.log(item)
                this.getLifeCycleArr(item);
                this.productVariety = item;

            },
            //权限下拉框改变
            projectPowerChange(value) {
                this.projectPower = value;
            },
            //参与人改变
            participantUserChange(value) {
                this.participantUser = value;
            },
            frameChange(data) {
                this.isFrameType = true;
                this.tableList = [];
                let changeData = JSON.parse(data)
                this.taskCacheList.type = changeData.label;
                this.farmingTypeId = changeData.value;
                this.getActionTypeArr(changeData.value);
                this.getMaterialArr(changeData.value);
                console.log(changeData)
            },
            actionChange(data) {
                let changeData = JSON.parse(data)
                this.taskCacheList.taskAction = changeData.label
                this.actionId = changeData.value;
                console.log(changeData)
            },
            cycleChange(data) {
                let changeData = JSON.parse(data)
                this.taskCacheList.cycle = changeData.label;
                this.lifeCycleId = changeData.value;
                console.log(changeData)
            },
            // useChange(data) {
            //     let changeData = JSON.parse(data)
            //     this.purpose = '';
            //     this.taskCacheList.purpose = changeData.label
            //     console.log(changeData)
            // },
            nameChange(data) {
                let changeData = JSON.parse(data)
                this.tableProduction.name = changeData.label;
                this.tableProduction.materialId = changeData.materialId;
                this.unit = changeData.unit
                this.tableProduction.unit = changeData.unit;
                console.log(changeData)
            },
            confirmTable(type) {
                if (type === 1) {
                    this.$set(this.tableProduction, 'consumption', this.consumption);
                    let lineData = JSON.parse(JSON.stringify(this.tableProduction));
                    console.log(this.tableList)
                    this.tableList.push(lineData);
                }
            },
            delTableLine(index) {
                this.tableList.splice(index, 1);
            },
            editAction(record) {
                if(record.taskId){
                    this.checkIsEditTask = true;
                }else {
                    this.checkIsEditTask = false;
                }
                this.tableDataID = record.index;
                this.tableList = record.tableNongZi;
                    this.taskForm.form = this.$form.createForm(this, {
                    mapPropsToFields: () => {
                        return {
                            taskCycle: this.$form.createFormField({
                                value: record.taskCycle,
                            }),
                            frameType: this.$form.createFormField({
                                value: record.frameType,
                            }),
                            actionType: this.$form.createFormField({
                                value: record.actionType,
                            }),
                            minActionType: this.$form.createFormField({
                                value: record.minActionType,
                            }),
                            maxActionType: this.$form.createFormField({
                                value: record.maxActionType,
                            }),
                            purpose: this.$form.createFormField({
                                value: record.purpose,
                            }),
                            cycleDesc: this.$form.createFormField({
                                value: record.cycleDesc,
                            }),
                            actionInput: this.$form.createFormField({
                                value: 'record.actionInput',
                            }),
                        }

                    }
                })
                this.isAdd = false;
                this.getActionTypeArr(JSON.parse(record.frameType).value);
                this.getMaterialArr(JSON.parse(record.frameType).value);
                // this.isFrameType = true;
                this.isAddTask = true;
                console.log(record)
            },
            /**
             * description：任务列表操作栏
             * params 0：删除
             *        1：上移
             *        2：下移
             * */
            taskAction(type, data) {
                console.log(data)
                if (type === 1) {
                    this.list.map((key, index) => {
                        if (key.index === data.index) {
                            this.list.splice(index, 1)
                            this.taskList.splice(index, 1);
                        }
                    })

                    console.log('删除')
                } else if (type === 2) {
                    console.log('上移')
                } else if (type === 3) {
                    console.log('下移')
                }
            },
            next() {
                if (this.current === 0) {
                    this.handleMsgSubmit();
                    return
                }
                if (this.current === 1) {
                    this.cycleSubmit();
                    return
                }
            },
            handleChange(selectData) {
                let data = JSON.parse(selectData)
                let self = this
                self.formatList.forEach((item) => {
                    if (item.value === data.value) {
                        self.selectList.forEach((selectItem, index) => {
                            if (item.value === selectItem.value) {
                                self.selectList.splice(index, 1)
                                console.log(selectItem)
                            }
                        })
                        self.arrList.push(item)
                    }
                })
                console.log(value)
            },
            prev() {
                this.current--
            },
            checkRadio(data) {
                this.dateType = data.target.value;
                console.log(data.target.value);
            },
            editCycle() {
                this.selectList = domUtil.compareArr(this.formatList, this.cycleList);
                console.log(this.selectList)
                this.arrList = JSON.parse(JSON.stringify(this.cycleList))
                this.visible = true;
            },
            handleOk(type) {
                if (type === 1) {
                    this.cycleList = this.arrList;
                    this.ModalText = 'The modal will be closed after two seconds';
                    this.list = [];
                    this.taskList = [];
                    this.taskCacheList = [];
                    this.visible = false
                } else if (type === 2) {
                    this.taskSubmit();
                    console.log(this.taskCacheList)

                }

                // this.confirmLoading = true;
            },
            handleCancel(type) {
                console.log('Clicked cancel button');
                if (type === 1) {
                    this.visible = false
                } else if (type === 2) {
                    this.isAddTask = false
                    this.formatDialogData();
                }
            },
            moveLabel(index, moveIndex) {
                console.log(index);
                console.log(moveIndex);
                if (moveIndex === 0) {
                    if ((index + 1) === this.arrList.length) {
                        return
                    }
                    domUtil.swapItems(this.arrList, index, index + 1);
                } else if (moveIndex === 1) {
                    if (index === 0) {
                        return
                    }
                    domUtil.swapItems(this.arrList, index, index - 1);
                } else if (moveIndex === 2) {
                    this.selectList.push(this.arrList.splice(index, 1)[0])
                    console.log(this.selectList)
                }
            },
            addTask() {
                this.checkIsEditTask = false;
                this.isAddTask = true;
                this.isAdd = true;
                this.purpose = '';
                this.taskForm.form = this.$form.createForm(this, {
                    mapPropsToFields: () => {
                        return {
                            actionInput: this.$form.createFormField({
                                value: 'actionInput',
                            }),
                        }
                    }
                })
                console.log('新增任务')
            },
            commitTaskData() {
                const taskData = {
                    taskList: this.taskList,
                    solutionPlan: this.solutionPlan,
                    cycleList: this.cycleData,
                }
                editProjectMsg(this.detail.solutionId, taskData).then((res) => {
                    if (res.success === 'Y') {
                        this.list = [];
                        this.taskCacheList = {}
                        this.$router.push({path: '/projectCenter'})
                    }
                    console.log(res)
                })
                console.log(taskData);
            },
        }
    }
</script>
<style lang="less" scoped>
  .crumbCtr{
    height: 20px;
    line-height: 20px;
    margin-top: 20px;
    margin-left: 16px;
    text-align: left;
  }
  .tableLineCtr{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 140px;
  }
  .ant-form-explain{
    position: absolute;
    height: 21px;
    width: 200px;
    color: #f5222d;
  }
  .textOverCtr {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 128px;
  }

  .cycleForm {
    /deep/ .ant-form-horizontal {
      display: flex;
      flex-wrap: wrap;
    }
  }

  .splitLine {
    text-align: center;
    line-height: 35px;
  }

  .expendHead {
    /*display: flex;*/
    /*justify-content: start;*/
  }

  .expendHead > div {
    height: 20px;
    width: 160px;
    padding: 16px 16px;
    text-align: right;
    display: inline-block;
  }

  .expendContent {
    display: flex;
    /*justify-content: space-around;*/
    height: 52px;
  }

  /*.tableCtrol1{*/
  /*  !*height: 20px;*!*/
  /*  line-height: 36px;*/
  /*  width: 145px;*/
  /*  !*display: inline-block;*!*/
  /*  text-align: left;*/
  /*}*/
  /*.tableCtrol2{*/
  /*  width: 217px;*/
  /*}*/
  .expendContent > div {
    /*height: 20px;*/
    width: 160px;
    padding: 16px 16px;
    /*text-align: right;*/
    display: inline-block;
  }

  .tableLine span {
    display: inline-block;
    width: 100px;
    text-align: center;
    line-height: 35px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tableSelect {
    width: 80px;
    margin-right: 20px;
  }

  .tableAction {
    display: inline-block;
    margin: 15px 0;
  }

  .tableAction span {
    cursor: pointer;
    color: #3C8CFF;
    margin-left: 13px;
  }

  .tableHead {
    display: flex;
  }

  .tableHead li {
    width: 100px;
    height: 52px;
    text-align: center;
    line-height: 52px;
    background-color: #FAFAFA;
  }

  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }

  .lineCtr {
    margin-bottom: 24px;
  }

  .add-button {
    position: absolute;
    right: 24px;
  }

  .action span {
    width: 36px;
    display: inline-block;
    cursor: pointer;
    color: #3C8CFF;
  }

  .growthCycle {
    display: inline-block;
    margin: 10px 24px;
    width: 100px;

    .moneLabel {
      color: #3C8CFF;
      text-align: center;
      cursor: pointer;
    }

    /deep/ .ant-btn-primary {
      height: 24px;
      width: 100px;
    }

    /*/deep/.ant-input{*/
    /*  width: 54px;*/
    /*}*/
  }

  .dateTpyeRadio {
    height: 28px;
    width: 64px;
    border-radius: 14px;
    text-align: center;
    line-height: 28px;
    display: inline-block;
    margin-right: 12px;
    background-color: #F5F6FA;
  }

  .checkDateTpyeRadio {
    height: 28px;
    width: 64px;
    border-radius: 14px;
    text-align: center;
    line-height: 28px;
    display: inline-block;
    margin-right: 12px;
    background-color: #3C8CFF;
    color: #fff;
  }

  .step2-title {
    line-height: 30px;
  }

  .overHidden {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .steps-action {
    text-align: right;
    margin: 16px;
  }

  .search-input-wrapper {
    /*position: relative;*/
    /*margin-bottom: 24px;*/

    .search-title {
      color: #333;
      font-size: 14px;
      margin-bottom: 24px;
      display: inline-block;
    }

  }

  .wrapper {
    position: relative;
    padding: 24px 24px 0 24px;
    min-height: calc(100% - 80px);
    background: #fff;
    margin: 16px;
    border-radius: 4px;

    /deep/ .ant-steps-item-icon {
      margin-left: 10px;
    }

    /deep/ .ant-steps-item-content {
      width: 100%;
    }

    /deep/ .ant-steps-item-tail {
      top: 40px;
    }

    /deep/ .ant-steps-item:nth-last-of-type(1) {
      display: none;
    }

    /deep/ .ant-steps-item-tail {
      margin-left: 0;
    }

    .title-wrapper {
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

    /deep/ .ant-table-pagination {
      display: none;
    }

    /deep/ .ant-table-wrapper {
      overflow-y: scroll;
      max-height: 500px;
    }

    .detail-wrapper {
      margin-top: 25px;
      text-align: left;


      .detail-item {
        margin-bottom: 32px;

        .item-key {
          font-size: 14px;
          font-weight: 400;
          color: #999;
        }

        .item-value {
          color: #000;
          font-size: 14px;
          margin-left: 10px;
        }
      }
    }
  }


</style>

