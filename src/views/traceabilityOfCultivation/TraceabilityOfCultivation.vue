/**木耳栽培过程溯源 */
<template>
  <div class="about">
    <a-layout style="margin: 10px 16px;">
      <crumbs-nav :crumbs-arr="crumbsArr" style="margin-bottom: 10px;"/>
      <a-layout-content>
        <div class="search-wrapper">
          <a-form :form="sreachForm" @submit="searchProductlst">
            <a-row :gutter="40">
              <a-col :span="8">
                <a-form-item label="商品名称" :colon="false">
                  <a-input
                    autocomplete="off"
                    placeholder="请输入商品名称"
                    v-model="productName"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="产品品种" :colon="false">
                  <a-input
                    autocomplete="off"
                    placeholder="请输入产品品种"
                    v-model="breedName"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="生产企业" :colon="false">
                  <a-input
                    autocomplete="off"
                    placeholder="请输入生产企业"
                    v-model="productionCompanyName"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="40" v-show="upDownStatue">
              <a-col :span="8">
                <a-form-item label="生产地" :colon="false">
                  <a-input
                    autocomplete="off"
                    placeholder="请输入生产地"
                    v-model="address"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
          <div>
            <a-button type="primary" class="button" @click="searchProductlst">查询</a-button>
            <a-button class="button" @click="handleReset">重置</a-button>
            <a-button :style="{ marginLeft: '8px' }" @click="upDownStatue=!upDownStatue">
              <a-icon :type="!upDownStatue ? 'down' : 'up'" />
              {{!upDownStatue ? '展开' : '收起'}}
            </a-button>
          </div>
        </div>
        <div class="table-wrapper">
          <div>
             <a-button type="primary" class="add-button" @click="addCommodityInformation">新建商品信息</a-button>
          </div>
          <a-table
            :columns="columns"
            :dataSource="list"
            :pagination="pagination"
            :loading="loading"
            :scroll="{ x: 1500 }"
            @change="handleTableChange"
            :style="{marginTop: '50px'}"
            :rowKey="(record, index) => index"
          >
            <span slot="id" slot-scope="text, record, index">{{index + 1}}</span>
            <!-- 商品名称 -->
            <span slot="productName" slot-scope="text, record" class="tableLineCtr" :title="record.productName">
              {{record.productName}}
            </span>
            <!-- 生产地 -->
            <span slot="address" slot-scope="text, record" class="tableLineCtr"
              :title="record.mergerAddress">
              {{record.mergerAddress}}
            </span>
            <!-- 生产企业 -->
            <span slot="productionCompany" slot-scope="text, record" class="tableLineCtr" :title="record.productionCompany">
              {{record.productionCompany}}
            </span>
            <!-- 木耳图片 -->
            <span slot="productPicture" slot-scope="text, record" @click="showImgModal(record.productPicture, 'url')">
              <img style="width: 50px;height: 50px" :src="record.productPicture" alt="木耳图片">
            </span>
            <!-- 二维码 -->
            <span slot="qrcodeId" slot-scope="text, record" @click="showImgModal(record.qrcodeId, 'base64')">
              <img style="width: 50px;height: 50px" :src="decode(record.qrcodeId)" alt="">
            </span>
            <span slot="status" slot-scope="text, record">
              <!-- record.status === 'N' ? '禁用' : '启用' @click="triggerSwitch"-->
              <a-switch checkedChildren="启用" unCheckedChildren="禁用" :checked="record.status === 'Y'" @change="(val) => triggerSwitch(val, record.productId)" />
            </span>
            <span slot="operation" slot-scope="text, record">
              <a-button type="link" @click="showPrintModal(record, record.qrcodeId)">打印</a-button>
              <a-button type="link"  style="padding:0;" @click="openDetail(record.productId)">查看</a-button>
              <span v-if="record.status === 'N'">
                <a-button type="link" @click="handleOpenEdit(record)">编辑商品</a-button>
                <a-button type="link" v-if="record.productionBatchCode" @click="handleOpenRelation(record.productId)" style="padding:0;">重新关联</a-button>
                <a-button type="link" v-else @click="handleOpenRelation(record.productId)" style="padding:0;">关联批次</a-button>
              </span>
            </span>
          </a-table>
        </div>
      </a-layout-content>
    </a-layout>
    <!-- 新增和编辑模态框 -->
    <add-edit-modal
      :title="title"
      :visible="visible"
      :isEditObj="isEditObj"
      :isEdit="isEdit"
      v-if="visible"
      @handleCloseModal="handleCloseModal"
    ></add-edit-modal>
    <!-- 关联批次号 -->
    <relation-modal
      :visible="relationVisible"
      :productId="productId"
      @relationModal="relationModal"
    ></relation-modal>
    <!-- 图片放大模态框 -->
    <ImgModal :imgUrl="imgSrc" :imgVisible="imgVisible" @modalCancel="hideImgModal"/>
    <!-- 打印模态框 -->
    <printing-modal
      :printVisible="printVisible"
      :lineData="lineData"
      :decodeImg="decodeImg"
      @printHideModal="printHideModal"
    ></printing-modal>
    <a-modal
      :visible="qrCodeVisible"
      title="溯源二维码"
      :maskClosable="false"
      :footer="null"
      :width="248"
      @cancel="qrCodeModalCancel"
    >
      <div class="detail-img-wrapper">
        <img :src="qrCodeSrc" alt="">
      </div>
    </a-modal>
  </div>
