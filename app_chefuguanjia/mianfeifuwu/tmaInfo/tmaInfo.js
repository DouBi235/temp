// pages/tmaInfo/tmaInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tmpInfo:{},
    chooseStore:'',
    id:'',
    date:'请选择预约时间',
    locCarPhoto:'',
    vinCode:''    
  },  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var typeData
    // if(options.type){
    //   typeData=JSON.parse(options.type)
    // }else {
    //   typeData=''
    // }
    var _this = this  
    
    this.setData({
      id:options.id
    })   
    wx.request({
      url: app.gd.globalUrl + '/ubi/Product/info',
      data: {
        uid:app.gd.uid,
        id:_this.data.id
      },
      header: {},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        _this.setData({
          tmpInfo:res.data.data,
          vinCode:res.data.data.vin
        })
      },
      fail: function(res) {
        console.log(res)
      },
      complete: function(res) {},
    })
  },
  handleChooseStore() { //选择店铺
    wx:wx.navigateTo({
      url: '/mianfeifuwu/chooseWxc/chooseWxc?id=' + this.data.id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  bindDateChange(e) { //
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  handleChooseImage(even) { //上传图片
    var _this = this
    wx.chooseImage({
      count: 1,
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        if (tempFilePaths[0].indexOf('.gif') != -1 || tempFilePaths[0].indexOf('.GIF') != -1 ) {
            wx.showToast({
              title: '请上传JPG格式图片',
              icon: 'none',
            })
            return false
        }        
        wx:wx.uploadFile({
          url: app.gd.globalUrl + '/ubi/Product/cbImg',
          filePath: tempFilePaths[0],
          name: 'image',
          success: function(res) {
            let _res = JSON.parse(res.data).replace(/\\/g, '')
            wx.showToast({
              title: '正在上传中...',
              icon: 'loading',
              image: '',
              duration: 500,
              mask: true,
              success: function(res) {
                _this.setData({
                  locCarPhoto: _res
                })
              },
              fail: function(res) {},
              complete: function(res) {},
            })
          },
          fail: function(res) {},
          complete: function(res) {},
        })        
      }
    })   
    // wx.chooseMessageFile({
    //   count: 10,
    //   type: 'image',
    //   success(res) {
    //     // tempFilePath可以作为img标签的src属性显示图片
    //     console.log(res)
    //   }
    // })
  },
  getVinCode(e) {
    this.setData({
      vinCode:e.detail.value
    })
  },
  submitFrom(even) {//数据提交
    let datas = this.data
    var _this = this
    if (datas.chooseStore=='') {
      this.showModals('请选择店铺')
      return false
    }
    if (datas.date=="请选择预约时间"){
      this.showModals('请选择时间')
      return false
    }
    if (datas.locCarPhoto=='') {
      this.showModals('请上传车辆照片')
      return false
    }
    if (datas.vinCode == '') {
      this.showModals('请填写VIN码')
      return false
    }
    var whereStr = {
      uid: app.gd.uid,
      reservation_time: datas.date,
      sm_id: datas.tmpInfo.sm_id,
      plate: datas.tmpInfo.plate,
      sid: datas.chooseStore.id,
      goods_id: datas.tmpInfo.goods_id,
      goods_name: datas.tmpInfo.goods_name,
      goods_pic: datas.tmpInfo.pic,
      number: datas.tmpInfo.fixed_value,
      vin_num: Number(datas.vinCode),
      car_pic: datas.locCarPhoto,
      brand_car_displa: `${datas.tmpInfo.goods_name}/${datas.tmpInfo.type}/${datas.tmpInfo.series}`
    }
    console.log(whereStr)
    wx.request({
      url: app.gd.globalUrl + '/ubi/Product/addReservation',
      data: whereStr,
      header: {},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res.data.code)
       if (res.data.code==0) {
         _this.showModals(res.data.msg)
        }else {
          wx.showToast({
            title: '预约成功，您将在两秒之后跳转至我的预约',
            icon: 'none',            
            duration: 2000,
            mask: true,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })   
          setTimeout(() => {
            wx.navigateTo({
              url: '/mianfeifuwu/order/order',  //预约成功跳转的页面
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
          }, 2000)     
        } 
      },
      fail: function(res) {
        console.log(res)
      },
      complete: function(res) {},
    })     
  },
  showModals(content) {
    wx:wx.showToast({
      title: content,
      icon:"none"
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
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '预约',
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