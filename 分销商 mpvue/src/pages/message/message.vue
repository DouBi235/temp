<template>
  <div>
    <div style="background: #F5F5FA;">
      <div style="position: fixed;top: 0;width:100%;">
        <i-tabs :current="current" color="#1EA0FF" @change="changeTab">
          <i-tab key="tab1" title="消息"></i-tab>
          <i-tab key="tab2" title="通知"></i-tab>
        </i-tabs>
      </div>
      <div style="margin-top: 42px;">
        <div v-show="current === 'tab1'" style="height: calc(100vh - 42px);">
          <empty-list text="暂无数据" v-if="messageList.length === 0"></empty-list>
          <message-list :list="messageList" @detail="navMessageDet" v-else></message-list>
        </div>
        <div v-show="current === 'tab2'" style="height: calc(100vh - 42px);">
          <empty-list text="暂无数据" v-if="noticeList.length === 0"></empty-list>
          <notice-list :list="noticeList" @detail="navNoticeDet" v-else></notice-list>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import emptyList from "@/components/empty";
import messageList from "@/components/messageList";
import noticeList from "@/components/noticeList";
export default {
  data() {
    return {
      current: "tab1", //当前tab

      messageList: [],
      messagepage: 0,
      messagerows: 0,
      messagecount: "",

      noticeList: [],
      noticepage: 0,
      noticerows: 0,
      noticecount: ""
    };
  },
  components: {
    emptyList,
    messageList,
    noticeList
  },
  methods: {
    navMessageDet() {},
    navNoticeDet() {},
    changeTab(e) {
      this.current = e.mp.detail.key;
      if (this.current == "tab1") this.getmessage();
      else if (this.current == "tab2") this.getnotice();
    },
    // 获取未审核列表
    getmessage: function() {
      if (this.messagepage > this.messagerows) {
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
          url: "/fx/Msgs/log",
          body: {
            page: this.messagepage
          }
        })
        .then(res => {
          if (res.code == 1) {
            let li = this.messageList;
            for (let i = 0; i < res.data.list.length; i++) {
              li.push(res.data.list[i]);
            }
            this.messageList = li;
            this.messagepage++;
            this.messagerows = res.data.rows;
            this.messagecount = res.data.count;
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
    getnotice: function() {
      if (this.noticepage > this.noticerows) {
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
          url: "/fx/Msgs/getMsg",
          body: {
            page: this.noticepage
          }
        })
        .then(res => {
          if (res.code == 1) {
            let li = this.noticeList;
            for (let i = 0; i < res.data.list.length; i++) {
              li.push(res.data.list[i]);
            }
            this.noticeList = li;
            this.noticepage++;
            this.noticerows = res.data.rows;
            this.noticecount = res.data.count;
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
    this.messagepage = 1;
    this.messageList = [];
    this.noticepage = 1;
    this.noticeList = [];
    this.getmessage();
    this.getnotice();
  }
};
</script>

<style scoped>
.df {
  position: fixed;
}
</style>

