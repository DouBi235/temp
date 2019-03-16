<template>
  <div class="addrpage">
    <div class="serveList">
      <div class="listItem fcsbc" v-for="(item,index) in serveList" :key="index">
        <p class="addrname">{{item.name}}</p>
        <div class="linebar"></div>
        <p class="bottom">区县：{{item.size}}个</p>
        <!-- "is_cooperation": 0-审核中 1-合作中 2-已取消 3-驳回 -->
        <p class="bottom">取消区域申请审核中...</p>
        <p class="bottom" v-if="is_cooperation == 3">请重新编辑提交</p>
        <img src="../../../static/images/auditing.png" v-if="is_cooperation == 1" alt>
        <img src="../../../static/images/auditno.png" v-if="is_cooperation == 3" alt>
      </div>
      <div class="emptybox">
        <p class="jia">+</p>
        <p class="text">新增区域</p>
      </div>
    </div>
  </div>
</template>
<script>
import emptyList from "@/components/empty";
export default {
  data() {
    return {
      serveList: []
    };
  },
  components: {
    emptyList
  },
  computed: {},
  methods: {
    // 获取未列表
    getweishen: function() {
      this.$fly
        .request({
          method: "post",
          url: "/fx/Info/serverArea"
        })
        .then(res => {
          if (res.code == 1) {
            this.serveList = res.data;
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
    this.getweishen();
  },
  created() {},
  onReachBottom() {}
};
</script>

<style lang="scss" scoped>
.addrpage {
  min-height: 100vh;
  background: #f5f5fa;
  .serveList {
    width: 375px;
    padding: 10px;
    min-height: 100vh;
    .listItem {
      width: 355px;
      height: 100px;
      padding: 23px 0 18px;
      background: rgba(255, 211, 82, 1);
      border-radius: 5px;
      margin-bottom: 10px;
      position: relative;
      // 这是为了
      img {
        width: 71px;
        height: 71px;
        position: absolute;
        right: 10px;
        top: 10px;
      }
      .addrname {
        font-size: 20px;
        font-weight: 600;
        color: #7d5f0a;
        line-height: 28px;
      }
      .linebar {
        height: 1px;
        width: 200px;
        background: #d3ac3a;
      }
      .bottom {
        font-size: 12px;
        font-weight: 400;
        color: #7d5f0a;
        line-height: 17px;
      }
    }
  }
  .emptybox {
    width: 355px;
    height: 80px;
    background: #fff;
    p {
      text-align: center;
    }
    .jia {
      font-size: 50px;
      height: 55px;
      color: #c8c8d2;
    }
    .text {
      font-size: 10px;
      font-weight: 400;
      color: rgba(200, 200, 210, 1);
      line-height: 14px;
    }
  }
}
</style>
