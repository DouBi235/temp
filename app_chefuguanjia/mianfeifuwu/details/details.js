// pages/details/details.js
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
    toView: 'green',
    scrollTop: 10,
    isFixed:'',
    detailInfo:{},
    wxcInfo:{}
  },
  upper(e) {
    console.log(e)
  },
  lower(e) {
    console.log(e)
  },
  scroll(e) {
    console.log(e)
  },
  tap(e) {
    for (let i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove(e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },
  onPageScroll: function (e) {
    if(e.scrollTop>=375) {
      this.setData({
        isFixed:"fixed"
      })
    } else if (e.scrollTop <= 325){
      this.setData({
        isFixed:''
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    this.setData({
      wxcInfo:JSON.parse(options.item)
    })
    wx.setNavigationBarTitle({
      title:"详情"
    })
    wx.request({     
      url: app.gd.globalUrl + '/ubi/ServeShop/serveDetail',
      data: {
        uid:app.gd.uid,
        sid:options.sid
      },
      header: {},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        _this.setData({
          detailInfo:res.data.data
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  confirm() {  //确认选择
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 3];
    prevPage.setData({
      chooseStore: this.data.wxcInfo
    })
    wx.navigateBack({
      delta: 2
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

  }
})