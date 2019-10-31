<template>
  <a-modal
    :width="800"
    :maskClosable="false"
    :maskStyle="{background: 'transparent'}"
    v-model="isVisiable"
    @ok="handleOk"
  >
    <span slot="title" :style="{fontWeight: 700, fontSize: '16px'}">添加农资</span>
    <div v-if="iserror" :class="iserror ? 'tip-error' : ''">
      <span>{{errorMsg}}</span>
      <a-button type="link" @click.native="handleErrorX">X</a-button>
    </div>
    <a-form class="form-fields" :form="form" @submit="handleOk">
      <a-row v-if="fields" :gutter="24">
        <a-col v-for="(item, index) in fields" :key="'field' + item.id">
          <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
            <span v-if="index === 5" slot="label">
              <span :style="{color: 'red'}">*&nbsp;&nbsp;</span>
              <span>{{item.label}}</span>
            </span>
            <span v-else slot="label">{{item.label}}</span>
            <a-input
              v-if="index === 6 || index === 7"
              autocomplete="off"
              :placeholder="item.placeholder"
              v-decorator="[`field_${item.id}`, {
                rules: item.validators
              }]"
            />
            <a-row v-else-if="index === 5">
              <a-form-item
                :style="{display: 'inline-block', width: 'calc(50% - 22px)' }"
                class="inline-form-item"
              >
                <a-input
                  autocomplete="off"
                  :placeholder="item.placeholder"
                  v-decorator="[`field_${item.id}`, {
                    rules: item.validators,
                    getValueFromEvent: (event) => {
                        return event.target.value.replace(/^(0+)|[^\d]+/g,'')
                    },
                  }]"
                ></a-input>
              </a-form-item>
              <span :style="{display: 'inline-block', width: '24px', textAlign: 'center' }">✲</span>
              <a-form-item
                :style="{display: 'inline-block', width: 'calc(50% - 22px)' }"
                class="inline-form-item"
              >
                <a-input
                  autocomplete="off"
                  :placeholder="item.coc.placeholder"
                  v-decorator="[`field_${item.coc.id}`, {
                    rules: item.coc.validators,
                    getValueFromEvent: (event) => {
                        return event.target.value.replace(/^(0+)|[^\d]+/g,'')
                    },
                  }]"
                ></a-input>
              </a-form-item>
              <span :style="{display: 'inline-block', width: '20px'}">cm</span>
            </a-row>
            <a-auto-complete
              v-else-if="index === 0"
              :allowClear="true"
              :dataSource="item.arr"
              @search="handleSearchFarmingNum"
              @select="handleSelectFarmingNum"
              :filterOption="filterOption"
              placeholder="input here"
              v-decorator="[`select_${item.id}`, {
                rules: item.validators
              }]"
            />
            <a-select
              v-else
              notFoundContent="未匹配到数据"
              v-decorator="[`select_${item.id}`, {
                  rules: item.validators
                }]"
              :placeholder="item.placeholder"
              @change="(e) => handleFarmingNum(e)"
            >
              <a-select-option v-for="sitem in item.arr" :key="sitem.id">{{sitem.label}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>
<script>
import Vue from 'vue'
import { Input, Row, Col, Button, Table, Form, Modal, DatePicker, AutoComplete } from 'ant-design-vue'
import { columns, fields } from './config'
import {
  getMaterialNumList
} from '@/api/productManage.js'
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(Table)
Vue.use(Form)
Vue.use(Modal)
Vue.use(DatePicker)
Vue.use(AutoComplete)

const unitList = []

export default {
  name: 'addPurchase',
  components: {
  },
  data () {
    return {
      unitList,
      columns,
      fields,
      form: this.$form.createForm(this, { name: 'addPurchase' }),
      isVisiable: false,
      iserror: false,
      errorMsg: '',
      isToChooseImg: true
    }
  },
  created () {
    // this.fetchPrdPL()
  },
  watch: {
    isVisiable (oval, nval) {
      if (nval === true) {
        this.form.resetFields()
      }
    }
  },
  methods: {
    // fetchPrdPL () {
    //   getProductCategory().then(res => {
    //     if (res && res.code === 200) {
    //       if (res.data && res.data.length > 0) {
    //         fields[1].arr = res.data
    //       }
    //     }
    //   })
    // },

    // fetchPrdPZ (categoryId) {
    //   getProductBreed(categoryId).then(res => {
    //     if (res && res.code === 200) {
    //       if (res.data && res.data.length > 0) {
    //         fields[2].arr = res.data
    //       }
    //     }
    //   })
    // },

    // fetchAddFungus (params) {
    //   let postData = {
    //     ...params
    //   }
    //   addFungusBag(postData).then(res => {
    //     this.tipConfirm(res.success, res.message)
    //     if (res && res.success === 'Y') {
    //       this.isVisiable = false
    //       return
    //     }
    //     this.errorMsg = res.message || ''
    //     this.iserror = true
    //   })
    // },

    fetchMaterialNumList(farmingNum) {
      getMaterialNumList(farmingNum).then(res => {
        this.fields[0].arr = ['000', '111', '222', '333', 'sss']
        // this.fields[0].arr = (res && res.data) || []
      })
    },

    handleSearchFarmingNum(value) {
      this.fetchMaterialNumList(value)
      // this.fields[0].arr = !value ? [] : [value, value + value, value + value + value]
    },
    handleSelectFarmingNum(value, e) {
      console.log('onSelect', value)
      console.log('onSelect-e', e)
    },

    filterOption(input, option) {
      console.log('input:', input)
      console.log('filter:', option)
      return (
        option.componentOptions.children[0] ? option.componentOptions.children[0].text.toUpperCase().indexOf(input.toUpperCase()) >= 0 : ''
      )
    },

    tipConfirm (tag, msg) {
      let self = this
      if (tag === 'Y') {
        self.$message.success(msg)
        self.$emit('refresh')
        return
      }
      self.$message.error(msg)
    },

    disabledStartDate (startDate) {
      const nowDate = new Date()
      if (!startDate || !nowDate) {
        return false
      }
      return startDate.valueOf() > nowDate.valueOf()
    },

    handleErrorX () {
      this.iserror = false
    },

    handleBlur (e) {
      this.checkPrdName(e.target.value)
    },

    handleFarmingNum (e) {
      console.log('eeeee:', e)
    },

    showModel () {
      this.isVisiable = true
    },

    handleOk (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        console.log('fields:', values)
        if (!err) {
          const params = {
            fungusBagName: values.field_fungusBagName,
            categoryId: values.select_categoryId,
            breedId: values.select_breedId,
            thirdCompanyName: values.field_thirdCompanyName,
            productionTime: values.picker_productionTime.format('YYYY-MM-DD HH:mm:ss'),
            deliveryTime: values.picker_deliveryTime.format('YYYY-MM-DD HH:mm:ss'),
            diameter: values.field_diameter,
            height: values.field_height,
            amount: values.field_amount
          }
          console.log('pm:', params)
          // this.fetchAddFungus(params)
        }
      })
    }
  }
}
</script>
<style lang="less">
.tip-error {
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border: 1px solid rgb(243, 60, 60);
  background-color: #fff0ef;
  border-radius: 2px;
  span {
    margin-left: 20px;
  }
}
.show-error {
  display: block;
}
.inline-form-item {
  margin-bottom: unset;
}
</style>
