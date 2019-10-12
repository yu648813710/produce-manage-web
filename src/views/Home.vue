<template>
  <div class="home">
    <p class="title">欢迎进入柞水木耳信息平台</p>
    <div class="img">
      <img
        src="@/assets/image/welcome-img.png"
        alt
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home'
}
</script>
<style lang="less" scoped>
.home {
  background: #fff;
  margin-left: 24px;
  min-height: 100vh;
  overflow: hidden;
}
.title {
  margin: 88px 0;
  color: #333;
  font-size: 26px;
  line-height: 37px;
}
</style>
