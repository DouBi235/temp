// pages/evaluate/evaluate.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    oid:'',
    cid:'',
    ifsigning:'',
    content:'',
    num: 4,//后端给的分数,显示相应的星星
    one_1: '',
    two_1: '',
    one_2: 0,
    two_2: 5
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("evaluate.options",options)
    this.setData({
      oid : options.oid,
      cid : options.cid,
      ifsigning: options.ifsigning
    })
    this.setData({
      one_1: this.data.num,
      two_1: 5 - this.data.num
    })
  },
  in_xin: function (e) {
    var in_xin = e.currentTarget.dataset.in;
    var one_2;
    if (in_xin === 'use_sc2') {
      one_2 = Number(e.currentTarget.id);
    } else {
      one_2 = Number(e.currentTarget.id) + this.data.one_2;
    }
    this.setData({
      one_2: one_2,
      two_2: 5 - one_2
    })
  },
  textareaChange: function (e) {
    var that = this;
    console.log("评价内容 的值为",e.detail.value)
    that.setData({
      content: e.detail.value
    })
  },
  submitEvaluate: function () {
    var that = this;
    wx.request({
      url: app.globalData.globalUrl + '/st/order/evaluate',
      data: {
        uid: app.globalData.uid,
        cid: that.data.cid,
        ifsigning:"",
        content:that.data.content,
        class: that.data.one_2,
        oid: that.data.oid
      },
      method: "POST",
      success: function (res) {
        console.log("提交评价表单完成返回结果:",res) 
        var t = res.data.msg;
        if (res.data.code == 1) {
          wx.showToast({
            title: t,
            duration: 1500,
          })
          var indext = setTimeout(function () {
            wx.navigateTo({
              url: '../orderAll/orderAll',
            })
            clearTimeout(indext)
          }, 1500);
        }else{
          wx.showToast({
            title: t,
            icon: 'none',
            duration: 1500,
          })
        }
      }
    })

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})