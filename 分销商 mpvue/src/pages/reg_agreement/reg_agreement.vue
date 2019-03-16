<template>
  <div class="pageMain">
    <p class="agreename">分销商合作协议</p>
    <i-load-more :loading="loading"/>
    <!-- <i-button @click="downDoc" type="ghost">下载文档</i-button> -->
    <div class="docBox">

    </div>
    <div class="bottom">
      <div class="frcc">
        <i-radio value="我已阅读，并承认其法律效益" :checked="checked" @change="change"></i-radio>
      </div>
      <div style="width: 300px;margin: 0 auto;">
        <i-button @click="next" :disabled="disabled" type="primary" style="width: 250px;">下一步</i-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checked: true,
      loading: false
    };
  },
  computed: {
    disabled() {
      return !this.checked;
    }
  },
  methods: {
    change(e) { 
      this.checked = e.mp.detail.current;
    },
    next() {
      wx.redirectTo({
        url: "../reg_info/main"
      });
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.pageMain {
  min-height: 100vh;
  background: #ffffff;
  padding-top: 20px;
  .agreename {
    font-size: 20px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(30, 35, 40, 1);
    line-height: 28px;
    text-align: center;
  }
  .docBox {
    width: 330px;
    height: 360px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(115, 115, 125, 1);
    line-height: 26px;
    margin: 0 auto;
    overflow-y: scroll;
  }
  .bottom {
    position: fixed;
    bottom: 0;
    width: 100vw;
  }
}
</style>
 

