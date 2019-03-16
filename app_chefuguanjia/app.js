//app.js
App({
  gd: {
    status: 0,
    userInfo: null,
    globalUrl: "https://xmp.ctbls.com/", //上传前需要更换域名为 mp    xmp是测试
    imgUrl: 'https://mp.ctbls.com/static/images', // 
    uid: '',
    lat: '',
    lng: '',
    unionId: '',
    isok: '',
    recommen_unionId: '',
    recommen: null,
    name: '',
    phone: '',
    pro: '请选择省份',
    city: '请选择城市',
    area: '请选择地区',
    inputName: '',
    cityId: '',
    // isZds 中的信息每次进小程序只弹一次，记录状态，如果弹过一次就不弹了
    isZdsStatus: 0,
  },
  onLaunch: function(qrcode) {
    if (this.getInfoCallback) {
      //data 为需要传入的数据
      this.getInfoCallback("appdata")
    }
    
    if (qrcode.query.scene) {
      this.gd.recommen_unionId = decodeURIComponent(qrcode.query.scene);
      console.log('二维码', this.gd.recommen_unionId)
    }
    // 获取小程序更新机制兼容
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager();
      const con1 = `新版本已经上线啦~\t新版本内容：\t1.修复，优化小程序。`;
      const con2 = `新版本已经上线啦~,请您删除当前小程序，重新搜索打开\n新版本内容：\n1.修复，优化小程序。`;
      updateManager.onCheckForUpdate(function(res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function() {
            wx.showModal({
              title: '版本更新',
              content: con1,
              showCancel: false,
              confirmText: '更新',
              confirmColor: '#09bb07',
              success: function(res) {
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function() {
            // 新的版本下载失败
            wx.showModal({
              title: '已经有新版本了',
              content: con2,
            })
          })
        }
      })
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    } 
  },
  checkPosition: function() {
    if (!(app.gd.lat && app.gd.lng)) {
      wx.showModal({
        title: '提示',
        content: '您没有位置授权，某些功能异常，请重新授权',
        showCancel: false,
        confirmText: '确定',
        confirmColor: '#09bb08',
        success: (res) => {
          wx.openSetting({
            success: (Sres) => {
              wx.getLocation({
                type: 'wgs84',
                complete: (Lres) => {
                  console.log("定位位置 getLocation", Lres)
                  // 获取授权设置
                  if (Lres.errMsg === "getLocation:ok") {
                    this.gd.lat = Lres.latitude;
                    this.gd.lng = Lres.longitude;
                  } else {
                    this.checkPosition();
                  }
                }
              })
            }
          })
        }
      })
    }
  },
  
})