<template>
  <div class="pageMain">
    <i-panel i-class="bg-white">
      <view class="bg-white">
        <i-input
          :value="name"
          type="text"
          maxlength="20"
          autofocus
          @change="inputname"
          title="姓名"
          right
          placeholder="请输入姓名"
        />
        <i-input
          :value="phone"
          maxlength="11"
          @change="inputphone"
          type="number"
          title="手机号"
          placeholder="请输入手机号"
        />
        <div class="frsbc codeBox">
          <i-input
            i-class="input"
            :value="code"
            maxlength="4"
            @change="inputcode"
            type="number"
            title="验证码"
            placeholder="请输入验证码"
          />
          <i-button @click="send" size="small" :disabled="disabled" type="primary">发送验证码</i-button>
        </div>
      </view>
    </i-panel>
    <revenue-account
      :cardName="account_name"
      @pickerChange="pickerChange"
      :bankList="bankList"
      :bankIndex="bankIndex"
      :cardType="branch"
      :account="account"
      @inputcardName="inputcardName"
      @inputcardType="inputcardType"
      @inputaccount="inputaccount"
    ></revenue-account>
    <div class="bottom">
      <p class="botTip">提示：注册信息将用于收益提现，请务必认真填写。</p>
      <i-button @click="next" :disabled="disnext" type="primary">下一步</i-button>
    </div>
  </div>
</template>
<script>
import revenueAccount from "@/components/revenueAccount";
export default {
  data() {
    return {
      name: "",
      phone: "",
      code: "", // 验证码
      account_name: "", // 开户名
      branch: "", //分行信息
      subBank: "",
      account: "", // 银行卡号
      disabled: false,
      bankList: [],
      bankIndex: "",
      bank_code: "",
      bank_name: ""
    };
  },
  components: {
    revenueAccount
  },
  computed: {},
  methods: {
    inputname(e) {
      this.name = e.mp.detail.detail.value;
    },
    inputphone(e) { 
      this.phone = e.mp.detail.detail.value;
    },
    inputcode(e) {
      this.code = e.mp.detail.detail.value;
    },
    inputcardName(e) {
      this.account_name = e.mp.detail.detail.value;
    },
    inputcardType(e) {
      this.branch = e.mp.detail.detail.value;
    },
    inputaccount(e) {
      this.account = e.mp.detail.detail.value;
    },
    pickerChange(e) {
      this.bankIndex = e.mp.detail.value;
      for (let i = 0; i < this.bankList.length; i++) {
        if (i == this.bankIndex) {
          this.bank_code = this.bankList[i].code;
          this.bank_name = this.bankList[i].name;
        }
      }
    },
    // 发送验证码
    send() { 
      let that = this;
      this.$fly
        .request({
          method: "post",
          url: "/fx/Register/getCode",
          body: {
            phone: that.phone
          }
        })
        .then(res => {
          if (res.code == 1) {
            wx.showToast({
              title: res.msg,
              duration: 1500
            });
          } else {
            wx.showToast({
              title: res.msg,
              icon: "none",
              duration: 1500
            });
          }
        });
    },
    // 下一步
    next() {
      // 开发测试
      wx.navigateTo({
        url: "../reg_device/main"
      });

      this.$fly
        .request({
          method: "",
          url: "/fx/Register/register",
          body: {
            uid: this.uid,
            name: this.name,
            phone: this.phone,
            account_name: this.account_name,
            bank_code: this.bank_code,
            bank_name: this.bank_name,
            branch: this.branch,
            account: this.account,
            code: this.code
          }
        })
        .then(res => { 
          if (res.code == 1) {
            wx.navigateTo({
              url: "../reg_device/main"
            });
          }
        });
    },
    // 获取银行列表
    getbank() {
      var that = this;
      this.$fly
        .request({
          method: "post",
          url: "/fx/Info/getBank"
        })
        .then(res => {
          if (res.code == 1) {
            that.bankList = res.data;
          }
        });
    }
  },
  onShow() {
    this.getbank();
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.pageMain {
  min-height: 100vh;
  background: #f5f5fa;

  .bottom {
    padding-top: 30px;
    width: 300px;
    margin: 0 auto;
    .botTip {
      font-size: 12px;
      text-align: center;
      font-weight: 400;
      color: rgba(255, 81, 81, 1);
      line-height: 17px;
    }
  }
}
</style>
 

