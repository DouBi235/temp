<template>
  <div>
    <!-- 消息-消息详情 -->
    <div class="detMian" v-if="detType === 1">
      <p>{{base.title}}</p>
      <i-load-more v-if="base.type == 1||base.type == 2" :tip="base.time" loading="false"/>
      <p v-if="base.type == 3">{{base.time}}</p>
      <div v-if="base.type == 1||base.type == 2">{{base.content}}</div>
      <div v-if="base.type == 3">{{base.content}}</div>
    </div>
    <!-- 注册-驳回详情 -->
    <div class="detMian" v-if="detType === 2">
      <p>{{base.title}}</p>
      <i-load-more :tip="base.time" loading="false"/>
      <div>{{base.content}}</div>
    </div>
    <!-- 我的区域-取消理由 -->
    <div class="detMian" v-if="detType === 3">
      <p>{{base.title}}</p>
      <i-load-more :tip="base.time" loading="false"/>
      <div>{{base.content}}</div>
    </div>
    <!-- 取消区域-驳回理由 -->
    <div class="detMian" v-if="detType === 4">
      <p>{{base.title}}</p>
      <i-load-more :tip="base.time" loading="false"/>
      <div>{{base.content}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    detType() {
      return this.$opt().type;
    },
    itemid() {
      return this.$opt().id;
    }
  },
  components: {},
  methods: {
    // 消息-消息详情
    getbasedata1(e) {
      this.$fly
        .request({
          method: "post",
          url: "/fx/Msgs/logDetails",
          body: { id: this.itemid }
        })
        .then(res => {
          if (res.code == 1) {
            this.data = res.data;
          } else {
            wx.showToast({
              title: res.msg,
              icon: "none",
              duration: 1500
            });
          }
        });
    },
    // 注册-驳回详情
    getbasedata2(e) {
      this.$fly
        .request({
          method: "post",
          url: "/fx/Income/FacDetails",
          body: { id: this.itemid }
        })
        .then(res => {
          if (res.code == 1) {
            this.data = res.data;
          } else {
            wx.showToast({
              title: res.msg,
              icon: "none",
              duration: 1500
            });
          }
        });
    },
    //  我的区域-取消理由
    getbasedata3(e) {
      this.$fly
        .request({
          method: "post",
          url: "/fx/Income/FacDetails",
          body: { id: this.itemid }
        })
        .then(res => {
          if (res.code == 1) {
            this.data = res.data;
          } else {
            wx.showToast({
              title: res.msg,
              icon: "none",
              duration: 1500
            });
          }
        });
    },
    // 取消区域-驳回理由
    getbasedata4(e) {
      this.$fly
        .request({
          method: "post",
          url: "/fx/Income/FacDetails",
          body: { id: this.itemid }
        })
        .then(res => {
          if (res.code == 1) {
            this.data = res.data;
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
  onShow() {
    if (this.detType === 1) this.getbasedata1();
    else if (this.detType === 2) this.getbasedata2();
    else if (this.detType === 3) this.getbasedata3();
    else if (this.detType === 4) this.getbasedata4();
  }
};
</script>

<style lang="scss" scoped>
.detMian {
  min-height: 100vh;
  width: 375px;
  overflow-y: scroll;
  
}
</style>


