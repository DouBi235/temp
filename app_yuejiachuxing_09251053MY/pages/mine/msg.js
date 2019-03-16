const app = getApp()
Page({
  data: {
    winHeight: "",
    currentData: 0,
    act: [],
    sys: [],
    actpage: 1,
    syspage: 1,
  },
  toinfo: function (e) {
    var id = e.currentTarget.id.split("_")
    var tp = id[0]
    var mid = id[1]
    wx.navigateTo({
      url: '/pages/msginfo/msginfo?id=' + mid + '&type=' + tp
    })
  },
  delmsg: function (e) {
    var id = e.currentTarget.dataset.id
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否删除此活动通知',
      cancelColor: '#21C5BD',
      confirmColor: '#21C5BD',
      success: function (tap) {
        if (tap.confirm) {
          wx.request({
            url: 'https://mp.ctbls.com/trip/News/actDel',
            data: { id: id },
            success(e) {
              wx.showModal({
                title: '提示',
                content: e.data.msg,
                showCancel: false,
                confirmColor: '#21C5BD',
                success() {
                  if (e.data.code) {
                    that.loadact()
                  }
                }
              })
            }
          })
        }
      }
    })
  },
  loadact: function (more) { //more,布尔值,true为加载更多,false或不传为刷新
    var that = this
    if (more) {
      that.data.actpage++
    } else {
      that.data.actpage = 1
    }
    wx.request({ //活动通知列表
      url: 'https://mp.ctbls.com/trip/News/actNews',
      data: { uid: app.globalData.uid, page: that.data.actpage },
      success: function (res) {
        if (res.data.code == 0) {
          if (!more) {
            that.setData({
              act: []
            })
          }
          wx.showToast({
            title: '暂无更多',
            icon: 'none'
          })
          return;
        }
        //console.log(res.data.data)
        var list = that.data.act
        var newlist = res.data.data.list
        if (more) {
          list.push.apply(list, newlist)
        } else {
          list = newlist
        }
        that.setData({
          act: list
        })
      }
    })
  }, loadsys: function (more) { //more,布尔值,true为加载更多,false或不传为刷新
    var that = this
    if (more) {
      that.data.syspage++
    } else {
      that.data.syspage = 1
    }
    wx.request({ //活动列表
      url: 'https://mp.ctbls.com/trip/News/msgL',
      data: { uid: app.globalData.uid, page: that.data.syspage },
      success: function (res) {
        if (res.data.code == 0) {
          if (!more) {
            that.setData({
              sys: []
            })
          }
          wx.showToast({
            title: '暂无更多',
            icon: 'none'
          })
          return;
        }
        //console.log(res.data.data)
        var list = that.data.sys
        var newlist = res.data.data.list
        if (more) {
          list.push.apply(list, newlist)
        } else {
          list = newlist
        }
        that.setData({
          sys: list
        })
      }
    })
  },
  onLoad: function () {
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR;
        that.setData({
          winHeight: calc
        });
      }
    });
  },
  onShow: function () {
    var cur = this.data.currentData
    if (cur == 0) {
      this.loadact();
    } else {
      this.loadsys();
    }
  },
  islower: function () {
    var tab = this.data.currentData
    if (tab == 0) {
      this.loadact(true);
    } else {
      this.loadsys(true);
    }
  },
  bindchange: function (e) {
    this.setData({
      currentData: e.detail.current
    })
    if (e.detail.current == 0) {
      this.loadact();
    } else {
      this.loadsys();
    }
  },
  checkCurrent: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentData == cur) { return false; }
    this.setData({
      currentData: cur
    })
    if (cur == 0) {
      this.loadact();
    } else {
      this.loadsys();
    }
  }
})
