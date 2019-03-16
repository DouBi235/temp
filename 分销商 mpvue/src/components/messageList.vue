<template>
  <div class="listPage">
    <div class="listBoxl">
      <div class="listItem fcsbc" v-for="(item,index) in list" @click="nav">
        <div class="itemt frsbc">
          <span class="toptitme">{{item.title}}</span>
          <span class="toptime">{{cerdtife}}</span>
        </div>
        <!-- 1 今日收入 -->
        <div class="itemc" v-if="item.type == 1">
          <span style="color:#1E2328;">{{item.content}}</span>
          <span>{{item.money}}元</span>
        </div>
        <!-- 2 今月收入 -->
        <div class="itemc" v-if="item.type == 2">
          <span style="color:#1E2328;">{{item.content}}</span>
          <span>{{item.money}}元</span>
        </div>
        <!-- 3 其他 -->
        <div class="itemc" v-if="item.type == 3">
          <span>{{item.content}}</span>
        </div>
        <div class="itemb">
          <span>点击查看 ></span>
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
      padding: 15px;
      padding-bottom: 18px;
      .itemt {
        color: #73737d;
        width: 345px;
        .toptitme {
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
        }
        .toptime {
          font-size: 10px;
          font-weight: 400;
          line-height: 14px;
        }
      }
      .itemc {
        font-size: 18px;
        font-weight: 400;
        color: rgba(30, 35, 40, 1);
        line-height: 25px;
        span {
          color: #ff5f5f;
        }
      }
      .itemb {
        font-size: 14px;
        font-weight: 400;
        color: rgba(30, 160, 255, 1);
        line-height: 20px;
        align-self: flex-end;
      }
    }
  }
}
</style>
