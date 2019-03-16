<template>
  <div class="audited">
    <div class="listBox2">
      <div class="listitem1 frsbc" v-for="(item,index) in list" :key="index">
        <div class="left1 fcsbfs">
          <p class="time1">设备号</p>
          <p class="name1">{{item.eq_num}}</p>
          <p class="time1" style="visibility: hidden;">{{item.eq_num}}</p>
        </div>
        <div class="right1 fcsbfe">
          <p class="name1">{{item.status == 1?'未激活':item.status == 2? '已激活':''}}</p>
          <p class="time1">{{item.audit_time}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["list"],
  method: {
    nav() {}
  }
};
</script>
<style lang="scss" scoped>
.audited {
  height: 100%;
  width: 100%;
  .listBox2 {
    background: #fff;
    margin-top: 10px;
    padding-left: 15px;
    .listitem1 {
      border-bottom: 1px solid #e6e6eb;
      height: 80px;
      padding: 0 15px 0 0;
      .left1 {
        height: 68px;
        .name1 {
          font-size: 16px;
          font-weight: 400;
          color: rgba(30, 35, 40, 1);
          line-height: 22px;
        }
        .time1 {
          font-size: 12px;
          color: rgba(150, 155, 165, 1);
          line-height: 14px;
        }
      }
      .right1 {
        height: 44px;
        font-size: 12px;
        font-weight: 400;
        color: rgba(150, 155, 165, 1);
        line-height: 17px;
        .name1 {
          font-size: 16px;
          font-weight: 400;
          color: #ff5f5f;
          line-height: 22px;
        }
        .num1 {
          margin-right: 5px;
          font-size: 25px;
          font-weight: 700;
          color: rgba(30, 159, 253, 1);
          line-height: 29px;
        }
      }
    }
  }
}
</style>

