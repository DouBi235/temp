var WxParse = require('../../wxParse/wxParse.js')
/**
* WxParse.wxParse(bindName,type,data,target,imagePadding)
* 1.bindName绑定的数据名(必填)
* 2.type可以为html或者md(必填)
* 3.data为传入的具体数据(必填)
* 4.target为Page对象,一般为this(必填)
* 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
*/
Page({
  data: {
    article: ''
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://mp.ctbls.com/trip/Personal/disclaimer',
      success(e) {
        if (e.data.code) {
          var info = e.data.data[0].content
          WxParse.wxParse('article', 'html', info, that, 5)
        } else {
          wx.showModal({
            title: '错误',
            content: '服务器繁忙，请稍后再试',
            showCancel: false,
            confirmColor: '#21C5BD',
            success: function () {
              wx.navigateBack()
            }
          })
        }
      }
    })
  }
})