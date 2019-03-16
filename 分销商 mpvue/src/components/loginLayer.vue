<template>
  <div class="layerBox fccc">
    <div class="layerMain fcsbc">
      <!-- <img class="close" src="./../../static/images/layerClose.png" alt> -->
      <img class="headImg" src="../../static/images/ren.png" alt>
      <span class="appname col-blue">分销商管理系统</span>
      <i-button
        @getuserinfo="clickLogin"
        type="primary"
        open-type="getUserInfo"
        size="default"
        style="width: 250px;"
      >登录</i-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    clickLogin() {
      this.$emit("login");
    }
  }
};
</script>
<style lang="scss" scoped>
.layerBox {
  height: 100vh;
  width: 100vw;
  background: rgba(55, 55, 55, 0.5);
  position: absolute;
  z-index: 999;
  top: 0;
  .layerMain {
    width: 300px;
    height: 360px;
    background: #fff;
    border-radius: 5px;
    padding: 70px 0 50px;
    position: relative;
    .close {
      position: absolute;
      right: 0;
      top: 0;
      width: 36px;
      height: 36px;
    }
    .headImg {
      width: 120px;
      height: 120px;
      border-radius: 50px;
    }
    appname {
      width: 138px;
      height: 28px;
      font-size: 20px;
      font-weight: 400;
      color: rgba(30, 159, 253, 1);
      line-height: 28px;
    }
  }
}
</style>
