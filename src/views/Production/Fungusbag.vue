/**
菌包列表页面
*/
<template>
  <div class="about">
    <a-layout>
      <a-layout-content style="margin: 0 16px">
        <div class="search-wrapper">
          <a-row :gutter="40">
            <a-col :span="8">
              <div class="search-input-wrapper">
                <span class="search-title">菌包名称</span>
                <a-input autocomplete="off" placeholder="Basic usage" class="search-input"/>
              </div>
            </a-col>
            <a-col :span="8">
              <div class="search-input-wrapper">
                <span class="search-title">菌包类别</span>
                <a-cascader style="width: 100%" :options="options" placeholder="Select Address" class="search-input"/>
              </div>
            </a-col>
            <a-col :span="8">
              <div class="search-input-wrapper">
                <span class="search-title">生产企业</span>
                <a-cascader style="width: 100%" :options="options" placeholder="Select Address" class="search-input"/>
              </div>
            </a-col>
          </a-row>
          <div>
            <a-button icon="up" class="button">收起</a-button>
            <a-button class="button">重置</a-button>
            <a-button type="primary" class="button">查询</a-button>
          </div>
        </div>
        <div class="table-wrapper">
          <a-button type="primary" class="add-button">新增菌包信息</a-button>
          <a-table :columns="columns" :dataSource="list" :style="{marginTop: '50px'}">
            <span slot="qrCode" slot-scope="data">
              <img :src="data" :style="{width: '50px',height: '50px'}">
            </span>
            <router-link slot="operation" slot-scope="text, record" :to="{name: 'Check', params: record}">编辑</router-link>
          </a-table>
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>
<script>
import Vue from 'vue'
import { Layout, Breadcrumb, Input, Row, Col, Cascader, Button, Table } from 'ant-design-vue'
const columns = [
  { title: '序号', dataIndex: 'fungusBagId', key: 'fungusBagId' },
  { title: '菌包名称', dataIndex: 'fungusBagName', key: 'fungusBagName' },
  { title: '菌包类别', dataIndex: 'categoryName', key: 'categoryName' },
  { title: '生产批次号', dataIndex: 'productionLotNumber', key: 'productionLotNumber' },
  { title: '生产企业', dataIndex: 'produceCompanyName', key: 'produceCompanyName' },
  { title: '包装时间', dataIndex: 'packagingDate', key: 'packagingDate' },
  { title: '规格（g/包）', dataIndex: 'specification', key: 'specification' },
  { title: '追溯码', dataIndex: 'qrCode', key: 'qrCode', scopedSlots: { customRender: 'qrCode' } },
  { title: '操作', key: 'operation', scopedSlots: { customRender: 'operation' } }
]

const list = [{
  fungusBagId: '1',
  qrCode: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2761691330,563494352&fm=11&gp=0.jpg',
  fungusBagName: '菌包名称',
  categoryName: '菌包类别',
  productionLotNumber: '生产批次号',
  produceCompanyName: '生产企业',
  packagingDate: '包装时间',
  specification: '规格'
}, {
  fungusBagId: '2',
  qrCode: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2761691330,563494352&fm=11&gp=0.jpg',
  fungusBagName: '菌包名称',
  categoryName: '菌包类别',
  productionLotNumber: '生产批次号',
  produceCompanyName: '生产企业',
  packagingDate: '包装时间',
  specification: '规格'
}, {
  fungusBagId: '3',
  qrCode: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2761691330,563494352&fm=11&gp=0.jpg',
  fungusBagName: '菌包名称',
  categoryName: '菌包类别',
  productionLotNumber: '生产批次号',
  produceCompanyName: '生产企业',
  packagingDate: '包装时间',
  specification: '规格'
}]
Vue.use(Layout)
Vue.use(Breadcrumb)
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)
Vue.use(Cascader)
Vue.use(Button)
Vue.use(Table)
export default {
  component: {
    // 'a-button': Button
  },
  created () {
    this.axios(
      {
        method: 'get',
        url: 'http://10.168.1.30:9090/produce/fungusbag',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(res => { this.list = res.data.records })
  },
  data() {
    return {
      list,
      columns
    }
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
  .search-wrapper{
    padding: 24px;
    background: #fff;
    margin-bottom: 10px;
    height: 168px;
    border-radius: 4px;

    .search-input-wrapper{
      position: relative;
      margin-bottom: 24px;

      .search-title{
        position: absolute;
        left: 0;
        color: #333;
        font-size: 14px;
      }

      .search-input{
        margin-top: 30px;
      }
    }
    .button{
      margin: 0 5px;
    }
  }
  .table-wrapper{
    position:relative;
    padding: 24px;
    background: #fff;
    min-height: 360px;
    border-radius: 4px;

    .add-button{
      position: absolute;
      right: 24px;
    }
  }
</style>
