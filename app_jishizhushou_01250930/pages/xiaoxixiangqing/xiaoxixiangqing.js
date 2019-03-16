var WxParse = require('../../wxParse/wxParse.js');
const app = getApp()
Page({
  data: {
    msg: {},
    node:''
  },
  onLoad: function(options) {
    var _this = this
    wx.request({
      url: app.globalData.url + '/worker/Msgs/msgDetail',
      data: {
        mid: options.mid,
        uid: app.globalData.uid
      },
      success: (res) => {
        // WxParse.wxParse('article', 'html',res.data.data.content,_this, 0)
        var text = res.data.data.content.replace(/font:\w+;?/g, '');
        this.setData({
          msg: res.data.data,
          node:text
        })
        
      }
    })
  }
})
// function _parse_html(str) {
//   let REG_RESULT_ARR = str.replace(/\r|\n|\\s/, '').match(/^.*?(?=@)/);
//   let date = str.lastIndexOf('}') > 0 ? str.substr(str.lastIndexOf('}') + 1) : ''
//   let content = REG_RESULT_ARR ? REG_RESULT_ARR[0] : str;
//   return [content, date];
// }
function _parse_html(str) {
  let REG_RESULT_ARR = str.replace(/\r|\n|\\s/, '').match(/^.*?(?=@)/);
  let content = REG_RESULT_ARR ? REG_RESULT_ARR[0] : str;
  return content;
}