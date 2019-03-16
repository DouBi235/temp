<template>
  <div class="pageMain">
    <empty-show text="暂无记录" v-if="sentList.length === 0"></empty-show>
    <order-list :list="sentList" v-else></order-list>
  </div>
</template>
<script>
import orderList from "@/components/orderList";
import emptyShow from "@/components/empty";
export default {
  data() {
    return {
      sentList: [], // 列表
      sentpage: 1, // 当前页
      sentrows: 1, // 总页数
      sentcount: "" // 总条数
    };
  },
  components: {
    orderList
  },
  computed: {},
  methods: {
    // 获取列表
    getsent: function() {
      if (this.sentpage > this.sentrows) {
        wx.showToast({
          title: "暂无更多",
          icon: "none",
          duration: 1500
        });
        return;
      }
      this.$fly
        .request({
          method: "post",
          url: "/fx/Flow/lowOrderList",
          body: {
            page: this.sentpage
          }
        })
        .then(res => {
          if (res.code == 1) {
            let li = this.sentList;
            for (let i = 0; i < res.data.list.length; i++) {
              li.push(res.data.list[i]);
            }
            this.sentList = li;
            this.sentpage++;
            this.sentrows = res.data.rows;
            this.sentcount = res.data.count;
          } else {
            wx.showToast({
              title: res.msg,
              icon: "none",
              duration: 1500
            });
          }
        });
    }
  },
  onShow() {
    this.sentpage = 1;
    this.sentList = [];
    this.getsent();
  },
  created() {},
  onReachBottom() {
    this.getsent();
  }
};
</script>

<style lang="scss" scoped>
.pageMain {
  min-height: 100vh;
  background: #f5f5fa;
  textarea {
    margin: 10px 15px;
    width: 345px;
    height: 300px;
  }
  .btnbox {
    width: 300px;
    margin: 0 auto;
    margin-top: 100px;
  }
}
</style>
 

