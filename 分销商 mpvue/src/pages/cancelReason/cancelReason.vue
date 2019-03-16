<template>
  <div class="pageMain">
    <textarea placeholder="输入驳回理由" v-model="text"></textarea>
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
          url: "/fx/Income/FacDetails",
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
    margin: 10px 15px;
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
 

