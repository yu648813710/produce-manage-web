/* 地块监测列表 */
<template>
  <div class="base">
    <!-- <a-breadcrumb style="text-align: left; height: 40px">
      <a-breadcrumb-item>当前位置：</a-breadcrumb-item>
      <a-breadcrumb-item>生产管理</a-breadcrumb-item>
      <a-breadcrumb-item>生长监测</a-breadcrumb-item>
      <a-breadcrumb-item>地块预警规则</a-breadcrumb-item>
    </a-breadcrumb>-->
    <!-- 导航 -->
    <crumbs-nav :crumbs-arr="crumbsArr" style="margin-bottom: 10px;"/>
    <div class="form">
      <!-- 搜索条件 -->
      <a-form class="searchForm">
        <a-row :gutter="24" type="flex">
          <a-col :span="8">
            <a-form-item
              label="地块名称"
              :colon="false"
              :label-col="{ span: 24 }"
              :wrapper-col="{ span: 24 }"
            >
              <a-input
                autocomplete="off"
                v-model="searchForm.baseName"
                placeholder="请输入"
                v-decorator="[
                  '地块名称',
                  { rules: [{ required: true, message: '请输入地块名称!' }] }
                ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24" :style="{ textAlign: 'center' }">
            <a-button type="primary" html-type="submit" @click="searchRuleList"
              >查询</a-button
            >
            <a-button @click="restSearch" :style="{ marginLeft: '8px' }"
              >重置</a-button
            >
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="table">
      <!-- 设备列表表格 -->
      <div class="table-content">
        <div class="block-box">
          <a-button type="primary" class="add-button" @click="addShowModal()"
            >新增预警</a-button
          >
        </div>
        <div class="block-box">
          <a-locale-provider :locale="zhCN">
            <a-table
              class="equipmentTable"
              :columns="columns"
              :dataSource="equipmentList"
              :pagination="pagination"
              :loading="loading"
              @change="paginationChange"
              :rowKey="record => record.blockLandId"
            >
              <span slot="id" slot-scope="text, record, index">{{
                index + 1
              }}</span>
              <span slot="baseLandName" class="tableCtr" slot-scope="text, record " :title="record.baseLandName">
                {{record.baseLandName}}
              </span>
              <div class="action" slot="operation" slot-scope="record">
                <span
                  @click="editRuleEvent(record)"
                  >编辑</span
                >
                <span
                  @click="shwoDeteleModal(record)"
                  >删除</span
                >
              </div>
            </a-table>
          </a-locale-provider>
        </div>
      </div>
    </div>
    <!-- 新增弹窗 -->
    <add-rule
      :info-add-or-edit-type="infoAddOrEditType"
      :visible="visible"
      :confirm-loading="confirmLoading"
      :base-land-data="baseLandData"
      :block-land-data="blockLandData"
      :form-validata-status="formValidataStatus"
      :form-input-val="formInputVal"
      @handleOk="handleOk"
      @handleCancel="handleCancel"
      @baseLandChange="baseLandChange"
      @blockLandChange="blockLandChange"
      @setFrorm="setFrorm"
    />
    <!-- 新增弹窗 end -->
    <!-- 删除弹框 -->
    <a-modal
      title="删除提醒"
      :visible="deteleVisible"
      @ok="deteleHandleOk"
      :width="500"
      :maskClosable="false"
      @cancel="deteleHandleCancel"
      >是否删除此条预警？</a-modal
    >
    <!-- 删除弹框 end -->
  </div>
</template>

