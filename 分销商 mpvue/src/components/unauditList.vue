<template>
  <div class="unaudit">
    <div class="listBox">
      <div
        class="listitem1 frsbc"
        v-for="(item,index) in list"
        @click="nav"
        :data-id="item.id"
        :data-status="item.audit_status"
        :key="index"
      >
        <div class="left">
          <p class="name">{{item.name}}</p>
          <p class="time">{{item.create_time}}</p>
        </div>
        <p class="right">
          <span class="num">{{item.number}}</span>台
        </p>
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
    padding: 20px 10px 15px;
    .left {
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
      font-size: 12px;
      font-weight: 400;
      color: rgba(150, 155, 165, 1);
      line-height: 17px;
      .num {
        margin-right: 5px;
        font-size: 25px;
        font-weight: 700;
        color: rgba(30, 159, 253, 1);
        line-height: 29px;
      }
    }
  }
}
</style>

