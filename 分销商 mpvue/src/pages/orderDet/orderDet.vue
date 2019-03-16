<template>
  <div class="pageMain">
    <img src="../../../static/images/orderDet.png" alt>
    <span class="money">{{data.money}}</span>
    <div class="box">
      <p class="frsbfs">
        <span class="label">车主</span>
        <span class="value">{{data.name}}</span>
      </p>
      <p class="frsbfs">
        <span class="label">地址</span>
        <span class="value">{{data.address}}</span>
      </p>
      <p class="frsbfs">
        <span class="label">车牌号</span>
        <span class="value">{{data.plate}}</span>
      </p>
      <p class="frsbfs">
        <span class="label">车型</span>
        <span class="value">{{data.type}}</span>
      </p>
      <p class="frsbfs">
        <span class="label">排量</span>
        <span class="value">{{data.series}}</span>
      </p>
      <p class="frsbfs">
        <span class="label">到账时间</span>
        <span class="value">{{data.audit_time}}</span>
      </p>
    </div>
    <div class="box">
      <p class="frsbfs">
        <span class="label">收款方式</span>
        <span class="value">账户余额</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: ""
    };
  },
  components: {},
  computed: {},
  methods: {
    getdata() {
      this.$fly
        .request({
          method: "post",
          url: "/fx/Income/FacDetails",
          body: {
            order_id: this.$opt().id,
            status: 1 // 1代表用户
          }
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
    this.getdata();
  }
};
</script>

<style lang="scss" scoped>
.pageMain {
  min-height: 100vh;
  background: #fff;
  img {
    margin: 0 auto;
    width: 80px;
    height: 80px;
    display: block;
  }
  .money {
    margin: 0 auto 28px;
    font-size: 30px;
    font-weight: 700;
    color: rgba(30, 35, 40, 1);
    display: block;
    line-height: 34px;
    text-align: center;
  }
  .box {
    width: 335px;
    margin: 0 20px;
    border-top: 1px solid #e6e6eb;
    padding-top: 5px;
    padding-bottom: 5px;
    p {
      margin: 9px 0;
      min-height: 20px;
      .label {
        font-size: 14px;
        font-weight: 400;
        color: rgba(115, 115, 125, 1);
        line-height: 20px;
      }
      .value {
        width: 150px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(30, 35, 40, 1);
        line-height: 20px;
        text-align: right;
      }
    }
  }
}
</style>
 

