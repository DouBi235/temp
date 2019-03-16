// pages/MyService/MyService.js
const app = getApp(),
  url = app.gd.globalUrl;
Page({ 
  data: {
    imgUrl: app.gd.imgUrl,
    uid: '', //用户id
    serverList: [], //存放我的服务项列表数据
  },
 
  onLoad: function(options) {
    this.setData({
      uid: app.gd.uid
    })
  }, 
  onReady: function() {

  }, 
  onShow: function() {
    this.serverData()
  },
  serverData() { //获取我的服务项列表
    wx.request({
      url: url + 'ubi/My/myService',
      method: 'POST',
      data: {
        uid: this.data.uid
      },
      success: (res) => { 
        if (res.data.code == 1) {
          this.setData({
            serverList: res.data.data.list
          })
        } else if (res.data.code == 0) {
          this.setData({
            serverList: []
          })
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500,
          })
        }
        console.log(res)
      }
    })
  },
  skipDetails(e) { //点击跳转,产品详情
    console.log(e)
    var fid = e.currentTarget.dataset.id //订单id 
    wx.navigateTo({
      url: '../privilegeDet/privilegeDet?logo=1' + '&id=' + fid,
    })
  }, 
})