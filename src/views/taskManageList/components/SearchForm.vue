<template>
  <div>
    <div class="form">
      <!-- 搜索条件 -->
      <div class="search-box" :style="!upDownStatue?'':'height:86px'">
        <a-row :gutter="40">
          <template v-for="(item,index) in searchFormData">
            <a-col v-if="index<3" :span="8" :key="index">
              <a-form-item
                :label="item.label"
                :label-col="{ span: 24 }"
                :wrapper-col="{ span: 24 }"
              >
                <a-input
                  autocomplete="off"
                  v-if="item.type==='input'"
                  :placeholder="item.placeholder"
                  v-model="item.data"
                ></a-input>
                <a-select
                  v-if="item.type==='select'"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  :getPopupContainer="positonFn"
                  v-model="item.data"
                >
                  <a-select-option
                    v-for="(selectItem,key,index) in item.selectData"
                    :key="index"
                    :value="selectItem"
                  >{{key}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </template>
        </a-row>
        <a-row :gutter="40">
          <template v-for="(item,index) in searchFormData">
            <a-col v-if="index>2" :span="8" :key="index">
              <a-form-item
                :label="item.label"
                :label-col="{ span: 24 }"
                :wrapper-col="{ span: 24 }"
              >
                <a-select
                  v-if="item.type==='select'"
                  :placeholder="item.placeholder"
                  v-model="item.data"
                  :getPopupContainer="positonFn"
                  style="width:100%"
                >
                  <a-select-option
                    v-for="(selectItem,key,index) in item.selectData"
                    :key="index"
                    :value="selectItem"
                  >{{key}}</a-select-option>
                </a-select>
                <a-input
                  autocomplete="off"
                  v-if="item.type==='input'"
                  :placeholder="item.placeholder"
                  v-model="item.data"
                ></a-input>
              </a-form-item>
            </a-col>
          </template>
        </a-row>
      </div>
      <a-row>
        <a-col :span="24" :style="{ textAlign: 'center' }">
          <a-button type="primary" html-type="submit" @click="searchTask">查询</a-button>
          <a-button :style="{ marginLeft: '8px' }" @click="clearSearch">重置</a-button>
          <a-button :style="{ marginLeft: '8px' }" @click="upDownStatue=!upDownStatue">
            <a-icon :type="!upDownStatue ? 'up' : 'down'" />
            {{!upDownStatue ? '收起' : '展开'}}
          </a-button>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      upDownStatue: true,
      // 搜索项表单
      searchForm: {
        farmingNum: '', // 计划编号
        actionName: '', // 农事操作
        farmingTypeName: '', // 农事类型
        taskStatus: undefined, // 状态
        blockLandName: '', // 地块名称
        cycleName: '' // 周期名称
      },
      searchFormData: [
        {
          type: 'input',
          label: '农事计划编号',
          placeholder: '请输入',
          data: null
        },
        {
          type: 'input',
          label: '农事操作',
          placeholder: '请输入',
          data: null
        },
        {
          type: 'input',
          label: '农事类型',
          placeholder: '请输入',
          data: null
        },
        {
          type: 'select',
          label: '状态',
          placeholder: '请选择',
          data: undefined,
          selectData: null
        },
        {
          type: 'input',
          label: '所属地块',
          placeholder: '请输入',
          data: null
        },
        {
          type: 'input',
          label: '所属周期',
          placeholder: '请输入',
          data: null
        }
      ]
    }
  },
  props: {
    selectData: {
      tyep: Array,
      default: [],
      required: true
    }
  },
  watch: {
    selectData(val) {
      this.searchFormData[3].selectData = this.selectData
    }
  },
  methods: {
    clearSearch() {
      this.searchFormData.map(res => {
        if (res.type === 'select') {
          res.data = undefined
        } else {
          res.data = ''
        }
      })
      console.log(this.searchFormData)
      this.searchForm = {
        farmingNum: '', // 计划编号
        actionName: '', // 农事操作
        farmingTypeName: '', // 农事类型
        taskStatus: undefined, // 状态
        blockLandName: '', // 地块名称
        cycleName: '' // 周期名称
      }
      this.$emit('clearSearch', this.searchForm)
    },
    searchTask() {
      this.searchForm.farmingNum = this.searchFormData[0].data
      this.searchForm.actionName = this.searchFormData[1].data
      this.searchForm.farmingTypeName = this.searchFormData[2].data
      this.searchForm.taskStatus = this.searchFormData[3].data
      this.searchForm.blockLandName = this.searchFormData[4].data
      this.searchForm.cycleName = this.searchFormData[5].data
      this.$emit('searchTask', this.searchForm)
    },
    positonFn(e) {
      return document.querySelectorAll('.form')[0]
    }
  }
}
</script>
<style lang="less" scoped>
.form {
  border-radius: 4px;
  background-color: white;
  padding: 27px 15px 21px 15px;
  position: relative;
  .search-box {
    height: auto;
    overflow: hidden;
  }
}
</style>
