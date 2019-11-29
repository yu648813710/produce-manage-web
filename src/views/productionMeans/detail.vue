<template>
  <div class="means-detail">
    <MyBreadCrumb :crumbsArr="crumbsArr"></MyBreadCrumb>
    <div class="table-content">
      <p style="font-size:16px;font-weight:bold;line-height:40px;padding-top: 20px;">申请企业基本情况</p>
      <div class="table-content-info">
        <a-row :gutter="24" style="margin: 0">
          <a-col
            v-for="(item, index) in list"
            :key="'info' + item.id"
            :span="12"
            style="padding: 0"
          >
            <template v-if="pictures.length === 1 && item.id !== '018' && item.id !== '017'">
              <div v-if="index === (list.length - 3)" :class="index % 2 === 0 ? 'row-img' : 'row-img-sp'">
                <span>{{item.label}}</span>
                <span><img v-if="item.value" :src="item.value" alt="img"></span>
              </div>
              <div v-else :class="index % 2 === 0 ? 'row-item' : 'row-item-sp'">
                <span>{{item.label}}</span>
                <span>{{item.value}}</span>
              </div>
            </template>
            <template v-if="(pictures.length === 2 || pictures.length === 3) && item.id !== '018'">
              <div v-if="index === (list.length - 3)" :class="index % 2 === 0 ? 'row-img' : 'row-img-sp'">
                <span>{{item.label}}</span>
                <span><img v-if="item.value" :src="item.value" alt="img"></span>
              </div>
              <div v-else-if="index === (list.length - 2)" :class="index % 2 === 0 ? 'row-img' : 'row-img-sp'">
                <span><img v-if="item.label" :src="item.label" alt="img"></span>
                <span><img v-if="item.value" :src="item.value" alt="img"></span>
              </div>
              <div v-else :class="index % 2 === 0 ? 'row-item' : 'row-item-sp'">
                <span>{{item.label}}</span>
                <span>{{item.value}}</span>
              </div>
            </template>
            <template v-if="pictures.length === 4 || pictures.length === 5">
              <div v-if="index === (list.length - 3)" :class="index % 2 === 0 ? 'row-img' : 'row-img-sp'">
                <span>{{item.label}}</span>
                <span><img v-if="item.value" :src="item.value" alt="img"></span>
              </div>
              <div v-else-if="index === (list.length - 2) || index === (list.length - 1)" :class="index % 2 === 0 ? 'row-img' : 'row-img-sp'">
                <span><img v-if="item.label" :src="item.label" alt="img"></span>
                <span><img v-if="item.value" :src="item.value" alt="img"></span>
              </div>
              <div v-else :class="index % 2 === 0 ? 'row-item' : 'row-item-sp'">
                <span>{{item.label}}</span>
                <span>{{item.value}}</span>
              </div>
            </template>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Table, Row, Col, Layout } from 'ant-design-vue'
import { produceMeansDetail } from '@/api/productManage'
import MyBreadCrumb from '@/components/crumbsNav/CrumbsNav'
Vue.use(Table)
Vue.use(Row)
Vue.use(Col)
Vue.use(Layout)

const crumbsArr = [
  { name: '生产管理', back: true, path: '/productionMeans' },
  { name: '生产资料详情', back: false, path: '' }
]
const list = [
  { id: '000', label: '生产资料编号', value: '-' },
  { id: '001', label: '企业名称', value: null },
  { id: '002', label: '所属行业', value: null },
  { id: '003', label: '企业地址', value: null },
  { id: '004', label: '土地所有人', value: null },
  { id: '005', label: '手机', value: null },
  { id: '006', label: '报告年度', value: null },
  { id: '007', label: '', value: null },
  { id: '008', label: '经营范围', value: null },
  { id: '009', label: '', value: null },
  { id: '010', label: '土地面积', value: null },
  { id: '011', label: '种植面积', value: null },
  { id: '012', label: '栽培作物', value: null },
  { id: '013', label: '实际产量', value: null },
  { id: '014', label: '实际销量', value: null },
  { id: '015', label: '销售额', value: null },
  { id: '016', label: '土地确权证明', value: '' },
  { id: '017', label: '', value: '' },
  { id: '018', label: '', value: '' }
]

