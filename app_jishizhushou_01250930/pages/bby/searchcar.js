const app = getApp()
Page({
  data: {
    isFocus: false,
    Value: "",
    hadyzm: false,
    getyzmbtn: '获取验证码',
    timer: 59,
    carinfo: {},
    utel: '',
    ctid: ''
  },
  Focus(e) {
    this.setData({
      Value: e.detail.value
    })
  },
  Tap() {
    this.setData({
      isFocus: true
    })
  },
  toddatacar: function() {
    wx.showLoading({
      title: '请稍候',
      mask: true
    })

    wx.request({
      url: app.globalData.url + '/worker/Bang/getCarType',
      data: {
        car_type_id: this.data.ctid
      },
      success: (res) => {
        wx.hideLoading()
        if (res.data.code == 1) {
          wx.setStorage({
            key: 'ctlist',
            data: res.data.data.list,
            success: () => {
              wx.navigateTo({
                url: '/pages/list/datacar'
              })
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '抱歉，您的车型暂无更详细的数据',
            showCancel: false,
            confirmColor: '#1070ff'
          })
        }
      }
    })
  },
  getyzm() {
    if (this.data.hadyzm) {
      return;
    }
    this.setData({
      hadyzm: true
    })

    var info = this.data.carinfo
    wx.request({
      url: app.globalData.url + '/worker/bang/vcode',
      method: "POST",
      data: {
        phone: info.phone,
        card_number: info.plate
      },
      success: (res) => {
        var msg = res.data.msg
        if (msg.length > 6) {
          wx.showModal({
            title: '提示',
            content: msg,
            confirmColor: '#1070ff',
            showCancel: false
          })
          this.setData({
            hadyzm: false
          })
        } else {
          this.timebegin()
          wx.showModal({
            title: '提示',
            content: '短信发送成功',
            confirmColor: '#1070ff',
            showCancel: false
          })
        }
      }
    })
  },
  submit: function() {
    wx.showLoading({
      title: '处理中',
      mask: true
    })

    var info = this.data.carinfo
    var obj = {
      phone: info.phone,
      code: this.data.Value,
      userid: info.userid,
      filter: info.filter,
      litre: info.litre,
      card_number: info.card_number,
      oid: info.oid,
      cid: info.cid,
      uid: app.globalData.uid,
      oil: info.oil,
      hour_charge: info.hour_charge
    }
    wx.request({
      url: app.globalData.url + '/worker/bang/handle',
      method: "POST",
      data: obj,
      success: (res) => {
        wx.hideLoading()
        wx.showModal({
          title: '提示',
          content: res.data.msg,
          confirmColor: '#1070ff',
          showCancel: false,
          success: (tap) => {
            if (res.data.code == 1) {
              wx.navigateBack()
            }
          }
        })
      }
    })
  },
  timebegin: function() {

    this.setData({
      getyzmbtn: '60s'
    })
    var timestart = setInterval(() => {
      if (this.data.timer > 0) {
        this.setData({
          getyzmbtn: this.data.timer + 's'
        })
        this.data.timer -= 1
      } else {
        this.setData({
          hadyzm: false,
          getyzmbtn: '获取验证码'
        })
        this.data.timer = 59
        clearInterval(timestart)
      }
    }, 1000);
  },
  onShow: function() {

    wx.getStorage({
      key: 'carinfo',
      success: (res) => {
        var thetel = res.data.phone
        var ctid = res.data.car_type_id
        this.setData({
          ctid: ctid,
          carinfo: res.data,
          utel: thetel.substr(thetel.length - 4)
        })
      }
    })
  }
})