<template>
  <div class="pageMain">
    <div class="detmain">
      <div class="applydet">
        <div class="applyitem frsbc">
          <div>
            <span class="applytitle">{{data.name}}</span>
            <div class="frsbfs" style="margin-top: 10px;justify-content: flex-start;">
              <p>地址：</p>
              <p style="width: 210px;word-wrap: break-word;">{{data.address}}</p>
            </div>
            <p style="margin-top: 6px;">电话：{{data.phone}}</p>
          </div>
          <div style="height: 40px; width: 1px;background: #E6E6EB;"></div>
          <div class="fccc" @click="callto">
            <img style="width:40px;height:40px;" src="../../../static/images/call.png" alt>
            <p style="font-size:10px;line-height:14px;">联系分销商</p>
          </div>
        </div>
        <div class="applyitem">
          <p>订货数量</p>
          <p>
            <span>{{data.number}}</span>台
          </p>
        </div>
        <div class="applyitem">
          <p>金额</p>
          <p>
            <span>{{data.money}}</span>台
          </p>
        </div>
        <div class="applyitem">
          <p>支付凭证</p>
          <img :src="data.verchar" alt>
          <p class="viewimg">点击查看大图</p>
        </div>
        <div class="applyitem">
          <p>申请时间：{{data.create_time}}</p>
        </div>
      </div>
      <div>
        <div class="applyitem frsbc" v-if="status1 != 0">
          <p>审核时间：{{data.audit_time}}</p>
          <p>{{data.audit_status==0?"未审核": data.audit_status ==1?"已通过":data.audit_status ==2?'已驳回':'获取失败'}}</p>
        </div>
      </div>
      <!-- 未审核时显示  操作按钮 -->
      <div class="frsbc" style="padding-right: 15px;" v-if="status1 == 0">
        <i-button bind:click="handleClick" type="error" style="width: 160px; margin: 0;">驳回</i-button>
        <i-button bind:click="handleClick" type="primary" style="width: 160px; margin: 0;">通过</i-button>
      </div>
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
  computed: {
    status1() {
      // 0未审核    1通过     2 驳回 
      return this.$opt().status;
    }
  },
  methods: {
    callto() {
      wx.makePhoneCall({
        phoneNumber: this.data.phone + ""
      });
    },
    fenxiaoshangDet() {
      this.$fly
        .request({
          method: "post",
          url: "/fx/Income/FacDetails",
          body: {
            order_id: this.$opt().id,
            status: 2 // 2代表分销商
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
    this.fenxiaoshangDet();
  }
};
</script>

<style lang="scss" scoped>
.pageMain {
  min-height: 100vh;
  background: #fff;
  padding-bottom: 15px;
  .detmain {
    padding-left: 15px;
    .applyitem {
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
  }
}
</style>
 

