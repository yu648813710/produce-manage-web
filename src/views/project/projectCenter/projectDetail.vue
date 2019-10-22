/**
产品详情页面
*/
<template>
  <div>
    <div class="wrapper">
      <crumbsNav :crumbsArr="crumbsArr"></crumbsNav>
      <div class="title-wrapper">
        <div class="icon"></div>
        <span class="title-text">黑木耳种植方案</span>
        <div class="actionBtn">
          <a-button type="primary" v-show="detail.publishFlag === 'N'" @click="openPublishDialog">发布</a-button>
          <a-button type="primary" @click="backToList">返回</a-button>
        </div>
      </div>
      <div class="detail-wrapper">
        <a-row>
          <a-col :span="8" class="detail-item">
            <span class="item-key">供应商：</span>
            <span class="item-value">{{solutionPlan.companyName}}</span>
          </a-col>
          <a-col :span="8" class="detail-item">
            <span class="item-key">方案名称：</span>
            <span class="item-value">{{solutionPlan.solutionName}}</span>
          </a-col>
          <a-col :span="8" class="detail-item">
            <span class="item-key">作物品类：</span>
            <span class="item-value">{{solutionPlan.categoryName}}</span>
          </a-col>
          <a-col :span="8" class="detail-item">
            <span class="item-key">作物品种：</span>
            <span class="item-value">{{solutionPlan.breedName}}</span>
          </a-col>
          <a-col :span="8" class="detail-item">
            <span class="item-key">创建人：</span>
            <span class="item-value">{{solutionPlan.createUser}}</span>
          </a-col>
          <a-col :span="8" class="detail-item">
            <span class="item-key">创建时间：</span>
            <span class="item-value">{{formDate(solutionPlan.gmtCreate)}}</span>
          </a-col>
          <a-col :span="8" class="detail-item">
            <span class="item-key">周期时长：</span>
            <span class="item-value">{{solutionPlan.cycleAllLength}}</span>
          </a-col>
          <a-col :span="8" class="detail-item">
            <span class="item-key">状态：</span>
            <span class="item-value">{{solutionPlan.status === 'Y' ? '启用' : '禁用'}}</span>
          </a-col>
          <a-col :span="8" class="detail-item">
            <span class="item-key">方案权限：</span>
            <span class="item-value">{{solutionPlan.solutionScope === 'market' ? '公开市场' : '公司私有'}}</span>
          </a-col>
          <a-col :span="8" class="detail-item">
            <span class="item-key">方案参与人：</span>
            <span class="item-value">{{formatterUser(solutionPlan.participantUserList)}}</span>
          </a-col>

        </a-row>
      </div>
    </div>
    <div class="wrapper">
      <div class="title-wrapper">
        <div class="icon"></div>
        <span class="title-text">产品周期</span>
      </div>
      <div class="detail-wrapper">
        <a-row>
          <a-col :span="24" class="detail-item">
            <span class="item-key">时间单位：</span>
            <a-radio-group name="radioGroup" :value="cycleUnit">
              <div :class="cycleUnit === '3' ? 'checkDateTpyeRadio' : 'dateTpyeRadio'">
                <a-radio value="3">周</a-radio>
              </div>
              <div :class="cycleUnit === '5' ? 'checkDateTpyeRadio' : 'dateTpyeRadio'">
                <a-radio value="5">天</a-radio>
              </div>
            </a-radio-group>
          </a-col>
          <a-col :span="24" class="detail-item">
            <span class="item-key">产品周期：</span>
            <div class="growthCycle" v-for="(item,index) in solutionPlanCycleList">
              <a-button type="primary">{{item.lifeCycleName}}</a-button>
            </div>
          </a-col>
          <a-col :span="24" class="detail-item">
            <span class="item-key">周期时长：</span>
            <div v-for="(item,index) in solutionPlanCycleList" class="growthCycle">
              <a-input :disabled="true" v-model="item.cycleLength" placeholder="Basic usage" class="search-input"/>
            </div>
          </a-col>

        </a-row>
      </div>
    </div>
    <div class="wrapper">
      <div class="detail-wrapper" style="margin-top: 0">
        <a-table
          :scroll="{ x: 1200, y: 125  }"
          :columns="columns"
          :dataSource="list"
          :style="{marginTop: '50px'}"
          :rowKey="record => record.greenhouseId"
        >
          <span
            slot="materialName"
            slot-scope="text, record, index"
          >{{record.materialName + '-' + record.materialDosage + record.materialDosageUnit}}</span>
            <span
              slot="id"
              slot-scope="text, record, index"
            >{{index + 1}}</span>
          <div class="textOverCtr" slot="taskUse" slot-scope="text, record, index" :title="record.taskUse">{{record.taskUse}}</div>
          <div class="textOverCtr" slot="taskDescription" slot-scope="text, record, index" :title="record.taskDescription">{{record.taskDescription}}</div>
        </a-table>
      </div>
    </div>
    <!--发布弹窗-->
    <a-modal
      title="发布方案"
      :visible="publishVisible"
      :width="450"
      @ok="publishHandleOk"
      :confirmLoading="publishConfirmLoading"
      @cancel="publishHandleCancel"
      okText="确认"
      cancelText='取消'
    >
      <div>
        是否发布当前方案到{{solutionPlan.solutionScope === 'market' ? '公开市场' : '公司私有'}}？
      </div>
    </a-modal>
  </div>
