<template>
  <div class="comMain">
    <div class="itemper" v-for="(item,index) in list" :key="index" @click="nav">
      <div class="itemtop frsbc">
        <span>订单编号：{{item.order_number}}</span>
        <span>{{item.create_time}}</span>
      </div>
      <div class="itemcenter frsbc">
        <div>
          <span class="applytitle">{{item.name}}</span>
          <div class="frsbfs" style="margin-top: 10px;justify-content: flex-start;">
            <p>地址：</p>
            <p style="width: 210px;">{{item.address}}</p>
          </div>
          <p style="margin-top: 6px;">电话：{{item.phone}}</p>
        </div>
        <div style="height: 40px; width: 1px;background: #E6E6EB;"></div>
        <div class="fccc" @click="callto">
          <img style="width:40px;height:40px;" src="../../static/images/call.png" alt>
          <p style="font-size:10px;line-height:14px;">联系车主</p>
        </div>
      </div>
      <div class="bottombtn frcc" v-if="item.order_number">
        <div class="confirmbtn">确认发货</div>
      </div>
      <div class="bottomdate" v-if="item.order_number"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["list"],
  methods: {
    nav(e) {
      this.$emit("detail", {
        id: e.mp.currentTarget.dataset.id
      });
    },
    callto() {
      console.log(this.list.phone);
      wx.makePhoneCall({
        phoneNumber: this.list.phone + ""
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.comMain {
  padding-top: 10px;
  background: #f5f5fa;
  .itemper {
    background: #fff;
    margin-bottom: 10px;
    padding-left: 15px;
    .itemtop {
      width: 365px;
      height: 44px;
      padding-right: 15px;
      font-size: 12px;
      font-weight: 400;
      color: rgba(30, 35, 40, 1);
      line-height: 44px;
    }
    .itemcenter {
      border-bottom: 1px solid #e6e6eb;
      padding: 15px 15px 10px 0;
      .applytitle {
        font-size: 16px;
        font-weight: 400;
        color: rgba(30, 35, 40, 1);
        line-height: 22px;
      }
      p {
        font-size: 14px;
        font-weight: 400;
        color: rgba(115, 115, 125, 1);
        line-height: 20px;
        span {
          font-size: 25px;
          display: inline-block;
          margin-right: 5px;
          margin-top: 10px;
          font-weight: 700;

          color: rgba(30, 159, 253, 1);
          line-height: 29px;
        }
      }
      img {
        width: 345px;
        height: 160px;
        margin-top: 10px;
      }
      .viewimg {
        font-size: 10px;
        text-align: center;
        line-height: 14px;

        color: rgba(115, 115, 125, 1);
      }
    }
    .bottombtn {
      width: 375px;
      height: 60px;
      padding-right: 15px;
      .confirmbtn {
        width: 180px;
        height: 36px;
        background: rgba(30, 160, 255, 1);
        border-radius: 18px;
        font-size: 14px;
        text-align: center;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 36px;
      }
    }
    .bottomdate {
      width: 375px;
      height: 42px;
      font-size: 12px;
      font-weight: 400;
      color: rgba(150, 155, 165, 1);
      padding-right: 15px;
      line-height: 42px;
    }
  }
}
</style>
