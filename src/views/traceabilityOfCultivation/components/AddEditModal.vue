<template>
  <div>
    <a-modal
      :title="title"
      :visible="visible"
      :isEditObj="isEditObj"
      @ok="handleModalOk"
			:width="1000"
      :bodyStyle="{
        height: '490px',
        overflow: 'auto'
      }"
      @cancel="handleModalCancel"
      :maskClosable="false"
      :destroyOnClose="true"
      >
      <div>
				<a-form :form="modalForm" class="form-fields">
          <a-row :gutter="24">
            <a-col :span="12" class="row-col" >
              <a-form-item label="商品名称" :colon="false">
                <a-input
                  placeholder="请输入商品名称"
                  autocomplete="off"
                  maxLength="15"
                  v-decorator="[
                    'productName',
                    { rules: [{ required: true, message: '请输入商品名称' },
                    ] },
                  ]"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12" class="row-col" >
              <a-form-item label="产品品类" :colon="false">
                <a-select
                  placeholder="请选择产品品类"
                  :allowClear="true"
                  :disabled="isEdit"
                  :getPopupContainer="triggerNode => {
                    return triggerNode.parentNode || document.body;
                  }"
                  v-decorator="[
                    'productCategoryCode',
                    { rules: [{ required: true, message: '请选择产品品类' }] },
                  ]"
                  @change="getBreedList"
                >
                  <a-select-option v-for="item in categoryArray" :key="item.categoryId" :value="item.categoryId">{{item.categoryName}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12" class="row-col" >
              <a-form-item label="产品品种" :colon="false">
                <a-select
                  placeholder="请选择产品品种"
                  :allowClear="true"
                  :getPopupContainer="triggerNode => {
                    return triggerNode.parentNode || document.body;
                  }"
                  :disabled="isEdit"
                  v-decorator="[
                    'productBreedCode',
                    { rules: [{ required: true, message: '请选择产品品种' }] },
                  ]"
                >
                  <a-select-option v-for="item in breedArray" :key="item.breedId" :value="item.breedId">{{item.breedName}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12" class="row-col" >
              <a-form-item label="生产企业" :colon="false">
                <a-input
                  placeholder="请输入生产企业"
                  autocomplete="off"
                  maxLength="15"
                  v-decorator="[
                    'productionCompany',
                    { rules: [{ required: true, message: '请输入生产企业' }] },
                  ]"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12" class="row-col" >
              <a-row>
                <a-col :span="24">
                  <a-form-item label="生产地" :colon="false">
                    <a-cascader
                      placeholder="请选择基地地址"
                      v-decorator="[
                      'baseAddress',{
                        rules: [{ required: true, message: '请选择生产地址' }]
                      }]"
                      :options="cityList"
                      :getPopupContainer="triggerNode => triggerNode.parentNode"
                    />
                  </a-form-item>
                </a-col>
              </a-row>
            </a-col>
            <a-col :span="12" class="row-col" >
              <a-row>
                <a-col :span="24">
                  <a-form-item label="具体地址" :colon="false">
                    <a-input
                      placeholder="请输入具体地址"
                      autocomplete="off"
                      maxLength="15"
                      v-decorator="[
                        'address',
                        { rules: [{ required: true, message: '请输入具体地址' }] },
                      ]"
                    />
                  </a-form-item>
                </a-col>
              </a-row>
            </a-col>
            <a-col :span="12" class="row-col" >
              <a-form-item label="生产日期" :colon="false">
                <a-date-picker
                  format="YYYY-MM-DD"
                  :getCalendarContainer="triggerNode => {
                    return triggerNode.parentNode || document.body;
                  }"
                  :disabledDate="disabledDate"
                  v-decorator="[
                    'productionDate',
                    {
                      rules: [
                        {
                          required: true,
                          message: '请选择生产日期',
                        }
                      ],
                    },
                  ]"
                  @change="datePickerChange" style="width: 100%;"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12" class="row-col" >
              <a-form-item label="保质期" class="form-item-label-sty" :colon="false">
                <a-row :gutter="0">
                  <a-col :span="22">
                    <a-input-number
                      placeholder="请输入保质期"
                      autocomplete="off"
                      style="width:100%;"
                      v-decorator="[
                        'expiryTime',
                        { rules: [{ required: true, message: '请输入有效的保质期天数',type: 'number' }] },
                      ]"
                    />
                  </a-col>
                  <a-col :span="2" style="text-align:right;">
                    <span >天</span>
                  </a-col>
                </a-row>
              </a-form-item>
            </a-col>
            <a-col :span="12" class="row-col" >
              <a-form-item label="单价" class="form-item-label-sty" :colon="false">
                <a-row :gutter="0">
                  <a-col :span="22">
                    <a-input
                      placeholder="请输入单价"
                      autocomplete="off"
                      style="width:100%;"
                      v-decorator="[
                        'price',
                        { rules: [{ required: true, validator: validatorPrice }] },
                      ]"
                    />
                  </a-col>
                  <a-col :span="2" style="text-align:right;">
                    <span >元</span>
                  </a-col>
                </a-row>
              </a-form-item>
            </a-col>
            <a-col :span="12" class="row-col" >
              <a-form-item label="联系方式" :colon="false">
                <a-input
                  placeholder="请输入联系方式"
                  autocomplete="off"
                  maxLength="16"
                  v-decorator="[
                    'phone',
                    { rules: [{ required: true, message: '请输入联系方式' }] },
                  ]"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12" class="row-col" >
              <a-form-item label="木耳图片" :colon="false">
                <a-input
                  style="display: none"
                  v-decorator="[
                    `baseImg`,
                    {
                      rules: [
                        {
                          required: true,
                          message: '请上传木耳图片'
                        }
                      ]
                    }
                  ]"
                />
                <upload-component
                  :disabled="false"
                  :selfImgUrl="picturePath"
                  :visible="visible"
                  @haveUploadImg="haveUploadImg"
                ></upload-component>
                <p v-if="!isImgPath" style="color:red;">请上传木耳图片</p>
              </a-form-item>
            </a-col>
          </a-row>
				</a-form>
			</div>
    </a-modal>
  </div>
