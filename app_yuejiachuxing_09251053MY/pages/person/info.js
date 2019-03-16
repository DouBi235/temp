const app = getApp()
Page({
  data: {
    phonetip: '',
    uphone: '',
    uname: '',
    uwx:'',
    uread:true
  },
  todoc: function () {
    wx.navigateTo({
      url: '/pages/relief/relief'
    })
  },
  phoneput: function (e) {
    var val = e.detail.value
    if (val && val != parseInt(val)) {
      this.setData({
        phonetip: '请输入格式正确的手机号'
      })
    } else {
      this.setData({
        phonetip: ''
      })
    }
  },
  phoneEnd: function (e) {
    var val = e.detail.value.replace(/\s+/g, "")
    if (val && val.length < 11) {
      this.setData({
        phonetip: '手机号长度应是11位'
      })
    }
  },
  checkboxChange:function(e){
    this.setData({
      uread: !this.data.uread
    })
  },
  formSubmit: function (e) {
    var val = e.detail.value
    if (!val.uphone || !val.uname) {
      wx.showModal({
        title: '提示',
        content: '姓名与手机号必填',
        showCancel: false,
        confirmColor: '#21C5BD'
      })
      return;
    }
    if(!this.data.uread){
      wx.showModal({
        title: '提示',
        content: '请认真阅读免责声明',
        showCancel: false,
        confirmColor: '#21C5BD'
      })
      return;
    }
    wx.request({
      url: 'https://mp.ctbls.com/trip/Personal/add_user',
      method: "POST",
      data: {
        wx_number:val.uwx,
        name: val.uname,
        phone: val.uphone,
        u_id: app.globalData.uid
      },
      success(e) {
        wx.showModal({
          title: '提示',
          content: e.data.msg,
          showCancel: false,
          confirmColor: '#21C5BD',
          success() {
            if (e.data.code) {
              wx.navigateBack()
            }
          }
        })
      }
    })
  },
  onLoad: function (opt) {
    if (opt.from) { return; }
    var that = this
    wx.request({
      url: 'https://mp.ctbls.com/trip/Personal/perfect',
      data: { uid: app.globalData.uid },
      success(e) {
        if (e.data.code) {
          that.setData({
            uphone: e.data.data.phone,
            uname: e.data.data.name,
            uwx: e.data.data.wx_number
          })
        }
      }
    })
  }
})