// pages/privilege/privilege.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      imgUrl: app.gd.imgUrl,
    list: [],
    bang:'',
    product_introduce: false,
    product_content:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  skipBuyUBI: function() {
    wx.navigateToMiniProgram({
      appId: 'wx5e18e3308b2c6e9f',
    })
  },
  onShow: function() {
    if (app.gd.uid === '') {
      wx.showModal({
        title: '提示',
        content: '未登录成功',
        showCancel: false,
        success: e => {
          if (e) {
            wx.switchTab({
              url: '../index/index',
            })
          }
        }
      })
    }else{
      this.product_list();
    }
  },
  product_list: function() {
    let that = this;
    wx.request({
      url: app.gd.globalUrl + 'ubi/Product/product_list',
      data: {
        uid: app.gd.uid
      },
      method: 'POST',
      success: function(res) {
        that.setData({
          list: res.data.data.list,
          bang: res.data.data.bang
        })
        if(res.data.code == 0){
          that.setData({
            product_introduce: true,
            product_content: res.data.msg,
            list: [],
            bang: ''
          })
        }
      },
    })
  },
  navDetail: function(e) {
    let id = e.currentTarget.dataset.id;
    let logo = e.currentTarget.dataset.logo;
    wx.navigateTo({
      url: '../privilegeDet/privilegeDet?id=' + id + '&logo=' + logo,
    })
  },
  CloseIntroduce() {
    this.setData({
      product_introduce: false
    })
  },
})