</template>
<script>
import Vue from 'vue'
import CrumbsNav from '@/components/crumbsNav/CrumbsNav' // 面包屑
import AddEditModal from './components/AddEditModal.vue'
import RelationModal from './components/RelationModal.vue'
import ImgModal from '@/components/ImgModal'
import PrintingModal from './components/PrintingModal.vue'
import {
  Layout,
  Breadcrumb,
  Input,
  Row,
  Col,
  Cascader,
  Button,
  Table,
  Modal,
  Select,
  Form,
  Switch
} from 'ant-design-vue'
import {
  getTracingToTheSource,
  triggerSwitch
} from '@/api/farmPlan.js'
import { columns, crumbsArr } from './config.js'
Vue.use(Layout)
Vue.use(Breadcrumb)
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)
Vue.use(Cascader)
Vue.use(Button)
Vue.use(Table)
Vue.use(Modal)
Vue.use(Select)
Vue.use(Form)
Vue.use(Switch)
export default {
  components: {
    CrumbsNav,
    AddEditModal,
    RelationModal,
    ImgModal,
    PrintingModal
  },
  data() {
    return {
      list: [],
      columns,
      crumbsArr,
      upDownStatue: false,
      pagination: {
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30'],
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0,
        showTotal: total => `共 ${total} 条`
      },
      loading: false,
      sreachForm: this.$form.createForm(this),
      title: '新建商品',
      visible: false,
      isEditObj: {},
      isEdit: false,
      productName: '', // 商品名称
      breedName: '', // 产品品种,
      productionCompanyName: '', // 企业
      address: '', // 产地
      relationVisible: false,
      imgVisible: false,
      imgSrc: '',
      imgTitle: '',
      printVisible: false, // 打印模态框
      decodeImg: '',
      modalWidth: 240,
      productId: '',
      qrCodeVisible: false,
      lineData: {},
      qrCodeSrc: ''
    }
  },
  created() {
    // 获取列表
    let data = {
      pageNo: this.pagination.current,
      pageSize: this.pagination.pageSize
    }
    this.getList(data)
  },
  methods: {
    // 获取列表
    getList(data) {
      this.loading = true
      getTracingToTheSource(data)
        .then(res => {
          this.loading = false
          if (res.success === 'Y') {
            this.list = (res.data && res.data.records) || []
            this.pagination.total = (res.data && res.data.total) || 0
          } else {
            this.$message.error(res.message)
          }
        })
        // eslint-disable-next-line handle-callback-err
        .catch((error) => {
          this.loading = false
        })
    },
    // 查询方法
    searchProductlst() {
      this.pagination.current = 1
      this.pagination.pageSize = 10
      let data = {
        pageNo: 1,
        pageSize: 10,
        productName: this.productName,
        breedName: this.breedName,
        productionCompanyName: this.productionCompanyName,
        address: this.address
      }
      this.getList(data)
    },
    // 分页
    handleTableChange(pagination, filters, sorter) {
      this.pagination.current = pagination.current
      this.pagination.pageSize = pagination.pageSize
      let data = {
        pageNo: pagination.current,
        pageSize: pagination.pageSize,
        productName: this.productName,
        breedName: this.breedName,
        productionCompanyName: this.productionCompanyName,
        address: this.address
      }
      this.getList(data)
    },
    // 新建商品信息
    addCommodityInformation () {
      this.title = '新建商品'
      this.visible = true
      this.isEdit = false
      this.isEditObj = {}
    },
    // 编辑模态框
    handleOpenEdit (record) {
      this.title = '编辑商品'
      this.visible = true
      this.isEdit = true
      this.isEditObj = { ...record }
    },
    // 关联批次号
    handleOpenRelation(productId) {
      this.productId = productId
      this.relationVisible = true
    },
    // 关闭关联批次号的模态框
    relationModal(val) {
      this.relationVisible = val
    },
    // 关闭模态框
    handleCloseModal (val) {
      this.visible = val
    },
    // 图片
    decode(base64) {
      return 'data:image/png;base64,' + base64
    },
    // 图片方大模态框
    showImgModal (url, to) {
      if (to === 'url') {
        this.imgSrc = url
        this.imgTitle = '木耳图片'
        this.modalWidth = 400
        this.imgVisible = true
      } else {
        this.qrCodeSrc = this.decode(url)
        this.qrCodeVisible = true
      }
    },
    // 影藏图片模态框
    hideImgModal (val) {
      this.imgVisible = val
    },
    // 打印模态框打开
    showPrintModal(record, qrcodeId) {
      this.lineData = record
      this.decodeImg = this.decode(qrcodeId)
      this.printVisible = true
    },
    // 打印模态框关闭
    printHideModal (val) {
      this.printVisible = val
    },
    // 开关切换
    triggerSwitch (checked, productId) {
      // checked ==true就是要改成 'Y'
      let status = checked ? 'Y' : 'N'
      triggerSwitch(productId, status)
        .then(res => {
          if (res.success === 'Y') {
            this.$message.success(res.message)
            let data = {
              pageNo: 1,
              pageSize: 10
            }
            this.pagination.current = data.pageNo
            this.pagination.pageSize = data.pageSize
            this.getList(data)
          } else {
            this.$message.error(res.message)
          }
        })
    },
    // 查看详情
    openDetail (productId) {
      this.$router.push({
        name: 'DetailTraceabilityOfCultivation',
        query: { 'productId': productId }
      })
    },
    // 重置
    handleReset() {
      this.sreachForm.resetFields()
      this.productName = ''
      this.breedName = ''
      this.productionCompanyName = ''
      this.address = ''
      // 获取列表
      let data = {
        pageNo: 1,
        pageSize: 10
      }
      this.pagination.current = data.pageNo
      this.pagination.pageSize = data.pageSize
      this.getList(data)
    },

    qrCodeModalCancel() {
      this.qrCodeVisible = false
    }
  }
}
</script>
<style lang="less" scoped>
.search-wrapper {
  padding: 24px;
  background: #fff;
  margin-bottom: 10px;
  border-radius: 4px;
  .ant-form-item {
    text-align: left;
  }
  .search-input-wrapper {
    position: relative;
    margin-bottom: 24px;
    .search-title {
      position: absolute;
      left: 0;
      color: #333;
      font-size: 14px;
    }
    .search-input {
      margin-top: 30px;
    }
  }
  .button {
    margin: 0 5px;
  }
}
.table-wrapper {
  position: relative;
  padding: 24px;
  background: #fff;
  min-height: 360px;
  border-radius: 4px;
  .add-button {
    position: absolute;
    right: 24px;
  }
}
.tableLineCtr {
  display: inline-block;
  width: 120px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.detail-img-wrapper{
  img{
    width: 200px;
    height:200px;
    background-size: 100%;
  }
}
</style>
