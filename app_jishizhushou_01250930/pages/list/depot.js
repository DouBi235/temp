const app = getApp()
Page({
  data: {
    depotlist: [],
    curpage: 1
  },
  onShow: function () {
    this.getlist();
  },
  onPullDownRefresh: function () {
    this.getlist();
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 500)
  },
  selected: function (e) {
    wx.setStorage({
      key: 'udepotid',
      data: e.target.dataset.sid,
      success: () =>{
        wx.setStorage({
          key: 'udepotname',
          data: e.target.dataset.name,
          success: () =>{
            wx.setStorage({
              key: 'depotchange',
              data: true,
              success: () => {
                wx.navigateBack()
              }
            })
          }
        })
      }
    })
  },
  getlist: function (more) { //more,布尔值,true为加载更多,false或不传为刷新
    
    if (more) {
      this.data.curpage++
    } else {
      this.data.curpage = 1
    }
    wx.request({
      url: app.globalData.url + '/worker/user/shop',
      data: {
        uid: app.globalData.uid,
        page: this.data.curpage
      },
      success: (res) => {
        console.log(res.data)
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
        var list = this.data.depotlist
        var newlist = res.data.data
        if (more) {
          list.push.apply(list, newlist)
        } else {
          list = newlist
        }
        this.setData({
          depotlist: list
        })
      }
    })
  }
})