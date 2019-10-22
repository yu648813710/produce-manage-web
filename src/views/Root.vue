<template>
  <div class="Root">
    <div class="sider">
      <SideMenu></SideMenu>
    </div>
    <!-- <div class="loadingContent" v-show="loading">
      <a-spin :spinning="loading" size="large" />
    </div> -->
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { SideMenu } from '@/components'
import Vue from 'vue'
import {Spin} from 'ant-design-vue'
Vue.use(Spin)
import { mapState, mapActions, mapMutations, } from 'vuex'
export default {
  name: 'Root',
  components: { SideMenu },
    computed: {
        ...mapState(['loading'])
    },
}
</script>
<style lang="less" scoped>
  .loadingContent{
    position: absolute;
    height: 100%;
    width: calc( 100% - 240px );
    right: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    background-color: rgba(0,0,0,0.1);
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
