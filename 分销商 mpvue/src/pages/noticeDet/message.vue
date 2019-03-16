<template>
  <div>
    <div style="background: #F5F5FA;">
      <i-tabs :current="current" color="#1EA0FF" @change="changeTab">
        <i-tab key="tab1" title="消息">fdsa</i-tab>
        <i-tab key="tab2" title="通知">fds</i-tab>
      </i-tabs>
      <div v-show="current === 'tab1'" style="height: calc(100vh - 42px);">
        <empty-list text="暂无数据" v-if="list.length === 0"></empty-list>
        <message-list v-else></message-list>
      </div>
      <div v-show="current === 'tab2'" style="height: calc(100vh - 42px);">
        <empty-list text="暂无数据" v-if="list.length === 0"></empty-list>
        <notice-list v-else></notice-list>
      </div>
    </div>
    <div></div>
  </div>
</template>
<script>
import emptyList from "@/components/empty";
import messageList from "@/components/messageList";
import noticeList from "@/components/noticeList";
export default {
  data() {
    return {
      current: "tab1",
      list: [{}]
    };
  },
  components: {
    emptyList,
    messageList,
    noticeList
  },
  methods: {
    changeTab(e) {
      this.current = e.mp.detail.key;
    }
  }
};
</script>

<style scoped>
</style>