export default {
  name: 'productionMeansDetail',
  components: {
    MyBreadCrumb
  },
  data() {
    return {
      list,
      crumbsArr,
      pictures: []
    }
  },
  created() {
    this.fetchDetail()
  },
  methods: {
    fetchDetail() {
      produceMeansDetail(this.$route.query.bizId).then(res => {
        console.log('查询详情：', res)
        if (res && res.success === 'Y') {
          this.pictures = res.data.landCertificate
          this.list[0].value = res.data.materialNum
          this.list[1].value = res.data.enterpriseName
          this.list[2].value = res.data.industry
          this.list[3].value = res.data.enterpriseAddress
          this.list[4].value = res.data.landowner
          this.list[5].value = res.data.mobilePhone
          this.list[6].value = res.data.reportYear + ' 年'
          this.list[10].value = res.data.landArea + ' 亩'
          this.list[11].value = res.data.plantArea + ' 亩'
          this.list[12].value = res.data.cultivation
          this.list[13].value = res.data.realOutput + ' 斤'
          this.list[14].value = res.data.salesVolume + ' 斤'
          this.list[15].value = res.data.salesValue + ' 元'
          if (res.data.landCertificate) {
            if (res.data.landCertificate.length === 1) {
              this.list[16].value = res.data.landCertificate[0]
            } else if (res.data.landCertificate.length === 2) {
              this.list[16].value = res.data.landCertificate[0]
              this.list[17].label = res.data.landCertificate[1]
            } else if (res.data.landCertificate.length === 3) {
              this.list[16].value = res.data.landCertificate[0]
              this.list[17].label = res.data.landCertificate[1]
              this.list[17].value = res.data.landCertificate[2]
            } else if (res.data.landCertificate.length === 4) {
              this.list[16].value = res.data.landCertificate[0]
              this.list[17].label = res.data.landCertificate[1]
              this.list[17].value = res.data.landCertificate[2]
              this.list[18].label = res.data.landCertificate[3]
            } else if (res.data.landCertificate.length === 5) {
              this.list[16].value = res.data.landCertificate[0]
              this.list[17].label = res.data.landCertificate[1]
              this.list[17].value = res.data.landCertificate[2]
              this.list[18].label = res.data.landCertificate[3]
              this.list[18].value = res.data.landCertificate[4]
            }
          }
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.means-detail {
  margin: 16px;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-x: hidden;
  .table-content {
    background-color: #fff;
    &-info {
      margin: 30px;
      border: 0.3px solid #eee;
      .row-item {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 50px;
        line-height: 50px;
        border-bottom: 0.3px solid #eee;
        span {
          width: 50%;
          border-right: 0.3px solid #eee;
        }
      }
      .row-item-sp {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 50px;
        line-height: 50px;
        border-bottom: 0.3px solid #eee;
        span:nth-child(1) {
          width: 50%;
          border-right: 0.3px solid #eee;
        }
        span:nth-child(2) {
          width: 50%;
        }
      }
      .row-img {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 160px;
        line-height: 160px;
        border-bottom: 0.3px solid #eee;
        span {
          width: 50%;
          height: 100%;
          border-right: 0.3px solid #eee;
          img {
            width: 120px;
            height: 120px;
          }
        }
      }
      .row-img-sp {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 160px;
        line-height: 160px;
        border-bottom: 0.3px solid #eee;
        span {
          width: 50%;
          height: 100%;
          img {
            width: 120px;
            height: 120px;
          }
        }
        span:nth-child(1) {
          width: 50%;
          border-right: 0.3px solid #eee;
        }
        span:nth-child(2) {
          width: 50%;
        }
      }
    }
  }
}
</style>
