const publicUrl = getApp().gd.globalUrl;
export const request = ((url='', method = 'GET', data)=>{
  console.log(url, method, data)
  return new Promise((resolve, reject)=>{
     wx.request({
       url: publicUrl+url,
       method: method,
       data:data,
       success:(res)=>{
         resolve(res)
       },
       fail:err=>{
         reject(err)
       }
     })
  })
})

