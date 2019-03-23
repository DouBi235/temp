// pages/privilegeDet/privilegeDet.js 
const app=getApp(),
  url = app.gd.globalUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      imgUrl: app.gd.imgUrl,
    uid:'', //用户id
    fid:'',//订单id
    endtime: 7200123,
    time: { ddd: 456, hhh: 24, mmm: 28, sss: 12 },
    change: 0,
    personalList: {}
      
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options){
         this.setData({
           uid: options.uid,
           fid: options.fid
         })
      }
  },
  change: function () {
    this.setData({
      change: 0
    })
  },
  change2: function () {
    this.setData({
      change: 1
    })
  },
  openMap: function () {//打开地图
    var that = this;
    wx.openLocation({
      // latitude: Number(that.data.shopInfo.lat),
      // longitude: Number(that.data.shopInfo.lng),
      latitude: 38.022608,
      longitude: 114.555992,
      scale: 16,
      // name: that.data.shopInfo.company,
      name: "青青草原",
      success: function (res) {
        console.log(res);
      },
      fial(err) {
        console.log(err);
      }
    })
  },
  btn: function () {
    wx.navigateTo({
      url: '../subscribe/subscribe',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow(a) {
    this.detailsData() 
    this.nowTime()
    
   

  },
  
  detailsData(){  //获取产品详情数据
     wx.request({
       url: url +'ubi/My/myServiceDetail',
       method:'POST',
       data:{
         uid:this.data.uid,
         fid:this.data.fid
       },
       success:res=>{
         console.log(res)
         if(res.data.code==1){
            this.setData({
              personalList:res.data.data
            })
         }
       }
     })
  },
  nowTime(){
    // console.log(a) 
    var intDiff = this.data.endtime;//获取数据中的时间戳
    // console.log(intDiff)
    var day = 0, hour = 0, minute = 0, second = 0;
    if (intDiff > 0) {//转换时间
      day = Math.floor(intDiff / (60 * 60 * 24));
      hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
      minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
      second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
      if (hour <= 9) hour = '0' + hour;
      if (minute <= 9) minute = '0' + minute;
      if (second <= 9) second = '0' + second;
      this.data.endtime--;
      var str = day + " " + hour + ':' + minute + ':' + second
      // console.log(str)  
    } else {
      var str = "已结束！";
      clearInterval(timer);
    }
    var thetime = { ddd: day, hhh: hour, mmm: minute, sss: second }
    this.setData({
      time: thetime
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
 
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})