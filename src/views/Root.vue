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
  data() {
    return {
      success: 'success'
    }
  },
  mounted() {
    /**
     * description: 全局提示配置项
     * params: top(距离顶部距离)、maxCount(提示最大可展示*个)、duration(关闭时间)
     */
    this.$message.config({
      top: ``,
      duration: 2,
      maxCount: 3
    })
  },
  components: { SideMenu },
  computed: {
    ...mapState(['loading'])
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
}
</style>
