// pages/wangji/wangji.js
const app = getApp();
let timer;
Page({

  data: {
    phone: '',
    phone1: '',
    text: "发送验证码",
    code: '',
    mima: '',
    mima1: '',
    act: '',
  },
  onLoad: function(options) {
    this.setData({
      act: options.act
    })
  },
  onShow: function() {
    this._getphone();
  },
  clicksubmit: function() {
    if (this.data.act == 'reset') {
      this._resetmima();
    } else if (this.data.act == 'set') {
      this._setmima();
    }
  },
  clickSend: function() {
    if (this.data.text != '发送验证码') {
      wx.showToast({
        title: '请稍候再试',
        icon: 'none',
        duration: 1500,
        mask: true,
      })
      return;
    }
    this.setData({
      text: 10
    })
    let time = this.data.text;
    timer = setInterval(() => {
      time--;
      if (time <= 0) {
        time = '发送验证码';
        clearInterval(timer)
      }
      this.setData({
        text: time
      })
    }, 1000)
    this._sendCode();
  },
  inputcode: function(e) {
    this.setData({
      code: e.detail.value
    })
  },
  inputmima: function(e) {
    this.setData({
      mima: e.detail.value
    })
  },
  inputmima1: function(e) {
    this.setData({
      mima1: e.detail.value
    })
  },
  _setmima: function() {
    wx.request({
      url: app.gd.globalUrl + 'ubi/Oilhp/insPayCode',
      data: {
        password: this.data.mima,
        password2: this.data.mima1,
        uid: app.gd.uid
      },
      method: 'POST',
      success: (res) => {
        console.log(res)
        if (res.data.code == 1) {
          wx.showToast({
            title: res.data.msg,
            icon: '',
            duration: 1500,
            mask: true,
          })
          setTimeout(function(){
            wx.navigateBack({
              delta: 1,
            })
          },1500)
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
  _resetmima: function() {
    wx.request({
      url: app.gd.globalUrl + 'ubi/Oilhp/forgetPayCode',
      data: {
        password: this.data.mima,
        password2: this.data.mima1,
        phone: this.data.phone,
        code: this.data.code,
        uid: app.gd.uid
      },
      method: 'POST',
      success: (res) => {
        console.log(res)
        if (res.data.code == 1) {
          wx.showToast({
            title: res.data.msg,
            icon: '',
            duration: 1500,
            mask: true,
          })
          wx.navigateBack({
            delta: 1,
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
  _getphone: function() {
    wx.request({
      url: app.gd.globalUrl + 'ubi/Oilhp/user',
      data: {
        uid: app.gd.uid
      },
      method: 'post',
      success: (res) => {
        console.log(res)
        let phone = res.data.phone;
        let phone1 = phone.replace(/(\d{3})\d{4}(\d{4})/g, "$1****$2");
        this.setData({
          phone: phone,
          phone1: phone1,
        })
      },
      fail: (res) => {},
      complete: (res) => {},
    })
  },
  _sendCode: function() {
    wx.request({
      url: app.gd.globalUrl + 'ubi/Oilhp/vcode',
      data: {
        mobile: this.data.phone
      },
      method: 'POST',
      success: (res) => {
        console.log(res);
        if (res.data.code == 1) {
          wx.showToast({
            title: res.data.msg,
            duration: 1500,
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            duration: 1500,
          })
        }
      },
      fail: (res) => {},
      complete: (res) => {},
    })
  }
})