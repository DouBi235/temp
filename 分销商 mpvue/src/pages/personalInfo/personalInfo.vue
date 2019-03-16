<template>
  <div class="personal">
    <div class="panel" style="margin-bottom: 10px;">
      <div class="infobar frsbc" style="height: 68px;">
        <span class="label">头像</span>
        <img :src="basedata.head_pic" alt>
      </div>
    </div>
    <div class="panel">
      <div class="infobar frsbc">
        <span class="label">姓名</span>
        <span class="textin">{{basedata.name}}</span>
      </div>
      <div class="infobar frsbc">
        <span class="label">电话</span>
        <span class="textin">{{basedata.phone}}</span>
      </div>
    </div>
    <receive-addr
      @shengc="shengc"
      :shengl="shengl"
      :shengi="shengi"
      @shic="shic"
      :shil="shil"
      :shii="shii"
      @xianc="xianc"
      :xianl="xianl"
      :xiani="xiani"
      @textc="textc"
    ></receive-addr>
    <revenue-account
      :cardName="cardName"
      @pickerChange="pickerChange"
      :bankList="bankList"
      :bankIndex="bankIndex"
      :cardType="cardType"
      :account="account"
    ></revenue-account>
    <div class="btnbox">
      <i-button bind:click="handleClick" type="primary">确认修改</i-button>
    </div>
  </div>
</template>
<script>
import receiveAddr from "@/components/receiveAddr.vue";
import revenueAccount from "@/components/revenueAccount";
export default {
  data() {
    return {
      cardName: "",
      cardType: "",
      account: "",
      basedata: "",

      shengl: [],
      shengi: "",
      shengid: "",
      shengname: "",
      shil: [],
      shii: "",
      shiid: "",
      shiname: "",
      xianl: [],
      xiani: "",
      xianid: "",
      xianname: "",
      textarea: ""
    };
  },
  methods: {
    // 选择收货省
    shengc(e) {
      this.shengi = e.mp.detail.value;
      for (let i = 0; i < this.shengl.length; i++) {
        if (i == this.shengi) {
          this.shengid = this.shengl[i].id;
          this.shengname = this.shengl[i].name;
        }
      }
      this.getshi();
    },
    // 选择收货市区
    shic(e) {
      this.shii = e.mp.detail.value;
      for (let i = 0; i < this.shil.length; i++) {
        if (i == this.shii) {
          this.shiid = this.shil[i].id;
          this.shiname = this.shil[i].name;
        }
      }
      this.getxian();
    },
    // 选择收货区县
    xianc(e) {
      this.xiani = e.mp.detail.value;
      for (let i = 0; i < this.xianl.length; i++) {
        if (i == this.xiani) {
          this.xianid = this.xianl[i].id;
          this.xianname = this.xianl[i].name;
        }
      }
    },
    // 收货地址详情输入
    textc(e) {
      this.textarea = e.mp.detail.detail.value;
    },
    // 获取收货省
    getpro() {
      this.$fly
        .request({
          method: "post",
          url: "/fx/FillUp/Province"
        })
        .then(res => {
          if (res.code == 1) {
            this.shengl = res.data;
          } else {
            wx.showToast({
              title: res.msg,
              icon: "none",
              duration: 1500
            });
          }
        });
    },
    // 获取收货市区
    getshi() {
      this.$fly
        .request({
          method: "post",
          url: "/fx/FillUp/City",
          body: {
            pid: this.shengid
          }
        })
        .then(res => {
          if (res.code == 1) {
            this.shil = res.data;
          } else {
            wx.showToast({
              title: res.msg,
              icon: "none",
              duration: 1500
            });
          }
        });
    },
    // 获取收货区县
    getxian() {
      this.$fly
        .request({
          method: "post",
          url: "/fx/FillUp/City",
          body: {
            pid: this.shiid
          }
        })
        .then(res => {
          if (res.code == 1) {
            this.xianl = res.data;
          } else {
            wx.showToast({
              title: res.msg,
              icon: "none",
              duration: 1500
            });
          }
        });
    },
    getbasedata() {
      this.$fly
        .request({
          method: "post",
          url: "/fx/Info/getBrand"
        })
        .then(res => {
          if (res.name) {
            this.basedata = res;
          } else {
            wx.showToast({
              title: "获取失败",
              icon: "none",
              duration: 1500
            });
          }
        });
    }
  },
  components: {
    receiveAddr,
    revenueAccount
  },
  onShow() {
    this.getpro();
    this.getbasedata();
  }
};
</script>
<style lang="scss" scoped>
.personal {
  min-height: 100vh;
  background: #f5f5fa;
  padding-bottom: 50px;
  .panel {
    background: #fff;
    padding-left: 15px;
    .infobar {
      min-height: 55px;
      padding-right: 15px;
      width: 360px;
      border-bottom: 1px solid #e6e6eb;
      font-size: 16px;
      font-weight: 400;
      color: rgba(30, 35, 40, 1);
      line-height: 22px;
      img {
        width: 52px;
        height: 52px;
        border-radius: 50%;
      }
    }
  }
  .btnbox {
    width: 300px;
    margin: 50px auto;
  }
}
</style>



