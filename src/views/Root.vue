<template>
  <div class="Root">
    <div class="sider">
      <SideMenu></SideMenu>
    </div>
    <div
      class="loadingContent"
      v-show="loading"
    >
      <a-spin
        :spinning="loading"
        size="large"
      />
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
    <div class="copy-btm">
      <span class="copy-right" @click="copyRightClick">陕ICP备19021305号-1</span>
    </div>
  </div>
</template>

<script>
import { SideMenu } from '@/components'
import Vue from 'vue'
import { Spin } from 'ant-design-vue'
import { mapState } from 'vuex' // mapActions, mapMutations
Vue.use(Spin)
export default {
  name: 'Root',
  data () {
    return {
      success: 'success'
    }
  },
  mounted () {
    /**
     * description: 全局提示配置项
     * params: top(距离顶部距离)、maxCount(提示最大可展示*个)、duration(关闭时间)
     */
    this.$message.config({
      top: ``,
      duration: 2,
      maxCount: 1
    })
  },
  components: { SideMenu },
  computed: {
    ...mapState(['loading'])
  },
  methods: {
    copyRightClick () {
      // 备案号: 陕ICP备19021305号-1
      window.open('http://www.beian.miit.gov.cn')
    }
  }
}
</script>
<style lang="less" scoped>
.loadingContent {
  position: absolute;
  height: 100%;
  width: calc(100% - 240px);
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.1);
}

.alertContent {
  position: absolute;
  width: calc(100% - 240px);
  padding: 16px;
  right: 0;
  top: 0;
  z-index: 999;
}

.Root {
  display: flex;
  height: 100%;
  overflow: hidden;
  background-color: #eee !important;
  .sider {
    width: 240px;
    height: 100%;
    overflow: auto;
    text-align: left;
    background-color: #001529;
  }
  .content {
    flex: 1;
    height: 100%;
    overflow: auto;
  }
  .copy-btm {
    height: 30px;
    line-height: 30px;
    width: calc(100% - 240px);
    position: fixed;
    bottom: 0;
    right: 0;
    background-color: #eee;
    z-index: 999;
  }
  .copy-right {
    cursor: pointer;
    line-height: 100%;
    color: #a1a1a1;
    font-size: 12px;
  }
}
</style>
