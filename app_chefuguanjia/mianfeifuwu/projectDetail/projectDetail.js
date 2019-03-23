// pages/projectDetail/projectDetail.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    indicatordots: true,
    productInfo:{},
    btnText:'',
    btnColor:'rgba(150,155,165,1)',
    isSelect:'pro'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this
    wx.setNavigationBarTitle({
      title: "产品详情"
    })
    wx.request({
      url: app.gd.globalUrl + '/ubi/Product/goodsDetail',
      data: {
        uid:app.gd.uid,
        id:options.id
      },
      header: {},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        var status = res.data.data.status
        _this.setData({
          productInfo:res.data.data
        })
        if(status==1) {
          _this.setData({
            btnText:"已预约"
          })
        }else if(status==2) {
          _this.setData({
            btnText:"立即预约",
            btnColor:"#1EA0FF"
          })
        }else if(status==3) {
          _this.setData({
            btnText:'未到服务期'
          })
        }else if(status==4) {
          _this.setData({
            btnText:'未购买停驶奖励服务'
          })
        } 
      },
      fail: function(res) {},
      complete: function(res) {},
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
  handleproductClick(even) {
    this.setData({
      isSelect:even.currentTarget.dataset.id
    })
  },
  mapSubmit() {  //跳转至预约详情页面
    var _this = this
    wx.request({
      url:app.gd.globalUrl + '/ubi/Product/orders',
      data: {
        uid:app.gd.uid
      },
      header: {},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res)
        if(res.data.code==1){
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000,
            mask: true,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
        }else {
          if (_this.data.btnText == "立即预约") {
            wx: wx.navigateTo({
              url: '/mianfeifuwu/tmaInfo/tmaInfo?id=' + _this.data.productInfo.id,
              success: function (res) {},
              fail: function (res) { },
              complete: function (res) { },
            })
          } else {
            return false
          }
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })    
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})