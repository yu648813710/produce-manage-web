<template>
  <div class="plan-market">
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
            <a-form-item :label="item.label" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
              <a-input
                :placeholder="item.placeholder"
                v-decorator="[`field_${item.id}`, { 
                  rules: item.validators
                }]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col>
            <a-button :style="{ marginRight: '8px' }" @click="handleReset">重置</a-button>
            <a-button type="primary" html-type="submit">查询</a-button>
            <span :style="{ marginLeft: '8px', cursor: 'pointer' }" @click="() => {expand = !expand}">
              {{expand ? '收起' : '展开'}}
              <a-icon :type="expand ? 'up' : 'down'" />
            </span>
          </a-col>
        </a-row>
      </a-form>
      <div class="list-collection">
          <template v-if="collectionItems.length > 0">
            <ul v-for="(item, i) in collectionItems" :key="item.solutionId">
              <a-col :span="8">
                <CollectionItem :class="cmpCollection(i)" :info="item"/>
              </a-col>
            </ul>
          </template>
          <template v-else>
            <div class="empty-list"><span>暂无数据</span></div>
          </template>
      </div>
      <a-pagination class="pagination" :pageSizeOptions="['6', '12', '18']" showSizeChanger showQuickJumper :defaultCurrent="pageNo" :pageSize="pageSize" :total="total" @change="pageOnChange" @showSizeChange="pageSizeOnChange"/>
    </a-layout>
  </div>
</template>
<script>
import MyBreadCrumb from "@/components/crumbsNav/CrumbsNav";
import CollectionItem from './CollectionItem';
import Vue from "vue";
import { Form, Col, Row, Button, Input, Layout, Pagination, message } from "ant-design-vue";
Vue.use(Form);
Vue.use(Col);
Vue.use(Row);
Vue.use(Button);
Vue.use(Input);
Vue.use(Layout);
Vue.use(Pagination);
import { planMarketList } from '@/api/productManage';

const breadcrumbs = [
  { name: "方案管理", back: false, path: "" },
  { name: "方案市场", back: false, path: "" }
];

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
  ["v-solutionName"]: [
    { required: false, message: "请输入产品名称" },
    { validator: validatorBaseXX }
  ],
  ["v-companyName"]: [
    { required: false, message: "请输入服务商" },
    { validator: validatorBaseXX }
  ],
  ["v-categoryName"]: [
    { required: false, message: "请输入产品品类" },
    { validator: validatorBaseX }
  ],
  ["v-breedName"]: [
    { required: false, message: "请输入产品品种" },
    { validator: validatorBaseX }
  ]
};

const fields = [
  {
    id: "solutionName",
    label: "方案名称",
    placeholder: "请输入方案名称",
    validators: validators["v-solutionName"]
  },
  {
    id: "companyName",
    label: "服务商",
    placeholder: "请输入服务商",
    validators: validators["v-companyName"]
  },
  {
    id: "categoryName",
    label: "产品品类",
    placeholder: "请输入产品品类",
    validators: validators["v-categoryName"]
  },
  {
    id: "breedName",
    label: "产品品种",
    placeholder: "请输入产品品种",
    validators: validators["v-breedName"]
  }
];

const collectionItems = []

export default {
  name: "planMarket",
  components: {
    MyBreadCrumb,
    CollectionItem
  },
  data() {
    return {
      breadcrumbs,
      fields,
      form: this.$form.createForm(this, { name: "planMarket" }),
      expand: false,
      collectionItems,
      pageNo: 1,
      pageSize: 6,
      total: 0,
      fetchParams: {}
    };
  },
  computed: {
    count() {
      return this.expand ? 4 : 3;
    }
  },
  created() {
    this.fetchList({});
  },
  methods: {
    cmpCollection(i) {
      return i === 1 || i === 4 ? 'card-item-cen' : 
             i === 0 || i === 3 ? 'card-item-lef' : 'card-item-rig'
    },

    fetchList(params) {
      let postdata = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        ...params
      }
      planMarketList(postdata).then(res => {
        if (res && res.success === 'Y') {
          this.total = res.data && res.data.total || 0
          this.collectionItems = res.data && res.data.records || []
          return
        }
        this.collectionItems = []
        message.error(res.message)
      })
    },

    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          const params = {
            solutionName: values.field_solutionName === undefined || values.field_solutionName === '' ? null : values.field_solutionName,
            companyName: values.field_companyName === undefined || values.field_companyName === '' ? null : values.field_companyName,
            categoryName: values.field_categoryName === undefined || values.field_categoryName === '' ? null : values.field_categoryName,
            breedName: values.field_breedName === undefined || values.field_breedName === '' ? null : values.field_breedName
          }
          this.pageNo = 1;
          this.fetchParams = params;
          this.fetchList(params)
        }
      });
    },

    handleReset() {
      this.form.resetFields();
      this.fetchList({});
    },

    pageOnChange(pageNumber) {
      this.pageNo = pageNumber;
      this.fetchList(this.fetchParams);
    },

    pageSizeOnChange(cfg, pageSize) {
      this.pageNo = 1;
      this.pageSize = pageSize
      this.fetchList(this.fetchParams);
    }
  }
};
</script>
<style lang="less" scoped>
.plan-market {
  .form-fields {
    background-color: white;
    padding: 30px 0;
    margin-bottom: 12px;
  }
  .list-collection {
    .card-item-lef {
      padding-right: 10px; 
    }
    .card-item-cen {
      padding: 0 5px;
    }
    .card-item-rig {
      padding-left: 10px; 
    }
    .empty-list {
      height: 100px;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
</style>