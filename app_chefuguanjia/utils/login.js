import { Login } from './server.js'
export const login =  ((ed,iv)=>{
  return new Promise((resolve, reject)=>{
    wx.login({
      success: res => {
        let code = res.code;
        console.log(code)
        console.log(ed)
        Login(ed, iv, code).then(res => {
          /** 获取的登录状态存入缓存 **/
          if (res.data.code == 1) {
            resolve(res.data)
          }else{
            reject()
          }
          // wx.hideLoading()
          // wx.setStorageSync('LoginData', res.data)
        })
      }
    })
  })
  
})