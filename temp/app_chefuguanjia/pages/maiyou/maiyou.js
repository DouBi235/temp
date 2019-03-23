// pages/maiyou/maiyou.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    priceres: {
      actual_price: "0",
      litre: "0",
      oil_name: "0",
      platform_money: 0,
      ratio: "0",
      user_price: "0",
      youzhan: ''
    },
    inputprice: '',
    oil: {},
    hidep: true,
    yuangong: [],
    selectp: {},
    passshow: true,
    pass: ''
  },
  showpass: function() {
    if (this.data.inputprice == 0) {
      wx.showToast({
        title: '请输入金额',
        icon: 'none',
        duration: 1500,
        mask: true,
      })
      return;
    }
    this._ismima();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      oil: JSON.parse(options.o)
    })
  },
  onShow: function() {
    this._getyuangong()
  },
  inputprice: function(e) {
    this.setData({
      inputprice: e.detail.value
    })
    wx.request({
      url: app.gd.globalUrl + 'ubi/Oilhp/related',
      data: {
        oils_id: this.data.oil.id,
        price: e.detail.value,
        uid: app.gd.uid
      },
      method: 'POST',
      success: (res) => {
        console.log(res)
        if (res.data.code == 1) {
          this.setData({
            priceres: res.data.data
          })
        } else {
          this.setData({
            priceres: {
              actual_price: "0",
              litre: "0",
              oil_name: "0",
              platform_money: 0,
              ratio: "0",
              user_price: "0",
            }
          })
        }
      },
      fail: (res) => {},
      complete: (res) => {},
    })
  },
  xuanze: function() {
    this.setData({
      hidep: false
    })
  },
  close: function() {
    this.setData({
      hidep: true
    })
  },
  change: function(e) {
    console.log(e.detail.value[0])
    this.setData({
      selectp: this.data.yuangong[e.detail.value[0]]
    })
  },
  cancel: function() {
    this.setData({
      passshow: true
    })
  },
  confirm: function(e) {
    console.log(e)
    this.close();
  },
  tppay: function(e) {
    this.setData({
      passshow: true
    })
    let d = this.data;
    let data = {
      oil_name: d.priceres.oil_name,
      actual_price: d.priceres.actual_price,
      platform_money: d.priceres.platform_money,
      user_price: d.priceres.user_price,
      litre: d.priceres.litre,
      ratio: d.priceres.ratio,

      oil_shop_id: d.oil.sid,
      oil_id: d.oil.id,

      price: d.inputprice,
      pay_code: d.pass,

      uid: app.gd.uid,
      o_id: d.selectp.o_id,
    }
    wx.request({
      url: app.gd.globalUrl + 'ubi/Oilhp/checkPay',
      data: data,
      method: 'POST',
      success: (res) => {
        console.log(res)
        if (res.data.data.code == 1) {
          wx.showToast({
            title: res.data.msg,
            icon: '',
            duration: 1500,
            mask: true,
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500,
            mask: true,
          })
        }
      },
      fail: (res) => {},
      complete: (res) => {

      },
    })
  },
  inputpass: function(e) {
    this.setData({
      pass: e.detail.value
    })
  },
  _getyuangong: function() {
    wx.request({
      url: app.gd.globalUrl + 'ubi/Oilhp/oilsDetails',
      data: {
        oil_shop_id: this.data.oil.sid,
        oil_id: this.data.oil.id
      },
      method: 'POST',
      success: (res) => {
        console.log(res)
        if (res.data.code == 1) {
          this.setData({
            youzhan: res.data.data.shop,
            yuangong: res.data.data.team,
            selectp: res.data.data.team[0]
          })
        } else {
          this.setData({
            yuangong: []
          })
        }
      },
      fail: (res) => {},
      complete: (res) => {},
    })
  },
  _ismima: function() {
    wx.request({
      url: app.gd.globalUrl + 'ubi/Oilhp/ifPas',
      data: {
        uid: app.gd.uid
      },
      method: 'POST',
      success: (res) => {
        console.log(res)
        if (res.data.code != 1) {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#888',
            confirmText: '好的',
            confirmColor: '#09bb07',
            success: (res) => {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../wangji/wangji?act=set',
                })
              }
            },
          })
        } else {
          this.setData({
            passshow: false
          })
        }
      },
      fail: (res) => {},
      complete: (res) => {},
    })
  }
})