</template>
<script>
    import Vue from 'vue'
    import domUtil from "../../../utils/domUtil";
    import { Row,Col,Table, Radio, Button} from 'ant-design-vue'
    import { projectDetail, publishTask } from '@/api/projectCenter.js'
    import crumbsNav from "@/components/crumbsNav/CrumbsNav";
    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Table)
    Vue.use(Radio)
    Vue.use(Button)
    export default {
        data () {
            let self = this;
            return {
                publishConfirmLoading: false,
                publishVisible: false,
                crumbsArr:[
                    {name: '当前位置', back: false, path: ''},
                    {name: '生产管理', back: false, path: ''},
                    {name: '方案中心', back: true, path: '/projectCenter'},
                    {name: '方案详情', back: false, path: ''},
                ],
                detail: this.$route.params,
                list: [],
                // dateType: 'week',
                solutionPlanCycleList: [
                    {lifeCycleName: '周期一',cycleLength: 1},
                    {lifeCycleName: '周期二',cycleLength: 2},
                    {lifeCycleName: '周期三',cycleLength: 3},
                ],
                pagination: {

                    total: 0,
                    showTotal: total => `共 ${total} 条`
                },
                columns: [
                    { title: '序号', scopedSlots: { customRender: 'id' }, align: 'center', width: 80},
                    { title: '任务操作', dataIndex: 'actionName', key: 'actionName', width: 150 },
                    { title: '所属周期', dataIndex: 'cycleName', key: 'cycleName', width: 150 },
                    { title: '农事类型', dataIndex: 'farmingTypeName', key: 'farmingTypeName', width: 150 },
                    { title: '使用农资及用量(每亩)', dataIndex: 'materialName', key: 'materialName', width: 150,
                        scopedSlots: { customRender: 'materialName' },
                    },
                    {
                        title: '执行周期',
                        dataIndex: 'actionCycle',
                        key: 'actionCycle',
                        width: 150,
                    },
                    {
                        title: '用途',
                        dataIndex: 'taskUse',
                        width: 150,
                        scopedSlots: { customRender: 'taskUse' },
                    },
                    {
                        title: '农事描述',
                        dataIndex: 'taskDescription',
                        key: 'taskDescription',
                        width: 150,
                        scopedSlots: { customRender: 'taskDescription' },

                    },
                ],
                cycleUnit: '',
                solutionPlan: '',
            }
        },
        components: {
            crumbsNav,
        },
        mounted(){
            this.detail.gmtCreate = domUtil.formDate(this.detail.gmtCreate)
            console.log(this.detail);
            this.getProjectDetail();
        },
        methods:{
            openPublishDialog(){
                this.publishVisible = true;
            },
            publishHandleCancel(){
                this.publishVisible = false;
            },
            publishHandleOk(){
                this._publishTask();
            },
            backToList(){
                this.$router.push('/projectCenter')
            },
            //发布任务
            _publishTask(){
                if(this.detail.publishFlag === 'Y'){
                    return
                }
                publishTask(this.detail.solutionId).then((res) => {
                    if (res.success === 'Y') {
                        this.detail.publishFlag = 'Y';
                        this.publishVisible = false;
                        this.getProjectDetail()
                    }
                })
            },
            formDate(date){
                return domUtil.formDate(date)
            },
            formatterUser(userList){
                if(userList.length === 0){
                    return ''
                }
                if (userList.length === 1){
                    return userList[0].userName
                }
                let user = ''
                for(let i = 0; i< userList.length; i++){
                    if(i < userList.length){
                        user = user + userList[i].userName + '、'
                    }else {
                        user += userList[i].userName
                    }
                }
                return user
            },
            getProjectDetail(){
                projectDetail(this.detail.solutionId).then((res) => {
                    let detailData = res.data;
                    this.solutionPlanCycleList = detailData.solutionPlanCycleList;
                    for(let i=0; i<detailData.solutionPlanCycleMaterialList.length;i++){
                        detailData.solutionPlanCycleMaterialList[i].actionCycle = detailData.solutionPlanCycleMaterialList[i].taskStartDay + '周-' + detailData.solutionPlanCycleMaterialList[i].taskEndDay + '周'
                    }
                    this.list = detailData.solutionPlanCycleMaterialList;
                    this.cycleUnit = this.solutionPlanCycleList[0].cycleUnit;
                    this.solutionPlan = detailData.solutionPlan
                    console.log(detailData)
                })
            },
        },
    }
</script>
<style lang="less" scoped>
  .actionBtn{
    position: absolute;
    right: 50px;
    top: -5px;
  }
  .actionBtn button:nth-of-type(1){
    margin-right: 20px;
  }
  .textOverCtr{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 150px;
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
  /deep/.ant-table-wrapper{
    margin-top: 0 !important;
  }
  /deep/.ant-input-disabled{
    background-color: #ffffff !important;
    color: rgb(77, 77, 77) !important;
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
  .wrapper{
    position: relative;
    padding: 24px 24px 0 24px ;
    background: #fff;
    margin: 16px;
    border-radius: 4px;
    /deep/ .ant-table-tbody > tr > td {
      padding: 16px 0 !important;
    }
    /deep/ .ant-table-thead > tr > th {
      padding: 16px 0 !important;
    }
    .title-wrapper{
      position: absolute;
      width: 100%;
      text-align: left;
      left: 24px;

      .title-text{
        font-size: 16px;
        color: #333;
        line-height: 22px;
        margin-left: 8px;
        font-family:PingFangSC-Medium,PingFangSC;
        font-weight:500;
        color:rgba(51,51,51,1);
      }
      .icon{
        width: 2px;
        height: 14px;
        background: rgba(60,140,255,1);
        border-radius: 1px;
        display: inline-block;
      }
    }

    .detail-wrapper{
      margin-top: 50px;
      text-align: left;

      .detail-item{
        margin-bottom: 32px;

        .item-key{
          font-size: 14px;
          font-weight: 400;
          color: #999;
        }

        .item-value{
          color: #000;
          font-size: 14px;
          margin-left: 10px;
        }
      }
    }
  }


</style>

