<template>
  <div class="knowledge-quiz">
    <a-layout style="margin: 16px;background: #eee;">
      <MyBreadCrumb :crumbsArr="breadcrumbs"></MyBreadCrumb>
      <a-form class="form-fields" :form="form" @submit="handleSubmit">
        <a-row :gutter="24">
          <a-col
            v-for="(item, index) in fields"
            :key="'field' + item.id"
            :span="8"
            :style="{ display: index < count ? 'block' : 'none' }"
          >
            <a-form-item :label="item.label" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
              <a-input
                v-if="index === 0 || index === 1"
                :placeholder="item.placeholder"
                v-decorator="[`field_${item.id}`, { 
                  rules: item.validators
                }]"
              />
              <template v-else-if="index === 5 || index === 6">
                <a-date-picker
                  :disabledDate="disabledStartDate"
                  style="width:45%"
                  mode="date"
                  format="YYYY-MM-DD HH:mm:ss"
                  :placeholder="item.placeholder"
                  @change="handleStartOpenChange"
                  v-model="startDate"
                />
                <span style="height:1px;width:3%;margin: 0 2%;">━━</span>
                <a-date-picker
                  :disabledDate="disabledEndDate"
                  style="width:45%"
                  mode="date"
                  format="YYYY-MM-DD HH:mm:ss"
                  :placeholder="item.placeholder"
                  @change="handleEndOpenChange"
                  v-model="endDate"
                />
              </template>
              <a-select
                v-if="index === 2 && item.arrs.length > 0"
                notFoundContent="未匹配到数据"
                v-decorator="[`select_${item.id}`, { 
                  rules: item.validators
                }]"
                :placeholder="item.placeholder"
              >
                <a-select-option v-for="i in item.arrs" :key="i.targetClazz">{{i.clazzName}}</a-select-option>
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
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col>
            <a-button type="primary" html-type="submit">查询</a-button>
            <a-button :style="{ marginLeft: '8px' }" @click="handleReset">重置</a-button>
            <span
              :style="{ marginLeft: '8px', cursor: 'pointer' }"
              @click="() => {expand = !expand}"
            >
              {{expand ? '收起' : '展开'}}
              <a-icon :type="expand ? 'up' : 'down'" />
            </span>
          </a-col>
        </a-row>
      </a-form>
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
          <span slot="questionType" slot-scope="text, record">{{cmpQuestionType(record.question.questionType)}}</span>
          <span slot="replayFlag" slot-scope="text, record">{{cmpReplyFlag(record.replayFlag)}}</span>
          <span class="preview" slot="operation" slot-scope="text, record" @click="handleDetail(record)">查看</span>
        </a-table>
      </div>
    </a-layout>
  </div>
</template>

<script>
import MyBreadCrumb from "@/components/crumbsNav/CrumbsNav";
import Vue from "vue";
import { Form, Col, Row, Button, Input, Select, DatePicker, Layout, Pagination, Table, message } from "ant-design-vue";
Vue.use(Form);
Vue.use(Col);
Vue.use(Row);
Vue.use(Button);
Vue.use(Input);
Vue.use(Select);
Vue.use(DatePicker);
Vue.use(Layout);
Vue.use(Pagination);
Vue.use(Table);
import { knowledgeQuizList, knowledgeQuizCategory } from '@/api/productManage';

const breadcrumbs = [
  { name: "方案管理", back: false, path: "" },
  { name: "知识问答", back: false, path: "" }
];

