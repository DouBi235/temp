const app = getApp()
Page({
  data: {
    msglist: [],
    curpage: 1
  },
  removemsg: function(mid) {

    wx.request({
      url: app.globalData.url + '/worker/Msgs/delMsg',
      data: {
        uid: app.globalData.uid,
        mid: mid
      },
      success: (res) => {
        wx.hideLoading()
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          mask: true
        })
        if (res.data.code == 1) {
          setTimeout(() => {
            this.getlist()
          }, 1400)
        }
      }
    })
  },
  menutap: function(e) { //点击菜单

    var mid = e.target.dataset.mid
    wx.showModal({
      title: '提示',
      content: '删除此通知？',
      confirmColor: '#1070ff',
      cancelColor: '#666',
      success: (tap) => {
        if (tap.confirm) { //删除通知
          wx.showLoading({
            title: '请稍候',
            mask: true
          })
          this.removemsg(mid);
        }
      }
    })
  },
  getlist: function(more) {

    if (more) {
      this.data.curpage++
    } else {
      this.data.curpage = 1
    }
    wx.request({
      url: app.globalData.url + '/worker/Msgs/msgList',
      data: {
        uid: app.globalData.uid,
        page: this.data.curpage
      },
      success: (res) => {
        if (res.data.code == 0) {
          if (this.data.curpage > 1) {
            wx.showToast({
              title: '暂无更多',
              icon: 'none'
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
          }
          return;
        }
        var list = this.data.msglist
        var newlist = res.data.data.list
        if (more) {
          list.push.apply(list, newlist)
        } else {
          list = newlist
        }
        this.setData({
          msglist: list
        })
      }
    })
  },
  onShow: function() {
    this.getlist();
  },
  onPullDownRefresh: function() {
    this.getlist();
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 500)
  },
  onReachBottom: function() {
    this.getlist(true);
  }
})