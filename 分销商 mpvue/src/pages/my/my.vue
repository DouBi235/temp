<template>
  <div class="pageMain">
    <div class="headbox fcsbc bg-blue">
      <img class="headImg" src="https://pic.cnblogs.com/face/1441130/20180713142956.png" alt>
      <span class="headName">学研</span>
      <div class="headCode frcc" @click="copy">
        <span>推广码</span>
        <span v-for="(item,index) in code" :key="index">{{item}}</span>
        <span>点击复制</span>
      </div>
    </div>
    <div class="gridBox">
      <div class="gridItem fccc" @click="nav1">
        <img src="../../../static/images/geren.png" alt>
        <span>个人信息</span>
      </div>
      <div class="gridItem fccc" @click="nav2">
        <img src="../../../static/images/wangqi.png" alt>
        <span>往期收入</span>
      </div>
      <div class="gridItem fccc" @click="nav3">
        <img src="../../../static/images/hezuo.png" alt>
        <span>合作协议</span>
      </div>
      <div class="gridItem fccc" @click="nav4">
        <img src="../../../static/images/fuwu.png" alt>
        <span>服务区域</span>
      </div>
      <div class="gridItem fccc" @click="nav5">
        <img src="../../../static/images/wenti.png" alt>
        <span>问题反馈</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    code() {
      return this.globalData.promo_code;
    }
  },
  methods: {
    // 个人信息
    nav1() {
      wx.navigateTo({
        url: "../personalInfo/main"
      });
    },
    // 往期收入
    nav2() {
      wx.navigateTo({
        url: "../historyIncome/main"
      });
    },
    // 合作协议
    nav3() {
      // wx.navigateTo({
      //   url: "../isActivate/main"
      // });
    },
    // 服务区域
    nav4() {
      wx.navigateTo({
        url: "../serveAddr/main"
      });
    },
    // 问题反馈
    nav5() {
      wx.navigateTo({
        url: "../feedback/main"
      });
    },
    copy() {
      wx.setClipboardData({
        data: this.code,
        success: function(res) {
          wx.getClipboardData({
            success: function(res) {
              wx.showToast({
                title: "复制成功"
              });
            }
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
  background: #f5f5fa;
}
.headbox {
  width: 375px;
  height: 180px;
  padding-top: 25px;
  padding-bottom: 10px;
  .headImg {
    width: 80px;
    height: 80px;
    border: 2px solid rgba(255, 255, 255, 1);
    border-radius: 50%;
  }
  .headName {
    width: 34px;
    height: 22px;
    font-size: 16px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 22px;
    margin-bottom: 3px;
  }
  .headCode {
    width: 270px;
    height: 28px;
    background: rgba(30, 160, 255, 1);
    border-radius: 14px;
    opacity: 0.9;
    border: 1px solid rgba(120, 200, 255, 1);
    span {
      width: 14px;
      height: 14px;
      font-size: 12px;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      line-height: 14px;
      border-right: 1px solid #6fc4ff;
      text-align: center;
      &:first-child {
        border: none;
        width: auto;
        margin-right: 10px;
      }
      &:nth-child(2) {
        border-left: 1px solid #6fc4ff;
      }
      &:last-child {
        border: none;
        width: auto;
        margin-left: 10px;
      }
    }
  }
}
.gridBox {
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  .gridItem {
    height: 125px;
    width: 125px;
    font-size: 12px;
    font-weight: 400;
    color: rgba(30, 35, 40, 1);
    line-height: 17px;
    border-right: 1px solid #e6e6eb;
    border-bottom: 1px solid #e6e6eb;
    img {
      height: 44px;
      width: 44px;
      margin-bottom: 4px;
    }
  }
}
</style>
 

