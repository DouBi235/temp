// pages/personalInfo/personalInfo.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    phone:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var name = options.name;
    var phone = options.phone;
    this.setData({
      name : name ,
      phone : phone
    });
    var that = this;
    wx.request({
      url: app.globalData.globalUrl + '/st/user/userInfo',
      data: {
        uid: app.globalData.uid,
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 1) {
          that.setData({
            name: res.data.data.name, 
            phone: res.data.data.phone, 
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  inputname: function(e){
    this.setData({
      name: e.detail.value
    })
  },
  inputphone: function(e){
    this.setData({
      phone: e.detail.value
    })
  },
  submitinfo: function () {
    var that = this;
    var name = that.data.name;
    var phone = that.data.phone;
    wx.request({
      url: app.globalData.globalUrl + '/st/user/complete',
      data: {
        uid: app.globalData.uid,
        name: name,
        phone: phone
      },
      method: "POST",
      success: function (res) {
        console.log(res)
        if (res.data.code == 1) {
          wx.showToast({
            title: res.data.msg,
            icon: '', 
            duration: 1500, 
          })
          var index = setTimeout(function () {
            wx.navigateBack({
              delta: 1,
            })
            clearTimeout(index)
          }, 1500);
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  }
})