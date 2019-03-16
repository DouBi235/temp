<template>
  <div class="pageMain">
    <div class="empty fccc" v-if="auditshow !=1">
      <img src="../../../static/images/auditkey.png" alt>
      <span>暂无权限</span>
    </div>
    <div v-if="auditshow == 1">
      <div style="position: fixed;top: 0;width:100%;">
        <i-tabs :current="current" color="#1EA0FF" @change="changeTab">
          <i-tab key="tab1" title="未审核"></i-tab>
          <i-tab key="tab2" title="已审核"></i-tab>
        </i-tabs>
      </div>
      <div style="margin-top: 42px;">
        <div v-show="current === 'tab1'" style="height: calc(100vh - 42px);">
          <empty-list text="暂无数据" v-if="weishenList.length === 0"></empty-list>
          <unaudit-list :list="weishenList" @detail="getweishendet" v-else></unaudit-list>
        </div>
        <div v-show="current === 'tab2'" style="height: calc(100vh - 42px);">
          <empty-list text="暂无数据" v-if="yishenList.length === 0"></empty-list>
          <audited-list :list="yishenList" @detail="getyishendet" v-else></audited-list>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import emptyList from "@/components/empty";
import unauditList from "@/components/unauditList";
import auditedList from "@/components/auditedList";
export default {
  data() {
    return {
      current: "tab2",

      weishenList: [], // 列表
      weishenpage: 1, // 当前页
      weishenrows: 1, // 总页数
      weishencount: "", // 总条数

      yishenList: [],
      yishenpage: 1,
      yishenrows: 1,
      yishencount: ""
    };
  },
  components: {
    emptyList,
    unauditList,
    auditedList
  },
  computed: {
    auditshow() {
      return this.globalData.audit_status + 1;
    }
  },
  methods: {
    changeTab(e) {
      this.current = e.mp.detail.key;
      if (this.current == "tab1") this.getweishen();
      else this.getyishen();
    },
    getweishendet(data) {
      wx.navigateTo({
        url: "../auditDet/main?id=" + data.id + "&status=1" //1 未审核
      });
    },
    getyishendet(data) {
      wx.navigateTo({
        url: "../auditDet/main?id=" + data.id + "&status=" + data.status //2 已通过
      });
    },
    // 获取未审核列表
    getweishen: function() {
      if (this.weishenpage > this.weishenrows) {
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
          url: "/fx/Audit/notAudit",
          body: {
            page: this.weishenpage
          }
        })
        .then(res => {
          if (res.code == 1) {
            let li = this.weishenList;
            for (let i = 0; i < res.data.list.length; i++) {
              li.push(res.data.list[i]);
            }
            this.weishenList = li;
            this.weishenpage++;
            this.weishenrows = res.data.rows;
            this.weishencount = res.data.count;
          } else {
            wx.showToast({
              title: res.msg,
              icon: "none",
              duration: 1500
            });
          }
        });
    },
    // 获取已审核列表
    getyishen: function() {
      if (this.yishenpage > this.yishenrows) {
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
          url: "/fx/Audit/yesAudit",
          body: {
            page: this.yishenpage
          }
        })
        .then(res => {
          if (res.code == 1) {
            let li = this.yishenList;
            for (let i = 0; i < res.data.list.length; i++) {
              li.push(res.data.list[i]);
            }
            this.yishenList = li;
            console.log(this.yishenList);
            this.yishenpage++;
            this.yishenrows = res.data.rows;
            this.yishencount = res.data.count;
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
    this.weishenpage = 1;
    this.weishenList = [];
    this.yishenpage = 1;
    this.yishenList = [];
    this.getyishen();
    this.getweishen();
  },
  created() {},
  onReachBottom() {
    if (this.current == "tab2") {
      this.getyishen();
    } else if (this.current == "tab1") {
      this.getweishen();
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
