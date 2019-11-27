<template>
  <a-locale-provider :locale="zhCN">
    <div id="app">
      <router-view />
    </div>
  </a-locale-provider>
</template>
<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
export default {
  data() {
    return {
      zhCN
    }
  }
}
</script>
<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.ant-table-placeholder {
  background: url('./assets/image/noData.png') no-repeat !important;
  background-size: 172px !important;
  height: 172px;
  background-position: top !important;
  line-height: 230px;
  margin-top: 30px;
}
.ant-empty-image {
  display: none;
}
.ant-empty-description {
  margin-top: 100px;
}
.ant-layout {
  background: none !important;
}
</style>
