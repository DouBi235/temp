<template>
  <div class="pageMain">
    <empty-show text="暂无记录" v-if="tosendList.length === 0"></empty-show>
    <order-list :list="tosendList" v-else></order-list>
  </div>
</template>
<script>
import orderList from "@/components/orderList";
import emptyShow from "@/components/empty";
export default {
  data() {
    return {
      tosendList: [], // 列表
      tosendpage: 1, // 当前页
      tosendrows: 1, // 总页数
      tosendcount: "" // 总条数
    };
  },
  components: {
    orderList
  },
  computed: {},
  methods: {
    // 获取列表
    gettosend: function() {
      if (this.tosendpage > this.tosendrows) {
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
          url: "/fx/Flow/newOrderList",
          body: {
            page: this.tosendpage
          }
        })
        .then(res => {
          if (res.code == 1) {
            let li = this.tosendList;
            for (let i = 0; i < res.data.list.length; i++) {
              li.push(res.data.list[i]);
            }
            this.tosendList = li;
            this.tosendpage++;
            this.tosendrows = res.data.rows;
            this.tosendcount = res.data.count;
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
    this.tosendpage = 1;
    this.tosendList = [];
    this.gettosend();
  },
  created() {},
  onReachBottom() {
    this.gettosend();
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
 

