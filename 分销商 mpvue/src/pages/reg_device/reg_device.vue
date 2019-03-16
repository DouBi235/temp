<template>
  <div class="pageMain">
    <i-panel>
      <view class="bg-white">
        <div class="deviceBox">
          <img class="device_img" src="../../../static/images/reg_device.png" alt>
          <span class="device_text">选择订货数量</span>
        </div>
        <i-divider></i-divider>
        <div class="frsbc" style="padding: 0 15px 20px 15px; ">
          <view
            :class="[ btnSelect == 1? ' unselect isselect': 'unselect']"
            data-index="1"
            @click="select"
          >1000台</view>
          <view
            :class="[ btnSelect == 2? ' unselect isselect': 'unselect']"
            data-index="2"
            @click="select"
          >500台</view>
          <view
            :class="[ btnSelect == 3? ' unselect isselect': 'unselect']"
            data-index="3"
            @click="select"
          >少于100台</view>
        </div>
      </view>
    </i-panel>
    <div style="height: 10px;width: 100%;background: #F5F5FA;" v-if="btnSelect == 3"></div>
    <i-panel v-if="btnSelect == 3">
      <i-input
        :value="numvalue"
        maxlength="3"
        @change="inputnum"
        type="text"
        title="订货数量"
        placeholder="请输入订货数量"
        right
      />
    </i-panel>
    <div style="height: 10px;width: 100%;background: #F5F5FA;"></div>
    <i-panel>
      <view class="bg-white">
        <div class="meneyi">
          <div class="frsbc meneytop">
            <span>价格(元)</span>
            <img src="../../../static/images/help.png" alt>
          </div>
          <p class="labp">
            <span>{{price}}</span>元
          </p>
        </div>
        <div class="viewimg">
          <div class="imgi" @click="upfile" v-if="imgurl == ''">
            <p class="jia">+</p>
            <p class="zi">上传支付凭证</p>
          </div>
          <img class="imgimg" :src="imgurl" alt v-if="imgurl" mode="aspectFill">
          <p>查看对公账户信息 ></p>
        </div>
      </view>
    </i-panel>
    <i-panel title="服务区域" v-if="btnSelect != 3">
      <view class="bg-white">
        <my-picker
          @change="fuwushengchange"
          :list="fuwushenglist"
          :index="fuwushengindex"
          :init="fuwushenginit"
          title="省份"
        ></my-picker>
        <i-cell-group @click="changeshishou">
          <i-cell title="选择市" is-link :value="num"></i-cell>
        </i-cell-group>
        <i-radio-group :current="fuwushiname" @change="checkChange" v-if="shishow">
          <i-radio
            v-for="(item,index) in fuwushilist"
            :key="index"
            position="right"
            :value="item.name"
          ></i-radio>
        </i-radio-group>
        <!-- <i-checkbox-group :current="fuwushiname" @change="checkChange" v-if="shishow">
          <i-checkbox
            v-for="(item,index) in fuwushilist"
            :key="index"
            position="right"
            :value="item.name"
          ></i-checkbox> 
        </i-checkbox-group>-->
      </view>
    </i-panel>
    <receive-addr
      @shengc="shengc"
      :shengl="shengl"
      :shengi="shengi"
      @shic="shic"
      :shil="shil"
      :shii="shii"
      @xianc="xianc"
      :xianl="xianl"
      :xiani="xiani"
      @textc="textc"
    ></receive-addr>
    <div class="bottom">
      <i-button @click="submitbtn" :disabled="disnext" type="primary">提交审核</i-button>
    </div>
  </div>
