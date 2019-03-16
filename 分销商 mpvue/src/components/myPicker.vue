<template>
  <div>
    <!-- <my-picker @change="xchange" :list="xlist" :index="xindex" :init="xinit" :title="xtitle"></my-picker> -->
    <picker @change="pickerChange" :value="index" :range="list" range-key="name">
      <i-input :value="value" type="text" disabled :title="title" right/>
    </picker>
  </div>
</template>
<script>
export default {
  props: ["list", "index", "init", "title"],

  computed: {
    value() {
      return this.index ? this.list[this.index].name : this.init;
    }
  },
  methods: {
    pickerChange(e) {
      this.$emit("change", e);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

