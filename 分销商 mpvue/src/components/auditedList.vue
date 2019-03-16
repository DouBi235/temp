<template>
  <div class="audited">
    <div class="listBox2">
      <div
        class="listitem1"
        v-for="(item,index) in list"
        @click="nav"
        :data-id="item.id"
        :key="index"
      >
        <div class="top1">审核时间：{{item.audit_time}}</div>
        <div class="frsbc">
          <div class="left1">
            <p class="name1">{{item.name}}</p>
            <p class="time1">{{item.create_time}}</p>
          </div>
          <p class="right1">
            <span class="num1">{{item.number}}</span>台
          </p>
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
        id: e.mp.currentTarget.dataset.id
      });
    }
  },
  computed: {}
};
</script>
<style lang="scss" scoped>
.audited {
  height: 100%;
  width: 100%;
  background: #f5f5fa;

  .listBox2 {
    padding-top: 10px;
    .listitem1 {
      background: #fff;
      margin-bottom: 10px;
      padding: 0 10px 15px;

      .top1 {
        width: 375px;
        height: 44px;
        border-bottom: 1px solid #e6e6eb;
        margin-bottom: 10px;
        font-size: 12px;
        font-weight: 400;
        color: rgba(30, 35, 40, 1);
        line-height: 44px;
      }
      .left1 {
        .name1 {
          font-size: 16px;
          font-weight: 400;
          color: rgba(30, 35, 40, 1);
          line-height: 22px;
        }
        .time1 {
          margin-top: 9px;
          font-size: 12px;
          color: rgba(150, 155, 165, 1);
          line-height: 14px;
        }
      }
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
    }
  }
}
</style>

