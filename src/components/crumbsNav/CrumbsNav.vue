<!--面包屑组件-->
<template>
  <div>
    <a-breadcrumb style="text-align: left; height: 40px">
      <a-breadcrumb-item v-for="(item, index) in crumbsArr" :key="index">
        <span
          :class="item.back ? 'backToPath' : ''"
          @click="backToList(item.back,item.path)"
        >{{ item.name }}</span>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script>
import Vue from 'vue'
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
  methods: {
    backToList (back, router) {
      if (back) {
        this.$router.push({ path: router })
      }
    }
  }
}
</script>

<style scoped lang="less">
.backToPath {
  cursor: pointer;
}
.backToPath:hover {
  color: #1890ff;
}
</style>
