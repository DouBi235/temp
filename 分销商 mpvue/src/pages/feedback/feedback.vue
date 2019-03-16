<template>
  <div class="pageMain">
    <textarea placeholder="输入反馈内容..." v-model="text"></textarea>
    <div class="btnbox">
      <i-button @click="handleClick" type="primary">提交</i-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      text: ""
    };
  },
  components: {},
  computed: {},
  methods: {
    handleClick() {
      this.$fly
        .request({
          method: "post",
          url: "/fx/Info/cancel",
          body: {
            reason: this.text,
            id: 1
          }
        })
        .then(res => {
          if (res.code == 1) {
            wx.showToast({
              title: res.msg,
              duration: 1500
            });
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              });
            }, 1500);
          } else {
            wx.showToast({
              title: res.msg,
              icon: "none",
              duration: 1500
            });
          }
        });
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.pageMain {
  min-height: 100vh;
  background: #fff;
  textarea {
    padding-top: 10px;
    margin: 0 15px;
    width: 345px;
    height: 300px;
  }
  .btnbox {
    width: 300px;
    margin: 0 auto;
    margin-top: 100px;
  }
}
</style>
 

