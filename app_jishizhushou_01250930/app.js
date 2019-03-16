App({
  globalData: {
    hasposition: false,
    hasrepair: 0,
    isauth: 0,
    islogin: false,
    uhead: '',
    uid: '',
    url: 'https://mp.ctbls.com',  //线上
    // url: 'https://xmp.ctbls.com',  //测试
    userInfo: null,
  },
  onLaunch: function() {
    // 获取小程序更新机制兼容
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager();
      updateManager.onCheckForUpdate(function(res) {
        console.log("检查有没有新版本")
        if (res.hasUpdate) {
          console.log("有新版本")
          console.log(updateManager)
          updateManager.onUpdateReady(function() {
            console.log("新版本下载成功点击更新")

            // 显示弹窗
            wx.showModal({
              content: '新版本下载成功点击更新',
              showCancel: false,
              confirmText: '点击更新',
              confirmColor: '#777',
              success: function(res) {
                if (res.confirm) {
                  updateManager.applyUpdate()
                }
              },
            })

            // 不显示弹窗
            // updateManager.applyUpdate()
          })
          updateManager.onUpdateFailed(function() {
            console.log("新版本下载失败 ，")
          })
        } else {
          console.log("没有新版本")
          console.log(updateManager)
        }
      })
    } else {
      console.log("小程序版本不支持更新机制")
    }
  }
})