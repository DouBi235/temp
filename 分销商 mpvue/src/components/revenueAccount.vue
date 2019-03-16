<template>
  <div class="revenueAccount">
    <i-panel title="收款账户(对公账户)">
      <view class="bg-white">
        <i-input
          :value="cardName"
          maxlength="30"
          type="text"
          @change="inputcardName"
          autofocus
          title="开户名"
          right
          placeholder="请输入开户名"
        />
        <my-picker
          @change="pickerChange"
          :list="bankList"
          :index="bankIndex"
          init="请选择开户行"
          title="开户行"
        ></my-picker>
        <i-input
          :value="cardType"
          type="text"
          @change="inputcardType"
          maxlength="60"
          title="分行"
          right
          placeholder="请输入所属分行"
        />
        <i-input
          :value="account"
          type="number"
          @change="inputaccount"
          maxlength="30"
          title="账号"
          right
          placeholder="请输入账号"
        />
      </view>
    </i-panel>
  </div>
</template>
<script>
import myPicker from "@/components/myPicker";
export default {
  props: [
    "cardName", //开户名
    "bankList",
    "bankIndex",
    "cardType", //所属分行
    "account" //银行卡号
  ],
  components: {
    myPicker
  },
  computed: {},
  methods: {
    pickerChange(e) {
      this.$emit("pickerChange", e);
    },
    inputcardName(e) {
      this.$emit("inputcardName", e);
    },
    inputcardType(e) {
      this.$emit("inputcardType", e);
    },
    inputaccount(e) {
      this.$emit("inputaccount", e);
    }
  }
};
</script>
<style lang="scss" scoped>
.revenueAccount {
  .pickerView {
    height: 45px;
    width: 300px;
    float: right;
    line-height: 45px;
    text-align: right;
    padding-right: 15px;
    font-size: 14px;
  }
}
</style>