const list = []
const columns = [
  { title: "序号", key: "itemIndex", scopedSlots: { customRender: 'itemIndex' } },
  { title: '问题描述', key: 'questionContent', scopedSlots: { customRender: 'questionContent' } },
  { title: '品种', dataIndex: 'question.breedName', key: 'breedName' },
  { title: '品类', dataIndex: 'question.categoryName', key: 'categoryName' },
  { title: '分类', dataIndex: 'question.targetClazz', key: 'targetClazz' },
  { title: '提交人', dataIndex: 'question.createUserName', key: 'createUserName' },
  { title: '创建日期', dataIndex: 'question.gmtCreate', key: 'gmtCreate' },
  { title: '回复数', dataIndex: 'answerCount', key: 'answerCount' },
  { title: '是否为常见问题', key: 'questionType', scopedSlots: { customRender: 'questionType' } },
  { title: '是否需要回复', key: 'replayFlag', scopedSlots: { customRender: 'replayFlag' } },
  {
    title: '操作',
    key: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
]

const validatorBaseX = (rule, value, callback) => {
  if (value && JSON.stringify(value).length > 10) {
    callback("不能超过10个字符");
  }
  callback();
};
const validatorBaseXX = (rule, value, callback) => {
  if (value && JSON.stringify(value).length > 20) {
    callback("不能超过20个字符");
  }
  callback();
};

const validators = {
  ["v-questionContent"]: [
    { required: false, message: "请输入问题描述" },
    { validator: validatorBaseXX }
  ],
  ["v-categoryName"]: [
    { required: false, message: "请输入品种" },
    { validator: validatorBaseXX }
  ],
  ["v-targetClazz"]: [
    { required: false, message: "请选择分类" },
    { validator: validatorBaseX }
  ],
  ["v-questionType"]: [
    { required: false, message: "请选择是否为常见问题" },
    { validator: validatorBaseX }
  ],
  ["v-replyType"]: [
    { required: false, message: "请选择是否需要回复" },
    { validator: validatorBaseX }
  ],
  ["v-startDate"]: [
    { required: false, message: "开始日期" },
  ],
  ["v-endDate"]: [
    { required: false, message: "结束日期" },
  ],
};

const fields = [
  {
    id: "questionContent",
    label: "问题描述",
    placeholder: "请输入问题描述",
    validators: validators["v-questionContent"]
  },
  {
    id: "categoryName",
    label: "品种",
    placeholder: "请输入品种",
    validators: validators["v-breed"]
  },
  {
    id: "targetClazz",
    label: "分类",
    placeholder: "请选择分类",
    arrs: [],
    validators: validators["v-targetClazz"]
  },
  {
    id: "questionType",
    label: "是否为常见问题",
    placeholder: "请选择是否为常见问题",
    arrs: [
      { id: 0, label: '是'},
      { id: 1, label: '否'}
    ],
    validators: validators["v-questionType"]
  },
  {
    id: "replyType",
    label: "是否需要回复",
    placeholder: "请选择是否需要回复",
    arrs: [
      { id: 'Y', label: '是'},
      { id: 'N', label: '否'}
    ],
    validators: validators["v-replyType"]
  },
  {
    id: "creatStartDate",
    label: "创建日期",
    placeholder: "开始日期",
    validators: validators["v-startDate"]
  },
  {
    id: "creatEndDate",
    label: "",
    placeholder: "结束日期",
    validators: validators["v-endDate"]
  }
];

export default {
  name: "knowledgeQuiz",
  components: {
    MyBreadCrumb
  },
  data() {
    return {
      breadcrumbs,
      fields,
      form: this.$form.createForm(this, { name: "knowledgeQuiz" }),
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
      endValue: null,
    };
  },
  computed: {
    count() {
      return this.expand ? 6 : 3;
    }
  },
  created() {
    this.fetchCategory()
    this.fetchList({})
  },
  methods: {
    fetchCategory() {
      knowledgeQuizCategory().then(res => {
        if (res && res.success === 'Y') {
          console.log('res:', res)
          this.fields[2].arrs = res.data
          return
        }
        this.fields[2].arrs = []
      })
    },

    fetchList(params) {
      this.loading = true
      let postData = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        ...params
      };
      knowledgeQuizList(postData).then(res => {
        this.loading = false
        console.log('res:', res)
        if (res && res.success === 'Y') {
          const pagination = { ...this.pagination };
          pagination.total = res.data && res.data.total;
          this.pagination = pagination;
          this.list = res.data && res.data.records
          return
        }
        this.list = []
      })
    },

    cmpQuestionType(tag) {
      return tag === 0 ? '是' : '否'
    },

    cmpReplyFlag(flag) {
      return flag === 'Y' ? '是' : '否'
    },

    handleSubmit(e) {
      e.preventDefault();
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
          this.pageNo = 1;
          this.fetchParams = params;
          this.fetchList(params)
        }
      });
    },

    handleDetail(record) {
      this.$router.push({path: `/knowledgeQuizDetail/${record.question.questionId}`})
    },

    handleReset() {
      this.form.resetFields();
      this.fetchParams = {}
      this.fetchList(this.fetchParams);
    },

    pageOnChange(cfg) {
      const pager = { ...this.pagination };
      pager.current = cfg.current;
      pager.pageSize = cfg.pageSize;
      this.pagination = pager;
      this.pageNo = pager.current
      this.pageSize = pager.pageSize
      this.fetchList(this.fetchParams)
    },

    /**
     * 日期
     */
    disabledStartDate(startValue) {
      const endValue = this.endValue;
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() > endValue.valueOf();
    },
    disabledEndDate(endValue) {
      const startValue = this.startValue;
      if (!endValue || !startValue) {
        return false;
      }
      return startValue.valueOf() >= endValue.valueOf();
    },
    handleStartOpenChange(date, dateString) {
      this.startDate = date
      this.startValue = dateString
    },
    handleEndOpenChange(date, dateString) {
      this.endDate = date
      this.endValue = dateString
    },
  }
};
</script>
<style lang="less" scoped>
.knowledge-quiz {
  .form-fields {
    background-color: white;
    padding: 30px 10px;
    margin-bottom: 12px;
  }
  .list-collection {
    background-color: #fff;
    .preview {
      cursor: pointer;
      color: #3C8DFF;
    }
    span {
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>