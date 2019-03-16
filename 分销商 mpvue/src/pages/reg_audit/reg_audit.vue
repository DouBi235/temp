<template>
  <div class="pageMain">
    <div class="bluebg">
      <div class="inblue">
        <span class="tip">您的信息已提交审核</span>
        <span class="addr">河北省石家庄市</span>
      </div>
    </div>
    <span class="auditing">审核中...</span>
    <div class="bottom">
      <i-button @click="ok" :disabled="disnext" type="primary">好的</i-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      addrname: ""
    };
  },
  computed: {},
  methods: {
    getaddr() {
      this.$fly
        .request({
          method: "post",
          url: "/fx/Audit/lastArea"
        })
        .then(res => {
          if (res.code == 1) {
            that.addrname = res.data;
          }
        });
    },
    ok() {
      wx.reLaunch({
        url: "../reg_audit/main"
      });
    }
  },
  onShow() {
    this.getaddr();
  },
  created() {}
};
</script>

<style lang="scss" scoped>
span {
  display: block;
}
.pageMain {
  min-height: 100vh;
  background: #f5f5fa;
  .bluebg {
    width: 375px;
    height: 402px;
    background-image: url("../../../static/images/shehe.svg");
    background-size: 375px 402px;
    background-repeat: no-repeat;
    padding-top: 70px;
    .addr {
      font-size: 22px;
      font-weight: 400;
      line-height: 22px;
      margin-top: 8px;
    }
  }
  .inblue {
    color: #fff;
    font-size: 25px;
    font-weight: 600;
    line-height: 36px;
    text-align: center;
  }
  .auditing {
    font-size: 16px;
    font-weight: 400;
    color: rgba(30, 35, 40, 1);
    line-height: 22px;
    text-align: center;
    margin: 32px auto;
  }
  .bottom {
    width: 300px;
    margin: 30px auto;
  }
}
</style>
 

