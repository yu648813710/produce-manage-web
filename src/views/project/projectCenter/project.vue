/**
方案中心列表页面
*/
<template>
  <div class="about">
    <a-layout>
      <a-layout-content style="margin: 16px">
        <div class="search-wrapper">
          <a-row :gutter="40">
            <a-col :span="8">
              <div class="search-input-wrapper">
                <span class="search-title">方案名称</span>
                <a-input
                  placeholder="Basic usage"
                  class="search-input"
                />
              </div>
            </a-col>
            <a-col :span="8">
              <div class="search-input-wrapper">
                <span class="search-title">产品名称</span>
                <a-input
                  placeholder="Basic usage"
                  class="search-input"
                />
              </div>
            </a-col>
            <a-col :span="8">
              <div class="search-input-wrapper">
                <span class="search-title">专家姓名</span>
                <a-input
                  placeholder="Basic usage"
                  class="search-input"
                />
              </div>
            </a-col>
          </a-row>
          <div>
            <a-button class="button">重置</a-button>
            <a-button
              type="primary"
              class="button"
            >查询</a-button>
          </div>
        </div>
        <div class="table-wrapper">
          <a-button
            type="primary"
            class="add-button"
          >
            <router-link :to="{name: 'addNewProject'}">新增方案</router-link>
          </a-button>
          <div></div>
          <a-table
            :scroll="{ x: 1500 }"
            :columns="columns"
            :dataSource="list"
            :style="{marginTop: '50px'}"
            :loading="loading"
            :pagination="pagination"
            :rowKey="record => record.greenhouseId"
          >
            <span
              slot="id"
              slot-scope="text, record, index"
            >{{index + 1}}</span>
            <div
              class="action"
              slot="operation"
              slot-scope="record,index"
            >
              <span>
                <router-link :to="{name: 'projectDetail', params: record}">编辑</router-link>
              </span>
              <span>
                <router-link :to="{name: 'projectDetail', params: record}">查看</router-link>
              </span>
            </div>

            <!--            <router-link slot="operation" slot-scope="text, record" :to="{name: 'productDetail', params: record}">编辑-->
            <!--            </router-link>-->
            <!--            <router-link slot="operation" slot-scope="text, record" :to="{name: 'productDetail', params: record}">预览-->
            <!--            </router-link>-->
          </a-table>
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>
<script>
import Vue from 'vue'
import { projectList } from '@/api/projectCenter.js'
import domUtil from '../../../utils/domUtil'
import {
  Layout,
  Breadcrumb,
  Input,
  Row,
  Col,
  Cascader,
  Button,
  Table
} from 'ant-design-vue'

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
  created() {},
  async mounted() {
    await this.getProjectList()
    console.log(this.list)
  },
  data() {
    return {
      list: [],
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
      columns: [
        { title: '序号', scopedSlots: { customRender: 'id' }, align: 'center' },
        { title: '方案名称', dataIndex: 'solutionName', key: 'projectName' },
        { title: '产品品种', dataIndex: 'categoryName', key: 'categoryName' },
        { title: '专家姓名', dataIndex: 'expertName', key: 'expertName' },
        { title: '方案提供公司', dataIndex: 'companyName', key: 'companyName' },
        {
          title: '创建时间',
          dataIndex: 'gmtCreate',
          customRender: text => {
            return domUtil.formDate(text)
          }
        },
        {
          title: '周期时长',
          dataIndex: 'cycleTotalLength',
          key: 'cycleTotalLength',
          customRender: text => {
            let num = text.replace(/[^0-9]/gi, '')
            let unit = text.replace(/[^a-z]+/gi, '')
            debugger
            if (unit === 'week') {
              return num + '周'
            } else if (unit === 'day') {
              return num + '天'
            }
          }
        },
        {
          title: '操作',
          key: 'operation',
          scopedSlots: { customRender: 'operation' },
          width: 160,
          align: 'center',
          fixed: 'right'
        }
      ]
    }
  },
  methods: {
    getProjectList() {
      let postData = {
        materialName: '',
        farmingTypeId: '',
        pageNo: this.pagination.current,
        pageSize: this.pagination.pageSize
      }
      this.loading = true
      projectList(postData).then(res => {
        this.loading = false
        for (let i = 0; i < res.data.records.length; i++) {
          res.data.records[i].cycleTotalLength =
            res.data.records[i].cycleTotalLength + res.data.records[i].cycleUnit
        }
        this.list = res.data.records
        for (let i = 0; i < this.list.length; i++) {
          this.list[i].expertName = '张强'
        }
        this.pagination.total = res.data.total
      })
    },
    editProject(record) {
      this.$router.to({ name: 'productDetail', params: record })
    }
  }
}
</script>
<style lang="less" scoped>
.search-wrapper {
  padding: 24px;
  background: #fff;
  margin-bottom: 10px;
  height: 168px;
  border-radius: 4px;

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

  .action span {
    display: inline-block;
    width: 35px;
  }
}
</style>
