// pages/tixian/tixian.js
const app = getApp();
Page({
  data: {
    // 图片路径
    imgUrl: app.gd.imgUrl,
    // 银行列表
    bankList: [],
    // 开户名
    item1: '',
    // 开户行
    item2: {
      name: '请选择开户行',
      code: 0
    },
    // 分行
    item3: '',
    // 卡号
    item4: '',
    updata: ''
  },
  onLoad: function(options) {
    this.moneyInfo();
    this.getBankList();
  },
  // 获取信息
  moneyInfo: function() {
    wx.request({
      url: app.gd.globalUrl + 'ubi/Popup/moneyInfo',
      data: {
        uid: app.gd.uid
      },
      method: 'POST',
      success: (res) => {
        if (res.data.code == 1) {
          let {
            account,
            bank_branch,
            bank_name,
            code,
            name
          } = res.data.data;
          this.setData({
            item1: bank_name,
            item2: {
              name: name,
              code: code
            },
            item3: bank_branch,
            item4: account,
            updata: true,
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500,
          })
        }
      },
    })
  },
  // 获取开户行列表
  getBankList: function() {
    wx.request({
      url: app.gd.globalUrl + 'ubi/Popup/bank',
      method: 'GET',
      success: (res) => {
        console.log("bankList", res)
        if (res.data.code == 1) {
          this.setData({
            bankList: res.data.data
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500,
          })
        }
      },
    })
  },
  // 提交
  subData: function() {
    let d = this.data;
    // 填写为true，未填写为false，
    if (!d.item1 || !d.item2 || !d.item3 || !d.item4) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none',
        duration: 1500,
      })
      return;
    }
    wx.request({
      url: app.gd.globalUrl + 'ubi/Popup/updateInfo',
      data: {
        uid: app.gd.uid,
        bank_name: d.item1,
        bank_code: d.item2.code,
        bank_branch: d.item3,
        account: d.item4,
      },
      method: 'POST',
      success: (res) => {
        if (res.data.code == 1) {
          wx.showToast({
            title: res.data.msg,
            duration: 1500,
            complete: function(res) {
              let timer = setTimeout(function() {
                wx.navigateBack({
                  delta: 1,
                })
                clearTimeout(timer)
              }, 1500)
            },
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500,
          })
        }
      },
    })
  },
  // 开户行
  kaihuh: function(e) {
    this.setData({
      item2: this.data.bankList[e.detail.value]
    })
  },
  // 开户名
  kaihum: function(e) {
    this.setData({
      item1: e.detail.value
    })
  },
  // 分行
  fenh: function(e) {
    this.setData({
      item3: e.detail.value
    })
  },
  // 卡号
  kah: function(e) {
    this.setData({
      item4: e.detail.value
    })
  },
})