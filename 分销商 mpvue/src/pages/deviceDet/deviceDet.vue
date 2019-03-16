<template>
  <div class="pageMain">
    <div class="detmain">
      <div class="applydet">
        <div class="applyitem frsbc" style="padding-bottom: 30px;">
          <div>
            <span class="applytitle">卡看看</span>
            <div class="frsbfs" style="margin-top: 10px;justify-content: flex-start;">
              <p>地址：</p>
              <p style="width: 210px;">河北省 石家庄市 裕华区 槐安东路 与谈固大街交口 宝翠商务1401</p>
            </div>
            <p style="margin-top: 6px;">电话：18743683163</p>
          </div>
          <div style="height: 40px; width: 1px;background: #E6E6EB;"></div>
          <div class="fccc">
            <img style="width:40px;height:40px;" src="../../../static/images/call.png" alt>
            <p style="font-size:10px;line-height:14px;">联系车主</p>
          </div>
        </div>
        <div class="applyitem fcsbfs">
          <p>订货数量</p>
          <p>
            <span>SDS1231AD413</span>
          </p>
        </div>
        <div class="applyitem fcsbfs">
          <p>订货数量</p>
          <p>
            <span>SDS1231AD413</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  components: {},
  computed: {},
  methods: {},
  created() {}
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
      padding: 15px 15px 15px 0;
      min-height: 80px;
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
          font-size: 16px;
          font-family: ArialMT;
          color: rgba(30, 35, 40, 1);
          line-height: 18px;
        }
      }
      img {
        width: 345px;
        height: 160px;
        margin-top: 10px;
      }
    }
  }
}
</style>
 

