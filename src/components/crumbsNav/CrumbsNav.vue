<!--面包屑组件-->
<template>
  <div>
    <a-breadcrumb style="text-align: left; height: 18px;line-height: 18px;">
      <div class="backToPath backBtnCtr">
        <span v-for="(item, index) in crumbsArr" :key="index" @click="backToList(item)">
          <a-icon v-if="item.back" type="left" />
          <span v-if="item.back" class="backText">返回</span>
        </span>
      </div>
      <span>当前位置：</span>
      <a-breadcrumb-item v-for="(item, index) in crumbsArr" :key="index">
        <span
          :class="item.back ? 'backToPath' : ''"
          @click="backToList(item)"
        >{{ item.name }}</span>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script>
import Vue from 'vue'
import backIcon from '@/assets/image/backIcon.png'
// import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { Breadcrumb } from 'ant-design-vue'

Vue.use(Breadcrumb)
export default {
  name: 'crumbsNav',
  props: {
    /**
     * 面包屑数组
     * params: crumbsArr
     * demo: crumbsArr:[{name: 'name', back: false, path: 'path'}]
     * name: 面包屑名称、back: 是否可点击返回、path:返回至页面路由
     * */
    crumbsArr: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      backIcon
    }
  },
  methods: {
    backToList(item) {
      console.log('back-item:', item)
      if (item.back) {
        this.$router.push({ path: item.path })
      }
    }
  }
}
</script>

<style scoped lang="less">
  .crumpContent {
    text-align: left;
    height: 30px;
    position: relative;
    /*padding-left: 20px;*/
  }
  .backImg{
    height: 16px;
    margin-bottom: 3px;
    margin-right: 3px;
  }
  .backText{
    display: inline-block;
    width: 35px;
  }

  .backToPath {
    cursor: pointer;
  }

  .backBtnCtr {
    display: inline-block;
  }

  .backBtn {
    display: inline-block;
  }

  .backToPath:hover {
    color: #1890ff;
  }
</style>
