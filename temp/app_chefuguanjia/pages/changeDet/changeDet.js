// pages/bindDevice/bindDevice.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.gd.imgUrl,
    shopName: '',
    obdid: '',
    company: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.company) {
      this.setData({
        company: options.company,
        obdid: options.obdid,
        lat: options.lat,
        lng: options.lng
      })
    }
  },
  skipRepairShop: function() {
    wx.navigateTo({
      url: '../repairShop/repairShop',
    })
  },
  changeBtn: function() {
    let that = this;
    console.log('维修厂id' + that.data.shopInfo)
    let openid = wx.getStorageSync("openid");
    if (!that.data.shopInfo) {
      wx.showToast({
        title: '请选择车辆管家',
        icon: 'none',
        duration: 1500,
        mask: true,
      })
      return false;
    }
    wx.request({
      url: app.gd.globalUrl + 'ubi/upBinding',
      data: {
        uid: app.gd.uid,
        obdid: that.data.obdid,
        sid: that.data.shopInfo.sid,
        km: that.data.fristM,
        openid: openid
      },
      method: 'POST',
      success: function(res) {
        console.log("点击确认更换 设备", res)
        if (res.data.code == 1) {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false,
            confirmText: '确定',
            confirmColor: '#09bb07',
            success: function(res) {
              wx.navigateBack({
                delta: 1,
              })
            },
          })
        } else if (res.data.code == 0) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500,
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //吊起地图
  mapBlock: function() {
    var that = this;
    if (that.data.company == null) {
      wx.showModal({
        title: '提示',
        content: '您没有选择店铺',
        showCancel: false,
      })
      return false;
    }
    wx.openLocation({
      latitude: Number(that.data.lat),
      longitude: Number(that.data.lng),
      scale: 16,
      name: that.data.company,
      success: function(res) {
        console.log(res);
      },
      fial(err) {
        console.log(err);
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})