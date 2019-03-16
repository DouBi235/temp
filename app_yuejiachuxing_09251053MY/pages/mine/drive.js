const app = getApp()
var which = 0
var thatstatus = 9
Page({
  data: {
    menuHide: true,
    stlist: ['y', 'g', 'r'],
    list: [],
    pagenow: 1
  },
  alertmenu: function (e) {
    which = e.currentTarget.dataset.id
    thatstatus = e.currentTarget.dataset.status
    this.setData({
      menuHide: false
    })
  },
  menuChange: function () {
    this.setData({
      menuHide: true
    })
  },
  toinfo: function (e) {
    var status = parseInt(e.currentTarget.dataset.status)
    var aid = e.currentTarget.id
    //console.log(status)
    switch (status) {
      case 1: case 4:
        wx.navigateTo({
          url: '/pages/actinfo/actinfo?aid=' + aid
        }); break;
      case 0: case 2:
        wx.navigateTo({
          url: '/pages/myact/myact?aid=' + aid
        }); break;
      case 3:
        wx.navigateTo({
          url: '/pages/actago/actago?aid=' + aid
        }); break;
    }
  },
  setitem: function () {
    //console.log(thatstatus)
    if (thatstatus == 3) {
      wx.showModal({
        title: '提示',
        content: '此活动已结束，不可修改',
        confirmColor: '#21C5BD',
        showCancel: false
      })
      return;
    }
    var that = this
    wx.showModal({
      title: '提示',
      content: '即将前往修改约驾页面进行',
      confirmColor: '#21C5BD',
      cancelColor: '#666',
      success: function (e) {
        that.setData({
          menuHide: true
        })
        if (e.confirm) {
          wx.navigateTo({
            url: '/pages/publish/reset?aid=' + which
          })
        }
      }
    })
  },
  delitem: function () {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定删除此活动？',
      confirmColor: '#21C5BD',
      cancelColor: '#666',
      success: function (e) {
        if (e.confirm) {
          wx.request({
            url: 'https://mp.ctbls.com/trip/Updata/cancel',
            data: { uid: app.globalData.uid, aid: which },
            success(e) {
              wx.showModal({
                title: '提示',
                content: e.data.msg,
                showCancel: false,
                confirmColor: '#21C5BD',
                success() {
                  if (e.data.code) {
                    that.setData({
                      menuHide: true
                    })
                    that.loadlist()
                  } else {
                    that.setData({
                      menuHide: true
                    })
                  }
                }
              })
            }
          })
        } else {
          that.setData({
            menuHide: true
          })
        }
      }
    })
  },
  loadlist: function (more) { //more,布尔值,true为加载更多,false或不传为刷新
    var that = this
    if (more) {
      that.data.pagenow++
    } else {
      that.data.pagenow = 1
    }
    wx.request({ //活动列表
      url: 'https://mp.ctbls.com/trip/Activity/yuelist',
      data: { uid: app.globalData.uid, page: that.data.pagenow },
      success: function (res) {
        if (res.data.code == 0) {
          if (!more) {
            that.setData({
              list: []
            })
          }
          wx.showToast({
            title: '暂无更多',
            icon: 'none'
          })
          return;
        }
        //console.log(res.data.data)
        var list = that.data.list
        var newlist = res.data.data.yue_list
        if (more) {
          list.push.apply(list, newlist)
        } else {
          list = newlist
        }
        that.setData({
          list: list
        })
      }
    })
  },
  onShow: function () {
    this.loadlist()
  },
  onPullDownRefresh: function () {
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 500)
    this.loadlist()
  },
  onReachBottom: function () {
    this.loadlist(true)
  }
})