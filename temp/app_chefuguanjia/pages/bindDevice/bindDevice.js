 // pages/bindDevice/bindDevice.js
 const app = getApp();

 Page({

   /**
    * 页面的初始数据
    */
   data: {
     imgUrl: app.gd.imgUrl,
     num: '',
     num2: 0,
     status: 1,
     showBtn: 0,
     deviceStatus: 0, //0 未绑定，1 运行中，2未运行，3休眠
     // deviceCode: '',
     deviceCode: 0,
     disabled: true,
     fristM: '',
     text: '',
     shopInfo: "专属管家店铺"
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function(options) { 
     this.getText()
   },
   onReady: function(){
     this._hasinfo();
   },
   onShow: function() {
     this.isBinding();
   },
   getText: function() {
     let that = this;

   },
   isBinding: function() {
     let that = this;
     wx.request({
       url: app.gd.globalUrl + 'ubi/isBinding',
       data: {
         uid: app.gd.uid
       },
       method: 'POST',
       success: function(res) {
         // code	0 未绑定 1绑定  status1 运行中 0 关闭中
         if (res.data.code == 1) {
           that.setData({
             deviceCode: res.data.data.OBDID,
             num: res.data.data.OBDID,
             company: res.data.data.list.company,
             fristM: res.data.data.list.km,
             lat: res.data.data.list.lat,
             lng: res.data.data.list.lng
           })
           if (res.data.data.status == 1) {
             that.setData({
               deviceStatus: 1,
             })
           } else if (res.data.data.status == 0) {
             that.setData({
               deviceStatus: 2,
             })
           } else if (res.data.data.status == 2) {
             that.setData({
               deviceStatus: 3,
             })
           }
         } else if (res.data.code == 0) {
           that.setData({
             deviceStatus: 0,
             deviceCode: ''
           })
         }
       },
       fail: function(res) {},
       complete: function(res) {},
     })
   },
   code: function() {
     var that = this;
     wx.scanCode({
       scanType: ['qrCode', 'barCode'],
       success: (res) => {
         that.setData({
           num: res.result
         })
         if ((res.result + '').length == 12 && that.data.fristM != '') {
           that.setData({
             disabled: false
           })
         } else {
           that.setData({
             disabled: true
           })
         }
       }
     })
   },
   change: function() {
     var that = this;
     that.setData({
       showBtn: 1
     })
   },
   formInput: function(e) { //设备号
     var that = this;
     that.setData({
       num: e.detail.value,
     })
     if ((e.detail.value + '').length == 12 && that.data.fristM != '') {
       that.setData({
         disabled: false
       })
     } else {
       that.setData({
         disabled: true
       })
     }
   },
   formInput2: function(e) { //初始里程
     var that = this;
     that.setData({
       fristM: e.detail.value
     })
     if ((that.data.num + '').length == 12 && that.data.fristM != '') {
       that.setData({
         disabled: false
       })
     } else {
       that.setData({
         disabled: true
       })
     }
   },
   //跳转到选择车辆管家页面
   skipRepairShop: function() {
     wx.navigateTo({
       url: '../repairShop/repairShop',
     })
   },
   //跳转到更换设备页面
   changeDevice: function() {
     wx.navigateTo({
       url: '../changeDevice/changeDevice'
     })
   },
   changeDet: function() {
     wx.navigateTo({
       url: '../changeDet/changeDet?company=' + this.data.company + '&obdid=' + this.data.num + '&lat=' + this.data.lat + '&lng=' + this.data.lng
     })
   },
   //吊起地图
   mapBlock: function() {
     var that = this;
     if (that.data.company == null) {
       wx.showModal({
         title: '提示',
         content: '您没有选择店铺',
         showCancel: false,
       })
       return false;
     }
     wx.openLocation({
       latitude: Number(that.data.lat),
       longitude: Number(that.data.lng),
       scale: 16,
       name: that.data.company,
       success: (res) => {},
     })
   },
   bindCode: function() {
     let that = this;
     if (Number(that.data.num) == 'NaN') {
       wx.showToast({
         title: '请输入纯数字',
         icon: 'none',
         duration: 1500,
       })
       return false;
     }
     if (that.data.fristM == '') {
       wx.showToast({
         title: '请输入初始里程',
         icon: 'none',
         duration: 1500,
       })
       return false;
     }
     wx.request({
       url: app.gd.globalUrl + 'ubi/recomBinding',
       data: {
         uid: app.gd.uid,
         obdid: that.data.num,
         km: that.data.fristM,
         sid: that.data.shopInfo.sid
       },
       method: 'POST',
       success: function(res) {
         console.log("recomBinding", res)
         if (res.data.code == 1) {
           that.setData({
             deviceCode: that.data.num,
             deviceStatus: 1
           })
           wx.showModal({
             title: '提示',
             content: res.data.msg,
             showCancel: false,
             confirmText: '确定',
             confirmColor: '#09bb07',
             success: function(res) {
               wx.navigateBack({
                 delta: 1,
               })
             },
           })
         } else {
           wx.showToast({
             title: res.data.msg,
             icon: 'none',
             duration: 1500,
           })
         }
       },
       fail: function(res) {},
       complete: function(res) {},
     })
   },
   _hasinfo: function () {
     wx.request({
       url: app.gd.globalUrl + 'ubi/Home/userInfo',
       method: 'post',
       data: {
         uid: app.gd.uid
       },
       success: res => {
         if (res.data.code == 1) { } else {
           wx.showModal({
             title: '提醒',
             content: '您还没有填写车辆信息',
             showCancel: false,
             success: function (success) {
               if (success.confirm) { 
                 wx.navigateTo({
                   url: '../Mypersonal/Mypersonal',
                 })
               }
             },
           })
         }
       }
     })
   }
 })