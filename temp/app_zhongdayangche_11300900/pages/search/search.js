// pages/search/search.js
var app = getApp(); 
Page({
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //当前的tab
    scrollLeft: 0, //tab标题的滚动条位置
    keywords:'',
    distanceList:[],
    moneyList:[]
  },
  onLoad: function (options) {
    console.log(options);
    var that = this;
    that.setData({
      keywords: options.keywords
    }) 
    wx.showLoading(); 
    wx.request({
      url: app.globalData.globalUrl + '/st/main/selDistance',
      data: {
        uid: app.globalData.uid,
        key: that.data.keywords
      },
      method: 'POST',
      success: function (data) {
        wx.hideLoading()
        console.log("搜索页面 距离 返回结果",data)
        if (data.data.code == 1) {          
          var list = data.data.data; 
          that.setData({
            distanceList:list
          })
        }
      }
    })
  },
  onShow: function(){
    var that = this;
    wx.request({
      url: app.globalData.globalUrl + '/st/main/selMoney',
      data: {
        uid: app.globalData.uid,
        key: that.data.keywords
      },
      method: 'POST',
      success: function (data) {
        wx.hideLoading()
        console.log("搜索页面 价格 返回结果", data)
        if (data.data.code == 1) {
          var list = data.data.data;
          that.setData({
            moneyList: list
          })
        }
      }
    })
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    // this.checkCor();  //判断当前滚动超过一屏时，设置tab标题滚动条。
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  // checkCor: function () {
  //   if (this.data.currentTab > 4) {
  //     this.setData({
  //       scrollLeft: 300
  //     })
  //   } else {
  //     this.setData({
  //       scrollLeft: 0
  //     })
  //   }
  // },
  onReachBottom: function () {
    var that = this;
    console.log(123)
  },
  research: function () {
    console.log("research Fn")
    var that = this;
    this.setData({
      distanceList: [],
      moneyList: []
    });
    wx.showLoading()
    wx.request({
      url: app.globalData.globalUrl + '/st/main/selDistance',
      data: {
        uid: app.globalData.uid,
        key: that.data.keywords
      },
      method: 'POST',
      success: function (data) {
        wx.hideLoading()
        console.log(data)
        if (data.data.code == 1) {
          var list = data.data.data;
          that.setData({
            distanceList: list
          })
        }
      }
    });
    wx.request({
      url: app.globalData.globalUrl + '/st/main/selMoney',
      data: {
        uid: app.globalData.uid,
        key: that.data.keywords
      },
      method: 'POST',
      success: function (data) {
        wx.hideLoading()
        console.log(data)
        if (data.data.code == 1) {
          var list = data.data.data;
          that.setData({
            moneyList: list
          })
        }
      }
    })
  },
  changekeywords: function(e) {
    console.log("changekeywords Fn")
    var that = this;
    // console.log(e.detail.value)
    that.setData({
      keywords: e.detail.value
    })
  },
  resultdetail: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../productDet/productDet?id=' + id,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})