export default (callback, that) => {
  wx.getSetting({
    success: setres => {
      if (setres.authSetting['scope.userInfo']) {
        getInfo(callback, that);
      }
    }
  })
}
let getInfo = (callback, that) => {
  wx.getUserInfo({
    success: infores => {
      wxlogin(infores, callback, that);
    }
  })
}
let wxlogin = (infores, callback, that) => {
  wx.showLoading({
    title: '登录中...',
    mask: true,
  })
  wx.login({
    success: loginres => {
      let data = {
        code: loginres.code,
        encryptedData: infores.encryptedData,
        iv: infores.iv,
        signature: infores.signature,
        head_pic: infores.userInfo.avatarUrl,
        nick_name: infores.userInfo.nickName,
      };
      wx.request({
        url: that.globalData.url + "/fx/Register/Login",
        method: "POST",
        data: data,
        success: (res) => {
          wx.hideLoading()
          callback(res);
        },
        fail: err => {
          wx.hideLoading();
        },
      })
    }
  })
}
