<template>
  <div class="pageMain">
    <div>
      <i-tabs :current="current" color="#1EA0FF" @change="changeTab">
        <i-tab key="tab1" title="未完成"></i-tab>
        <i-tab key="tab2" title="已完成"></i-tab>
      </i-tabs>
      <div v-show="current === 'tab1'" style="height: calc(100vh - 42px);">
        <empty-list text="暂无数据" v-if="list.length === 0"></empty-list>
        <iscomplete-list :list="list" v-else></iscomplete-list>
      </div>
      <div v-show="current === 'tab2'" style="height: calc(100vh - 42px);">
        <empty-list text="暂无数据" v-if="list.length === 0"></empty-list>
        <iscomplete-list :list="list" v-else></iscomplete-list>
      </div>
    </div>
  </div>
</template>
<script>
import emptyList from "@/components/empty";
import iscompleteList from "@/components/iscompleteList";
export default {
  data() {
    return {
      current: "tab1",
      list: [
        {
          name: "两2的",
          data: "37469L---",
          num: "160"
        },
        {
          name: "两2的",
          data: "37469L---",
          num: "160"
        },
        {
          name: "两2的",
          data: "37469L---",
          num: "160"
        }
      ]
    };
  },
  components: {
    emptyList,
    iscompleteList
  },
  computed: {},
  methods: {
    changeTab(e) {
      this.current = e.mp.detail.key;
    }
  },
  created() {}
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