<script>
import Vue from 'vue'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import {
  ruleList,
  addRule,
  listBaseLandSelect,
  listBlockLandByBaseLandIdSelect,
  setRule,
  deleteRule
} from '@/api/productManage.js'
import { listColumns } from './config'
import AddRule from './components/AddRule'
import CrumbsNav from '@/components/crumbsNav/CrumbsNav'
import {
  Button,
  Breadcrumb,
  Form,
  Icon,
  Row,
  Input,
  Col,
  Table,
  Tooltip,
  Select,
  message,
  Modal,
  LocaleProvider
} from 'ant-design-vue'
Vue.use(Form)
Vue.use(Button)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Input)
Vue.use(Col)
Vue.use(Table)
Vue.use(Select)
Vue.use(Tooltip)
Vue.use(Modal)
Vue.use(Breadcrumb)
Vue.use(LocaleProvider)
Vue.prototype.$message = message
export default {
  name: 'BaseList',
  components: {
    AddRule,
    CrumbsNav
  },
  data() {
    return {
      visible: false,
      confirmLoading: false,
      zhCN, // 搜索项表单
      searchForm: {
        baseName: '',
        userAccount: '',
        phoneNumber: ''
      },
      current: ['mail'],
      loading: false,
      pagination: {
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30'],
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0,
        showTotal: total => `共 ${total} 条`
      },
      columns: listColumns,
      equipmentList: [],
      deteleVisible: false,
      baseLandData: [],
      blockLandData: [],
      indicatorId: '',
      formInputVal: {
        user: '', // 负责人
        temperatureInf: '', // 起始温度
        temperatureSup: '', // 结束温度
        dampnessInf: '', // 起始湿度
        dampnessSup: '' // 结束湿度
      },
      formSelectVal: {
        baseLandId: '', // 选择基地id
        blockLandId: '' // 选择地块id
      },
      infoAddOrEditType: 'add', // 信息新增或者修改
      formValidataStatus: {
        temperature: '',
        dampness: ''
      },
      blockLandId: '',
      crumbsArr: [
        {
          name: '生产管理',
          back: false,
          path: ''
        },
        {
          name: '生长监测',
          back: false,
          path: ''
        },
        {
          name: '地块预警规则',
          back: false,
          path: ''
        }
      ]
    }
  },
  mounted() {
    this.getRuleList()
    this.getSelectBaseLand()
  },
  methods: {
    // 显示新增弹窗
    showModal() {
      this.visible = true
    },
    // 弹窗后赋值
    setFrorm(ruleForm) {
      this.ruleForm = ruleForm
    },
    // 显示删除弹窗
    shwoDeteleModal(record) {
      this.indicatorId = record.indicatorId
      console.log('record: ',record)
      this.deteleVisible = true
    },
    // 消失删除弹窗
    deteleHandleCancel() {
      this.deteleVisible = false
    },
    // 点击显示新增弹窗
    addShowModal() {
      this.showModal()
      this.formInputVal = {
        user: '', // 负责人
        temperatureInf: '', // 起始温度
        temperatureSup: '', // 结束温度
        dampnessInf: '', // 起始湿度
        dampnessSup: '' // 结束湿度
      }
      this.formSelectVal = {
        baseLandId: null, // 选择基地id
        blockLandId: null // 选择地块id
      }
      this.infoAddOrEditType = 'add'
    },
    // 点击新增弹窗确定
    handleOk(ruleForm) {
      this.ruleForm = ruleForm
      this.ruleForm.validateFields((err, rule) => {
        let validataFormState = this.validataForm()
        if (!validataFormState || err !== null) {
          return false
        }
        let data = []
        data[0] = {
          farmType: 'gh',
          indicatorId: this.indicatorId,
          blockLandId: this.formSelectVal.blockLandId, // 地块id
          indicatorInf: this.formInputVal.temperatureInf, // 指标下限值
          indicatorName: 'temperature', // 默认值为 temperature:温度，dampness:湿度，co2_concentration:二氧化碳浓度
          indicatorSup: this.formInputVal.temperatureSup // 指标上限值
        }
        data[1] = {
          farmType: 'gh',
          indicatorId: this.indicatorId,
          blockLandId: this.formSelectVal.blockLandId, // 地块id
          indicatorInf: this.formInputVal.dampnessInf, // 指标下限值
          indicatorName: 'dampness', // 默认值为 temperature:温度，dampness:湿度，co2_concentration:二氧化碳浓度
          indicatorSup: this.formInputVal.dampnessSup // 指标上限值
        }
        if (this.infoAddOrEditType === 'add') {
          this.addRuleSubmit(data)
          return false
        }
        this.editRuleSubmit(data)
      })
    },
    // 点击新增弹窗取消
    handleCancel(ruleForm) {
      this.ruleForm = ruleForm
      this.visible = false
      this.blockLandData = []
      this.formValidataStatus.dampness = ''
      this.formValidataStatus.temperature = ''
      this.ruleForm.setFieldsValue({
        基地名称: ''
      })
      this.ruleForm.setFieldsValue({
        地块名称: ''
      })
    },
    // 重置
    restSearch() {
      this.searchForm.baseName = ''
      this.getRuleList()
    },
    searchRuleList(page, current) {
      this.pagination.current = 1
      this.getRuleList()
    },
    paginationChange(page, current) {
      this.pagination.current = page.current
      this.pagination.pageSize = page.pageSize
      this.getRuleList()
    },
    getRuleList() {
      let postData = {
        pageNo: this.pagination.current,
        pageSize: this.pagination.pageSize,
        inputContent: this.searchForm.baseName,
        alarmType: ''
      }
      let type = 'gh'
      ruleList(type, postData).then(res => {
        this.pagination.total = res.data.total
        for (let i = 0; i < res.data.records.length; i++) {
          // 温度40-50℃、湿度50%-80%
          res.data.records[i].temperature =
            '温度' +
            res.data.records[i].temperatureInf +
            '℃' +
            '-' +
            res.data.records[i].temperatureSup +
            '℃' +
            '、湿度' +
            res.data.records[i].dampnessInf +
            '%-' +
            res.data.records[i].dampnessSup +
            '%'
        }
        this.equipmentList = res.data.records
      })
    },
    // 基地选项事件
    baseLandChange(e) {
      this.formSelectVal.baseLandId = e
      this.getSelectBlockBland(e)
    },
    // 地块选项事件
    blockLandChange(e) {
      this.formSelectVal.blockLandId = e
      let userdata = this.blockLandData.filter(res => {
        if (res.blockLandId === e) {
          return res
        }
      })
      console.log(userdata)
      this.formInputVal.user = userdata[0] ? userdata[0].principalUser : ''
    },
    // 编辑事件
    editRuleEvent(data) {
      console.log('data: ',data)
      this.showModal()
      this.formInputVal.temperatureInf = data.temperatureInf
      this.formInputVal.temperatureSup = data.temperatureSup
      this.formInputVal.dampnessInf = data.dampnessInf
      this.formInputVal.dampnessSup = data.dampnessSup
      this.indicatorId = data.indicatorId
      this.formSelectVal.baseLandId = data.baseLandId

      this.formSelectVal.blockLandId = data.blockLandId

      this.setFrorm()
      this.$nextTick(async () => {
        console.log(data.baseLandId)
        await this.getSelectBlockBland(data.baseLandId, data.blockLandId)
        console.log(data.blockLandId)
        console.log(this.blockLandData)
        this.ruleForm.setFieldsValue({
          基地名称: data.baseLandName
        })
        this.ruleForm.setFieldsValue({
          地块名称: data.blockLandName
        })
        let userData = this.blockLandData.filter(res => {
          if (res.blockLandId === data.blockLandId) {
            return res
          }
        })
        this.formInputVal.user = userData[0] ? userData[0].principalUser : ''
      })
      this.infoAddOrEditType = 'edit'
    },
    // 删除事件
    deteleHandleOk() {
      deleteRule(this.indicatorId).then(res => {
        if (res.code === 200) {
          this.getRuleList()
          this.deteleHandleCancel()
          this.tipMessage(res.success, res.message)
        }
      })
    },
    // 获取基地的信息
    getSelectBaseLand() {
      listBaseLandSelect().then(res => {
        if (res.code === 200) {
          this.baseLandData = res.data
        }
      })
    },
    // 获取地块信息
    async getSelectBlockBland(id, blockId = '') {
      await listBlockLandByBaseLandIdSelect(id, blockId).then(res => {
        if (res.code === 200) {
          this.blockLandData = res.data
        }
      })
    },
    // 编辑提交
    editRuleSubmit(data) {
      setRule(data).then(res => {
        if (res.code !== 200) {
          return false
        }
        this.tipMessage(res.success, res.message)
        this.handleCancel(this.ruleForm)
        this.getRuleList()
      })
    },
    // 新增提交
    addRuleSubmit(data) {
      addRule(data).then(res => {
        if (res.code !== 200) {
          return false
        }
        this.tipMessage(res.success, res.message)
        this.handleCancel(this.ruleForm)
        this.getRuleList()
      })
    },
    // 提示信息
    tipMessage(type, message) {
      if (type === 'Y') {
        this.$message.success(message)
        return false
      }
      this.$message.error(message)
    },
    // 校验表单
    validataForm() {
      let formDataInput = this.formInputVal
      if (
        formDataInput.temperatureInf === '' ||
        formDataInput.temperatureSup === ''
      ) {
        this.formValidataStatus.temperature = 'error'
        this.formValidataStatus.temperatureText = '区间值不能为空'
        return false
      }
      if (
        +formDataInput.temperatureInf > 100 ||
        +formDataInput.temperatureInf < -100 ||
        +formDataInput.temperatureSup > 100 ||
        +formDataInput.temperatureSup < -100
      ) {
        this.formValidataStatus.temperature = 'error'
        this.formValidataStatus.temperatureText =
          '请输入-100℃--100℃范围内的温度值'
        return false
      }
      if (+formDataInput.temperatureSup < +formDataInput.temperatureInf) {
        this.formValidataStatus.temperature = 'error'
        this.formValidataStatus.temperatureText = '区间前值必须小于后值'
        return false
      }
      this.formValidataStatus.temperature = ''
      this.formValidataStatus.temperatureText = ''

      if (
        formDataInput.dampnessInf === '' ||
        formDataInput.dampnessSup === ''
      ) {
        this.formValidataStatus.dampness = 'error'
        this.formValidataStatus.dampnessText = '区间值不能为空'
        return false
      }
      if (
        +formDataInput.dampnessInf > 100 ||
        +formDataInput.dampnessInf < 0 ||
        +formDataInput.dampnessSup > 100 ||
        +formDataInput.dampnessSup < 0
      ) {
        this.formValidataStatus.dampness = 'error'
        this.formValidataStatus.dampnessText = '请输入0%--100%范围内的湿度值'
        return false
      }
      if (+formDataInput.dampnessSup < +formDataInput.dampnessInf) {
        this.formValidataStatus.dampness = 'error'
        this.formValidataStatus.dampnessText = '区间前值必须小于后值'
        return false
      }
      this.formValidataStatus.dampness = ''
      this.formValidataStatus.dampnessText = ''

      return true
    }
  }
}
</script>

<style lang="less" scoped>
.base {
  margin: 10px 16px;
}
.tableCtr{
  width: 100px;
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.form {
  border-radius: 4px;
  background-color: white;
  padding: 27px 15px 21px 15px;
}

.table {
  border-radius: 4px;
  padding: 20px 16px 24px 16px;
  background-color: white;
  margin-top: 12px;
}
.add-button {
  float: right;
  margin-bottom: 20px;
  cursor: pointer;
}
.title_item {
  float: left;
}
.block-box {
  overflow: hidden;
  height: auto;
}
</style>