</template>
<script>
import myPicker from "@/components/myPicker";
import receiveAddr from "@/components/receiveAddr";
export default {
  data() {
    return {
      btnSelect: 1, // 设备台数的选择
      disnext: false, // 提交审核按钮
      fuwushenglist: [], // 服务区域的省
      fuwushengindex: "", // 服务区域的下标
      fuwushengid: "",
      fuwushengname: "",
      fuwushilist: [], // 服务区域的市
      fuwushiindex: "", // 服务区域的下标
      fuwushiid: "",
      fuwushiname: [],
      fuwushenginit: "请选择省份", // 服务区域的选择显示
      shengl: [],
      shengi: "",
      shengid: "",
      shengname: "",
      shil: [],
      shii: "",
      shiid: "",
      shiname: "",
      shishow: false,
      xianl: [],
      xiani: "",
      xianid: "",
      xianname: "",
      textarea: "",
      inputvalue: "", // 默认设备数
      imgurl: "" // 凭证路径
    };
  },
  components: {
    myPicker,
    receiveAddr
  },
  computed: {
    // 订货数量
    numvalue() {
      if (this.btnSelect == 1) {
        return 1000;
      } else if (this.btnSelect == 2) {
        return 500;
      } else {
        return this.inputvalue <= 100 ? this.inputvalue : 100;
      }
    },
    // 价格
    price() {
      return 868 * this.numvalue;
    },
    num() {
      return this.fuwushiname.length;
    }
  },
  methods: {
    changeshishou() {
      if (this.fuwushilist.length == 0) {
        wx.showToast({
          title: "请先选择省",
          icon: "none",
          duration: 1500
        });
        return;
      }
      console.log(this.shishow);
      this.shishow = !this.shishow;
    },
    submitbtn() {
      this.$fly
        .request({
          method: "post",
          url: "/fx/FillUp/FillUp",
          body: {
            verchar: this.imgurl, //支付凭证
            number: this.numvalue, //设备数量
            money: this.price, //设备金额
            province: this.shengid, //省id
            city: this.shiid, // 市id
            county: this.xianid, //县id
            goods_detail: this.textarea, //详细收货地址
            server_province: this.fuwushengid, //服务省id 申请100台或以下时 为0或者不传
            server_city: this.fuwushiid // 	服务县id 申请100台或以下时 为0或者不传
          }
        })
        .then(res => {
          if (res.code == 1) {
            wx.showToast({
              title: res.msg,
              icon: "none",
              duration: 1500
            });
            let t = setTimjeout(function() {
              wx.reLaunch({
                url: "../reg_audit/main"
              });
              clearTimeout(t);
            }, 1500);
          } else {
            wx.showToast({
              title: res.msg,
              icon: "none",
              duration: 1500
            });
          }
        });
    },
    // 服务区域选择市
    checkChange(e) {
      const index = this.fuwushiname.indexOf(e.mp.detail.value);
      index === -1
        ? this.fuwushiname.push(e.mp.detail.value)
        : this.fuwushiname.splice(index, 1);
    },
    // 订货数量100台以下  的输入
    inputnum(e) {
      this.inputvalue = e.mp.detail.detail.value;
    },
    // 选择服务区域的省
    fuwushengchange(e) {
      this.fuwushengindex = e.mp.detail.value;
      for (let i = 0; i < this.fuwushenglist.length; i++) {
        if (i == this.fuwushengindex) {
          this.fuwushengid = this.fuwushenglist[i].id;
          this.fuwushengname = this.fuwushenglist[i].name;
        }
      }
      this.getfuwushi();
    },
    // 选择收货省
    shengc(e) {
      this.shengi = e.mp.detail.value;
      for (let i = 0; i < this.shengl.length; i++) {
        if (i == this.shengi) {
          this.shengid = this.shengl[i].id;
          this.shengname = this.shengl[i].name;
        }
      }
      this.getshi();
    },
    // 选择收货市区
    shic(e) {
      this.shii = e.mp.detail.value;
      for (let i = 0; i < this.shil.length; i++) {
        if (i == this.shii) {
          this.shiid = this.shil[i].id;
          this.shiname = this.shil[i].name;
        }
      }
      this.getxian();
    },
    // 选择收货区县
    xianc(e) {
      this.xiani = e.mp.detail.value;
      for (let i = 0; i < this.xianl.length; i++) {
        if (i == this.xiani) {
          this.xianid = this.xianl[i].id;
          this.xianname = this.xianl[i].name;
        }
      }
    },
    // 收货地址详情输入
    textc(e) {
      console.log(e);
      this.textarea = e.mp.detail.value;
    },
    // 订货台数选择
    select(e) {
      this.btnSelect = e.mp.currentTarget.dataset.index;
      if (this.btnSelect == 3) {
        this.fuwushengid = 0;
        this.fuwushiid = 0;
      }
    },
    // 上传文件
    upfile() {
      wx.chooseImage({
        count: 1,
        sizeType: ["original"],
        sourceType: ["album"],
        success: res => {
          if (res.errMsg == "chooseImage:ok") {
            wx.uploadFile({
              url: this.globalData.url + "/fx/FillUp/files",
              filePath: res.tempFilePaths[0],
              name: "image",
              header: {
                "Content-Type": "multipart/form-data"
              },
              formData: {
                uid: this.globalData.uid
              },
              success: res => {
                this.imgurl = JSON.parse(res.data);
              },
              fail: function(res) {
                wx.showToast({
                  title: res.msg,
                  icon: "none",
                  duration: 1500
                });
              }
            });
          } else {
            wx.showToast({
              title: res.errMsg,
              icon: "none",
              duration: 1500
            });
          }
        },
        fail: function(res) {
          wx.showToast({
            title: res.msg,
            icon: "none",
            duration: 1500
          });
        }
      });
    },
    // 获取服务市
    getfuwushi() {
      this.$fly
        .request({
          method: "post",
          url: "/fx/FillUp/serCity",
          body: {
            pid: this.fuwushengid
          }
        })
        .then(res => {
          if (res.code == 1) {
            this.fuwushilist = res.data;
          } else {
            wx.showToast({
              title: res.msg,
              icon: "none",
              duration: 1500
            });
          }
        });
    },
    // 获取服务区域的省
    getfuwusheng() {
      this.$fly
        .request({
          method: "post",
          url: "/fx/FillUp/serProvince"
        })
        .then(res => {
          if (res.code == 1) {
            this.fuwushenglist = res.data;
          } else {
            wx.showToast({
              title: res.msg,
              icon: "none",
              duration: 1500
            });
          }
        });
    },
    // 获取收货省
    getpro() {
      this.$fly
        .request({
          method: "post",
          url: "/fx/FillUp/Province"
        })
        .then(res => {
          if (res.code == 1) {
            this.shengl = res.data;
          } else {
            wx.showToast({
              title: res.msg,
              icon: "none",
              duration: 1500
            });
          }
        });
    },
    // 获取收货市区
    getshi() {
      this.$fly
        .request({
          method: "post",
          url: "/fx/FillUp/City",
          body: {
            pid: this.shengid
          }
        })
        .then(res => {
          if (res.code == 1) {
            this.shil = res.data;
          } else {
            wx.showToast({
              title: res.msg,
              icon: "none",
              duration: 1500
            });
          }
        });
    },
    // 获取收货区县
    getxian() {
      this.$fly
        .request({
          method: "post",
          url: "/fx/FillUp/City",
          body: {
            pid: this.shiid
          }
        })
        .then(res => {
          if (res.code == 1) {
            this.xianl = res.data;
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
    this.getpro();
    this.getfuwusheng();
  }
};
</script>

<style lang="scss" scoped>
.pageMain {
  min-height: 100vh;
  background: #f5f5fa;
  padding-bottom: 30px;
  .deviceBox {
    width: 100vw;
    .device_img {
      height: 84px;
      width: 84px;
      display: block;
      margin: 20px auto 0;
    }
    .device_text {
      font-size: 14px;
      display: block;
      font-weight: 400;
      color: rgba(30, 35, 40, 1);
      line-height: 20px;
      text-align: center;
      margin: 0 auto;
    }
  }
  .unselect {
    width: 108px;
    height: 40px;
    border: 1px solid rgba(200, 200, 210, 1);
    color: #73737d;
    text-align: center;
    line-height: 40px;
    font-size: 14px;
    font-weight: 400;
    line-height: 40px;
  }
  .isselect {
    background: rgba(30, 160, 255, 1);
    color: #fff;
    border: none;
  }
  .meneyi {
    width: 375px;
    height: 80px;
    background: #fff;
    padding: 10px 15px 20px;
    .meneytop {
      width: 345px;
      margin: 0 auto;
      span {
        font-size: 12px;
        font-weight: 400;
        color: rgba(115, 115, 125, 1);
        line-height: 17px;
      }
      img {
        width: 18px;
        height: 18px;
      }
    }
    .labp {
      text-align: center;
      font-size: 12px;
      font-weight: 400;
      color: rgba(115, 115, 125, 1);
      line-height: 17px;
      span {
        font-size: 25px;
        font-weight: 700;
        color: rgba(30, 160, 255, 1);
        line-height: 29px;
        margin-right: 5px;
      }
    }
  }
  .viewimg {
    width: 375px;
    height: 144px;
    background: rgba(255, 255, 255, 1);
    padding: 0 15px;
    .imgimg {
      width: 345px;
      height: 100px;
      border: 1px dashed #c8c8d2;
    }
    .imgi {
      width: 345px;
      height: 100px;
      background: rgba(255, 255, 255, 1);
      border: 1px dashed rgba(230, 230, 235, 1);
      margin: 0 auto;
      p {
        text-align: center;
        color: rgba(115, 115, 125, 1);
        font-weight: 400;
      }
      .jia {
        font-size: 50px;
        line-height: 60px;
      }
      .zi {
        font-size: 12px;
        line-height: 17px;
      }
    }
    p {
      text-align: right;
      font-size: 12px;
      font-weight: 400;
      color: rgba(255, 81, 81, 1);
      line-height: 44px;
    }
  }
  .bottom {
    width: 300px;
    margin: 30px auto;
  }
}
</style>
 

