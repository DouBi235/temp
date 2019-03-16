// message_dt.js
const app = getApp();
// var WxParse = require('../../wxParse/wxParse.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    content: '',
    node: '',
    time: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 获取未读页面传来的信息id
    var mid = options.mid;
    console.log('获取的信息id为',mid);
    wx.request({
      url: app.gd.globalUrl + 'ubi/Home/msgDetail',
      method: 'POST',
      data: {
        uid: options.uid,
        mid: mid
      },
      success: function(e) {
        // WxParse.wxParse('article', 'html', e.data.data.content, that, 5);
        var text = e.data.data.content.replace(/font:\w+;?/g, '');
        // text = text.replace(/&nbsp;/g, ' ');
        that.setData({
          title: e.data.data.title,
          node: text, 
          time: e.data.data.time
        })
      }
    })
  },
})
/** 格式化 @font-face 无法解析的样式样式 */
function _parse_html(str) {
  let REG_RESULT_ARR = str.replace(/\r|\n|\\s/, '').match(/^.*?(?=@)/); 
  let content = REG_RESULT_ARR ? REG_RESULT_ARR[0] : str;
  return content;
}