</template>
<script>
import Vue from 'vue'
import { Modal, Form, Row, Col, Input, Select, DatePicker, InputNumber } from 'ant-design-vue'
import uploadComponent from '@/components/UploadComponent/UploadComponent.vue'
import cityList from '@/utils/cityList'
import { tracesource, getCategory, getBreedList, editTracesource } from '@/api/farmPlan.js'
import moment from 'moment'
Vue.use(Modal)
Vue.use(Form)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Select)
Vue.use(DatePicker)
Vue.use(InputNumber)

const validatorPrice = (rule, value, callback) => {
  let regex = /^[0-9]+(.[0-9]{1,2})?$/
  if (!value || JSON.stringify(value).length === 0) {
    callback(new Error('请输入单价'))
  } else if (!regex.test(value)) {
    callback(new Error('请输入数字(精确到角分)'))
  }
  callback()
}

export default {
  components: {
    uploadComponent
  },
  props: {
    title: {
      type: String,
      default: '',
      required: true
    },
    visible: {
      type: Boolean,
      default: false,
      required: true
    },
    isEditObj: {
      default: {},
      required: true
    },
    isEdit: { // 是否是编辑默认为false
      type: Boolean,
      default: false,
      required: true
    }
  },
  data () {
    return {
      modalForm: this.$form.createForm(this),
      cityList: cityList,
      categoryArray: [], // 品类
      categoryId: '',
      breedArray: [], // 品种
      productionDate: '', // 日期
      picturePath: '', // 图片地址
      isImgPath: true, // 校验是否上传了图片
      validatorPrice
    }
  },
  created() {
    // 获取品类
    this.getCategoryList()
  },
  mounted() {
    if (Object.keys(this.isEditObj).length > 0) {
      if (this.isEditObj.productCategoryCode) {
        this.getBreedList(this.isEditObj.productCategoryCode)
      }
      this.$nextTick(() => {
        console.log('bbbbbbbbb:', this.isEditObj)
        this.modalForm.setFieldsValue({
          productName: this.isEditObj.productName, // '产品名称',
          productCategoryCode: this.isEditObj.productCategoryCode, // '品类id',
          productBreedCode: this.isEditObj.productBreedCode, // '品种id',
          productionCompany: this.isEditObj.productionCompany, // '生产企业',
          baseAddress: [
            this.isEditObj.provinceCode ? Number(this.isEditObj.provinceCode) : '',
            this.isEditObj.cityCode ? Number(this.isEditObj.cityCode) : '',
            this.isEditObj.areaCode ? Number(this.isEditObj.areaCode) : '',
            this.isEditObj.townCode ? Number(this.isEditObj.townCode) : ''
          ], // 省市县镇回显
          address: this.isEditObj.address, // '地址(某某村)'
          productionDate: moment(this.isEditObj.productionDate || '', 'YYYY-MM-DD'), // '2019-11-05', // 生产日期
          baseImg: this.isEditObj.productPicture,
          expiryTime: Number(this.isEditObj.expiryTime), // '保质期',
          price: this.isEditObj.price, // 单价
          phone: this.isEditObj.phone // 单价
        })
        this.productionDate = this.isEditObj.productionDate
        this.picturePath = this.isEditObj.productPicture
      })
    }
  },
  methods: {
    // 获取品类
    getCategoryList () {
      getCategory()
        .then(res => {
          if (res.success === 'Y') {
            this.categoryArray = res.data || []
          } else {
            this.$message.error(res.message)
          }
        })
    },
    // 获取品种
    getBreedList (value) {
      if (value) {
        // 如果品类有修改清空品种和菌包内的数据 让其重新选择
        if (this.categoryId !== value) {
          this.categoryId = value
          // 品类切换品种清空
          this.modalForm.setFieldsValue({
            productBreedCode: ''
          })
        }
        getBreedList(value)
          .then(res => {
            if (res.success === 'Y') {
              this.breedArray = res.data || []
            } else {
              this.$message.error(res.message)
            }
          })
      }
    },
    disabledDate(current) {
      // Can not select days before today and today
      return current && current > moment().endOf('day')
    },
    // 选择日期
    datePickerChange(e, value) {
      if (value) {
        this.productionDate = value
      }
    },
    // 获取图片上传成功之后的路径
    haveUploadImg(path) {
      if (path) {
        this.picturePath = path
        this.modalForm.setFieldsValue({
          baseImg: path
        })
      }
    },
    // 新增或者编辑的确认事件
    handleModalOk() {
      this.isImgPath = true
      this.modalForm.validateFields((err, values) => {
        console.log(values)
        if (!err) {
          if (!this.picturePath) {
            this.isImgPath = false
          } else {
            // 发送请求
            let data = {
              productName: values.productName, // '产品名称',
              productCategoryCode: values.productCategoryCode, // '品类id',
              productBreedCode: values.productBreedCode, // '品种id',
              productionCompany: values.productionCompany, // '生产企业',
              provinceCode: values.baseAddress[0], // '省份code',
              cityCode: values.baseAddress[1], // '市code',
              areaCode: values.baseAddress[2], // '区县code',
              townCode: values.baseAddress[3], // '乡镇code'
              address: values.address, // '地址(某某村)'
              productionDate: this.productionDate, // '2019-11-05', // 生产日期
              expiryTime: values.expiryTime, // '保质期',
              price: values.price, // 单价
              phone: values.phone, // 联系方式
              priceUnitName: '元',
              productPicture: this.picturePath // '产品图片',
            }
            if (this.isEdit) {
              // 编辑溯源
              if (this.isEditObj.productId) {
                data.productId = this.isEditObj.productId
              } else {
                this.$message.error('主键ID为空无法编辑！')
                return
              }
              editTracesource(data)
                .then(src => {
                  if (src.success === 'Y') {
                    this.$emit('handleCloseModal', false)
                    this.$message.success(src.message)
                    let data = {
                      pageNo: 1,
                      pageSize: 10
                    }
                    this.$parent.getList(data)
                  } else {
                    this.$message.error(src.message)
                  }
                })
            } else {
              // 新建溯源
              tracesource(data)
                .then(src => {
                  if (src.success === 'Y') {
                    this.$emit('handleCloseModal', false)
                    let data = {
                      pageNo: 1,
                      pageSize: 10
                    }
                    this.$parent.getList(data)
                    this.$message.success(src.message)
                  } else {
                    this.$message.error(src.message)
                  }
                })
            }
          }
        }
      })
    },
    // 取消事件
    handleModalCancel() {
      this.$emit('handleCloseModal', false)
    }
  }
}
</script>

<style lang="less" scoped>
  /deep/ .ant-form-explain{
    float: left;
  }
.form-fields {
  .row-col {
    // display: flex;
  }
}
</style>
