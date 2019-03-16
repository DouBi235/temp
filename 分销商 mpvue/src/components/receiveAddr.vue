<template>
  <div class="receiveAddr">
    <i-panel title="收货地址">
      <view class="bg-white">
        <my-picker @change="shengc" :list="shengl" :index="shengi" init="请选择省" title="省份"></my-picker>
        <my-picker @change="shic" :list="shil" :index="shii" init="请选择城市" title="城市"></my-picker>
        <my-picker @change="xianc" :list="xianl" :index="xiani" init="请选择区域" title="选择区域"></my-picker>
        <textarea @change="textc" class="texta" placeholder="请输入详细地址(如街道、门牌号等)"></textarea>
      </view>
    </i-panel>
  </div>
</template>
<script>
import myPicker from "@/components/myPicker";
export default {
  props: ["shengl", "shengi", "shil", "shii", "xianl", "xiani"],
  data() {
    return {};
  },
  components: {
    myPicker
  },
  methods: {
    shengc(e) {
      this.$emit("shengc", e);
    },
    shic(e) {
      this.$emit("shic", e);
    },
    xianc(e) {
      this.$emit("xianc", e);
    },
    textc(e) {
      this.$emit("textc", e);
    }
  }
};
</script>
<style lang="scss" scoped>
.receiveAddr {
  .texta {
    width: 375px;
    height: 100px;
    background: rgba(255, 255, 255, 1);
    padding: 10px 15px;
    font-size: 14px;
    line-height: 16px;
    box-sizing: border-box;
  }
  .textarea-placeholder {
    font-size: 14px;
    font-weight: 400;
    color: rgba(200, 200, 210, 1);
    line-height: 16px;
  }
}
</style>
