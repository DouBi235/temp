<template>
  <div class="listPage">
    <div class="listBoxl">
      <div class="listItem fcsbc" v-for="(item,index) in list" :key="index" @click="nav">
        <p class="l1">
          <span class="reddot" v-if="item.isread === 0"></span>
          <span :style="{color:(item.isread==0?'#1E2328':'#73737D')}">{{item.title}}</span>
        </p>
        <p class="l2">{{item.create_time}}</p>
        <p class="l3">{{item.content}}</p>
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
  }
};
</script>
<style lang="scss" scoped>
.listPage {
  background: #f5f5fa;
  .listBoxl {
    padding-top: 10px;
    .listItem {
      background: #fff;
      align-items: flex-start;
      width: 375px;
      height: 110px;
      padding: 15px;
      .l1 {
        display: flex;
        align-items: center;

        .reddot {
          width: 8px;
          height: 8px;
          background: rgba(250, 100, 75, 1);
          border-radius: 50%;
          margin-right: 5px;
        }
        span {
          font-size: 14px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(30, 35, 40, 1);
          line-height: 20px;
        }
      }
      .l2 {
        font-size: 10px;
        font-weight: 400;
        color: rgba(115, 115, 125, 1);
        line-height: 14px;
        margin-top: 5px;
      }
      .l3 {
        font-size: 12px;
        font-weight: 400;
        color: rgba(115, 115, 125, 1);
        line-height: 17px;
        margin-top: 6px;
      }
    }
  }
}
</style>
