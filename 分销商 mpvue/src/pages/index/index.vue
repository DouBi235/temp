<template>
  <div class="indexPage">
    <div style="position: fixed;top: 0;width:100%;z-index: 10;">
      <div class="bg-white indexheadbg frsac">
        <div class="fcsbc">
          <img class="imgImg" src="../../../static/images/idx172.png" alt>
          <span class="spanLabel">成本</span>
          <span class="spanValue">{{chengben}}</span>
        </div>
        <div class="fcsbc">
          <img class="imgImg" src="../../../static/images/idx272.png" alt>
          <span class="spanLabel">汇款</span>
          <span class="spanValue">{{huikuan}}</span>
        </div>
        <div class="fcsbc">
          <img class="imgImg" src="../../../static/images/idx372.png" alt>
          <span class="spanLabel">收益</span>
          <span class="spanValue">{{shouyi}}</span>
        </div>
      </div>
      <i-tabs :current="current" color="#1EA0FF" @change="changeTab" style="position: relative;">
        <i-tab key="tab1" title="物料供应"></i-tab>
        <div class="tixiantip" v-if="money != 0">可提现
          <div
            style="position:absolute;top:12px;left:14px;overflow:hidden;width:6px;height:6px;background:#ff5f5f; transform:rotate(45deg)"
          ></div>
        </div>
        <i-tab key="tab2" title="物料补充"></i-tab>
      </i-tabs>
    </div>

    <div style="margin-top: 142px;">
      <div class="tabbox" v-show="current === 'tab1'">
        <empty-show text="暂无奖励记录" v-if="gongyingList.length === 0"></empty-show>
        <block v-else>
          <div class="listtop frsbc">
            <div>
              <p class="tip">有可结算金额(每7天可提现一次)</p>
              <p class="right">
                <span class="num">{{money}}</span>元
              </p>
            </div>
            <div style="width: 152px;">
              <i-button @click="tixian" size="small" :disabled="disabled" type="primary">提现结算</i-button>
            </div>
          </div>
          <supply-list :list="gongyingList" @detail="getdet"></supply-list>
        </block>
      </div>
      <div class="tabbox" v-show="current === 'tab2'">
        <empty-show text="暂无补货记录" v-if="buhuoList.length === 0"></empty-show>
        <replenishment-list :list="buhuoList" v-else></replenishment-list>
      </div>
    </div>
    <login-layer @login="clickLogin" v-if="!userInfo"></login-layer>
  </div>
</template>

