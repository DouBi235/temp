import { login } from './login.js';
export  const getUserInfo = ()=>{
  return new Promise((resolve, reject)=>{
    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              /** 后端登陆时需要的参数 **/
              let { ed, iv } = { ed: res.encryptedData, iv: res.iv }
              wx.showLoading({
                title: '登录中...',
                mask: true,
              })
              login(ed, iv).then(res => {
                resolve(res)
              }).catch(()=>{
                reject()
              })
            }
          })
        }
      }
    })
  }) 
}  