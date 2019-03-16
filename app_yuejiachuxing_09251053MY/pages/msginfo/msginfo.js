var WxParse = require('../../wxParse/wxParse.js')
/**
* WxParse.wxParse(bindName,type,data,target,imagePadding)
* 1.bindName绑定的数据名(必填)
* 2.type可以为html或者md(必填)
* 3.data为传入的具体数据(必填)
* 4.target为Page对象,一般为this(必填)
* 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
*/
const app = getApp()
Page({
  data: {
    msg: {},
    article: ''
  },
  onLoad: function (options) {
    var tp = options.type
    var id = options.id
    var that = this
    wx.request({
      url: tp == 'act' ? 'https://mp.ctbls.com/trip/News/actDetail' : 'https://mp.ctbls.com/trip/News/detail',
      data: tp == 'act' ? { id: id } : { mid: id, uid: app.globalData.uid },
      success: function (res) {
        var info = res.data.data
        info.info = info.content ? info.content : info.contnet
        WxParse.wxParse('article', 'html', info.info, that, 5)
        that.setData({
          msg: info
        })
      }
    })
  }
})