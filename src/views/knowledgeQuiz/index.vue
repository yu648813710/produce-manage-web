<template>
  <div class="knowledge-quiz">
    <a-layout style="margin: 16px;background: #eee;">
      <MyBreadCrumb :crumbsArr="breadcrumbs"></MyBreadCrumb>
      <div class="search-wrapper">
        <a-form class="form-fields" :form="form" @submit="handleSubmit">
          <a-row :gutter="24">
            <a-col
              v-for="(item, index) in fields"
              :key="'field' + item.id"
              :span="8"
              :style="{ display: index < count ? 'block' : 'none' }"
            >
              <a-form-item :label="item.label">
                <a-input
                  autocomplete="off"
                  v-if="index === 0 || index === 1"
                  :placeholder="item.placeholder"
                  v-decorator="[`field_${item.id}`, {
                    rules: item.validators
                  }]"
                />
                <a-select
                  v-if="index === 2 && item.arrs.length > 0"
                  notFoundContent="未匹配到数据"
                  v-decorator="[`select_${item.id}`, {
                    rules: item.validators
                  }]"
                  :placeholder="item.placeholder"
                >
                  <a-select-option v-for="i in item.arrs" :key="i.clazzName">{{i.clazzName}}</a-select-option>
                </a-select>
                <a-select
                  v-if="index === 3 || index === 4"
                  notFoundContent="未匹配到数据"
                  v-decorator="[`select_${item.id}`, {
                    rules: item.validators
                  }]"
                  :placeholder="item.placeholder"
                >
                  <a-select-option v-for="i in item.arrs" :key="i.id">{{i.label}}</a-select-option>
                </a-select>
                <template v-else-if="index === 5">
                  <a-date-picker
                    :disabledDate="disabledStartDate"
                    style="width:45%"
                    mode="date"
                    format="YYYY-MM-DD"
                    :placeholder="item.placeholder"
                    @change="handleStartOpenChange"
                    v-model="startDate"
                  />
                  <span style="height:1px;width:3%;margin: 0 2%;">━━</span>
                  <a-date-picker
                    :disabledDate="disabledEndDate"
                    style="width:45%"
                    mode="date"
                    format="YYYY-MM-DD"
                    :placeholder="item.coc.placeholder"
                    @change="handleEndOpenChange"
                    v-model="endDate"
                  />
                </template>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col>
              <a-button type="primary" html-type="submit">查询</a-button>
              <a-button :style="{ marginLeft: '8px' }" @click="handleReset">重置</a-button>
              <a-button
                :style="{ marginLeft: '8px', cursor: 'pointer' }"
                @click="() => {expand = !expand}"
              >
                <a-icon :type="expand ? 'up' : 'down'" />
                {{expand ? '收起' : '展开'}}
              </a-button>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div class="list-collection">
        <a-table
          :columns="columns"
          :dataSource="list"
          :rowKey="e => e.question.questionId"
          :style="{padding: '24px'}"
          :pagination="pagination"
          :loading="loading"
          @change="pageOnChange"
        >
          <span slot="itemIndex" slot-scope="text, record, index">{{index+1}}</span>
          <span slot="questionContent" slot-scope="text, record">{{record.question.questionContent}}</span>
          <span
            slot="questionType"
            slot-scope="text, record"
          >{{cmpQuestionType(record.question.questionType)}}</span>
          <span slot="replayFlag" slot-scope="text, record">{{cmpReplyFlag(record.replayFlag)}}</span>
          <span
            class="preview"
            slot="operation"
            slot-scope="text, record"
            @click="handleDetail(record)"
          >查看</span>
        </a-table>
      </div>
    </a-layout>
  </div>
</template>

<script>
import MyBreadCrumb from '@/components/crumbsNav/CrumbsNav'
import Vue from 'vue'
import { Form, Col, Row, Button, Input, Select, DatePicker, Layout, Pagination, Table } from 'ant-design-vue'
import { knowledgeQuizList, knowledgeQuizCategory } from '@/api/productManage'
import { columns, fields } from './config'
Vue.use(Form)
Vue.use(Col)
Vue.use(Row)
Vue.use(Button)
Vue.use(Input)
Vue.use(Select)
Vue.use(DatePicker)
Vue.use(Layout)
Vue.use(Pagination)
Vue.use(Table)

