<template>
  <div class="audited">
    <div class="listBox2">
      <div class="listitem1" v-for="item in list">
        <div class="top1 frsbc">
          <span>订单编号37892048930</span>
          <span class="status">代发货</span>
        </div>
        <div class="frsbc">
          <div class="left1">
            <p class="right1">
              <span class="num1">{{item.num}}</span>台
            </p>
            <p class="time1">{{item.data}}</p>
          </div>
        </div>
        <div class="bottom1 frsbc">
          <span class="data">发货时间8493702435</span>
          <div class="btn">确认收货</div>
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
  .listBox2 {
    padding-top: 10px;
    .listitem1 {
      background: #fff;
      margin-bottom: 10px;
      padding-left: 15px;
      .top1 {
        width: 360px;
        height: 40px;
        border-bottom: 1px solid #e6e6eb;
        margin-bottom: 10px;
        font-size: 12px;
        color: rgba(30, 35, 40, 1);
        line-height: 40px;
        padding-right: 15px;
        .status {
          font-size: 12px;
          font-weight: 400;
          color: rgba(255, 95, 95, 1);
          line-height: 40px;
        }
      }
      .left1 {
        .right1 {
          font-size: 12px;
          font-weight: 400;
          color: rgba(150, 155, 165, 1);
          line-height: 17px;
          .num1 {
            margin-right: 5px;
            font-size: 25px;
            font-weight: 700;
            color: rgba(30, 159, 253, 1);
            line-height: 29px;
          }
        }
        .time1 {
          margin-top: 9px;
          font-size: 12px;
          color: rgba(150, 155, 165, 1);
          line-height: 14px;
        }
      }
      .bottom1 {
        width: 360px;
        height: 44px;
        border-top: 1px solid #e6e6eb;
        margin-top: 10px;
        font-size: 12px;
        color: rgba(30, 35, 40, 1);
        line-height: 40px;
        padding-right: 15px;
        .data {
          font-size: 12px;
          font-weight: 400;
          color: rgba(150, 155, 165, 1);
          line-height: 40px;
        }
        .btn {
          width: 100px;
          height: 32px;
          background: rgba(30, 160, 255, 1);
          font-size: 14px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 32px;
          text-align: center;
        }
      }
    }
  }
}
</style>

