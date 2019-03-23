// pages/subscribe/subscribe.js
const app = getApp();
let util = require('../../utils/util.js');
let startDate = util.getDateTo(3);
let endDate = util.getDateTo(180);
Page({

  /**
   * 页面的初始数据
   */
  data: {
      imgUrl: app.gd.imgUrl,
    id: '',
    product: {},
    dateStart: startDate,
    dateEnd: endDate,
    selectData: startDate,
    shopInfo: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id
    })
    this.record(options.id);
  },
  record: function(id) {
    let that = this;
    wx.request({
      url: app.gd.globalUrl + 'ubi/Product/record',
      data: {
        id: id
      },
      method: 'POST',
      success: function(res) {
        that.setData({
          product: res.data.data
        })
      },
    })
  },
  bindDateChange: function(e) {
    this.setData({
      selectData: e.detail.value
    });
  },
  navShop: function() {
    wx.navigateTo({
      url: '../repairShop/repairShop',
    })
  },
  submit: function() {
    let that = this;
    if (that.data.shopInfo == '') {
      wx.showToast({
        title: '请选择店铺',
        icon: 'none',
        duration: 1500,
      })
    } else {
      wx.request({
        url: app.gd.globalUrl + 'ubi/Product/reservation',
        data: {
          uid: app.gd.uid,
          makeTime: that.data.selectData,
          fid: that.data.id,
          sid: that.data.shopInfo.id
        },
        method: 'POST',
        success: function(res) {
          if (res.data.code == 1) {
            wx.showToast({
              title: res.data.msg,
              duration: 1500,
            })
            wx.navigateBack({
              delta: 1,
            })
            wx.navigateTo({
              url: '../mine_od/mine_od',
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
    }
  }
})