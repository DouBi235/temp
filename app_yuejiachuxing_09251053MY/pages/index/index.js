const app = getApp()
var touchDot = 0
Page({
  data: {
    winHeight: "",
    currentTab: 0,
    movies: [],
    userInfo: {},
    hasUserInfo: false,
    actnow: [],
    actago: [],
    actnowpage: 1,
    actagopage: 1,
    hidecannot: true,
    hidereposition: true,
    hasmask: true,
    headTop: 0,
    bodyTop: 536,
    bodycanmove: false
  },
  relogin: function () {
    if (app.globalData.uid) { return true; }
    var that = this
    wx.showModal({
      title: '提示',
      content: '您还没有登录，请登录',
      showCancel: false,
      confirmColor: '#21C5BD',
      success: function () {
        that.setData({
          hasUserInfo: false
        })
      }
    })
    return false;
  },
  bos: function (e) {
    if (e.detail.authSetting["scope.userLocation"]) {
      this.setData({
        hidereposition: true
      })
      this.isopen(app.globalData.uid)
    }
  },
  getUserInfo: function (e) { //初次进入，点击弹窗进行授权并登录
    if (!e.detail.userInfo) { //用户拒绝授权
      this.setData({
        hasUserInfo: true
      })
      wx.showModal({
        title: '提示',
        content: '不登录将无法正常使用',
        showCancel: false,
        confirmColor: '#21C5BD'
      })
      return;
    }
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      hasmask: false
    })
    //console.log(e.detail.userInfo)
    this.upuserinfo(e.detail.userInfo)
  },
  upuserinfo: function (data) {
    var that = this
    wx.login({
      success: res => {
        var obj = { //获取用户在微信中的信息
          code: res.code,
          nikename: data.nickName,
          head_image: data.avatarUrl,
          sex: data.gender
        }
        //console.log(obj)
        wx.request({ //发送用户信息
          url: 'https://mp.ctbls.com/trip/Index/login',
          data: obj,
          success: function (res) {
            const uid = res.data.data.u_id
            app.globalData.uid = uid
            //console.log(app.globalData.uid)
            that.isopen(uid)
          }
        })
      }
    })
  },
  isopen: function (uid) {
    wx.showLoading({
      title: '请稍等',
      mask: true
    })
    var that = this
    wx.getLocation({
      altitude: false,
      success: function (res) {
        wx.request({
          url: 'https://mp.ctbls.com/trip/Index/astrict',
          data: {
            lat: res.latitude,
            lng: res.longitude,
            u_id: uid
          },
          success: function (res) {
            wx.hideLoading()
            app.globalData.isopen = true
            that.initlist(that.data.currentTab)

          }
        })
      },
      fail: function () {
        wx.hideLoading()
        that.setData({
          hidereposition: false
        })
      }
    })
  },
  initlist: function (cur) {
    if (cur == 0) {
      this.loadactnow();
    } else {
      this.loadactago();
    }
  },
  loadactnow: function (more) { //more,布尔值,true为加载更多,false或不传为刷新
    var that = this
    if (more) {
      that.data.actnowpage++
    } else {
      that.data.actnowpage = 1
    }
    wx.request({ //活动列表
      url: 'https://mp.ctbls.com/trip/Main/index',
      data: { uid: app.globalData.uid, page: that.data.actnowpage },
      success: function (res) {
        if (res.data.code == 0) {
          if (!more) {
            that.setData({
              actnow: []
            })
          }
          wx.showToast({
            title: '暂无更多',
            icon: 'none'
          })
          return;
        }
        //console.log(res.data.data)
        var list = that.data.actnow
        var newlist = res.data.data.list
        if (more) {
          list.push.apply(list, newlist)
        } else {
          list = newlist
        }
        that.setData({
          actnow: list
        })
      }
    })
  },
  loadactago: function (more) { //more,布尔值,true为加载更多,false或不传为刷新
    var that = this
    if (more) {
      that.data.actagopage++
    } else {
      that.data.actagopage = 1
    }
    wx.request({ //往期风采
      url: 'https://mp.ctbls.com/trip/Main/past',
      data: { page: that.data.actagopage },
      success: function (res) {
        if (res.data.code == 0) {
          if (!more) {
            that.setData({
              actago: []
            })
          }
          wx.showToast({
            title: '暂无更多',
            icon: 'none'
          })
          return;
        }
        //console.log(res.data.data)
        var list = that.data.actago
        var newlist = res.data.data.list
        if (more) {
          list.push.apply(list, newlist)
        } else {
          list = newlist
        }
        that.setData({
          actago: list
        })
      }
    })
  },
  loadbanner: function () { //轮播图
    var that = this;
    wx.request({
      url: 'https://mp.ctbls.com/trip/Verdict/getBannerList',
      success: function (res) {
        var list = res.data.data
        that.setData({
          movies: list
        })
      }
    })
  },
  goinfo: function (e) {
    const id = e.currentTarget.id
    const where = e.currentTarget.dataset.where
    wx.navigateTo({
      url: '/pages/' + where + '/' + where + '?aid=' + id
    })
  },
  bannerInfo: function (e) {
    if (this.relogin()) {
      const bid = e.currentTarget.id
      wx.navigateTo({
        url: '/pages/bannerInfo/bannerInfo?bid=' + bid
      })
    }
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    })
    if (app.globalData.uid && app.globalData.isopen) {
      this.initlist(e.detail.current)
    }
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    this.setData({
      currentTab: cur
    })
    if (this.data.currentTab == cur) { return false; }
    if (app.globalData.uid && app.globalData.isopen) {
      this.initlist(cur)
    }
  },
  initlogin: function () {
    var that = this;
    if (app.globalData.userInfo) {
      that.upuserinfo(app.globalData.userInfo)
      that.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        hasmask: false
      })
    } else {
      wx.getUserInfo({ //授权后，直接登录
        success: res => {
          app.globalData.userInfo = res.userInfo
          that.upuserinfo(res.userInfo)
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            hasmask: false
          })
        }
      })
    }
  },
  onShow: function () {
    if (app.globalData.uid && app.globalData.isopen) {
      this.initlist(this.data.currentTab)
    }
  },
  onLoad: function () {
    this.initlogin()
    var that = this
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 236;
        that.setData({
          winHeight: calc
        })
      }
    })
    this.loadbanner()
  },
  onPullDownRefresh: function () {
    setTimeout(function () {
      wx.stopPullDownRefresh()
    }, 500)
    if (app.globalData.uid && app.globalData.isopen) {
      this.initlist(this.data.currentTab)
    }
    this.loadbanner();
  },
  islower: function () {
    var tab = this.data.currentTab
    if (tab == 0) {
      this.loadactnow(true);
    } else {
      this.loadactago(true);
    }
  },
  isupper: function () {
    this.setData({
      headTop: 0,
      bodyTop: 536,
      bodycanmove: false
    })
  },
  touchStart: function (e) {
    touchDot = e.touches[0].pageY
  },
  touchMove: function (e) {
    var touchMove = e.touches[0].pageY
    if (touchMove - touchDot < 0) {
      this.setData({
        headTop: -300,
        bodyTop: 236
      })
      setTimeout(() => {
        this.setData({ bodycanmove: true })
      }, 500)
    }
    if (touchMove - touchDot > 0) {
      this.setData({
        headTop: 0,
        bodyTop: 536,
        bodycanmove: false
      })
    }
  },
  onShareAppMessage: function () { }
})