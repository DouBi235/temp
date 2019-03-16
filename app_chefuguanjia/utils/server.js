

import { request } from './requestPromise.js'

/**
 * 登录
 */
export const Login =(ed,iv,code)=> request('ubi/login','GET',{
  encryptedData: ed,
  iv:iv,
  code: code
})
/**
 * 查看用户有没有认证过,或者支付过   
 */
export const _ifBuy = (sid, unionId) => request('ubi/NshopPay/ifBuy','POST',{
  sid: sid,
  unionId: unionId
})

/**
 * 获取用户默认收货地址  
 */
export const _getShopDetail = (sid) => request('ubi/NshopPay/getShopDetail','POST',{
  sid:sid
})
/**
 * 获取省份
 */
export const _getPro = () => request('cb/Member/pro','POST')

/**
 * 获取市
 */
export const _getCity = (id) => request('cb/Member/city', 'POST',{
  pro:id
})


/**
 * 获取地区
 */
export const _getCounty = (id) => request('cb/Member/county', 'POST',{
  city:id
})

/**
 * 支付  
 */
export const _memberpay = (data) => request('ubi/NshopPay/memberpay', 'POST', data)