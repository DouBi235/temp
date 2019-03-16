<template>
  <div class="unaudit">
    <div class="listBox">
      <div
        class="listitem1"
        v-for="(item,index) in list"
        :key="index"
        @click="nav"
        :data-id="item.order_id"
        :data-status="item.status"
      >
        <div class="frsbc">
          <img :src="item.head_pic" alt>
          <div class="left">
            <p class="name">{{item.name}}</p>
            <p class="time">{{item.status ==1 ? '用户': '分销商'}}</p>
          </div>
          <p class="right">
            <span class="num">{{item.money}}</span>元
          </p>
        </div>
        <div class="bottom frsbc">
          <span>{{item.address}}</span>
          <span>{{item.create_time}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["list"],
  methods: {
    nav(e) {
      this.$emit("detail", {
        id: e.mp.currentTarget.dataset.id,
        status: e.mp.currentTarget.dataset.status
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.listBox {
  padding-top: 10px;
  background: #f5f5fa;
  .listitem1 {
    background: #fff;
    margin-bottom: 10px;
    padding: 8px 0 0px 15px;
    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      margin-right: 8px;
    }
    .left {
      width: 144px;
      .name {
        font-size: 16px;
        font-weight: 400;
        color: rgba(30, 35, 40, 1);
        line-height: 22px;
      }
      .time {
        margin-top: 9px;
        font-size: 12px;
        color: rgba(150, 155, 165, 1);
        line-height: 14px;
      }
    }
    .right {
      width: 160px;
      font-size: 12px;
      font-weight: 400;
      color: rgba(150, 155, 165, 1);
      line-height: 17px;
      padding-right: 15px;
      text-align: right;
      .num {
        margin-right: 5px;
        font-size: 25px;
        font-weight: 700;
        color: rgba(30, 159, 253, 1);
        line-height: 29px;
      }
    }
    .bottom {
      margin-top: 8px;
      width: 360px;
      height: 36px;
      padding-right: 15px;
      border-top: 1px dashed #e6e6eb;
      font-size: 12px;
      font-weight: 400;
      color: rgba(150, 155, 165, 1);
      line-height: 36px;
    }
  }
}
</style>

