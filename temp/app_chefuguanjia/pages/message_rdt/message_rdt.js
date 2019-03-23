// message_rdt.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    content: '',
    time: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 获取已读页面传来的信息id
    var mid = options.mid;
    
    console.log('获取的信息id为', mid);
    wx.request({
      url: app.gd.globalUrl + 'ubi/Home/informLue',
      method: 'POST',
      data: {
        uid: app.gd.uid,
        mid: mid
      },
      success: function (e) {
        var arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' };
        var text = e.data.data.content.replace(/\<img/gi, '<img class="rich-img" ')
        that.setData({
          title: e.data.data.title,
          node: text,
          time: e.data.data.create_time
        })
      }
    })
  }, 
})