<template>
  <div class="pageMain">
    <div>
      <div style="position: fixed;top: 0;width:100%;">
        <i-tabs :current="current" color="#1EA0FF" @change="changeTab">
          <i-tab key="tab1" title="已激活"></i-tab>
          <i-tab key="tab2" title="未激活"></i-tab>
        </i-tabs>
      </div>
      <div style="margin-top: 42px;">
        <div v-show="current == 'tab1'" style="height: calc(100vh - 42px);">
          <empty-list text="暂无数据" v-if="yijihuoList.length === 0"></empty-list>
          <activated-list :list="yijihuoList" v-else></activated-list>
        </div>
        <div v-show="current == 'tab2'" style="height: calc(100vh - 42px);">
          <empty-list text="暂无数据" v-if="weijihuoList.length === 0"></empty-list>
          <unactive-list :list="weijihuoList" v-else></unactive-list>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import emptyList from "@/components/empty";
import unactiveList from "@/components/unactiveList";
import activatedList from "@/components/activatedList";
export default {
  data() {
    return {
      current: "tab1",
      yijihuoList: [], // 列表
      yijihuopage: 1, // 当前页
      yijihuorows: 1, // 总页数
      yijihuocount: "", // 总条数

      weijihuoList: [],
      weijihuopage: 1,
      weijihuorows: 1,
      weijihuocount: ""
    };
  },
  components: {
    emptyList,
    unactiveList,
    activatedList
  },
  computed: {
    current() {
      return this.$opt().tab;
    }
  },
  methods: {
    // tab 改变
    changeTab(e) {
      this.current = e.mp.detail.key;
      if (this.current == "tab1") this.getyijihuo();
      else this.getweijihuo();
    },
    // 获取列表
    getyijihuo: function() {
      if (this.yijihuopage > this.yijihuorows) {
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
          url: "/fx/Flow/offNumList",
          body: {
            page: this.yijihuopage
          }
        })
        .then(res => {
          if (res.code == 1) {
            let li = this.yijihuoList;
            for (let i = 0; i < res.data.list.length; i++) {
              li.push(res.data.list[i]);
            }
            this.yijihuoList = li;
            this.yijihuopage++;
            this.yijihuorows = res.data.rows;
            this.yijihuocount = res.data.count;
          } else {
            wx.showToast({
              title: res.msg,
              icon: "none",
              duration: 1500
            });
          }
        });
    },
    // 获取列表
    getweijihuo: function() {
      if (this.weijihuopage > this.weijihuorows) {
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
          url: "/fx/Flow/onNumList",
          body: {
            page: this.weijihuopage
          }
        })
        .then(res => {
          if (res.code == 1) {
            let li = this.weijihuoList;
            for (let i = 0; i < res.data.list.length; i++) {
              li.push(res.data.list[i]);
            }
            this.weijihuoList = li;
            this.weijihuopage++;
            this.weijihuorows = res.data.rows;
            this.weijihuocount = res.data.count;
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
  created() {},
  onShow() {
    this.yijihuopage = 1;
    this.yijihuoList = [];
    this.getyijihuo();

    this.weijihuopage = 1;
    this.weijihuoList = [];
    this.getweijihuo();

    this.current = this.$opt().tab;
  },
  onReachBottom() {
    if (this.current == "tab2") {
      this.getweijihuo();
    } else if (this.current == "tab1") {
      this.getyijihuo();
    }
  }
};
</script>

<style lang="scss" scoped>
.pageMain {
  min-height: 100vh;
  background: #f5f5fa;
  .empty {
    height: 100vh;
    img {
      width: 120px;
      height: 120px;
    }
    span {
      margin-top: 5px;
      font-size: 12px;
      font-weight: 400;
      color: #ff5151;
      line-height: 17px;
    }
  }
}
</style>
