<template>
  <div class="unaudit">
    <div class="listBox">
      <div class="listitem1 frsbc" v-for="(item,index) in list" :key="index">
        <div class="left">
          <p class="name">{{item.number}}台</p>
          <p class="time">{{item.create_time}}</p>
        </div>
        <p class="right">
          <span class="num">{{item.money}}</span>元
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["list"],
  method: {},
};
</script>
<style lang="scss" scoped>
.unaudit {
  background: #f5f5fa;
  padding-top: 10px;
  .listBox {
    background: #fff;
    .listitem1 {
      margin-left: 20px;
      border-bottom: 1px solid #e6e6eb;
      padding: 13px 10px 13px 0;
      .left {
        .name {
          font-size: 16px;
          font-weight: 400;
          color: rgba(30, 35, 40, 1);
          line-height: 22px;
        }
        .time {
          margin-top: 6px;
          font-size: 12px;
          color: rgba(150, 155, 165, 1);
          line-height: 14px;
        }
      }
      .right {
        font-size: 12px;
        font-weight: 400;
        color: rgba(150, 155, 165, 1);
        line-height: 17px;
        .num {
          margin-right: 5px;
          font-size: 20px;
          font-weight: 700;
          color: rgba(30, 159, 253, 1);
          line-height: 29px;
        }
      }
    }
  }
}
</style>

