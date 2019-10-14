<template>
  <div class="Root">
    <div class="sider">
      <SideMenu></SideMenu>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { SideMenu } from '@/components'
export default {
  name: 'Root',
  components: { SideMenu }
}
</script>
<style lang="less" scoped>
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
