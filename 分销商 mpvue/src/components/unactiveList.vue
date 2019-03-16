<template>
  <div class="unactive">
    <div class="listBox">
      <div class="listitem1 frsbc" v-for="(item,index) in list" :key="index">
        <span class="devicenum">设备号{{item.eq_num}}</span>
        <span class="status">{{item.status == 1?'未激活':item.status == 2? '已激活':''}}</span>
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
.unactive {
  padding-top: 10px;
  .listBox {
    background: #fff;
    padding-left: 15px;
    .listitem1 {
      width: 360px;
      height: 55px;
      border-bottom: 1px solid #e6e6eb;
      padding: 18px 15px 18px 0;
      .devicenum {
        font-size: 14px;
        font-weight: 400;
        color: rgba(30, 35, 40, 1);
        line-height: 20px;
      }
      .status {
        font-size: 14px;
        font-weight: 400;
        color: rgba(150, 155, 165, 1);
        line-height: 20px;
      }
    }
  }
}
</style>

