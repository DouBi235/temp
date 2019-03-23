// pages/uqianbao/uqianbao.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.gd.imgUrl,
    balance: 0,
    dianj: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  onShow: function() {
    this._getbalance();
  },
  pay: function(e) {
    this.setData({
      dianj: false
    })
    setTimeout(()=>{
      this.setData({
        dianj: true
      })
    },1000)
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    let price = Number(e.currentTarget.dataset.money);
    wx.request({
      url: app.gd.globalUrl + 'ubi/Oilhp/pay',
      data: {
        price: price,
        uid: app.gd.uid
      },
      method: 'POST',
      success: (p) => {
        wx.hideLoading();
        console.log(p)
        let payData = p.data.data;
        wx.requestPayment({
          timeStamp: payData.timeStamp,
          nonceStr: payData.nonceStr,
          package: payData.package,
          signType: payData.signType,
          paySign: payData.paySign,
          success: (res) => {
            console.log(res)
            if (res.errMsg == 'requestPayment:ok') {
              this._getbalance();
              this._ifpay(payData.inc_id)
            }
          },
          fail: (res) => {},
          complete: (res) => {},
        })
      },
      fail: (res) => {},
      complete: (res) => {},
    })

  },
  navxiaofei: function() {
    wx.navigateTo({
      url: '../xiaofeipage/xiaofeipage',
    })
  },
  navchongzhi: function() {
    wx.navigateTo({
      url: '../chongzhipage/chongzhipage',
    })
  },
  navmima: function() {
    wx.navigateTo({
      url: '../mimapage/mimapage',
    })
  },
  _ifpay: function(id) {
    wx.request({
      url: app.gd.globalUrl + 'ubi/Oilhp/ifPay',
      data: {
        ifPay: id,
        uid: app.gd.uid
      },
      method: 'POST',
      success: (res) => {
        console.log(res);
        if (res.data.code == 2) {
          wx.showModal({
            title: "提示",
            content: res.data.msg,
            showCancel: false,
            confirmText: '设置',
            confirmColor: '#09bb07',
            success: (res) => {
              wx.navigateTo({
                url: '../wangji/wangji?act=set',
              })
            },
          })
        } else if (res.data.code == 1) {
          wx.showToast({
            title: res.data.msg,
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
      complete: (res) => {},
    })
  },
  _getbalance: function() {
    wx.request({
      url: app.gd.globalUrl + 'ubi/Oilhp/getMoney',
      data: {
        uid: app.gd.uid
      },
      method: 'POST',
      success: (res) => {
        console.log(res);
        if (res.data.code == 1) {
          this.setData({
            balance: res.data.data
          })
        } else {
          this.setData({
            balance: '--'
          })
        }
      },
      fail: (res) => {},
      complete: (res) => {},
    })
  }
})