const breadcrumbs = [
  { name: '当前位置', back: false, path: '' },
  { name: '方案管理', back: false, path: '' },
  { name: '知识问答', back: false, path: '' }
]

const list = []

export default {
  name: 'knowledgeQuiz',
  components: {
    MyBreadCrumb
  },
  data () {
    return {
      breadcrumbs,
      fields,
      form: this.$form.createForm(this, { name: 'knowledgeQuiz' }),
      expand: false,
      pageNo: 1,
      pageSize: 10,
      total: 100,
      fetchParams: {},
      columns,
      list,
      pagination: { showQuickJumper: true, showSizeChanger: true },
      loading: false,

      startDate: null,
      startValue: null,
      endDate: null,
      endValue: null
    }
  },
  computed: {
    count () {
      return this.expand ? 7 : 3
    }
  },
  created () {
    this.fetchCategory()
    this.fetchList({})
  },
  methods: {
    fetchCategory () {
      knowledgeQuizCategory().then(res => {
        if (res && res.success === 'Y') {
          this.fields[2].arrs = res.data
          return
        }
        this.fields[2].arrs = []
      })
    },

    fetchList (params) {
      this.loading = true
      let postData = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        ...params
      }
      knowledgeQuizList(postData).then(res => {
        this.loading = false
        if (res && res.success === 'Y') {
          const pagination = { ...this.pagination }
          pagination.total = res.data && res.data.total
          this.pagination = pagination
          this.list = res.data && res.data.records
          return
        }
        this.list = []
      })
    },

    cmpQuestionType (tag) {
      return tag === 0 ? '是' : '否'
    },

    cmpReplyFlag (flag) {
      return flag === 'Y' ? '是' : '否'
    },

    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          const params = {
            questionContent: values.field_questionContent === undefined || values.field_questionContent === '' ? null : values.field_questionContent,
            categoryName: values.field_categoryName === undefined || values.field_categoryName === '' ? null : values.field_categoryName,
            targetClazz: values.select_targetClazz === undefined || values.select_targetClazz === '' ? null : values.select_targetClazz,
            questionType: values.select_questionType === undefined || values.select_questionType === '' ? null : values.select_questionType,
            replyType: values.select_replyType === undefined || values.select_replyType === '' ? null : values.select_replyType,
            beginDate: this.startValue,
            endDate: this.endValue
          }
          this.pageNo = 1
          this.pagination.current = 1
          this.fetchParams = params
          this.fetchList(params)
        }
      })
    },

    handleDetail (record) {
      this.$router.push({ path: `/knowledgeQuizDetail/${record.question.questionId}` })
    },

    handleReset () {
      this.form.resetFields()
      this.fetchParams = {}
      this.startDate = null
      this.endDate = null
      this.fetchList(this.fetchParams)
    },

    pageOnChange (cfg) {
      const pager = { ...this.pagination }
      pager.current = cfg.current
      pager.pageSize = cfg.pageSize
      this.pagination = pager
      this.pageNo = pager.current
      this.pageSize = pager.pageSize
      this.fetchList(this.fetchParams)
    },

    /**
     * 日期
     */
    disabledStartDate (startDate) {
      const endDate = this.endDate
      if (!startDate || !endDate) {
        return false
      }
      return startDate.valueOf() > endDate.valueOf()
    },
    disabledEndDate (endDate) {
      const startDate = this.startDate
      if (!endDate || !startDate) {
        return false
      }
      return startDate.valueOf() >= endDate.valueOf()
    },
    handleStartOpenChange (date, dateString) {
      this.startDate = date
      this.startValue = dateString
    },
    handleEndOpenChange (date, dateString) {
      this.endDate = date
      this.endValue = dateString
    }
  }
}
</script>
<style lang="less" scoped>
.knowledge-quiz {
  .search-wrapper {
    padding: 24px;
    background: #fff;
    margin-bottom: 10px;
    border-radius: 4px;
    .form-fields {
      .ant-form-item {
        text-align: left;
      }
    }
  }
  .list-collection {
    background-color: #fff;
    .preview {
      cursor: pointer;
      color: #3c8dff;
    }
    span {
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