<script>
import login from "@/utils/login";
import loginLayer from "@/components/loginLayer";
import emptyShow from "@/components/empty";
import supplyList from "@/components/supplyList";
import replenishmentList from "@/components/replenishmentList";
export default {
  data() {
    return {
      current: "tab1", // 当前选择
      chengben: "", //
      huikuan: "", //
      shouyi: "", //
      money: 0, //可提现金额

      gongyingList: [], // 列表
      gongyingpage: 1, // 当前页
      gongyingrows: 1, // 总页数
      gongyingcount: "", // 总条数
      buhuoList: [],
      buhuopage: 1,
      buhuorows: 1,
      buhuocount: "",
      userInfo: false
    };
  },
  computed: {
    uid() {
      return this.globalData.uid;
    }
  },
  components: {
    loginLayer,
    emptyShow,
    supplyList,
    replenishmentList
  },
  methods: {
    // 供应详情
    getdet(data) {
      if (data.status == 1) {
        wx.navigateTo({
          url: "../orderDet/main?id=" + data.id
        });
      } else if (data.status == 2) {
        wx.navigateTo({
          // auditDet  接受参数 status 0未审核    1通过     2 驳回
          url: "../auditDet/main?id=" + data.id + "&status=" + 1
        });
      }
    },
    // tab 改变
    changeTab(e) {
      this.current = e.mp.detail.key;
      if (this.current == "tab1") this.getgongying();
      else this.getbuhuo();
    },
    // 点击登录
    clickLogin() {
      login(this._loginCallback, this);
    },
    // 登录回调
    _loginCallback(res) {
      if (res.data.code == 1) {
        let resdata = res.data.data;
        if (resdata.skip == 1) {
          wx.redirectTo({
            url: "../reg_agreement/main"
          });
        } else if (resdata.skip == 2) {
          wx.redirectTo({
            url: "../reg_device/main"
          });
        } else if (resdata.skip == 3) {
          wx.redirectTo({
            url: "../reg_audit/main"
          });
        }
        this.globalData.uid = resdata.uid;
        this.globalData.skip = resdata.skip; //1 注册页 2 提交审核页 3 审核状态页 4 首页
        this.globalData.openid = resdata.openid;
        this.globalData.unionId = resdata.unionId;
        this.globalData.promo_code = resdata.promo_code; //推广码
        this.globalData.audit_status = resdata.audit_status; //审核状态0-为审核，1-审核已通过，2-审核已驳回 3-取消区域申请中 4-取消区域通过 5-取消区域驳回
        this.globalData.userInfo = resdata.userInfo;
        this.userInfo = true;
        this.getdata();
      } else {
      }
    },
    // 提现操作
    tixian: function() {
      this.$fly
        .request({
          method: "post",
          url: "/fx/Income/deposit"
        })
        .then(res => {
          if (res.code == 1) {
          } else {
            wx.showToast({
              title: res.msg,
              icon: "none",
              duration: 1500
            });
          }
        });
    },
    // 获取供应列表
    getgongying: function() {
      if (this.gongyingpage > this.gongyingrows) {
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
          url: "/fx/Income/facSupply",
          body: {
            page: this.gongyingpage
          }
        })
        .then(res => {
          if (res.code == 1) {
            let li = this.gongyingList;
            for (let i = 0; i < res.data.list.length; i++) {
              li.push(res.data.list[i]);
            }
            this.gongyingList = li;
            this.gongyingpage++;
            this.gongyingrows = res.data.rows;
            this.gongyingcount = res.data.count;
          } else {
            wx.showToast({
              title: res.msg,
              icon: "none",
              duration: 1500
            });
          }
        });
    },
    // 获取补货列表
    getbuhuo: function() {
      if (this.buhuopage > this.buhuorows) {
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
          url: "/fx/Income/FacMend",
          body: {
            page: this.buhuopage
          }
        })
        .then(res => {
          if (res.code == 1) {
            let li = this.buhuoList;
            for (let i = 0; i < res.data.list.length; i++) {
              li.push(res.data.list[i]);
            }
            this.buhuoList = li;
            this.buhuopage++;
            this.buhuorows = res.data.rows;
            this.buhuocount = res.data.count;
          } else {
            wx.showToast({
              title: res.msg,
              icon: "none",
              duration: 1500
            });
          }
        });
    },
    // 获取 成本 回款  收益 及可提现金额
    IncomeTotal() {
      this.$fly
        .request({
          method: "post",
          url: "/fx/Income/IncomeTotal"
        })
        .then(res => {
          if (res.code == 1) {
            let {
              cost: chengben,
              returned: huikuan,
              earnings: shouyi,
              money: money
            } = res.data;
            this.chengben = chengben;
            this.huikuan = huikuan;
            this.shouyi = shouyi;
            this.money = money;
          } else {
            wx.showToast({
              title: res.msg,
              icon: "none",
              duration: 1500
            });
          }
        });
    },
    getdata() {
      this.IncomeTotal();
      this.getgongying();
      this.getbuhuo();
    }
  },
  created() {
    // 假如没有uid 说明没有登录 ，就去登录
    if (this.uid == "") {
      login(this._loginCallback, this);
    }
  },
  onShow() {
    if (this.uid != "") {
      this.gongyingpage = 1;
      this.buhuopage = 1;
      this.gongyingList = [];
      this.buhuoList = [];
      this.IncomeTotal();
      this.getgongying();
      this.getbuhuo();
    }
  },
  onReachBottom() {
    if (this.current == "tab2") {
      this.getbuhuo();
    } else if (this.current == "tab1") {
      this.getgongying();
    }
  }
};
</script>

<style lang="scss" scoped>
.indexPage {
  min-height: 100vh;
  min-width: 100vw;
  background: #f5f5fa;
  .tixiantip {
    position: absolute;
    color: #fff;
    background: #ff5f5f;
    width: 34px;
    height: 15px;
    font-size: 8px;
    font-weight: 400;
    line-height: 15px;
    left: 78px;
    top: -5px;
    text-align: center;
    border-radius: 3px;
  }
  .indexheadbg {
    width: 375px;
    height: 100px;
    background: #fff;

    .imgImg {
      width: 36px;
      height: 36px;
      background: rgba(240, 240, 240, 1);
    }
    .spanLabel {
      font-size: 10px;
      font-weight: 400;
      color: rgba(115, 115, 125, 1);
      line-height: 14px;
      margin-top: 4px;
    }
    .spanValue {
      font-size: 16px;
      font-weight: 700px;
      color: rgba(30, 35, 40, 1);
      line-height: 18px;
      margin-top: 4px;
    }
    .imgImg {
      height: 36px;
      width: 36px;
      border-radius: 50%;
    }
  }
  .tabbox {
    height: calc(100vh - 200px);
    .listtop {
      width: 375px;
      height: 60px;
      background: #fff;
      margin-bottom: 10px;
      padding: 11px 15px;
      padding-right: 5px;
      .tip {
        font-size: 10px;
        font-weight: 400;
        color: rgba(150, 155, 165, 1);
        line-height: 14px;
      }
      .right {
        width: 160px;
        font-size: 12px;
        font-weight: 400;
        color: rgba(150, 155, 165, 1);
        line-height: 17px;
        padding-right: 15px;
        text-align: left;
        .num {
          margin-right: 5px;
          font-size: 20px;
          font-weight: 700;
          color: rgba(30, 159, 253, 1);
          line-height: 29px;
        }
      }
    }
  }
}
</style>
 