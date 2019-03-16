const app = getApp()
Page({
  data: {
    list: [],
    pagenow: 1
  },
  alertmode: function (e) { //点击取消
    var aid = e.currentTarget.dataset.id
    var status = e.currentTarget.dataset.status
    if (status == 3) {
      wx.showModal({
        title: '提示',
        content: '此活动已结束，不可取消',
        confirmColor: '#21C5BD',
        showCancel: false
      })
      return;
    }
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否取消报名',
      cancelColor: '#21C5BD',
      confirmColor: '#21C5BD',
      success: function (tap) {
        if (tap.confirm) {
          wx.request({
            url: 'https://mp.ctbls.com/trip/Participation/delPart',
            data: {
              uid: app.globalData.uid,
              aid: aid
            },
            success(e) {
              wx.showModal({
                title: '提示',
                content: e.data.msg,
                showCancel: false,
                confirmColor: '#21C5BD',
                success() {
                  if (e.data.code) {
                    that.loadlist()
                  }
                }
              })
            }
          })
        }
      }
    })
  },
  toinfo: function (e) {
    var aid = e.currentTarget.id
    var status = e.currentTarget.dataset.status
    if (status == 3) {
      wx.navigateTo({
        url: '/pages/actago/actago?aid=' + aid
      })
    } else {
      wx.navigateTo({
        url: '/pages/actinfo/actinfo?aid=' + aid
      })
    }
  },
  loadlist: function (more) { //more,布尔值,true为加载更多,false或不传为刷新
    var that = this
    if (more) {
      that.data.pagenow++
    } else {
      that.data.pagenow = 1
    }
    wx.request({ //活动列表
      url: 'https://mp.ctbls.com/trip/Participation/myTakePart',
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
        var newlist = res.data.data.res
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